import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any) {
    const LoggerService = this.injector.get(LoggerService);
    if (error instanceof HttpErrorResponse) {
      LoggerService.log('Backend returned status code: ' + error.status);
      LoggerService.log('Response body: ' + error.message);
    } else {
      LoggerService.log('An error occurred: ' + error.message);
    }
  }
}
