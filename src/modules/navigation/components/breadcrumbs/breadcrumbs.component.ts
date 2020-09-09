import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Breadcrumb} from '../../../app-common/common-model';
import {NavigationService} from '../../services/navigation.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
  breadcrumbs!: Breadcrumb[];

  constructor(public navigationService: NavigationService) {
  }

  ngOnInit(): void {
    this.subscription.add(
      this.navigationService.getRouteData().subscribe(routeData => {
        this.breadcrumbs = routeData.breadcrumbs;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
