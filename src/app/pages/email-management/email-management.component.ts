import { Component } from '@angular/core';
import {EmailService} from "@pages/email-management/services/email.service";
import {ToastrService} from "ngx-toastr";
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AddEmailModalComponent } from './add-email-modal/add-email-modal.component';

@Component({
  selector: 'app-email-management',
  templateUrl: './email-management.component.html',
  styleUrls: ['./email-management.component.scss']
})
export class EmailManagementComponent {
  emails: any[] = [];

  constructor(
    private emailService: EmailService,
    private toast: ToastrService,
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.loadData();
  }

  onFetchData() {

  }

  loadData() {
    this.emailService.getData().subscribe((res) => {
      this.emails = res;
    });
  }

  openDialog() {
    this.dialog.open(AddEmailModalComponent, {
      width: '500px',
    }).afterClosed().subscribe((res) => {
      this.emailService.create(res.value.email).subscribe(() => {
        this.toast.success('Tạo thành công', 'Thành công')
        this.loadData();
      })
    })
  }

  onEdit(index) {
    this.dialog.open(AddEmailModalComponent, {
      width: '500px',
      data: {
        email: this.emails[index]
      }
    }).afterClosed().subscribe((res) => {
      this.emailService.edit(res).subscribe(() => {
        this.toast.success('Cập nhật thành công', 'Thành công')
        this.loadData()
      })
    })
  }

  onDelete(id) {
    this.emailService.delete(id).subscribe((res) => {
      this.toast.success('Xoá thành công', 'Thành công')
      this.loadData();
    });
  }
}
