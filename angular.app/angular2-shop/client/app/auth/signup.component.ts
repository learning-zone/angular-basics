import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, ControlGroup, Validators} from '@angular/common';

//import {MATERIAL_DIRECTIVES} from 'ng2-material';
//import {RouterLink} from '@angular/router';
//import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from "ng2-material";

//import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
//import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';

import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MdToolbar} from '@angular2-material/toolbar';
import {MdButton} from '@angular2-material/button';
import {MdCheckbox} from '@angular2-material/checkbox';
//import {MdRadioButton} from '@angular2-material/radio';
//import {MdRadioDispatcher} from '@angular2-material/radio/radio_dispatcher';
//import {MdSpinner} from '@angular2-material/progress-circle';
import {MdProgressBar} from '@angular2-material/progress-bar';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
//import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {UserService} from './user.service';

@Component({
  selector: 'signup',
  template: require('./signup.html'),

  directives: [
      MD_SIDENAV_DIRECTIVES,
      MD_CARD_DIRECTIVES,
      MdToolbar,
      MdButton,
      MdCheckbox,
  //    MdRadioButton,
   //   MdSpinner,
      MD_INPUT_DIRECTIVES,
    //  MD_LIST_DIRECTIVES,
      MdProgressBar,
      //  MdIcon,
  ]
 // template: '<h1>dd</h1>'
  //directives: [MATERIAL_DIRECTIVES]
  //templateUrl: './auth/signup.html'
  //templateUrl: '/client/imports/auth/signup.html'
})
export class Signup  {
  signupForm: ControlGroup;
  error: string;

  constructor(
      private u: UserService
  ) {
    //super();

    let fb = new FormBuilder();

    this.signupForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.error = '';
  }

  signup(data) {
      //Accounts.createUser({ email: credentials.email, password: credentials.password}, (err) => {
      //alert(data.email);

      if (this.signupForm.valid) {
        //  alert('valid');
          //alert(this.u);
          let sendData = {
              email: data.email,
              password: data.password,
              username: data.email
          };
          console.log(sendData);  
          this.u.create(sendData)
              .subscribe((res) => {
                  //console.log('ssss');
                  //console.log(res);
                  console.log(res._id);
                  this.u.id = res._id;
                  if (this.u.id) {
                      this.u.email = res.email;
                      this.u.isLogged = true;
                  }
                  //alert(res);  
                  
              });

          //alert(a);
          //console.log('kkk');
          /*
          this.u.create(sendData , (err) => {
             if (err) {
                //  this.error = err;
            }
        else {
            // this.router.navigate(['/PartiesList']);
        }
          })*/
              ;

      //Accounts.createUser({ email: credentials.email, password: credentials.password}, (err) => {
        /*if (err) {
          this.error = err;
        }
        else {
          this.router.navigate(['/PartiesList']);
        }*/
      //});
    }
  }
}