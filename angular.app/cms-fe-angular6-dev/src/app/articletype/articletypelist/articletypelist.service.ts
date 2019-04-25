import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '../../../utils/params.service';

@Injectable()
export class ArticleTypeListService {
  constructor (
    private http: HttpClient,
    private params: Params,
  ) {}

  public getArticleTypeList (data: any) {
    return this.http.get('/articletype?' + this.params.fmtpages(data));
  }

}
