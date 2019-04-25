import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HelperService } from './helper.service';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
  public baseUrl: string = '/api';
  public store: any;

  constructor (private helper: HelperService) {
    this.store = localStorage;
  }

  public intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone({
      url: this.baseUrl + req.url,
      setHeaders: {
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization-User': this.store.getItem('ACCESS_TOKEN') || 'no_token',
      },
      // withCredentials: true, // same origin not use
    });
    return next.handle(request).do((res: HttpResponse<any>) => {
      if (res instanceof HttpResponse) {
        this.helper.successHelper(res);
      }
      return res.body;
    }, (err: HttpErrorResponse) => {
      if (err instanceof HttpErrorResponse) {
        this.helper.errorHelper(err);
      }
      return err.error;
    }, () => {
      //
    });
  }
}
