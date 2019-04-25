import { ApplicationRef, ComponentRef, enableProdMode, NgModuleRef } from "@angular/core";
import { disableDebugTools, enableDebugTools } from "@angular/platform-browser";
import { createNewHosts } from "@angularclass/hmr";

import { StarkMain } from "./stark-main.intf";
import { StarkEnvironment } from "../environment";

/**
 * Parent class for bootstrapping Stark applications.
 * It handles the DOMContentLoaded event of the Web browser in order to bootstrap the application.
 * This class also supports HMR in development mode.
 */
export abstract class AbstractStarkMain implements StarkMain {
	protected constructor(protected environment: StarkEnvironment) {
		// no-op
	}

	/**
	 * Must be implemented by children classes. Called within bootstrapDomReady (i.e., when the DOM has been loaded)
	 */
	public abstract main: () => Promise<any>;

	public mainWrapper = (): void => {
		// written like this because otherwise "this" will not be captured :)
		// no need for the event listener after this
		document.removeEventListener("DOMContentLoaded", this.mainWrapper, false);

		this.initialize();
	};

	/**
	 * Call the main() method and log an error in case of failure
	 */
	private invokeMain(): void {
		// FIXME handle errors nicely (UX!)
		this.main().catch((err: any) => console.error(err));

		// TODO reintroduce later
		// bootstrap the app as long as the app root element is there (it won't be there in case the browser is outdated)
		// if (document.getElementsByClassName("stark-app")[0]) {
		// 	// add anything relevant here
		// } else {
		// 	console.error("Could not bootstrap the App: unsupported browser.");
		// }
	}

	/**
	 * Initialize by configuring HMR if it is enabled or normally instead.
	 */
	protected initialize = (): void => {
		if (ENV === "development" && this.environment.hmr) {
			if (module["hot"]) {
				this.bootstrapHmr(module, this.main);
			} else {
				console.error("HMR is not enabled for webpack-dev-server! This is most probably due to a bug in Stark.");
			}
		} else {
			this.invokeMain();
		}
	};

	/**
	 * Call the main function once the DOM has loaded
	 */
	protected bootstrapDomReady = (): void => {
		switch (document.readyState) {
			case "loading":
				document.addEventListener("DOMContentLoaded", this.mainWrapper, false);
				break;
			case "interactive":
			case "complete":
			default:
				this.initialize();
		}
	};

	/**
	 * Bootstrap after document is ready
	 */
	public bootstrap(): void {
		console.log(`
NNNNNNNN        NNNNNNNNBBBBBBBBBBBBBBBBB   BBBBBBBBBBBBBBBBB   
N:::::::N       N::::::NB::::::::::::::::B  B::::::::::::::::B
N::::::::N      N::::::NB::::::BBBBBB:::::B B::::::BBBBBB:::::B
N:::::::::N     N::::::NBB:::::B     B:::::BBB:::::B     B:::::B
N::::::::::N    N::::::N  B::::B     B:::::B  B::::B     B:::::B
N:::::::::::N   N::::::N  B::::B     B:::::B  B::::B     B:::::B
N:::::::N::::N  N::::::N  B::::BBBBBB:::::B   B::::BBBBBB:::::B
N::::::N N::::N N::::::N  B:::::::::::::BB    B:::::::::::::BB
N::::::N  N::::N:::::::N  B::::BBBBBB:::::B   B::::BBBBBB:::::B
N::::::N   N:::::::::::N  B::::B     B:::::B  B::::B     B:::::B
N::::::N    N::::::::::N  B::::B     B:::::B  B::::B     B:::::B
N::::::N     N:::::::::N  B::::B     B:::::B  B::::B     B:::::B
N::::::N      N::::::::NBB:::::BBBBBB::::::BBB:::::BBBBBB::::::B
N::::::N       N:::::::NB:::::::::::::::::B B:::::::::::::::::B
N::::::N        N::::::NB::::::::::::::::B  B::::::::::::::::B
NNNNNNNN         NNNNNNNBBBBBBBBBBBBBBBBB   BBBBBBBBBBBBBBBBB

We need great software developers like you! https://jobs.nbb.be
		`);

		if (ENV === "production") {
			// IMPORTANT: the production mode should be enabled before bootstrapping the app
			// otherwise an error is thrown: "Cannot enable prod mode after platform setup."
			enableProdMode();
		}

		this.bootstrapDomReady();
	}

	/**
	 * Configure HMR
	 * Code based on: https://github.com/angular/angular-cli/wiki/stories-configure-hmr
	 * Reference: https://github.com/gdi2290/angular-hmr
	 * @ignore
	 */
	protected bootstrapHmr: Function = (module: any, bootstrap: () => Promise<NgModuleRef<any>>) => {
		if (ENV === "development") {
			console.log("Bootstrapping HMR");
			let ngModule: NgModuleRef<any>;
			module.hot.accept();
			bootstrap().then(
				(mod: NgModuleRef<any>) => (ngModule = mod),
				(reason: any) => console.error("HMR bootstrap: bootstrap failed due to ", reason)
			);

			module.hot.dispose(() => {
				const appRef: ApplicationRef = ngModule.injector.get(ApplicationRef);
				const elements: ComponentRef<any>[] = appRef.components.map((c: ComponentRef<any>) => c.location.nativeElement);
				const makeVisible: () => void = createNewHosts(elements);
				ngModule.destroy();
				makeVisible();
			});
		}
	};

	/**
	 * Modify/decorate the NgModule instance created by Angular.
	 * Adapt the configuration based on the current environment
	 * @param moduleRef - NgModule instance created by Angular for a given platform.
	 */
	public decorateModule = (moduleRef: NgModuleRef<any>): NgModuleRef<any> => {
		// written like this because otherwise "this" will not be captured :)
		if (this.environment.production) {
			console.log("Customizing configuration for production!");
			disableDebugTools();
		} else {
			console.log("Customizing configuration for development!");

			// Ensure that we get detailed stack tracks during development (useful with node & Webpack)
			// Reference: http://stackoverflow.com/questions/7697038/more-than-10-lines-in-a-node-js-stack-error
			Error.stackTraceLimit = Infinity;
			require("zone.js/dist/long-stack-trace-zone");

			// Enable Angular debug tools in the dev console
			// https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
			const appRef: ApplicationRef = moduleRef.injector.get(ApplicationRef);
			const cmpRef: ComponentRef<any> = appRef.components[0];
			enableDebugTools(cmpRef);

			const _ng: any = (<any>window).ng;
			(<any>window).ng.probe = _ng.probe;
			(<any>window).ng.coreTokens = _ng.coreTokens;
		}

		return moduleRef;
	};
}
