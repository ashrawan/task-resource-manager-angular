import {Component, OnInit} from '@angular/core';
import {Task} from '../../app-common/services/model';
import {TaskService} from '../../app-common/services/apis/task.service';

@Component({
  selector: 'app-personal-task-board',
  templateUrl: './personal-task-board.component.html',
  styleUrls: ['./personal-task-board.component.scss']
})
export class PersonalTaskBoardComponent implements OnInit {

  selectedTask: Task = null;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
  }

  onTaskSet(task: Task): void {
    console.log('main component got data ', task);
    this.taskService.getTaskById(task.id).subscribe(value => {
      this.selectedTask = value.response;
    }, error => {
      this.selectedTask = null;
    });
  }

}
