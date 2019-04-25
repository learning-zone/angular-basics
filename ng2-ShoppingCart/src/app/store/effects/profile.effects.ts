import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import * as ACTIONS from '../actions/profile.actions';


import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/switchMap';

@Injectable()
export class ProfileEffects {

  @Effect()
  userLogin$ = this.actions$
    .ofType(ACTIONS.USER_TRY_LOGIN)
    .switchMap((action: any) => {
      return this.http.post('/api/user/login', action.payload)
        .map((response: Response) => response.json())
        .map((response) => ({ type: ACTIONS.USER_TRY_LOGIN_SUCCESS, payload: response }))
        .catch((err) => Observable.of(({ type: ACTIONS.USER_TRY_LOGIN_FAIL, payload: err.json() })));
    })

  // @Effect()
  // userRegister$ = this.actions$
  //   .ofType(USER_TRY_REGISTER)
  //   .switchMap((action: Action) => {
  //     return this.http.post('/api/user/register', action.payload)
  //       .map((response: Response) => response.json())
  //       .map((response) => ({ type: USER_TRY_REGISTER_SUCCESS, payload: response }))
  //       .catch((err) => {
  //         console.log('err', err)
  //         return Observable.of({ type: USER_TRY_REGISTER_FAIL, payload: err.json() })
  //       })
  //   })


  // @Effect()
  // userResetPassword$ = this.actions$
  //   .ofType(USER_TRY_RESET_PASSWORD)
  //   .switchMap((action: Action) => {
  //     return this.http.post('/api/user/reset/password', action.payload)
  //       .map((response: Response) => response.json())
  //       .map((response) => ({ type: USER_TRY_REGISTER_SUCCESS, payload: response }))
  //       .catch((err) => {
  //         console.log('err', err)
  //         return Observable.of({ type: USER_TRY_REGISTER_FAIL, payload: err.json() })
  //       })
  //   })

  // @Effect({ dispatch: false })
  // navigateAfterLogin$ = this.actions$
  //   .ofType(USER_TRY_LOGIN_SUCCESS)
  //   .switchMap(() => {
  //     return this.router.navigate(['/dashboard'])
  //   })

  constructor(private actions$: Actions, private http: Http, public router: Router) { }
}
