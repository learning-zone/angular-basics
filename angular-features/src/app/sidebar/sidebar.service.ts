import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggled = false;
  _hasBackgroundImage = true;
  menus = [
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
        },
        {
          title: 'Radio',
          path: 'radio'
        },
        {
          title: 'CheckBox',
          path: 'checkbox'
        },
        {
          title: 'Dropdown',
          path: 'dropdown'
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
          title: 'Reative Forms',
          path: 'reative-forms'
        },
        {
          title: 'Template-driven Forms',
          path: 'template-driven-forms'
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
          title: 'Lazy Loading',
          path: 'lazy-loading'
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
  constructor() {}

  toggle() {
    this.toggled = !this.toggled;
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
