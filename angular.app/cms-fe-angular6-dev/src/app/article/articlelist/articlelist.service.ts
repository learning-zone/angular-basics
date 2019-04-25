import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Params } from '../../../utils/params.service';

@Injectable()
export class ArticleListService {
  constructor (
    private http: HttpClient,
    private params: Params,
  ) {}

  public getArticleList (data: any) {
    return this.http.get('/article?' + this.params.fmtpages(data));
  }

  public deleteArticle (id: string) {
        return this.http.delete('/article/' + id);
  }

}
