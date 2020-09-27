import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainDashComponent} from './main-dash.component';
import {NavigationModule} from '../navigation/navigation.module';
import {RouterModule} from '@angular/router';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {UserCreateComponent} from './user/user-create/user-create.component';
import {AppCommonModule} from '../app-common/app-common.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserUpdateDetailsComponent} from './user/user-update-details/user-update-details.component';
import {UserListViewComponent} from './user/user-list-view/user-list-view.component';
import {TaskListViewComponent} from './task/task-list-view/task-list-view.component';
import {TaskCreateComponent} from './task/task-create/task-create.component';
import {TaskUpdateDetailsComponent} from './task/task-update-details/task-update-details.component';
import {MyTaskBoardListComponent} from './personal-board/my-task-board-list/my-task-board-list.component';
import {MyTaskSubmissionComponent} from './personal-board/my-task-submission/my-task-submission.component';
import {MyTaskViewComponent} from './personal-board/my-task-view/my-task-view.component';
import {PersonalTaskBoardComponent} from './personal-board/personal-task-board.component';

@NgModule({
  declarations: [
    MainDashComponent,
    DashboardPageComponent,
    UserCreateComponent,
    UserUpdateDetailsComponent,
    UserUpdateDetailsComponent,
    UserListViewComponent,
    TaskListViewComponent,
    TaskCreateComponent,
    TaskUpdateDetailsComponent,
    MyTaskBoardListComponent,
    MyTaskSubmissionComponent,
    MyTaskViewComponent,
    PersonalTaskBoardComponent,
  ],
    imports: [
        CommonModule,
        RouterModule,
        AppCommonModule,
        NavigationModule,
        ReactiveFormsModule,
        FormsModule,
    ]
})
export class DashboardModule {
}
