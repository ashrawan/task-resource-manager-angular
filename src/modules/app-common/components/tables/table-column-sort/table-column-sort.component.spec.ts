import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableColumnSortComponent } from './table-column-sort.component';

describe('TableColumnSortComponent', () => {
  let component: TableColumnSortComponent;
  let fixture: ComponentFixture<TableColumnSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableColumnSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableColumnSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
