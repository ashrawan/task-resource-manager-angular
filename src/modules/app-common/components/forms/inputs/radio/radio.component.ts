import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormFieldModel, InputRadio, InputText} from '../../../inputs/input.model';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit {

  @Input() field: FormFieldModel;
  @Input() form: FormGroup;
  @Input() isSubmitted: boolean;

  inputRadio: InputRadio = null;

  constructor() {
    const inputRadio: InputRadio = (this.field.input as InputRadio);
    this.inputRadio = inputRadio;
  }

  get isValid(): boolean {
    return this.form.controls[this.field.name].valid;
  }

  get isTouched(): boolean {
    return this.form.controls[this.field.name].touched;
  }

  ngOnInit(): void {
  }

}
