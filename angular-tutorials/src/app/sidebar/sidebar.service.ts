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
        },
        {
          title: 'Directives'
        },
        {
          title: 'Structural Directive'
        },
        {
          title: 'Lifecycles'
        },
        {
          title: 'Pipes'
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
        },
        {
          title: 'Reative Forms'
        }
      ]
    },
    {
      title: 'Observables',
      icon: 'fa fa-folder',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Observables',
        },
        {
          title: 'Promises',
        },
        {
          title: 'RxJS'
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
        },
        {
          title: 'DI Providers'
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
        },
        {
          title: 'Lazy Loading'
        },
        {
          title: 'Services'
        },
        {
          title: 'Authentication'
        }
      ]
    },
    {
      title: 'Miscellaneous',
      type: 'header'
    },
    {
      title: 'HttpClient',
      icon: 'fa fa-book',
      active: false,
      type: 'simple',
    },
    {
      title: 'Event Binding',
      icon: 'fa fa-book',
      active: false,
      type: 'simple'
    },
    {
      title: 'Providers',
      icon: 'fa fa-book',
      active: false,
      type: 'simple'
    },
    {
      title: 'Animations',
      icon: 'fa fa-book',
      active: false,
      type: 'simple'
    },
    {
      title: 'Internationalization',
      icon: 'fa fa-book',
      active: false,
      type: 'simple'
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
