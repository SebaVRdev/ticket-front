import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule], //Se agrega el commonModule para poder usar los ngIf y otras cosas
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {

  @Input() page: number = 1;
  @Input() total: number = 0;
  @Input() limit: number = 10;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.total / this.limit);
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.pageChange.emit(this.page);
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.pageChange.emit(this.page);
    }
  }

}
