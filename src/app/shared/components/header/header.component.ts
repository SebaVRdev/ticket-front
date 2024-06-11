import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ShowForRolesDirective } from '../../directives/show-for-roles.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ShowForRolesDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(
    private authService: AuthService
  ){}
  logout(): void {
    this.authService.logout();
  }
}
