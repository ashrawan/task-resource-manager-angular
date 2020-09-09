import {Component, Input, OnInit} from '@angular/core';
import {SideNavItem} from '../../nav-model';
import {LKRouteData} from '../../../app-common/common-model';
import {AuthService} from '../../../app-common/services/apis/auth.service';
import {User} from '../../../app-common/services/model';

@Component({
  selector: 'app-side-nav-item',
  templateUrl: './side-nav-item.component.html',
  styleUrls: ['./side-nav-item.component.scss']
})
export class SideNavItemComponent implements OnInit {

  @Input() sideNavItem!: SideNavItem;
  @Input() isActive!: boolean;

  expanded = false;
  routeData!: LKRouteData;

  user: User;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  hasRouteAccess(): boolean {
    if (this.sideNavItem && this.sideNavItem.requiredAdminAccess) {
      return this.authService.isAdmin();
    }
    return true;
  }
}
