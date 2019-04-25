import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

export const USER_GET = 'Profile: get user';
export const USER_GET_SUCCESS = 'Profile: get user success';
export const USER_TRY_LOGIN = 'Profile: user try login';
export const USER_TRY_LOGIN_SUCCESS = 'Profile: user try login success';
export const USER_TRY_LOGIN_FAIL = 'Profile: user try login fail';
export const USER_TRY_REGISTER = 'Profile: user try register';
export const USER_TRY_REGISTER_SUCCESS = 'Profile: user try register success';
export const USER_TRY_REGISTER_FAIL = 'Profile: user try register fail';
export const USER_TRY_RESET_PASSWORD = 'Profile: user try reset password';


@Injectable()
export class ProfileAction {

    constructor(private store: Store<any>) {

    }

}