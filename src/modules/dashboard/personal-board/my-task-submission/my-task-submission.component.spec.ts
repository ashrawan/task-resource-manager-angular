import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTaskSubmissionComponent } from './my-task-submission.component';

describe('MyTaskSubmissionComponent', () => {
  let component: MyTaskSubmissionComponent;
  let fixture: ComponentFixture<MyTaskSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTaskSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTaskSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
