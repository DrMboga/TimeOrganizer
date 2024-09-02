import { MocoActivity } from '../model';

export const MOCK_MOCO_DATA: MocoActivity[] = [
  {
    id: 1,
    date: '2024-08-30',
    hours: 0.58,
    description: '',
    billed: false,
    billable: true,
    tag: '',
    remote_service: '',
    project: {
      id: 2,
      name: 'Fake project: Phase 2',
      billable: true,
    },
    task: {
      id: 3,
      name: 'Software Engineering',
      billable: true,
    },
    customer: {
      id: 4,
      name: 'Fake customer 1',
    },
    user: {
      id: 5,
      firstname: 'Max',
      lastname: 'Mustermann',
    },
    created_at: new Date('2024-08-30T07:31:25Z'),
    updated_at: new Date('2024-08-30T08:06:10Z'),
    hourly_rate: 121.02,
    seconds: 2084,
  },
  {
    id: 6,
    date: '2024-08-30',
    hours: 6.69,
    description: '',
    billed: false,
    billable: true,
    tag: '',
    remote_service: '',
    project: {
      id: 7,
      name: 'Fake project: Phase 42',
      billable: true,
    },
    task: {
      id: 8,
      name: 'Software Engineering',
      billable: true,
    },
    customer: {
      id: 9,
      name: 'Fake customer 2',
    },
    user: {
      id: 10,
      firstname: 'Max',
      lastname: 'Mustermann',
    },
    timer_started_at: new Date('2024-09-02T06:17:43Z'),
    created_at: new Date('2024-08-30T08:06:10Z'),
    updated_at: new Date('2024-08-30T15:39:37Z'),
    hourly_rate: 126.42,
    seconds: 24070,
  },
];
