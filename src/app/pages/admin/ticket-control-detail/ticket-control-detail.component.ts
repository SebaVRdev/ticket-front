import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../../core/models/types';
import { TicketService } from '../../../core/services/ticket.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticket-control-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket-control-detail.component.html',
  styleUrl: './ticket-control-detail.component.css'
})
export class TicketControlDetailComponent implements OnInit {
  ticket: Ticket | null
  constructor(
    private route: ActivatedRoute, 
    private ticketService: TicketService
  ) {
    this.ticket = null;
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params["id"];
      //LLmamos a la funcion para obtener el ticket
      this.getTicket(id);
    })
  }

  getTicket(id:string){
    this.ticketService.getTicketsById(id).subscribe(
      response => {
        this.ticket = response.tickets;
        console.log(this.ticket)
      },
      err => {
        console.log(err)
      }
    )
  };
}
