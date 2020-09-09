import {Component, OnChanges, OnInit} from '@angular/core';
import {NavigationService} from '../navigation/services/navigation.service';
import {filter, mergeMap} from 'rxjs/operators';
import {combineLatest} from 'rxjs';

@Component({
  selector: 'app-main-dash',
  templateUrl: './main-dash.component.html',
  styleUrls: ['./main-dash.component.scss']
})
export class MainDashComponent implements OnInit, OnChanges {

  title = 'Dashboard';

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    // combineLatest([
    //   this.navigationService.getRouteData(),
    //   this.navigationService.getCurrentURL()
    // ]).subscribe(([routeData, currentUrl]) => {
    //   console.log('lkRouteData', routeData);
    //   console.log('currenturl', currentUrl);
    //   const breadcrumb = routeData.breadcrumbs.find(value => value.link === currentUrl);
    //   console.log('breadcrumb ', breadcrumb);
    //   this.title = breadcrumb.text;
    // });
  }



}
