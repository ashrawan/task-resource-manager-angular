import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {AuthUserResponse, GenericResponse, LoginRequest, User} from '../model';
import {CoreConstant} from '../../core-constant';
import {catchError, map} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {UserService} from './user.service';
import {GlobalUtil} from '../../global-util';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private userService: UserService, private router: Router) { }

  errorHandler(error: HttpErrorResponse): Observable<any> {
    console.log('User api error ', error);
    return throwError(error);
  }

  login(loginRequest: LoginRequest): Observable<string[]> {
    this.clearLocalStorage();
    return this.http.post<GenericResponse<AuthUserResponse>>(CoreConstant.API_ENDPOINT + '/auth/login', loginRequest).pipe(
      map(res => {
        const authUserResponse = res.response;
        localStorage.setItem('token', authUserResponse.token);
        localStorage.setItem('user', JSON.stringify(authUserResponse.user));
        return res;
      }),
      catchError(this.errorHandler)
    );
  }

  getCurrentUser(): User {
    const storageUserInfo = localStorage.getItem('user');
    const user: User = JSON.parse(storageUserInfo);
    return GlobalUtil.isPresent(user) ? user : null;
  }
  getToken(): string {
    const token = localStorage.getItem('token');
    return GlobalUtil.isNotEmpty(token) ? token : null;
  }

  isAuthenticatedUser(): boolean {
    const currentUser: User = this.getCurrentUser();
    const token = this.getToken();
    return GlobalUtil.isPresent(currentUser) && GlobalUtil.isNotEmpty(token);
  }

  isAdmin(): boolean {
    const currentUser: User = this.getCurrentUser();
    const isAdmin: boolean = GlobalUtil.isPresent(currentUser) && currentUser.role === 'ROLE_ADMIN';
    return isAdmin;
  }

  // private async getCurrentUser(): Promise<User> {
  //   const storageUserInfo = localStorage.getItem('user');
  //   let user: User = null;
  //   if (storageUserInfo == null || storageUserInfo === undefined){
  //     const authenticatedUser: User = await from(this.userService.getAuthenticatedUser()).toPromise();
  //     user = authenticatedUser;
  //   } else {
  //     user = JSON.parse(storageUserInfo);
  //   }
  //   return user;
  // }

  logout(): void {
    this.clearLocalStorage();
    this.router.navigate(['/login']);
  }

  private clearLocalStorage(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
