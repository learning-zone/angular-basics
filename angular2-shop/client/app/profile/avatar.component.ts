import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, ControlGroup, Validators} from '@angular/common';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MdToolbar} from '@angular2-material/toolbar';
import {MdButton} from '@angular2-material/button';
import {MdCheckbox} from '@angular2-material/checkbox';
import {MdProgressBar} from '@angular2-material/progress-bar';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {UserService} from '../auth/user.service';

@Component({
  selector: 'avatar',
  template: require('./avatar.html'),

  directives: [
      MD_SIDENAV_DIRECTIVES,
      MD_CARD_DIRECTIVES,
      MdToolbar,
      MdButton,
      MdCheckbox,
      MD_INPUT_DIRECTIVES,
  ]
})
export class Avatar  {
  thisForm: ControlGroup;
  error: string;

  constructor(
      private u: UserService
  ) {
    //super();

    let fb = new FormBuilder();

    this.thisForm = fb.group({
      email: [''],
      password: ['']
    });

    this.error = '';
  }

  submit(data) {
      if (this.thisForm.valid || 1) {
          let sendData = {
              email: data.email,
              password: data.password,
              username: data.email
          };
          console.log(sendData);  
          this.u.create(sendData)
              .subscribe((res) => {
                  console.log(res._id);
                  this.u.id = res._id;
                  if (this.u.id) {
                      this.u.email = res.email;
                      this.u.isLogged = true;
                  }
                  
              });
              
    }
  }
}