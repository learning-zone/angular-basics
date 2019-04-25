import {Component} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';
import {Router} from '@angular/router';
import {FormBuilder, ControlGroup, Validators} from '@angularcommon';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
import {RouterLink} from '@angularrouter';

@Component({
  selector: 'login',
  directives: [MATERIAL_DIRECTIVES, RouterLink],
  templateUrl: '/packages/socially-browser/auth/login.html'
})
export class BrowserLogin extends MeteorComponent {
  loginForm: ControlGroup;
  error: string;

  constructor(private router: Router) {
    super();

    let fb = new FormBuilder();

    this.loginForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.error = '';
  }

  login(credentials) {
    if (this.loginForm.valid) {
      Meteor.loginWithPassword(credentials.email, credentials.password, (err) => {
        if (err) {
          this.error = err;
        }
        else {
          this.router.navigate(['/PartiesList']);
        }
      });
    }
  }
}