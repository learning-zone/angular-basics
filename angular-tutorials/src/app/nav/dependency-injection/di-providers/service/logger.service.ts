import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  log(errorMsg: string) {
    console.log(errorMsg);
  }
}
