import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LKRouteData} from 'src/modules/app-common/common-model';
import {LoginPageComponent} from 'src/modules/login/login-page.component';
import {AuthGuard} from '../modules/app-common/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard',
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/modules/dashboard/dashboard-routing.module')
        .then(m => m.DashboardRoutingModule),
  },
  {
    path: 'login',
    canActivate: [],
    component: LoginPageComponent,
    data: {title: 'Login Page'} as LKRouteData,
  },
  {
    path: '**',
    pathMatch: 'full',
    loadChildren: () =>
      import('src/modules/app-common/error/error-routing.module')
        .then(m => m.ErrorRoutingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
