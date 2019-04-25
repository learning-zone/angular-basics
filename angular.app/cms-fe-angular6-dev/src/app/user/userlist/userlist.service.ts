import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '../../../utils/params.service';

@Injectable()
export class UserListService {
  constructor (
    private http: HttpClient,
    private params: Params,
  ) {}

  public getUserList (data: any) {
    return this.http.get('/user?' + this.params.fmtpages(data));
  }

  public deleteUser (id: string) {
    return this.http.delete('/user/' + id);
  }

}
