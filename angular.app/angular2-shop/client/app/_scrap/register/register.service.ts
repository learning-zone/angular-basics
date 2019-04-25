import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class RegisterService {
  public url='/api/user';
    
  constructor(public http:Http) {

  }

  
  create(data) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url, JSON.stringify(data),
          {headers: headers})
        .map(res => res.json());
  }
  
  
}
