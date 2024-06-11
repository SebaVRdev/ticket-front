import { Component, OnInit } from '@angular/core';
import { ListUsersComponent } from '../../../shared/components/list-users/list-users.component';
import { UserInfo } from '../../../core/models/userInfo.types';
import { UsersService } from '../../../core/services/users.service';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { UserFiltersComponent } from '../../../shared/components/user-filters/user-filters.component';

@Component({
  selector: 'app-user-control',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ,ListUsersComponent, PaginationComponent, UserFiltersComponent],
  templateUrl: './user-control.component.html',
  styleUrl: './user-control.component.css'
})
export class UserControlComponent implements OnInit{
  users: UserInfo[] = []

  page: number = 1;
  limit: number = 5;
  total: number = 0;

  selectedRole: string = '';
  selectedStatus: string = '';
  searchName: string = '';

  isSuperAdmin: boolean = false;

  roles: string[] = ['ADMIN_ROLE', 'TECNIC_ROLE'];
  formulario: FormGroup = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    nivel: new FormControl({ value: '', disabled: true }),
    role: new FormControl(),
  });

  constructor(
    private userService: UsersService,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.checkUserRole();
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers(this.page, this.limit, this.selectedRole, this.selectedStatus, this.searchName).subscribe(({ users, total }) => {
      this.users = users;
      this.total = total;
    });
  }


  checkUserRole(): void {
    this.authService.user$.subscribe(user => {
      if (user?.email == "seba@gmail.com") {
        this.isSuperAdmin = true;
      }
    });
  }

  onSubmit(){
    const name = this.formulario.value.username;
    const email = this.formulario.value.email;
    const role = this.formulario.value.role;
    const nivel = this.formulario.value.nivel;
    this.userService.registerAdminTec({ name, email, role, nivel }).subscribe(
      res => {console.log(res)}
    )
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.loadUsers();
  }

  cambiarEstado(user: any) {
    const { uid: id } = user;
    this.userService.cambiarEstado(id).subscribe(res => {
      this.loadUsers();
    });
  }


  onRoleChange(role: string): void {
    this.selectedRole = role;
    this.page = 1; // Reset to the first page
    this.loadUsers();
  }

  onStatusChange(status: string): void {
    this.selectedStatus = status;
    this.page = 1; // Reset to the first page
    this.loadUsers();
  }

  onSearchChange(text: string): void {
    this.searchName = text;
    this.page = 1; // Reset to the first page
    this.loadUsers(); 
  }
}
