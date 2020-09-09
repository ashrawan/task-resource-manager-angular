import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalTaskBoardComponent } from './personal-task-board.component';

describe('PersonalTaskBoardComponent', () => {
  let component: PersonalTaskBoardComponent;
  let fixture: ComponentFixture<PersonalTaskBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalTaskBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalTaskBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
