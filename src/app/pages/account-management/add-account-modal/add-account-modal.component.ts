import {Component, Inject} from '@angular/core';
import {AbstractControl, FormBuilder, ValidatorFn, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-account-modal',
  templateUrl: './add-account-modal.component.html',
  styleUrls: ['./add-account-modal.component.scss']
})
export class AddAccountModalComponent {
  title: string
  userForm = this.fb.group({
    name: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    phone: [null,  [Validators.required, this.phoneValidator()]],
    password: [null, [Validators.required]],
  });
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddAccountModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.title = this.data.title
    this.userForm.get('name')?.patchValue(this.data?.data?.name);
    this.userForm.get('email')?.patchValue(this.data?.data?.email);
    this.userForm.get('phone')?.patchValue(this.data?.data?.phone);
    this.userForm.get('password')?.patchValue(this.data?.data?.password);
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
    if (this.data.data) {
      const req = {
        _id: this.data.data._id,
        name: this.userForm.get('name').value,
        email: this.userForm.get('email').value,
        phone: this.userForm.get('phone').value,
        password: this.userForm.get('password').value,
      }
      this.dialogRef.close(req)
    } else {
      this.dialogRef.close(this.userForm)
    }
  }
}
