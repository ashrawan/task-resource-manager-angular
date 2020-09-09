import {Injectable} from '@angular/core';
import {Column, GridRowOption} from '../../../app-common/components/tables/table-model';
import {GenericFilterRequest, GenericResponse, PageRequest, Task} from '../../../app-common/services/model';
import {Observable} from 'rxjs';
import {AbstractDataConfigurer} from '../../../app-common/generic-services/abstract-data-configurer';
import {TaskService} from '../../../app-common/services/apis/task.service';
import {CoreConstant} from '../../../app-common/core-constant';

@Injectable({
  providedIn: 'root'
})
export class TaskConfigurerService extends AbstractDataConfigurer<Task> {

  API_ROUTES = CoreConstant.APP_ROUTES;

  userColumns: Column[] = [
    {name: 'id', label: 'Task Id', filterable: false, sortable: false, type: 'string', hide: true},
    {name: 'title', label: 'Title', filterable: true, sortable: true, type: 'string', defaultSearch: true},
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
    },
    {name: 'startDate', label: 'Start Date', filterable: true, sortable: true, type: 'string'},
    {name: 'endDate', label: 'End Deadline', filterable: true, sortable: true, type: 'date'},
    {name: 'status', label: 'Status', filterable: true, sortable: true, type: 'string'},
  ];

  taskRowOptions: GridRowOption[] = [
    {name: 'view', label: 'View', icon: '', class: 'btn-info', type: 'link', link: '/dashboard/task/view/', appendCname: 'id'},
  ];

  constructor(private taskService: TaskService) {
    super();
  }

  getRowOptions(): any[] {
    return this.taskRowOptions;
  }

  getColumns(): Column[] {
    return this.userColumns;
  }

  getGridData(pageRequest: PageRequest): Observable<GenericResponse<Task[]>> {
    return this.taskService.getAllTasks(pageRequest);
  }

  filterGridData(pageRequest: PageRequest, genericFilterRequest: GenericFilterRequest<Task>): Observable<GenericResponse<Task[]>> {
    return this.taskService.filterTasks(pageRequest, genericFilterRequest);
  }
}
