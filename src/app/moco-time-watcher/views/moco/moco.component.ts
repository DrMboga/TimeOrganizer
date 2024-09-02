import { Component, computed, OnInit } from '@angular/core';
import { MocoPersistenceService } from '../../services/moco-persistence.service';
import { MocoService } from '../../services/moco.service';
import { MocoSettingsComponent } from '../../components/moco-settings/moco-settings.component';

@Component({
  selector: 'app-moco',
  standalone: true,
  imports: [MocoSettingsComponent],
  templateUrl: './moco.component.html',
  styleUrl: './moco.component.css',
})
export class MocoComponent implements OnInit {
  public mocoSettings = this.mocoPersistenceService.mocoSettings;
  public mocoActivities = this.mocoService.activities;
  public sumWorkTimeInSeconds = computed(() => {
    const activities = this.mocoActivities();
    const allStoppedTasksTimeSeconds = activities?.map((a) => a.seconds).reduce((a, b) => a + b);

    return allStoppedTasksTimeSeconds;
  });

  constructor(
    private mocoPersistenceService: MocoPersistenceService,
    private mocoService: MocoService,
  ) {}

  ngOnInit(): void {
    this.mocoService.pullActivities.set(new Date());
  }
}
