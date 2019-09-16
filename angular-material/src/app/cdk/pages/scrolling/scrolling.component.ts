import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-scrolling',
  templateUrl: './scrolling.component.html',
  styleUrls: ['./scrolling.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollingComponent {
  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
}
