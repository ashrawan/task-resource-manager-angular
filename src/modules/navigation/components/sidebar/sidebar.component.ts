import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SideNavGroupItems, SideNavGroups} from '../../nav-model';
import {UserService} from '../../../app-common/services/apis/user.service';
import {User} from '../../../app-common/services/model';
import {AuthService} from '../../../app-common/services/apis/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  @Input() sidenavStyle!: string;
  @Input() sideNavItems!: SideNavGroupItems;
  @Input() sideNavGroups!: SideNavGroups[];

  user: User = null;
  hasError: boolean;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    console.log('');
    const currentUser = this.authService.getCurrentUser();
    this.user = currentUser;
  }

  ngOnDestroy(): void {

  }

}
