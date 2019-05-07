import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private isOpened: boolean;

  private toggleSidebar() {
    this.isOpened = !this.isOpened;
  }
}
