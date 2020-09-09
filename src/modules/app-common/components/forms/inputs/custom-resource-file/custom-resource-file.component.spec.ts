import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomResourceFileComponent } from './custom-resource-file.component';

describe('CustomResourceFileComponent', () => {
  let component: CustomResourceFileComponent;
  let fixture: ComponentFixture<CustomResourceFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomResourceFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomResourceFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
