import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ActivatedRoute, ChildActivationEnd, Router} from '@angular/router';
import {LKRouteData} from '../../app-common/common-model';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private sideNavVisible$ = new BehaviorSubject(true);
  private routeData$ = new BehaviorSubject({} as LKRouteData);
  private currentURL$ = new BehaviorSubject('');

  constructor(public route: ActivatedRoute, public router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof ChildActivationEnd))
      .subscribe(event => {
        let snapshot = (event as ChildActivationEnd).snapshot;
        while (snapshot.firstChild !== null) {
          snapshot = snapshot.firstChild;
        }
        this.routeData$.next(snapshot.data as LKRouteData);
        this.currentURL$.next(router.url);
      });
  }

  isSideNavVisible(): Observable<boolean> {
    return this.sideNavVisible$;
  }

  toggleSideNav(visibility?: boolean): void {
    if (typeof visibility !== 'undefined') {
      this.sideNavVisible$.next(visibility);
    } else {
      this.sideNavVisible$.next(!this.sideNavVisible$.value);
    }
  }

  getRouteData(): Observable<LKRouteData> {
    return this.routeData$;
  }

  getCurrentURL(): Observable<string> {
    return this.currentURL$;
  }
}
