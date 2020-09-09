import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormConstants} from '../app-common/form-constants';
import {Router} from '@angular/router';
import {AuthService} from '../app-common/services/apis/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  isSubmitted = false;
  validationMessage = FormConstants.loginForm.validations;
  loading = false;
  hasError = false;
  responseMessage: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  get formControls(): { [p: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  login(): void {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const formValue = this.loginForm.value;
    const loginForm = {
      username: formValue.username,
      password: formValue.password
    };
    this.loading = true;
    this.authService.login(loginForm)
      .pipe()
      .subscribe(
        res => {
          this.loading = false;
          this.hasError = false;
          this.responseMessage = 'Login Successful';
          this.isSubmitted = false;
          this.loginForm.reset();
          console.log('Routing to dashboard');
          this.router.navigate(['/dashboard']);
        },
        err => {
          this.loading = false;
          this.hasError = true;
          this.responseMessage = 'Sorry! Something went wrong !!!';
        }
      );
  }
}
