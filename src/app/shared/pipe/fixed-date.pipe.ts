import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'fixedDate',
  standalone: true
})
export class FixedDatePipe implements PipeTransform {
  transform(value?: Date): string {
    if (!value) return '';
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Asia/Tehran',
      calendar: 'persian',
      numberingSystem: 'latn',
      year: '2-digit',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    };
    const formatter = new Intl.DateTimeFormat('fa-IR', options);
    return formatter.format(value);
  }
}
