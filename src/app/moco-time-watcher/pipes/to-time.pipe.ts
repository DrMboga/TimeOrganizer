import { Pipe, PipeTransform } from '@angular/core';
import { format, secondsToHours, secondsToMinutes } from 'date-fns';

@Pipe({
  name: 'toTime',
  standalone: true,
})
export class ToTimePipe implements PipeTransform {
  transform(seconds: number | undefined): string {
    const hours = secondsToHours(seconds ?? 0);
    const minutes = secondsToMinutes(seconds ?? 0) - hours * 60;
    return format(new Date(0, 0, 0, hours, minutes, 0), 'HH:mm');
  }
}
