import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-email-modal',
  templateUrl: './add-email-modal.component.html',
  styleUrls: ['./add-email-modal.component.scss']
})
export class AddEmailModalComponent {
  private dialogRef: MatDialogRef<AddEmailModalComponent>
}
