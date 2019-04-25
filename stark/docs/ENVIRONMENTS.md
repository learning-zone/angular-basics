# Environments support

Stark provides 2 different ways to get environment information depending on your needs:

-   at runtime by importing the environment.ts file
-   at compilation time by checking the global/ambient variables set by Webpack

## Environment information at runtime (environment.ts)

Stark provides the `StarkEnvironment` interface that describes which information you can get from the current environment.
It follows the guidelines described in the Angular CLI Wiki regarding [application environments](https://github.com/angular/angular-cli/wiki/stories-application-environments) and [HMR configuration](https://github.com/angular/angular-cli/wiki/stories-configure-hmr).

Such environment interface is defined as follows:

```typescript
import { NgModuleRef } from "@angular/core";

export interface StarkEnvironment {
	/**
	 * Whether the current environment is production (as described in Angular CLI Wiki)
	 * @link https://github.com/angular/angular-cli/wiki/stories-application-environments
	 */
	production: boolean;
	/**
	 * Whether the current environment has Hot Module Replacement enabled (as described in Angular CLI Wiki)
	 * @link https://github.com/angular/angular-cli/wiki/stories-configure-hmr
	 */
	hmr: boolean;
	/**
	 * Array of providers to be included only in this environment.
	 * For example: you might want to add a detailed logging provider only in development.
	 */
	ENV_PROVIDERS: any[];
	/**
	 * Function to modify/decorate the NgModule Instance created by Angular for a given platform.
	 * Useful to enable/disable some Angular specifics such as the debug tools.
	 * @param moduleRef - NgModule instance created by Angular for a given platform.
	 */
	decorateModule(moduleRef: NgModuleRef<any>): NgModuleRef<any>;
}
```

In your project, the files to define the different environments will be located in `src/environments`:

```txt
|
+---src
|   |
|   +---environments                    # configuration variables for each environment
|   |   |                               #
|   |   |   environment.e2e.prod.ts     # e2e tests configuration
|   |   |   environment.hmr.ts          # development with HMR (Hot Module Replacement) configuration
|   |   |   environment.prod.ts         # production configuration
|   |   \   environment.ts              # development configuration
|   |
|   \   ...
|
\   ...
```

Then in each file, an `environment` constant of type `StarkEnvironment` should be exported providing the values needed for each environment:

```typescript
// environment.prod.ts

import { NgModuleRef } from "@angular/core";
import { StarkEnvironment } from "@nationalbankbelgium/stark-core";

export const environment: StarkEnvironment = {
	production: true,
	hmr: false,
	ENV_PROVIDERS: [ProductionOnlyProvider],

	decorateModule(moduleRef: NgModuleRef<any>): NgModuleRef<any> {
		// perform any module customization needed for this specific environment here
		// and make sure to invoke this function by passing it the NgModule created by Angular
		return moduleRef;
	}
};
```

### How to get environment variables in your application?

All you have to do is to import the `environment.ts` constant anywhere you want in your application.

**You should always import from `environments/environment` because Webpack will internally replace such file with the right environment file as defined in the `fileReplacements` option in the `angular.json` file.**

This way, you will be able to programmatically read the different environment variables you need.
For example, you can determine which providers you will include for a specific environment in your AppModule:

```typescript
import { NgModule } from "@angular/core";
// the environment file should always be imported from this path
import { environment } from "environments/environment";

@NgModule({
	bootstrap: [AppComponent],
	declarations: [AppComponent],
	imports: [...],
	providers: [
		environment.ENV_PROVIDERS,
		...
	]
})
export class AppModule { ... }
```

You can also determine on which environment your app is currently running with this simple check:

```typescript
// the environment file should always be imported from this path
import { environment } from "environments/environment";

// if true, your app is running in production environment
if (environment.production) {
	/* the code in this block will be executed only in production */
}
```

### How to add a new environment?

First, create your new environment.ts file in the `src/environments` folder.

Then, make sure your new environment implements the `StarkEnvironment` interface. For example, the `environment.dummy-env.ts` file:

```typescript
import { NgModuleRef } from "@angular/core";
import { StarkEnvironment } from "@nationalbankbelgium/stark-core";

export const environment: StarkEnvironment = {
	production: false / true,
	hmr: false,
	ENV_PROVIDERS: [],

	decorateModule(moduleRef: NgModuleRef<any>): NgModuleRef<any> {
		// perform any module customization needed for this specific environment here
		// and make sure to invoke this function by passing it the NgModule created by Angular
		return moduleRef;
	}
};
```

Finally, define the file replacement of your new environment in the `angular.json` file so that Webpack can replace the default file `environments/environment` with your new file:

```text
{
    ...
    "dummyEnv": {
        "fileReplacements": [
            {
                "replace": "src/environments/environment.ts",
                "with": "src/environments/environment.dummy-env.ts"
            }
        ]
    }
}
```

### How to add more properties to the environment file?

In case you want to add more properties, you should first create your own interface which should extend the `StarkEnvironment` interface.
For example:

```typescript
import { StarkEnvironment } from "@nationalbankbelgium/stark-core";

export interface YourOwnEnvironment extends StarkEnvironment {
	someProperty: any;
}
```

Then adapt the different environment files to add the new properties:

```typescript
import { NgModuleRef } from "@angular/core";
import { StarkEnvironment } from "@nationalbankbelgium/stark-core";

export const environment: StarkEnvironment = {
	production: false / true,
	hmr: false,
	ENV_PROVIDERS: [],
	someProperty: "some value", // your new property

	decorateModule(moduleRef: NgModuleRef<any>): NgModuleRef<any> {
		// perform any module customization needed for this specific environment here
		// and make sure to invoke this function by passing it the NgModule created by Angular
		return moduleRef;
	}
};
```

## Environment information at compilation time (Webpack global variables)

Thanks to the Webpack [DefinePlugin](https://webpack.js.org/plugins/define-plugin), Stark provides some global variables that are available at compilation time, which means that you can
implement some checks in your code and this will be analyzed when your application bundle is being built by Webpack.

The global variables available at compilation time are the following:

-   `ENV` which indicates the current environment: `"development"` or `"production"`
-   `HMR` which indicates whether the Hot Module Replacement support is enabled (true/false).

### How to get target environment at compilation time?

Since Webpack defines the environment variables as global, you can use them everywhere in your code so you can, for example, determine on which environment your app is currently running
and execute some logic only on that specific environment:

```typescript
// if true, your app is running in development environment
if (ENV === "development") {
	/* the code inside this block will be executed only in development */
}
```

To avoid Typescript compilation issues regarding these global variables, make sure that you include the typings from the stark-build package in your app `tsconfig.json`:

```text
{
    "extends": "./node_modules/@nationalbankbelgium/stark-build/tsconfig.json",
    "compilerOptions": {
        ...
        "typeRoots": [
            "./node_modules/@types",
            "./node_modules/@nationalbankbelgium/stark-build/typings"  // typings from stark-build
        ],
        ...
    },
    ...
}
```

### Why do you need the target environment at compilation time?

Sometimes you might need to add some logic or import some files only when your application is running in development or production.

**In this case, when Webpack builds your application, the final bundle will contain also that code and/or imports that will only be used on a specific environment.
For example, the specific code related to development will never be executed in production and yet it will be included in your production build which will increase the size of your bundle.**

This is why knowing the target environment at compilation time is useful. You can put the logic inside an if block and then such code will be tree-shaken by Webpack as it will recognize it as dead code:

```typescript
// this check is translated to "if (false)" when ENV is "production"
// allowing Webpack to identify it as dead code and so remove it
if (ENV === "development") {
	/* the code inside this block will only be included in development */
}
```
