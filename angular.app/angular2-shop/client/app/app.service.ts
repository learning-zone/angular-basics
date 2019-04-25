import {Injectable} from '@angular/core';
import {HmrState} from 'angular2-hmr';

@Injectable()
export class AppState {

  // `HmrState` is used by `HMR` to track the any `state` during reloading
  @HmrState() _state = {};

  constructor() {

  }

  // Already return a `clone` of the current `state`
  get state() {
    return this._state = this._clone(this._state);
  }

  // Never allow mutation
  set state(value) {
    throw new Error('Do not mutate the `.state` directly!');
  }

  get(prop?: any) {
    // Use our `state` getter for the `clone`
    const state = this.state;
    return state[prop] || state;
  }

  set(prop: string, value: any) {
    // Internally mutate our `state`
    return this._state[prop] = value;
  }

  _clone(object) {
    // Simple object `clone`
    return JSON.parse(JSON.stringify( object ));
  }
}
