import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../../core/models/types';
import { TicketService } from '../../../core/services/ticket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ticket-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ticket-modal.component.html',
  styleUrl: './ticket-modal.component.css'
})
export class TicketModalComponent implements OnInit {

  ticket = {
    title: '',
    cuerpo: '',
    categoria: ''
  };

  categorias: Categoria[] = [];

  constructor(
    private ticketService : TicketService
  ){
    
  }

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.ticketService.obtenerCategorias().subscribe(
      categorias => {
        console.log("Cargando Categorias")
        this.categorias = categorias.categorias.map((categoria: Categoria) => {
          return { nombre: categoria.nombre, descripcion: categoria.descripcion, _id: categoria._id };
        });
      },
      error => {
        console.error('Error al obtener las categorías:', error);
      }
    );
  }

  onSubmit() {
    try {
      if (this.ticket && this.ticket.title && this.ticket.cuerpo && this.ticket.categoria) {
        const { title, cuerpo, categoria } = this.ticket;
        console.log({ title, cuerpo, categoria })
        this.ticketService.createTicket({title, cuerpo, categorias: [categoria]}).subscribe()
        this.ticket = { title: '', cuerpo: '', categoria: '' }; // Reset the form
        this.closeModal();
      } else {
        throw new Error;
      }
    } catch (error) {
      console.log(error)
    }
  }

  closeModal() {
    // Logic to close the modal
    const modal = document.getElementById('supportTicketModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
}
