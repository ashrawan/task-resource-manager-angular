import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CoreConstant} from '../../../app-common/core-constant';
import {CustomFormConfig, DynamicFormModel} from '../../../app-common/components/inputs/input.model';
import {Task, TASK_TYPE, User} from '../../../app-common/services/model';
import {ActivatedRoute} from '@angular/router';
import {TaskService} from '../../../app-common/services/apis/task.service';
import {FormGroup} from '@angular/forms';
import {myTaskSubmissionDynamicFormModel} from '../configurer/my-task-submission-form.mode';
import {AuthService} from '../../../app-common/services/apis/auth.service';

@Component({
  selector: 'app-my-task-submission',
  templateUrl: './my-task-submission.component.html',
  styleUrls: ['./my-task-submission.component.scss']
})
export class MyTaskSubmissionComponent implements OnInit, OnChanges {

  API_ROUTES = CoreConstant.APP_ROUTES;
  TASK_TYPE = TASK_TYPE;
  submissionTaskDynamicFormModel: DynamicFormModel[] = [...myTaskSubmissionDynamicFormModel];

  @Output() taskSubmission: EventEmitter<Task> = new EventEmitter<Task>();
  @Input() task: Task;

  isLoading: boolean;
  responseMessage: string;
  hasError: boolean;
  isFormReset = false;
  customFormConfig: CustomFormConfig;

  isAssignedToMe: boolean;

  constructor(private route: ActivatedRoute, private taskService: TaskService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.initProcessTask(this.task);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('task set changed');
    if (this.task != null) {
      this.initProcessTask(this.task);
    }
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
      this.taskSubmission.emit(null);
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

  initProcessTask(task: Task): void {
    const currentUser: User = this.authService.getCurrentUser();
    if (task.assignedTo.id === currentUser.id) {
      this.isAssignedToMe = true;
      // if (this.task.taskType === TASK_TYPE.AUDIO) {
      //   this.customFormConfig = {disableAll: true};
      // }
    } else {
      this.isAssignedToMe = false;
    }
  }

}
