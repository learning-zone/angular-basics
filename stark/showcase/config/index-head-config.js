/**
 * Configuration for head elements added during the creation of index.html.
 *
 * All href attributes are added the publicPath (if exists) by default.
 * You can explicitly hint to prefix a publicPath by setting a boolean value to a key that has
 * the same name as the attribute you want to operate on, but prefix with =
 *
 * Example:
 * { name: 'msapplication-TileImage', content: '/assets/icon/ms-icon-144x144.png', '=content': true },
 * Will prefix the publicPath to content.
 *
 * { rel: 'apple-touch-icon', sizes: '57x57', href: '/assets/icon/apple-icon-57x57.png', '=href': false },
 * Will not prefix the publicPath on href (href attributes are added by default
 *
 * @link https://github.com/gdi2290/angular-starter/blob/master/config/head-config.common.js
 *
 */
module.exports = {
	link: [
		// <!-- Add to homescreen -->
		{ rel: "manifest", href: "manifest.json" },
		{ rel: "shortcut icon", type: "image/x-icon", href: "favicon.ico" },
		{ rel: "apple-touch-icon", sizes: "57x57", href: "assets/images/app-icons/apple-icon-57x57.png" },
		{ rel: "apple-touch-icon", sizes: "60x60", href: "assets/images/app-icons/apple-icon-60x60.png" },
		{ rel: "apple-touch-icon", sizes: "72x72", href: "assets/images/app-icons/apple-icon-72x72.png" },
		{ rel: "apple-touch-icon", sizes: "76x76", href: "assets/images/app-icons/apple-icon-76x76.png" },
		{ rel: "apple-touch-icon", sizes: "114x114", href: "assets/images/app-icons/apple-icon-114x114.png" },
		{ rel: "apple-touch-icon", sizes: "120x120", href: "assets/images/app-icons/apple-icon-120x120.png" },
		{ rel: "apple-touch-icon", sizes: "144x144", href: "assets/images/app-icons/apple-icon-144x144.png" },
		{ rel: "apple-touch-icon", sizes: "152x152", href: "assets/images/app-icons/apple-icon-152x152.png" },
		{ rel: "apple-touch-icon", sizes: "180x180", href: "assets/images/app-icons/apple-icon-180x180.png" },
		{ rel: "icon", type: "image/png", sizes: "192x192", href: "assets/images/app-icons/android-icon-192x192.png" },
		{ rel: "icon", type: "image/png", sizes: "32x32", href: "assets/images/app-icons/favicon-32x32.png" },
		{ rel: "icon", type: "image/png", sizes: "96x96", href: "assets/images/app-icons/favicon-96x96.png" },
		{ rel: "icon", type: "image/png", sizes: "16x16", href: "assets/images/app-icons/favicon-16x16.png" }
	],
	meta: [
		{ name: "viewport", content: "width=device-width, initial-scale=1" },
		// <!-- Disable tap highlight on IE -->
		{ name: "msapplication-tap-highlight", content: "no" },
		// <!-- Fallback to homescreen for Chrome <39 on Android -->
		{ name: "mobile-web-app-capable", content: "yes" },
		{ name: "application-name", content: "Stark Starter" },
		// <!-- Add to homescreen for Safari on iOS -->
		{ name: "apple-mobile-web-app-capable", content: "yes" },
		{ name: "apple-mobile-web-app-status-bar-style", content: "black" },
		{ name: "apple-mobile-web-app-title", content: "template" },
		// <!-- Reference: https://msdn.microsoft.com/library/dn320426(v=vs.85).aspx -->
		{ name: "msapplication-config", content: "none" },
		{ name: "HandheldFriendly", content: "true" },
		// // <!-- Define the toolbar color (Android): http://updates.html5rocks.com/2014/11/Support-for-theme-color-in-Chrome-39-for-Android -->
		// <!-- You can customize the default -->
		{ name: "theme-color", content: "#0076c8" },
		{ name: "msapplication-TileColor", content: "#0076c8" },
		{ name: "msapplication-TileImage", content: "assets/images/app-icons/ms-icon-144x144.png" }
	]
};
