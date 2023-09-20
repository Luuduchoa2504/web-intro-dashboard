import { Component } from '@angular/core';
import { TicketService } from './services/ticket.service';
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {AddTicketModalComponent} from "@pages/ticket-management/add-ticket-modal/add-ticket-modal.component";

@Component({
  selector: 'app-ticket-management',
  templateUrl: './ticket-management.component.html',
  styleUrls: ['./ticket-management.component.scss']
})
export class TicketManagementComponent {
  tickets: any[] = [];

  constructor(
    private ticketService: TicketService,
    private toast: ToastrService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.ticketService.getData().subscribe((res) => {
      this.tickets = res;
    });
  }

  openDialog() {
    this.dialog.open(AddTicketModalComponent, {
      width: '500px',
    }).afterClosed().subscribe((res) => {
      this.ticketService.create(res.value).subscribe(() => {
        this.toast.success('Tạo thành công', 'Thành công')
        this.getData();
      },(err) => {
        this.toast.error('Lỗi', 'Lỗi khởi tạo')
        this.getData();
      })
    })
  }

  onEdit(index) {
    this.dialog.open(AddTicketModalComponent, {
      width: '500px',
      data: this.tickets[index]
    }).afterClosed().subscribe((res) => {
      console.log(res)
      this.ticketService.edit(res).subscribe(() => {
        this.toast.success('Cập nhật thành công', 'Thành công')
        this.getData()
      })
    })
  }

  onDelete(id) {
    this.ticketService.delete(id).subscribe((res) => {
      this.toast.success('Xoá thành công', 'Thành công')
      this.getData();
    });
  }
}
