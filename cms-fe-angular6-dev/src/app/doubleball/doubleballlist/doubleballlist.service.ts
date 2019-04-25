import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Params } from '../../../utils/params.service';

@Injectable()
export class DoubleBallListService {
  constructor (
    private http: HttpClient,
    private params: Params,
  ) {}

  public getDoubleBallList (data: any) {
    return this.http.get('/doubleball?' + this.params.fmtpages(data));
  }

  public addDoubleBall () {
    return this.http.post('/doubleball', {});
  }

  public deleteDoubleBall (id: string) {
        return this.http.delete('/doubleball/' + id);
  }

}
