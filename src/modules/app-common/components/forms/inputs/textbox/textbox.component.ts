import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormFieldModel, InputText} from '../../../inputs/input.model';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss']
})
export class TextboxComponent implements OnInit {

  @Input() field: FormFieldModel;
  @Input() form: FormGroup;

  inputText: InputText = null;

  constructor() {

  }

  ngOnInit(): void {
    const inputText: InputText = (this.field.input as InputText);
    this.inputText = inputText;
  }

  get isValid(): boolean {
    return this.form.controls[this.field.name].valid;
  }

  get isTouched(): boolean {
    return this.form.controls[this.field.name].touched;
  }

}
