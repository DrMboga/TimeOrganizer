import { Component, computed, effect, OnDestroy, OnInit, Signal, signal } from '@angular/core';
import { MocoPersistenceService } from '../../services/moco-persistence.service';
import { MocoService } from '../../services/moco.service';
import { MocoSettingsComponent } from '../../components/moco-settings/moco-settings.component';
import { ToTimePipe } from '../../pipes/to-time.pipe';
import { add, addSeconds, differenceInSeconds, format, hoursToSeconds } from 'date-fns';
import { TimeInterval } from '../../model/time-interval';
import { MatProgressBar } from '@angular/material/progress-bar';

const TimerPeriod = 30000; // 30 seconds
const dailyWorkingHours = 8;

@Component({
  selector: 'app-moco',
  standalone: true,
  imports: [MocoSettingsComponent, ToTimePipe, MatProgressBar],
  templateUrl: './moco.component.html',
  styleUrl: './moco.component.css',
})
export class MocoComponent implements OnInit, OnDestroy {
  private timer: any;

  public mocoSettings = this.mocoPersistenceService.mocoSettings;
  /**
   * Data read from API. Can contain only one item with `timer_started_at`.
   */
  private mocoActivities = this.mocoService.activities;

  /**
   * Sum of all items which are ever stopped.
   */
  private allStoppedTasksTimeSeconds = computed(() => {
    const activities = this.mocoActivities();
    return activities?.map((a) => a.seconds).reduce((a, b) => a + b);
  });

  /**
   * Gets current time of task which currently running if so
   */
  private startedTaskTime = computed(() => {
    const activities = this.mocoActivities();
    return activities?.find((a) => a.timer_started_at !== undefined && a.timer_started_at !== null)
      ?.timer_started_at;
  });

  /**
   * Signal which holds current task duration. Updates by timer.
   */
  private currentTaskDurationSeconds = signal<number>(0);

  public starTime = computed(() => {
    const activities = this.mocoActivities();
    if (!activities || activities.length === 0) {
      return '';
    }
    return format(activities[0].created_at, 'HH:mm');
  });

  /**
   * Calculated total working time including current task updated by timer
   */
  public totalWorkToday = computed(
    () => (this.allStoppedTasksTimeSeconds() ?? 0) + this.currentTaskDurationSeconds(),
  );

  public totalWorkTodayPercent = computed(() =>
    Math.round((100 * this.totalWorkToday()) / (dailyWorkingHours * 60 * 60)),
  );

  /**
   * Calculated time left to work for today
   */
  public timeLeft = computed(() =>
    this.totalWorkToday() >= dailyWorkingHours * 60 * 60
      ? 0
      : hoursToSeconds(dailyWorkingHours) - this.totalWorkToday(),
  );

  /**
   * Calculated time when to finish today.
   */
  public whenStop = computed(() => format(add(new Date(), { seconds: this.timeLeft() }), 'HH:mm'));

  /**
   * Time in seconds for pause
   */
  public pauseTime = computed(() => {
    const activities = this.mocoActivities();
    if (!activities || activities.length === 0) {
      return 0;
    }
    const start = activities[0].created_at;
    const stop = add(new Date(), { seconds: this.timeLeft() });
    const diff = differenceInSeconds(stop, start);
    console.log('diff', diff);
    if (diff > dailyWorkingHours * 60 * 60) {
      return diff - dailyWorkingHours * 60 * 60;
    }
    return 0;
  });

  public pauseTimePercent = computed(() =>
    Math.round((100 * this.pauseTime()) / (dailyWorkingHours * 60 * 60)),
  );

  /**
   * Time intervals.
   */
  public intervals: Signal<TimeInterval[]> = computed(() => {
    const currentDuration = this.currentTaskDurationSeconds();

    return (
      this.mocoActivities()?.map((a) => {
        let endTime = a.created_at ? addSeconds(a.created_at, a.seconds) : new Date(1970, 1, 1);
        const isRunning = a.timer_started_at !== undefined && a.timer_started_at !== null;
        const durationInSeconds = isRunning ? a.seconds + currentDuration : a.seconds;
        return {
          durationInSeconds,
          isRunning,
          isWorkingTime: true,
          startTime: format(a.created_at ?? new Date(1970, 1, 1), 'HH:mm'),
          endTime: format(endTime, 'HH:mm'),
          description: a.customer?.name ?? '?',
          durationInPercent: Math.round((100 * durationInSeconds) / (dailyWorkingHours * 60 * 60)),
        } as TimeInterval;
      }) ?? []
    );
  });

  constructor(
    private mocoPersistenceService: MocoPersistenceService,
    private mocoService: MocoService,
  ) {
    effect(
      () => {
        if (this.startedTaskTime()) {
          this.updateTimes();
          // If there is a task which is currently running, we need to start a time to recalculate worked time and time left in real time
          const needToStartTimer = this.startedTaskTime() !== undefined;
          if (needToStartTimer) {
            this.timer = setInterval(() => {
              this.onTimerTick();
            }, TimerPeriod);
          }
        }
      },
      { allowSignalWrites: true },
    );
  }

  ngOnInit(): void {
    this.refreshData();
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  public refreshData() {
    this.mocoService.pullActivities.set(new Date());
  }

  private onTimerTick() {
    this.updateTimes();
  }

  private updateTimes() {
    const begin = this.startedTaskTime();
    if (begin) {
      const now = new Date();
      const diff = differenceInSeconds(now, begin);
      this.currentTaskDurationSeconds.set(diff);
    }
  }
}
