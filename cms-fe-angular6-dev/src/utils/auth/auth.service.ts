import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  public store: Storage;
  public isLogged: boolean = false;

  constructor (private http: HttpClient) {
    this.store = localStorage;
    this.isLogged = this.store.getItem('ACCESS_TOKEN')
                    && this.store.getItem('ACCESS_TOKEN').length == 64
                    && this.store.getItem('USER_INFO') ? true : false;
  }

  get redirectUrl () {
    return sessionStorage.getItem('RedirectUrl') || '';
  }

  set redirectUrl (url: string) {
    sessionStorage.setItem('RedirectUrl', url);
  }

  public login (userInfo: object) {
    this.http.post('/login', userInfo).subscribe((res: any) => {
      this.isLogged = true;
      this.store.setItem('ACCESS_TOKEN', res.msg);
      this.store.setItem('USER_INFO', JSON.stringify(res.data));
      location.href = !!this.redirectUrl ? this.redirectUrl : '/dashboard';
    }, (err: any) => { });
  }

  public logout (): void {
    this.http.post('/logout', {}).subscribe((res: any) => {
      this.isLogged = false;
      this.store.clear();
      sessionStorage.clear();
      setTimeout(() => {
          location.href = 'login';
      }, 1000);
    }, (err: any) => { });
  }
}
