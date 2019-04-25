import {Component} from '@angular/core';

import {RegisterService} from './register.service';

import {HTTP_PROVIDERS} from '@angular/http';

@Component({
    selector: 'register',
    providers: [HTTP_PROVIDERS, RegisterService],
    template: require('./register.html')
})

export class Register {
  public email='';
  public password='';
  public user=  {
      email:'',
      password:''
      
  };
  
   submit(){
     
     
   }
   
   
}
