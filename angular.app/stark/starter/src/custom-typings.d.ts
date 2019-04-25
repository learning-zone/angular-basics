/*
 * Custom Type Definitions
 * When including 3rd party modules you also need to include the type definition for the module
 * if they don't provide one within the module. You can try to install it with @types

npm install @types/node
npm install @types/lodash

 * If you can't find the type definition in the registry we can make an ambient/global definition in
 * this file for now. For example

declare module 'my-module' {
 export function doesSomething(value: string): string;
}

 * If you are using a CommonJS module that is using module.exports then you will have to write your
 * types using export = yourObjectOrFunction with a namespace above it
 * notice how we have to create a namespace that is equal to the function we're
 * assigning the export to

declare module 'jwt-decode' {
  function jwtDecode(token: string): any;
  namespace jwtDecode {}
  export = jwtDecode;
}

 *
 * If you're prototying and you will fix the types later you can also declare it as type any
 *

declare var assert: any;
declare var _: any;
declare var $: any;

 *
 * If you're importing a module that uses Node.js modules which are CommonJS you need to import as
 * in the files such as main.browser.ts or any file within app/
 *

import * as _ from 'lodash'

 * You can include your type definitions in this file until you create one for the @types
 *
 */

// support NodeJS modules without type definitions
declare module "*";

/*
// for legacy tslint etc to understand rename 'modern-lru' with your package
// then comment out `declare module '*';`. For each new module copy/paste
// this method of creating an `any` module type definition
declare module 'modern-lru' {
  let x: any;
  export = x;
}
*/

declare var System: SystemJS;

interface SystemJS {
	import: (path?: string) => Promise<any>;
}

interface GlobalEnvironment {
	ENV: typeof ENV;
	HMR: typeof HMR;
	SystemJS: SystemJS;
	System: SystemJS;
}

type Es6PromiseLoader = (id: string) => (exportName?: string) => Promise<any>;

type FactoryEs6PromiseLoader = () => Es6PromiseLoader;
type FactoryPromise = () => Promise<any>;

interface AsyncRoutes {
	[component: string]: Es6PromiseLoader | Function | FactoryEs6PromiseLoader | FactoryPromise;
}

type IdleCallbacks = Es6PromiseLoader | Function | FactoryEs6PromiseLoader | FactoryPromise;

interface ErrorStackTraceLimit {
	stackTraceLimit: number;
}

// Extend typings
interface ErrorConstructor extends ErrorStackTraceLimit {}
interface NodeRequireFunction extends Es6PromiseLoader {}
interface Global extends GlobalEnvironment {}
