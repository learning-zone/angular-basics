import { Component } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SnackbarExampleComponent } from '../snackbar-example/snackbar-example.component';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {

  durationInSeconds = 2;

  constructor(private snackBar: MatSnackBar) {}

  openSnackBar() {
    this.snackBar.openFromComponent(SnackbarExampleComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

}
