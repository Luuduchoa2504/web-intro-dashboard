import { Component } from '@angular/core';
import {EmailService} from "@pages/email-management/services/email.service";

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent {
  emails: any[] = [];

  constructor(private emailService: EmailService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.emailService.getData().subscribe((res) => {
      this.emails = res;
      console.log(res);
    });
  }

  onDelete(id) {

  }
}
