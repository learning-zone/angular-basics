import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialog-example.component.html',
  styleUrls: ['./dialog-example.component.scss']
})
export class DialogExampleComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogExampleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


}
