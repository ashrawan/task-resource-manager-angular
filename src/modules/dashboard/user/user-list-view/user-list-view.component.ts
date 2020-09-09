import { Component, OnInit } from '@angular/core';
import {AbstractDataConfigurer} from '../../../app-common/generic-services/abstract-data-configurer';
import {User} from '../../../app-common/services/model';
import {UserConfigurerService} from '../configurer/user-configurer.service';

@Component({
  selector: 'app-user-list-view',
  templateUrl: './user-list-view.component.html',
  styleUrls: ['./user-list-view.component.scss']
})
export class UserListViewComponent implements OnInit {

  userDataGridConfigurer!: AbstractDataConfigurer<User>;

  constructor(private userConfigurerService: UserConfigurerService) {
    this.userDataGridConfigurer = userConfigurerService;
  }

  ngOnInit(): void {
  }

}
