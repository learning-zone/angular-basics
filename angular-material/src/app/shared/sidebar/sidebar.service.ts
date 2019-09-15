import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  days = ['One', 'Two', 'Three'];
  panelOpenState = false;
  menus = [
    {
		title: "Section 1",
		icon: "fa fa-folder",
		active: false,
		type: "dropdown",
		submenus: [
      {
				title: "Link 1",
				path: "Link 1"
			},
			{
				title: "Link 2",
				path: "Link 2"
			}
		]
	},
	{
		title: "Section 2",
		icon: "fa fa-folder",
		active: false,
		type: "dropdown",
		submenus: [{
				title: "Link 1",
				path: "Link 1"
			},
			{
				title: "Link 2",
				path: "Link 2"
			},
			{
				title: "Link 3",
				path: "Link 3"
			}
		]
	}
]

  getMenuList() {
    return this.menus;
  }
}
