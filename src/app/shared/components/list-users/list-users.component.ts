import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfo } from '../../../core/models/userInfo.types';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent {
  @Input('users') users!: UserInfo[];
  @Output() estadoUser = new EventEmitter<string>();
  isAdmin: Boolean = false;

  constructor(
    private authService: AuthService
  ){
    this.checkAdminRole()
  }

  cambiarEstadoUsuario(user: any): void {
    this.estadoUser.emit(user);
  }

  checkAdminRole(): void{
    this.authService.user$.subscribe(user => {
      if (user?.role === "ADMIN_ROLE") {
        this.isAdmin = true;
      }
    })
  }
}
