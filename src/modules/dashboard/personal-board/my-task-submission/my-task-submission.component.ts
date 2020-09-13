import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CoreConstant} from '../../../app-common/core-constant';
import {DynamicFormModel} from '../../../app-common/components/inputs/input.model';
import {Task, User} from '../../../app-common/services/model';
import {ActivatedRoute} from '@angular/router';
import {TaskService} from '../../../app-common/services/apis/task.service';
import {FormGroup} from '@angular/forms';
import {myTaskSubmissionDynamicFormModel} from '../configurer/my-task-submission-form.mode';
import {AuthService} from '../../../app-common/services/apis/auth.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-my-task-submission',
  templateUrl: './my-task-submission.component.html',
  styleUrls: ['./my-task-submission.component.scss']
})
export class MyTaskSubmissionComponent implements OnInit, OnChanges {

  API_ROUTES = CoreConstant.APP_ROUTES;
  submissionTaskDynamicFormModel: DynamicFormModel[] = [...myTaskSubmissionDynamicFormModel];

  @Output() taskSubmission: EventEmitter<Task> = new EventEmitter<Task>();
  @Input() task: Task;

  isLoading: boolean;
  responseMessage: string;
  hasError: boolean;
  isFormReset = false;

  isAssignedToMe: boolean;

  constructor(private route: ActivatedRoute, private taskService: TaskService, private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onTaskSubmissionFormSubmit(taskForm: FormGroup): void {
    console.log('subit task resources ', taskForm);
    this.clearStatesBeforeFormSubmit();
    if (taskForm.invalid) {
      return;
    }
    this.taskService.submitTask(taskForm.value).subscribe(value => {
      this.task = value.response;
      this.responseMessage = 'Success! Submitted Task';
      this.clearStatesAfterFormSubmit(true);
      this.taskSubmission.emit(value.response);
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

  initIsAssignedToMe(task: Task): void {
    const currentUser: User = this.authService.getCurrentUser();
    if (task.assignedTo.id === currentUser.id) {
      this.isAssignedToMe = true;
    } else {
      this.isAssignedToMe = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('task set changed');
    this.initIsAssignedToMe(this.task);
    if (this.task != null) {
    }
  }

}
