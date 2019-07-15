import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lifecycles',
  templateUrl: './lifecycles.component.html',
  styleUrls: ['./lifecycles.component.scss']
})
export class LifecyclesComponent implements OnInit {
  data: number = 100;
  constructor() {
    console.log(`constructor() called: ${this.data}`);
  }
  ngOnChanges() {
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
  fnAddNumber(): void {
    this.data += 100;
  }
  deleteNumber(): void {
    this.data -= 10;
  }
}
