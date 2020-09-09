import {Component, OnInit} from '@angular/core';
import {DynamicFormModel} from '../../../app-common/components/inputs/input.model';
import {UserDynamicFormModel} from '../configurer/user-form.model';
import {User} from '../../../app-common/services/model';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../app-common/services/apis/user.service';
import {FormGroup} from '@angular/forms';
import {CoreConstant} from '../../../app-common/core-constant';

@Component({
  selector: 'app-user-update-details',
  templateUrl: './user-update-details.component.html',
  styleUrls: ['./user-update-details.component.scss']
})
export class UserUpdateDetailsComponent implements OnInit {

  API_ROUTES = CoreConstant.APP_ROUTES;
  updateUserDynamicFormModel: DynamicFormModel[] = [...UserDynamicFormModel];

  private id: string;
  private sub: any;

  isLoading: boolean;
  isEdit = true;

  responseMessage: string;
  hasError: boolean;
  isFormReset = false;
  user: User;

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit(): void {
    this.routeId();
  }

  routeId(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params.id;
      this.getUserById(this.id);
    });
  }

  toggleEdit(): void {
    this.isEdit = !this.isEdit;
  }

  onUserUpdateFormSubmit(userForm: FormGroup): void {
    console.log('update user form ', userForm);
    this.clearStatesBeforeFormSubmit();
    if (userForm.invalid) {
      return;
    }
    this.userService.updateUser(userForm.value).subscribe(value => {
      this.user = value.response;
      this.responseMessage = 'Success! Updated User';
      this.clearStatesAfterFormSubmit(true);
    }, error => {
      this.responseMessage = error.error.response;
      this.clearStatesAfterFormSubmit(true);
    });
  }

  closeAlert(): void {
    this.responseMessage = null;
  }

  clearStatesBeforeFormSubmit(): void {
    this.responseMessage = null;
    this.isLoading = true;
  }

  clearStatesAfterFormSubmit(isSuccess: boolean): void {
    if (isSuccess) {
      this.hasError = false;
      this.isFormReset = false;
    } else {
      this.hasError = false;
      this.isFormReset = false;
    }
    this.isLoading = false;
  }

  getUserById(id): void {
    this.isLoading = true;
    this.userService.getUserById(id).subscribe(data => {
        this.user = data.response;
        this.hasError = false;
        this.isLoading = false;
      },
      error => {
        this.responseMessage = error.error.response;
        this.hasError = true;
        this.isLoading = false;
      }
    );
  }


}
