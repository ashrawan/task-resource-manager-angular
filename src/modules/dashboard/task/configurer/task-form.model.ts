import {DynamicFormModel, FieldValidate, InputDate, InputSelect, InputText} from '../../../app-common/components/inputs/input.model';

export const TaskDynamicFormModel: DynamicFormModel[] = [
  {
    className: '',
    formFields: [
      {
        type: 'text',
        name: 'id',
        label: 'User Name',
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
        type: 'text',
        name: 'title',
        label: 'Title',
        input: {
          placeholder: 'Enter title',
          value: null,
        } as InputText,
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
        name: 'description',
        label: 'Description',
        input: {
          placeholder: 'Enter task description',
          value: null,
          multiline: true,
          rowNum: 3
        } as InputText,
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
        type: 'date',
        name: 'startDate',
        label: 'Start Date',
        input: {
          placeholder: 'Enter start date',
          value: null,
        } as InputDate,
        fieldValidators: {
          required: false,
        } as FieldValidate,
        className: 'col-6',
      },
      {
        type: 'date',
        name: 'endDate',
        label: 'End Date',
        input: {
          placeholder: 'Enter end date',
          value: null,
        } as InputDate,
        fieldValidators: {
          required: false,
        } as FieldValidate,
        className: 'col-6',
      },
    ]
  },
  {
    className: '',
    formFields: [
      {
        type: 'select',
        name: 'assignedTo',
        label: 'Assign To',
        input: {
          items: [],
          value: null,
          bindLabel: 'fullName',
          bindValue: 'object()',
          placeholder: 'Select User',
          itemsLoader: 'Select_User'
        } as InputSelect,
        fieldValidators: {
          required: true,
        } as FieldValidate,
        className: 'col',
      },
      {
        type: 'select',
        name: 'reportTo',
        label: 'Report To',
        input: {
          items: [],
          value: null,
          bindLabel: 'fullName',
          bindValue: 'object()',
          placeholder: 'Select User',
          itemsLoader: 'Select_User'
        } as InputSelect,
        fieldValidators: {
          required: true,
        } as FieldValidate,
        className: 'col',
      },
    ]
  },
  {
    className: '',
    formFields: [
      {
        type: 'select',
        name: 'status',
        label: 'Status',
        input: {
          items: null,
          value: null,
          bindLabel: 'key',
          bindValue: 'value',
          placeholder: 'Select Status',
          itemsLoader: 'Select_User_Status'
        } as InputSelect,
        fieldValidators: {
          required: true,
        } as FieldValidate,
        className: '',
      },
    ]
  },
];

