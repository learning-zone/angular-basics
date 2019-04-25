import {Component} from '@angular/core';
//import {Router} from '@angularrouter';
import {FormBuilder, ControlGroup, Validators} from '@angular/common';
//import 'ng2-material/all.webpack';
import {MATERIAL_DIRECTIVES} from 'ng2-material' ;
//import {RouterLink} from '@angularrouter';
import {RouteConfig, Router} from '@angular/router-deprecated';


@Component({
  selector: 'signup',
  //directives: [MATERIAL_DIRECTIVES, RouterLink],
//  directives: [ RouterLink],
  templateUrl: '/client/imports/auth/signup.html'
})

export class Signup  {
  signupForm: ControlGroup;
  error: string;

  constructor(private router: Router) {
   // super();

    let fb = new FormBuilder();

    this.signupForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.error = '';
  }

  signup(credentials) {
    if (this.signupForm.valid) {
      
    }
  }
}