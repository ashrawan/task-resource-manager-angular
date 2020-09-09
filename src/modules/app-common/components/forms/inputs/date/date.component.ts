import {Component, Input, OnInit} from '@angular/core';
import {FormFieldModel, InputDate} from '../../../inputs/input.model';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {

  @Input() field: FormFieldModel;
  @Input() form: FormGroup;

  inputDate: InputDate = null;

  constructor() {

  }

  ngOnInit(): void {
    const inputDate: InputDate = (this.field.input as InputDate);
    this.inputDate = inputDate;
  }

  get isValid(): boolean {
    return this.form.controls[this.field.name].valid;
  }

  get isTouched(): boolean {
    return this.form.controls[this.field.name].touched;
  }

}
