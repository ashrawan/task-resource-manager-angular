import {Component, OnInit} from '@angular/core';
import {Task} from '../../app-common/services/model';
import {AuthService} from '../../app-common/services/apis/auth.service';

@Component({
  selector: 'app-personal-task-board',
  templateUrl: './personal-task-board.component.html',
  styleUrls: ['./personal-task-board.component.scss']
})
export class PersonalTaskBoardComponent implements OnInit {

  selectedTask: Task = null;

  constructor() {
  }

  ngOnInit(): void {
  }

  onTaskSet(task: Task): void {
    console.log('main component got data ', task);
    this.selectedTask = task;
  }

}
