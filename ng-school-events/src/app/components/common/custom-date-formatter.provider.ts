import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { getISOWeek } from 'date-fns';
import { DatePipe } from '@angular/common';

export class CustomDateFormatter extends CalendarDateFormatter {
  public weekViewTitle({ date, locale }: DateFormatterParams): string {
    if (locale === 'es') {
      const year: string = new DatePipe(locale).transform(date, 'y', locale);
      const weekNumber: number = getISOWeek(date);
      return `Semana ${weekNumber} de ${year}`;
    } else {
      const year: string = new DatePipe(locale).transform(date, 'y', locale);
      const weekNumber: number = getISOWeek(date);
      return `Week ${weekNumber} of ${year}`;
    }
  }
}
