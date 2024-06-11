import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShowForRolesDirective } from '../../directives/show-for-roles.directive';
@Component({
  selector: 'app-user-filters',
  standalone: true,
  imports: [CommonModule, FormsModule, ShowForRolesDirective],
  templateUrl: './user-filters.component.html',
  styleUrl: './user-filters.component.css'
})
export class UserFiltersComponent {
  roles: string[] = ['CLIENT_ROLE', 'TECNIC_ROLE'];
  @Input() selectedRole: string = ''; //Filtrar al escoger role
  @Input() selectedStatus: string = ''; // Filtrar al escoger estado (activo-inactivo)
  @Input() searchName: string = ''; //Filtrar al buscar por nombre
  @Output() roleChange = new EventEmitter<string>();
  @Output() statusChange = new EventEmitter<string>();
  @Output() searchChange = new EventEmitter<string>();

  onRoleChange(role: string): void {
    this.roleChange.emit(role);
  }

  onStatusChange(status: string): void {
    this.statusChange.emit(status);
  }

  onSearchChange(name: string): void {
    this.searchChange.emit(name);
  }
}
