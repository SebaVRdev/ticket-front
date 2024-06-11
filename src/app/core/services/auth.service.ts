import { Injectable } from '@angular/core';
import { Global } from './global';
import { BehaviorSubject, Observable, ReplaySubject, firstValueFrom, map, tap } from 'rxjs';
import { UserWithToken } from '../models/types';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginCredentials } from '../models/login-credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string;
  private user = new ReplaySubject<UserWithToken | null>(1);
  user$ = this.user.asObservable();
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(Boolean));
  private isLoading = new BehaviorSubject<boolean>(true);
  isLoading$ = this.isLoading.asObservable();

  constructor(
    private http:HttpClient,
    private router: Router
  ) { 
    this.url = Global.url; 
    this.loadUserFromLocalStorage();
    this.isAuthenticated();
  }


  loginUser(credentials:LoginCredentials): Observable<any> {
    const params= JSON.stringify(credentials);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'auth/login', params, { headers }).pipe(
      tap((res) => this.saveTokenLocalStorage(res)),
      tap((res) => this.pushNewUser(res)),
      tap((res) => this.redirectToPage(res)),
    )
  } 

  private loadUserFromLocalStorage() : void {
    const userFromLocal = localStorage.getItem("userData");
    if (userFromLocal) {
      console.log("Existe token")
      //Vamos a buscar el usuario que le pertenece el token
      const headers = new HttpHeaders().set('x-token', userFromLocal);
      this.http.get<any>(this.url + 'auth/check', { headers }).subscribe(
        res => {
          this.pushNewUser(res);
          this.isLoading.next(false);
        },
        error => {
          console.error('Error al verificar el token:', error);
          this.isLoading.next(false);
        } 
      )
    }
  }

  logout(): void {
    this.removeUserFromLocalStorage();
    this.user.next(null);
    this.router.navigateByUrl('/login');
  }

  private saveTokenLocalStorage(userToken: any):void {
    const { token } = userToken;
    localStorage.setItem('userData', token);
  }

  private removeUserFromLocalStorage(): void {
    localStorage.removeItem('userData');
  }

  private pushNewUser(res: any) {
    const { user, token } = res;
    const saveUser = {
      uid: user.uid,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    };
    this.user.next(saveUser);
  }

  private redirectToPage(res: any):void {
    const { role } = res.user;
    if (role === 'CLIENT_ROLE') {
      this.router.navigateByUrl('/client');
    } else if (role === 'ADMIN_ROLE') {
      this.router.navigate(['/dashboard']);
    }else if (role === 'TECNIC_ROLE'){
      this.router.navigate(['/dashboard/tickets']);
    }else {
      console.log('Rol desconocido');
    } 
  }

  getToken(): string | null {
    return localStorage.getItem('userData');
  }

  async isAuthenticated(): Promise<boolean> {
    const isLoggedIn = await firstValueFrom(this.isLoggedIn$);
    console.log(isLoggedIn !== null)
    return isLoggedIn;
  }

}
