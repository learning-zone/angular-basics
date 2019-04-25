import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AddUserService {
  constructor (
    private http: HttpClient,
  ) {}

  public addUser (data: any) {
    return this.http.post('/user', data);
  }

}
