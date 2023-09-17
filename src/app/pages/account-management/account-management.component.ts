import { Component } from '@angular/core';
import {AccountService} from "@pages/account-management/services/account.service";

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent {
  users: any[] = [];

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.accountService.getData().subscribe((res) => {
      this.users = res;
    });
  }

  onDelete(id) {

  }
}
