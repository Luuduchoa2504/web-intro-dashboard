import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, ValidatorFn, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-ticket-modal',
  templateUrl: './add-ticket-modal.component.html',
  styleUrls: ['./add-ticket-modal.component.scss']
})
export class AddTicketModalComponent implements OnInit {
  ticketForm = this.fb.group({
    name: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    phone: [null,  [Validators.required, this.phoneValidator()]],
    content: [null, [Validators.required]],
  });
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddTicketModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.ticketForm.get('name')?.patchValue(this.data?.name);
    this.ticketForm.get('email')?.patchValue(this.data?.email);
    this.ticketForm.get('phone')?.patchValue(this.data?.phone);
    this.ticketForm.get('content')?.patchValue(this.data?.content);
  }

  phoneValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const phoneValue = control.value;

      const valid = /^\d{10}$/.test(phoneValue);

      if (!valid) {
        return { invalidPhone: true };
      }

      return null;
    };
  }
  onCancel() {
    this.dialogRef.close()
  }
  onSave() {
    if (this.data) {
      const req = {
        _id: this.data._id,
        name: this.ticketForm.get('name').value,
        email: this.ticketForm.get('email').value,
        phone: this.ticketForm.get('phone').value,
        content: this.ticketForm.get('content').value,
      }
      this.dialogRef.close(req)
    } else {
      this.dialogRef.close(this.ticketForm)
    }
  }
}
