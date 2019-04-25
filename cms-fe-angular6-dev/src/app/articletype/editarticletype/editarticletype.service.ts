import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '../../../utils/params.service';

@Injectable()
export class EditArticleTypeService {
  constructor (
    private http: HttpClient,
    private params: Params,
  ) {}

  public getArticleType (id: string) {
    return this.http.get('/articletype/' + id);
  }

  public updateArticleType (data: any) {
    return this.http.put('/articletype/' + data.id, data);
  }

}
