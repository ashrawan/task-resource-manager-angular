import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { DashboardHeadComponent } from './components/dashboard-head/dashboard-head.component';
import { UserTopNavComponent } from './components/user-top-nav/user-top-nav.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { RouterModule } from '@angular/router';
import { AppCommonModule } from '../app-common/app-common.module';
import { SideNavItemComponent } from './components/side-nav-item/side-nav-item.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

const navigationComponent = [
  BreadcrumbsComponent,
  DashboardHeadComponent,
  UserTopNavComponent,
];

@NgModule({
  declarations: [
    ...navigationComponent,
    DashboardLayoutComponent,
    SideNavItemComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppCommonModule
  ],
  exports: [
    ...navigationComponent,
    DashboardLayoutComponent
  ]
})
export class NavigationModule { }
