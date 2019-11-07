import { Component, OnInit, OnChanges, AfterContentInit,
DoCheck, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-lifecycles',
  templateUrl: './lifecycles.component.html',
  styleUrls: ['./lifecycles.component.scss']
})
export class LifecyclesComponent implements
OnInit, OnChanges, DoCheck, AfterContentInit,
AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  data = 100;
  constructor() {
    console.log(`constructor() called: ${this.data}`);
  }
  ngOnChanges(): void {
    console.log(`ngOnChanges() called: ${this.data}`);
  }
  ngOnInit() {
    console.log(`ngOnInit() called: ${this.data}`);
  }
  ngDoCheck() {
    console.log('ngDoCheck() called');
  }
  ngAfterContentInit() {
    console.log('ngAfterContentInit() called');
  }
  ngAfterContentChecked() {
    console.log('ngAfterContentChecked() called');
  }
  ngAfterViewInit() {
    console.log('ngAfterViewInit() called');
  }
  ngAfterViewChecked() {
    console.log('ngAfterViewChecked() called');
  }
  ngOnDestroy() {
    console.log('ngOnDestroy() called');
  }
  addNumber(): void {
    this.data += 100;
  }
  deleteNumber(): void {
    this.data -= 50;
  }
}
