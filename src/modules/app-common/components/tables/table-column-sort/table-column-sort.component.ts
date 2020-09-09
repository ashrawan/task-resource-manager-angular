import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-table-column-sort',
  templateUrl: './table-column-sort.component.html',
  styleUrls: ['./table-column-sort.component.scss']
})
export class TableColumnSortComponent implements OnInit {

  @Input() direction!: string;

  constructor() {}
  ngOnInit(): void { }

}
