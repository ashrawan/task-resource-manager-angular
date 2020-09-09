import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputBuilderComponent } from './input-builder.component';

describe('InputBuilderComponent', () => {
  let component: InputBuilderComponent;
  let fixture: ComponentFixture<InputBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
