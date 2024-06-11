import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from '../models/roles.types';
import { map, tap } from 'rxjs';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
 
  return authService.isAuthenticated().then(data => {
    if (data) {
      return data
    }
    else{
      return router.createUrlTree(['/login']);
    }
  })
};

export function hasRole(allowedRoles: Role[]) {
  return() => {
    const authService = inject(AuthService);
    return authService.user$.pipe(
      map((user) => Boolean(user && allowedRoles.includes(user.role))),
      tap((hasRole) => hasRole === false && alert('Acceso Denegado') )
    )
  }
}
