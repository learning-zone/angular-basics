import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  log(errorMsg: string) {
    console.log(errorMsg);
  }
}
