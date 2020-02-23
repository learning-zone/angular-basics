import {AutofillMonitor} from '@angular/cdk/text-field';
import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent implements AfterViewInit, OnDestroy {

  @ViewChild('first', { read: ElementRef }) firstName: ElementRef<HTMLElement>;
  @ViewChild('last', { read: ElementRef }) lastName: ElementRef<HTMLElement>;
  firstNameAutofilled: boolean;
  lastNameAutofilled: boolean;

  constructor(private _autofill: AutofillMonitor) {}

  ngAfterViewInit() {
    this._autofill.monitor(this.firstName)
        .subscribe(e => this.firstNameAutofilled = e.isAutofilled);
    this._autofill.monitor(this.lastName)
        .subscribe(e => this.lastNameAutofilled = e.isAutofilled);
  }

  ngOnDestroy() {
    this._autofill.stopMonitoring(this.firstName);
    this._autofill.stopMonitoring(this.lastName);
  }
}
