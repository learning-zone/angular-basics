import { HomeComponent } from "./home";
import { AboutComponent } from "./about";
import { NoContentComponent } from "./no-content";
import { Ng2StateDeclaration } from "@uirouter/angular";

/**
 * Definition of all states of an application.
 */
export const APP_STATES: Ng2StateDeclaration[] = [
	{ name: "index", url: "/", component: HomeComponent },
	{ name: "home", url: "/home", component: HomeComponent },
	{ name: "about", url: "/about", component: AboutComponent },
	{ name: "otherwise", url: "/otherwise", component: NoContentComponent }
];
