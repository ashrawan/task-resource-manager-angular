import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {IconsModule} from './icons/icons.module';
import {CardComponent} from './components/cards/card/card.component';
import {CardViewDetailsComponent} from './components/cards/card-view-details/card-view-details.component';
import {TableComponent} from './components/tables/table/table.component';
import {TableColumnSortComponent} from './components/tables/table-column-sort/table-column-sort.component';
import {ColumnSortableDirective} from './components/tables/column-sortable.directive';
import {HttpInterceptorService} from './services/http-interceptor.service';
import {AuthGuard} from './guard/auth.guard';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CheckboxComponent} from './components/forms/inputs/checkbox/checkbox.component';
import {SelectboxComponent} from './components/forms/inputs/selectbox/selectbox.component';
import {FileComponent} from './components/forms/inputs/file/file.component';
import {RadioComponent} from './components/forms/inputs/radio/radio.component';
import {TextboxComponent} from './components/forms/inputs/textbox/textbox.component';
import {InputBuilderComponent} from './components/forms/input-builder/input-builder.component';
import {DynamicFormBuilderComponent} from './components/forms/dynamic-form-builder.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgOptionHighlightModule} from '@ng-select/ng-option-highlight';
import {DateComponent} from './components/forms/inputs/date/date.component';
import {CustomFileUploadComponent} from './components/forms/inputs/custom-file-upload/custom-file-upload.component';
import {FileUploadModalComponent} from './components/forms/inputs/custom-file-upload/file-upload-modal/file-upload-modal.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {CustomResourceFileComponent} from './components/forms/inputs/custom-resource-file/custom-resource-file.component';
import { DragDropFileDirective } from './components/forms/inputs/custom-resource-file/drag-drop/drag-drop-file.directive';
import {ErrorModule} from './error/error.module';


const components = [
  CardComponent,
  CardViewDetailsComponent,
  // table
  TableComponent,
  TableColumnSortComponent,
  ColumnSortableDirective,
  //  forms-custom
  CheckboxComponent,
  SelectboxComponent,
  FileComponent,
  RadioComponent,
  TextboxComponent,
  InputBuilderComponent,
  DynamicFormBuilderComponent
];

@NgModule({
  declarations: [
    ...components,
    DateComponent,
    CustomFileUploadComponent,
    FileUploadModalComponent,
    CustomResourceFileComponent,
    DragDropFileDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgSelectModule,
    ErrorModule,
    NgOptionHighlightModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    IconsModule,
    ModalModule.forRoot()
  ],
  providers: [AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  exports: [
    NgbModule,
    IconsModule,
    NgSelectModule,
    ...components,
    CustomFileUploadComponent,
    CustomResourceFileComponent,
  ]
})
export class AppCommonModule {
}
