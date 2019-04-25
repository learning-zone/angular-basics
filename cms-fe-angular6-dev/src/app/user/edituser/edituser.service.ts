import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EditUserService {
  constructor (
    private http: HttpClient,
  ) {}

  public getUser (id: any) {
    return this.http.get(`/user/${id}`);
  }

  public updateUser (data: any) {
    return this.http.put(`/user/${data.id}`, data);
  }

}
