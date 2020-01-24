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
    console.log(`constructor(): ${this.data}`);
  }
  ngOnChanges(): void {
    console.log(`ngOnChanges(): ${this.data}`);
  }
  ngOnInit() {
    console.log(`ngOnInit(): ${this.data}`);
  }
  ngDoCheck() {
    console.log('ngDoCheck()');
  }
  ngAfterContentInit() {
    console.log('ngAfterContentInit()');
  }
  ngAfterContentChecked() {
    console.log('ngAfterContentChecked()');
  }
  ngAfterViewInit() {
    console.log('ngAfterViewInit()');
  }
  ngAfterViewChecked() {
    console.log('ngAfterViewChecked()');
  }
  ngOnDestroy() {
    console.log('ngOnDestroy()');
  }
  addNumber(): void {
    this.data += 100;
  }
  deleteNumber(): void {
    this.data -= 50;
  }
}
