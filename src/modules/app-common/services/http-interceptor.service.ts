import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from './apis/auth.service';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let apiRequest;
    if (this.authService.isAuthenticatedUser()) {
      console.log('interceptor adding request token');
      apiRequest = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.authService.getToken()
        }
      });
      console.log('api request ', apiRequest);
    } else {
      apiRequest = req.clone({});
    }

    return next
      .handle(apiRequest)
      .pipe(
        catchError(response => {
          if (response instanceof HttpErrorResponse) {
            switch (response.status) {
              case 401:
                this.router.parseUrl('/error/401');
                break;
              case 511:
                this.authService.logout();
                this.router.parseUrl('/login');
                break;
            }
          }
          return throwError(response);
        })
      );
  }
}
