// authentication.ts
import {Injectable} from '@angular/core';

@Injectable()
export class Authentication {
  token: string;

  constructor() {
    this.token = localStorage.getItem('token');
  }

  login(username: String, password: String) {
    /*
     * If we had a login api, we would have done something like this

    return this.http.post('/auth/login', JSON.stringify({
        username: username,
        password: password
      }), {
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .map((res : any) => {
        let data = res.json();
        this.token = data.token;
        localStorage.setItem('token', this.token);
      });

      for the purpose of this cookbook, we will juste simulate that
    */
    if (username === 'test' && password === 'test') {
      this.token = 'token';
      localStorage.setItem('token', this.token);
      //return Rx.Observable.of('token');
    }

    //return Rx.Observable.throw('authentication failure');
  }

  logout() {
    /*
     * If we had a login api, we would have done something like this

    return this.http.get(this.config.serverUrl + '/auth/logout', {
      headers: new Headers({
        'x-security-token': this.token
      })
    })
    .map((res : any) => {
      this.token = undefined;
      localStorage.removeItem('token');
    });
     */

    this.token = undefined;
    localStorage.removeItem('token');

    //return Rx.Observable.of(true);
  }
}