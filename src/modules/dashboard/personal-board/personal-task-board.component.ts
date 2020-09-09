import {Component, OnInit} from '@angular/core';
import {Task, User} from '../../app-common/services/model';
import {AuthService} from '../../app-common/services/apis/auth.service';

@Component({
  selector: 'app-personal-task-board',
  templateUrl: './personal-task-board.component.html',
  styleUrls: ['./personal-task-board.component.scss']
})
export class PersonalTaskBoardComponent implements OnInit {

  selectedTask: Task;
  isAssignedToMe: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onTaskSet(task: Task): void {
    console.log('main component got data ', task);
    this.selectedTask = task;
    this.initIsAssignedToMe(task);
  }

  initIsAssignedToMe(task: Task): void {
    const currentUser: User = this.authService.getCurrentUser();
    if(task.assignedTo.id === currentUser.id) {
      this.isAssignedToMe = true;
    } else {
      this.isAssignedToMe = false;
    }
  }
}
