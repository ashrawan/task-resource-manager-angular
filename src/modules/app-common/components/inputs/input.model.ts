import {APISelectInputType} from '../../generic-services/select-input-configurer';

export interface DynamicFormModel {
  formFields: FormFieldModel[];
  className: string;
}

export interface FormFieldModel {
  type: 'text' | 'password' | 'number' | 'select' | 'radio' | 'checkbox' | 'date' | 'file' | 'CUSTOM_RESOURCE_UPLOAD' | 'none';
  input: FormInputType;
  name: string;
  label: string;
  className?: string;
  isReadOnly?: boolean;
  disableOnUpdate?: boolean;
  fieldValidators?: FieldValidate;
  disableValidation?: boolean;
  isSubForm?: boolean;
  subFormGroup?: DynamicFormModel[];
}

// export interface FormInputValidator {
//   validation: boolean;
//   validators: Validators[];
// }
export interface FieldValidate {
  required: boolean;
  requiredMsg: string;
  minLength: number;
  minLengthMsg: string;
  maxLength: number;
  maxLengthMsg: string;
  minValue: number;
  minValueMsg: string;
  maxValue: number;
  maxValueMsg: string;
  pattern: string;
  patternMsg: string;
  custom: any;
  customMsg: string;
}

export type FormInputType = InputText | InputSelect | InputRadio | InputCheckbox | InputDate | InputFile | InputCustomResources | null;

export interface InputText {
  value: string;
  placeholder: string;
  multiline: boolean;
  rowNum: number;
}

export interface InputSelectOption {
  key: string;
  value: string;
}

export interface InputSelect {
  items: any[] | InputSelectOption[] | null;
  value: any;
  multiple: boolean;
  searchable: boolean;
  bindLabel: string;
  bindValue: string | 'object()';
  placeholder: string;
  closeOnSelect: boolean;
  itemsLoader: APISelectInputType;
}

export interface InputRadio {
  items: [];
  value: string;
  bindLabel: string;
  bindValue: string;
}

export interface InputCheckbox {
  items: [];
  value: string;
  bindLabel: string;
  bindValue: string;
}

export interface InputDate {
  value: string;
  placeholder: string;
}

export interface InputFile {
  files: [];
  placeholder: string;
  selectedFile: any;
}

export interface InputCustomResources {
  resources: [];
  placeholder: string;
}

export interface CustomFormConfig {
  disableAll?: boolean;
  disableAudio?: boolean;
}
