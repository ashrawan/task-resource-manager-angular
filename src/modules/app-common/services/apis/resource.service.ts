import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {GenericFilterRequest, GenericResponse, PageRequest, ResourceInfo} from '../model';
import {CoreConstant} from '../../core-constant';
import {ApiUtil} from '../api-util';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http: HttpClient) {
  }

  errorHandler(error: HttpErrorResponse): Observable<any> {
    console.log('Resource api error ', error);
    return throwError(error);
  }

  getAllResourceByUserId(pageRequest: PageRequest, userId: string): Observable<GenericResponse<Array<ResourceInfo>>> {
    return this.http
      .get<GenericResponse<Array<ResourceInfo>>>(CoreConstant.API_SECURED_ENDPOINT + '/resource/user-resources' + userId, {
        params: ApiUtil.buildPageParams(pageRequest)
      })
      .pipe(catchError(this.errorHandler));
  }

  getResourceById(id): Observable<GenericResponse<ResourceInfo>> {
    return this.http
      .get<GenericResponse<ResourceInfo>>(CoreConstant.API_SECURED_ENDPOINT + '/resource/' + id)
      .pipe(catchError(this.errorHandler));
  }

  uploadResource(file: File): Observable<GenericResponse<ResourceInfo>> {
    const formData = new FormData();
    formData.append('resource', file);
    return this.http
      .post<GenericResponse<ResourceInfo>>(CoreConstant.API_SECURED_ENDPOINT + '/resource/upload-resource', formData)
      .pipe(catchError(this.errorHandler));
  }

  deleteResource(id): Observable<GenericResponse<ResourceInfo>> {
    return this.http
      .delete<GenericResponse<ResourceInfo>>(CoreConstant.API_SECURED_ENDPOINT + '/resource/delete/' + id)
      .pipe(catchError(this.errorHandler));
  }

  download(resourceId: number): Observable<File> {
    const httpOptions = {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        responseType: 'blob'
      }),
      params: new HttpParams()
        .set('resourceId', resourceId.toString())
    };
    return this.http.get<GenericResponse<ResourceInfo>>(CoreConstant.API_SECURED_ENDPOINT + '/resource/download', httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  filterResources(pageRequest: PageRequest,
                  genericFilterRequest: GenericFilterRequest<ResourceInfo>): Observable<GenericResponse<Array<ResourceInfo>>> {
    const options = {
      params: ApiUtil.buildPageParams(pageRequest)
    };
    return this.http
      .post<GenericResponse<Array<ResourceInfo>>>(CoreConstant.API_SECURED_ENDPOINT + '/resource/filter', genericFilterRequest, options)
      .pipe(catchError(this.errorHandler));
  }
}
