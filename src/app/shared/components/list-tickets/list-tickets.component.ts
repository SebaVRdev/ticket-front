import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Ticket } from '../../../core/models/types';
import { TruncateTextPipe } from '../../pipes/truncate-text.pipe';

@Component({
  selector: 'app-list-tickets',
  standalone: true,
  imports: [RouterLink, CommonModule, TruncateTextPipe],
  templateUrl: './list-tickets.component.html',
  styleUrl: './list-tickets.component.css'
})
export class ListTicketsComponent {
  @Input("tickets") tickets!: Ticket[] ;
  constructor() { }
}
