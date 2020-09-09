import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {GenericFilterRequest, GenericResponse, PageRequest, PasswordUpdate, User} from '../model';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {CoreConstant} from '../../core-constant';
import {catchError} from 'rxjs/operators';
import {ApiUtil} from '../api-util';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  errorHandler(error: HttpErrorResponse): Observable<any> {
    console.log('User api error ', error);
    return throwError(error);
  }

  getAllUsers(pageRequest: PageRequest): Observable<GenericResponse<Array<User>>> {
    return this.http
      .get<GenericResponse<Array<User>>>(CoreConstant.API_SECURED_ENDPOINT + '/user', {
        params: ApiUtil.buildPageParams(pageRequest)
      })
      .pipe(catchError(this.errorHandler));
  }

  getUserById(id): Observable<GenericResponse<User>> {
    return this.http
      .get<GenericResponse<User>>(CoreConstant.API_SECURED_ENDPOINT + '/user/' + id)
      .pipe(catchError(this.errorHandler));
  }

  createUser(user): Observable<GenericResponse<User>> {
    return this.http
      .post<GenericResponse<User>>(CoreConstant.API_SECURED_ENDPOINT + '/user', user)
      .pipe(catchError(this.errorHandler));
  }

  updateUser(user): Observable<GenericResponse<User>> {
    return this.http
      .put<GenericResponse<User>>(CoreConstant.API_SECURED_ENDPOINT + '/user', user)
      .pipe(catchError(this.errorHandler));
  }

  updateUserPassword(passwordUpdate: PasswordUpdate): Observable<GenericResponse<User>> {
    return this.http
      .post<GenericResponse<User>>(CoreConstant.API_SECURED_ENDPOINT + '/user/updatePassword', passwordUpdate)
      .pipe(catchError(this.errorHandler));
  }

  getAuthenticatedUser(): Observable<GenericResponse<User>> {
    return this.http
      .get<GenericResponse<User>>(CoreConstant.API_SECURED_ENDPOINT + '/user/me')
      .pipe(catchError(this.errorHandler));
  }

  filterUsers(pageRequest: PageRequest, genericFilterRequest: GenericFilterRequest<User>): Observable<GenericResponse<Array<User>>> {
    const options =  {
      params: ApiUtil.buildPageParams(pageRequest)
    };
    return this.http
      .post<GenericResponse<Array<User>>>(CoreConstant.API_SECURED_ENDPOINT + '/user/filter', genericFilterRequest, options)
      .pipe(catchError(this.errorHandler));
  }

}
