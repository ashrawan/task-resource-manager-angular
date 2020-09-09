import {Injectable} from '@angular/core';
import {AbstractDataConfigurer} from '../../../app-common/generic-services/abstract-data-configurer';
import {GenericFilterRequest, GenericResponse, PageRequest, Task, User} from '../../../app-common/services/model';
import {CoreConstant} from '../../../app-common/core-constant';
import {Column, GridRowOption} from '../../../app-common/components/tables/table-model';
import {TaskService} from '../../../app-common/services/apis/task.service';
import {Observable} from 'rxjs';
import {AuthService} from '../../../app-common/services/apis/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MyTaskBoardConfigurerService extends AbstractDataConfigurer<Task> {

  API_ROUTES = CoreConstant.APP_ROUTES;

  myTaskColumns: Column[] = [
    {name: 'id', label: 'Task Id', filterable: false, sortable: false, type: 'string', hide: true},
    {name: 'title', label: 'Title', filterable: true, sortable: true, type: 'string', defaultSearch: true},
  ];

  myTaskRowOptions: GridRowOption[] = [
    {name: 'select', label: 'Select', icon: '', class: 'btn-info', type: 'emit', link: '', appendCname: 'id'},
  ];

  constructor(private taskService: TaskService, private authService: AuthService) {
    super();
  }

  getRowOptions(): any[] {
    return this.myTaskRowOptions;
  }

  getColumns(): Column[] {
    return this.myTaskColumns;
  }

  getGridData(pageRequest: PageRequest): Observable<GenericResponse<Task[]>> {
    return this.filterGridData(pageRequest, {dataFilter: null});
  }

  filterGridData(pageRequest: PageRequest, genericFilterRequest: GenericFilterRequest<Task>): Observable<GenericResponse<Task[]>> {
    const currentUser: User = this.authService.getCurrentUser();
    const parsePageRequest: PageRequest = {...pageRequest, sort: 'createdAt', direction: 'desc'};
    const parseDataFilterRequest = {
      dataFilter: {
        ...genericFilterRequest.dataFilter,
        assignedTo: currentUser
      }
    } as GenericFilterRequest<Task>;
    console.log('parsed filter request', parsePageRequest);
    return this.taskService.filterTasks(parsePageRequest, parseDataFilterRequest);
  }
}
