import { Component } from '@angular/core';
import {AdminService} from "@pages/admin-management/services/admin.service";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {AddAdminModalComponent} from "@pages/admin-management/add-admin-modal/add-admin-modal.component";

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: ['./admin-management.component.scss']
})
export class AdminManagementComponent {
  users: any[] = [];

  constructor(
    private adminService: AdminService,
    private toast: ToastrService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.adminService.getData().subscribe((res) => {
      this.users = res;
    });
  }

  openDialog() {
    this.dialog.open(AddAdminModalComponent, {
      width: '500px',
      data: { title: 'Create New User'}
    }).afterClosed().subscribe((res) => {
      this.adminService.create(res.value).subscribe(() => {
        this.toast.success('Tạo thành công', 'Thành công')
        this.getData();
      },(err) => {
        this.toast.error('Lỗi', 'Lỗi khởi tạo')
        this.getData();
      })
    })
  }

  onEdit(index) {
    this.dialog.open(AddAdminModalComponent, {
      width: '500px',
      data: { title: 'Edit User', data: this.users[index]}
    }).afterClosed().subscribe((res) => {
      console.log(res)
      this.adminService.edit(res).subscribe(() => {
        this.toast.success('Cập nhật thành công', 'Thành công')
        this.getData()
      })
    })
  }

  onDelete(id) {
    this.adminService.delete(id).subscribe((res) => {
      this.toast.success('Xoá thành công', 'Thành công')
      this.getData();
    });
  }
}
