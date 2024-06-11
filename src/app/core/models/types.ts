export interface Cliente {
  name: string;
  email: string;
}
  
  export interface User {
    uid: string;
    name: string;
    email: string;
    role: string;
  }
  export interface UserWithToken extends User{
    token: string
  }

  export interface Tecnico {
    user: User;
    nivel: string;
  }
  
  export interface Ticket {
    _id: string;
    title: string;
    cuerpo: string;
    categoria: Categoria[];
    cliente: Cliente;
    tecnicos: Tecnico[];
    prioridad: string;
    estado: boolean;
  }

  export interface Categoria{
    _id: string;
    nombre: string;
    descripcion: string;
  }
  
  export interface TicketPorMes {
    month: string;
    count: number;
  }