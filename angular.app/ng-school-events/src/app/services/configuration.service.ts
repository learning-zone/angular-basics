import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';

@Injectable()
export class ConfigurationService {

  config: any;
  backendUrl = "http://localhost:3000/api";

  pageSize = 10;
  constructor(private http: Http) {

    this.getConfig().subscribe(data => {
      this.config = data;
    }, error => console.log(error));
  }

  public getConfig(): Observable<any> {
    return this.http.get("assets/config.json").map(res => res.json());
  }
}
