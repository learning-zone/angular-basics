import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {
 
  handleError(error: any) {
    const loggerService = new LoggerService();
    if (error instanceof HttpErrorResponse) {
      loggerService.log('Backend returned status code: ' + error.status);
      loggerService.log('Response body: ' + error.message);
    } else {
      loggerService.log('An error occurred: ' + error.message);
    }
  }
}
