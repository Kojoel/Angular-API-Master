import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Output() pageChange = new EventEmitter<number>();

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  
  // @Input() currentPage: number = 1;
  // @Input() totalItems: number = 0;
  // @Input() itemsPerPage: number = 10;
  // @Output() pageChanged = new EventEmitter<number>();

  // get totalPages(): number {
  //   return Math.ceil(this.totalItems / this.itemsPerPage);
  // }

  // onPageChange(page: number) {
  //   if (page >= 1 && page <= this.totalPages) {
  //     this.pageChanged.emit(page);
  //   }
  // }
}
