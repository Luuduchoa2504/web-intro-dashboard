import {Component, Inject} from '@angular/core';
import {AbstractControl, FormBuilder, ValidatorFn, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-admin-modal',
  templateUrl: './add-admin-modal.component.html',
  styleUrls: ['./add-admin-modal.component.scss']
})
export class AddAdminModalComponent {
  title: string
  userForm = this.fb.group({
    name: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    phone: [null,  [Validators.required, this.phoneValidator()]],
    password: [null],
    role: [null],
  });
  roles = [
    { key: 1, value: 'Admin' },
    { key: 2, value: 'Super Admin' },
  ];
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddAdminModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log(this.data)
    this.title = this.data.title;
    this.userForm.get('name')?.patchValue(this.data?.data?.name);
    this.userForm.get('email')?.patchValue(this.data?.data?.email);
    this.userForm.get('phone')?.patchValue(this.data?.data?.phone);
    this.userForm.get('role')?.patchValue(this.data.data.role)
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

  showPasswordField(): Boolean {
    return this.data?.data ? false : true;
  }

  onCancel() {
    this.dialogRef.close()
  }
  onSave() {
    if (this.data.data) {
      const req = {
        _id: this.data?.data?._id,
        name: this.userForm.get('name').value,
        email: this.userForm.get('email').value,
        phone: this.userForm.get('phone').value,
        password: this.userForm.get('password').value,
        role: this.userForm.get('role').value,
      }
      this.dialogRef.close(req)
    } else {
      this.dialogRef.close(this.userForm)
    }
  }
}
