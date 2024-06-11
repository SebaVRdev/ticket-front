import { Component } from '@angular/core';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { ListTicketsComponent } from '../../../shared/components/list-tickets/list-tickets.component';
import { Ticket } from '../../../core/models/types';
import { TicketService } from '../../../core/services/ticket.service';

@Component({
  selector: 'app-ticket-control',
  standalone: true,
  imports: [PaginationComponent, ListTicketsComponent],
  templateUrl: './ticket-control.component.html',
  styleUrl: './ticket-control.component.css'
})
export class TicketControlComponent {

  tickets: Ticket[] = [];
  page: number = 1;
  limit: number = 5;
  total: number = 0;
  constructor(private ticketService: TicketService) { 
    this.loadTickets()
  }


  loadTickets(): void {
    this.ticketService.getTickets(this.page, this.limit).subscribe(
    ({tickets, total}) => {
      this.tickets = tickets;
      this.total = total;
    },
    error => {
      console.log(error)
    }
  );
}

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.loadTickets();
  }

}
