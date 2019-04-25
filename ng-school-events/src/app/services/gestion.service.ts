import { Injectable } from "@angular/core";
import { ConfigurationService } from "./configuration.service";
import { Http } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';

@Injectable()
export class GestionService {
  currentGestion: any;

  constructor(private configSvc: ConfigurationService, private http: Http) {
    this.currentGestion = {
      year: 2018,
      startDate: "February",
      endDate: "November"
    };
  }

  getCurrentGestion() {
    return this.currentGestion;
  }

  public getCurrentGestionMock(): Observable<any> {
    return this.http.get("assets/gestion-current.json");
  }
}
