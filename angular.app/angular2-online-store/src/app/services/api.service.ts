import { Injectable }                             from '@angular/core';
import { Headers, Http, RequestMethod, Response } from '@angular/http';
import { Observable }                             from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Computer, IFilters } from '../models/index';

export interface IApiResponse<T> extends Response{
  success: boolean;
  message: string;
  data: Array<T>;
}

interface IComputersApiService{
  getAllComputers():                                     Observable<IApiResponse<Computer>>;
  getComputerById(id: number):                           Observable<IApiResponse<Computer>>;
  getAllBrandNames():                                    Observable<IApiResponse<string>>;
  findComputers(filters: IFilters):                      Observable<IApiResponse<Computer>>;
  removeComputer(id: number):                            Observable<IApiResponse<Computer>>;
  createNewComputer(newComputer: Computer):              Observable<IApiResponse<Computer>>;
  updateComputer(id: number, updatedComputer: Computer): Observable<IApiResponse<Computer>>;
}

@Injectable()
export class ApiService implements IComputersApiService{

  private apiResources = {
      baseUrl: 'http://localhost:7777/api/computers',
      brands:  'http://localhost:7777/api/brands',
  };

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http){

  }

  public getAllComputers(): Observable<IApiResponse<Computer>> {
    return <Observable<IApiResponse<Computer>>> this.makeApiRequest(RequestMethod.Get, this.apiResources.baseUrl, null);
  }

  public getComputerById(id: number): Observable<IApiResponse<Computer>> {
    return <Observable<IApiResponse<Computer>>> this.makeApiRequest(RequestMethod.Get, this.apiResources.baseUrl + '/' + id, null);
  }

  public getAllBrandNames(): Observable<IApiResponse<string>> {
    return <Observable<IApiResponse<string>>> this.makeApiRequest(RequestMethod.Get, this.apiResources.brands, null);
  }

  public findComputers(filters: IFilters): Observable<IApiResponse<Computer>> {
    return <Observable<IApiResponse<Computer>>> this.makeApiRequest(RequestMethod.Post, this.apiResources.baseUrl + '/filter', JSON.stringify(filters));
  }

  public removeComputer(id: number): Observable<IApiResponse<Computer>> {
    return <Observable<IApiResponse<Computer>>> this.makeApiRequest(RequestMethod.Delete, this.apiResources.baseUrl + '/' + id, null);
  }

  public createNewComputer(newComputer: Computer): Observable<IApiResponse<Computer>> {
    return <Observable<IApiResponse<Computer>>> this.makeApiRequest(RequestMethod.Post, this.apiResources.baseUrl, JSON.stringify(newComputer));
  }

  public updateComputer(id: number, updatedComputer: Computer): Observable<IApiResponse<Computer>> {
    return <Observable<IApiResponse<Computer>>> this.makeApiRequest(RequestMethod.Put, this.apiResources.baseUrl + '/' + id, JSON.stringify(updatedComputer));
  }

  //Success handler
  private extractData(response: Response){
    if(response.status < 200 || response.status >= 300){
      throw new Error(`Bad response status: ${response.status}`);
    }
    return response.json();
  }

  //Error handler
  private handleError(error: any = 'Server Error'){
    console.error(error.message);
    console.log("Something went wrong while trying to access the url provided");
    return Observable.throw(error.message);
  }

  private makeApiRequest(method: RequestMethod, resource: string, body: any): Observable<Response> {
    //noinspection TypeScriptUnresolvedFunction
    return this.http.request(resource, {body, method, headers: this.headers})
        .map(this.extractData)
        .catch(this.handleError)
  }
}
