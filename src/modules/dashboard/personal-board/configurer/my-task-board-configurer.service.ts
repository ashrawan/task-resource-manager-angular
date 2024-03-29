import {Injectable} from '@angular/core';
import {AbstractDataConfigurer} from '../../../app-common/generic-services/abstract-data-configurer';
import {GenericFilterRequest, GenericResponse, PageRequest, Task, User} from '../../../app-common/services/model';
import {CoreConstant} from '../../../app-common/core-constant';
import {Column, GridRowOption} from '../../../app-common/components/tables/table-model';
import {TaskService} from '../../../app-common/services/apis/task.service';
import {Observable} from 'rxjs';
import {AuthService} from '../../../app-common/services/apis/auth.service';
import {InputSelectOption} from '../../../app-common/components/inputs/input.model';

@Injectable({
  providedIn: 'root'
})
export class MyTaskBoardConfigurerService extends AbstractDataConfigurer<Task> {

  API_ROUTES = CoreConstant.APP_ROUTES;
  selectTaskByList: InputSelectOption[] = [
    {key: 'Assigned To Me', value: 'ASSIGNED'},
    {key: 'Reported By Me', value: 'REPORTING'}
  ];
  setTaskBy = 'ASSIGNED';

  myTaskColumns: Column[] = [
    {name: 'id', label: 'Task Id', filterable: false, sortable: false, type: 'string', hide: true},
    {name: 'title', label: 'Title', filterable: true, sortable: true, type: 'string', defaultSearch: true},
    {name: 'submissionStatus', label: 'status', filterable: true, sortable: true, type: 'string'},
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
    const parsePageRequest: PageRequest = {...pageRequest};
    console.log('set task by', this.setTaskBy);
    const parseDataFilterRequest = {
      dataFilter: {
        ...genericFilterRequest.dataFilter,
        ...(this.setTaskBy === 'ASSIGNED' && {assignedTo: currentUser}),
        ...(this.setTaskBy === 'REPORTING' && {reportTo: currentUser}),
      }
    } as GenericFilterRequest<Task>;
    return this.taskService.filterTasks(parsePageRequest, parseDataFilterRequest);
  }
}
