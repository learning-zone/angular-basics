import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Params } from '../../../utils/params.service';

@Injectable()
export class SystemLogListService {
  constructor (
    private http: HttpClient,
    private params: Params,
  ) {}

  public getSystemLogList (data: any) {
    return this.http.get('/systemlog?' + this.params.fmtpages(data));
  }

  public deleteSystemLog (id: string) {
    return this.http.delete('/systemlog/' + id);
  }

  public syncGeoInfo () {
    return this.http.post('/system/geoinfo', {});
  }

}
