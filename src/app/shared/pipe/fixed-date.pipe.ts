import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'fixedDate',
  standalone: true
})
export class FixedDatePipe implements PipeTransform {
  transform(value?: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Asia/Tehran',
      calendar: 'persian',
      numberingSystem: 'latn',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };
    const formatter = new Intl.DateTimeFormat('fa-IR', options);
    return formatter.format(value);
  }
}
