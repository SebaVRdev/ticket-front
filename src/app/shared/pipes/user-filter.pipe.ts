import { Pipe, PipeTransform } from '@angular/core';
import { UserInfo } from '../../core/models/userInfo.types';

@Pipe({
  name: 'userFilter',
  standalone: true
})
export class UserFilterPipe implements PipeTransform {

  transform(users: UserInfo[], role: string, status: string): UserInfo[] {
    if (!users) return [];
    
    let filteredUsers = users;

    if (role) {
      filteredUsers = filteredUsers.filter(user => user.role === role);
    }

    if (status) {
      const isActive = status === 'activo';
      filteredUsers = filteredUsers.filter(user => user.estado === isActive);
    }

    return filteredUsers;
  }
}
