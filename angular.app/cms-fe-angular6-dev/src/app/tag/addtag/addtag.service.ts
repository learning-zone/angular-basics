import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AddTagService {
  constructor (
    private http: HttpClient,
  ) {}

  public addTag (data: any) {
    return this.http.post('/tag', data);
  }

}
