import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggled = false;
  _hasBackgroundImage = true;
  menus = [
    {
      title: 'General',
      type: 'header'
    },
    {
      title: 'Components',
      icon: 'fa fa-folder',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Component Interaction',
          path: 'component-interaction'
        },
        {
          title: 'Directives',
          path: 'directives'
        },
        { 
          title: 'Lifecycles',
          path: 'lifecycles'
        },
        {
          title: 'Pipes',
          path: 'pipes'
        }
      ]
    },
    {
      title: 'Forms',
      icon: 'fa fa-folder',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Angular Forms',
          path: 'angular-forms'
        },
        {
          title: 'Reative Forms',
          path: 'reative-forms'
        }
      ]
    },
    {
      title: 'RxJS',
      icon: 'fa fa-folder',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Observables',
          path: 'observables'
          
        },
        {
          title: 'Promises',
          path: 'promises'
        },
        {
          title: 'RxJS',
          path: 'rxjs'
        }
      ]
    },
    {
      title: 'Dependency Injection',
      icon: 'fa fa-folder',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Dependency Injection',
          path: 'dependency-injection'
        },
        {
          title: 'DI Providers',
          path: 'di-providers'
        }
      ]
    },
    {
      title: 'Routing',
      icon: 'fa fa-folder',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Routing',
          path: 'routing'
        },
        {
          title: 'Lazy Loading',
          path: 'lazy-loading'
        },
        {
          title: 'Services',
          path: 'services'
        },
        {
          title: 'Providers',
          path: 'providers'
        },
        {
          title: 'Authentication',
          path: 'authentication'
        },
        {
          title: 'HttpClient',
          path: 'httpclient'
        }
      ]
    },
    {
      title: 'Miscellaneous',
      icon: 'fa fa-folder',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Animations',
          path: 'animations'
        },
        {
          title: 'Internationalization',
          path: 'internationalization'
        },
        {
          title: 'Drag & drop',
          path: 'drag-drop'
        },
        {
          title: 'Virtual Scrolling',
          path: 'virtual-scrolling'
        }
      ]
    }
  ];
  constructor() { }

  toggle() {
    this.toggled = ! this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }
}
