import {Injectable} from '@angular/core';
import {CoreConstant} from '../../../../../core-constant';
import {Column, GridRowOption} from '../../../../tables/table-model';
import {AuthService} from '../../../../../services/apis/auth.service';
import {GenericFilterRequest, GenericResponse, PageRequest, ResourceInfo, User} from '../../../../../services/model';
import {Observable} from 'rxjs';
import {AbstractDataConfigurer} from '../../../../../generic-services/abstract-data-configurer';
import {ResourceService} from '../../../../../services/apis/resource.service';

@Injectable({
  providedIn: 'root'
})
export class CustomResourceFileConfigurerService extends AbstractDataConfigurer<ResourceInfo> {

  API_ROUTES = CoreConstant.APP_ROUTES;

  myResourcesInfoColumns: Column[] = [
    {name: 'id', label: 'Resource Id', filterable: false, sortable: false, type: 'string', hide: true},
    {name: 'resourceName', label: 'Resource Name', filterable: true, sortable: true, type: 'string', defaultSearch: true},
  ];

  myTaskRowOptions: GridRowOption[] = [
    {name: 'select', label: 'Select', icon: '', class: 'btn-success', type: 'emit', link: '', appendCname: 'id'},
    {name: 'delete', label: '', icon: 'trash', class: 'btn-danger', type: 'emit', link: '', appendCname: 'id'},
  ];

  constructor(private resourceService: ResourceService, private authService: AuthService) {
    super();
  }

  getRowOptions(): any[] {
    return this.myTaskRowOptions;
  }

  getColumns(): Column[] {
    return this.myResourcesInfoColumns;
  }

  getGridData(pageRequest: PageRequest): Observable<GenericResponse<ResourceInfo[]>> {
    return this.filterGridData(pageRequest, {dataFilter: null});
  }

  filterGridData(pageRequest: PageRequest,
                 genericFilterRequest: GenericFilterRequest<ResourceInfo>): Observable<GenericResponse<ResourceInfo[]>> {
    const currentUser: User = this.authService.getCurrentUser();
    const parsePageRequest: PageRequest = {...pageRequest, sort: 'createdAt', direction: 'desc'};
    const parseDataFilterRequest = {
      dataFilter: {
        ...genericFilterRequest.dataFilter,
        resourceOwner: currentUser
      }
    } as GenericFilterRequest<ResourceInfo>;
    return this.resourceService.filterResources(parsePageRequest, parseDataFilterRequest);
  }
}
