import { Signal } from '@angular/core';
import { MocoActivity } from '../model';

export interface IMocoService {
  pullActivities: Signal<Date | undefined>;
  activities: Signal<MocoActivity[] | undefined>;
}
