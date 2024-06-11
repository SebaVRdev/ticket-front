import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Ticket, UserWithToken } from '../../../core/models/types';
import { TruncateTextPipe } from '../../pipes/truncate-text.pipe';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-list-tickets',
  standalone: true,
  imports: [RouterLink, CommonModule, TruncateTextPipe],
  templateUrl: './list-tickets.component.html',
  styleUrl: './list-tickets.component.css'
})
export class ListTicketsComponent implements OnInit {
  @Input("tickets") tickets!: Ticket[] ;
  userRole: string | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe((user: UserWithToken | null) => {
      if (user) {
        this.userRole = user.role;
      }
    });
  }

  getTicketUrl(ticketId: string): string {
    if (this.userRole === 'CLIENT_ROLE') {
      return `/client/ticket/${ticketId}`;
    } else if (this.userRole === 'ADMIN_ROLE' || this.userRole === 'TECNIC_ROLE') {
      return `/dashboard/ticket/${ticketId}`;
    } else {
      return '#'; // o cualquier ruta de fallback que consideres apropiada
    }
  }
}
