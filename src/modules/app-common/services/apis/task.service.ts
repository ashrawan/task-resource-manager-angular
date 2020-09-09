import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {GenericFilterRequest, GenericResponse, PageRequest, Task} from '../model';
import {CoreConstant} from '../../core-constant';
import {ApiUtil} from '../api-util';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {
  }

  errorHandler(error: HttpErrorResponse): Observable<any> {
    console.log('Task api error ', error);
    return throwError(error);
  }

  getAllTasks(pageRequest: PageRequest): Observable<GenericResponse<Task[]>> {
    return this.http
      .get<GenericResponse<Array<Task>>>(CoreConstant.API_SECURED_ENDPOINT + '/task', {
        params: ApiUtil.buildPageParams(pageRequest)
      })
      .pipe(catchError(this.errorHandler));
  }

  getTaskById(id): Observable<GenericResponse<Task>> {
    return this.http
      .get<GenericResponse<Task>>(CoreConstant.API_SECURED_ENDPOINT + '/task/' + id)
      .pipe(catchError(this.errorHandler));
  }

  createTask(task): Observable<GenericResponse<Task>> {
    return this.http
      .post<GenericResponse<Task>>(CoreConstant.API_SECURED_ENDPOINT + '/task', task)
      .pipe(catchError(this.errorHandler));
  }

  updateTask(task): Observable<GenericResponse<Task>> {
    return this.http
      .put<GenericResponse<Task>>(CoreConstant.API_SECURED_ENDPOINT + '/task', task)
      .pipe(catchError(this.errorHandler));
  }

  filterTasks(pageRequest: PageRequest, genericFilterRequest: GenericFilterRequest<Task>): Observable<GenericResponse<Array<Task>>> {
    const options = {
      params: ApiUtil.buildPageParams(pageRequest)
    };
    return this.http
      .post<GenericResponse<Array<Task>>>(CoreConstant.API_SECURED_ENDPOINT + '/task/filter', genericFilterRequest, options)
      .pipe(catchError(this.errorHandler));
  }

  //  Submit task
  submitTask(task): Observable<GenericResponse<Task>> {
    return this.http
      .put<GenericResponse<Task>>(CoreConstant.API_SECURED_ENDPOINT + '/task/submit', task)
      .pipe(catchError(this.errorHandler));
  }

}
