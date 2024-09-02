import { Injectable, signal } from '@angular/core';
import { IMocoService } from './moco.service.interface';
import { MocoActivity } from '../model';
import { MOCK_MOCO_DATA } from './moco.mock';

@Injectable()
export class MocoServiceMock implements IMocoService {
  public pullActivities = signal<Date | undefined>(undefined);

  public activities = signal<MocoActivity[] | undefined>(MOCK_MOCO_DATA);
}
