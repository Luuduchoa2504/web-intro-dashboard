import { Component } from '@angular/core';
import {AdminService} from "@pages/admin-management/services/admin.service";

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: ['./admin-management.component.scss']
})
export class AdminManagementComponent {
  users: any[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.adminService.getData().subscribe((res) => {
      this.users = res;
    });
  }

  onDelete(id) {

  }
}
