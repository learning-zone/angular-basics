import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  public status: Subject<boolean> = new Subject();
  private _active: boolean = false;

  public get active(): boolean {
    return this._active;
  }

  public set active(value: boolean) {
    this._active = value;
    this.status.next(value);
  }

  public start(): void {
    this.active = true;
  }
  
  public stop(): void {
    this.active = false;
  }
}
