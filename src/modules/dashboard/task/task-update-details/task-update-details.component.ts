import {Component, OnInit} from '@angular/core';
import {DynamicFormModel} from '../../../app-common/components/inputs/input.model';
import {ActivatedRoute} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {TaskService} from '../../../app-common/services/apis/task.service';
import {CoreConstant} from '../../../app-common/core-constant';
import {TaskDynamicFormModel} from '../configurer/task-form.model';
import {Task} from '../../../app-common/services/model';

@Component({
  selector: 'app-task-update-details',
  templateUrl: './task-update-details.component.html',
  styleUrls: ['./task-update-details.component.scss']
})
export class TaskUpdateDetailsComponent implements OnInit {

  API_ROUTES = CoreConstant.APP_ROUTES;
  updateTaskDynamicFormModel: DynamicFormModel[] = [...TaskDynamicFormModel];

  private id: string;
  private sub: any;

  isLoading: boolean;
  isEdit = true;

  responseMessage: string;
  hasError: boolean;
  isFormReset = false;
  task: Task;

  constructor(private route: ActivatedRoute, private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.routeId();
  }

  routeId(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params.id;
      this.getTaskById(this.id);
    });
  }

  toggleEdit(): void {
    this.isEdit = !this.isEdit;
  }

  onTaskUpdateFormSubmit(taskForm: FormGroup): void {
    console.log('update task form ', taskForm);
    this.clearStatesBeforeFormSubmit();
    if (taskForm.invalid) {
      return;
    }
    this.taskService.updateTask(taskForm.value).subscribe(value => {
      this.task = value.response;
      this.responseMessage = 'Success! Updated Task';
      this.clearStatesAfterFormSubmit(true);
    }, error => {
      this.responseMessage = error.error.response;
      this.clearStatesAfterFormSubmit(false);
    });
  }

  closeAlert(): void {
    this.responseMessage = null;
  }

  clearStatesBeforeFormSubmit(): void {
    this.isLoading = true;
    this.responseMessage = null;
    this.hasError = false;
    this.task = null;
  }

  clearStatesAfterFormSubmit(isSuccess: boolean): void {
    if (isSuccess) {
      this.hasError = false;
      this.isFormReset = false;
    } else {
      this.hasError = true;
      this.isFormReset = false;
    }
    this.isLoading = false;
  }

  getTaskById(id): void {
    this.isLoading = true;
    this.taskService.getTaskById(id).subscribe(data => {
        this.task = data.response;
        this.hasError = false;
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
        this.hasError = true;
        this.responseMessage = error.error.response;
      }
    );
  }

}
