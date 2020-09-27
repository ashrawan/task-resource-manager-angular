import {Component, OnDestroy, OnInit} from '@angular/core';
import {DynamicFormModel} from '../../../app-common/components/inputs/input.model';
import {FormGroup} from '@angular/forms';
import {TaskDynamicFormModel} from '../configurer/task-form.model';
import {Task, User} from '../../../app-common/services/model';
import {CoreConstant} from '../../../app-common/core-constant';
import {TaskService} from '../../../app-common/services/apis/task.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit, OnDestroy {

  API_ROUTES = CoreConstant.APP_ROUTES;
  taskDynamicFormModel: DynamicFormModel[] = TaskDynamicFormModel;

  isLoading: boolean;
  responseMessage: string;
  hasError: boolean;
  isFormReset = false;
  createdTask: Task;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    return;
  }

  onTaskFormSubmit(taskForm: FormGroup): void {
    this.clearStatesBeforeFormSubmit();
    if (taskForm.invalid) {
      return;
    }
    const user: Task = taskForm.value;
    this.taskService.createTask(user).subscribe(value => {
      this.createdTask = value.response;
      this.responseMessage = 'Success! Added New Task';
      this.clearStatesAfterFormSubmit(true);
    }, error => {
      this.responseMessage = error.error.response;
      this.clearStatesAfterFormSubmit(false);
    });
  }

  clearStatesBeforeFormSubmit(): void {
    this.responseMessage = null;
    this.hasError = false;
    this.createdTask = null;
    this.isLoading = true;
    this.isFormReset = false;
  }

  clearStatesAfterFormSubmit(isSuccess: boolean): void {
    if (isSuccess) {
      this.hasError = false;
      this.isFormReset = true;
    } else {
      this.hasError = true;
      this.isFormReset = false;
    }
    this.isLoading = false;
  }

  closeAlert(): void {
    this.responseMessage = null;
  }

  ngOnDestroy(): void {
    return;
  }

}
