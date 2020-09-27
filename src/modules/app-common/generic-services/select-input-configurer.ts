import {PageRequest} from '../services/model';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserService} from '../services/apis/user.service';
import {TaskService} from '../services/apis/task.service';
import {Injectable} from '@angular/core';
import {InputSelectOption} from '../components/inputs/input.model';

export type APISelectInputType = 'Select_User' | 'Select_Task' | 'Select_User_Status' | 'Select_User_Role' |
  'Select_Task_Submission_Status' | 'Select_Task_Type' | 'Select_Task_Status';

@Injectable({
  providedIn: 'root'
})
export class SelectInputConfigurer {

  defaultPageRequest: PageRequest = {page: 1, size: 1000, sort: '', direction: ''};

  protected constructor(private userService: UserService, private taskService: TaskService) {
  }

  loadSelectData(apiSelect: APISelectInputType): Observable<Array<any>> {
    switch (apiSelect) {
      case 'Select_User':
        return this.selectUser();
        break;
      case 'Select_Task':
        return this.selectTask();
        break;
      case 'Select_Task_Submission_Status':
        return this.selectTaskSubmissionStatus();
        break;
      case 'Select_Task_Type':
        return this.selectTaskType();
        break;
      case 'Select_User_Role':
        return this.selectUserRole();
        break;
      case 'Select_User_Status':
        return this.selectUserStatus();
        break;
      case 'Select_Task_Status':
        return this.selectTaskStatus();
        break;
      default:
        return of([]);
    }
  }

  private selectUser(): Observable<any[]> {
    return this.userService.getAllUsers(this.defaultPageRequest).pipe(
      map(genericResponse => {
        return genericResponse.response;
      })
    );
  }

  private selectTask(): Observable<any[]> {
    return this.taskService.getAllTasks(this.defaultPageRequest).pipe(
      map(genericResponse => {
        return genericResponse.response;
      })
    );
  }

  private selectUserRole(): Observable<any[]> {
    const items = [
      {key: 'USER', value: 'ROLE_USER'},
      {key: 'ADMIN', value: 'ROLE_ADMIN'},
    ] as InputSelectOption[];
    console.log('returning user role ', items);
    return of(items);
  }

  private selectUserStatus(): Observable<any[]> {
    const items = [
      {key: 'ACTIVE', value: 'ACTIVE'},
      {key: 'INACTIVE', value: 'INACTIVE'}
    ] as InputSelectOption[];
    return of(items);
  }

  private selectTaskStatus(): Observable<any[]> {
    const items = [
      {key: 'ACTIVE', value: 'ACTIVE'},
      {key: 'INACTIVE', value: 'INACTIVE'}
    ] as InputSelectOption[];
    return of(items);
  }

  private selectTaskSubmissionStatus(): Observable<any[]> {
    const items = [
      {key: 'PENDING', value: 'PENDING'},
      {key: 'COMPLETED', value: 'COMPLETED'},
    ] as InputSelectOption[];
    console.log('returning task submission status ', items);
    return of(items);
  }

  private selectTaskType(): Observable<any[]> {
    const items = [
      {key: 'ALL', value: 'ALL'},
      {key: 'AUDIO', value: 'AUDIO'},
    ] as InputSelectOption[];
    console.log('returning task type ', items);
    return of(items);
  }

  //
  // onSelectSearch(pageRequest: PageRequest, genericFilterRequest: GenericFilterRequest<T>): Observable<Array<T>> {
  //   return this.abstractDataConfigurer.filterGridData(pageRequest, genericFilterRequest).pipe(
  //     map(selectResponse => {
  //       return selectResponse.response;
  //     })
  //   );
  // }

}
