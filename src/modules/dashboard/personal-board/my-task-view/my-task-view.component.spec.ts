import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTaskViewComponent } from './my-task-view.component';

describe('MyTaskViewComponent', () => {
  let component: MyTaskViewComponent;
  let fixture: ComponentFixture<MyTaskViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTaskViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTaskViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
