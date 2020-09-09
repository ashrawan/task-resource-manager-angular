import {
  DynamicFormModel,
  FieldValidate,
  InputSelect,
  InputSelectOption,
  InputText
} from '../../../app-common/components/inputs/input.model';

export const UserDynamicFormModel: DynamicFormModel[] = [
  {
    className: '',
    formFields: [
      {
        type: 'text',
        name: 'id',
        label: 'User Id',
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
        name: 'fullName',
        label: 'Full Name',
        input: {
          value: '',
          placeholder: 'Enter full name'
        } as InputText,
        fieldValidators: {
          required: true,
        } as FieldValidate,
        className: 'col',
      },
      {
        type: 'text',
        name: 'username',
        label: 'User Name',
        input: {
          value: '',
          placeholder: 'Enter user name'
        } as InputText,
        fieldValidators: {
          required: true,
        } as FieldValidate,
        disableOnUpdate: true,
        className: 'col',
      },
      {
        type: 'password',
        name: 'password',
        label: 'Password',
        input: {
          value: '',
          placeholder: 'Enter password'
        } as InputText,
        fieldValidators: {
          required: true,
        } as FieldValidate,
        disableOnUpdate: true,
        className: 'col-12',
      },
      {
        type: 'select',
        name: 'role',
        label: 'User Role',
        input: {
          items: null,
          value: null,
          bindLabel: 'key',
          bindValue: 'value',
          placeholder: 'Select User Role',
          itemsLoader: 'Select_User_Role'
        } as InputSelect,
        fieldValidators: {
          required: true,
        } as FieldValidate,
        className: '',
      }
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
  // {
  //   className: '',
  //   formFields: [
  //     {
  //       type: 'none',
  //       name: 'address',
  //       label: 'Address',
  //       input: null,
  //       fieldValidators: null,
  //       className: '',
  //       subFormGroup: [
  //         {
  //           className: '',
  //           formFields: [
  //             {
  //               type: 'text',
  //               name: 'city',
  //               label: 'City',
  //               input: {
  //                 placeholder: 'Enter City'
  //               } as InputText,
  //               fieldValidators: {
  //                 required: true,
  //                 maxLength: 100
  //               } as FieldValidate,
  //               className: 'col-4',
  //               isSubForm: true
  //             },
  //             {
  //               type: 'text',
  //               name: 'state',
  //               label: 'State',
  //               input: {
  //                 placeholder: 'Enter State'
  //               } as InputText,
  //               fieldValidators: {
  //                 required: false,
  //                 maxLength: 100
  //               } as FieldValidate,
  //               className: 'col-4',
  //               isSubForm: true
  //             },
  //             {
  //               type: 'text',
  //               name: 'country',
  //               label: 'Country',
  //               input: {
  //                 placeholder: 'Enter Country'
  //               } as InputText,
  //               fieldValidators: {
  //                 required: true,
  //                 maxLength: 100
  //               } as FieldValidate,
  //               className: 'col-4',
  //               isSubForm: true
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //   ]
  // }
];
