import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {CustomFormConfig, FieldValidate, FormFieldModel} from '../../inputs/input.model';

@Component({
  selector: 'app-input-builder',
  templateUrl: './input-builder.component.html',
  styleUrls: ['./input-builder.component.scss']
})
export class InputBuilderComponent implements OnInit {

  @Input() formField: FormFieldModel;
  @Input() formGroup: FormGroup;
  @Input() customFormConfig: CustomFormConfig;

  get isValid(): boolean {
    return this.formGroup.controls[this.formField.name].valid;
  }

  get isTouched(): boolean {
    return this.formGroup.controls[this.formField.name].touched;
  }

  get showRequiredLabel(): boolean {
    if(this.formField.fieldValidators && this.formField.fieldValidators.required) {
      return true;
    }
    return false;
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
