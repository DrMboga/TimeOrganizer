import { MocoActivity } from '../model';
import { parseISO } from 'date-fns';

export const MOCK_MOCO_DATA: MocoActivity[] = [
  {
    id: 1057325182,
    date: '2024-09-02',
    hours: 3.58,
    description: '',
    billed: false,
    billable: true,
    tag: '',
    remote_service: '',
    project: {
      id: 946569496,
      name: 'Fake project 1',
      billable: true,
    },
    task: {
      id: 19919493,
      name: 'Software Engineering',
      billable: true,
    },
    customer: {
      id: 761380560,
      name: 'Fake customer 1',
    },
    user: {
      id: 933672027,
      firstname: 'Max',
      lastname: 'Muster',
    },
    timer_started_at: parseISO('2024-09-02T11:53:56Z'),
    created_at: parseISO('2024-09-02T06:17:43Z'),
    updated_at: parseISO('2024-09-02T11:53:56Z'),
    hourly_rate: 126.42,
    seconds: 12894,
  },
  {
    id: 1057360627,
    date: '2024-09-02',
    hours: 0.3,
    description: '',
    billed: false,
    billable: true,
    tag: '',
    remote_service: '',
    project: {
      id: 946921032,
      name: 'Fake project 2',
      billable: true,
    },
    task: {
      id: 22860702,
      name: 'Software Engineering',
      billable: true,
    },
    customer: {
      id: 761380740,
      name: 'Fake customer 2',
    },
    user: {
      id: 933672027,
      firstname: 'Max',
      lastname: 'Muster',
    },
    timer_started_at: undefined,
    created_at: parseISO('2024-09-02T09:52:37Z'),
    updated_at: parseISO('2024-09-02T10:10:54Z'),
    hourly_rate: 121.02,
    seconds: 1096,
  },
  {
    id: 1057368043,
    date: '2024-09-02',
    hours: 0.89,
    description: '',
    billed: false,
    billable: false,
    tag: '',
    remote_service: '',
    project: {
      id: 945970230,
      name: 'Fake project 3',
      billable: false,
    },
    task: {
      id: 14816563,
      name: 'Fake task 3',
      billable: false,
    },
    customer: {
      id: 761304129,
      name: 'Fake customer 3',
    },
    user: {
      id: 933672027,
      firstname: 'Max',
      lastname: 'Muster',
    },
    timer_started_at: undefined,
    created_at: parseISO('2024-09-02T11:00:18Z'),
    updated_at: parseISO('2024-09-02T11:53:56Z'),
    hourly_rate: 0.0,
    seconds: 3217,
  },
];
