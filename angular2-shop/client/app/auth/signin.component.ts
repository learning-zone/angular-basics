import {Component} from '@angular/core';
//import {Router} from '@angular/router';
import {RouteConfig, Router} from '@angular/router-deprecated';


import {FormBuilder, ControlGroup, Validators} from '@angular/common';

import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MdToolbar} from '@angular2-material/toolbar';
import {MdButton} from '@angular2-material/button';
import {MdCheckbox} from '@angular2-material/checkbox';
import {MdProgressBar} from '@angular2-material/progress-bar';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {UserService} from './user.service';
import {Auth} from 'ng2-ui-auth';

@Component({
    selector: 'signin',
    template: require('./signin.html'),
  //  providers: [Router],
  
    directives: [
        MD_SIDENAV_DIRECTIVES,
        MD_CARD_DIRECTIVES,
        MdToolbar,
        MdButton,
        MdCheckbox,
        MD_INPUT_DIRECTIVES,
        MdProgressBar
    ]
})
export class Signin {
    signinForm: ControlGroup;
    error: string;

    constructor(
        public auth: Auth,
        public u: UserService,
        public router: Router
    ) {
        //super();

        let fb = new FormBuilder();

        this.signinForm = fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.error = '';
    }
    authenticate(provider: string) {
        this.auth.authenticate(provider)
            .subscribe(
            //() => let abstract = 1;
            //    this.goToMain(),
            //this.handlers.error
            );
    }

    submit(data) {
        
        if (this.signinForm.valid) {
            //  alert('valid');
            //alert(this.u);
            let sendData = {
                email: data.email,
                password: data.password,
                username: data.email
            };
            console.log(sendData);
            this.u.verify(sendData)
                .subscribe((res) => {
                    //console.log('ssss');
                    //console.log(res);
                    console.log(res._id);
                    this.u.id = res._id;
                    if (this.u.id) {
                        this.u.email = res.email;
                        this.u.isLogged = true;
    //                    this.router.navigate(['/home']);
                        console.log('going to home')
                        this.router.parent.navigate(['Home']);
                    }
                    
                });
                
        }
    }//submit
}