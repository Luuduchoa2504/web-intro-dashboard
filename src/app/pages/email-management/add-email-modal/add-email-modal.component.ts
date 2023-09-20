import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-email-modal',
  templateUrl: './add-email-modal.component.html',
  styleUrls: ['./add-email-modal.component.scss']
})
export class AddEmailModalComponent implements OnInit{
  emailForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
  });
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEmailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log(this.data)
    this.emailForm.get('email')?.patchValue(this.data?.email?.email);
  }
  onCancel() {
    this.dialogRef.close()
  }
  onSave() {
    const req = { _id: this.data.email._id, email: this.emailForm.get('email').value}
    this.dialogRef.close(req)
  }
}
