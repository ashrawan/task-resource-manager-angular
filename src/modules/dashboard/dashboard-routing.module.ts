import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Breadcrumb, LKRouteData} from '../app-common/common-model';
import {MainDashComponent} from './main-dash.component';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {AdminGuard} from '../app-common/guard/admin.guard';
import {UserCreateComponent} from './user/user-create/user-create.component';
import {UserUpdateDetailsComponent} from './user/user-update-details/user-update-details.component';
import {UserListViewComponent} from './user/user-list-view/user-list-view.component';
import {TaskListViewComponent} from './task/task-list-view/task-list-view.component';
import {TaskCreateComponent} from './task/task-create/task-create.component';
import {TaskUpdateDetailsComponent} from './task/task-update-details/task-update-details.component';
import {CoreConstant} from '../app-common/core-constant';
import {PersonalTaskBoardComponent} from './personal-board/personal-task-board.component';

const API_ROUTES = CoreConstant.APP_ROUTES;

// BreadCrumbs
const breadcrumb = {
  dashboard: {text: 'Dashboard', link: API_ROUTES.DASHBOARD, active: false} as Breadcrumb,

  user: {text: 'User', link: API_ROUTES.USER, active: false} as Breadcrumb,
  user_view_list: {text: 'View', link: API_ROUTES.USER_VIEW_LIST, active: false} as Breadcrumb,
  user_details: {text: 'Detail', link: API_ROUTES.USER_DETAILS, active: false} as Breadcrumb,
  user_add: {text: 'Add', link: API_ROUTES.USER_CREATE, active: false} as Breadcrumb,

  task: {text: 'Task', link: API_ROUTES.TASK, active: false} as Breadcrumb,
  task_view_list: {text: 'View', link: API_ROUTES.TASK_VIEW_LIST, active: false} as Breadcrumb,
  task_details: {text: 'Detail', link: API_ROUTES.TASK_DETAILS, active: false} as Breadcrumb,
  task_add: {text: 'Add', link: API_ROUTES.TASK_CREATE, active: false} as Breadcrumb,

  my_board: {text: 'My Board', link: API_ROUTES.MY_BOARD, active: false} as Breadcrumb,
};

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Main Dashboard',
      breadcrumbs: [{...breadcrumb.dashboard, active: true}],
    } as LKRouteData,
    component: MainDashComponent,
    children: [
      {path: '', component: DashboardPageComponent},
      {
        path: 'board',
        component: PersonalTaskBoardComponent,
        data: {
          title: 'My Board',
          breadcrumbs: [breadcrumb.dashboard, breadcrumb.my_board],
        } as LKRouteData,
      },
      {
        path: 'task',
        data: {
          title: 'Task',
          breadcrumbs: [breadcrumb.dashboard, {...breadcrumb.task, active: true}],
        } as LKRouteData,
        children: [
          {path: '', redirectTo: 'view', pathMatch: 'full'},
          {
            path: 'view', component: TaskListViewComponent,
            data: {
              title: 'View Task',
              breadcrumbs: [breadcrumb.dashboard, breadcrumb.task],
            } as LKRouteData,
          },
          {
            path: 'view/:id',
            canActivate: [AdminGuard],
            component: TaskUpdateDetailsComponent,
            data: {
              title: 'Details',
              breadcrumbs: [breadcrumb.dashboard, breadcrumb.task, {...breadcrumb.task_details, active: true}],
            } as LKRouteData,
          },
          {
            path: 'add',
            canActivate: [AdminGuard],
            component: TaskCreateComponent,
            data: {
              title: 'Add Task',
              breadcrumbs: [breadcrumb.dashboard, breadcrumb.task, {...breadcrumb.task_add, active: true}],
            } as LKRouteData,
          }
        ]
      },
      {
        path: 'user',
        children: [
          {path: '', redirectTo: 'view', pathMatch: 'full'},
          {
            path: 'view', component: UserListViewComponent,
            data: {
              title: 'View User',
              breadcrumbs: [breadcrumb.dashboard, breadcrumb.user],
            } as LKRouteData,
          },
          {
            path: 'view/:id',
            canActivate: [AdminGuard],
            component: UserUpdateDetailsComponent,
            data: {
              title: 'Details',
              breadcrumbs: [breadcrumb.dashboard, breadcrumb.user, {...breadcrumb.user_details, active: true}],
            } as LKRouteData,
          },
          {
            path: 'add',
            canActivate: [AdminGuard],
            component: UserCreateComponent,
            data: {
              title: 'Add User',
              breadcrumbs: [breadcrumb.dashboard, breadcrumb.user, {...breadcrumb.user_add, active: true}],
            } as LKRouteData,
          },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
