import {Injectable} from '@angular/core';
import {AbstractDataConfigurer} from '../../../app-common/generic-services/abstract-data-configurer';
import {GenericFilterRequest, GenericResponse, PageRequest, Task, User} from '../../../app-common/services/model';
import {Observable} from 'rxjs';
import {Column, GridRowOption} from '../../../app-common/components/tables/table-model';
import {CoreConstant} from '../../../app-common/core-constant';
import {TaskService} from '../../../app-common/services/apis/task.service';
import {AuthService} from '../../../app-common/services/apis/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DashTaskConfigurerService extends AbstractDataConfigurer<Task> {

  API_ROUTES = CoreConstant.APP_ROUTES;
  submissionStatus: string;

  myTaskColumns: Column[] = [
    {name: 'id', label: 'Task Id', filterable: false, sortable: false, type: 'string', hide: true},
    {name: 'title', label: 'Title', filterable: true, sortable: true, type: 'string', defaultSearch: true},
    {name: 'submissionStatus', label: 'Submission Status', filterable: true, sortable: true, type: 'string'},
    {name: 'taskType', label: 'Task Type', filterable: true, sortable: true, type: 'string'},
    {
      name: 'assignedTo', label: 'Assigned To', filterable: true, sortable: true, type: 'object',
      objectBind: {
        nameBind: 'fullName', type: 'fixedLink', linkType: 'internal',
        fixedLinkValue: this.API_ROUTES.USER_DETAILS, apiFixedLinkBind: 'id'
      }
    },
    {
      name: 'reportTo', label: 'Report To', filterable: true, sortable: true, type: 'object',
      objectBind: {
        nameBind: 'fullName', type: 'fixedLink', linkType: 'internal',
        fixedLinkValue: this.API_ROUTES.USER_DETAILS, apiFixedLinkBind: 'id'
      }
    }
  ];

  myTaskRowOptions: GridRowOption[] = [];

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
    const parseDataFilterRequest = {
      dataFilter: {
        ...genericFilterRequest.dataFilter,
        assignedTo: currentUser,
        ...(this.submissionStatus && {submissionStatus: this.submissionStatus}),
      }
    } as GenericFilterRequest<Task>;
    return this.taskService.filterTasks(parsePageRequest, parseDataFilterRequest);
  }
}
