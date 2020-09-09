import {Component, Input, OnInit} from '@angular/core';
import {UserService} from 'src/modules/app-common/services/apis/user.service';
import {User} from '../../../app-common/services/model';
import {NavigationService} from '../../services/navigation.service';
import {AuthService} from '../../../app-common/services/apis/auth.service';

@Component({
  selector: 'app-user-top-nav',
  templateUrl: './user-top-nav.component.html',
  styleUrls: ['./user-top-nav.component.scss']
})
export class UserTopNavComponent implements OnInit {

  @Input() user: User = null;
  hasError: boolean;

  constructor(private navigationService: NavigationService,
              private userService: UserService,
              private authService: AuthService) {
    this.initUser();
  }

  toggleSideNav(): void {
    this.navigationService.toggleSideNav();
  }

  initUser = () => {
    const currentUser = this.authService.getCurrentUser();
    this.user = currentUser;
  };

  onLogout(): void {
    this.authService.logout();
  }

  ngOnInit(): void {
  }

}
