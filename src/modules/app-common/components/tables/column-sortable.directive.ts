import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { asc: 'desc', desc: '', '': 'asc' };

export interface SortEvent {
  column: string;
  direction: SortDirection;
}
@Directive({
  selector: 'th[sortColumn]',
})
export class ColumnSortableDirective {

  @Input() sortColumn!: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  @HostBinding('class.asc') get isAscending(): boolean {
    return this.direction === 'asc';
  }
  @HostBinding('class.desc') get isDescending(): boolean {
    return this.direction === 'desc';
  }
  @HostListener('click') rotate(): any {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortColumn, direction: this.direction });
  }

}
