import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { AuthenticationService } from 'app/services/authentication.service';
import { RouterService } from 'app/services/router.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public username;
  public password;
  public submitMessage: string;
  public loginForm: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  @ViewChild(FormGroupDirective, { static: true })
  formGroupDirective: FormGroupDirective;

  constructor(private authService: AuthenticationService,
    private routerService: RouterService) {

  }


  loginSubmit() {
    console.log(this.loginForm.value['username']);
    this.authService.authenticateUser(this.loginForm.value).subscribe(response => {
      console.log('response' + this.loginForm.value['username'] );
      this.authService.setBearerToken(response);
      this.routerService.routeToDashboard();
    },
      error => {
        if (error.status === 403) {
          this.submitMessage = error.error.message;
        } else {
          this.submitMessage = error.message;

        }

        console.log(JSON.stringify(error));
      });
    this.authService.setUserId(this.loginForm.value['username']);
    this.loginForm.reset();
    this.formGroupDirective.resetForm();

  }
}
