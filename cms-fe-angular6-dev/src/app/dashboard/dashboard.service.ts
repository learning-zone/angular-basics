import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Params } from '@utils/params.service';

@Injectable()
export class DashBoardService {
  constructor (
    private params: Params,
    private http: HttpClient,
  ) {}

  public getSystemLogChina (source: string) {
    return this.http.get('/chart/syslogchina?' + this.params.fmtpages({source}));
  }

}
