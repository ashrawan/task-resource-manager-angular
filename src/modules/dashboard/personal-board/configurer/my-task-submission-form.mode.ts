import {
  DynamicFormModel,
  FieldValidate,
  InputCustomResources,
  InputFile,
  InputText
} from '../../../app-common/components/inputs/input.model';

export const myTaskSubmissionDynamicFormModel: DynamicFormModel[] = [
  {
    className: '',
    formFields: [
      {
        type: 'text',
        name: 'id',
        label: 'Task Id',
        input: {
          value: null,
        } as InputText,
        fieldValidators: null,
        isReadOnly: true,
        className: '',
      },
    ]
  },
  {
    className: '',
    formFields: [
      {
        type: 'CUSTOM_RESOURCE_UPLOAD',
        name: 'taskResources',
        label: 'Resources',
        input: {
          placeholder: 'Select files to upload',
          resources: [],
        } as InputCustomResources,
        fieldValidators: {
          required: true,
        } as FieldValidate,
        className: '',
      },
    ]
  },
  {
    className: '',
    formFields: [
      {
        type: 'text',
        name: 'descSubmission',
        label: 'Description Submission',
        input: {
          placeholder: 'Enter title',
          multiline: true,
          rowNum: 4,
          value: null,
        } as InputText,
        fieldValidators: {
          required: false,
        } as FieldValidate,
        className: '',
      },
    ]
  },
  {
    className: '',
    formFields: [
      {
        type: 'text',
        name: 'assignedTo',
        label: 'Assigned To',
        input: {
          value: null,
        } as InputText,
        fieldValidators: null,
        isReadOnly: true,
        className: '',
      },
    ]
  },
];

