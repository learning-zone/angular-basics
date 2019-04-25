import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '../../../utils/params.service';

@Injectable()
export class CommentDetailService {
  constructor (
    private http: HttpClient,
    private params: Params,
  ) {}

  public getComment (id: string) {
    return this.http.get('/comment/' + id);
  }

}
