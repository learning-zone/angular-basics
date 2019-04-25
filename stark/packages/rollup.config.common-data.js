"use strict";

// This configuration file contains common values we can reuse in the different rollup configuration files (at least parts of)

const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const sourcemaps = require("rollup-plugin-sourcemaps");

const globals = {
	"@angularclass/hmr": "angularclass.hmr",
	"@angular/cdk": "ng.cdk",
	"@angular/cdk/collections": "ng.cdk.collections",
	"@angular/core": "ng.core",
	"@angular/common": "ng.common",
	"@angular/common/http": "ng.common.http",
	"@angular/forms": "ng.forms",
	"@angular/material": "ngMaterial",
	"@angular/material/button": "ngMaterial.button",
	"@angular/material/button-toggle": "ngMaterial.buttonToggle",
	"@angular/material/checkbox": "ngMaterial.checkbox",
	"@angular/material/core": "ngMaterial.core",
	"@angular/material/dialog": "ngMaterial.dialog",
	"@angular/material/expansion": "ngMaterial.expansion",
	"@angular/material/icon": "ngMaterial.icon",
	"@angular/material/input": "ngMaterial.input",
	"@angular/material/list": "ngMaterial.list",
	"@angular/material/menu": "ngMaterial.menu",
	"@angular/material/paginator": "ngMaterial.paginator",
	"@angular/material/select": "ngMaterial.select",
	"@angular/material/sidenav": "ngMaterial.sidenav",
	"@angular/material/snack-bar": "ngMaterial.snack-bar",
	"@angular/material/sort": "ngMaterial.sort",
	"@angular/material/table": "ngMaterial.table",
	"@angular/material/tooltip": "ngMaterial.tooltip",
	"@angular/material-moment-adapter": "ngMaterialMomentAdapter",
	"@angular/platform-browser": "ng.platformBrowser",
	"@angular/platform-browser/animations": "ng.platformBrowser.animations",
	"@nationalbankbelgium/stark-core": "stark.core",
	"@nationalbankbelgium/stark-ui": "stark.ui",
	"@ngrx/store": "ngrx.store",
	"@ngrx/store-devtools": "ngrx.store.devtools",
	"@ngrx/effects": "ngrx.effects",
	"@ng-idle/core": "ngIdle.core",
	"@ng-idle/keepalive": "ngIdle.keepalive",
	"@ngx-translate/core": "ngxTranslate.core",
	"@uirouter/core": "uirouter.core",
	"@uirouter/angular": "uirouter.angular",
	"class-validator": "class-validator",
	cerialize: "cerialize",
	ibantools: "ibantools",
	moment: "moment",
	nouislider: "nouislider",
	"prettier/standalone": "prettier.standalone",
	"prettier/parser-babylon": "prettier.parserBabylon",
	"prettier/parser-postcss": "prettier.parserPostcss",
	"prettier/parser-typescript": "prettier.parserTypescript",
	"pretty-data": "prettyData",
	prismjs: "Prism",
	"prismjs/components/prism-typescript.min.js": "Prism.languages.typescript",
	"prismjs/components/prism-sql.min.js": "Prism.languages.sql",
	"prismjs/components/prism-json.min.js": "Prism.languages.json",
	"prismjs/components/prism-css-extras.min.js": "Prism.languages.css.selector",
	"prismjs/components/prism-scss.min.js": "Prism.languages.scss",
	uuid: "uuid",

	rxjs: "rxjs",
	"rxjs/operators": "rxjs.operators"

	// TODO add lines such as the one below to make sure that stark modules that depend on other stark modules can find those
	// '@nationalbankbelgium/core': 'stark.core',
};

const plugins = [
	resolve(),
	commonjs(), // converts date-fns to ES modules
	sourcemaps()
];

const output = {
	globals: globals,
	format: "umd", // modules with code should be converted to umd
	exports: "named",
	sourcemap: true
};

exports.output = output;
exports.external = Object.keys(globals);
exports.plugins = plugins;
