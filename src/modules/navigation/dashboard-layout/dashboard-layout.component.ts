import {ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {sideNavGroups, sideNavItems} from '../navdata';
import {NavigationService} from '../services/navigation.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {

  @Input() static = false;
  @Input() light = true;
  @HostBinding('class.sb-sidenav-toggled') sideNavHidden = false;
  subscription: Subscription = new Subscription();
  sideNavItems = sideNavItems;
  sideNavGroups = sideNavGroups;
  sidenavStyle = 'sb-sidenav-dark';

  constructor(
    public navigationService: NavigationService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    if (this.light) {
      this.sidenavStyle = 'sb-sidenav-light';
    }
    this.subscription.add(
      this.navigationService.isSideNavVisible().subscribe(isVisible => {
        this.sideNavHidden = !isVisible;
        this.changeDetectorRef.markForCheck();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
