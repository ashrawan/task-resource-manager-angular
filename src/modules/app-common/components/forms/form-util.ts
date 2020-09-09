import {FormFieldModel, FormInputType} from '../inputs/input.model';

export class FormUtil {

  static isFieldRequired = (fieldModel: FormFieldModel) => {
    return fieldModel.fieldValidators && fieldModel.fieldValidators.required;
  }

  // static patchDynamicFormValue = (formInputType: FormInputType) => {
  //
  // }

}
