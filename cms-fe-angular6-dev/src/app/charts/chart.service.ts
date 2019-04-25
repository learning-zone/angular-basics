import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Params } from '@utils/params.service';

@Injectable()
export class ChartService {
  constructor (
    private http: HttpClient,
    private params: Params,
  ) {}

  public getSystemLog () {
    return this.http.get('/chart/systemlog?' + this.params.fmtpages(null));
  }

  public getSystemLogDate (date: string) {
    return this.http.get('/chart/systemlogdate?' + this.params.fmtpages({date}));
  }

  public getArticleType () {
    return this.http.get('/chart/articletype?' + this.params.fmtpages(null));
  }

  public getArticleTag () {
    return this.http.get('/chart/articletag?' + this.params.fmtpages(null));
  }

}
