import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../../core/models/types';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from '../../../core/services/ticket.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ticket-detail.component.html',
  styleUrl: './ticket-detail.component.css'
})
export class TicketDetailComponent implements OnInit {
  public ticket: Ticket | null;
  public newComment: string = '';

  constructor(
    private route: ActivatedRoute, 
    private ticketService: TicketService
  ){ 
    this.ticket = null;
  }

  ngOnInit(): void {
    //Recogemos parametros de la url
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
      },
      err => {
        console.log(err)
      }
    )
  };

  addComment(): void {
    if (this.newComment.trim()) {
      //this.ticket.comments.push({ author: 'CurrentUser', text: this.newComment });
      this.newComment = '';
    }
  }
}
