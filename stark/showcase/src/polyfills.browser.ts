/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/guide/browser-support
 */

/***************************************************************************************************
 * BROWSER POLYFILLS
 *
 * See: https://angular.io/guide/browser-support#optional-browser-features-to-polyfill
 */

/**
 * IE11 requires all of the following polyfills.
 *
 * Polyfill: https://github.com/zloirock/core-js
 */
/* tslint:disable:no-import-side-effect */
import "core-js/es6";
import "core-js/es7/reflect";
import "core-js/stage/4";

/**
 * IE11 and Edge require this to support Server-sent events
 * https://caniuse.com/#feat=eventsource
 *
 * Polyfill: https://github.com/Yaffle/EventSource
 */
import "event-source-polyfill";

/**
 * IE11 requires Element.classList for NgClass support on SVG elements
 * See: https://caniuse.com/#feat=classlist
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
 * https://angular.io/guide/browser-support#classlist
 * Polyfill: https://github.com/eligrey/classList.js
 */
import "eligrey-classlist-js-polyfill";

/**
 * Web Animations polyfill is no longer needed for standard animation support as of Angular 6
 * IMPORTANT: It is only needed in case you use the AnimationBuilder from '@angular/animations' in the application
 *
 * See: https://angular.io/guide/browser-support#optional-browser-features-to-polyfill
 * See: http://caniuse.com/#feat=web-animation
 * Polyfill: https://github.com/web-animations/web-animations-js
 */
// import "web-animations-js";

/***************************************************************************************************
 * Zone JS is required by Angular itself.
 */
// workaround for IE11 before loading zone.ks (see: https://github.com/angular/zone.js/issues/933)
(window as any).__Zone_enable_cross_context_check = true;
import "zone.js/dist/zone";
// async stack traces with zone.js included for dev
// import 'zone.js/dist/long-stack-trace-zone'
/* tslint:enable */

/***************************************************************************************************
 * APPLICATION IMPORTS
 */

/* tslint:disable:no-all-duplicated-branches */
if ("production" === ENV) {
	// Production
} else {
	// Development
}
/* tslint:enable */
