import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormFieldModel, InputSelect} from '../../../inputs/input.model';
import {FormUtil} from '../../form-util';
import {NgSelectComponent} from '@ng-select/ng-select';
import {SelectInputConfigurer} from '../../../../generic-services/select-input-configurer';

@Component({
  selector: 'app-selectbox',
  templateUrl: './selectbox.component.html',
  styleUrls: ['./selectbox.component.scss']
})
export class SelectboxComponent implements OnInit {

  @Input() field: FormFieldModel;
  @Input() form: FormGroup;

  inputSelect: InputSelect = null;
  items: Array<any> = [];

  constructor(private selectInputConfigurer: SelectInputConfigurer) {
  }

  ngOnInit(): void {
    console.log('ng on init selectbox');
    const inputSelect: InputSelect = (this.field.input as InputSelect);
    this.inputSelect = inputSelect;
    this.initSelectItems();
  }

  initSelectItems(): void {
    if (this.inputSelect.itemsLoader) {
      this.selectInputConfigurer.loadSelectData(this.inputSelect.itemsLoader).subscribe(value => {
        this.items = value;
        this.patchSelectValue();
      });
    } else {
      this.items = this.inputSelect.items;
    }
  }

  patchSelectValue(): void {
    if (this.inputSelect.value != null) {
      if (this.inputSelect.bindValue === 'object()') {
        console.log('patching object');
        this.form.controls[this.field.name].patchValue(this.inputSelect.value);
      } else {
        const bindValue: string = this.inputSelect.bindValue;
        console.log('patching bindvalue with', bindValue);
        this.form.controls[this.field.name].patchValue(this.inputSelect.value[bindValue]);
      }
    }
  }

  openSelect(select: NgSelectComponent): void {
    select.open();
  }

  closeSelect(select: NgSelectComponent): void {
    select.close();
  }

  selectItemsRange(from, to): void {
    this.items = this.items.slice(from, to);
  }

  get isRequired(): boolean {
    return FormUtil.isFieldRequired(this.field);
  }

  get isValid(): boolean {
    return this.form.controls[this.field.name].valid;
  }

  get isTouched(): boolean {
    return this.form.controls[this.field.name].touched;
  }

}
