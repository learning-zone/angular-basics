import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Params } from '../../../utils/params.service';

@Injectable()
export class CommentListService {
  constructor (
    private http: HttpClient,
    private params: Params,
  ) {}

  public getCommentList (data: any) {
    return this.http.get('/comment?' + this.params.fmtpages(data));
  }

  public deleteComment (id: string) {
    return this.http.delete('/comment/' + id);
  }

}
