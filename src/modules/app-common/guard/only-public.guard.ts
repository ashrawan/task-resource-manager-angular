import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/apis/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OnlyPublicGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authenticatedUser: boolean = !this.authService.isAuthenticatedUser();
    if (authenticatedUser){
      return this.router.parseUrl('/dashboard');
    }
    return true;
  }

}
