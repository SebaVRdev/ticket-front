import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../../core/services/ticket.service';
import { TicketPorMes } from '../../../core/models/types';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css'
})
export class EstadisticasComponent implements OnInit {
  tickets: TicketPorMes[] = [];
  maxCount: number = 0;

  constructor(
    private ticketService: TicketService
  ) { }

  ngOnInit(): void {
    this.loadDataTicketMes()
  }

  loadDataTicketMes():void {
    this.ticketService.getTicketsForMes().subscribe(
      res => {
        this.tickets = res
        this.maxCount = Math.max(...this.tickets.map(ticket => ticket.count));
      }
    )
  }
}
