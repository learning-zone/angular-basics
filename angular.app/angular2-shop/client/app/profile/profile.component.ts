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
  selector: 'profile',
  template: require('./profile.html'),

  directives: [
      MD_SIDENAV_DIRECTIVES,
      MD_CARD_DIRECTIVES,
      MdToolbar,
      MdButton,
      MdCheckbox,
      MD_INPUT_DIRECTIVES,
  ]
})
export class Profile  {
  thisForm: ControlGroup;
  error: string;

  public firstName: string = '';
  public lastName: string = '';
  public address1: string = '';
  public address2: string = '';
  public city: string = '';
  public country: string = '';
  public zip: string = '';
  public mobile: string = '';

  public phone: string = '';
  public gmail: string = '';
  public facebook: string = '';
  public profile_url: string = '';
  public url: string = '';

  public delivery: boolean = true;
  public pickup: boolean = true;
  public veg: boolean = true;
  public cusine: string = '';
  
  public profile: any;
    //public cusine: string = '';




  


  constructor(
      private u: UserService
  ) {
    //super();

    let fb = new FormBuilder();

    this.thisForm = fb.group({
          firstName: [''],
          lastName: [''],
          address1: [''],
          address2: [''],

          city: [''],
          country: [''],
          zip: [''],
          mobile: [''],

          phone: [''],
          gmail: [''],
          facebook: [''],
          profile_url: [''],
          url: [''],

          delivery:[true],
          pickup: [true],
          veg: [true],
          cusine: ['']
  
    });

    this.error = '';
  }

  submit(data) {
      if (this.thisForm.valid || 1) {
          let sendData = data;
          console.log(sendData);  
          this.u.updateProfile(sendData)
              .subscribe((res) => {
                  console.log(res._id);
                  //this.u.id = res._id;
                  if (this.u.id) {
                      //this.u.email = res.email;
                      //this.u.isLogged = true;
                  }
                  
              });
              
    }
  }
}