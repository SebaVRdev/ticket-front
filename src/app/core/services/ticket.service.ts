import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Global } from './global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private url: string;
  private token: string;
  constructor(
    private http:HttpClient,
    private authService: AuthService
  ) { 
    this.url = Global.url; 
    this.token = this.authService.getToken() as string;
  }

  getTickets(page: number, limit: number) : Observable<any> {
    const headers = new HttpHeaders().set('x-token', this.token);
    const params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
    return this.http.get(this.url + 'ticket', {headers, params});
  }

  getTicketsById(id: string) : Observable<any> {
    const headers = new HttpHeaders().set('x-token', this.token);
    return this.http.get(this.url + `ticket/${id}`, {headers});
  }

  obtenerCategorias() : Observable<any> {
    const headers = new HttpHeaders().set('x-token', this.token);
    return this.http.get(this.url + `ticket/categorias`, {headers});
  }

  createTicket(ticket: any) : Observable<any> {
    const params= JSON.stringify(ticket);
    console.log(params)
    const headers = new HttpHeaders().set('x-token', this.token);
    return this.http.post(this.url + `ticket/create-ticket`, ticket ,{headers});
  }

  getTicketsForMes(): Observable<any> {
    const headers = new HttpHeaders().set('x-token', this.token);
    return this.http.get(this.url + `ticket/ticketsPorMes`, {headers});
  }
}
