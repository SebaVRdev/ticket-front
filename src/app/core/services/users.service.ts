import { Injectable } from '@angular/core';
import { Global } from './global';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, map, switchMap } from 'rxjs';
import { UserInfo } from '../models/userInfo.types';
import { LoginCredentials } from '../models/login-credentials';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url: string;
  constructor(
    private http:HttpClient,
    private authService: AuthService
  ) { 
    this.url = Global.url; 
  }

  getUsers(page: number, limit: number, role?: string, status?: string, searchName?: string): Observable<{users:UserInfo[], total:number}> {
    const headers = new HttpHeaders().set('x-token', this.authService.getToken() as string);
    const params = new HttpParams().set('page', page.toString()).set('limit', limit.toString()).set('role', role || "").set('status', status || "").set('searchName', searchName || "");

    return this.http.get<{usuarios: UserInfo[], total: number}>(this.url + 'users', { headers, params })
    .pipe(
      map( res => ({ users: res.usuarios, total: res.total }))
    );
  }

  registerClient(user: any) : Observable<any> {
    const params= JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'users/save-client', params, { headers }).pipe(
      switchMap((res: any) => {
        const loginCredentials: LoginCredentials = {
          email: user.email,
          password: user.password
        }
        return this.authService.loginUser(loginCredentials);
      })
    )
  }

  cambiarEstado(id: string) : Observable<UserInfo> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('x-token', this.authService.getToken() as string);
    return this.http.put<UserInfo>(this.url + `users/${id}/estado`, {} , { headers }).pipe(
      map((res: any) => {
        return res.user  
      })
    )
  }

  registerAdminTec(user: any) : Observable<any> {
    const params= JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('x-token', this.authService.getToken() as string);;
    return this.http.post(this.url + 'users/save-superuser', params, { headers }).pipe(
      map((res: any) => {
        return res.user  
      })
    )
  }
}
