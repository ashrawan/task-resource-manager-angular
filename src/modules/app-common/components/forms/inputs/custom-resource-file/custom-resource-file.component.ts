import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {CustomFormConfig, FormFieldModel, InputCustomResources} from '../../../inputs/input.model';
import {FormGroup} from '@angular/forms';
import {ResourceService} from '../../../../services/apis/resource.service';
import {ResourceInfo} from '../../../../services/model';
import {AbstractDataConfigurer} from '../../../../generic-services/abstract-data-configurer';
import {CustomResourceFileConfigurerService} from './configurer/custom-resource-file-configurer.service';
import {OpDataEmit} from '../../../tables/table-model';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-custom-resource-file',
  templateUrl: './custom-resource-file.component.html',
  styleUrls: ['./custom-resource-file.component.scss']
})
export class CustomResourceFileComponent implements OnInit, OnChanges, OnDestroy {

  @Input() field: FormFieldModel;
  @Input() form: FormGroup;
  @Input() customFormConfig: CustomFormConfig;

  triggerRefresh: Subject<void> = new Subject<void>();
  myTaskDataGridConfigurer!: AbstractDataConfigurer<ResourceInfo>;

  TABS = {ALL: 'ALL', AUDIO: 'AUDIO'};
  currentView: string = this.TABS.ALL;

  isUploaded: boolean;
  uploadProgressValue: number;
  fileSelectionResponseMsg: string;
  isHovering: boolean;
  isLoading: boolean;
  responseMessage: string;
  hasError: boolean;

  inputCustomResources: InputCustomResources = null;
  resourceInfos: ResourceInfo[] = [];

  constructor(private resourceService: ResourceService, private customResourceFileConfigurerService: CustomResourceFileConfigurerService) {
    this.myTaskDataGridConfigurer = customResourceFileConfigurerService;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.currentView = this.customFormConfig && this.customFormConfig.disableAll ? this.TABS.AUDIO : this.TABS.ALL;
    this.initResourcesFromFormPatch();
  }

  ngOnInit(): void {
    this.initResourcesFromFormPatch();
  }

  ngOnDestroy(): void {
    this.triggerRefresh.unsubscribe();
  }

  initResourcesFromFormPatch(): void {
    const formFilesValue = this.form.controls[this.field.name].value;
    this.resourceInfos = formFilesValue;
    this.validateResourceRequired();
    console.log('custom form config ', this.customFormConfig);
    this.form.controls[this.field.name].valueChanges.subscribe(selectedValue => {
      console.log('custom file form value changed', selectedValue);
      this.resourceInfos = selectedValue;
      this.validateResourceRequired();
    });
  }

  private validateResourceRequired(): void {
    console.log('is empty resource ', this.resourceInfos);
    const isResourcesEmpty: boolean = this.resourceInfos == null || this.resourceInfos.length < 1;
    if (this.field.fieldValidators && this.field.fieldValidators.required && isResourcesEmpty) {
      this.fileSelectionResponseMsg = 'Please Select resource';
    } else {
      this.fileSelectionResponseMsg = null;
    }
  }

  toggleHover($event): void {
    this.isHovering = !this.isHovering;
  }

  closeAlert(): void {
    return;
  }

  closeAlertTwo(): void {
    return;
  }

  clearStatesBeforeFormSubmit(): void {
    this.responseMessage = null;
    this.hasError = false;
    this.isLoading = true;
  }

  clearStatesAfterFormSubmit(isSuccess: boolean): void {
    if (isSuccess) {
      this.hasError = false;
      this.isUploaded = true;
    } else {
      this.hasError = true;
      this.isUploaded = false;
    }
    this.isLoading = false;
    this.validateResourceRequired();
  }

  onGridResourceSelection(opDataEmit: OpDataEmit): void {
    this.fileSelectionResponseMsg = null;
    if (opDataEmit.optionName === 'select') {
      let isFileAlreadySelected = false;
      const checkFilteredRes: ResourceInfo[] = [...this.resourceInfos];
      checkFilteredRes.some(value => {
        if (value.id === opDataEmit.data.id) {
          isFileAlreadySelected = true;
          return true;
        }
        return false;
      });
      if (!isFileAlreadySelected) {
        const newResData = [...checkFilteredRes, opDataEmit.data];
        this.form.controls[this.field.name].patchValue(newResData);
      } else {
        this.fileSelectionResponseMsg = 'This File is already Selected';
        setTimeout(() => this.fileSelectionResponseMsg = null, 3000);
      }
    } else if (opDataEmit.optionName === 'delete') {
      this.apiResourceDelete(opDataEmit.data);
    }
  }

  deleteResource(index: number): void {
    this.resourceInfos.splice(index, 1);
    // console.log('spliced data ', splicedData);
    this.form.controls[this.field.name].patchValue(this.resourceInfos);
    this.fileSelectionResponseMsg = null;
    this.validateResourceRequired();
  }

  clearAllSelectedFiles(): void {
    this.form.controls[this.field.name].patchValue([]);
    this.fileSelectionResponseMsg = null;
    this.validateResourceRequired();
  }

  onFileChange(event): void {
    this.fileSelectionResponseMsg = null;
    if (event.target.files.length > 0) {
      const singleFile = event.target.files[0];
      this.submit(singleFile);
    }
  }

  onAudioUpload(file: File): void {
    this.submit(file);
  }

  submit(singleFile: any): void {
    this.clearStatesBeforeFormSubmit();
    this.resourceService.uploadResource(singleFile).subscribe(value => {
      console.log('success', value.response);
      this.resourceInfos = [...this.resourceInfos, value.response];
      this.form.controls[this.field.name].patchValue(this.resourceInfos);
      this.clearStatesAfterFormSubmit(true);
      this.triggerRefresh.next();
    }, error => {
      console.warn('something wrong');
      this.responseMessage = 'something wrong';
      this.clearStatesAfterFormSubmit(false);
    });
  }

  apiResourceDelete(resource: ResourceInfo): void {
    this.clearStatesBeforeFormSubmit();
    this.resourceService.deleteResource(resource.id).subscribe(value => {
      console.log('success delete', resource);
      const filteredSelResourceList = this.resourceInfos.filter(selRes => selRes.id !== resource.id);
      this.resourceInfos = filteredSelResourceList;
      this.form.controls[this.field.name].patchValue(this.resourceInfos);
      this.clearStatesAfterFormSubmit(true);
      this.triggerRefresh.next();
    }, error => {
      console.warn('something wrong');
      this.responseMessage = 'something wrong';
      this.clearStatesAfterFormSubmit(false);
    });
  }

}
