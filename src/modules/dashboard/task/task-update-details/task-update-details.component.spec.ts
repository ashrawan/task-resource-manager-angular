import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskUpdateDetailsComponent } from './task-update-details.component';

describe('TaskUpdateDetailsComponent', () => {
  let component: TaskUpdateDetailsComponent;
  let fixture: ComponentFixture<TaskUpdateDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskUpdateDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskUpdateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
