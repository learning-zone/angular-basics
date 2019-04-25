import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { AuthService }      from '@utils/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styles: [`
    .login-form {
      max-width: 300px;
      margin: 0 auto;
    }

    .login-form-forgot {
      float: right;
    }

    .login-form-button {
      width: 100%;
    }
  `],
})
export class LoginComponent implements OnInit {
  public loading: boolean = false;
  public _window: any;
  @ViewChild('canvas') private canvas: ElementRef;
  @ViewChild('form') private form: NgForm;
  public userInfo: UserModel = new UserModel();

  constructor (private http: HttpClient, private authService: AuthService) {
    if (this.authService.isLogged) {
      location.href = '/dashboard';
    }
  }

  public ngOnInit () {
    //
  }

  public login () {
    for (const i in this.form.controls) {
      this.form.controls[ i ].markAsDirty();
      this.form.controls[ i ].updateValueAndValidity();
    }
    if (this.form.valid) {
      // this.authService.login(this.userInfo);
      // this.userInfo = new UserModel();
      this.loading = true;
      this.http.post('/login', this.userInfo)
      .finally(() => { this.loading = false; })
      .subscribe((res: any) => {
        this.authService.isLogged = true;
        localStorage.setItem('ACCESS_TOKEN', res.msg);
        localStorage.setItem('USER_INFO', JSON.stringify(res.data));
        location.href = !!this.authService.redirectUrl ? this.authService.redirectUrl : '/dashboard';
      }, (err: any) => { });
    }
  }

}

class UserModel {
  public username: string;
  public password: string;
}
