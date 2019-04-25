import {Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy, LOCALE_ID, Inject} from '@angular/core';
import {CalendarDateFormatter} from 'angular-calendar';
import {CustomDateFormatter} from '../custom-date-formatter.provider';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class CalendarHeaderComponent implements OnInit {
  @Input() view: string;

  @Input() viewDate: Date;

  // @Input() locale: string = 'es';
  @Inject(LOCALE_ID) public locale: string;

  @Output() viewChange: EventEmitter<string> = new EventEmitter();

  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
