import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormFieldModel, InputCheckbox, InputFile} from '../../../inputs/input.model';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  @Input() field: FormFieldModel;
  @Input() form: FormGroup;

  inputCheckbox: InputCheckbox = null;

  constructor() {
  }

  ngOnInit(): void {
    const inputCheckbox: InputCheckbox = (this.field.input as InputCheckbox);
    this.inputCheckbox = inputCheckbox;
  }

  get isValid(): boolean {
    return this.form.controls[this.field.name].valid;
  }

  get isTouched(): boolean {
    return this.form.controls[this.field.name].touched;
  }

}
