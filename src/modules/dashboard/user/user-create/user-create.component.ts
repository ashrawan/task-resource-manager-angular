import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {UserDynamicFormModel} from '../configurer/user-form.model';
import {DynamicFormModel} from '../../../app-common/components/inputs/input.model';
import {User} from '../../../app-common/services/model';
import {UserService} from '../../../app-common/services/apis/user.service';
import {CoreConstant} from '../../../app-common/core-constant';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit, OnDestroy {

  USER_API_ROUTES = CoreConstant.APP_ROUTES;
  userDynamicFormModel: DynamicFormModel[] = UserDynamicFormModel;

  isLoading: boolean;
  responseMessage: string;
  hasError: boolean;
  isFormReset = false;
  createdUser: User;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    return;
  }

  onUserFormSubmit(userForm: FormGroup): void {
    this.clearStatesBeforeFormSubmit();
    if (userForm.invalid) {
      return;
    }
    const user: User = userForm.value;
    this.userService.createUser(user).subscribe(value => {
      this.createdUser = value.response;
      this.responseMessage = 'Success! Added New User';
      this.clearStatesAfterFormSubmit(true);
    }, error => {
      this.responseMessage = error.error.response;
      this.clearStatesAfterFormSubmit(false);
    });
  }

  clearStatesBeforeFormSubmit(): void {
    this.responseMessage = null;
    this.hasError = false;
    this.createdUser = null;
    this.isLoading = true;
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

  onUpload(e): any {
    console.log(e);

  }

  ngOnDestroy(): void {
    return;
  }

}
