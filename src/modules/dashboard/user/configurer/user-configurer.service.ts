import {Injectable} from '@angular/core';
import {AbstractDataConfigurer} from '../../../app-common/generic-services/abstract-data-configurer';
import {Observable} from 'rxjs';
import {UserService} from '../../../app-common/services/apis/user.service';
import {GenericFilterRequest, GenericResponse, PageRequest, User} from '../../../app-common/services/model';
import {Column, GridRowOption} from '../../../app-common/components/tables/table-model';

@Injectable({
  providedIn: 'root'
})
export class UserConfigurerService extends AbstractDataConfigurer<User> {

  userColumns: Column[] = [
    {name: 'id', label: 'User Id', filterable: false, sortable: false, type: 'string', hide: true},
    {name: 'fullName', label: 'Full Name', filterable: true, sortable: true, type: 'string', defaultSearch: true},
    {name: 'username', label: 'User Name', filterable: true, sortable: true, type: 'string'},
    {name: 'role', label: 'Role', filterable: true, sortable: true, type: 'string'},
    {name: 'phoneNumber', label: 'Phone Number', filterable: true, sortable: true, type: 'number'},
    {name: 'status', label: 'Status', filterable: true, sortable: true, type: 'string'},
  ];

  userRowOptions: GridRowOption[] = [
    {name: 'view', label: 'View', icon: '', class: 'btn-info', type: 'link', link: '/dashboard/user/view/', appendCname: 'id'},
  ];

  constructor(private userService: UserService) {
    super();
  }

  getRowOptions(): GridRowOption[] {
    return this.userRowOptions;
  }

  getColumns(): Column[] {
    return this.userColumns;
  }

  getGridData(pageRequest: PageRequest): Observable<GenericResponse<Array<User>>> {
    return this.userService.getAllUsers(pageRequest);
  }

  filterGridData(pageRequest: PageRequest, genericFilterRequest: GenericFilterRequest<User>): Observable<GenericResponse<Array<User>>> {
    return this.userService.filterUsers(pageRequest, genericFilterRequest);
  }
}
