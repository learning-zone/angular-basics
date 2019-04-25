import { forwardRef, Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as Moment from 'moment';

@Component({
  selector: 'app-datetime-range',
  templateUrl: './datetime-range.html',
  styles: [`
    app-datetime-range{
      display: block;
    }
  `],
  providers    : [{
    provide    : NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateTimeRangeComponent),
    multi      : true,
  }],
})
export class DateTimeRangeComponent implements ControlValueAccessor, OnInit {
  @Input() public xSize: string = 'default';
  @Input() public xFormat: string = 'YYYY-MM-DD';
  @Input('dateRange') public _value: any;

  public spanStyle: object = {};
  public dateStyle: object = {};
  public startDate: any = null;
  public endDate: any = null;

  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;

  constructor () {}

  public ngOnInit () {
    console.log(this.xFormat, this.xSize);
    this.dateStyle = {
      width: '48%',
      float: 'left',
    };
    this.spanStyle = {
      'float': 'left',
      'line-height': this.getLineHeight(),
      'text-align': 'center',
      'width': '4%',
    };
  }

  private getLineHeight () {
    if (this.xSize === 'default') {
      return '28px';
    } else if (this.xSize === 'large') {
      return '32px';
    } else {
      return '24px';
    }
  }

  public ngOnChanges () {
    // this.show = !!this.baseUrl;
  }

  public startDateChange (event: any): void {
    console.log(event);
  }

  get dateRange () {
    return this._value;
  }

  set dateRange (val: any) {
    if ((this._value === val) || (((this._value === undefined) || (this._value === null)) && ((val === undefined) || (val === null)))) {
      return;
    }
    if (val !== this._value) {
      this._value = val;
      this.onChange(val);
    }
  }

  public changeSDate (date: any) {
    this.startDate = date;
    if (!this.endDate || this.startDate > this.endDate) {
      this.endDate = date;
    }
    this.setDateRange();
  }

  public changeEDate (date: any) {
    this.endDate = date;
    if (!this.startDate || this.startDate > this.endDate) {
      this.startDate = date;
    }
    this.setDateRange();
  }

  private setDateRange () {
    this.onChange([Moment(this.startDate).format('YYYY-MM-DD HH:mm:ss'), Moment(this.endDate).format('YYYY-MM-DD HH:mm:ss')]);
  }

  public writeValue (value: any): void {
    this.dateRange = value;
  }

  public registerOnChange (fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  public registerOnTouched (fn: () => {}): void {
    this.onTouched = fn;
  }

}
