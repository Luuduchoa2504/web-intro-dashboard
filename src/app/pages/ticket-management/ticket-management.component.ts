import { Component } from '@angular/core';
import { TicketService } from './services/ticket.service';

@Component({
  selector: 'app-ticket-management',
  templateUrl: './ticket-management.component.html',
  styleUrls: ['./ticket-management.component.scss']
})
export class TicketManagementComponent {
  tickets: any[] = [];

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.ticketService.getData().subscribe((res) => {
      this.tickets = res;
    });
  }

  onDelete(id) {
    
  }
}
