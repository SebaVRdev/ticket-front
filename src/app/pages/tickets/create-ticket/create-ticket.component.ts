import { Component } from '@angular/core';
import { TicketModalComponent } from '../ticket-modal/ticket-modal.component';

@Component({
  selector: 'app-create-ticket',
  standalone: true,
  imports: [TicketModalComponent],
  templateUrl: './create-ticket.component.html',
  styleUrl: './create-ticket.component.css'
})
export class CreateTicketComponent {
  constructor(){}
  openSupportTicketModal() {
    const modal = document.getElementById('supportTicketModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }
}
