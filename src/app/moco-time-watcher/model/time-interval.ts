export interface TimeInterval {
  startTime: string;
  endTime: string;
  isRunning: boolean;
  isWorkingTime: boolean;
  durationInSeconds: number;
  description: string;
  durationInPercent: number;
}
