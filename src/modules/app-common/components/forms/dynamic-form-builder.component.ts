import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {AbstractControlOptions, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {
  DynamicFormModel,
  FieldValidate,
  FormFieldModel,
  InputCheckbox,
  InputCustomResources,
  InputDate,
  InputFile,
  InputRadio,
  InputSelect,
  InputText
} from '../inputs/input.model';

@Component({
  selector: 'app-dynamic-form-builder',
  templateUrl: './dynamic-form-builder.component.html',
  styleUrls: ['./dynamic-form-builder.component.scss']
})
export class DynamicFormBuilderComponent implements OnInit, OnChanges {

  @Output() formSubmit: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Input() dynamicFormModel: DynamicFormModel[];

  // Form configurable inputs
  @Input() isUpdate = false;
  @Input() patchValue: object = {};
  @Input() resetForm = false;

  // <app-dynamic-form> - Inputs on Self selection
  @Input() isChildForm = false;
  @Input() currentForm: FormGroup = null;

  isFormInitialized = false;
  isSubmitted: boolean;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    console.log('ng init dynamic form', this.currentForm);
    if (this.isChildForm) {
      // this.currentForm = this.currentForm;
      console.log('Child form initialized ', this.currentForm);
    } else {
      this.processDynamicForm(this.dynamicFormModel);
      console.log('Main Parent form initialized ', this.currentForm);
    }
    this.isFormInitialized = true;
    this.patchFormValue();
  }

  ngOnChanges(): void {
    console.log('ng on changes dynamic form, isChildForm', this.isChildForm);
    if (this.resetForm) {
      this.currentForm.reset();
    }
    // this.patchFormValue();
  }

  onFormSubmission(): void {
    this.isSubmitted = true;
    this.currentForm.markAllAsTouched();
    this.formSubmit.emit(this.currentForm);
  }

  patchFormValue(): void {
    if (this.patchValue) {
      Object.entries(this.patchValue).map(([key, value]) => {
        if (this.currentForm.contains(key)) {
          if (typeof value !== 'object' || typeof value !== 'function') {
            this.currentForm.controls[key].patchValue(value);
          }
        }
      });
    }
  }

  private processDynamicForm(dynamicFormGroupModels: DynamicFormModel[]): void {
    const mainFormGroup: any = {};
    for (const dynamicForm of dynamicFormGroupModels) {
      this.currentForm = this.populateFormGroup(dynamicForm.formFields, mainFormGroup);
    }
  }

  private populateFormGroup(formFieldModels: FormFieldModel[], formGroup: any): FormGroup {
    // const formGroup: {} = {};
    for (const formField of formFieldModels) {
      const {type, input, name, fieldValidators, disableValidation, isSubForm, subFormGroup} = formField;
      let validatorsArray: ValidatorFn | ValidatorFn[] | AbstractControlOptions = [];
      const isFieldAvailable: boolean = !this.isUpdate || !formField.disableOnUpdate;
      if (!disableValidation && fieldValidators != null && isFieldAvailable) {
        validatorsArray = this.initializeFieldValidators(fieldValidators);
      }
      if (isFieldAvailable) {
        if (type === 'text' || type === 'password') {
          const inputText: InputText = (input as InputText);
          formGroup[name] = new FormControl(inputText.value, validatorsArray);
        }
        if (type === 'number') {
          const inputText: InputText = (input as InputText);
          formGroup[name] = new FormControl(inputText.value, validatorsArray);
        }
        if (type === 'select') {
          const inputSelect: InputSelect = (input as InputSelect);
          formGroup[name] = new FormControl(inputSelect.value, validatorsArray);
        }
        if (type === 'radio') {
          const inputRadio: InputRadio = (input as InputRadio);
          formGroup[name] = new FormControl(inputRadio.value, validatorsArray);
        }
        if (type === 'checkbox') {
          const inputCheckbox: InputCheckbox = (input as InputCheckbox);
          formGroup[name] = new FormControl(inputCheckbox.value, validatorsArray);
        }
        if (type === 'date') {
          const inputDate: InputDate = (input as InputDate);
          formGroup[name] = new FormControl(inputDate.value, validatorsArray);
        }
        if (type === 'file') {
          const inputFile: InputFile = (input as InputFile);
          formGroup[name] = new FormControl(null, validatorsArray);
        }
        if (type === 'CUSTOM_RESOURCE_UPLOAD') {
          const inputCustomResources: InputCustomResources = (input as InputCustomResources);
          formGroup[name] = new FormControl(inputCustomResources.resources, validatorsArray);
        }
        if (subFormGroup && subFormGroup.length > 0) {
          subFormGroup.map(value => {
            const childFormGroup: FormGroup = this.populateFormGroup(value.formFields, {});
            formGroup[name] = childFormGroup;
          });
        }
      }
    }
    return new FormGroup(formGroup);
  }

  private initializeFieldValidators(fieldValidate: FieldValidate): ValidatorFn | ValidatorFn[] | AbstractControlOptions {
    const validatorsArray: ValidatorFn | ValidatorFn[] | AbstractControlOptions = [];
    if (fieldValidate.required) {
      validatorsArray.push(Validators.required);
    }
    if (fieldValidate.maxLength) {
      validatorsArray.push(Validators.maxLength(fieldValidate.maxLength));
    }
    if (fieldValidate.minLength) {
      validatorsArray.push(Validators.minLength(fieldValidate.minLength));
    }
    if (fieldValidate.minValue) {
      validatorsArray.push(Validators.min(fieldValidate.minValue));
    }
    if (fieldValidate.maxValue) {
      validatorsArray.push(Validators.max(fieldValidate.maxValue));
    }
    if (fieldValidate.pattern && fieldValidate.pattern.length > 0) {
      validatorsArray.push(Validators.pattern(fieldValidate.pattern));
    }
    return validatorsArray;
  }
}
