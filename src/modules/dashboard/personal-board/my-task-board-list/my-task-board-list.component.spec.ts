import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTaskBoardListComponent } from './my-task-board-list.component';

describe('MyTaskBoardListComponent', () => {
  let component: MyTaskBoardListComponent;
  let fixture: ComponentFixture<MyTaskBoardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTaskBoardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTaskBoardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
