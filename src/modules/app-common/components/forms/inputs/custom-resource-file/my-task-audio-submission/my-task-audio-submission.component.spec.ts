import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTaskAudioSubmissionComponent } from './my-task-audio-submission.component';

describe('MyTaskAudioSubmissionComponent', () => {
  let component: MyTaskAudioSubmissionComponent;
  let fixture: ComponentFixture<MyTaskAudioSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTaskAudioSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTaskAudioSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
