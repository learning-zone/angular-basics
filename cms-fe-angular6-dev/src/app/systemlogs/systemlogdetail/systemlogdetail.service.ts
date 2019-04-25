import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '../../../utils/params.service';

@Injectable()
export class SystemLogDetailService {
  constructor (
    private http: HttpClient,
    private params: Params,
  ) {}

  public getSystemLog (id: string) {
    return this.http.get('/systemlog/' + id);
  }

}
