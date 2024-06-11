import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '', loadChildren: () => import('./pages/auth/auth.routes').then(m => m.AUTH_ROUTES) },
    { path: 'dashboard', loadChildren: () => import('./pages/admin/admin.routes').then(m => m.ADMIN_ROUTES) },
    { path: 'client', loadChildren: () => import('./pages/tickets/ticket.routes').then(m => m.TICKET_ROUTES) },
    { path: '**', redirectTo: '/login', pathMatch: 'full' } 
];
