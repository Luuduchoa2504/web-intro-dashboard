import { Component } from '@angular/core';
import {AccountService} from "@pages/account-management/services/account.service";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {AddAccountModalComponent} from "@pages/account-management/add-account-modal/add-account-modal.component";

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent {
  users: any[] = [];

  constructor(
    private accountService: AccountService,
    private toast: ToastrService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.accountService.getData().subscribe((res) => {
      this.users = res;
    });
  }

  openDialog() {
    this.dialog.open(AddAccountModalComponent, {
      width: '500px',
      data: { title: 'Create New User'}
    }).afterClosed().subscribe((res) => {
      this.accountService.create(res.value).subscribe(() => {
        this.toast.success('Tạo thành công', 'Thành công')
        this.getData();
      },(err) => {
        this.toast.error('Lỗi', 'Lỗi khởi tạo')
        this.getData();
      })
    })
  }

  onEdit(index) {
    this.dialog.open(AddAccountModalComponent, {
      width: '500px',
      data: { title: 'Edit User', data: this.users[index]}
    }).afterClosed().subscribe((res) => {
      console.log(res)
      this.accountService.edit(res).subscribe(() => {
        this.toast.success('Cập nhật thành công', 'Thành công')
        this.getData()
      })
    })
  }

  onDelete(id) {
    this.accountService.delete(id).subscribe((res) => {
      this.toast.success('Xoá thành công', 'Thành công')
      this.getData();
    });
  }
}
