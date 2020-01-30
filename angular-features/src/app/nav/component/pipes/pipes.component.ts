import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map, takeWhile, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-pipes',
  templateUrl: './pipes.component.html',
  styleUrls: ['./pipes.component.scss']
})
export class PipesComponent implements OnInit {

  title = 'Built-in Angular Pipes';
  today_date = new Date();
  json_val = {name: 'Alex', age: '25', address:{a1: 'Paris', a2: 'France'}};
  months: Array<String> = ['Jan', 'Feb', 'Mar', 'April', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  countCompleted = false;
  countDown = 5;
  count$: Observable<number>;
  message = 'Happy Birthday!';

  ngOnInit() {
    const timer = interval(1000);
    this.count$ = timer.pipe(
      map(i => this.countDown - i),
      takeWhile(i => i > 0),
      finalize(() => (this.countCompleted = true))
    );
  }
}
