# Webpack Customizations

The stark-build package uses several Webpack plugins as well as some utils in order to leverage lots of functionality and customizations to your builds (DEV and PROD).

This is the list of utils and plugins used by the stark-build package:

## Utils

#### Support for custom base URL for assets

Due to the possibility of defining a custom base url in your _index.html_ thanks to the [BaseHrefWebpackPlugin](https://github.com/dzonatan/base-href-webpack-plugin "BaseHrefWebpackPlugin"), it is also necessary to customize the path of the different assets (images, styles, etc.).

To do this, Stark uses the same custom logic implemented in the [@angular-devkit/build-angular](https://github.com/angular/devkit/blob/fe122511feada8d8c554799171e8e43bac950416/packages/angular_devkit/build_angular/src/angular-cli-files/models/webpack-configs/styles.ts "@angular-devkit/build-angular") to append the custom base url and the deploy url so you don't need to worry about the final path for every resource.

The only thing you need to do is to configure the **baseHref** and **deployUrl** options (if needed) in the _angular.json_ file as follows:

```json
{
  ...
  "projects": {
    "yourProjectName": {
      ...
      "architect": {
        "yourTargetName": {
          ...
          "options": {
            ...
            "baseHref": "/some-url",  // default value: "/"
            "deployUrl": "/some-url" // default value: ""
          }
        }
      }
    }
  }
}
```

## Plugins

#### [BaseHrefWebpackPlugin](https://github.com/dzonatan/base-href-webpack-plugin "BaseHrefWebpackPlugin")

Allows to customize the base url in the _index.html_ via the webpack config.

In stark-build, the custom base url provided to this plugin is the one you define in the **baseHref** option of your project's _angular.json_ file:

```json
{
  ...
  "projects": {
    "yourProjectName": {
      ...
      "architect": {
        "yourTargetName": {
          ...
          "options": {
            ...
            "baseHref": "/some-url"  // default value: "/"
          }
        }
      }
    }
  }
}
```

This plugin will automatically add the base tag `<base href="<custom-base-url>">` to the _index.html_ so you don't need to add it manually yourself.

#### [DefinePlugin](https://webpack.js.org/plugins/define-plugin)

Allows to define global variables that will be available during the compilation and building of the application bundles.

In this case, stark-build provides some global variables that are available at compilation time, which means that you can implement some checks in your code and this will be analyzed when your application bundle is being built by Webpack.

The global variables available at compilation time are the following:

-   `ENV` which indicates the current environment: `"development"` or `"production"`
-   `HMR` which indicates whether the Hot Module Replacement support is enabled (true/false).

Since the Define plugin defines those variables as global, you can use them everywhere in your code like this:

```typescript
if (ENV === "development") {
	/* the code inside this block will be executed only in development */
}
```

#### [HtmlElementWebpackPlugin](https://github.com/fulls1z3/html-elements-webpack-plugin "HtmlElementWebpackPlugin")

This webpack plugin appends head elements during the creation of index.html.

To use it, you'll have to create the `index-head-config.js` file to specify the `<link>` and `<meta>` you want to include in the `<head>` section of your index.html.

Create your file at the following location:

```txt
|
+---yourApp
|  	+---config
|	|	index-head-config.js
|   ...
```

Then, declare your file as follows:

```
module.exports = {
	link: [
		{ rel: "manifest", href: "manifest.json" },
		{ rel: "shortcut icon", type: "image/x-icon", href: "favicon.ico" },
		{ rel: "apple-touch-icon", sizes: "120x120", href: "assets/images/app-icons/apple-icon-120x120.png" },
		{ rel: "icon", type: "image/png", sizes: "32x32", href: "assets/images/app-icons/favicon-32x32.png" },
		...
	],
	meta: [
		...
		{ name: "apple-mobile-web-app-capable", content: "yes" },
		{ name: "apple-mobile-web-app-status-bar-style", content: "black" },
		{ name: "apple-mobile-web-app-title", content: "template" },
		{ name: "msapplication-config", content: "none" },
		...
	]
}
```

Finally, to indicate to your index.html file that you want to use this new file,
you will have to add the following lines in your `<head>` section:

```
<head>
...
	<% if (webpackConfig.htmlElements.headTags) { %>
	<%= webpackConfig.htmlElements.headTags %>
	<% } %>
...
</head>
```

_If you do not intend to use this way of working, simply don't create this file and
don't include the check for `webpackConfig.htmlElements.headTags` in the `<head>` section of index.html._
