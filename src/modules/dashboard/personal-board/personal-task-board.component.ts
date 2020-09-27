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
    editTask: Task = null;

    responseMessage: string;
    hasError: boolean;

    constructor(private taskService: TaskService) {
    }

    ngOnInit(): void {
    }

    onTaskSet(task: Task): void {
        console.log('main component got data ', task);
        this.taskService.getTaskById(task.id).subscribe(value => {
            this.selectedTask = value.response;
            this.editTask = this.selectedTask;
            this.hasError = false;
            this.responseMessage = null;
        }, error => {
            this.selectedTask = null;
            this.editTask = null;
            this.hasError = true;
            this.responseMessage = error.error.response;
        });
    }

    taskSubmission(task: Task): void {
        if (task != null) {
            this.responseMessage = 'Success! Submitted Task';
            this.hasError = false;
            this.selectedTask = task;
            this.editTask = null;
        }
    }

    closeAlert(): void {
        this.responseMessage = null;
    }

}
