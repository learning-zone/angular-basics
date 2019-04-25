import {Injectable, Provider} from '@angular/core'
//import {window} from '@angular/core/';
//import {unimplemented} from '@angular/exceptions';

//import {OpaqueToken} from '@angular/core/';
//import {CONST_EXPR} from '@angular/core/';


function _window(): any {
  return window
}

//export const WINDOW: OpaqueToken = CONST_EXPR(new OpaqueToken('WindowToken'));

export abstract class WindowRef {
  get nativeWindow(): any {
    return {};
  }
}

export class WindowRef_ extends WindowRef {
  constructor() {
    super();
  }
  get nativeWindow(): any {
    return _window();
  }
}


export const WINDOW_PROVIDERS = [
  new Provider(WindowRef, {useClass: WindowRef_}),
  //new Provider(WINDOW, {useFactory: _window, deps: []}),
];