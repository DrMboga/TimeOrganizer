import { MocoProject } from './moco-project';
import { MocoTask } from './moco-task';
import { MocoUser } from './moco-user';

export interface MocoActivity {
  id: number;
  date: string;
  hours: number;
  description?: string;
  billed?: boolean;
  billable?: boolean;
  invoice_id?: number;
  tag?: string;
  remote_service?: string;
  remote_id?: number;
  remote_url?: string;
  project?: MocoProject;
  task?: MocoTask;
  customer?: MocoProject;
  user: MocoUser;
  timer_started_at?: Date;
  created_at: Date;
  updated_at: Date;
  hourly_rate?: number;
  seconds: number;
}
