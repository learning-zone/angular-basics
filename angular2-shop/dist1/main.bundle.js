webpackJsonp([3],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	//Nawal
	//# Providers provided by Angular
	var platform_browser_dynamic_1 = __webpack_require__(335);
	//## Platform and Environment
	//
	//** our providers/directives/pipes **
	var browser_1 = __webpack_require__(579);
	var environment_1 = __webpack_require__(582);
	//## App Component
	//
	//** our top level component that holds all of our components **
	var app_1 = __webpack_require__(553);
	// Bootstrap our Angular app with a top level component `App` and inject
	// our Services and Providers into Angular's dependency injection
	var shared_service_1 = __webpack_require__(223);
	var user_service_1 = __webpack_require__(23);
	var ng2_ui_auth_1 = __webpack_require__(439);
	var core_1 = __webpack_require__(27);
	var DEFAULT_POST_HEADER = {
	    'Content-Type': 'application/json'
	};
	var GOOGLE_CLIENT_ID = '******************************.apps.googleusercontent.com';
	var core_2 = __webpack_require__(1);
	function main(initialHmrState) {
	    //alert('dddee');
	    return platform_browser_dynamic_1.bootstrap(app_1.App, browser_1.PROVIDERS.concat(environment_1.ENV_PROVIDERS, browser_1.DIRECTIVES, browser_1.PIPES, app_1.APP_PROVIDERS, app_1.APP_STORES, [
	        shared_service_1.SharedService,
	        user_service_1.UserService,
	        ng2_ui_auth_1.NG2_UI_AUTH_PROVIDERS({ defaultHeaders: DEFAULT_POST_HEADER, providers: { google: { clientId: GOOGLE_CLIENT_ID } } }),
	        core_2.provide(core_1.LazyMapsAPILoaderConfig, {
	            useFactory: function () {
	                var config = new core_1.LazyMapsAPILoaderConfig();
	                config.libraries = ['places'];
	                return config;
	            }
	        })
	    ]))
	        .catch(function (err) { return console.error(err); });
	}
	exports.main = main;
	//## Vendors
	//
	// For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
	// You can also import them in vendors to ensure that they are bundled in one file
	// Also see custom-typings.d.ts as you also need to do `typings install x` where `x` is your module
	//## Hot Module Reload
	//
	// experimental version
	if (false) {
	    // activate hot module reload
	    var ngHmr = require('angular2-hmr');
	    ngHmr.hotModuleReplacement(main, module);
	}
	else {
	    // bootstrap when documetn is ready
	    document.addEventListener('DOMContentLoaded', function () { return main(); });
	}
	

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var http_1 = __webpack_require__(21);
	//This is used as an shared/global class 
	//We create only once instance of this class 
	var UserService = (function () {
	    function UserService(http) {
	        this.http = http;
	        this.urlSignup = '/api/auth/signup';
	        this.urlSignin = '/api/auth/signin';
	        this.urlCart = '/api/cart';
	        this.urlOrder = '/api/order';
	        this.urlUserProfile = '/api/secure/user/profile/';
	        this.profile = { firstName: '' };
	        this.cart = [];
	        this.cartItems = [];
	        this.cartOptions = [];
	    }
	    UserService.prototype.check = function (data) {
	        console.log('in');
	        var headers = new http_1.Headers();
	        headers.append('Content-Type', 'application/json');
	        var r = this.http.post(this.urlSignin, JSON.stringify(data), { headers: headers })
	            .map(function (res) { return res.json(); });
	        console.log('out');
	        return r;
	    };
	    UserService.prototype.verify = function (data) {
	        console.log('in');
	        var headers = new http_1.Headers();
	        headers.append('Content-Type', 'application/json');
	        var r = this.http.post(this.urlSignin, JSON.stringify(data), { headers: headers })
	            .map(function (res) { return res.json(); });
	        console.log('out');
	        return r;
	    };
	    UserService.prototype.create = function (data) {
	        console.log('in');
	        var headers = new http_1.Headers();
	        headers.append('Content-Type', 'application/json');
	        var r = this.http.post(this.urlSignup, JSON.stringify(data), { headers: headers })
	            .map(function (res) { return res.json(); });
	        console.log('out');
	        return r;
	        //return this.http.post(this.url, JSON.stringify(data),
	        //      {headers: headers})
	        //    .map(res => res.json());
	    };
	    UserService.prototype.setLocation = function () {
	        console.log('setting location');
	        var u = this;
	        //Asking for get current location and stroring it  in user service
	        if (window && window.navigator && window.navigator.geolocation) {
	            window.navigator.geolocation.getCurrentPosition(function (position) {
	                console.log('location', position);
	                if (position.coords) {
	                    u.location = position.coords;
	                    u.latitude = position.coords.latitude;
	                    u.longitude = position.coords.longitude;
	                    u.latitude = position.coords.latitude;
	                    u.longitude = position.coords.longitude;
	                }
	            });
	        } // if
	        // return r;
	        //return this.http.post(this.url, JSON.stringify(data),
	        //      {headers: headers})
	        //    .map(res => res.json());
	    };
	    UserService.prototype.postData = function (url, data) {
	        console.log('saving in post data', url, data);
	        console.log('saving in post data', url);
	        var headers = new http_1.Headers();
	        headers.append('Content-Type', 'application/json');
	        var r = this.http.post(url, JSON.stringify(data), { headers: headers })
	            .map(function (res) { return res.json(); });
	        console.log('out');
	        return r;
	    };
	    UserService.prototype.updateProfile = function (data) {
	        this.profile = data;
	        return this.postData(this.urlUserProfile + this.id, data);
	    };
	    UserService.prototype.order = function () {
	        var data = {};
	        data.items = this.cartItems;
	        data.options = this.cartOptions;
	        data.userId = this.id;
	        data.email = this.email;
	        console.log("order data", data);
	        var headers = new http_1.Headers();
	        headers.append('Content-Type', 'application/json');
	        var r = this.http.post(this.urlOrder, JSON.stringify(data), { headers: headers })
	            .map(function (res) { return res.json(); });
	        console.log('out');
	        return r;
	    };
	    UserService.prototype.addToCart = function (data) {
	        this.cartItems.push(data);
	        return this.postData(this.urlCart, data);
	    };
	    UserService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [http_1.Http])
	    ], UserService);
	    return UserService;
	}());
	exports.UserService = UserService;
	

/***/ },
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * angular2-google-maps - Angular 2 components for Google Maps
	 * @version v0.10.0
	 * @link https://github.com/SebastianM/angular2-google-maps#readme
	 * @license MIT
	 */
	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var core_1 = __webpack_require__(1);
	var maps_api_loader_1 = __webpack_require__(147);
	var lazy_maps_api_loader_1 = __webpack_require__(382);
	// main modules
	__export(__webpack_require__(666));
	__export(__webpack_require__(676));
	exports.ANGULAR2_GOOGLE_MAPS_PROVIDERS = [
	    new core_1.Provider(maps_api_loader_1.MapsAPILoader, { useClass: lazy_maps_api_loader_1.LazyMapsAPILoader }),
	];

	

/***/ },
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var http_1 = __webpack_require__(21);
	var ShopService = (function () {
	    function ShopService(http) {
	        this.http = http;
	        this.url = '/api/shop';
	        this.urlMy = '/api/myshop/';
	        this.userId = '';
	    }
	    ShopService.prototype.getMy = function () {
	        return this.http.get(this.urlMy)
	            .map(function (res) { return res.json(); });
	    };
	    ShopService.prototype.getAll = function () {
	        return this.http.get(this.url)
	            .map(function (res) { return res.json(); });
	    };
	    ShopService.prototype.getUserShops = function (userId) {
	        return this.http.get(this.urlMy + "/" + userId)
	            .map(function (res) { return res.json(); });
	    };
	    ShopService.prototype.get = function (id) {
	        return this.http.get(this.url + "/" + id)
	            .map(function (res) { return res.json(); });
	    };
	    ShopService.prototype.create = function (data) {
	        return this.http.post(this.url, JSON.stringify(data), { headers: this.getHeaders() })
	            .map(function (res) { return res.json(); });
	    };
	    ShopService.prototype.delete = function (id) {
	        return this.http.delete(this.url + "/" + id)
	            .map(function (res) { return res.json(); });
	    };
	    ShopService.prototype.getHeaders = function () {
	        var headers = new http_1.Headers();
	        headers.append('Content-Type', 'application/json');
	        return headers;
	    };
	    ShopService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [http_1.Http])
	    ], ShopService);
	    return ShopService;
	}());
	exports.ShopService = ShopService;
	

/***/ },
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var core_1 = __webpack_require__(1);
	var button_1 = __webpack_require__(416);
	var content_1 = __webpack_require__(417);
	var index_1 = __webpack_require__(419);
	var index_2 = __webpack_require__(424);
	var divider_1 = __webpack_require__(425);
	var icon_1 = __webpack_require__(428);
	var ink_1 = __webpack_require__(429);
	var validators_1 = __webpack_require__(427);
	var messages_1 = __webpack_require__(426);
	var list_1 = __webpack_require__(430);
	var peekaboo_1 = __webpack_require__(431);
	var switch_1 = __webpack_require__(433);
	var subheader_1 = __webpack_require__(432);
	var tabs_1 = __webpack_require__(434);
	var media_1 = __webpack_require__(257);
	var viewport_1 = __webpack_require__(113);
	var overlay_1 = __webpack_require__(162);
	var backdrop_1 = __webpack_require__(415);
	__export(__webpack_require__(416));
	__export(__webpack_require__(415));
	__export(__webpack_require__(417));
	__export(__webpack_require__(419));
	__export(__webpack_require__(424));
	__export(__webpack_require__(425));
	__export(__webpack_require__(428));
	__export(__webpack_require__(429));
	__export(__webpack_require__(427));
	__export(__webpack_require__(426));
	__export(__webpack_require__(430));
	__export(__webpack_require__(431));
	__export(__webpack_require__(433));
	__export(__webpack_require__(432));
	__export(__webpack_require__(434));
	__export(__webpack_require__(257));
	__export(__webpack_require__(160));
	__export(__webpack_require__(113));
	__export(__webpack_require__(159));
	exports.MATERIAL_DIRECTIVES = [
	    button_1.MdAnchor, button_1.MdButton,
	    content_1.MdContent,
	    index_1.MdDataTable, index_1.MdDataTableHeaderSelectableRow, index_1.MdDataTableSelectableRow,
	    divider_1.MdDivider,
	    backdrop_1.MdBackdrop,
	    index_2.MdDialog, index_2.MdDialogActions, index_2.MdDialogTitle, index_2.MdDialogPortal,
	    icon_1.MdIcon,
	    ink_1.MdInk,
	    validators_1.MdPatternValidator, validators_1.MdMaxLengthValidator,
	    validators_1.MdMinValueValidator, validators_1.MdMaxValueValidator,
	    validators_1.MdNumberRequiredValidator,
	    messages_1.MdMessage, messages_1.MdMessages,
	    list_1.MdList, list_1.MdListItem,
	    peekaboo_1.MdPeekaboo,
	    subheader_1.MdSubheader,
	    switch_1.MdSwitch,
	    tabs_1.MdTab, tabs_1.MdTabs
	];
	exports.MATERIAL_NODE_PROVIDERS = [
	    core_1.provide(viewport_1.ViewportHelper, { useClass: viewport_1.NodeViewportHelper }),
	    media_1.Media
	].concat(validators_1.INPUT_VALIDATORS);
	exports.MATERIAL_BROWSER_PROVIDERS = exports.MATERIAL_NODE_PROVIDERS.concat([
	    core_1.provide(viewport_1.ViewportHelper, { useClass: viewport_1.BrowserViewportHelper }),
	    core_1.provide(overlay_1.OVERLAY_CONTAINER_TOKEN, { useValue: overlay_1.createOverlayContainer() }),
	]);
	exports.MATERIAL_PROVIDERS = exports.MATERIAL_BROWSER_PROVIDERS;
	

/***/ },
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var http_1 = __webpack_require__(21);
	var ProductService = (function () {
	    function ProductService(http) {
	        this.http = http;
	        this.userId = '';
	        this.url = '/api/product';
	        this.urlMy = '/api/myproduct/';
	        this.urlShopProducts = '/api/shopproducts/';
	    }
	    ProductService.prototype.getMy = function () {
	        return this.http.get(this.urlMy)
	            .map(function (res) { return res.json(); });
	    };
	    ProductService.prototype.getAll = function () {
	        return this.http.get(this.url)
	            .map(function (res) { return res.json(); });
	    };
	    ProductService.prototype.getProductsByShop = function (shopId) {
	        return this.http.get(this.urlShopProducts + shopId)
	            .map(function (res) { return res.json(); });
	    };
	    ProductService.prototype.getUserProducts = function (userId) {
	        return this.http.get(this.urlMy + userId)
	            .map(function (res) { return res.json(); });
	    };
	    ProductService.prototype.getOne = function (id) {
	        return this.http.get(this.url + "/" + id)
	            .map(function (res) { return res.json(); });
	    };
	    ProductService.prototype.create = function (data) {
	        var headers = new http_1.Headers();
	        headers.append('Content-Type', 'application/json');
	        return this.http.post('/api/product', JSON.stringify(data), { headers: headers })
	            .map(function (res) { return res.json(); });
	    };
	    ProductService.prototype.delete = function (id) {
	        return this.http.delete(this.url + "/" + id)
	            .map(function (res) { return res.json(); });
	    };
	    ProductService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [http_1.Http])
	    ], ProductService);
	    return ProductService;
	}());
	exports.ProductService = ProductService;
	

/***/ },
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var ViewportHelper = (function () {
	    function ViewportHelper() {
	    }
	    return ViewportHelper;
	}());
	exports.ViewportHelper = ViewportHelper;
	var BrowserViewportHelper = (function (_super) {
	    __extends(BrowserViewportHelper, _super);
	    function BrowserViewportHelper() {
	        _super.apply(this, arguments);
	    }
	    BrowserViewportHelper.prototype.getDocumentNativeElement = function () {
	        return window.document;
	    };
	    BrowserViewportHelper.prototype.requestFrame = function (fn) {
	        return window.requestAnimationFrame(fn);
	    };
	    BrowserViewportHelper.prototype.matchMedia = function (query) {
	        return window.matchMedia(query);
	    };
	    BrowserViewportHelper.prototype.scrollTop = function () {
	        return window.pageYOffset || document.documentElement.scrollTop;
	    };
	    return BrowserViewportHelper;
	}(ViewportHelper));
	exports.BrowserViewportHelper = BrowserViewportHelper;
	var NodeViewportMediaMatch = (function () {
	    function NodeViewportMediaMatch(matches, media) {
	        if (matches === void 0) { matches = false; }
	        if (media === void 0) { media = ''; }
	        this.matches = matches;
	        this.media = media;
	    }
	    NodeViewportMediaMatch.prototype.addListener = function (listener) {
	    };
	    NodeViewportMediaMatch.prototype.removeListener = function (listener) {
	    };
	    return NodeViewportMediaMatch;
	}());
	exports.NodeViewportMediaMatch = NodeViewportMediaMatch;
	var NodeViewportHelper = (function (_super) {
	    __extends(NodeViewportHelper, _super);
	    function NodeViewportHelper() {
	        _super.apply(this, arguments);
	    }
	    NodeViewportHelper.prototype.getDocumentNativeElement = function () {
	        return {};
	    };
	    NodeViewportHelper.prototype.requestFrame = function (fn) {
	        return process.nextTick(fn);
	    };
	    NodeViewportHelper.prototype.matchMedia = function (query) {
	        return new NodeViewportMediaMatch(false, query);
	    };
	    NodeViewportHelper.prototype.scrollTop = function () {
	        return 0;
	    };
	    return NodeViewportHelper;
	}(ViewportHelper));
	exports.NodeViewportHelper = NodeViewportHelper;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(259)))

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var portal_errors_1 = __webpack_require__(265);
	/**
	 * A `Portal` is something that you want to render somewhere else.
	 * It can be attach to / detached from a `PortalHost`.
	 */
	var Portal = (function () {
	    function Portal() {
	    }
	    /** Attach this portal to a host. */
	    Portal.prototype.attach = function (host) {
	        if (host == null) {
	            throw new portal_errors_1.MdNullPortalHostError();
	        }
	        if (host.hasAttached()) {
	            throw new portal_errors_1.MdPortalAlreadyAttachedError();
	        }
	        this._attachedHost = host;
	        return host.attach(this);
	    };
	    /** Detach this portal from its host */
	    Portal.prototype.detach = function () {
	        var host = this._attachedHost;
	        if (host == null) {
	            throw new portal_errors_1.MdNoPortalAttachedError();
	        }
	        this._attachedHost = null;
	        return host.detach();
	    };
	    Object.defineProperty(Portal.prototype, "isAttached", {
	        /** Whether this portal is attached to a host. */
	        get: function () {
	            return this._attachedHost != null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Sets the PortalHost reference without performing `attach()`. This is used directly by
	     * the PortalHost when it is performing an `attach()` or `detatch()`.
	     */
	    Portal.prototype.setAttachedHost = function (host) {
	        this._attachedHost = host;
	    };
	    return Portal;
	}());
	exports.Portal = Portal;
	/**
	 * A `ComponentPortal` is a portal that instantiates some Component upon attachment.
	 */
	var ComponentPortal = (function (_super) {
	    __extends(ComponentPortal, _super);
	    function ComponentPortal(component, viewContainerRef) {
	        if (viewContainerRef === void 0) { viewContainerRef = null; }
	        _super.call(this);
	        this.component = component;
	        this.viewContainerRef = viewContainerRef;
	    }
	    return ComponentPortal;
	}(Portal));
	exports.ComponentPortal = ComponentPortal;
	/**
	 * A `TemplatePortal` is a portal that represents some embedded template (TemplateRef).
	 */
	var TemplatePortal = (function (_super) {
	    __extends(TemplatePortal, _super);
	    function TemplatePortal(template, viewContainerRef) {
	        _super.call(this);
	        /**
	         * Additional locals for the instantiated embedded view.
	         * These locals can be seen as "exports" for the template, such as how ngFor has
	         * index / event / odd.
	         * See https://angular.io/docs/ts/latest/api/core/EmbeddedViewRef-class.html
	         */
	        this.locals = new Map();
	        this.templateRef = template;
	        this.viewContainerRef = viewContainerRef;
	    }
	    Object.defineProperty(TemplatePortal.prototype, "origin", {
	        get: function () {
	            return this.templateRef.elementRef;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    TemplatePortal.prototype.attach = function (host, locals) {
	        this.locals = locals == null ? new Map() : locals;
	        return _super.prototype.attach.call(this, host);
	    };
	    TemplatePortal.prototype.detach = function () {
	        this.locals = new Map();
	        return _super.prototype.detach.call(this);
	    };
	    return TemplatePortal;
	}(Portal));
	exports.TemplatePortal = TemplatePortal;
	/**
	 * Partial implementation of PortalHost that only deals with attaching either a
	 * ComponentPortal or a TemplatePortal.
	 */
	var BasePortalHost = (function () {
	    function BasePortalHost() {
	        /** Whether this host has already been permanently disposed. */
	        this._isDisposed = false;
	    }
	    /** Whether this host has an attached portal. */
	    BasePortalHost.prototype.hasAttached = function () {
	        return this._attachedPortal != null;
	    };
	    BasePortalHost.prototype.attach = function (portal) {
	        if (portal == null) {
	            throw new portal_errors_1.MdNullPortalError();
	        }
	        if (this.hasAttached()) {
	            throw new portal_errors_1.MdPortalAlreadyAttachedError();
	        }
	        if (this._isDisposed) {
	            throw new portal_errors_1.MdPortalHostAlreadyDisposedError();
	        }
	        if (portal instanceof ComponentPortal) {
	            this._attachedPortal = portal;
	            return this.attachComponentPortal(portal);
	        }
	        else if (portal instanceof TemplatePortal) {
	            this._attachedPortal = portal;
	            return this.attachTemplatePortal(portal);
	        }
	        throw new portal_errors_1.MdUnknownPortalTypeError();
	    };
	    BasePortalHost.prototype.detach = function () {
	        this._attachedPortal.setAttachedHost(null);
	        this._attachedPortal = null;
	        if (this._disposeFn != null) {
	            this._disposeFn();
	            this._disposeFn = null;
	        }
	        return Promise.resolve(null);
	    };
	    BasePortalHost.prototype.dispose = function () {
	        if (this.hasAttached()) {
	            this.detach();
	        }
	        this._isDisposed = true;
	    };
	    BasePortalHost.prototype.setDisposeFn = function (fn) {
	        this._disposeFn = fn;
	    };
	    return BasePortalHost;
	}());
	exports.BasePortalHost = BasePortalHost;
	var portal_directives_1 = __webpack_require__(264);
	exports.PORTAL_DIRECTIVES = portal_directives_1.PORTAL_DIRECTIVES;
	exports.TemplatePortalDirective = portal_directives_1.TemplatePortalDirective;
	exports.PortalHostDirective = portal_directives_1.PortalHostDirective;
	var dom_portal_host_1 = __webpack_require__(263);
	exports.DomPortalHost = dom_portal_host_1.DomPortalHost;
	//# sourceMappingURL=/usr/local/google/home/jelbourn/material2/tmp/broccoli_type_script_compiler-input_base_path-OxHzApZr.tmp/0/core/portal/portal.js.map

/***/ },
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var angular2_hmr_1 = __webpack_require__(679);
	var AppState = (function () {
	    function AppState() {
	        // `HmrState` is used by `HMR` to track the any `state` during reloading
	        this._state = {};
	    }
	    Object.defineProperty(AppState.prototype, "state", {
	        // Already return a `clone` of the current `state`
	        get: function () {
	            return this._state = this._clone(this._state);
	        },
	        // Never allow mutation
	        set: function (value) {
	            throw new Error('Do not mutate the `.state` directly!');
	        },
	        enumerable: true,
	        configurable: true
	    });
	    AppState.prototype.get = function (prop) {
	        // Use our `state` getter for the `clone`
	        var state = this.state;
	        return state[prop] || state;
	    };
	    AppState.prototype.set = function (prop, value) {
	        // Internally mutate our `state`
	        return this._state[prop] = value;
	    };
	    AppState.prototype._clone = function (object) {
	        // Simple object `clone`
	        return JSON.parse(JSON.stringify(object));
	    };
	    __decorate([
	        angular2_hmr_1.HmrState(), 
	        __metadata('design:type', Object)
	    ], AppState.prototype, "_state", void 0);
	    AppState = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], AppState);
	    return AppState;
	}());
	exports.AppState = AppState;
	

/***/ },
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * angular2-google-maps - Angular 2 components for Google Maps
	 * @version v0.10.0
	 * @link https://github.com/SebastianM/angular2-google-maps#readme
	 * @license MIT
	 */
	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(1);
	var Observable_1 = __webpack_require__(378);
	var maps_api_loader_1 = __webpack_require__(147);
	/**
	 * Wrapper class that handles the communication with the Google Maps Javascript
	 * API v3
	 */
	var GoogleMapsAPIWrapper = (function () {
	    function GoogleMapsAPIWrapper(_loader, _zone) {
	        var _this = this;
	        this._loader = _loader;
	        this._zone = _zone;
	        this._map =
	            new Promise(function (resolve) { _this._mapResolver = resolve; });
	    }
	    GoogleMapsAPIWrapper.prototype.createMap = function (el, mapOptions) {
	        var _this = this;
	        return this._loader.load().then(function () {
	            var map = new google.maps.Map(el, mapOptions);
	            _this._mapResolver(map);
	            return;
	        });
	    };
	    GoogleMapsAPIWrapper.prototype.setMapOptions = function (options) {
	        this._map.then(function (m) { m.setOptions(options); });
	    };
	    /**
	     * Creates a google map marker with the map context
	     */
	    GoogleMapsAPIWrapper.prototype.createMarker = function (options) {
	        if (options === void 0) { options = {}; }
	        return this._map.then(function (map) {
	            options.map = map;
	            return new google.maps.Marker(options);
	        });
	    };
	    GoogleMapsAPIWrapper.prototype.createInfoWindow = function (options) {
	        return this._map.then(function () { return new google.maps.InfoWindow(options); });
	    };
	    GoogleMapsAPIWrapper.prototype.subscribeToMapEvent = function (eventName) {
	        var _this = this;
	        return Observable_1.Observable.create(function (observer) {
	            _this._map.then(function (m) {
	                m.addListener(eventName, function (arg) { _this._zone.run(function () { return observer.next(arg); }); });
	            });
	        });
	    };
	    GoogleMapsAPIWrapper.prototype.setCenter = function (latLng) {
	        return this._map.then(function (map) { return map.setCenter(latLng); });
	    };
	    GoogleMapsAPIWrapper.prototype.getZoom = function () { return this._map.then(function (map) { return map.getZoom(); }); };
	    GoogleMapsAPIWrapper.prototype.setZoom = function (zoom) {
	        return this._map.then(function (map) { return map.setZoom(zoom); });
	    };
	    GoogleMapsAPIWrapper.prototype.getCenter = function () {
	        return this._map.then(function (map) { return map.getCenter(); });
	    };
	    GoogleMapsAPIWrapper.prototype.getMap = function () { return this._map; };
	    /**
	     * Triggers the given event name on the map instance.
	     */
	    GoogleMapsAPIWrapper.prototype.triggerMapEvent = function (eventName) {
	        return this._map.then(function (m) { return google.maps.event.trigger(m, eventName); });
	    };
	    GoogleMapsAPIWrapper = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [maps_api_loader_1.MapsAPILoader, core_1.NgZone])
	    ], GoogleMapsAPIWrapper);
	    return GoogleMapsAPIWrapper;
	}());
	exports.GoogleMapsAPIWrapper = GoogleMapsAPIWrapper;

	

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * angular2-google-maps - Angular 2 components for Google Maps
	 * @version v0.10.0
	 * @link https://github.com/SebastianM/angular2-google-maps#readme
	 * @license MIT
	 */
	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(1);
	var MapsAPILoader = (function () {
	    function MapsAPILoader() {
	    }
	    MapsAPILoader = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], MapsAPILoader);
	    return MapsAPILoader;
	}());
	exports.MapsAPILoader = MapsAPILoader;

	

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * angular2-google-maps - Angular 2 components for Google Maps
	 * @version v0.10.0
	 * @link https://github.com/SebastianM/angular2-google-maps#readme
	 * @license MIT
	 */
	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(1);
	var Observable_1 = __webpack_require__(378);
	var google_maps_api_wrapper_1 = __webpack_require__(146);
	var MarkerManager = (function () {
	    function MarkerManager(_mapsWrapper, _zone) {
	        this._mapsWrapper = _mapsWrapper;
	        this._zone = _zone;
	        this._markers = new Map();
	    }
	    MarkerManager.prototype.deleteMarker = function (marker) {
	        var _this = this;
	        var m = this._markers.get(marker);
	        if (m == null) {
	            // marker already deleted
	            return Promise.resolve();
	        }
	        return m.then(function (m) {
	            return _this._zone.run(function () {
	                m.setMap(null);
	                _this._markers.delete(marker);
	            });
	        });
	    };
	    MarkerManager.prototype.updateMarkerPosition = function (marker) {
	        return this._markers.get(marker).then(function (m) { return m.setPosition({ lat: marker.latitude, lng: marker.longitude }); });
	    };
	    MarkerManager.prototype.updateTitle = function (marker) {
	        return this._markers.get(marker).then(function (m) { return m.setTitle(marker.title); });
	    };
	    MarkerManager.prototype.updateLabel = function (marker) {
	        return this._markers.get(marker).then(function (m) { m.setLabel(marker.label); });
	    };
	    MarkerManager.prototype.updateDraggable = function (marker) {
	        return this._markers.get(marker).then(function (m) { return m.setDraggable(marker.draggable); });
	    };
	    MarkerManager.prototype.updateIcon = function (marker) {
	        return this._markers.get(marker).then(function (m) { return m.setIcon(marker.iconUrl); });
	    };
	    MarkerManager.prototype.addMarker = function (marker) {
	        var markerPromise = this._mapsWrapper.createMarker({
	            position: { lat: marker.latitude, lng: marker.longitude },
	            label: marker.label,
	            draggable: marker.draggable,
	            icon: marker.iconUrl
	        });
	        this._markers.set(marker, markerPromise);
	    };
	    MarkerManager.prototype.getNativeMarker = function (marker) {
	        return this._markers.get(marker);
	    };
	    MarkerManager.prototype.createEventObservable = function (eventName, marker) {
	        var _this = this;
	        return Observable_1.Observable.create(function (observer) {
	            _this._markers.get(marker).then(function (m) {
	                m.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
	            });
	        });
	    };
	    MarkerManager = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [google_maps_api_wrapper_1.GoogleMapsAPIWrapper, core_1.NgZone])
	    ], MarkerManager);
	    return MarkerManager;
	}());
	exports.MarkerManager = MarkerManager;

	

/***/ },
/* 149 */
/***/ function(module, exports) {

	"use strict";
	var OpaqueToken = (function () {
	    function OpaqueToken(_desc) {
	        this._desc = _desc;
	    }
	    OpaqueToken.prototype.toString = function () { return "Token " + this._desc; };
	    return OpaqueToken;
	}());
	exports.OpaqueToken = OpaqueToken;
	exports.HMR_STATE = new OpaqueToken('hmrState');
	var HmrStore = (function () {
	    function HmrStore() {
	    }
	    HmrStore.set = function (prop, value) {
	        HmrStore._state[prop] = value;
	        return HmrStore._state[prop];
	    };
	    HmrStore.get = function (prop) {
	        return HmrStore._state[prop];
	    };
	    HmrStore.select = function (name, getState) {
	        HmrStore._states.push({ name: name, getState: getState });
	        var defaultData = getState();
	        var currentData = HmrStore.get(name);
	        if (defaultData && !currentData) {
	            return HmrStore.set(name, defaultData);
	        }
	        else if (defaultData && currentData) {
	            return HmrStore.set(name, Object.assign({}, defaultData, currentData));
	        }
	        else {
	            return HmrStore.set(name, currentData || defaultData);
	        }
	    };
	    HmrStore.dispose = function () {
	        HmrStore._states = [];
	        HmrStore._state = {};
	        HmrStore._initialValues = {};
	    };
	    HmrStore.getState = function () {
	        var initialState = Object.assign({}, HmrStore._state);
	        return HmrStore._states
	            .reduce(function (memo, item) {
	            memo[item.name] = item.getState();
	            return memo;
	        }, initialState);
	    };
	    HmrStore.toJSON = function () {
	        return HmrStore.getState();
	    };
	    HmrStore.dev = false;
	    HmrStore._state = {};
	    HmrStore._initialValues = {};
	    HmrStore._states = [];
	    return HmrStore;
	}());
	exports.HmrStore = HmrStore;
	

/***/ },
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */
/***/ function(module, exports) {

	"use strict";
	var Animate = (function () {
	    function Animate() {
	    }
	    Animate.enter = function (el, cssClass) {
	        el.classList.remove(cssClass);
	        return new Promise(function (resolve) {
	            el.classList.add(cssClass + '-add');
	            setTimeout(function () {
	                var duration = Animate.getTransitionDuration(el, true);
	                var removeListener = function () { return done(false); };
	                var callTimeout = setTimeout(function () { return done(true); }, duration);
	                var done = function (timeout) {
	                    if (!removeListener) {
	                        return;
	                    }
	                    el.classList.remove(cssClass + '-add-active');
	                    el.classList.remove(cssClass + '-add');
	                    if (!timeout) {
	                        clearTimeout(callTimeout);
	                    }
	                    el.removeEventListener(Animate.TRANSITION_EVENT, removeListener);
	                    removeListener = null;
	                    resolve();
	                };
	                el.addEventListener(Animate.TRANSITION_EVENT, removeListener);
	                el.classList.add(cssClass + '-add-active');
	                el.classList.add(cssClass);
	            }, 1);
	        });
	    };
	    Animate.leave = function (el, cssClass) {
	        return new Promise(function (resolve) {
	            el.classList.add(cssClass + '-remove');
	            setTimeout(function () {
	                var duration = Animate.getTransitionDuration(el, true);
	                var callTimeout = setTimeout(function () { return done(true); }, duration);
	                var removeListener = function () { return done(false); };
	                var done = function (timeout) {
	                    if (!removeListener) {
	                        return;
	                    }
	                    el.classList.remove(cssClass + '-remove-active');
	                    el.classList.remove(cssClass + '-remove');
	                    if (!timeout) {
	                        clearTimeout(callTimeout);
	                    }
	                    el.removeEventListener(Animate.TRANSITION_EVENT, removeListener);
	                    removeListener = null;
	                    resolve();
	                };
	                el.addEventListener(Animate.TRANSITION_EVENT, removeListener);
	                el.classList.add(cssClass + '-remove-active');
	                el.classList.remove(cssClass);
	            }, 1);
	        });
	    };
	    Animate.getTransitionDuration = function (element, includeDelay) {
	        if (includeDelay === void 0) { includeDelay = false; }
	        var prefixes = ['', 'moz', 'webkit', 'ms', 'o', 'khtml'];
	        var style = window.getComputedStyle(element);
	        for (var i = 0; i < prefixes.length; i++) {
	            var durationProperty = (i === 0 ? '' : "-" + prefixes[i] + "-") + "transition-duration";
	            var duration = style[durationProperty];
	            if (!duration) {
	                continue;
	            }
	            duration = (duration.indexOf('ms') > -1) ? parseFloat(duration) : parseFloat(duration) * 1000;
	            if (duration === 0) {
	                continue;
	            }
	            if (includeDelay) {
	                var delayProperty = (i === 0 ? '' : "-" + prefixes[i] + "-") + "transition-delay";
	                var delay = style[delayProperty];
	                if (typeof delay !== 'undefined') {
	                    duration += (delay.indexOf('ms') > -1) ? parseFloat(delay) : parseFloat(delay) * 1000;
	                }
	            }
	            return duration;
	        }
	        return -1;
	    };
	    Animate.setTransitionDuration = function (element, delayMs) {
	        element.style['transition-duration'] = delayMs + "ms";
	    };
	    Animate.whichTransitionEvent = function () {
	        if (typeof document === 'undefined') {
	            return 'transitionend';
	        }
	        var t;
	        var el = document.createElement('fakeelement');
	        var transitions = {
	            'transition': 'transitionend',
	            'OTransition': 'oTransitionEnd',
	            'MozTransition': 'transitionend',
	            'WebkitTransition': 'webkitTransitionEnd'
	        };
	        for (t in transitions) {
	            if (el.style[t] !== undefined) {
	                return transitions[t];
	            }
	        }
	    };
	    Animate.animateStyles = function (element, styles, durationMs) {
	        var saveDuration = Animate.getTransitionDuration(element);
	        Animate.setTransitionDuration(element, durationMs);
	        return new Promise(function (animResolve, animReject) {
	            var callTimeout = setTimeout(function () { return done(true); }, durationMs);
	            var removeListener = function () { return done(false); };
	            var done = function (timeout) {
	                if (!removeListener) {
	                    return;
	                }
	                if (timeout) {
	                    clearTimeout(callTimeout);
	                }
	                element.removeEventListener(Animate.TRANSITION_EVENT, removeListener);
	                removeListener = null;
	                if (saveDuration !== -1) {
	                    Animate.setTransitionDuration(element, saveDuration);
	                }
	                else {
	                    element.style['transition-duration'] = null;
	                }
	                animResolve();
	            };
	            element.addEventListener(Animate.TRANSITION_EVENT, removeListener);
	            Object.keys(styles).forEach(function (key) {
	                element.style[key] = "" + styles[key];
	            });
	        });
	    };
	    Animate.setStyles = function (element, styles) {
	        var saveDuration = Animate.getTransitionDuration(element);
	        Animate.setTransitionDuration(element, 0);
	        return new Promise(function (resolve, reject) {
	            Object.keys(styles).forEach(function (key) {
	                element.style[key] = "" + styles[key];
	            });
	            if (saveDuration !== -1) {
	                Animate.setTransitionDuration(element, saveDuration);
	            }
	            else {
	                element.style['transition-duration'] = null;
	            }
	            resolve();
	        });
	    };
	    Animate.wait = function (milliseconds) {
	        if (milliseconds === void 0) { milliseconds = 10; }
	        return new Promise(function (resolve) {
	            setTimeout(function () { return resolve(); }, milliseconds);
	        });
	    };
	    Animate.TRANSITION_EVENT = Animate.whichTransitionEvent();
	    return Animate;
	}());
	exports.Animate = Animate;
	

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var animate_1 = __webpack_require__(159);
	var Ink = (function () {
	    function Ink() {
	    }
	    Ink.canApply = function (element) {
	        return !element.hasAttribute('md-no-ink');
	    };
	    Ink.getSize = function (fit, width, height) {
	        return fit
	            ? Math.max(width, height)
	            : Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
	    };
	    Ink.ripple = function (element, left, top) {
	        var fit = !!element.getAttribute('md-fab');
	        var container = element.querySelector('.md-ripple-container');
	        if (!container) {
	            container = document.createElement('div');
	            container.classList.add('md-ripple-container');
	            element.appendChild(container);
	        }
	        var ripple = document.createElement('div');
	        ripple.classList.add('md-ripple');
	        var getInitialStyles = function () {
	            var color = window.getComputedStyle(element).color || 'rgb(0,0,0)';
	            var size = Ink.getSize(fit, element.clientWidth, element.clientHeight);
	            return {
	                'background-color': color,
	                left: left + "px",
	                top: top + "px",
	                width: size + "px",
	                height: size + "px"
	            };
	        };
	        return animate_1.Animate.setStyles(ripple, getInitialStyles())
	            .then(function () { return container.appendChild(ripple); })
	            .then(function () { return ripple.classList.add('md-ripple-placed'); })
	            .then(function () { return animate_1.Animate.wait(); })
	            .then(function () { return ripple.classList.add('md-ripple-scaled'); })
	            .then(function () { return ripple.classList.add('md-ripple-active'); })
	            .then(function () { return animate_1.Animate.wait(450); })
	            .then(function () { return ripple.classList.remove('md-ripple-active'); })
	            .then(function () { return animate_1.Animate.wait(650); })
	            .then(function () { return container.removeChild(ripple); });
	    };
	    Ink.rippleEvent = function (element, event) {
	        var rippleX = event.offsetX;
	        var rippleY = event.offsetY;
	        if (element !== event.srcElement) {
	            var rect = element.getBoundingClientRect();
	            rippleX = event.clientX - rect.left;
	            rippleY = event.clientY - rect.top;
	        }
	        return Ink.ripple(element, rippleX, rippleY);
	    };
	    return Ink;
	}());
	exports.Ink = Ink;
	

/***/ },
/* 161 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * OverlayState is a bag of values for either the initial configuration or current state of an
	 * overlay.
	 */
	var OverlayState = (function () {
	    function OverlayState() {
	    }
	    return OverlayState;
	}());
	exports.OverlayState = OverlayState;
	//# sourceMappingURL=/usr/local/google/home/jelbourn/material2/tmp/broccoli_type_script_compiler-input_base_path-OxHzApZr.tmp/0/core/overlay/overlay-state.js.map

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(1);
	var overlay_state_1 = __webpack_require__(161);
	var dom_portal_host_1 = __webpack_require__(263);
	var overlay_ref_1 = __webpack_require__(260);
	var overlay_position_builder_1 = __webpack_require__(453);
	var viewport_ruler_1 = __webpack_require__(262);
	/** Token used to inject the DOM element that serves as the overlay container. */
	exports.OVERLAY_CONTAINER_TOKEN = new core_1.OpaqueToken('overlayContainer');
	/** Next overlay unique ID. */
	var nextUniqueId = 0;
	/** The default state for newly created overlays. */
	var defaultState = new overlay_state_1.OverlayState();
	/**
	 * Service to create Overlays. Overlays are dynamically added pieces of floating UI, meant to be
	 * used as a low-level building building block for other components. Dialogs, tooltips, menus,
	 * selects, etc. can all be built using overlays. The service should primarily be used by authors
	 * of re-usable components rather than developers building end-user applications.
	 *
	 * An overlay *is* a PortalHost, so any kind of Portal can be loaded into one.
	 */
	var Overlay = (function () {
	    function Overlay(_overlayContainerElement, _componentResolver, _positionBuilder) {
	        this._overlayContainerElement = _overlayContainerElement;
	        this._componentResolver = _componentResolver;
	        this._positionBuilder = _positionBuilder;
	    }
	    /**
	     * Creates an overlay.
	     * @param state State to apply to the overlay.
	     * @returns A reference to the created overlay.
	     */
	    Overlay.prototype.create = function (state) {
	        var _this = this;
	        if (state === void 0) { state = defaultState; }
	        return this._createPaneElement().then(function (pane) { return _this._createOverlayRef(pane, state); });
	    };
	    /**
	     * Returns a position builder that can be used, via fluent API,
	     * to construct and configure a position strategy.
	     */
	    Overlay.prototype.position = function () {
	        return this._positionBuilder;
	    };
	    /**
	     * Creates the DOM element for an overlay and appends it to the overlay container.
	     * @returns Promise resolving to the created element.
	     */
	    Overlay.prototype._createPaneElement = function () {
	        var pane = document.createElement('div');
	        pane.id = "md-overlay-" + nextUniqueId++;
	        pane.classList.add('md-overlay-pane');
	        this._overlayContainerElement.appendChild(pane);
	        return Promise.resolve(pane);
	    };
	    /**
	     * Create a DomPortalHost into which the overlay content can be loaded.
	     * @param pane The DOM element to turn into a portal host.
	     * @returns A portal host for the given DOM element.
	     */
	    Overlay.prototype._createPortalHost = function (pane) {
	        return new dom_portal_host_1.DomPortalHost(pane, this._componentResolver);
	    };
	    /**
	     * Creates an OverlayRef for an overlay in the given DOM element.
	     * @param pane DOM element for the overlay
	     * @param state
	     * @returns {OverlayRef}
	     */
	    Overlay.prototype._createOverlayRef = function (pane, state) {
	        return new overlay_ref_1.OverlayRef(this._createPortalHost(pane), pane, state);
	    };
	    Overlay = __decorate([
	        core_1.Injectable(),
	        __param(0, core_1.Inject(exports.OVERLAY_CONTAINER_TOKEN)), 
	        __metadata('design:paramtypes', [HTMLElement, core_1.ComponentResolver, overlay_position_builder_1.OverlayPositionBuilder])
	    ], Overlay);
	    return Overlay;
	}());
	exports.Overlay = Overlay;
	/** Providers for Overlay and its related injectables. */
	exports.OVERLAY_PROVIDERS = [
	    viewport_ruler_1.ViewportRuler,
	    overlay_position_builder_1.OverlayPositionBuilder,
	    Overlay,
	];
	// Re-export overlay-related modules so they can be imported directly from here.
	var overlay_state_2 = __webpack_require__(161);
	exports.OverlayState = overlay_state_2.OverlayState;
	var overlay_ref_2 = __webpack_require__(260);
	exports.OverlayRef = overlay_ref_2.OverlayRef;
	var overlay_container_1 = __webpack_require__(449);
	exports.createOverlayContainer = overlay_container_1.createOverlayContainer;
	var overlay_directives_1 = __webpack_require__(450);
	exports.OVERLAY_DIRECTIVES = overlay_directives_1.OVERLAY_DIRECTIVES;
	exports.ConnectedOverlayDirective = overlay_directives_1.ConnectedOverlayDirective;
	exports.OverlayOrigin = overlay_directives_1.OverlayOrigin;
	//# sourceMappingURL=/usr/local/google/home/jelbourn/material2/tmp/broccoli_type_script_compiler-input_base_path-OxHzApZr.tmp/0/core/overlay/overlay.js.map

/***/ },
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	//auth.service.ts
	"use strict";
	var core_1 = __webpack_require__(1);
	var SharedService = (function () {
	    //public data ={};
	    function SharedService() {
	        //alert('ggg');
	        this.userId = 'ffffff';
	    }
	    SharedService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], SharedService);
	    return SharedService;
	}());
	exports.SharedService = SharedService;
	

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(834)();
	// imports


	// module
	exports.push([module.id, "/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */\n/**\n * 1. Set default font family to sans-serif.\n * 2. Prevent iOS and IE text size adjust after device orientation change,\n *    without disabling user zoom.\n */\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  -ms-text-size-adjust: 100%;\n  /* 2 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */ }\n\n/**\n * Remove default margin.\n */\nbody {\n  margin: 0; }\n\n/* HTML5 display definitions\n   ========================================================================== */\n/**\n * Correct `block` display not defined for any HTML5 element in IE 8/9.\n * Correct `block` display not defined for `details` or `summary` in IE 10/11\n * and Firefox.\n * Correct `block` display not defined for `main` in IE 11.\n */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  display: block; }\n\n/**\n * 1. Correct `inline-block` display not defined in IE 8/9.\n * 2. Normalize vertical alignment of `progress` in Chrome, Firefox, and Opera.\n */\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */ }\n\n/**\n * Prevent modern browsers from displaying `audio` without controls.\n * Remove excess height in iOS 5 devices.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\n/**\n * Address `[hidden]` styling not present in IE 8/9/10.\n * Hide the `template` element in IE 8/9/10/11, Safari, and Firefox < 22.\n */\n[hidden],\ntemplate {\n  display: none; }\n\n/* Links\n   ========================================================================== */\n/**\n * Remove the gray background color from active links in IE 10.\n */\na {\n  background-color: transparent; }\n\n/**\n * Improve readability of focused elements when they are also in an\n * active/hover state.\n */\na:active,\na:hover {\n  outline: 0; }\n\n/* Text-level semantics\n   ========================================================================== */\n/**\n * Address styling not present in IE 8/9/10/11, Safari, and Chrome.\n */\nabbr[title] {\n  border-bottom: 1px dotted; }\n\n/**\n * Address style set to `bolder` in Firefox 4+, Safari, and Chrome.\n */\nb,\nstrong {\n  font-weight: bold; }\n\n/**\n * Address styling not present in Safari and Chrome.\n */\ndfn {\n  font-style: italic; }\n\n/**\n * Address variable `h1` font-size and margin within `section` and `article`\n * contexts in Firefox 4+, Safari, and Chrome.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\n/**\n * Address styling not present in IE 8/9.\n */\nmark {\n  background: #ff0;\n  color: #000; }\n\n/**\n * Address inconsistent and variable font size in all browsers.\n */\nsmall {\n  font-size: 80%; }\n\n/**\n * Prevent `sub` and `sup` affecting `line-height` in all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsup {\n  top: -0.5em; }\n\nsub {\n  bottom: -0.25em; }\n\n/* Embedded content\n   ========================================================================== */\n/**\n * Remove border when inside `a` element in IE 8/9/10.\n */\nimg {\n  border: 0; }\n\n/**\n * Correct overflow not hidden in IE 9/10/11.\n */\nsvg:not(:root) {\n  overflow: hidden; }\n\n/* Grouping content\n   ========================================================================== */\n/**\n * Address margin not present in IE 8/9 and Safari.\n */\nfigure {\n  margin: 1em 40px; }\n\n/**\n * Address differences between Firefox and other browsers.\n */\nhr {\n  box-sizing: content-box;\n  height: 0; }\n\n/**\n * Contain overflow in all browsers.\n */\npre {\n  overflow: auto; }\n\n/**\n * Address odd `em`-unit font size rendering in all browsers.\n */\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em; }\n\n/* Forms\n   ========================================================================== */\n/**\n * Known limitation: by default, Chrome and Safari on OS X allow very limited\n * styling of `select`, unless a `border` property is set.\n */\n/**\n * 1. Correct color not being inherited.\n *    Known issue: affects color of disabled elements.\n * 2. Correct font properties not being inherited.\n * 3. Address margins set differently in Firefox 4+, Safari, and Chrome.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n  margin: 0;\n  /* 3 */ }\n\n/**\n * Address `overflow` set to `hidden` in IE 8/9/10/11.\n */\nbutton {\n  overflow: visible; }\n\n/**\n * Address inconsistent `text-transform` inheritance for `button` and `select`.\n * All other form control elements do not inherit `text-transform` values.\n * Correct `button` style inheritance in Firefox, IE 8/9/10/11, and Opera.\n * Correct `select` style inheritance in Firefox.\n */\nbutton,\nselect {\n  text-transform: none; }\n\n/**\n * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`\n *    and `video` controls.\n * 2. Correct inability to style clickable `input` types in iOS.\n * 3. Improve usability and consistency of cursor style between image-type\n *    `input` and others.\n */\nbutton,\nhtml input[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n  cursor: pointer;\n  /* 3 */ }\n\n/**\n * Re-set default cursor for disabled elements.\n */\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default; }\n\n/**\n * Remove inner padding and border in Firefox 4+.\n */\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0; }\n\n/**\n * Address Firefox 4+ setting `line-height` on `input` using `!important` in\n * the UA stylesheet.\n */\ninput {\n  line-height: normal; }\n\n/**\n * It's recommended that you don't attempt to style these elements.\n * Firefox's implementation doesn't respect box-sizing, padding, or width.\n *\n * 1. Address box sizing set to `content-box` in IE 8/9/10.\n * 2. Remove excess padding in IE 8/9/10.\n */\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */ }\n\n/**\n * Fix the cursor style for Chrome's increment/decrement buttons. For certain\n * `font-size` values of the `input`, it causes the cursor style of the\n * decrement button to change from `default` to `text`.\n */\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\n/**\n * 1. Address `appearance` set to `searchfield` in Safari and Chrome.\n * 2. Address `box-sizing` set to `border-box` in Safari and Chrome.\n */\ninput[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  box-sizing: content-box;\n  /* 2 */ }\n\n/**\n * Remove inner padding and search cancel button in Safari and Chrome on OS X.\n * Safari (but not Chrome) clips the cancel button when the search input has\n * padding (and `textfield` appearance).\n */\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\n/**\n * Define consistent border, margin, and padding.\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em; }\n\n/**\n * 1. Correct `color` not being inherited in IE 8/9/10/11.\n * 2. Remove padding so people aren't caught out if they zero out fieldsets.\n */\nlegend {\n  border: 0;\n  /* 1 */\n  padding: 0;\n  /* 2 */ }\n\n/**\n * Remove default vertical scrollbar in IE 8/9/10/11.\n */\ntextarea {\n  overflow: auto; }\n\n/**\n * Don't inherit the `font-weight` (applied by a rule above).\n * NOTE: the default cannot safely be changed in Chrome and Safari on OS X.\n */\noptgroup {\n  font-weight: bold; }\n\n/* Tables\n   ========================================================================== */\n/**\n * Remove most spacing between table cells.\n */\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\ntd,\nth {\n  padding: 0; }\n\nhtml,\nbody {\n  height: 100%;\n  background: #F4FAFA; }\n\nbody {\n  margin: 0; }\n\nmd-card {\n  margin: 25px; }\n\n/**\n * Set up a decent box model on the root element\n */\nhtml {\n  box-sizing: border-box; }\n\n/**\n * Make all elements from the DOM inherit from the parent box-sizing\n * Since `*` has a specificity of 0, it does not override the `html` value\n * making all elements inheriting from the root box-sizing value\n * See: https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/\n */\n*, *::before, *::after {\n  box-sizing: inherit; }\n\n/**\n * Basic styles for links\n */\na {\n  color: #e50050;\n  text-decoration: none; }\n  a:hover, a:active, a:focus {\n    color: #222222;\n    text-decoration: underline; }\n\n/**\n * Basic typography style for copy text\n */\nbody {\n  color: #222222;\n  font: normal 125%/1.4 \"Open Sans\", \"Helvetica Neue Light\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", sans-serif; }\n\n/**\n * Clear inner floats\n */\n.clearfix::after {\n  clear: both;\n  content: '';\n  display: table; }\n\n/**\n * Main content containers\n * 1. Make the container full-width with a maximum width\n * 2. Center it in the viewport\n * 3. Leave some space on the edges, especially valuable on small screens\n */\n.container {\n  max-width: 1180px;\n  /* 1 */\n  margin-left: auto;\n  /* 2 */\n  margin-right: auto;\n  /* 2 */\n  padding-left: 20px;\n  /* 3 */\n  padding-right: 20px;\n  /* 3 */\n  width: 100%;\n  /* 1 */ }\n\n/**\n * Hide text while making it readable for screen readers\n * 1. Needed in WebKit-based browsers because of an implementation bug;\n *    See: https://code.google.com/p/chromium/issues/detail?id=457146\n */\n.hide-text {\n  overflow: hidden;\n  padding: 0;\n  /* 1 */\n  text-indent: 101%;\n  white-space: nowrap; }\n\n/**\n * Hide element while making it readable for screen readers\n * Shamelessly borrowed from HTML5Boilerplate:\n * https://github.com/h5bp/html5-boilerplate/blob/master/src/css/main.css#L119-L133\n */\n.visually-hidden {\n  border: 0;\n  clip: rect(0 0 0 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px; }\n\n/*\nmd-toolbar ul {\n  display: inline;\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n  width: 60px;\n}\n\nmd-toolbar li {\n  display: inline;\n}\n\nmd-toolbar li.active {\n  background-color: lightgray;\n}\n*/\nfooter {\n  flex: 0 0 60px;\n  padding: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #fff; }\n\nbutton.active {\n  background: #fff;\n  color: #009688; }\n\nbutton.active:hover {\n  color: #fff; }\n\n.fill {\n  flex: 1 1 auto; }\n\n.app-state {\n  margin: 15px;\n  flex: 1;\n  max-height: 9.969rem; }\n\n.home {\n  flex: 1; }\n\nmd-content {\n  display: flex;\n  flex-direction: column;\n  height: 100%; }\n\n.card-container {\n  display: flex;\n  flex-direction: column;\n  margin: 15px;\n  border: 2px dashed #FBC02D; }\n\n.sample-content {\n  flex: 1; }\n\n.card-container md-card {\n  margin: 5px; }\n\n/**\n * Mixin that creates a new stacking context.\n * see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context\n */\nhtml, body {\n  height: 100%;\n  color: rgba(0, 0, 0, 0.87);\n  background: white;\n  position: relative; }\n\nbody {\n  margin: 0;\n  padding: 0; }\n\n[tabindex='-1']:focus {\n  outline: none; }\n\n.inset {\n  padding: 10px; }\n\nbutton.md-no-style {\n  font-weight: normal;\n  background-color: inherit;\n  text-align: left;\n  border: none;\n  padding: 0;\n  margin: 0; }\n\nselect,\nbutton,\ntextarea,\ninput {\n  vertical-align: baseline; }\n\ninput[type=\"reset\"],\ninput[type=\"submit\"],\nhtml input[type=\"button\"],\nbutton {\n  cursor: pointer;\n  -webkit-appearance: button; }\n  input[type=\"reset\"][disabled],\n  input[type=\"submit\"][disabled],\n  html input[type=\"button\"][disabled],\n  button[disabled] {\n    cursor: default; }\n\ntextarea {\n  vertical-align: top;\n  overflow: auto; }\n\ninput[type=\"search\"] {\n  -webkit-appearance: textfield;\n  box-sizing: content-box;\n  -webkit-box-sizing: content-box; }\n  input[type=\"search\"]::-webkit-search-decoration, input[type=\"search\"]::-webkit-search-cancel-button {\n    -webkit-appearance: none; }\n\n.md-visually-hidden {\n  border: 0;\n  clip: rect(0 0 0 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  text-transform: none;\n  width: 1px; }\n\n.md-shadow {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  border-radius: inherit;\n  pointer-events: none; }\n\n.md-shadow-bottom-z-1 {\n  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26); }\n\n.md-shadow-bottom-z-2 {\n  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4); }\n\n.md-shadow-animated.md-shadow {\n  transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1); }\n\n/*\n * A container inside of a rippling element (eg a button),\n * which contains all of the individual ripples\n */\n.md-ripple-container {\n  pointer-events: none;\n  position: absolute;\n  overflow: hidden;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%; }\n\n/*\n * A container inside of a rippling element (eg a button),\n * which contains all of the individual ripples\n */\n.md-ripple-container {\n  pointer-events: none;\n  position: absolute;\n  overflow: hidden;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  transition: all 0.55s cubic-bezier(0.25, 0.8, 0.25, 1); }\n\n.md-ripple {\n  position: absolute;\n  transform: translate(-50%, -50%) scale(0);\n  transform-origin: 50% 50%;\n  opacity: 0;\n  border-radius: 50%; }\n  .md-ripple.md-ripple-placed {\n    transition: margin 0.9s cubic-bezier(0.25, 0.8, 0.25, 1), border 0.9s cubic-bezier(0.25, 0.8, 0.25, 1), width 0.9s cubic-bezier(0.25, 0.8, 0.25, 1), height 0.9s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.9s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.9s cubic-bezier(0.25, 0.8, 0.25, 1); }\n  .md-ripple.md-ripple-scaled {\n    transform: translate(-50%, -50%) scale(1); }\n  .md-ripple.md-ripple-active, .md-ripple.md-ripple-full, .md-ripple.md-ripple-visible {\n    opacity: 0.20; }\n\n.md-padding {\n  padding: 8px; }\n\n.md-margin {\n  margin: 8px; }\n\n.md-scroll-mask {\n  position: absolute;\n  background-color: transparent;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0; }\n  .md-scroll-mask > .md-scroll-mask-bar {\n    display: block;\n    position: absolute;\n    background-color: #fafafa;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    z-index: 65;\n    box-shadow: inset 0px 0px 1px rgba(0, 0, 0, 0.3); }\n\n.md-no-select {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n\n@media (min-width: 600px) {\n  .md-padding {\n    padding: 16px; } }\n\nhtml, body {\n  -webkit-tap-highlight-color: transparent;\n  -webkit-touch-callout: none;\n  min-height: 100%;\n  -webkit-text-size-adjust: 100%;\n  -ms-text-size-adjust: 100%;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n/************\n * Headings\n ************/\n.md-display-4 {\n  font-size: 112px;\n  font-weight: 300;\n  letter-spacing: -0.010em;\n  line-height: 112px; }\n\n.md-display-3 {\n  font-size: 56px;\n  font-weight: 400;\n  letter-spacing: -0.005em;\n  line-height: 56px; }\n\n.md-display-2 {\n  font-size: 45px;\n  font-weight: 400;\n  line-height: 64px; }\n\n.md-display-1 {\n  font-size: 34px;\n  font-weight: 400;\n  line-height: 40px; }\n\n.md-headline, .md-dialog md-dialog-title {\n  font-size: 24px;\n  font-weight: 400;\n  line-height: 32px; }\n\n.md-title {\n  font-size: 20px;\n  font-weight: 500;\n  letter-spacing: 0.005em; }\n\n.md-subhead {\n  font-size: 16px;\n  font-weight: 400;\n  letter-spacing: 0.010em;\n  line-height: 24px; }\n\n/************\n * Body Copy\n ************/\n.md-body-1 {\n  font-size: 14px;\n  font-weight: 400;\n  letter-spacing: 0.010em;\n  line-height: 20px; }\n\n.md-body-2 {\n  font-size: 14px;\n  font-weight: 500;\n  letter-spacing: 0.010em;\n  line-height: 24px; }\n\n.md-caption {\n  font-size: 12px;\n  letter-spacing: 0.020em; }\n\n.md-button {\n  letter-spacing: 0.010em; }\n\n/************\n * Defaults\n ************/\nbutton,\nselect,\nhtml,\ntextarea,\ninput {\n  font-family: RobotoDraft, Roboto, \"Helvetica Neue\", sans-serif; }\n\nselect,\nbutton,\ntextarea,\ninput {\n  font-size: 100%; }\n\n/*\n*\n*  Responsive attributes\n*\n*  References:\n*  1) https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties#flex\n*  2) https://css-tricks.com/almanac/properties/f/flex/\n*  3) https://css-tricks.com/snippets/css/a-guide-to-flexbox/\n*  4) https://github.com/philipwalton/flexbugs#3-min-height-on-a-flex-container-wont-apply-to-its-flex-items\n*  5) http://godban.com.ua/projects/flexgrid\n*\n*/\n@-moz-document url-prefix() {\n  [layout-fill] {\n    margin: 0;\n    width: 100%;\n    min-height: 100%;\n    height: 100%; } }\n\n/*\n *  Apply Mixins to create Layout/Flexbox styles\n *\n */\n[flex-order] {\n  order: 0; }\n\n[flex-order=\"-20\"] {\n  order: -20; }\n\n[flex-order=\"-19\"] {\n  order: -19; }\n\n[flex-order=\"-18\"] {\n  order: -18; }\n\n[flex-order=\"-17\"] {\n  order: -17; }\n\n[flex-order=\"-16\"] {\n  order: -16; }\n\n[flex-order=\"-15\"] {\n  order: -15; }\n\n[flex-order=\"-14\"] {\n  order: -14; }\n\n[flex-order=\"-13\"] {\n  order: -13; }\n\n[flex-order=\"-12\"] {\n  order: -12; }\n\n[flex-order=\"-11\"] {\n  order: -11; }\n\n[flex-order=\"-10\"] {\n  order: -10; }\n\n[flex-order=\"-9\"] {\n  order: -9; }\n\n[flex-order=\"-8\"] {\n  order: -8; }\n\n[flex-order=\"-7\"] {\n  order: -7; }\n\n[flex-order=\"-6\"] {\n  order: -6; }\n\n[flex-order=\"-5\"] {\n  order: -5; }\n\n[flex-order=\"-4\"] {\n  order: -4; }\n\n[flex-order=\"-3\"] {\n  order: -3; }\n\n[flex-order=\"-2\"] {\n  order: -2; }\n\n[flex-order=\"-1\"] {\n  order: -1; }\n\n[flex-order=\"0\"] {\n  order: 0; }\n\n[flex-order=\"1\"] {\n  order: 1; }\n\n[flex-order=\"2\"] {\n  order: 2; }\n\n[flex-order=\"3\"] {\n  order: 3; }\n\n[flex-order=\"4\"] {\n  order: 4; }\n\n[flex-order=\"5\"] {\n  order: 5; }\n\n[flex-order=\"6\"] {\n  order: 6; }\n\n[flex-order=\"7\"] {\n  order: 7; }\n\n[flex-order=\"8\"] {\n  order: 8; }\n\n[flex-order=\"9\"] {\n  order: 9; }\n\n[flex-order=\"10\"] {\n  order: 10; }\n\n[flex-order=\"11\"] {\n  order: 11; }\n\n[flex-order=\"12\"] {\n  order: 12; }\n\n[flex-order=\"13\"] {\n  order: 13; }\n\n[flex-order=\"14\"] {\n  order: 14; }\n\n[flex-order=\"15\"] {\n  order: 15; }\n\n[flex-order=\"16\"] {\n  order: 16; }\n\n[flex-order=\"17\"] {\n  order: 17; }\n\n[flex-order=\"18\"] {\n  order: 18; }\n\n[flex-order=\"19\"] {\n  order: 19; }\n\n[flex-order=\"20\"] {\n  order: 20; }\n\n[flex-offset=\"0\"] {\n  margin-left: 0%; }\n\n[flex-offset=\"5\"] {\n  margin-left: 5%; }\n\n[flex-offset=\"10\"] {\n  margin-left: 10%; }\n\n[flex-offset=\"15\"] {\n  margin-left: 15%; }\n\n[flex-offset=\"20\"] {\n  margin-left: 20%; }\n\n[flex-offset=\"25\"] {\n  margin-left: 25%; }\n\n[flex-offset=\"30\"] {\n  margin-left: 30%; }\n\n[flex-offset=\"35\"] {\n  margin-left: 35%; }\n\n[flex-offset=\"40\"] {\n  margin-left: 40%; }\n\n[flex-offset=\"45\"] {\n  margin-left: 45%; }\n\n[flex-offset=\"50\"] {\n  margin-left: 50%; }\n\n[flex-offset=\"55\"] {\n  margin-left: 55%; }\n\n[flex-offset=\"60\"] {\n  margin-left: 60%; }\n\n[flex-offset=\"65\"] {\n  margin-left: 65%; }\n\n[flex-offset=\"70\"] {\n  margin-left: 70%; }\n\n[flex-offset=\"75\"] {\n  margin-left: 75%; }\n\n[flex-offset=\"80\"] {\n  margin-left: 80%; }\n\n[flex-offset=\"85\"] {\n  margin-left: 85%; }\n\n[flex-offset=\"90\"] {\n  margin-left: 90%; }\n\n[flex-offset=\"95\"] {\n  margin-left: 95%; }\n\n[flex-offset=\"33\"] {\n  margin-left: calc(100% / 3); }\n\n[flex-offset=\"66\"] {\n  margin-left: calc(200% / 3); }\n\n[layout-align],\n[layout-align=\"start stretch\"] {\n  justify-content: flex-start;\n  align-content: stretch;\n  align-items: stretch; }\n\n[layout-align=\"start\"],\n[layout-align=\"start start\"],\n[layout-align=\"start center\"],\n[layout-align=\"start end\"],\n[layout-align=\"start stretch\"] {\n  justify-content: start; }\n\n[layout-align=\"center\"],\n[layout-align=\"center start\"],\n[layout-align=\"center center\"],\n[layout-align=\"center end\"],\n[layout-align=\"center stretch\"] {\n  justify-content: center; }\n\n[layout-align=\"end\"],\n[layout-align=\"end center\"],\n[layout-align=\"end start\"],\n[layout-align=\"end end\"],\n[layout-align=\"end stretch\"] {\n  justify-content: flex-end; }\n\n[layout-align=\"space-around\"],\n[layout-align=\"space-around center\"],\n[layout-align=\"space-around start\"],\n[layout-align=\"space-around end\"],\n[layout-align=\"space-around stretch\"] {\n  justify-content: space-around; }\n\n[layout-align=\"space-between\"],\n[layout-align=\"space-between center\"],\n[layout-align=\"space-between start\"],\n[layout-align=\"space-between end\"],\n[layout-align=\"space-between stretch\"] {\n  justify-content: space-between; }\n\n[layout-align=\"start start\"],\n[layout-align=\"center start\"],\n[layout-align=\"end start\"],\n[layout-align=\"space-between start\"],\n[layout-align=\"space-around start\"] {\n  align-items: flex-start;\n  align-content: flex-start; }\n\n[layout-align=\"start center\"],\n[layout-align=\"center center\"],\n[layout-align=\"end center\"],\n[layout-align=\"space-between center\"],\n[layout-align=\"space-around center\"] {\n  align-items: center;\n  align-content: center;\n  max-width: 100%; }\n\n[layout-align=\"start center\"] > *,\n[layout-align=\"center center\"] > *,\n[layout-align=\"end center\"] > *,\n[layout-align=\"space-between center\"] > *,\n[layout-align=\"space-around center\"] > * {\n  max-width: 100%;\n  box-sizing: border-box; }\n\n[layout-align=\"start end\"],\n[layout-align=\"center end\"],\n[layout-align=\"end end\"],\n[layout-align=\"space-between end\"],\n[layout-align=\"space-around end\"] {\n  align-items: flex-end;\n  align-content: flex-end; }\n\n[layout-align=\"start stretch\"],\n[layout-align=\"center stretch\"],\n[layout-align=\"end stretch\"],\n[layout-align=\"space-between stretch\"],\n[layout-align=\"space-around stretch\"] {\n  align-items: stretch;\n  align-content: stretch; }\n\n[flex] {\n  flex: 1;\n  box-sizing: border-box; }\n\n@media screen\\0 {\n  [flex] {\n    flex: 1 1 0%; } }\n\n[flex-grow] {\n  flex: 1 1 100%;\n  box-sizing: border-box; }\n\n[flex-initial] {\n  flex: 0 1 auto;\n  box-sizing: border-box; }\n\n[flex-auto] {\n  flex: 1 1 auto;\n  box-sizing: border-box; }\n\n[flex-none] {\n  flex: 0 0 auto;\n  box-sizing: border-box; }\n\n[flex-noshrink] {\n  flex: 1 0 auto;\n  box-sizing: border-box; }\n\n[flex-nogrow] {\n  flex: 0 1 auto;\n  box-sizing: border-box; }\n\n[flex=\"0\"] {\n  flex: 1 1 0%;\n  max-width: 0%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"row\"] > [flex=\"0\"],\n[layout=\"row\"] > [flex=\"0\"] {\n  flex: 1 1 0%;\n  max-width: 0%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"column\"] > [flex=\"0\"],\n[layout=\"column\"] > [flex=\"0\"] {\n  flex: 1 1 0%;\n  max-width: 100%;\n  max-height: 0%;\n  box-sizing: border-box; }\n\n[flex=\"5\"] {\n  flex: 1 1 5%;\n  max-width: 5%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"row\"] > [flex=\"5\"],\n[layout=\"row\"] > [flex=\"5\"] {\n  flex: 1 1 5%;\n  max-width: 5%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"column\"] > [flex=\"5\"],\n[layout=\"column\"] > [flex=\"5\"] {\n  flex: 1 1 5%;\n  max-width: 100%;\n  max-height: 5%;\n  box-sizing: border-box; }\n\n[flex=\"10\"] {\n  flex: 1 1 10%;\n  max-width: 10%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"row\"] > [flex=\"10\"],\n[layout=\"row\"] > [flex=\"10\"] {\n  flex: 1 1 10%;\n  max-width: 10%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"column\"] > [flex=\"10\"],\n[layout=\"column\"] > [flex=\"10\"] {\n  flex: 1 1 10%;\n  max-width: 100%;\n  max-height: 10%;\n  box-sizing: border-box; }\n\n[flex=\"15\"] {\n  flex: 1 1 15%;\n  max-width: 15%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"row\"] > [flex=\"15\"],\n[layout=\"row\"] > [flex=\"15\"] {\n  flex: 1 1 15%;\n  max-width: 15%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"column\"] > [flex=\"15\"],\n[layout=\"column\"] > [flex=\"15\"] {\n  flex: 1 1 15%;\n  max-width: 100%;\n  max-height: 15%;\n  box-sizing: border-box; }\n\n[flex=\"20\"] {\n  flex: 1 1 20%;\n  max-width: 20%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"row\"] > [flex=\"20\"],\n[layout=\"row\"] > [flex=\"20\"] {\n  flex: 1 1 20%;\n  max-width: 20%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"column\"] > [flex=\"20\"],\n[layout=\"column\"] > [flex=\"20\"] {\n  flex: 1 1 20%;\n  max-width: 100%;\n  max-height: 20%;\n  box-sizing: border-box; }\n\n[flex=\"25\"] {\n  flex: 1 1 25%;\n  max-width: 25%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"row\"] > [flex=\"25\"],\n[layout=\"row\"] > [flex=\"25\"] {\n  flex: 1 1 25%;\n  max-width: 25%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"column\"] > [flex=\"25\"],\n[layout=\"column\"] > [flex=\"25\"] {\n  flex: 1 1 25%;\n  max-width: 100%;\n  max-height: 25%;\n  box-sizing: border-box; }\n\n[flex=\"30\"] {\n  flex: 1 1 30%;\n  max-width: 30%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"row\"] > [flex=\"30\"],\n[layout=\"row\"] > [flex=\"30\"] {\n  flex: 1 1 30%;\n  max-width: 30%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"column\"] > [flex=\"30\"],\n[layout=\"column\"] > [flex=\"30\"] {\n  flex: 1 1 30%;\n  max-width: 100%;\n  max-height: 30%;\n  box-sizing: border-box; }\n\n[flex=\"35\"] {\n  flex: 1 1 35%;\n  max-width: 35%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"row\"] > [flex=\"35\"],\n[layout=\"row\"] > [flex=\"35\"] {\n  flex: 1 1 35%;\n  max-width: 35%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"column\"] > [flex=\"35\"],\n[layout=\"column\"] > [flex=\"35\"] {\n  flex: 1 1 35%;\n  max-width: 100%;\n  max-height: 35%;\n  box-sizing: border-box; }\n\n[flex=\"40\"] {\n  flex: 1 1 40%;\n  max-width: 40%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"row\"] > [flex=\"40\"],\n[layout=\"row\"] > [flex=\"40\"] {\n  flex: 1 1 40%;\n  max-width: 40%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"column\"] > [flex=\"40\"],\n[layout=\"column\"] > [flex=\"40\"] {\n  flex: 1 1 40%;\n  max-width: 100%;\n  max-height: 40%;\n  box-sizing: border-box; }\n\n[flex=\"45\"] {\n  flex: 1 1 45%;\n  max-width: 45%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"row\"] > [flex=\"45\"],\n[layout=\"row\"] > [flex=\"45\"] {\n  flex: 1 1 45%;\n  max-width: 45%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"column\"] > [flex=\"45\"],\n[layout=\"column\"] > [flex=\"45\"] {\n  flex: 1 1 45%;\n  max-width: 100%;\n  max-height: 45%;\n  box-sizing: border-box; }\n\n[flex=\"50\"] {\n  flex: 1 1 50%;\n  max-width: 50%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"row\"] > [flex=\"50\"],\n[layout=\"row\"] > [flex=\"50\"] {\n  flex: 1 1 50%;\n  max-width: 50%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"column\"] > [flex=\"50\"],\n[layout=\"column\"] > [flex=\"50\"] {\n  flex: 1 1 50%;\n  max-width: 100%;\n  max-height: 50%;\n  box-sizing: border-box; }\n\n[flex=\"55\"] {\n  flex: 1 1 55%;\n  max-width: 55%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"row\"] > [flex=\"55\"],\n[layout=\"row\"] > [flex=\"55\"] {\n  flex: 1 1 55%;\n  max-width: 55%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"column\"] > [flex=\"55\"],\n[layout=\"column\"] > [flex=\"55\"] {\n  flex: 1 1 55%;\n  max-width: 100%;\n  max-height: 55%;\n  box-sizing: border-box; }\n\n[flex=\"60\"] {\n  flex: 1 1 60%;\n  max-width: 60%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"row\"] > [flex=\"60\"],\n[layout=\"row\"] > [flex=\"60\"] {\n  flex: 1 1 60%;\n  max-width: 60%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"column\"] > [flex=\"60\"],\n[layout=\"column\"] > [flex=\"60\"] {\n  flex: 1 1 60%;\n  max-width: 100%;\n  max-height: 60%;\n  box-sizing: border-box; }\n\n[flex=\"65\"] {\n  flex: 1 1 65%;\n  max-width: 65%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"row\"] > [flex=\"65\"],\n[layout=\"row\"] > [flex=\"65\"] {\n  flex: 1 1 65%;\n  max-width: 65%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"column\"] > [flex=\"65\"],\n[layout=\"column\"] > [flex=\"65\"] {\n  flex: 1 1 65%;\n  max-width: 100%;\n  max-height: 65%;\n  box-sizing: border-box; }\n\n[flex=\"70\"] {\n  flex: 1 1 70%;\n  max-width: 70%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"row\"] > [flex=\"70\"],\n[layout=\"row\"] > [flex=\"70\"] {\n  flex: 1 1 70%;\n  max-width: 70%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"column\"] > [flex=\"70\"],\n[layout=\"column\"] > [flex=\"70\"] {\n  flex: 1 1 70%;\n  max-width: 100%;\n  max-height: 70%;\n  box-sizing: border-box; }\n\n[flex=\"75\"] {\n  flex: 1 1 75%;\n  max-width: 75%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"row\"] > [flex=\"75\"],\n[layout=\"row\"] > [flex=\"75\"] {\n  flex: 1 1 75%;\n  max-width: 75%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"column\"] > [flex=\"75\"],\n[layout=\"column\"] > [flex=\"75\"] {\n  flex: 1 1 75%;\n  max-width: 100%;\n  max-height: 75%;\n  box-sizing: border-box; }\n\n[flex=\"80\"] {\n  flex: 1 1 80%;\n  max-width: 80%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"row\"] > [flex=\"80\"],\n[layout=\"row\"] > [flex=\"80\"] {\n  flex: 1 1 80%;\n  max-width: 80%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"column\"] > [flex=\"80\"],\n[layout=\"column\"] > [flex=\"80\"] {\n  flex: 1 1 80%;\n  max-width: 100%;\n  max-height: 80%;\n  box-sizing: border-box; }\n\n[flex=\"85\"] {\n  flex: 1 1 85%;\n  max-width: 85%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"row\"] > [flex=\"85\"],\n[layout=\"row\"] > [flex=\"85\"] {\n  flex: 1 1 85%;\n  max-width: 85%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"column\"] > [flex=\"85\"],\n[layout=\"column\"] > [flex=\"85\"] {\n  flex: 1 1 85%;\n  max-width: 100%;\n  max-height: 85%;\n  box-sizing: border-box; }\n\n[flex=\"90\"] {\n  flex: 1 1 90%;\n  max-width: 90%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"row\"] > [flex=\"90\"],\n[layout=\"row\"] > [flex=\"90\"] {\n  flex: 1 1 90%;\n  max-width: 90%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"column\"] > [flex=\"90\"],\n[layout=\"column\"] > [flex=\"90\"] {\n  flex: 1 1 90%;\n  max-width: 100%;\n  max-height: 90%;\n  box-sizing: border-box; }\n\n[flex=\"95\"] {\n  flex: 1 1 95%;\n  max-width: 95%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"row\"] > [flex=\"95\"],\n[layout=\"row\"] > [flex=\"95\"] {\n  flex: 1 1 95%;\n  max-width: 95%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"column\"] > [flex=\"95\"],\n[layout=\"column\"] > [flex=\"95\"] {\n  flex: 1 1 95%;\n  max-width: 100%;\n  max-height: 95%;\n  box-sizing: border-box; }\n\n[flex=\"100\"] {\n  flex: 1 1 100%;\n  max-width: 100%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"row\"] > [flex=\"100\"],\n[layout=\"row\"] > [flex=\"100\"] {\n  flex: 1 1 100%;\n  max-width: 100%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"column\"] > [flex=\"100\"],\n[layout=\"column\"] > [flex=\"100\"] {\n  flex: 1 1 100%;\n  max-width: 100%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"row\"] > [flex=\"33\"], [layout=\"row\"] > [flex=\"33\"], [layout=\"row\"] > [flex=\"33\"], [layout=\"row\"] > [flex=\"33\"] {\n  flex: 1 1 33%;\n  max-width: calc(100% / 3);\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"row\"] > [flex=\"34\"], [layout=\"row\"] > [flex=\"34\"], [layout=\"row\"] > [flex=\"34\"], [layout=\"row\"] > [flex=\"34\"] {\n  flex: 1 1 34%;\n  max-width: 34%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"row\"] > [flex=\"66\"], [layout=\"row\"] > [flex=\"66\"], [layout=\"row\"] > [flex=\"66\"], [layout=\"row\"] > [flex=\"66\"] {\n  flex: 1 1 66%;\n  max-width: calc(200% / 3);\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"row\"] > [flex=\"67\"], [layout=\"row\"] > [flex=\"67\"], [layout=\"row\"] > [flex=\"67\"], [layout=\"row\"] > [flex=\"67\"] {\n  flex: 1 1 67%;\n  max-width: 67%;\n  max-height: 100%;\n  box-sizing: border-box; }\n\n[layout=\"column\"] > [flex=\"33\"], [layout=\"column\"] > [flex=\"33\"], [layout=\"column\"] > [flex=\"33\"], [layout=\"column\"] > [flex=\"33\"] {\n  flex: 1 1 33%;\n  max-width: 100%;\n  max-height: calc(100% / 3);\n  box-sizing: border-box; }\n\n[layout=\"column\"] > [flex=\"34\"], [layout=\"column\"] > [flex=\"34\"], [layout=\"column\"] > [flex=\"34\"], [layout=\"column\"] > [flex=\"34\"] {\n  flex: 1 1 34%;\n  max-width: 100%;\n  max-height: 34%;\n  box-sizing: border-box; }\n\n[layout=\"column\"] > [flex=\"66\"], [layout=\"column\"] > [flex=\"66\"], [layout=\"column\"] > [flex=\"66\"], [layout=\"column\"] > [flex=\"66\"] {\n  flex: 1 1 66%;\n  max-width: 100%;\n  max-height: calc(200% / 3);\n  box-sizing: border-box; }\n\n[layout=\"column\"] > [flex=\"67\"], [layout=\"column\"] > [flex=\"67\"], [layout=\"column\"] > [flex=\"67\"], [layout=\"column\"] > [flex=\"67\"] {\n  flex: 1 1 67%;\n  max-width: 100%;\n  max-height: 67%;\n  box-sizing: border-box; }\n\n[layout], [layout=\"column\"], [layout=\"row\"] {\n  box-sizing: border-box;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex; }\n\n[layout=\"column\"] {\n  flex-direction: column; }\n\n[layout=\"row\"] {\n  flex-direction: row; }\n\n[layout-padding] > [flex-sm], [layout-padding] > [flex-lt-md] {\n  padding: 4px; }\n\n[layout-padding],\n[layout-padding] > [flex],\n[layout-padding] > [flex-gt-sm],\n[layout-padding] > [flex-md],\n[layout-padding] > [flex-lt-lg] {\n  padding: 8px; }\n\n[layout-padding] > [flex-gt-md],\n[layout-padding] > [flex-lg] {\n  padding: 16px; }\n\n[layout-margin] > [flex-sm],\n[layout-margin] > [flex-lt-md] {\n  margin: 4px; }\n\n[layout-margin],\n[layout-margin] > [flex],\n[layout-margin] > [flex-gt-sm],\n[layout-margin] > [flex-md],\n[layout-margin] > [flex-lt-lg] {\n  margin: 8px; }\n\n[layout-margin] > [flex-gt-md],\n[layout-margin] > [flex-lg] {\n  margin: 16px; }\n\n[layout-wrap] {\n  flex-wrap: wrap; }\n\n[layout-nowrap] {\n  flex-wrap: nowrap; }\n\n[layout-fill] {\n  margin: 0;\n  width: 100%;\n  min-height: 100%;\n  height: 100%; }\n\n/**\n * `hide-gt-sm show-gt-lg` should hide from 600px to 1200px\n * `show-md hide-gt-sm` should show from 0px to 960px and hide at >960px\n * `hide-gt-md show-gt-sm` should show everywhere (show overrides hide)`\n *\n *  hide means hide everywhere\n *  Sizes:\n *         $layout-breakpoint-xs:     600px !default;\n *         $layout-breakpoint-sm:     960px !default;\n *         $layout-breakpoint-md:     1280px !default;\n *         $layout-breakpoint-lg:     1920px !default;\n */\n@media (max-width: 599px) {\n  [hide-xs]:not([show-xs]):not([show]), [hide]:not([show-xs]):not([show]) {\n    display: none; }\n  [flex-order-xs=\"-20\"] {\n    order: -20; }\n  [flex-order-xs=\"-19\"] {\n    order: -19; }\n  [flex-order-xs=\"-18\"] {\n    order: -18; }\n  [flex-order-xs=\"-17\"] {\n    order: -17; }\n  [flex-order-xs=\"-16\"] {\n    order: -16; }\n  [flex-order-xs=\"-15\"] {\n    order: -15; }\n  [flex-order-xs=\"-14\"] {\n    order: -14; }\n  [flex-order-xs=\"-13\"] {\n    order: -13; }\n  [flex-order-xs=\"-12\"] {\n    order: -12; }\n  [flex-order-xs=\"-11\"] {\n    order: -11; }\n  [flex-order-xs=\"-10\"] {\n    order: -10; }\n  [flex-order-xs=\"-9\"] {\n    order: -9; }\n  [flex-order-xs=\"-8\"] {\n    order: -8; }\n  [flex-order-xs=\"-7\"] {\n    order: -7; }\n  [flex-order-xs=\"-6\"] {\n    order: -6; }\n  [flex-order-xs=\"-5\"] {\n    order: -5; }\n  [flex-order-xs=\"-4\"] {\n    order: -4; }\n  [flex-order-xs=\"-3\"] {\n    order: -3; }\n  [flex-order-xs=\"-2\"] {\n    order: -2; }\n  [flex-order-xs=\"-1\"] {\n    order: -1; }\n  [flex-order-xs=\"0\"] {\n    order: 0; }\n  [flex-order-xs=\"1\"] {\n    order: 1; }\n  [flex-order-xs=\"2\"] {\n    order: 2; }\n  [flex-order-xs=\"3\"] {\n    order: 3; }\n  [flex-order-xs=\"4\"] {\n    order: 4; }\n  [flex-order-xs=\"5\"] {\n    order: 5; }\n  [flex-order-xs=\"6\"] {\n    order: 6; }\n  [flex-order-xs=\"7\"] {\n    order: 7; }\n  [flex-order-xs=\"8\"] {\n    order: 8; }\n  [flex-order-xs=\"9\"] {\n    order: 9; }\n  [flex-order-xs=\"10\"] {\n    order: 10; }\n  [flex-order-xs=\"11\"] {\n    order: 11; }\n  [flex-order-xs=\"12\"] {\n    order: 12; }\n  [flex-order-xs=\"13\"] {\n    order: 13; }\n  [flex-order-xs=\"14\"] {\n    order: 14; }\n  [flex-order-xs=\"15\"] {\n    order: 15; }\n  [flex-order-xs=\"16\"] {\n    order: 16; }\n  [flex-order-xs=\"17\"] {\n    order: 17; }\n  [flex-order-xs=\"18\"] {\n    order: 18; }\n  [flex-order-xs=\"19\"] {\n    order: 19; }\n  [flex-order-xs=\"20\"] {\n    order: 20; }\n  [flex-offset-xs=\"0\"] {\n    margin-left: 0%; }\n  [flex-offset-xs=\"5\"] {\n    margin-left: 5%; }\n  [flex-offset-xs=\"10\"] {\n    margin-left: 10%; }\n  [flex-offset-xs=\"15\"] {\n    margin-left: 15%; }\n  [flex-offset-xs=\"20\"] {\n    margin-left: 20%; }\n  [flex-offset-xs=\"25\"] {\n    margin-left: 25%; }\n  [flex-offset-xs=\"30\"] {\n    margin-left: 30%; }\n  [flex-offset-xs=\"35\"] {\n    margin-left: 35%; }\n  [flex-offset-xs=\"40\"] {\n    margin-left: 40%; }\n  [flex-offset-xs=\"45\"] {\n    margin-left: 45%; }\n  [flex-offset-xs=\"50\"] {\n    margin-left: 50%; }\n  [flex-offset-xs=\"55\"] {\n    margin-left: 55%; }\n  [flex-offset-xs=\"60\"] {\n    margin-left: 60%; }\n  [flex-offset-xs=\"65\"] {\n    margin-left: 65%; }\n  [flex-offset-xs=\"70\"] {\n    margin-left: 70%; }\n  [flex-offset-xs=\"75\"] {\n    margin-left: 75%; }\n  [flex-offset-xs=\"80\"] {\n    margin-left: 80%; }\n  [flex-offset-xs=\"85\"] {\n    margin-left: 85%; }\n  [flex-offset-xs=\"90\"] {\n    margin-left: 90%; }\n  [flex-offset-xs=\"95\"] {\n    margin-left: 95%; }\n  [flex-offset-xs=\"33\"] {\n    margin-left: calc(100% / 3); }\n  [flex-offset-xs=\"66\"] {\n    margin-left: calc(200% / 3); }\n  [layout-align-xs],\n  [layout-align-xs=\"start stretch\"] {\n    justify-content: flex-start;\n    align-content: stretch;\n    align-items: stretch; }\n  [layout-align-xs=\"start\"],\n  [layout-align-xs=\"start start\"],\n  [layout-align-xs=\"start center\"],\n  [layout-align-xs=\"start end\"],\n  [layout-align-xs=\"start stretch\"] {\n    justify-content: start; }\n  [layout-align-xs=\"center\"],\n  [layout-align-xs=\"center start\"],\n  [layout-align-xs=\"center center\"],\n  [layout-align-xs=\"center end\"],\n  [layout-align-xs=\"center stretch\"] {\n    justify-content: center; }\n  [layout-align-xs=\"end\"],\n  [layout-align-xs=\"end center\"],\n  [layout-align-xs=\"end start\"],\n  [layout-align-xs=\"end end\"],\n  [layout-align-xs=\"end stretch\"] {\n    justify-content: flex-end; }\n  [layout-align-xs=\"space-around\"],\n  [layout-align-xs=\"space-around center\"],\n  [layout-align-xs=\"space-around start\"],\n  [layout-align-xs=\"space-around end\"],\n  [layout-align-xs=\"space-around stretch\"] {\n    justify-content: space-around; }\n  [layout-align-xs=\"space-between\"],\n  [layout-align-xs=\"space-between center\"],\n  [layout-align-xs=\"space-between start\"],\n  [layout-align-xs=\"space-between end\"],\n  [layout-align-xs=\"space-between stretch\"] {\n    justify-content: space-between; }\n  [layout-align-xs=\"start start\"],\n  [layout-align-xs=\"center start\"],\n  [layout-align-xs=\"end start\"],\n  [layout-align-xs=\"space-between start\"],\n  [layout-align-xs=\"space-around start\"] {\n    align-items: flex-start;\n    align-content: flex-start; }\n  [layout-align-xs=\"start center\"],\n  [layout-align-xs=\"center center\"],\n  [layout-align-xs=\"end center\"],\n  [layout-align-xs=\"space-between center\"],\n  [layout-align-xs=\"space-around center\"] {\n    align-items: center;\n    align-content: center;\n    max-width: 100%; }\n  [layout-align-xs=\"start center\"] > *,\n  [layout-align-xs=\"center center\"] > *,\n  [layout-align-xs=\"end center\"] > *,\n  [layout-align-xs=\"space-between center\"] > *,\n  [layout-align-xs=\"space-around center\"] > * {\n    max-width: 100%;\n    box-sizing: border-box; }\n  [layout-align-xs=\"start end\"],\n  [layout-align-xs=\"center end\"],\n  [layout-align-xs=\"end end\"],\n  [layout-align-xs=\"space-between end\"],\n  [layout-align-xs=\"space-around end\"] {\n    align-items: flex-end;\n    align-content: flex-end; }\n  [layout-align-xs=\"start stretch\"],\n  [layout-align-xs=\"center stretch\"],\n  [layout-align-xs=\"end stretch\"],\n  [layout-align-xs=\"space-between stretch\"],\n  [layout-align-xs=\"space-around stretch\"] {\n    align-items: stretch;\n    align-content: stretch; }\n  [flex-xs] {\n    flex: 1;\n    box-sizing: border-box; } }\n\n@media screen\\0  and (max-width: 599px) {\n  [flex-xs] {\n    flex: 1 1 0%; } }\n\n@media (max-width: 599px) {\n  [flex-xs-grow] {\n    flex: 1 1 100%;\n    box-sizing: border-box; }\n  [flex-xs-initial] {\n    flex: 0 1 auto;\n    box-sizing: border-box; }\n  [flex-xs-auto] {\n    flex: 1 1 auto;\n    box-sizing: border-box; }\n  [flex-xs-none] {\n    flex: 0 0 auto;\n    box-sizing: border-box; }\n  [flex-xs-noshrink] {\n    flex: 1 0 auto;\n    box-sizing: border-box; }\n  [flex-xs-nogrow] {\n    flex: 0 1 auto;\n    box-sizing: border-box; }\n  [flex-xs=\"0\"] {\n    flex: 1 1 0%;\n    max-width: 0%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xs=\"0\"],\n  [layout-xs=\"row\"] > [flex-xs=\"0\"] {\n    flex: 1 1 0%;\n    max-width: 0%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xs=\"0\"],\n  [layout-xs=\"column\"] > [flex-xs=\"0\"] {\n    flex: 1 1 0%;\n    max-width: 100%;\n    max-height: 0%;\n    box-sizing: border-box; }\n  [flex-xs=\"5\"] {\n    flex: 1 1 5%;\n    max-width: 5%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xs=\"5\"],\n  [layout-xs=\"row\"] > [flex-xs=\"5\"] {\n    flex: 1 1 5%;\n    max-width: 5%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xs=\"5\"],\n  [layout-xs=\"column\"] > [flex-xs=\"5\"] {\n    flex: 1 1 5%;\n    max-width: 100%;\n    max-height: 5%;\n    box-sizing: border-box; }\n  [flex-xs=\"10\"] {\n    flex: 1 1 10%;\n    max-width: 10%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xs=\"10\"],\n  [layout-xs=\"row\"] > [flex-xs=\"10\"] {\n    flex: 1 1 10%;\n    max-width: 10%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xs=\"10\"],\n  [layout-xs=\"column\"] > [flex-xs=\"10\"] {\n    flex: 1 1 10%;\n    max-width: 100%;\n    max-height: 10%;\n    box-sizing: border-box; }\n  [flex-xs=\"15\"] {\n    flex: 1 1 15%;\n    max-width: 15%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xs=\"15\"],\n  [layout-xs=\"row\"] > [flex-xs=\"15\"] {\n    flex: 1 1 15%;\n    max-width: 15%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xs=\"15\"],\n  [layout-xs=\"column\"] > [flex-xs=\"15\"] {\n    flex: 1 1 15%;\n    max-width: 100%;\n    max-height: 15%;\n    box-sizing: border-box; }\n  [flex-xs=\"20\"] {\n    flex: 1 1 20%;\n    max-width: 20%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xs=\"20\"],\n  [layout-xs=\"row\"] > [flex-xs=\"20\"] {\n    flex: 1 1 20%;\n    max-width: 20%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xs=\"20\"],\n  [layout-xs=\"column\"] > [flex-xs=\"20\"] {\n    flex: 1 1 20%;\n    max-width: 100%;\n    max-height: 20%;\n    box-sizing: border-box; }\n  [flex-xs=\"25\"] {\n    flex: 1 1 25%;\n    max-width: 25%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xs=\"25\"],\n  [layout-xs=\"row\"] > [flex-xs=\"25\"] {\n    flex: 1 1 25%;\n    max-width: 25%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xs=\"25\"],\n  [layout-xs=\"column\"] > [flex-xs=\"25\"] {\n    flex: 1 1 25%;\n    max-width: 100%;\n    max-height: 25%;\n    box-sizing: border-box; }\n  [flex-xs=\"30\"] {\n    flex: 1 1 30%;\n    max-width: 30%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xs=\"30\"],\n  [layout-xs=\"row\"] > [flex-xs=\"30\"] {\n    flex: 1 1 30%;\n    max-width: 30%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xs=\"30\"],\n  [layout-xs=\"column\"] > [flex-xs=\"30\"] {\n    flex: 1 1 30%;\n    max-width: 100%;\n    max-height: 30%;\n    box-sizing: border-box; }\n  [flex-xs=\"35\"] {\n    flex: 1 1 35%;\n    max-width: 35%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xs=\"35\"],\n  [layout-xs=\"row\"] > [flex-xs=\"35\"] {\n    flex: 1 1 35%;\n    max-width: 35%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xs=\"35\"],\n  [layout-xs=\"column\"] > [flex-xs=\"35\"] {\n    flex: 1 1 35%;\n    max-width: 100%;\n    max-height: 35%;\n    box-sizing: border-box; }\n  [flex-xs=\"40\"] {\n    flex: 1 1 40%;\n    max-width: 40%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xs=\"40\"],\n  [layout-xs=\"row\"] > [flex-xs=\"40\"] {\n    flex: 1 1 40%;\n    max-width: 40%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xs=\"40\"],\n  [layout-xs=\"column\"] > [flex-xs=\"40\"] {\n    flex: 1 1 40%;\n    max-width: 100%;\n    max-height: 40%;\n    box-sizing: border-box; }\n  [flex-xs=\"45\"] {\n    flex: 1 1 45%;\n    max-width: 45%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xs=\"45\"],\n  [layout-xs=\"row\"] > [flex-xs=\"45\"] {\n    flex: 1 1 45%;\n    max-width: 45%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xs=\"45\"],\n  [layout-xs=\"column\"] > [flex-xs=\"45\"] {\n    flex: 1 1 45%;\n    max-width: 100%;\n    max-height: 45%;\n    box-sizing: border-box; }\n  [flex-xs=\"50\"] {\n    flex: 1 1 50%;\n    max-width: 50%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xs=\"50\"],\n  [layout-xs=\"row\"] > [flex-xs=\"50\"] {\n    flex: 1 1 50%;\n    max-width: 50%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xs=\"50\"],\n  [layout-xs=\"column\"] > [flex-xs=\"50\"] {\n    flex: 1 1 50%;\n    max-width: 100%;\n    max-height: 50%;\n    box-sizing: border-box; }\n  [flex-xs=\"55\"] {\n    flex: 1 1 55%;\n    max-width: 55%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xs=\"55\"],\n  [layout-xs=\"row\"] > [flex-xs=\"55\"] {\n    flex: 1 1 55%;\n    max-width: 55%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xs=\"55\"],\n  [layout-xs=\"column\"] > [flex-xs=\"55\"] {\n    flex: 1 1 55%;\n    max-width: 100%;\n    max-height: 55%;\n    box-sizing: border-box; }\n  [flex-xs=\"60\"] {\n    flex: 1 1 60%;\n    max-width: 60%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xs=\"60\"],\n  [layout-xs=\"row\"] > [flex-xs=\"60\"] {\n    flex: 1 1 60%;\n    max-width: 60%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xs=\"60\"],\n  [layout-xs=\"column\"] > [flex-xs=\"60\"] {\n    flex: 1 1 60%;\n    max-width: 100%;\n    max-height: 60%;\n    box-sizing: border-box; }\n  [flex-xs=\"65\"] {\n    flex: 1 1 65%;\n    max-width: 65%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xs=\"65\"],\n  [layout-xs=\"row\"] > [flex-xs=\"65\"] {\n    flex: 1 1 65%;\n    max-width: 65%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xs=\"65\"],\n  [layout-xs=\"column\"] > [flex-xs=\"65\"] {\n    flex: 1 1 65%;\n    max-width: 100%;\n    max-height: 65%;\n    box-sizing: border-box; }\n  [flex-xs=\"70\"] {\n    flex: 1 1 70%;\n    max-width: 70%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xs=\"70\"],\n  [layout-xs=\"row\"] > [flex-xs=\"70\"] {\n    flex: 1 1 70%;\n    max-width: 70%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xs=\"70\"],\n  [layout-xs=\"column\"] > [flex-xs=\"70\"] {\n    flex: 1 1 70%;\n    max-width: 100%;\n    max-height: 70%;\n    box-sizing: border-box; }\n  [flex-xs=\"75\"] {\n    flex: 1 1 75%;\n    max-width: 75%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xs=\"75\"],\n  [layout-xs=\"row\"] > [flex-xs=\"75\"] {\n    flex: 1 1 75%;\n    max-width: 75%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xs=\"75\"],\n  [layout-xs=\"column\"] > [flex-xs=\"75\"] {\n    flex: 1 1 75%;\n    max-width: 100%;\n    max-height: 75%;\n    box-sizing: border-box; }\n  [flex-xs=\"80\"] {\n    flex: 1 1 80%;\n    max-width: 80%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xs=\"80\"],\n  [layout-xs=\"row\"] > [flex-xs=\"80\"] {\n    flex: 1 1 80%;\n    max-width: 80%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xs=\"80\"],\n  [layout-xs=\"column\"] > [flex-xs=\"80\"] {\n    flex: 1 1 80%;\n    max-width: 100%;\n    max-height: 80%;\n    box-sizing: border-box; }\n  [flex-xs=\"85\"] {\n    flex: 1 1 85%;\n    max-width: 85%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xs=\"85\"],\n  [layout-xs=\"row\"] > [flex-xs=\"85\"] {\n    flex: 1 1 85%;\n    max-width: 85%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xs=\"85\"],\n  [layout-xs=\"column\"] > [flex-xs=\"85\"] {\n    flex: 1 1 85%;\n    max-width: 100%;\n    max-height: 85%;\n    box-sizing: border-box; }\n  [flex-xs=\"90\"] {\n    flex: 1 1 90%;\n    max-width: 90%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xs=\"90\"],\n  [layout-xs=\"row\"] > [flex-xs=\"90\"] {\n    flex: 1 1 90%;\n    max-width: 90%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xs=\"90\"],\n  [layout-xs=\"column\"] > [flex-xs=\"90\"] {\n    flex: 1 1 90%;\n    max-width: 100%;\n    max-height: 90%;\n    box-sizing: border-box; }\n  [flex-xs=\"95\"] {\n    flex: 1 1 95%;\n    max-width: 95%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xs=\"95\"],\n  [layout-xs=\"row\"] > [flex-xs=\"95\"] {\n    flex: 1 1 95%;\n    max-width: 95%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xs=\"95\"],\n  [layout-xs=\"column\"] > [flex-xs=\"95\"] {\n    flex: 1 1 95%;\n    max-width: 100%;\n    max-height: 95%;\n    box-sizing: border-box; }\n  [flex-xs=\"100\"] {\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xs=\"100\"],\n  [layout-xs=\"row\"] > [flex-xs=\"100\"] {\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xs=\"100\"],\n  [layout-xs=\"column\"] > [flex-xs=\"100\"] {\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xs=\"33\"], [layout=\"row\"] > [flex-xs=\"33\"], [layout-xs=\"row\"] > [flex-xs=\"33\"], [layout-xs=\"row\"] > [flex-xs=\"33\"] {\n    flex: 1 1 33%;\n    max-width: calc(100% / 3);\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xs=\"34\"], [layout=\"row\"] > [flex-xs=\"34\"], [layout-xs=\"row\"] > [flex-xs=\"34\"], [layout-xs=\"row\"] > [flex-xs=\"34\"] {\n    flex: 1 1 34%;\n    max-width: 34%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xs=\"66\"], [layout=\"row\"] > [flex-xs=\"66\"], [layout-xs=\"row\"] > [flex-xs=\"66\"], [layout-xs=\"row\"] > [flex-xs=\"66\"] {\n    flex: 1 1 66%;\n    max-width: calc(200% / 3);\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xs=\"67\"], [layout=\"row\"] > [flex-xs=\"67\"], [layout-xs=\"row\"] > [flex-xs=\"67\"], [layout-xs=\"row\"] > [flex-xs=\"67\"] {\n    flex: 1 1 67%;\n    max-width: 67%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xs=\"33\"], [layout=\"column\"] > [flex-xs=\"33\"], [layout-xs=\"column\"] > [flex-xs=\"33\"], [layout-xs=\"column\"] > [flex-xs=\"33\"] {\n    flex: 1 1 33%;\n    max-width: 100%;\n    max-height: calc(100% / 3);\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xs=\"34\"], [layout=\"column\"] > [flex-xs=\"34\"], [layout-xs=\"column\"] > [flex-xs=\"34\"], [layout-xs=\"column\"] > [flex-xs=\"34\"] {\n    flex: 1 1 34%;\n    max-width: 100%;\n    max-height: 34%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xs=\"66\"], [layout=\"column\"] > [flex-xs=\"66\"], [layout-xs=\"column\"] > [flex-xs=\"66\"], [layout-xs=\"column\"] > [flex-xs=\"66\"] {\n    flex: 1 1 66%;\n    max-width: 100%;\n    max-height: calc(200% / 3);\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xs=\"67\"], [layout=\"column\"] > [flex-xs=\"67\"], [layout-xs=\"column\"] > [flex-xs=\"67\"], [layout-xs=\"column\"] > [flex-xs=\"67\"] {\n    flex: 1 1 67%;\n    max-width: 100%;\n    max-height: 67%;\n    box-sizing: border-box; }\n  [layout-xs], [layout-xs=\"column\"], [layout-xs=\"row\"] {\n    box-sizing: border-box;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -moz-box;\n    display: -ms-flexbox;\n    display: flex; }\n  [layout-xs=\"column\"] {\n    flex-direction: column; }\n  [layout-xs=\"row\"] {\n    flex-direction: row; } }\n\n@media (min-width: 600px) {\n  [flex-order-gt-xs=\"-20\"] {\n    order: -20; }\n  [flex-order-gt-xs=\"-19\"] {\n    order: -19; }\n  [flex-order-gt-xs=\"-18\"] {\n    order: -18; }\n  [flex-order-gt-xs=\"-17\"] {\n    order: -17; }\n  [flex-order-gt-xs=\"-16\"] {\n    order: -16; }\n  [flex-order-gt-xs=\"-15\"] {\n    order: -15; }\n  [flex-order-gt-xs=\"-14\"] {\n    order: -14; }\n  [flex-order-gt-xs=\"-13\"] {\n    order: -13; }\n  [flex-order-gt-xs=\"-12\"] {\n    order: -12; }\n  [flex-order-gt-xs=\"-11\"] {\n    order: -11; }\n  [flex-order-gt-xs=\"-10\"] {\n    order: -10; }\n  [flex-order-gt-xs=\"-9\"] {\n    order: -9; }\n  [flex-order-gt-xs=\"-8\"] {\n    order: -8; }\n  [flex-order-gt-xs=\"-7\"] {\n    order: -7; }\n  [flex-order-gt-xs=\"-6\"] {\n    order: -6; }\n  [flex-order-gt-xs=\"-5\"] {\n    order: -5; }\n  [flex-order-gt-xs=\"-4\"] {\n    order: -4; }\n  [flex-order-gt-xs=\"-3\"] {\n    order: -3; }\n  [flex-order-gt-xs=\"-2\"] {\n    order: -2; }\n  [flex-order-gt-xs=\"-1\"] {\n    order: -1; }\n  [flex-order-gt-xs=\"0\"] {\n    order: 0; }\n  [flex-order-gt-xs=\"1\"] {\n    order: 1; }\n  [flex-order-gt-xs=\"2\"] {\n    order: 2; }\n  [flex-order-gt-xs=\"3\"] {\n    order: 3; }\n  [flex-order-gt-xs=\"4\"] {\n    order: 4; }\n  [flex-order-gt-xs=\"5\"] {\n    order: 5; }\n  [flex-order-gt-xs=\"6\"] {\n    order: 6; }\n  [flex-order-gt-xs=\"7\"] {\n    order: 7; }\n  [flex-order-gt-xs=\"8\"] {\n    order: 8; }\n  [flex-order-gt-xs=\"9\"] {\n    order: 9; }\n  [flex-order-gt-xs=\"10\"] {\n    order: 10; }\n  [flex-order-gt-xs=\"11\"] {\n    order: 11; }\n  [flex-order-gt-xs=\"12\"] {\n    order: 12; }\n  [flex-order-gt-xs=\"13\"] {\n    order: 13; }\n  [flex-order-gt-xs=\"14\"] {\n    order: 14; }\n  [flex-order-gt-xs=\"15\"] {\n    order: 15; }\n  [flex-order-gt-xs=\"16\"] {\n    order: 16; }\n  [flex-order-gt-xs=\"17\"] {\n    order: 17; }\n  [flex-order-gt-xs=\"18\"] {\n    order: 18; }\n  [flex-order-gt-xs=\"19\"] {\n    order: 19; }\n  [flex-order-gt-xs=\"20\"] {\n    order: 20; }\n  [flex-offset-gt-xs=\"0\"] {\n    margin-left: 0%; }\n  [flex-offset-gt-xs=\"5\"] {\n    margin-left: 5%; }\n  [flex-offset-gt-xs=\"10\"] {\n    margin-left: 10%; }\n  [flex-offset-gt-xs=\"15\"] {\n    margin-left: 15%; }\n  [flex-offset-gt-xs=\"20\"] {\n    margin-left: 20%; }\n  [flex-offset-gt-xs=\"25\"] {\n    margin-left: 25%; }\n  [flex-offset-gt-xs=\"30\"] {\n    margin-left: 30%; }\n  [flex-offset-gt-xs=\"35\"] {\n    margin-left: 35%; }\n  [flex-offset-gt-xs=\"40\"] {\n    margin-left: 40%; }\n  [flex-offset-gt-xs=\"45\"] {\n    margin-left: 45%; }\n  [flex-offset-gt-xs=\"50\"] {\n    margin-left: 50%; }\n  [flex-offset-gt-xs=\"55\"] {\n    margin-left: 55%; }\n  [flex-offset-gt-xs=\"60\"] {\n    margin-left: 60%; }\n  [flex-offset-gt-xs=\"65\"] {\n    margin-left: 65%; }\n  [flex-offset-gt-xs=\"70\"] {\n    margin-left: 70%; }\n  [flex-offset-gt-xs=\"75\"] {\n    margin-left: 75%; }\n  [flex-offset-gt-xs=\"80\"] {\n    margin-left: 80%; }\n  [flex-offset-gt-xs=\"85\"] {\n    margin-left: 85%; }\n  [flex-offset-gt-xs=\"90\"] {\n    margin-left: 90%; }\n  [flex-offset-gt-xs=\"95\"] {\n    margin-left: 95%; }\n  [flex-offset-gt-xs=\"33\"] {\n    margin-left: calc(100% / 3); }\n  [flex-offset-gt-xs=\"66\"] {\n    margin-left: calc(200% / 3); }\n  [layout-align-gt-xs],\n  [layout-align-gt-xs=\"start stretch\"] {\n    justify-content: flex-start;\n    align-content: stretch;\n    align-items: stretch; }\n  [layout-align-gt-xs=\"start\"],\n  [layout-align-gt-xs=\"start start\"],\n  [layout-align-gt-xs=\"start center\"],\n  [layout-align-gt-xs=\"start end\"],\n  [layout-align-gt-xs=\"start stretch\"] {\n    justify-content: start; }\n  [layout-align-gt-xs=\"center\"],\n  [layout-align-gt-xs=\"center start\"],\n  [layout-align-gt-xs=\"center center\"],\n  [layout-align-gt-xs=\"center end\"],\n  [layout-align-gt-xs=\"center stretch\"] {\n    justify-content: center; }\n  [layout-align-gt-xs=\"end\"],\n  [layout-align-gt-xs=\"end center\"],\n  [layout-align-gt-xs=\"end start\"],\n  [layout-align-gt-xs=\"end end\"],\n  [layout-align-gt-xs=\"end stretch\"] {\n    justify-content: flex-end; }\n  [layout-align-gt-xs=\"space-around\"],\n  [layout-align-gt-xs=\"space-around center\"],\n  [layout-align-gt-xs=\"space-around start\"],\n  [layout-align-gt-xs=\"space-around end\"],\n  [layout-align-gt-xs=\"space-around stretch\"] {\n    justify-content: space-around; }\n  [layout-align-gt-xs=\"space-between\"],\n  [layout-align-gt-xs=\"space-between center\"],\n  [layout-align-gt-xs=\"space-between start\"],\n  [layout-align-gt-xs=\"space-between end\"],\n  [layout-align-gt-xs=\"space-between stretch\"] {\n    justify-content: space-between; }\n  [layout-align-gt-xs=\"start start\"],\n  [layout-align-gt-xs=\"center start\"],\n  [layout-align-gt-xs=\"end start\"],\n  [layout-align-gt-xs=\"space-between start\"],\n  [layout-align-gt-xs=\"space-around start\"] {\n    align-items: flex-start;\n    align-content: flex-start; }\n  [layout-align-gt-xs=\"start center\"],\n  [layout-align-gt-xs=\"center center\"],\n  [layout-align-gt-xs=\"end center\"],\n  [layout-align-gt-xs=\"space-between center\"],\n  [layout-align-gt-xs=\"space-around center\"] {\n    align-items: center;\n    align-content: center;\n    max-width: 100%; }\n  [layout-align-gt-xs=\"start center\"] > *,\n  [layout-align-gt-xs=\"center center\"] > *,\n  [layout-align-gt-xs=\"end center\"] > *,\n  [layout-align-gt-xs=\"space-between center\"] > *,\n  [layout-align-gt-xs=\"space-around center\"] > * {\n    max-width: 100%;\n    box-sizing: border-box; }\n  [layout-align-gt-xs=\"start end\"],\n  [layout-align-gt-xs=\"center end\"],\n  [layout-align-gt-xs=\"end end\"],\n  [layout-align-gt-xs=\"space-between end\"],\n  [layout-align-gt-xs=\"space-around end\"] {\n    align-items: flex-end;\n    align-content: flex-end; }\n  [layout-align-gt-xs=\"start stretch\"],\n  [layout-align-gt-xs=\"center stretch\"],\n  [layout-align-gt-xs=\"end stretch\"],\n  [layout-align-gt-xs=\"space-between stretch\"],\n  [layout-align-gt-xs=\"space-around stretch\"] {\n    align-items: stretch;\n    align-content: stretch; }\n  [flex-gt-xs] {\n    flex: 1;\n    box-sizing: border-box; } }\n\n@media screen\\0  and (min-width: 600px) {\n  [flex-gt-xs] {\n    flex: 1 1 0%; } }\n\n@media (min-width: 600px) {\n  [flex-gt-xs-grow] {\n    flex: 1 1 100%;\n    box-sizing: border-box; }\n  [flex-gt-xs-initial] {\n    flex: 0 1 auto;\n    box-sizing: border-box; }\n  [flex-gt-xs-auto] {\n    flex: 1 1 auto;\n    box-sizing: border-box; }\n  [flex-gt-xs-none] {\n    flex: 0 0 auto;\n    box-sizing: border-box; }\n  [flex-gt-xs-noshrink] {\n    flex: 1 0 auto;\n    box-sizing: border-box; }\n  [flex-gt-xs-nogrow] {\n    flex: 0 1 auto;\n    box-sizing: border-box; }\n  [flex-gt-xs=\"0\"] {\n    flex: 1 1 0%;\n    max-width: 0%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-xs=\"0\"],\n  [layout-gt-xs=\"row\"] > [flex-gt-xs=\"0\"] {\n    flex: 1 1 0%;\n    max-width: 0%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-xs=\"0\"],\n  [layout-gt-xs=\"column\"] > [flex-gt-xs=\"0\"] {\n    flex: 1 1 0%;\n    max-width: 100%;\n    max-height: 0%;\n    box-sizing: border-box; }\n  [flex-gt-xs=\"5\"] {\n    flex: 1 1 5%;\n    max-width: 5%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-xs=\"5\"],\n  [layout-gt-xs=\"row\"] > [flex-gt-xs=\"5\"] {\n    flex: 1 1 5%;\n    max-width: 5%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-xs=\"5\"],\n  [layout-gt-xs=\"column\"] > [flex-gt-xs=\"5\"] {\n    flex: 1 1 5%;\n    max-width: 100%;\n    max-height: 5%;\n    box-sizing: border-box; }\n  [flex-gt-xs=\"10\"] {\n    flex: 1 1 10%;\n    max-width: 10%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-xs=\"10\"],\n  [layout-gt-xs=\"row\"] > [flex-gt-xs=\"10\"] {\n    flex: 1 1 10%;\n    max-width: 10%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-xs=\"10\"],\n  [layout-gt-xs=\"column\"] > [flex-gt-xs=\"10\"] {\n    flex: 1 1 10%;\n    max-width: 100%;\n    max-height: 10%;\n    box-sizing: border-box; }\n  [flex-gt-xs=\"15\"] {\n    flex: 1 1 15%;\n    max-width: 15%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-xs=\"15\"],\n  [layout-gt-xs=\"row\"] > [flex-gt-xs=\"15\"] {\n    flex: 1 1 15%;\n    max-width: 15%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-xs=\"15\"],\n  [layout-gt-xs=\"column\"] > [flex-gt-xs=\"15\"] {\n    flex: 1 1 15%;\n    max-width: 100%;\n    max-height: 15%;\n    box-sizing: border-box; }\n  [flex-gt-xs=\"20\"] {\n    flex: 1 1 20%;\n    max-width: 20%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-xs=\"20\"],\n  [layout-gt-xs=\"row\"] > [flex-gt-xs=\"20\"] {\n    flex: 1 1 20%;\n    max-width: 20%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-xs=\"20\"],\n  [layout-gt-xs=\"column\"] > [flex-gt-xs=\"20\"] {\n    flex: 1 1 20%;\n    max-width: 100%;\n    max-height: 20%;\n    box-sizing: border-box; }\n  [flex-gt-xs=\"25\"] {\n    flex: 1 1 25%;\n    max-width: 25%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-xs=\"25\"],\n  [layout-gt-xs=\"row\"] > [flex-gt-xs=\"25\"] {\n    flex: 1 1 25%;\n    max-width: 25%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-xs=\"25\"],\n  [layout-gt-xs=\"column\"] > [flex-gt-xs=\"25\"] {\n    flex: 1 1 25%;\n    max-width: 100%;\n    max-height: 25%;\n    box-sizing: border-box; }\n  [flex-gt-xs=\"30\"] {\n    flex: 1 1 30%;\n    max-width: 30%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-xs=\"30\"],\n  [layout-gt-xs=\"row\"] > [flex-gt-xs=\"30\"] {\n    flex: 1 1 30%;\n    max-width: 30%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-xs=\"30\"],\n  [layout-gt-xs=\"column\"] > [flex-gt-xs=\"30\"] {\n    flex: 1 1 30%;\n    max-width: 100%;\n    max-height: 30%;\n    box-sizing: border-box; }\n  [flex-gt-xs=\"35\"] {\n    flex: 1 1 35%;\n    max-width: 35%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-xs=\"35\"],\n  [layout-gt-xs=\"row\"] > [flex-gt-xs=\"35\"] {\n    flex: 1 1 35%;\n    max-width: 35%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-xs=\"35\"],\n  [layout-gt-xs=\"column\"] > [flex-gt-xs=\"35\"] {\n    flex: 1 1 35%;\n    max-width: 100%;\n    max-height: 35%;\n    box-sizing: border-box; }\n  [flex-gt-xs=\"40\"] {\n    flex: 1 1 40%;\n    max-width: 40%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-xs=\"40\"],\n  [layout-gt-xs=\"row\"] > [flex-gt-xs=\"40\"] {\n    flex: 1 1 40%;\n    max-width: 40%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-xs=\"40\"],\n  [layout-gt-xs=\"column\"] > [flex-gt-xs=\"40\"] {\n    flex: 1 1 40%;\n    max-width: 100%;\n    max-height: 40%;\n    box-sizing: border-box; }\n  [flex-gt-xs=\"45\"] {\n    flex: 1 1 45%;\n    max-width: 45%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-xs=\"45\"],\n  [layout-gt-xs=\"row\"] > [flex-gt-xs=\"45\"] {\n    flex: 1 1 45%;\n    max-width: 45%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-xs=\"45\"],\n  [layout-gt-xs=\"column\"] > [flex-gt-xs=\"45\"] {\n    flex: 1 1 45%;\n    max-width: 100%;\n    max-height: 45%;\n    box-sizing: border-box; }\n  [flex-gt-xs=\"50\"] {\n    flex: 1 1 50%;\n    max-width: 50%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-xs=\"50\"],\n  [layout-gt-xs=\"row\"] > [flex-gt-xs=\"50\"] {\n    flex: 1 1 50%;\n    max-width: 50%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-xs=\"50\"],\n  [layout-gt-xs=\"column\"] > [flex-gt-xs=\"50\"] {\n    flex: 1 1 50%;\n    max-width: 100%;\n    max-height: 50%;\n    box-sizing: border-box; }\n  [flex-gt-xs=\"55\"] {\n    flex: 1 1 55%;\n    max-width: 55%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-xs=\"55\"],\n  [layout-gt-xs=\"row\"] > [flex-gt-xs=\"55\"] {\n    flex: 1 1 55%;\n    max-width: 55%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-xs=\"55\"],\n  [layout-gt-xs=\"column\"] > [flex-gt-xs=\"55\"] {\n    flex: 1 1 55%;\n    max-width: 100%;\n    max-height: 55%;\n    box-sizing: border-box; }\n  [flex-gt-xs=\"60\"] {\n    flex: 1 1 60%;\n    max-width: 60%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-xs=\"60\"],\n  [layout-gt-xs=\"row\"] > [flex-gt-xs=\"60\"] {\n    flex: 1 1 60%;\n    max-width: 60%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-xs=\"60\"],\n  [layout-gt-xs=\"column\"] > [flex-gt-xs=\"60\"] {\n    flex: 1 1 60%;\n    max-width: 100%;\n    max-height: 60%;\n    box-sizing: border-box; }\n  [flex-gt-xs=\"65\"] {\n    flex: 1 1 65%;\n    max-width: 65%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-xs=\"65\"],\n  [layout-gt-xs=\"row\"] > [flex-gt-xs=\"65\"] {\n    flex: 1 1 65%;\n    max-width: 65%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-xs=\"65\"],\n  [layout-gt-xs=\"column\"] > [flex-gt-xs=\"65\"] {\n    flex: 1 1 65%;\n    max-width: 100%;\n    max-height: 65%;\n    box-sizing: border-box; }\n  [flex-gt-xs=\"70\"] {\n    flex: 1 1 70%;\n    max-width: 70%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-xs=\"70\"],\n  [layout-gt-xs=\"row\"] > [flex-gt-xs=\"70\"] {\n    flex: 1 1 70%;\n    max-width: 70%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-xs=\"70\"],\n  [layout-gt-xs=\"column\"] > [flex-gt-xs=\"70\"] {\n    flex: 1 1 70%;\n    max-width: 100%;\n    max-height: 70%;\n    box-sizing: border-box; }\n  [flex-gt-xs=\"75\"] {\n    flex: 1 1 75%;\n    max-width: 75%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-xs=\"75\"],\n  [layout-gt-xs=\"row\"] > [flex-gt-xs=\"75\"] {\n    flex: 1 1 75%;\n    max-width: 75%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-xs=\"75\"],\n  [layout-gt-xs=\"column\"] > [flex-gt-xs=\"75\"] {\n    flex: 1 1 75%;\n    max-width: 100%;\n    max-height: 75%;\n    box-sizing: border-box; }\n  [flex-gt-xs=\"80\"] {\n    flex: 1 1 80%;\n    max-width: 80%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-xs=\"80\"],\n  [layout-gt-xs=\"row\"] > [flex-gt-xs=\"80\"] {\n    flex: 1 1 80%;\n    max-width: 80%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-xs=\"80\"],\n  [layout-gt-xs=\"column\"] > [flex-gt-xs=\"80\"] {\n    flex: 1 1 80%;\n    max-width: 100%;\n    max-height: 80%;\n    box-sizing: border-box; }\n  [flex-gt-xs=\"85\"] {\n    flex: 1 1 85%;\n    max-width: 85%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-xs=\"85\"],\n  [layout-gt-xs=\"row\"] > [flex-gt-xs=\"85\"] {\n    flex: 1 1 85%;\n    max-width: 85%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-xs=\"85\"],\n  [layout-gt-xs=\"column\"] > [flex-gt-xs=\"85\"] {\n    flex: 1 1 85%;\n    max-width: 100%;\n    max-height: 85%;\n    box-sizing: border-box; }\n  [flex-gt-xs=\"90\"] {\n    flex: 1 1 90%;\n    max-width: 90%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-xs=\"90\"],\n  [layout-gt-xs=\"row\"] > [flex-gt-xs=\"90\"] {\n    flex: 1 1 90%;\n    max-width: 90%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-xs=\"90\"],\n  [layout-gt-xs=\"column\"] > [flex-gt-xs=\"90\"] {\n    flex: 1 1 90%;\n    max-width: 100%;\n    max-height: 90%;\n    box-sizing: border-box; }\n  [flex-gt-xs=\"95\"] {\n    flex: 1 1 95%;\n    max-width: 95%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-xs=\"95\"],\n  [layout-gt-xs=\"row\"] > [flex-gt-xs=\"95\"] {\n    flex: 1 1 95%;\n    max-width: 95%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-xs=\"95\"],\n  [layout-gt-xs=\"column\"] > [flex-gt-xs=\"95\"] {\n    flex: 1 1 95%;\n    max-width: 100%;\n    max-height: 95%;\n    box-sizing: border-box; }\n  [flex-gt-xs=\"100\"] {\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-xs=\"100\"],\n  [layout-gt-xs=\"row\"] > [flex-gt-xs=\"100\"] {\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-xs=\"100\"],\n  [layout-gt-xs=\"column\"] > [flex-gt-xs=\"100\"] {\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-xs=\"33\"], [layout=\"row\"] > [flex-gt-xs=\"33\"], [layout-gt-xs=\"row\"] > [flex-gt-xs=\"33\"], [layout-gt-xs=\"row\"] > [flex-gt-xs=\"33\"] {\n    flex: 1 1 33%;\n    max-width: calc(100% / 3);\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-xs=\"34\"], [layout=\"row\"] > [flex-gt-xs=\"34\"], [layout-gt-xs=\"row\"] > [flex-gt-xs=\"34\"], [layout-gt-xs=\"row\"] > [flex-gt-xs=\"34\"] {\n    flex: 1 1 34%;\n    max-width: 34%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-xs=\"66\"], [layout=\"row\"] > [flex-gt-xs=\"66\"], [layout-gt-xs=\"row\"] > [flex-gt-xs=\"66\"], [layout-gt-xs=\"row\"] > [flex-gt-xs=\"66\"] {\n    flex: 1 1 66%;\n    max-width: calc(200% / 3);\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-xs=\"67\"], [layout=\"row\"] > [flex-gt-xs=\"67\"], [layout-gt-xs=\"row\"] > [flex-gt-xs=\"67\"], [layout-gt-xs=\"row\"] > [flex-gt-xs=\"67\"] {\n    flex: 1 1 67%;\n    max-width: 67%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-xs=\"33\"], [layout=\"column\"] > [flex-gt-xs=\"33\"], [layout-gt-xs=\"column\"] > [flex-gt-xs=\"33\"], [layout-gt-xs=\"column\"] > [flex-gt-xs=\"33\"] {\n    flex: 1 1 33%;\n    max-width: 100%;\n    max-height: calc(100% / 3);\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-xs=\"34\"], [layout=\"column\"] > [flex-gt-xs=\"34\"], [layout-gt-xs=\"column\"] > [flex-gt-xs=\"34\"], [layout-gt-xs=\"column\"] > [flex-gt-xs=\"34\"] {\n    flex: 1 1 34%;\n    max-width: 100%;\n    max-height: 34%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-xs=\"66\"], [layout=\"column\"] > [flex-gt-xs=\"66\"], [layout-gt-xs=\"column\"] > [flex-gt-xs=\"66\"], [layout-gt-xs=\"column\"] > [flex-gt-xs=\"66\"] {\n    flex: 1 1 66%;\n    max-width: 100%;\n    max-height: calc(200% / 3);\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-xs=\"67\"], [layout=\"column\"] > [flex-gt-xs=\"67\"], [layout-gt-xs=\"column\"] > [flex-gt-xs=\"67\"], [layout-gt-xs=\"column\"] > [flex-gt-xs=\"67\"] {\n    flex: 1 1 67%;\n    max-width: 100%;\n    max-height: 67%;\n    box-sizing: border-box; }\n  [layout-gt-xs], [layout-gt-xs=\"column\"], [layout-gt-xs=\"row\"] {\n    box-sizing: border-box;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -moz-box;\n    display: -ms-flexbox;\n    display: flex; }\n  [layout-gt-xs=\"column\"] {\n    flex-direction: column; }\n  [layout-gt-xs=\"row\"] {\n    flex-direction: row; } }\n\n@media (min-width: 600px) and (max-width: 599px) {\n  [hide-sm]:not([show-gt-xs]):not([show-sm]):not([show]), [hide-gt-xs]:not([show-gt-xs]):not([show-sm]):not([show]) {\n    display: none; }\n  [hide-sm]:not([show-sm]):not([show]) {\n    display: none; }\n  [flex-order-sm=\"-20\"] {\n    order: -20; }\n  [flex-order-sm=\"-19\"] {\n    order: -19; }\n  [flex-order-sm=\"-18\"] {\n    order: -18; }\n  [flex-order-sm=\"-17\"] {\n    order: -17; }\n  [flex-order-sm=\"-16\"] {\n    order: -16; }\n  [flex-order-sm=\"-15\"] {\n    order: -15; }\n  [flex-order-sm=\"-14\"] {\n    order: -14; }\n  [flex-order-sm=\"-13\"] {\n    order: -13; }\n  [flex-order-sm=\"-12\"] {\n    order: -12; }\n  [flex-order-sm=\"-11\"] {\n    order: -11; }\n  [flex-order-sm=\"-10\"] {\n    order: -10; }\n  [flex-order-sm=\"-9\"] {\n    order: -9; }\n  [flex-order-sm=\"-8\"] {\n    order: -8; }\n  [flex-order-sm=\"-7\"] {\n    order: -7; }\n  [flex-order-sm=\"-6\"] {\n    order: -6; }\n  [flex-order-sm=\"-5\"] {\n    order: -5; }\n  [flex-order-sm=\"-4\"] {\n    order: -4; }\n  [flex-order-sm=\"-3\"] {\n    order: -3; }\n  [flex-order-sm=\"-2\"] {\n    order: -2; }\n  [flex-order-sm=\"-1\"] {\n    order: -1; }\n  [flex-order-sm=\"0\"] {\n    order: 0; }\n  [flex-order-sm=\"1\"] {\n    order: 1; }\n  [flex-order-sm=\"2\"] {\n    order: 2; }\n  [flex-order-sm=\"3\"] {\n    order: 3; }\n  [flex-order-sm=\"4\"] {\n    order: 4; }\n  [flex-order-sm=\"5\"] {\n    order: 5; }\n  [flex-order-sm=\"6\"] {\n    order: 6; }\n  [flex-order-sm=\"7\"] {\n    order: 7; }\n  [flex-order-sm=\"8\"] {\n    order: 8; }\n  [flex-order-sm=\"9\"] {\n    order: 9; }\n  [flex-order-sm=\"10\"] {\n    order: 10; }\n  [flex-order-sm=\"11\"] {\n    order: 11; }\n  [flex-order-sm=\"12\"] {\n    order: 12; }\n  [flex-order-sm=\"13\"] {\n    order: 13; }\n  [flex-order-sm=\"14\"] {\n    order: 14; }\n  [flex-order-sm=\"15\"] {\n    order: 15; }\n  [flex-order-sm=\"16\"] {\n    order: 16; }\n  [flex-order-sm=\"17\"] {\n    order: 17; }\n  [flex-order-sm=\"18\"] {\n    order: 18; }\n  [flex-order-sm=\"19\"] {\n    order: 19; }\n  [flex-order-sm=\"20\"] {\n    order: 20; }\n  [flex-offset-sm=\"0\"] {\n    margin-left: 0%; }\n  [flex-offset-sm=\"5\"] {\n    margin-left: 5%; }\n  [flex-offset-sm=\"10\"] {\n    margin-left: 10%; }\n  [flex-offset-sm=\"15\"] {\n    margin-left: 15%; }\n  [flex-offset-sm=\"20\"] {\n    margin-left: 20%; }\n  [flex-offset-sm=\"25\"] {\n    margin-left: 25%; }\n  [flex-offset-sm=\"30\"] {\n    margin-left: 30%; }\n  [flex-offset-sm=\"35\"] {\n    margin-left: 35%; }\n  [flex-offset-sm=\"40\"] {\n    margin-left: 40%; }\n  [flex-offset-sm=\"45\"] {\n    margin-left: 45%; }\n  [flex-offset-sm=\"50\"] {\n    margin-left: 50%; }\n  [flex-offset-sm=\"55\"] {\n    margin-left: 55%; }\n  [flex-offset-sm=\"60\"] {\n    margin-left: 60%; }\n  [flex-offset-sm=\"65\"] {\n    margin-left: 65%; }\n  [flex-offset-sm=\"70\"] {\n    margin-left: 70%; }\n  [flex-offset-sm=\"75\"] {\n    margin-left: 75%; }\n  [flex-offset-sm=\"80\"] {\n    margin-left: 80%; }\n  [flex-offset-sm=\"85\"] {\n    margin-left: 85%; }\n  [flex-offset-sm=\"90\"] {\n    margin-left: 90%; }\n  [flex-offset-sm=\"95\"] {\n    margin-left: 95%; }\n  [flex-offset-sm=\"33\"] {\n    margin-left: calc(100% / 3); }\n  [flex-offset-sm=\"66\"] {\n    margin-left: calc(200% / 3); }\n  [layout-align-sm],\n  [layout-align-sm=\"start stretch\"] {\n    justify-content: flex-start;\n    align-content: stretch;\n    align-items: stretch; }\n  [layout-align-sm=\"start\"],\n  [layout-align-sm=\"start start\"],\n  [layout-align-sm=\"start center\"],\n  [layout-align-sm=\"start end\"],\n  [layout-align-sm=\"start stretch\"] {\n    justify-content: start; }\n  [layout-align-sm=\"center\"],\n  [layout-align-sm=\"center start\"],\n  [layout-align-sm=\"center center\"],\n  [layout-align-sm=\"center end\"],\n  [layout-align-sm=\"center stretch\"] {\n    justify-content: center; }\n  [layout-align-sm=\"end\"],\n  [layout-align-sm=\"end center\"],\n  [layout-align-sm=\"end start\"],\n  [layout-align-sm=\"end end\"],\n  [layout-align-sm=\"end stretch\"] {\n    justify-content: flex-end; }\n  [layout-align-sm=\"space-around\"],\n  [layout-align-sm=\"space-around center\"],\n  [layout-align-sm=\"space-around start\"],\n  [layout-align-sm=\"space-around end\"],\n  [layout-align-sm=\"space-around stretch\"] {\n    justify-content: space-around; }\n  [layout-align-sm=\"space-between\"],\n  [layout-align-sm=\"space-between center\"],\n  [layout-align-sm=\"space-between start\"],\n  [layout-align-sm=\"space-between end\"],\n  [layout-align-sm=\"space-between stretch\"] {\n    justify-content: space-between; }\n  [layout-align-sm=\"start start\"],\n  [layout-align-sm=\"center start\"],\n  [layout-align-sm=\"end start\"],\n  [layout-align-sm=\"space-between start\"],\n  [layout-align-sm=\"space-around start\"] {\n    align-items: flex-start;\n    align-content: flex-start; }\n  [layout-align-sm=\"start center\"],\n  [layout-align-sm=\"center center\"],\n  [layout-align-sm=\"end center\"],\n  [layout-align-sm=\"space-between center\"],\n  [layout-align-sm=\"space-around center\"] {\n    align-items: center;\n    align-content: center;\n    max-width: 100%; }\n  [layout-align-sm=\"start center\"] > *,\n  [layout-align-sm=\"center center\"] > *,\n  [layout-align-sm=\"end center\"] > *,\n  [layout-align-sm=\"space-between center\"] > *,\n  [layout-align-sm=\"space-around center\"] > * {\n    max-width: 100%;\n    box-sizing: border-box; }\n  [layout-align-sm=\"start end\"],\n  [layout-align-sm=\"center end\"],\n  [layout-align-sm=\"end end\"],\n  [layout-align-sm=\"space-between end\"],\n  [layout-align-sm=\"space-around end\"] {\n    align-items: flex-end;\n    align-content: flex-end; }\n  [layout-align-sm=\"start stretch\"],\n  [layout-align-sm=\"center stretch\"],\n  [layout-align-sm=\"end stretch\"],\n  [layout-align-sm=\"space-between stretch\"],\n  [layout-align-sm=\"space-around stretch\"] {\n    align-items: stretch;\n    align-content: stretch; }\n  [flex-sm] {\n    flex: 1;\n    box-sizing: border-box; } }\n\n@media screen\\0  and (min-width: 600px) and (max-width: 599px) {\n  [flex-sm] {\n    flex: 1 1 0%; } }\n\n@media (min-width: 600px) and (max-width: 599px) {\n  [flex-sm-grow] {\n    flex: 1 1 100%;\n    box-sizing: border-box; }\n  [flex-sm-initial] {\n    flex: 0 1 auto;\n    box-sizing: border-box; }\n  [flex-sm-auto] {\n    flex: 1 1 auto;\n    box-sizing: border-box; }\n  [flex-sm-none] {\n    flex: 0 0 auto;\n    box-sizing: border-box; }\n  [flex-sm-noshrink] {\n    flex: 1 0 auto;\n    box-sizing: border-box; }\n  [flex-sm-nogrow] {\n    flex: 0 1 auto;\n    box-sizing: border-box; }\n  [flex-sm=\"0\"] {\n    flex: 1 1 0%;\n    max-width: 0%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-sm=\"0\"],\n  [layout-sm=\"row\"] > [flex-sm=\"0\"] {\n    flex: 1 1 0%;\n    max-width: 0%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-sm=\"0\"],\n  [layout-sm=\"column\"] > [flex-sm=\"0\"] {\n    flex: 1 1 0%;\n    max-width: 100%;\n    max-height: 0%;\n    box-sizing: border-box; }\n  [flex-sm=\"5\"] {\n    flex: 1 1 5%;\n    max-width: 5%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-sm=\"5\"],\n  [layout-sm=\"row\"] > [flex-sm=\"5\"] {\n    flex: 1 1 5%;\n    max-width: 5%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-sm=\"5\"],\n  [layout-sm=\"column\"] > [flex-sm=\"5\"] {\n    flex: 1 1 5%;\n    max-width: 100%;\n    max-height: 5%;\n    box-sizing: border-box; }\n  [flex-sm=\"10\"] {\n    flex: 1 1 10%;\n    max-width: 10%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-sm=\"10\"],\n  [layout-sm=\"row\"] > [flex-sm=\"10\"] {\n    flex: 1 1 10%;\n    max-width: 10%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-sm=\"10\"],\n  [layout-sm=\"column\"] > [flex-sm=\"10\"] {\n    flex: 1 1 10%;\n    max-width: 100%;\n    max-height: 10%;\n    box-sizing: border-box; }\n  [flex-sm=\"15\"] {\n    flex: 1 1 15%;\n    max-width: 15%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-sm=\"15\"],\n  [layout-sm=\"row\"] > [flex-sm=\"15\"] {\n    flex: 1 1 15%;\n    max-width: 15%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-sm=\"15\"],\n  [layout-sm=\"column\"] > [flex-sm=\"15\"] {\n    flex: 1 1 15%;\n    max-width: 100%;\n    max-height: 15%;\n    box-sizing: border-box; }\n  [flex-sm=\"20\"] {\n    flex: 1 1 20%;\n    max-width: 20%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-sm=\"20\"],\n  [layout-sm=\"row\"] > [flex-sm=\"20\"] {\n    flex: 1 1 20%;\n    max-width: 20%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-sm=\"20\"],\n  [layout-sm=\"column\"] > [flex-sm=\"20\"] {\n    flex: 1 1 20%;\n    max-width: 100%;\n    max-height: 20%;\n    box-sizing: border-box; }\n  [flex-sm=\"25\"] {\n    flex: 1 1 25%;\n    max-width: 25%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-sm=\"25\"],\n  [layout-sm=\"row\"] > [flex-sm=\"25\"] {\n    flex: 1 1 25%;\n    max-width: 25%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-sm=\"25\"],\n  [layout-sm=\"column\"] > [flex-sm=\"25\"] {\n    flex: 1 1 25%;\n    max-width: 100%;\n    max-height: 25%;\n    box-sizing: border-box; }\n  [flex-sm=\"30\"] {\n    flex: 1 1 30%;\n    max-width: 30%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-sm=\"30\"],\n  [layout-sm=\"row\"] > [flex-sm=\"30\"] {\n    flex: 1 1 30%;\n    max-width: 30%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-sm=\"30\"],\n  [layout-sm=\"column\"] > [flex-sm=\"30\"] {\n    flex: 1 1 30%;\n    max-width: 100%;\n    max-height: 30%;\n    box-sizing: border-box; }\n  [flex-sm=\"35\"] {\n    flex: 1 1 35%;\n    max-width: 35%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-sm=\"35\"],\n  [layout-sm=\"row\"] > [flex-sm=\"35\"] {\n    flex: 1 1 35%;\n    max-width: 35%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-sm=\"35\"],\n  [layout-sm=\"column\"] > [flex-sm=\"35\"] {\n    flex: 1 1 35%;\n    max-width: 100%;\n    max-height: 35%;\n    box-sizing: border-box; }\n  [flex-sm=\"40\"] {\n    flex: 1 1 40%;\n    max-width: 40%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-sm=\"40\"],\n  [layout-sm=\"row\"] > [flex-sm=\"40\"] {\n    flex: 1 1 40%;\n    max-width: 40%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-sm=\"40\"],\n  [layout-sm=\"column\"] > [flex-sm=\"40\"] {\n    flex: 1 1 40%;\n    max-width: 100%;\n    max-height: 40%;\n    box-sizing: border-box; }\n  [flex-sm=\"45\"] {\n    flex: 1 1 45%;\n    max-width: 45%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-sm=\"45\"],\n  [layout-sm=\"row\"] > [flex-sm=\"45\"] {\n    flex: 1 1 45%;\n    max-width: 45%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-sm=\"45\"],\n  [layout-sm=\"column\"] > [flex-sm=\"45\"] {\n    flex: 1 1 45%;\n    max-width: 100%;\n    max-height: 45%;\n    box-sizing: border-box; }\n  [flex-sm=\"50\"] {\n    flex: 1 1 50%;\n    max-width: 50%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-sm=\"50\"],\n  [layout-sm=\"row\"] > [flex-sm=\"50\"] {\n    flex: 1 1 50%;\n    max-width: 50%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-sm=\"50\"],\n  [layout-sm=\"column\"] > [flex-sm=\"50\"] {\n    flex: 1 1 50%;\n    max-width: 100%;\n    max-height: 50%;\n    box-sizing: border-box; }\n  [flex-sm=\"55\"] {\n    flex: 1 1 55%;\n    max-width: 55%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-sm=\"55\"],\n  [layout-sm=\"row\"] > [flex-sm=\"55\"] {\n    flex: 1 1 55%;\n    max-width: 55%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-sm=\"55\"],\n  [layout-sm=\"column\"] > [flex-sm=\"55\"] {\n    flex: 1 1 55%;\n    max-width: 100%;\n    max-height: 55%;\n    box-sizing: border-box; }\n  [flex-sm=\"60\"] {\n    flex: 1 1 60%;\n    max-width: 60%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-sm=\"60\"],\n  [layout-sm=\"row\"] > [flex-sm=\"60\"] {\n    flex: 1 1 60%;\n    max-width: 60%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-sm=\"60\"],\n  [layout-sm=\"column\"] > [flex-sm=\"60\"] {\n    flex: 1 1 60%;\n    max-width: 100%;\n    max-height: 60%;\n    box-sizing: border-box; }\n  [flex-sm=\"65\"] {\n    flex: 1 1 65%;\n    max-width: 65%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-sm=\"65\"],\n  [layout-sm=\"row\"] > [flex-sm=\"65\"] {\n    flex: 1 1 65%;\n    max-width: 65%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-sm=\"65\"],\n  [layout-sm=\"column\"] > [flex-sm=\"65\"] {\n    flex: 1 1 65%;\n    max-width: 100%;\n    max-height: 65%;\n    box-sizing: border-box; }\n  [flex-sm=\"70\"] {\n    flex: 1 1 70%;\n    max-width: 70%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-sm=\"70\"],\n  [layout-sm=\"row\"] > [flex-sm=\"70\"] {\n    flex: 1 1 70%;\n    max-width: 70%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-sm=\"70\"],\n  [layout-sm=\"column\"] > [flex-sm=\"70\"] {\n    flex: 1 1 70%;\n    max-width: 100%;\n    max-height: 70%;\n    box-sizing: border-box; }\n  [flex-sm=\"75\"] {\n    flex: 1 1 75%;\n    max-width: 75%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-sm=\"75\"],\n  [layout-sm=\"row\"] > [flex-sm=\"75\"] {\n    flex: 1 1 75%;\n    max-width: 75%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-sm=\"75\"],\n  [layout-sm=\"column\"] > [flex-sm=\"75\"] {\n    flex: 1 1 75%;\n    max-width: 100%;\n    max-height: 75%;\n    box-sizing: border-box; }\n  [flex-sm=\"80\"] {\n    flex: 1 1 80%;\n    max-width: 80%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-sm=\"80\"],\n  [layout-sm=\"row\"] > [flex-sm=\"80\"] {\n    flex: 1 1 80%;\n    max-width: 80%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-sm=\"80\"],\n  [layout-sm=\"column\"] > [flex-sm=\"80\"] {\n    flex: 1 1 80%;\n    max-width: 100%;\n    max-height: 80%;\n    box-sizing: border-box; }\n  [flex-sm=\"85\"] {\n    flex: 1 1 85%;\n    max-width: 85%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-sm=\"85\"],\n  [layout-sm=\"row\"] > [flex-sm=\"85\"] {\n    flex: 1 1 85%;\n    max-width: 85%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-sm=\"85\"],\n  [layout-sm=\"column\"] > [flex-sm=\"85\"] {\n    flex: 1 1 85%;\n    max-width: 100%;\n    max-height: 85%;\n    box-sizing: border-box; }\n  [flex-sm=\"90\"] {\n    flex: 1 1 90%;\n    max-width: 90%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-sm=\"90\"],\n  [layout-sm=\"row\"] > [flex-sm=\"90\"] {\n    flex: 1 1 90%;\n    max-width: 90%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-sm=\"90\"],\n  [layout-sm=\"column\"] > [flex-sm=\"90\"] {\n    flex: 1 1 90%;\n    max-width: 100%;\n    max-height: 90%;\n    box-sizing: border-box; }\n  [flex-sm=\"95\"] {\n    flex: 1 1 95%;\n    max-width: 95%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-sm=\"95\"],\n  [layout-sm=\"row\"] > [flex-sm=\"95\"] {\n    flex: 1 1 95%;\n    max-width: 95%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-sm=\"95\"],\n  [layout-sm=\"column\"] > [flex-sm=\"95\"] {\n    flex: 1 1 95%;\n    max-width: 100%;\n    max-height: 95%;\n    box-sizing: border-box; }\n  [flex-sm=\"100\"] {\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-sm=\"100\"],\n  [layout-sm=\"row\"] > [flex-sm=\"100\"] {\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-sm=\"100\"],\n  [layout-sm=\"column\"] > [flex-sm=\"100\"] {\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-sm=\"33\"], [layout=\"row\"] > [flex-sm=\"33\"], [layout-sm=\"row\"] > [flex-sm=\"33\"], [layout-sm=\"row\"] > [flex-sm=\"33\"] {\n    flex: 1 1 33%;\n    max-width: calc(100% / 3);\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-sm=\"34\"], [layout=\"row\"] > [flex-sm=\"34\"], [layout-sm=\"row\"] > [flex-sm=\"34\"], [layout-sm=\"row\"] > [flex-sm=\"34\"] {\n    flex: 1 1 34%;\n    max-width: 34%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-sm=\"66\"], [layout=\"row\"] > [flex-sm=\"66\"], [layout-sm=\"row\"] > [flex-sm=\"66\"], [layout-sm=\"row\"] > [flex-sm=\"66\"] {\n    flex: 1 1 66%;\n    max-width: calc(200% / 3);\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-sm=\"67\"], [layout=\"row\"] > [flex-sm=\"67\"], [layout-sm=\"row\"] > [flex-sm=\"67\"], [layout-sm=\"row\"] > [flex-sm=\"67\"] {\n    flex: 1 1 67%;\n    max-width: 67%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-sm=\"33\"], [layout=\"column\"] > [flex-sm=\"33\"], [layout-sm=\"column\"] > [flex-sm=\"33\"], [layout-sm=\"column\"] > [flex-sm=\"33\"] {\n    flex: 1 1 33%;\n    max-width: 100%;\n    max-height: calc(100% / 3);\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-sm=\"34\"], [layout=\"column\"] > [flex-sm=\"34\"], [layout-sm=\"column\"] > [flex-sm=\"34\"], [layout-sm=\"column\"] > [flex-sm=\"34\"] {\n    flex: 1 1 34%;\n    max-width: 100%;\n    max-height: 34%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-sm=\"66\"], [layout=\"column\"] > [flex-sm=\"66\"], [layout-sm=\"column\"] > [flex-sm=\"66\"], [layout-sm=\"column\"] > [flex-sm=\"66\"] {\n    flex: 1 1 66%;\n    max-width: 100%;\n    max-height: calc(200% / 3);\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-sm=\"67\"], [layout=\"column\"] > [flex-sm=\"67\"], [layout-sm=\"column\"] > [flex-sm=\"67\"], [layout-sm=\"column\"] > [flex-sm=\"67\"] {\n    flex: 1 1 67%;\n    max-width: 100%;\n    max-height: 67%;\n    box-sizing: border-box; }\n  [layout-sm], [layout-sm=\"column\"], [layout-sm=\"row\"] {\n    box-sizing: border-box;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -moz-box;\n    display: -ms-flexbox;\n    display: flex; }\n  [layout-sm=\"column\"] {\n    flex-direction: column; }\n  [layout-sm=\"row\"] {\n    flex-direction: row; } }\n\n@media (min-width: 600px) {\n  [flex-order-gt-sm=\"-20\"] {\n    order: -20; }\n  [flex-order-gt-sm=\"-19\"] {\n    order: -19; }\n  [flex-order-gt-sm=\"-18\"] {\n    order: -18; }\n  [flex-order-gt-sm=\"-17\"] {\n    order: -17; }\n  [flex-order-gt-sm=\"-16\"] {\n    order: -16; }\n  [flex-order-gt-sm=\"-15\"] {\n    order: -15; }\n  [flex-order-gt-sm=\"-14\"] {\n    order: -14; }\n  [flex-order-gt-sm=\"-13\"] {\n    order: -13; }\n  [flex-order-gt-sm=\"-12\"] {\n    order: -12; }\n  [flex-order-gt-sm=\"-11\"] {\n    order: -11; }\n  [flex-order-gt-sm=\"-10\"] {\n    order: -10; }\n  [flex-order-gt-sm=\"-9\"] {\n    order: -9; }\n  [flex-order-gt-sm=\"-8\"] {\n    order: -8; }\n  [flex-order-gt-sm=\"-7\"] {\n    order: -7; }\n  [flex-order-gt-sm=\"-6\"] {\n    order: -6; }\n  [flex-order-gt-sm=\"-5\"] {\n    order: -5; }\n  [flex-order-gt-sm=\"-4\"] {\n    order: -4; }\n  [flex-order-gt-sm=\"-3\"] {\n    order: -3; }\n  [flex-order-gt-sm=\"-2\"] {\n    order: -2; }\n  [flex-order-gt-sm=\"-1\"] {\n    order: -1; }\n  [flex-order-gt-sm=\"0\"] {\n    order: 0; }\n  [flex-order-gt-sm=\"1\"] {\n    order: 1; }\n  [flex-order-gt-sm=\"2\"] {\n    order: 2; }\n  [flex-order-gt-sm=\"3\"] {\n    order: 3; }\n  [flex-order-gt-sm=\"4\"] {\n    order: 4; }\n  [flex-order-gt-sm=\"5\"] {\n    order: 5; }\n  [flex-order-gt-sm=\"6\"] {\n    order: 6; }\n  [flex-order-gt-sm=\"7\"] {\n    order: 7; }\n  [flex-order-gt-sm=\"8\"] {\n    order: 8; }\n  [flex-order-gt-sm=\"9\"] {\n    order: 9; }\n  [flex-order-gt-sm=\"10\"] {\n    order: 10; }\n  [flex-order-gt-sm=\"11\"] {\n    order: 11; }\n  [flex-order-gt-sm=\"12\"] {\n    order: 12; }\n  [flex-order-gt-sm=\"13\"] {\n    order: 13; }\n  [flex-order-gt-sm=\"14\"] {\n    order: 14; }\n  [flex-order-gt-sm=\"15\"] {\n    order: 15; }\n  [flex-order-gt-sm=\"16\"] {\n    order: 16; }\n  [flex-order-gt-sm=\"17\"] {\n    order: 17; }\n  [flex-order-gt-sm=\"18\"] {\n    order: 18; }\n  [flex-order-gt-sm=\"19\"] {\n    order: 19; }\n  [flex-order-gt-sm=\"20\"] {\n    order: 20; }\n  [flex-offset-gt-sm=\"0\"] {\n    margin-left: 0%; }\n  [flex-offset-gt-sm=\"5\"] {\n    margin-left: 5%; }\n  [flex-offset-gt-sm=\"10\"] {\n    margin-left: 10%; }\n  [flex-offset-gt-sm=\"15\"] {\n    margin-left: 15%; }\n  [flex-offset-gt-sm=\"20\"] {\n    margin-left: 20%; }\n  [flex-offset-gt-sm=\"25\"] {\n    margin-left: 25%; }\n  [flex-offset-gt-sm=\"30\"] {\n    margin-left: 30%; }\n  [flex-offset-gt-sm=\"35\"] {\n    margin-left: 35%; }\n  [flex-offset-gt-sm=\"40\"] {\n    margin-left: 40%; }\n  [flex-offset-gt-sm=\"45\"] {\n    margin-left: 45%; }\n  [flex-offset-gt-sm=\"50\"] {\n    margin-left: 50%; }\n  [flex-offset-gt-sm=\"55\"] {\n    margin-left: 55%; }\n  [flex-offset-gt-sm=\"60\"] {\n    margin-left: 60%; }\n  [flex-offset-gt-sm=\"65\"] {\n    margin-left: 65%; }\n  [flex-offset-gt-sm=\"70\"] {\n    margin-left: 70%; }\n  [flex-offset-gt-sm=\"75\"] {\n    margin-left: 75%; }\n  [flex-offset-gt-sm=\"80\"] {\n    margin-left: 80%; }\n  [flex-offset-gt-sm=\"85\"] {\n    margin-left: 85%; }\n  [flex-offset-gt-sm=\"90\"] {\n    margin-left: 90%; }\n  [flex-offset-gt-sm=\"95\"] {\n    margin-left: 95%; }\n  [flex-offset-gt-sm=\"33\"] {\n    margin-left: calc(100% / 3); }\n  [flex-offset-gt-sm=\"66\"] {\n    margin-left: calc(200% / 3); }\n  [layout-align-gt-sm],\n  [layout-align-gt-sm=\"start stretch\"] {\n    justify-content: flex-start;\n    align-content: stretch;\n    align-items: stretch; }\n  [layout-align-gt-sm=\"start\"],\n  [layout-align-gt-sm=\"start start\"],\n  [layout-align-gt-sm=\"start center\"],\n  [layout-align-gt-sm=\"start end\"],\n  [layout-align-gt-sm=\"start stretch\"] {\n    justify-content: start; }\n  [layout-align-gt-sm=\"center\"],\n  [layout-align-gt-sm=\"center start\"],\n  [layout-align-gt-sm=\"center center\"],\n  [layout-align-gt-sm=\"center end\"],\n  [layout-align-gt-sm=\"center stretch\"] {\n    justify-content: center; }\n  [layout-align-gt-sm=\"end\"],\n  [layout-align-gt-sm=\"end center\"],\n  [layout-align-gt-sm=\"end start\"],\n  [layout-align-gt-sm=\"end end\"],\n  [layout-align-gt-sm=\"end stretch\"] {\n    justify-content: flex-end; }\n  [layout-align-gt-sm=\"space-around\"],\n  [layout-align-gt-sm=\"space-around center\"],\n  [layout-align-gt-sm=\"space-around start\"],\n  [layout-align-gt-sm=\"space-around end\"],\n  [layout-align-gt-sm=\"space-around stretch\"] {\n    justify-content: space-around; }\n  [layout-align-gt-sm=\"space-between\"],\n  [layout-align-gt-sm=\"space-between center\"],\n  [layout-align-gt-sm=\"space-between start\"],\n  [layout-align-gt-sm=\"space-between end\"],\n  [layout-align-gt-sm=\"space-between stretch\"] {\n    justify-content: space-between; }\n  [layout-align-gt-sm=\"start start\"],\n  [layout-align-gt-sm=\"center start\"],\n  [layout-align-gt-sm=\"end start\"],\n  [layout-align-gt-sm=\"space-between start\"],\n  [layout-align-gt-sm=\"space-around start\"] {\n    align-items: flex-start;\n    align-content: flex-start; }\n  [layout-align-gt-sm=\"start center\"],\n  [layout-align-gt-sm=\"center center\"],\n  [layout-align-gt-sm=\"end center\"],\n  [layout-align-gt-sm=\"space-between center\"],\n  [layout-align-gt-sm=\"space-around center\"] {\n    align-items: center;\n    align-content: center;\n    max-width: 100%; }\n  [layout-align-gt-sm=\"start center\"] > *,\n  [layout-align-gt-sm=\"center center\"] > *,\n  [layout-align-gt-sm=\"end center\"] > *,\n  [layout-align-gt-sm=\"space-between center\"] > *,\n  [layout-align-gt-sm=\"space-around center\"] > * {\n    max-width: 100%;\n    box-sizing: border-box; }\n  [layout-align-gt-sm=\"start end\"],\n  [layout-align-gt-sm=\"center end\"],\n  [layout-align-gt-sm=\"end end\"],\n  [layout-align-gt-sm=\"space-between end\"],\n  [layout-align-gt-sm=\"space-around end\"] {\n    align-items: flex-end;\n    align-content: flex-end; }\n  [layout-align-gt-sm=\"start stretch\"],\n  [layout-align-gt-sm=\"center stretch\"],\n  [layout-align-gt-sm=\"end stretch\"],\n  [layout-align-gt-sm=\"space-between stretch\"],\n  [layout-align-gt-sm=\"space-around stretch\"] {\n    align-items: stretch;\n    align-content: stretch; }\n  [flex-gt-sm] {\n    flex: 1;\n    box-sizing: border-box; } }\n\n@media screen\\0  and (min-width: 600px) {\n  [flex-gt-sm] {\n    flex: 1 1 0%; } }\n\n@media (min-width: 600px) {\n  [flex-gt-sm-grow] {\n    flex: 1 1 100%;\n    box-sizing: border-box; }\n  [flex-gt-sm-initial] {\n    flex: 0 1 auto;\n    box-sizing: border-box; }\n  [flex-gt-sm-auto] {\n    flex: 1 1 auto;\n    box-sizing: border-box; }\n  [flex-gt-sm-none] {\n    flex: 0 0 auto;\n    box-sizing: border-box; }\n  [flex-gt-sm-noshrink] {\n    flex: 1 0 auto;\n    box-sizing: border-box; }\n  [flex-gt-sm-nogrow] {\n    flex: 0 1 auto;\n    box-sizing: border-box; }\n  [flex-gt-sm=\"0\"] {\n    flex: 1 1 0%;\n    max-width: 0%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-sm=\"0\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"0\"] {\n    flex: 1 1 0%;\n    max-width: 0%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-sm=\"0\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"0\"] {\n    flex: 1 1 0%;\n    max-width: 100%;\n    max-height: 0%;\n    box-sizing: border-box; }\n  [flex-gt-sm=\"5\"] {\n    flex: 1 1 5%;\n    max-width: 5%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-sm=\"5\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"5\"] {\n    flex: 1 1 5%;\n    max-width: 5%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-sm=\"5\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"5\"] {\n    flex: 1 1 5%;\n    max-width: 100%;\n    max-height: 5%;\n    box-sizing: border-box; }\n  [flex-gt-sm=\"10\"] {\n    flex: 1 1 10%;\n    max-width: 10%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-sm=\"10\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"10\"] {\n    flex: 1 1 10%;\n    max-width: 10%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-sm=\"10\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"10\"] {\n    flex: 1 1 10%;\n    max-width: 100%;\n    max-height: 10%;\n    box-sizing: border-box; }\n  [flex-gt-sm=\"15\"] {\n    flex: 1 1 15%;\n    max-width: 15%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-sm=\"15\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"15\"] {\n    flex: 1 1 15%;\n    max-width: 15%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-sm=\"15\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"15\"] {\n    flex: 1 1 15%;\n    max-width: 100%;\n    max-height: 15%;\n    box-sizing: border-box; }\n  [flex-gt-sm=\"20\"] {\n    flex: 1 1 20%;\n    max-width: 20%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-sm=\"20\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"20\"] {\n    flex: 1 1 20%;\n    max-width: 20%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-sm=\"20\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"20\"] {\n    flex: 1 1 20%;\n    max-width: 100%;\n    max-height: 20%;\n    box-sizing: border-box; }\n  [flex-gt-sm=\"25\"] {\n    flex: 1 1 25%;\n    max-width: 25%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-sm=\"25\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"25\"] {\n    flex: 1 1 25%;\n    max-width: 25%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-sm=\"25\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"25\"] {\n    flex: 1 1 25%;\n    max-width: 100%;\n    max-height: 25%;\n    box-sizing: border-box; }\n  [flex-gt-sm=\"30\"] {\n    flex: 1 1 30%;\n    max-width: 30%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-sm=\"30\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"30\"] {\n    flex: 1 1 30%;\n    max-width: 30%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-sm=\"30\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"30\"] {\n    flex: 1 1 30%;\n    max-width: 100%;\n    max-height: 30%;\n    box-sizing: border-box; }\n  [flex-gt-sm=\"35\"] {\n    flex: 1 1 35%;\n    max-width: 35%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-sm=\"35\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"35\"] {\n    flex: 1 1 35%;\n    max-width: 35%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-sm=\"35\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"35\"] {\n    flex: 1 1 35%;\n    max-width: 100%;\n    max-height: 35%;\n    box-sizing: border-box; }\n  [flex-gt-sm=\"40\"] {\n    flex: 1 1 40%;\n    max-width: 40%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-sm=\"40\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"40\"] {\n    flex: 1 1 40%;\n    max-width: 40%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-sm=\"40\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"40\"] {\n    flex: 1 1 40%;\n    max-width: 100%;\n    max-height: 40%;\n    box-sizing: border-box; }\n  [flex-gt-sm=\"45\"] {\n    flex: 1 1 45%;\n    max-width: 45%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-sm=\"45\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"45\"] {\n    flex: 1 1 45%;\n    max-width: 45%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-sm=\"45\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"45\"] {\n    flex: 1 1 45%;\n    max-width: 100%;\n    max-height: 45%;\n    box-sizing: border-box; }\n  [flex-gt-sm=\"50\"] {\n    flex: 1 1 50%;\n    max-width: 50%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-sm=\"50\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"50\"] {\n    flex: 1 1 50%;\n    max-width: 50%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-sm=\"50\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"50\"] {\n    flex: 1 1 50%;\n    max-width: 100%;\n    max-height: 50%;\n    box-sizing: border-box; }\n  [flex-gt-sm=\"55\"] {\n    flex: 1 1 55%;\n    max-width: 55%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-sm=\"55\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"55\"] {\n    flex: 1 1 55%;\n    max-width: 55%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-sm=\"55\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"55\"] {\n    flex: 1 1 55%;\n    max-width: 100%;\n    max-height: 55%;\n    box-sizing: border-box; }\n  [flex-gt-sm=\"60\"] {\n    flex: 1 1 60%;\n    max-width: 60%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-sm=\"60\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"60\"] {\n    flex: 1 1 60%;\n    max-width: 60%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-sm=\"60\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"60\"] {\n    flex: 1 1 60%;\n    max-width: 100%;\n    max-height: 60%;\n    box-sizing: border-box; }\n  [flex-gt-sm=\"65\"] {\n    flex: 1 1 65%;\n    max-width: 65%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-sm=\"65\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"65\"] {\n    flex: 1 1 65%;\n    max-width: 65%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-sm=\"65\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"65\"] {\n    flex: 1 1 65%;\n    max-width: 100%;\n    max-height: 65%;\n    box-sizing: border-box; }\n  [flex-gt-sm=\"70\"] {\n    flex: 1 1 70%;\n    max-width: 70%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-sm=\"70\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"70\"] {\n    flex: 1 1 70%;\n    max-width: 70%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-sm=\"70\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"70\"] {\n    flex: 1 1 70%;\n    max-width: 100%;\n    max-height: 70%;\n    box-sizing: border-box; }\n  [flex-gt-sm=\"75\"] {\n    flex: 1 1 75%;\n    max-width: 75%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-sm=\"75\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"75\"] {\n    flex: 1 1 75%;\n    max-width: 75%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-sm=\"75\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"75\"] {\n    flex: 1 1 75%;\n    max-width: 100%;\n    max-height: 75%;\n    box-sizing: border-box; }\n  [flex-gt-sm=\"80\"] {\n    flex: 1 1 80%;\n    max-width: 80%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-sm=\"80\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"80\"] {\n    flex: 1 1 80%;\n    max-width: 80%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-sm=\"80\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"80\"] {\n    flex: 1 1 80%;\n    max-width: 100%;\n    max-height: 80%;\n    box-sizing: border-box; }\n  [flex-gt-sm=\"85\"] {\n    flex: 1 1 85%;\n    max-width: 85%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-sm=\"85\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"85\"] {\n    flex: 1 1 85%;\n    max-width: 85%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-sm=\"85\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"85\"] {\n    flex: 1 1 85%;\n    max-width: 100%;\n    max-height: 85%;\n    box-sizing: border-box; }\n  [flex-gt-sm=\"90\"] {\n    flex: 1 1 90%;\n    max-width: 90%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-sm=\"90\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"90\"] {\n    flex: 1 1 90%;\n    max-width: 90%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-sm=\"90\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"90\"] {\n    flex: 1 1 90%;\n    max-width: 100%;\n    max-height: 90%;\n    box-sizing: border-box; }\n  [flex-gt-sm=\"95\"] {\n    flex: 1 1 95%;\n    max-width: 95%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-sm=\"95\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"95\"] {\n    flex: 1 1 95%;\n    max-width: 95%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-sm=\"95\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"95\"] {\n    flex: 1 1 95%;\n    max-width: 100%;\n    max-height: 95%;\n    box-sizing: border-box; }\n  [flex-gt-sm=\"100\"] {\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-sm=\"100\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"100\"] {\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-sm=\"100\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"100\"] {\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-sm=\"33\"], [layout=\"row\"] > [flex-gt-sm=\"33\"], [layout-gt-sm=\"row\"] > [flex-gt-sm=\"33\"], [layout-gt-sm=\"row\"] > [flex-gt-sm=\"33\"] {\n    flex: 1 1 33%;\n    max-width: calc(100% / 3);\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-sm=\"34\"], [layout=\"row\"] > [flex-gt-sm=\"34\"], [layout-gt-sm=\"row\"] > [flex-gt-sm=\"34\"], [layout-gt-sm=\"row\"] > [flex-gt-sm=\"34\"] {\n    flex: 1 1 34%;\n    max-width: 34%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-sm=\"66\"], [layout=\"row\"] > [flex-gt-sm=\"66\"], [layout-gt-sm=\"row\"] > [flex-gt-sm=\"66\"], [layout-gt-sm=\"row\"] > [flex-gt-sm=\"66\"] {\n    flex: 1 1 66%;\n    max-width: calc(200% / 3);\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-sm=\"67\"], [layout=\"row\"] > [flex-gt-sm=\"67\"], [layout-gt-sm=\"row\"] > [flex-gt-sm=\"67\"], [layout-gt-sm=\"row\"] > [flex-gt-sm=\"67\"] {\n    flex: 1 1 67%;\n    max-width: 67%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-sm=\"33\"], [layout=\"column\"] > [flex-gt-sm=\"33\"], [layout-gt-sm=\"column\"] > [flex-gt-sm=\"33\"], [layout-gt-sm=\"column\"] > [flex-gt-sm=\"33\"] {\n    flex: 1 1 33%;\n    max-width: 100%;\n    max-height: calc(100% / 3);\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-sm=\"34\"], [layout=\"column\"] > [flex-gt-sm=\"34\"], [layout-gt-sm=\"column\"] > [flex-gt-sm=\"34\"], [layout-gt-sm=\"column\"] > [flex-gt-sm=\"34\"] {\n    flex: 1 1 34%;\n    max-width: 100%;\n    max-height: 34%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-sm=\"66\"], [layout=\"column\"] > [flex-gt-sm=\"66\"], [layout-gt-sm=\"column\"] > [flex-gt-sm=\"66\"], [layout-gt-sm=\"column\"] > [flex-gt-sm=\"66\"] {\n    flex: 1 1 66%;\n    max-width: 100%;\n    max-height: calc(200% / 3);\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-sm=\"67\"], [layout=\"column\"] > [flex-gt-sm=\"67\"], [layout-gt-sm=\"column\"] > [flex-gt-sm=\"67\"], [layout-gt-sm=\"column\"] > [flex-gt-sm=\"67\"] {\n    flex: 1 1 67%;\n    max-width: 100%;\n    max-height: 67%;\n    box-sizing: border-box; }\n  [layout-gt-sm], [layout-gt-sm=\"column\"], [layout-gt-sm=\"row\"] {\n    box-sizing: border-box;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -moz-box;\n    display: -ms-flexbox;\n    display: flex; }\n  [layout-gt-sm=\"column\"] {\n    flex-direction: column; }\n  [layout-gt-sm=\"row\"] {\n    flex-direction: row; } }\n\n@media (min-width: 600px) and (max-width: 959px) {\n  [hide]:not([show-gt-xs]):not([show-gt-sm]):not([show-md]):not([show]), [hide-gt-xs]:not([show-gt-xs]):not([show-gt-sm]):not([show-md]):not([show]), [hide-gt-sm]:not([show-gt-xs]):not([show-gt-sm]):not([show-md]):not([show]) {\n    display: none; }\n  [hide-md]:not([show-md]):not([show]) {\n    display: none; }\n  [flex-order-md=\"-20\"] {\n    order: -20; }\n  [flex-order-md=\"-19\"] {\n    order: -19; }\n  [flex-order-md=\"-18\"] {\n    order: -18; }\n  [flex-order-md=\"-17\"] {\n    order: -17; }\n  [flex-order-md=\"-16\"] {\n    order: -16; }\n  [flex-order-md=\"-15\"] {\n    order: -15; }\n  [flex-order-md=\"-14\"] {\n    order: -14; }\n  [flex-order-md=\"-13\"] {\n    order: -13; }\n  [flex-order-md=\"-12\"] {\n    order: -12; }\n  [flex-order-md=\"-11\"] {\n    order: -11; }\n  [flex-order-md=\"-10\"] {\n    order: -10; }\n  [flex-order-md=\"-9\"] {\n    order: -9; }\n  [flex-order-md=\"-8\"] {\n    order: -8; }\n  [flex-order-md=\"-7\"] {\n    order: -7; }\n  [flex-order-md=\"-6\"] {\n    order: -6; }\n  [flex-order-md=\"-5\"] {\n    order: -5; }\n  [flex-order-md=\"-4\"] {\n    order: -4; }\n  [flex-order-md=\"-3\"] {\n    order: -3; }\n  [flex-order-md=\"-2\"] {\n    order: -2; }\n  [flex-order-md=\"-1\"] {\n    order: -1; }\n  [flex-order-md=\"0\"] {\n    order: 0; }\n  [flex-order-md=\"1\"] {\n    order: 1; }\n  [flex-order-md=\"2\"] {\n    order: 2; }\n  [flex-order-md=\"3\"] {\n    order: 3; }\n  [flex-order-md=\"4\"] {\n    order: 4; }\n  [flex-order-md=\"5\"] {\n    order: 5; }\n  [flex-order-md=\"6\"] {\n    order: 6; }\n  [flex-order-md=\"7\"] {\n    order: 7; }\n  [flex-order-md=\"8\"] {\n    order: 8; }\n  [flex-order-md=\"9\"] {\n    order: 9; }\n  [flex-order-md=\"10\"] {\n    order: 10; }\n  [flex-order-md=\"11\"] {\n    order: 11; }\n  [flex-order-md=\"12\"] {\n    order: 12; }\n  [flex-order-md=\"13\"] {\n    order: 13; }\n  [flex-order-md=\"14\"] {\n    order: 14; }\n  [flex-order-md=\"15\"] {\n    order: 15; }\n  [flex-order-md=\"16\"] {\n    order: 16; }\n  [flex-order-md=\"17\"] {\n    order: 17; }\n  [flex-order-md=\"18\"] {\n    order: 18; }\n  [flex-order-md=\"19\"] {\n    order: 19; }\n  [flex-order-md=\"20\"] {\n    order: 20; }\n  [flex-offset-md=\"0\"] {\n    margin-left: 0%; }\n  [flex-offset-md=\"5\"] {\n    margin-left: 5%; }\n  [flex-offset-md=\"10\"] {\n    margin-left: 10%; }\n  [flex-offset-md=\"15\"] {\n    margin-left: 15%; }\n  [flex-offset-md=\"20\"] {\n    margin-left: 20%; }\n  [flex-offset-md=\"25\"] {\n    margin-left: 25%; }\n  [flex-offset-md=\"30\"] {\n    margin-left: 30%; }\n  [flex-offset-md=\"35\"] {\n    margin-left: 35%; }\n  [flex-offset-md=\"40\"] {\n    margin-left: 40%; }\n  [flex-offset-md=\"45\"] {\n    margin-left: 45%; }\n  [flex-offset-md=\"50\"] {\n    margin-left: 50%; }\n  [flex-offset-md=\"55\"] {\n    margin-left: 55%; }\n  [flex-offset-md=\"60\"] {\n    margin-left: 60%; }\n  [flex-offset-md=\"65\"] {\n    margin-left: 65%; }\n  [flex-offset-md=\"70\"] {\n    margin-left: 70%; }\n  [flex-offset-md=\"75\"] {\n    margin-left: 75%; }\n  [flex-offset-md=\"80\"] {\n    margin-left: 80%; }\n  [flex-offset-md=\"85\"] {\n    margin-left: 85%; }\n  [flex-offset-md=\"90\"] {\n    margin-left: 90%; }\n  [flex-offset-md=\"95\"] {\n    margin-left: 95%; }\n  [flex-offset-md=\"33\"] {\n    margin-left: calc(100% / 3); }\n  [flex-offset-md=\"66\"] {\n    margin-left: calc(200% / 3); }\n  [layout-align-md],\n  [layout-align-md=\"start stretch\"] {\n    justify-content: flex-start;\n    align-content: stretch;\n    align-items: stretch; }\n  [layout-align-md=\"start\"],\n  [layout-align-md=\"start start\"],\n  [layout-align-md=\"start center\"],\n  [layout-align-md=\"start end\"],\n  [layout-align-md=\"start stretch\"] {\n    justify-content: start; }\n  [layout-align-md=\"center\"],\n  [layout-align-md=\"center start\"],\n  [layout-align-md=\"center center\"],\n  [layout-align-md=\"center end\"],\n  [layout-align-md=\"center stretch\"] {\n    justify-content: center; }\n  [layout-align-md=\"end\"],\n  [layout-align-md=\"end center\"],\n  [layout-align-md=\"end start\"],\n  [layout-align-md=\"end end\"],\n  [layout-align-md=\"end stretch\"] {\n    justify-content: flex-end; }\n  [layout-align-md=\"space-around\"],\n  [layout-align-md=\"space-around center\"],\n  [layout-align-md=\"space-around start\"],\n  [layout-align-md=\"space-around end\"],\n  [layout-align-md=\"space-around stretch\"] {\n    justify-content: space-around; }\n  [layout-align-md=\"space-between\"],\n  [layout-align-md=\"space-between center\"],\n  [layout-align-md=\"space-between start\"],\n  [layout-align-md=\"space-between end\"],\n  [layout-align-md=\"space-between stretch\"] {\n    justify-content: space-between; }\n  [layout-align-md=\"start start\"],\n  [layout-align-md=\"center start\"],\n  [layout-align-md=\"end start\"],\n  [layout-align-md=\"space-between start\"],\n  [layout-align-md=\"space-around start\"] {\n    align-items: flex-start;\n    align-content: flex-start; }\n  [layout-align-md=\"start center\"],\n  [layout-align-md=\"center center\"],\n  [layout-align-md=\"end center\"],\n  [layout-align-md=\"space-between center\"],\n  [layout-align-md=\"space-around center\"] {\n    align-items: center;\n    align-content: center;\n    max-width: 100%; }\n  [layout-align-md=\"start center\"] > *,\n  [layout-align-md=\"center center\"] > *,\n  [layout-align-md=\"end center\"] > *,\n  [layout-align-md=\"space-between center\"] > *,\n  [layout-align-md=\"space-around center\"] > * {\n    max-width: 100%;\n    box-sizing: border-box; }\n  [layout-align-md=\"start end\"],\n  [layout-align-md=\"center end\"],\n  [layout-align-md=\"end end\"],\n  [layout-align-md=\"space-between end\"],\n  [layout-align-md=\"space-around end\"] {\n    align-items: flex-end;\n    align-content: flex-end; }\n  [layout-align-md=\"start stretch\"],\n  [layout-align-md=\"center stretch\"],\n  [layout-align-md=\"end stretch\"],\n  [layout-align-md=\"space-between stretch\"],\n  [layout-align-md=\"space-around stretch\"] {\n    align-items: stretch;\n    align-content: stretch; }\n  [flex-md] {\n    flex: 1;\n    box-sizing: border-box; } }\n\n@media screen\\0  and (min-width: 600px) and (max-width: 959px) {\n  [flex-md] {\n    flex: 1 1 0%; } }\n\n@media (min-width: 600px) and (max-width: 959px) {\n  [flex-md-grow] {\n    flex: 1 1 100%;\n    box-sizing: border-box; }\n  [flex-md-initial] {\n    flex: 0 1 auto;\n    box-sizing: border-box; }\n  [flex-md-auto] {\n    flex: 1 1 auto;\n    box-sizing: border-box; }\n  [flex-md-none] {\n    flex: 0 0 auto;\n    box-sizing: border-box; }\n  [flex-md-noshrink] {\n    flex: 1 0 auto;\n    box-sizing: border-box; }\n  [flex-md-nogrow] {\n    flex: 0 1 auto;\n    box-sizing: border-box; }\n  [flex-md=\"0\"] {\n    flex: 1 1 0%;\n    max-width: 0%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-md=\"0\"],\n  [layout-md=\"row\"] > [flex-md=\"0\"] {\n    flex: 1 1 0%;\n    max-width: 0%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-md=\"0\"],\n  [layout-md=\"column\"] > [flex-md=\"0\"] {\n    flex: 1 1 0%;\n    max-width: 100%;\n    max-height: 0%;\n    box-sizing: border-box; }\n  [flex-md=\"5\"] {\n    flex: 1 1 5%;\n    max-width: 5%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-md=\"5\"],\n  [layout-md=\"row\"] > [flex-md=\"5\"] {\n    flex: 1 1 5%;\n    max-width: 5%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-md=\"5\"],\n  [layout-md=\"column\"] > [flex-md=\"5\"] {\n    flex: 1 1 5%;\n    max-width: 100%;\n    max-height: 5%;\n    box-sizing: border-box; }\n  [flex-md=\"10\"] {\n    flex: 1 1 10%;\n    max-width: 10%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-md=\"10\"],\n  [layout-md=\"row\"] > [flex-md=\"10\"] {\n    flex: 1 1 10%;\n    max-width: 10%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-md=\"10\"],\n  [layout-md=\"column\"] > [flex-md=\"10\"] {\n    flex: 1 1 10%;\n    max-width: 100%;\n    max-height: 10%;\n    box-sizing: border-box; }\n  [flex-md=\"15\"] {\n    flex: 1 1 15%;\n    max-width: 15%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-md=\"15\"],\n  [layout-md=\"row\"] > [flex-md=\"15\"] {\n    flex: 1 1 15%;\n    max-width: 15%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-md=\"15\"],\n  [layout-md=\"column\"] > [flex-md=\"15\"] {\n    flex: 1 1 15%;\n    max-width: 100%;\n    max-height: 15%;\n    box-sizing: border-box; }\n  [flex-md=\"20\"] {\n    flex: 1 1 20%;\n    max-width: 20%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-md=\"20\"],\n  [layout-md=\"row\"] > [flex-md=\"20\"] {\n    flex: 1 1 20%;\n    max-width: 20%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-md=\"20\"],\n  [layout-md=\"column\"] > [flex-md=\"20\"] {\n    flex: 1 1 20%;\n    max-width: 100%;\n    max-height: 20%;\n    box-sizing: border-box; }\n  [flex-md=\"25\"] {\n    flex: 1 1 25%;\n    max-width: 25%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-md=\"25\"],\n  [layout-md=\"row\"] > [flex-md=\"25\"] {\n    flex: 1 1 25%;\n    max-width: 25%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-md=\"25\"],\n  [layout-md=\"column\"] > [flex-md=\"25\"] {\n    flex: 1 1 25%;\n    max-width: 100%;\n    max-height: 25%;\n    box-sizing: border-box; }\n  [flex-md=\"30\"] {\n    flex: 1 1 30%;\n    max-width: 30%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-md=\"30\"],\n  [layout-md=\"row\"] > [flex-md=\"30\"] {\n    flex: 1 1 30%;\n    max-width: 30%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-md=\"30\"],\n  [layout-md=\"column\"] > [flex-md=\"30\"] {\n    flex: 1 1 30%;\n    max-width: 100%;\n    max-height: 30%;\n    box-sizing: border-box; }\n  [flex-md=\"35\"] {\n    flex: 1 1 35%;\n    max-width: 35%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-md=\"35\"],\n  [layout-md=\"row\"] > [flex-md=\"35\"] {\n    flex: 1 1 35%;\n    max-width: 35%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-md=\"35\"],\n  [layout-md=\"column\"] > [flex-md=\"35\"] {\n    flex: 1 1 35%;\n    max-width: 100%;\n    max-height: 35%;\n    box-sizing: border-box; }\n  [flex-md=\"40\"] {\n    flex: 1 1 40%;\n    max-width: 40%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-md=\"40\"],\n  [layout-md=\"row\"] > [flex-md=\"40\"] {\n    flex: 1 1 40%;\n    max-width: 40%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-md=\"40\"],\n  [layout-md=\"column\"] > [flex-md=\"40\"] {\n    flex: 1 1 40%;\n    max-width: 100%;\n    max-height: 40%;\n    box-sizing: border-box; }\n  [flex-md=\"45\"] {\n    flex: 1 1 45%;\n    max-width: 45%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-md=\"45\"],\n  [layout-md=\"row\"] > [flex-md=\"45\"] {\n    flex: 1 1 45%;\n    max-width: 45%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-md=\"45\"],\n  [layout-md=\"column\"] > [flex-md=\"45\"] {\n    flex: 1 1 45%;\n    max-width: 100%;\n    max-height: 45%;\n    box-sizing: border-box; }\n  [flex-md=\"50\"] {\n    flex: 1 1 50%;\n    max-width: 50%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-md=\"50\"],\n  [layout-md=\"row\"] > [flex-md=\"50\"] {\n    flex: 1 1 50%;\n    max-width: 50%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-md=\"50\"],\n  [layout-md=\"column\"] > [flex-md=\"50\"] {\n    flex: 1 1 50%;\n    max-width: 100%;\n    max-height: 50%;\n    box-sizing: border-box; }\n  [flex-md=\"55\"] {\n    flex: 1 1 55%;\n    max-width: 55%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-md=\"55\"],\n  [layout-md=\"row\"] > [flex-md=\"55\"] {\n    flex: 1 1 55%;\n    max-width: 55%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-md=\"55\"],\n  [layout-md=\"column\"] > [flex-md=\"55\"] {\n    flex: 1 1 55%;\n    max-width: 100%;\n    max-height: 55%;\n    box-sizing: border-box; }\n  [flex-md=\"60\"] {\n    flex: 1 1 60%;\n    max-width: 60%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-md=\"60\"],\n  [layout-md=\"row\"] > [flex-md=\"60\"] {\n    flex: 1 1 60%;\n    max-width: 60%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-md=\"60\"],\n  [layout-md=\"column\"] > [flex-md=\"60\"] {\n    flex: 1 1 60%;\n    max-width: 100%;\n    max-height: 60%;\n    box-sizing: border-box; }\n  [flex-md=\"65\"] {\n    flex: 1 1 65%;\n    max-width: 65%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-md=\"65\"],\n  [layout-md=\"row\"] > [flex-md=\"65\"] {\n    flex: 1 1 65%;\n    max-width: 65%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-md=\"65\"],\n  [layout-md=\"column\"] > [flex-md=\"65\"] {\n    flex: 1 1 65%;\n    max-width: 100%;\n    max-height: 65%;\n    box-sizing: border-box; }\n  [flex-md=\"70\"] {\n    flex: 1 1 70%;\n    max-width: 70%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-md=\"70\"],\n  [layout-md=\"row\"] > [flex-md=\"70\"] {\n    flex: 1 1 70%;\n    max-width: 70%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-md=\"70\"],\n  [layout-md=\"column\"] > [flex-md=\"70\"] {\n    flex: 1 1 70%;\n    max-width: 100%;\n    max-height: 70%;\n    box-sizing: border-box; }\n  [flex-md=\"75\"] {\n    flex: 1 1 75%;\n    max-width: 75%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-md=\"75\"],\n  [layout-md=\"row\"] > [flex-md=\"75\"] {\n    flex: 1 1 75%;\n    max-width: 75%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-md=\"75\"],\n  [layout-md=\"column\"] > [flex-md=\"75\"] {\n    flex: 1 1 75%;\n    max-width: 100%;\n    max-height: 75%;\n    box-sizing: border-box; }\n  [flex-md=\"80\"] {\n    flex: 1 1 80%;\n    max-width: 80%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-md=\"80\"],\n  [layout-md=\"row\"] > [flex-md=\"80\"] {\n    flex: 1 1 80%;\n    max-width: 80%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-md=\"80\"],\n  [layout-md=\"column\"] > [flex-md=\"80\"] {\n    flex: 1 1 80%;\n    max-width: 100%;\n    max-height: 80%;\n    box-sizing: border-box; }\n  [flex-md=\"85\"] {\n    flex: 1 1 85%;\n    max-width: 85%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-md=\"85\"],\n  [layout-md=\"row\"] > [flex-md=\"85\"] {\n    flex: 1 1 85%;\n    max-width: 85%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-md=\"85\"],\n  [layout-md=\"column\"] > [flex-md=\"85\"] {\n    flex: 1 1 85%;\n    max-width: 100%;\n    max-height: 85%;\n    box-sizing: border-box; }\n  [flex-md=\"90\"] {\n    flex: 1 1 90%;\n    max-width: 90%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-md=\"90\"],\n  [layout-md=\"row\"] > [flex-md=\"90\"] {\n    flex: 1 1 90%;\n    max-width: 90%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-md=\"90\"],\n  [layout-md=\"column\"] > [flex-md=\"90\"] {\n    flex: 1 1 90%;\n    max-width: 100%;\n    max-height: 90%;\n    box-sizing: border-box; }\n  [flex-md=\"95\"] {\n    flex: 1 1 95%;\n    max-width: 95%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-md=\"95\"],\n  [layout-md=\"row\"] > [flex-md=\"95\"] {\n    flex: 1 1 95%;\n    max-width: 95%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-md=\"95\"],\n  [layout-md=\"column\"] > [flex-md=\"95\"] {\n    flex: 1 1 95%;\n    max-width: 100%;\n    max-height: 95%;\n    box-sizing: border-box; }\n  [flex-md=\"100\"] {\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-md=\"100\"],\n  [layout-md=\"row\"] > [flex-md=\"100\"] {\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-md=\"100\"],\n  [layout-md=\"column\"] > [flex-md=\"100\"] {\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-md=\"33\"], [layout=\"row\"] > [flex-md=\"33\"], [layout-md=\"row\"] > [flex-md=\"33\"], [layout-md=\"row\"] > [flex-md=\"33\"] {\n    flex: 1 1 33%;\n    max-width: calc(100% / 3);\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-md=\"34\"], [layout=\"row\"] > [flex-md=\"34\"], [layout-md=\"row\"] > [flex-md=\"34\"], [layout-md=\"row\"] > [flex-md=\"34\"] {\n    flex: 1 1 34%;\n    max-width: 34%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-md=\"66\"], [layout=\"row\"] > [flex-md=\"66\"], [layout-md=\"row\"] > [flex-md=\"66\"], [layout-md=\"row\"] > [flex-md=\"66\"] {\n    flex: 1 1 66%;\n    max-width: calc(200% / 3);\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-md=\"67\"], [layout=\"row\"] > [flex-md=\"67\"], [layout-md=\"row\"] > [flex-md=\"67\"], [layout-md=\"row\"] > [flex-md=\"67\"] {\n    flex: 1 1 67%;\n    max-width: 67%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-md=\"33\"], [layout=\"column\"] > [flex-md=\"33\"], [layout-md=\"column\"] > [flex-md=\"33\"], [layout-md=\"column\"] > [flex-md=\"33\"] {\n    flex: 1 1 33%;\n    max-width: 100%;\n    max-height: calc(100% / 3);\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-md=\"34\"], [layout=\"column\"] > [flex-md=\"34\"], [layout-md=\"column\"] > [flex-md=\"34\"], [layout-md=\"column\"] > [flex-md=\"34\"] {\n    flex: 1 1 34%;\n    max-width: 100%;\n    max-height: 34%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-md=\"66\"], [layout=\"column\"] > [flex-md=\"66\"], [layout-md=\"column\"] > [flex-md=\"66\"], [layout-md=\"column\"] > [flex-md=\"66\"] {\n    flex: 1 1 66%;\n    max-width: 100%;\n    max-height: calc(200% / 3);\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-md=\"67\"], [layout=\"column\"] > [flex-md=\"67\"], [layout-md=\"column\"] > [flex-md=\"67\"], [layout-md=\"column\"] > [flex-md=\"67\"] {\n    flex: 1 1 67%;\n    max-width: 100%;\n    max-height: 67%;\n    box-sizing: border-box; }\n  [layout-md], [layout-md=\"column\"], [layout-md=\"row\"] {\n    box-sizing: border-box;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -moz-box;\n    display: -ms-flexbox;\n    display: flex; }\n  [layout-md=\"column\"] {\n    flex-direction: column; }\n  [layout-md=\"row\"] {\n    flex-direction: row; } }\n\n@media (min-width: 960px) {\n  [flex-order-gt-md=\"-20\"] {\n    order: -20; }\n  [flex-order-gt-md=\"-19\"] {\n    order: -19; }\n  [flex-order-gt-md=\"-18\"] {\n    order: -18; }\n  [flex-order-gt-md=\"-17\"] {\n    order: -17; }\n  [flex-order-gt-md=\"-16\"] {\n    order: -16; }\n  [flex-order-gt-md=\"-15\"] {\n    order: -15; }\n  [flex-order-gt-md=\"-14\"] {\n    order: -14; }\n  [flex-order-gt-md=\"-13\"] {\n    order: -13; }\n  [flex-order-gt-md=\"-12\"] {\n    order: -12; }\n  [flex-order-gt-md=\"-11\"] {\n    order: -11; }\n  [flex-order-gt-md=\"-10\"] {\n    order: -10; }\n  [flex-order-gt-md=\"-9\"] {\n    order: -9; }\n  [flex-order-gt-md=\"-8\"] {\n    order: -8; }\n  [flex-order-gt-md=\"-7\"] {\n    order: -7; }\n  [flex-order-gt-md=\"-6\"] {\n    order: -6; }\n  [flex-order-gt-md=\"-5\"] {\n    order: -5; }\n  [flex-order-gt-md=\"-4\"] {\n    order: -4; }\n  [flex-order-gt-md=\"-3\"] {\n    order: -3; }\n  [flex-order-gt-md=\"-2\"] {\n    order: -2; }\n  [flex-order-gt-md=\"-1\"] {\n    order: -1; }\n  [flex-order-gt-md=\"0\"] {\n    order: 0; }\n  [flex-order-gt-md=\"1\"] {\n    order: 1; }\n  [flex-order-gt-md=\"2\"] {\n    order: 2; }\n  [flex-order-gt-md=\"3\"] {\n    order: 3; }\n  [flex-order-gt-md=\"4\"] {\n    order: 4; }\n  [flex-order-gt-md=\"5\"] {\n    order: 5; }\n  [flex-order-gt-md=\"6\"] {\n    order: 6; }\n  [flex-order-gt-md=\"7\"] {\n    order: 7; }\n  [flex-order-gt-md=\"8\"] {\n    order: 8; }\n  [flex-order-gt-md=\"9\"] {\n    order: 9; }\n  [flex-order-gt-md=\"10\"] {\n    order: 10; }\n  [flex-order-gt-md=\"11\"] {\n    order: 11; }\n  [flex-order-gt-md=\"12\"] {\n    order: 12; }\n  [flex-order-gt-md=\"13\"] {\n    order: 13; }\n  [flex-order-gt-md=\"14\"] {\n    order: 14; }\n  [flex-order-gt-md=\"15\"] {\n    order: 15; }\n  [flex-order-gt-md=\"16\"] {\n    order: 16; }\n  [flex-order-gt-md=\"17\"] {\n    order: 17; }\n  [flex-order-gt-md=\"18\"] {\n    order: 18; }\n  [flex-order-gt-md=\"19\"] {\n    order: 19; }\n  [flex-order-gt-md=\"20\"] {\n    order: 20; }\n  [flex-offset-gt-md=\"0\"] {\n    margin-left: 0%; }\n  [flex-offset-gt-md=\"5\"] {\n    margin-left: 5%; }\n  [flex-offset-gt-md=\"10\"] {\n    margin-left: 10%; }\n  [flex-offset-gt-md=\"15\"] {\n    margin-left: 15%; }\n  [flex-offset-gt-md=\"20\"] {\n    margin-left: 20%; }\n  [flex-offset-gt-md=\"25\"] {\n    margin-left: 25%; }\n  [flex-offset-gt-md=\"30\"] {\n    margin-left: 30%; }\n  [flex-offset-gt-md=\"35\"] {\n    margin-left: 35%; }\n  [flex-offset-gt-md=\"40\"] {\n    margin-left: 40%; }\n  [flex-offset-gt-md=\"45\"] {\n    margin-left: 45%; }\n  [flex-offset-gt-md=\"50\"] {\n    margin-left: 50%; }\n  [flex-offset-gt-md=\"55\"] {\n    margin-left: 55%; }\n  [flex-offset-gt-md=\"60\"] {\n    margin-left: 60%; }\n  [flex-offset-gt-md=\"65\"] {\n    margin-left: 65%; }\n  [flex-offset-gt-md=\"70\"] {\n    margin-left: 70%; }\n  [flex-offset-gt-md=\"75\"] {\n    margin-left: 75%; }\n  [flex-offset-gt-md=\"80\"] {\n    margin-left: 80%; }\n  [flex-offset-gt-md=\"85\"] {\n    margin-left: 85%; }\n  [flex-offset-gt-md=\"90\"] {\n    margin-left: 90%; }\n  [flex-offset-gt-md=\"95\"] {\n    margin-left: 95%; }\n  [flex-offset-gt-md=\"33\"] {\n    margin-left: calc(100% / 3); }\n  [flex-offset-gt-md=\"66\"] {\n    margin-left: calc(200% / 3); }\n  [layout-align-gt-md],\n  [layout-align-gt-md=\"start stretch\"] {\n    justify-content: flex-start;\n    align-content: stretch;\n    align-items: stretch; }\n  [layout-align-gt-md=\"start\"],\n  [layout-align-gt-md=\"start start\"],\n  [layout-align-gt-md=\"start center\"],\n  [layout-align-gt-md=\"start end\"],\n  [layout-align-gt-md=\"start stretch\"] {\n    justify-content: start; }\n  [layout-align-gt-md=\"center\"],\n  [layout-align-gt-md=\"center start\"],\n  [layout-align-gt-md=\"center center\"],\n  [layout-align-gt-md=\"center end\"],\n  [layout-align-gt-md=\"center stretch\"] {\n    justify-content: center; }\n  [layout-align-gt-md=\"end\"],\n  [layout-align-gt-md=\"end center\"],\n  [layout-align-gt-md=\"end start\"],\n  [layout-align-gt-md=\"end end\"],\n  [layout-align-gt-md=\"end stretch\"] {\n    justify-content: flex-end; }\n  [layout-align-gt-md=\"space-around\"],\n  [layout-align-gt-md=\"space-around center\"],\n  [layout-align-gt-md=\"space-around start\"],\n  [layout-align-gt-md=\"space-around end\"],\n  [layout-align-gt-md=\"space-around stretch\"] {\n    justify-content: space-around; }\n  [layout-align-gt-md=\"space-between\"],\n  [layout-align-gt-md=\"space-between center\"],\n  [layout-align-gt-md=\"space-between start\"],\n  [layout-align-gt-md=\"space-between end\"],\n  [layout-align-gt-md=\"space-between stretch\"] {\n    justify-content: space-between; }\n  [layout-align-gt-md=\"start start\"],\n  [layout-align-gt-md=\"center start\"],\n  [layout-align-gt-md=\"end start\"],\n  [layout-align-gt-md=\"space-between start\"],\n  [layout-align-gt-md=\"space-around start\"] {\n    align-items: flex-start;\n    align-content: flex-start; }\n  [layout-align-gt-md=\"start center\"],\n  [layout-align-gt-md=\"center center\"],\n  [layout-align-gt-md=\"end center\"],\n  [layout-align-gt-md=\"space-between center\"],\n  [layout-align-gt-md=\"space-around center\"] {\n    align-items: center;\n    align-content: center;\n    max-width: 100%; }\n  [layout-align-gt-md=\"start center\"] > *,\n  [layout-align-gt-md=\"center center\"] > *,\n  [layout-align-gt-md=\"end center\"] > *,\n  [layout-align-gt-md=\"space-between center\"] > *,\n  [layout-align-gt-md=\"space-around center\"] > * {\n    max-width: 100%;\n    box-sizing: border-box; }\n  [layout-align-gt-md=\"start end\"],\n  [layout-align-gt-md=\"center end\"],\n  [layout-align-gt-md=\"end end\"],\n  [layout-align-gt-md=\"space-between end\"],\n  [layout-align-gt-md=\"space-around end\"] {\n    align-items: flex-end;\n    align-content: flex-end; }\n  [layout-align-gt-md=\"start stretch\"],\n  [layout-align-gt-md=\"center stretch\"],\n  [layout-align-gt-md=\"end stretch\"],\n  [layout-align-gt-md=\"space-between stretch\"],\n  [layout-align-gt-md=\"space-around stretch\"] {\n    align-items: stretch;\n    align-content: stretch; }\n  [flex-gt-md] {\n    flex: 1;\n    box-sizing: border-box; } }\n\n@media screen\\0  and (min-width: 960px) {\n  [flex-gt-md] {\n    flex: 1 1 0%; } }\n\n@media (min-width: 960px) {\n  [flex-gt-md-grow] {\n    flex: 1 1 100%;\n    box-sizing: border-box; }\n  [flex-gt-md-initial] {\n    flex: 0 1 auto;\n    box-sizing: border-box; }\n  [flex-gt-md-auto] {\n    flex: 1 1 auto;\n    box-sizing: border-box; }\n  [flex-gt-md-none] {\n    flex: 0 0 auto;\n    box-sizing: border-box; }\n  [flex-gt-md-noshrink] {\n    flex: 1 0 auto;\n    box-sizing: border-box; }\n  [flex-gt-md-nogrow] {\n    flex: 0 1 auto;\n    box-sizing: border-box; }\n  [flex-gt-md=\"0\"] {\n    flex: 1 1 0%;\n    max-width: 0%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-md=\"0\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"0\"] {\n    flex: 1 1 0%;\n    max-width: 0%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-md=\"0\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"0\"] {\n    flex: 1 1 0%;\n    max-width: 100%;\n    max-height: 0%;\n    box-sizing: border-box; }\n  [flex-gt-md=\"5\"] {\n    flex: 1 1 5%;\n    max-width: 5%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-md=\"5\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"5\"] {\n    flex: 1 1 5%;\n    max-width: 5%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-md=\"5\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"5\"] {\n    flex: 1 1 5%;\n    max-width: 100%;\n    max-height: 5%;\n    box-sizing: border-box; }\n  [flex-gt-md=\"10\"] {\n    flex: 1 1 10%;\n    max-width: 10%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-md=\"10\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"10\"] {\n    flex: 1 1 10%;\n    max-width: 10%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-md=\"10\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"10\"] {\n    flex: 1 1 10%;\n    max-width: 100%;\n    max-height: 10%;\n    box-sizing: border-box; }\n  [flex-gt-md=\"15\"] {\n    flex: 1 1 15%;\n    max-width: 15%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-md=\"15\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"15\"] {\n    flex: 1 1 15%;\n    max-width: 15%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-md=\"15\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"15\"] {\n    flex: 1 1 15%;\n    max-width: 100%;\n    max-height: 15%;\n    box-sizing: border-box; }\n  [flex-gt-md=\"20\"] {\n    flex: 1 1 20%;\n    max-width: 20%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-md=\"20\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"20\"] {\n    flex: 1 1 20%;\n    max-width: 20%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-md=\"20\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"20\"] {\n    flex: 1 1 20%;\n    max-width: 100%;\n    max-height: 20%;\n    box-sizing: border-box; }\n  [flex-gt-md=\"25\"] {\n    flex: 1 1 25%;\n    max-width: 25%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-md=\"25\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"25\"] {\n    flex: 1 1 25%;\n    max-width: 25%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-md=\"25\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"25\"] {\n    flex: 1 1 25%;\n    max-width: 100%;\n    max-height: 25%;\n    box-sizing: border-box; }\n  [flex-gt-md=\"30\"] {\n    flex: 1 1 30%;\n    max-width: 30%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-md=\"30\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"30\"] {\n    flex: 1 1 30%;\n    max-width: 30%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-md=\"30\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"30\"] {\n    flex: 1 1 30%;\n    max-width: 100%;\n    max-height: 30%;\n    box-sizing: border-box; }\n  [flex-gt-md=\"35\"] {\n    flex: 1 1 35%;\n    max-width: 35%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-md=\"35\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"35\"] {\n    flex: 1 1 35%;\n    max-width: 35%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-md=\"35\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"35\"] {\n    flex: 1 1 35%;\n    max-width: 100%;\n    max-height: 35%;\n    box-sizing: border-box; }\n  [flex-gt-md=\"40\"] {\n    flex: 1 1 40%;\n    max-width: 40%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-md=\"40\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"40\"] {\n    flex: 1 1 40%;\n    max-width: 40%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-md=\"40\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"40\"] {\n    flex: 1 1 40%;\n    max-width: 100%;\n    max-height: 40%;\n    box-sizing: border-box; }\n  [flex-gt-md=\"45\"] {\n    flex: 1 1 45%;\n    max-width: 45%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-md=\"45\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"45\"] {\n    flex: 1 1 45%;\n    max-width: 45%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-md=\"45\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"45\"] {\n    flex: 1 1 45%;\n    max-width: 100%;\n    max-height: 45%;\n    box-sizing: border-box; }\n  [flex-gt-md=\"50\"] {\n    flex: 1 1 50%;\n    max-width: 50%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-md=\"50\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"50\"] {\n    flex: 1 1 50%;\n    max-width: 50%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-md=\"50\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"50\"] {\n    flex: 1 1 50%;\n    max-width: 100%;\n    max-height: 50%;\n    box-sizing: border-box; }\n  [flex-gt-md=\"55\"] {\n    flex: 1 1 55%;\n    max-width: 55%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-md=\"55\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"55\"] {\n    flex: 1 1 55%;\n    max-width: 55%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-md=\"55\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"55\"] {\n    flex: 1 1 55%;\n    max-width: 100%;\n    max-height: 55%;\n    box-sizing: border-box; }\n  [flex-gt-md=\"60\"] {\n    flex: 1 1 60%;\n    max-width: 60%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-md=\"60\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"60\"] {\n    flex: 1 1 60%;\n    max-width: 60%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-md=\"60\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"60\"] {\n    flex: 1 1 60%;\n    max-width: 100%;\n    max-height: 60%;\n    box-sizing: border-box; }\n  [flex-gt-md=\"65\"] {\n    flex: 1 1 65%;\n    max-width: 65%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-md=\"65\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"65\"] {\n    flex: 1 1 65%;\n    max-width: 65%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-md=\"65\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"65\"] {\n    flex: 1 1 65%;\n    max-width: 100%;\n    max-height: 65%;\n    box-sizing: border-box; }\n  [flex-gt-md=\"70\"] {\n    flex: 1 1 70%;\n    max-width: 70%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-md=\"70\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"70\"] {\n    flex: 1 1 70%;\n    max-width: 70%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-md=\"70\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"70\"] {\n    flex: 1 1 70%;\n    max-width: 100%;\n    max-height: 70%;\n    box-sizing: border-box; }\n  [flex-gt-md=\"75\"] {\n    flex: 1 1 75%;\n    max-width: 75%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-md=\"75\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"75\"] {\n    flex: 1 1 75%;\n    max-width: 75%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-md=\"75\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"75\"] {\n    flex: 1 1 75%;\n    max-width: 100%;\n    max-height: 75%;\n    box-sizing: border-box; }\n  [flex-gt-md=\"80\"] {\n    flex: 1 1 80%;\n    max-width: 80%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-md=\"80\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"80\"] {\n    flex: 1 1 80%;\n    max-width: 80%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-md=\"80\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"80\"] {\n    flex: 1 1 80%;\n    max-width: 100%;\n    max-height: 80%;\n    box-sizing: border-box; }\n  [flex-gt-md=\"85\"] {\n    flex: 1 1 85%;\n    max-width: 85%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-md=\"85\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"85\"] {\n    flex: 1 1 85%;\n    max-width: 85%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-md=\"85\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"85\"] {\n    flex: 1 1 85%;\n    max-width: 100%;\n    max-height: 85%;\n    box-sizing: border-box; }\n  [flex-gt-md=\"90\"] {\n    flex: 1 1 90%;\n    max-width: 90%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-md=\"90\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"90\"] {\n    flex: 1 1 90%;\n    max-width: 90%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-md=\"90\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"90\"] {\n    flex: 1 1 90%;\n    max-width: 100%;\n    max-height: 90%;\n    box-sizing: border-box; }\n  [flex-gt-md=\"95\"] {\n    flex: 1 1 95%;\n    max-width: 95%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-md=\"95\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"95\"] {\n    flex: 1 1 95%;\n    max-width: 95%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-md=\"95\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"95\"] {\n    flex: 1 1 95%;\n    max-width: 100%;\n    max-height: 95%;\n    box-sizing: border-box; }\n  [flex-gt-md=\"100\"] {\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-md=\"100\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"100\"] {\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-md=\"100\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"100\"] {\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-md=\"33\"], [layout=\"row\"] > [flex-gt-md=\"33\"], [layout-gt-md=\"row\"] > [flex-gt-md=\"33\"], [layout-gt-md=\"row\"] > [flex-gt-md=\"33\"] {\n    flex: 1 1 33%;\n    max-width: calc(100% / 3);\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-md=\"34\"], [layout=\"row\"] > [flex-gt-md=\"34\"], [layout-gt-md=\"row\"] > [flex-gt-md=\"34\"], [layout-gt-md=\"row\"] > [flex-gt-md=\"34\"] {\n    flex: 1 1 34%;\n    max-width: 34%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-md=\"66\"], [layout=\"row\"] > [flex-gt-md=\"66\"], [layout-gt-md=\"row\"] > [flex-gt-md=\"66\"], [layout-gt-md=\"row\"] > [flex-gt-md=\"66\"] {\n    flex: 1 1 66%;\n    max-width: calc(200% / 3);\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-md=\"67\"], [layout=\"row\"] > [flex-gt-md=\"67\"], [layout-gt-md=\"row\"] > [flex-gt-md=\"67\"], [layout-gt-md=\"row\"] > [flex-gt-md=\"67\"] {\n    flex: 1 1 67%;\n    max-width: 67%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-md=\"33\"], [layout=\"column\"] > [flex-gt-md=\"33\"], [layout-gt-md=\"column\"] > [flex-gt-md=\"33\"], [layout-gt-md=\"column\"] > [flex-gt-md=\"33\"] {\n    flex: 1 1 33%;\n    max-width: 100%;\n    max-height: calc(100% / 3);\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-md=\"34\"], [layout=\"column\"] > [flex-gt-md=\"34\"], [layout-gt-md=\"column\"] > [flex-gt-md=\"34\"], [layout-gt-md=\"column\"] > [flex-gt-md=\"34\"] {\n    flex: 1 1 34%;\n    max-width: 100%;\n    max-height: 34%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-md=\"66\"], [layout=\"column\"] > [flex-gt-md=\"66\"], [layout-gt-md=\"column\"] > [flex-gt-md=\"66\"], [layout-gt-md=\"column\"] > [flex-gt-md=\"66\"] {\n    flex: 1 1 66%;\n    max-width: 100%;\n    max-height: calc(200% / 3);\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-md=\"67\"], [layout=\"column\"] > [flex-gt-md=\"67\"], [layout-gt-md=\"column\"] > [flex-gt-md=\"67\"], [layout-gt-md=\"column\"] > [flex-gt-md=\"67\"] {\n    flex: 1 1 67%;\n    max-width: 100%;\n    max-height: 67%;\n    box-sizing: border-box; }\n  [layout-gt-md], [layout-gt-md=\"column\"], [layout-gt-md=\"row\"] {\n    box-sizing: border-box;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -moz-box;\n    display: -ms-flexbox;\n    display: flex; }\n  [layout-gt-md=\"column\"] {\n    flex-direction: column; }\n  [layout-gt-md=\"row\"] {\n    flex-direction: row; } }\n\n@media (min-width: 960px) and (max-width: 1279px) {\n  [hide]:not([show-gt-xs]):not([show-gt-sm]):not([show-gt-md]):not([show-lg]):not([show]), [hide-gt-xs]:not([show-gt-xs]):not([show-gt-sm]):not([show-gt-md]):not([show-lg]):not([show]), [hide-gt-sm]:not([show-gt-xs]):not([show-gt-sm]):not([show-gt-md]):not([show-lg]):not([show]), [hide-gt-md]:not([show-gt-xs]):not([show-gt-sm]):not([show-gt-md]):not([show-lg]):not([show]) {\n    display: none; }\n  [hide-lg]:not([show-lg]):not([show]) {\n    display: none; }\n  [flex-order-lg=\"-20\"] {\n    order: -20; }\n  [flex-order-lg=\"-19\"] {\n    order: -19; }\n  [flex-order-lg=\"-18\"] {\n    order: -18; }\n  [flex-order-lg=\"-17\"] {\n    order: -17; }\n  [flex-order-lg=\"-16\"] {\n    order: -16; }\n  [flex-order-lg=\"-15\"] {\n    order: -15; }\n  [flex-order-lg=\"-14\"] {\n    order: -14; }\n  [flex-order-lg=\"-13\"] {\n    order: -13; }\n  [flex-order-lg=\"-12\"] {\n    order: -12; }\n  [flex-order-lg=\"-11\"] {\n    order: -11; }\n  [flex-order-lg=\"-10\"] {\n    order: -10; }\n  [flex-order-lg=\"-9\"] {\n    order: -9; }\n  [flex-order-lg=\"-8\"] {\n    order: -8; }\n  [flex-order-lg=\"-7\"] {\n    order: -7; }\n  [flex-order-lg=\"-6\"] {\n    order: -6; }\n  [flex-order-lg=\"-5\"] {\n    order: -5; }\n  [flex-order-lg=\"-4\"] {\n    order: -4; }\n  [flex-order-lg=\"-3\"] {\n    order: -3; }\n  [flex-order-lg=\"-2\"] {\n    order: -2; }\n  [flex-order-lg=\"-1\"] {\n    order: -1; }\n  [flex-order-lg=\"0\"] {\n    order: 0; }\n  [flex-order-lg=\"1\"] {\n    order: 1; }\n  [flex-order-lg=\"2\"] {\n    order: 2; }\n  [flex-order-lg=\"3\"] {\n    order: 3; }\n  [flex-order-lg=\"4\"] {\n    order: 4; }\n  [flex-order-lg=\"5\"] {\n    order: 5; }\n  [flex-order-lg=\"6\"] {\n    order: 6; }\n  [flex-order-lg=\"7\"] {\n    order: 7; }\n  [flex-order-lg=\"8\"] {\n    order: 8; }\n  [flex-order-lg=\"9\"] {\n    order: 9; }\n  [flex-order-lg=\"10\"] {\n    order: 10; }\n  [flex-order-lg=\"11\"] {\n    order: 11; }\n  [flex-order-lg=\"12\"] {\n    order: 12; }\n  [flex-order-lg=\"13\"] {\n    order: 13; }\n  [flex-order-lg=\"14\"] {\n    order: 14; }\n  [flex-order-lg=\"15\"] {\n    order: 15; }\n  [flex-order-lg=\"16\"] {\n    order: 16; }\n  [flex-order-lg=\"17\"] {\n    order: 17; }\n  [flex-order-lg=\"18\"] {\n    order: 18; }\n  [flex-order-lg=\"19\"] {\n    order: 19; }\n  [flex-order-lg=\"20\"] {\n    order: 20; }\n  [flex-offset-lg=\"0\"] {\n    margin-left: 0%; }\n  [flex-offset-lg=\"5\"] {\n    margin-left: 5%; }\n  [flex-offset-lg=\"10\"] {\n    margin-left: 10%; }\n  [flex-offset-lg=\"15\"] {\n    margin-left: 15%; }\n  [flex-offset-lg=\"20\"] {\n    margin-left: 20%; }\n  [flex-offset-lg=\"25\"] {\n    margin-left: 25%; }\n  [flex-offset-lg=\"30\"] {\n    margin-left: 30%; }\n  [flex-offset-lg=\"35\"] {\n    margin-left: 35%; }\n  [flex-offset-lg=\"40\"] {\n    margin-left: 40%; }\n  [flex-offset-lg=\"45\"] {\n    margin-left: 45%; }\n  [flex-offset-lg=\"50\"] {\n    margin-left: 50%; }\n  [flex-offset-lg=\"55\"] {\n    margin-left: 55%; }\n  [flex-offset-lg=\"60\"] {\n    margin-left: 60%; }\n  [flex-offset-lg=\"65\"] {\n    margin-left: 65%; }\n  [flex-offset-lg=\"70\"] {\n    margin-left: 70%; }\n  [flex-offset-lg=\"75\"] {\n    margin-left: 75%; }\n  [flex-offset-lg=\"80\"] {\n    margin-left: 80%; }\n  [flex-offset-lg=\"85\"] {\n    margin-left: 85%; }\n  [flex-offset-lg=\"90\"] {\n    margin-left: 90%; }\n  [flex-offset-lg=\"95\"] {\n    margin-left: 95%; }\n  [flex-offset-lg=\"33\"] {\n    margin-left: calc(100% / 3); }\n  [flex-offset-lg=\"66\"] {\n    margin-left: calc(200% / 3); }\n  [layout-align-lg],\n  [layout-align-lg=\"start stretch\"] {\n    justify-content: flex-start;\n    align-content: stretch;\n    align-items: stretch; }\n  [layout-align-lg=\"start\"],\n  [layout-align-lg=\"start start\"],\n  [layout-align-lg=\"start center\"],\n  [layout-align-lg=\"start end\"],\n  [layout-align-lg=\"start stretch\"] {\n    justify-content: start; }\n  [layout-align-lg=\"center\"],\n  [layout-align-lg=\"center start\"],\n  [layout-align-lg=\"center center\"],\n  [layout-align-lg=\"center end\"],\n  [layout-align-lg=\"center stretch\"] {\n    justify-content: center; }\n  [layout-align-lg=\"end\"],\n  [layout-align-lg=\"end center\"],\n  [layout-align-lg=\"end start\"],\n  [layout-align-lg=\"end end\"],\n  [layout-align-lg=\"end stretch\"] {\n    justify-content: flex-end; }\n  [layout-align-lg=\"space-around\"],\n  [layout-align-lg=\"space-around center\"],\n  [layout-align-lg=\"space-around start\"],\n  [layout-align-lg=\"space-around end\"],\n  [layout-align-lg=\"space-around stretch\"] {\n    justify-content: space-around; }\n  [layout-align-lg=\"space-between\"],\n  [layout-align-lg=\"space-between center\"],\n  [layout-align-lg=\"space-between start\"],\n  [layout-align-lg=\"space-between end\"],\n  [layout-align-lg=\"space-between stretch\"] {\n    justify-content: space-between; }\n  [layout-align-lg=\"start start\"],\n  [layout-align-lg=\"center start\"],\n  [layout-align-lg=\"end start\"],\n  [layout-align-lg=\"space-between start\"],\n  [layout-align-lg=\"space-around start\"] {\n    align-items: flex-start;\n    align-content: flex-start; }\n  [layout-align-lg=\"start center\"],\n  [layout-align-lg=\"center center\"],\n  [layout-align-lg=\"end center\"],\n  [layout-align-lg=\"space-between center\"],\n  [layout-align-lg=\"space-around center\"] {\n    align-items: center;\n    align-content: center;\n    max-width: 100%; }\n  [layout-align-lg=\"start center\"] > *,\n  [layout-align-lg=\"center center\"] > *,\n  [layout-align-lg=\"end center\"] > *,\n  [layout-align-lg=\"space-between center\"] > *,\n  [layout-align-lg=\"space-around center\"] > * {\n    max-width: 100%;\n    box-sizing: border-box; }\n  [layout-align-lg=\"start end\"],\n  [layout-align-lg=\"center end\"],\n  [layout-align-lg=\"end end\"],\n  [layout-align-lg=\"space-between end\"],\n  [layout-align-lg=\"space-around end\"] {\n    align-items: flex-end;\n    align-content: flex-end; }\n  [layout-align-lg=\"start stretch\"],\n  [layout-align-lg=\"center stretch\"],\n  [layout-align-lg=\"end stretch\"],\n  [layout-align-lg=\"space-between stretch\"],\n  [layout-align-lg=\"space-around stretch\"] {\n    align-items: stretch;\n    align-content: stretch; }\n  [flex-lg] {\n    flex: 1;\n    box-sizing: border-box; } }\n\n@media screen\\0  and (min-width: 960px) and (max-width: 1279px) {\n  [flex-lg] {\n    flex: 1 1 0%; } }\n\n@media (min-width: 960px) and (max-width: 1279px) {\n  [flex-lg-grow] {\n    flex: 1 1 100%;\n    box-sizing: border-box; }\n  [flex-lg-initial] {\n    flex: 0 1 auto;\n    box-sizing: border-box; }\n  [flex-lg-auto] {\n    flex: 1 1 auto;\n    box-sizing: border-box; }\n  [flex-lg-none] {\n    flex: 0 0 auto;\n    box-sizing: border-box; }\n  [flex-lg-noshrink] {\n    flex: 1 0 auto;\n    box-sizing: border-box; }\n  [flex-lg-nogrow] {\n    flex: 0 1 auto;\n    box-sizing: border-box; }\n  [flex-lg=\"0\"] {\n    flex: 1 1 0%;\n    max-width: 0%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-lg=\"0\"],\n  [layout-lg=\"row\"] > [flex-lg=\"0\"] {\n    flex: 1 1 0%;\n    max-width: 0%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-lg=\"0\"],\n  [layout-lg=\"column\"] > [flex-lg=\"0\"] {\n    flex: 1 1 0%;\n    max-width: 100%;\n    max-height: 0%;\n    box-sizing: border-box; }\n  [flex-lg=\"5\"] {\n    flex: 1 1 5%;\n    max-width: 5%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-lg=\"5\"],\n  [layout-lg=\"row\"] > [flex-lg=\"5\"] {\n    flex: 1 1 5%;\n    max-width: 5%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-lg=\"5\"],\n  [layout-lg=\"column\"] > [flex-lg=\"5\"] {\n    flex: 1 1 5%;\n    max-width: 100%;\n    max-height: 5%;\n    box-sizing: border-box; }\n  [flex-lg=\"10\"] {\n    flex: 1 1 10%;\n    max-width: 10%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-lg=\"10\"],\n  [layout-lg=\"row\"] > [flex-lg=\"10\"] {\n    flex: 1 1 10%;\n    max-width: 10%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-lg=\"10\"],\n  [layout-lg=\"column\"] > [flex-lg=\"10\"] {\n    flex: 1 1 10%;\n    max-width: 100%;\n    max-height: 10%;\n    box-sizing: border-box; }\n  [flex-lg=\"15\"] {\n    flex: 1 1 15%;\n    max-width: 15%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-lg=\"15\"],\n  [layout-lg=\"row\"] > [flex-lg=\"15\"] {\n    flex: 1 1 15%;\n    max-width: 15%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-lg=\"15\"],\n  [layout-lg=\"column\"] > [flex-lg=\"15\"] {\n    flex: 1 1 15%;\n    max-width: 100%;\n    max-height: 15%;\n    box-sizing: border-box; }\n  [flex-lg=\"20\"] {\n    flex: 1 1 20%;\n    max-width: 20%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-lg=\"20\"],\n  [layout-lg=\"row\"] > [flex-lg=\"20\"] {\n    flex: 1 1 20%;\n    max-width: 20%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-lg=\"20\"],\n  [layout-lg=\"column\"] > [flex-lg=\"20\"] {\n    flex: 1 1 20%;\n    max-width: 100%;\n    max-height: 20%;\n    box-sizing: border-box; }\n  [flex-lg=\"25\"] {\n    flex: 1 1 25%;\n    max-width: 25%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-lg=\"25\"],\n  [layout-lg=\"row\"] > [flex-lg=\"25\"] {\n    flex: 1 1 25%;\n    max-width: 25%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-lg=\"25\"],\n  [layout-lg=\"column\"] > [flex-lg=\"25\"] {\n    flex: 1 1 25%;\n    max-width: 100%;\n    max-height: 25%;\n    box-sizing: border-box; }\n  [flex-lg=\"30\"] {\n    flex: 1 1 30%;\n    max-width: 30%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-lg=\"30\"],\n  [layout-lg=\"row\"] > [flex-lg=\"30\"] {\n    flex: 1 1 30%;\n    max-width: 30%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-lg=\"30\"],\n  [layout-lg=\"column\"] > [flex-lg=\"30\"] {\n    flex: 1 1 30%;\n    max-width: 100%;\n    max-height: 30%;\n    box-sizing: border-box; }\n  [flex-lg=\"35\"] {\n    flex: 1 1 35%;\n    max-width: 35%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-lg=\"35\"],\n  [layout-lg=\"row\"] > [flex-lg=\"35\"] {\n    flex: 1 1 35%;\n    max-width: 35%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-lg=\"35\"],\n  [layout-lg=\"column\"] > [flex-lg=\"35\"] {\n    flex: 1 1 35%;\n    max-width: 100%;\n    max-height: 35%;\n    box-sizing: border-box; }\n  [flex-lg=\"40\"] {\n    flex: 1 1 40%;\n    max-width: 40%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-lg=\"40\"],\n  [layout-lg=\"row\"] > [flex-lg=\"40\"] {\n    flex: 1 1 40%;\n    max-width: 40%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-lg=\"40\"],\n  [layout-lg=\"column\"] > [flex-lg=\"40\"] {\n    flex: 1 1 40%;\n    max-width: 100%;\n    max-height: 40%;\n    box-sizing: border-box; }\n  [flex-lg=\"45\"] {\n    flex: 1 1 45%;\n    max-width: 45%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-lg=\"45\"],\n  [layout-lg=\"row\"] > [flex-lg=\"45\"] {\n    flex: 1 1 45%;\n    max-width: 45%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-lg=\"45\"],\n  [layout-lg=\"column\"] > [flex-lg=\"45\"] {\n    flex: 1 1 45%;\n    max-width: 100%;\n    max-height: 45%;\n    box-sizing: border-box; }\n  [flex-lg=\"50\"] {\n    flex: 1 1 50%;\n    max-width: 50%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-lg=\"50\"],\n  [layout-lg=\"row\"] > [flex-lg=\"50\"] {\n    flex: 1 1 50%;\n    max-width: 50%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-lg=\"50\"],\n  [layout-lg=\"column\"] > [flex-lg=\"50\"] {\n    flex: 1 1 50%;\n    max-width: 100%;\n    max-height: 50%;\n    box-sizing: border-box; }\n  [flex-lg=\"55\"] {\n    flex: 1 1 55%;\n    max-width: 55%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-lg=\"55\"],\n  [layout-lg=\"row\"] > [flex-lg=\"55\"] {\n    flex: 1 1 55%;\n    max-width: 55%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-lg=\"55\"],\n  [layout-lg=\"column\"] > [flex-lg=\"55\"] {\n    flex: 1 1 55%;\n    max-width: 100%;\n    max-height: 55%;\n    box-sizing: border-box; }\n  [flex-lg=\"60\"] {\n    flex: 1 1 60%;\n    max-width: 60%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-lg=\"60\"],\n  [layout-lg=\"row\"] > [flex-lg=\"60\"] {\n    flex: 1 1 60%;\n    max-width: 60%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-lg=\"60\"],\n  [layout-lg=\"column\"] > [flex-lg=\"60\"] {\n    flex: 1 1 60%;\n    max-width: 100%;\n    max-height: 60%;\n    box-sizing: border-box; }\n  [flex-lg=\"65\"] {\n    flex: 1 1 65%;\n    max-width: 65%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-lg=\"65\"],\n  [layout-lg=\"row\"] > [flex-lg=\"65\"] {\n    flex: 1 1 65%;\n    max-width: 65%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-lg=\"65\"],\n  [layout-lg=\"column\"] > [flex-lg=\"65\"] {\n    flex: 1 1 65%;\n    max-width: 100%;\n    max-height: 65%;\n    box-sizing: border-box; }\n  [flex-lg=\"70\"] {\n    flex: 1 1 70%;\n    max-width: 70%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-lg=\"70\"],\n  [layout-lg=\"row\"] > [flex-lg=\"70\"] {\n    flex: 1 1 70%;\n    max-width: 70%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-lg=\"70\"],\n  [layout-lg=\"column\"] > [flex-lg=\"70\"] {\n    flex: 1 1 70%;\n    max-width: 100%;\n    max-height: 70%;\n    box-sizing: border-box; }\n  [flex-lg=\"75\"] {\n    flex: 1 1 75%;\n    max-width: 75%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-lg=\"75\"],\n  [layout-lg=\"row\"] > [flex-lg=\"75\"] {\n    flex: 1 1 75%;\n    max-width: 75%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-lg=\"75\"],\n  [layout-lg=\"column\"] > [flex-lg=\"75\"] {\n    flex: 1 1 75%;\n    max-width: 100%;\n    max-height: 75%;\n    box-sizing: border-box; }\n  [flex-lg=\"80\"] {\n    flex: 1 1 80%;\n    max-width: 80%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-lg=\"80\"],\n  [layout-lg=\"row\"] > [flex-lg=\"80\"] {\n    flex: 1 1 80%;\n    max-width: 80%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-lg=\"80\"],\n  [layout-lg=\"column\"] > [flex-lg=\"80\"] {\n    flex: 1 1 80%;\n    max-width: 100%;\n    max-height: 80%;\n    box-sizing: border-box; }\n  [flex-lg=\"85\"] {\n    flex: 1 1 85%;\n    max-width: 85%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-lg=\"85\"],\n  [layout-lg=\"row\"] > [flex-lg=\"85\"] {\n    flex: 1 1 85%;\n    max-width: 85%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-lg=\"85\"],\n  [layout-lg=\"column\"] > [flex-lg=\"85\"] {\n    flex: 1 1 85%;\n    max-width: 100%;\n    max-height: 85%;\n    box-sizing: border-box; }\n  [flex-lg=\"90\"] {\n    flex: 1 1 90%;\n    max-width: 90%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-lg=\"90\"],\n  [layout-lg=\"row\"] > [flex-lg=\"90\"] {\n    flex: 1 1 90%;\n    max-width: 90%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-lg=\"90\"],\n  [layout-lg=\"column\"] > [flex-lg=\"90\"] {\n    flex: 1 1 90%;\n    max-width: 100%;\n    max-height: 90%;\n    box-sizing: border-box; }\n  [flex-lg=\"95\"] {\n    flex: 1 1 95%;\n    max-width: 95%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-lg=\"95\"],\n  [layout-lg=\"row\"] > [flex-lg=\"95\"] {\n    flex: 1 1 95%;\n    max-width: 95%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-lg=\"95\"],\n  [layout-lg=\"column\"] > [flex-lg=\"95\"] {\n    flex: 1 1 95%;\n    max-width: 100%;\n    max-height: 95%;\n    box-sizing: border-box; }\n  [flex-lg=\"100\"] {\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-lg=\"100\"],\n  [layout-lg=\"row\"] > [flex-lg=\"100\"] {\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-lg=\"100\"],\n  [layout-lg=\"column\"] > [flex-lg=\"100\"] {\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-lg=\"33\"], [layout=\"row\"] > [flex-lg=\"33\"], [layout-lg=\"row\"] > [flex-lg=\"33\"], [layout-lg=\"row\"] > [flex-lg=\"33\"] {\n    flex: 1 1 33%;\n    max-width: calc(100% / 3);\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-lg=\"34\"], [layout=\"row\"] > [flex-lg=\"34\"], [layout-lg=\"row\"] > [flex-lg=\"34\"], [layout-lg=\"row\"] > [flex-lg=\"34\"] {\n    flex: 1 1 34%;\n    max-width: 34%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-lg=\"66\"], [layout=\"row\"] > [flex-lg=\"66\"], [layout-lg=\"row\"] > [flex-lg=\"66\"], [layout-lg=\"row\"] > [flex-lg=\"66\"] {\n    flex: 1 1 66%;\n    max-width: calc(200% / 3);\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-lg=\"67\"], [layout=\"row\"] > [flex-lg=\"67\"], [layout-lg=\"row\"] > [flex-lg=\"67\"], [layout-lg=\"row\"] > [flex-lg=\"67\"] {\n    flex: 1 1 67%;\n    max-width: 67%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-lg=\"33\"], [layout=\"column\"] > [flex-lg=\"33\"], [layout-lg=\"column\"] > [flex-lg=\"33\"], [layout-lg=\"column\"] > [flex-lg=\"33\"] {\n    flex: 1 1 33%;\n    max-width: 100%;\n    max-height: calc(100% / 3);\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-lg=\"34\"], [layout=\"column\"] > [flex-lg=\"34\"], [layout-lg=\"column\"] > [flex-lg=\"34\"], [layout-lg=\"column\"] > [flex-lg=\"34\"] {\n    flex: 1 1 34%;\n    max-width: 100%;\n    max-height: 34%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-lg=\"66\"], [layout=\"column\"] > [flex-lg=\"66\"], [layout-lg=\"column\"] > [flex-lg=\"66\"], [layout-lg=\"column\"] > [flex-lg=\"66\"] {\n    flex: 1 1 66%;\n    max-width: 100%;\n    max-height: calc(200% / 3);\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-lg=\"67\"], [layout=\"column\"] > [flex-lg=\"67\"], [layout-lg=\"column\"] > [flex-lg=\"67\"], [layout-lg=\"column\"] > [flex-lg=\"67\"] {\n    flex: 1 1 67%;\n    max-width: 100%;\n    max-height: 67%;\n    box-sizing: border-box; }\n  [layout-lg], [layout-lg=\"column\"], [layout-lg=\"row\"] {\n    box-sizing: border-box;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -moz-box;\n    display: -ms-flexbox;\n    display: flex; }\n  [layout-lg=\"column\"] {\n    flex-direction: column; }\n  [layout-lg=\"row\"] {\n    flex-direction: row; } }\n\n@media (min-width: 1280px) {\n  [flex-order-gt-lg=\"-20\"] {\n    order: -20; }\n  [flex-order-gt-lg=\"-19\"] {\n    order: -19; }\n  [flex-order-gt-lg=\"-18\"] {\n    order: -18; }\n  [flex-order-gt-lg=\"-17\"] {\n    order: -17; }\n  [flex-order-gt-lg=\"-16\"] {\n    order: -16; }\n  [flex-order-gt-lg=\"-15\"] {\n    order: -15; }\n  [flex-order-gt-lg=\"-14\"] {\n    order: -14; }\n  [flex-order-gt-lg=\"-13\"] {\n    order: -13; }\n  [flex-order-gt-lg=\"-12\"] {\n    order: -12; }\n  [flex-order-gt-lg=\"-11\"] {\n    order: -11; }\n  [flex-order-gt-lg=\"-10\"] {\n    order: -10; }\n  [flex-order-gt-lg=\"-9\"] {\n    order: -9; }\n  [flex-order-gt-lg=\"-8\"] {\n    order: -8; }\n  [flex-order-gt-lg=\"-7\"] {\n    order: -7; }\n  [flex-order-gt-lg=\"-6\"] {\n    order: -6; }\n  [flex-order-gt-lg=\"-5\"] {\n    order: -5; }\n  [flex-order-gt-lg=\"-4\"] {\n    order: -4; }\n  [flex-order-gt-lg=\"-3\"] {\n    order: -3; }\n  [flex-order-gt-lg=\"-2\"] {\n    order: -2; }\n  [flex-order-gt-lg=\"-1\"] {\n    order: -1; }\n  [flex-order-gt-lg=\"0\"] {\n    order: 0; }\n  [flex-order-gt-lg=\"1\"] {\n    order: 1; }\n  [flex-order-gt-lg=\"2\"] {\n    order: 2; }\n  [flex-order-gt-lg=\"3\"] {\n    order: 3; }\n  [flex-order-gt-lg=\"4\"] {\n    order: 4; }\n  [flex-order-gt-lg=\"5\"] {\n    order: 5; }\n  [flex-order-gt-lg=\"6\"] {\n    order: 6; }\n  [flex-order-gt-lg=\"7\"] {\n    order: 7; }\n  [flex-order-gt-lg=\"8\"] {\n    order: 8; }\n  [flex-order-gt-lg=\"9\"] {\n    order: 9; }\n  [flex-order-gt-lg=\"10\"] {\n    order: 10; }\n  [flex-order-gt-lg=\"11\"] {\n    order: 11; }\n  [flex-order-gt-lg=\"12\"] {\n    order: 12; }\n  [flex-order-gt-lg=\"13\"] {\n    order: 13; }\n  [flex-order-gt-lg=\"14\"] {\n    order: 14; }\n  [flex-order-gt-lg=\"15\"] {\n    order: 15; }\n  [flex-order-gt-lg=\"16\"] {\n    order: 16; }\n  [flex-order-gt-lg=\"17\"] {\n    order: 17; }\n  [flex-order-gt-lg=\"18\"] {\n    order: 18; }\n  [flex-order-gt-lg=\"19\"] {\n    order: 19; }\n  [flex-order-gt-lg=\"20\"] {\n    order: 20; }\n  [flex-offset-gt-lg=\"0\"] {\n    margin-left: 0%; }\n  [flex-offset-gt-lg=\"5\"] {\n    margin-left: 5%; }\n  [flex-offset-gt-lg=\"10\"] {\n    margin-left: 10%; }\n  [flex-offset-gt-lg=\"15\"] {\n    margin-left: 15%; }\n  [flex-offset-gt-lg=\"20\"] {\n    margin-left: 20%; }\n  [flex-offset-gt-lg=\"25\"] {\n    margin-left: 25%; }\n  [flex-offset-gt-lg=\"30\"] {\n    margin-left: 30%; }\n  [flex-offset-gt-lg=\"35\"] {\n    margin-left: 35%; }\n  [flex-offset-gt-lg=\"40\"] {\n    margin-left: 40%; }\n  [flex-offset-gt-lg=\"45\"] {\n    margin-left: 45%; }\n  [flex-offset-gt-lg=\"50\"] {\n    margin-left: 50%; }\n  [flex-offset-gt-lg=\"55\"] {\n    margin-left: 55%; }\n  [flex-offset-gt-lg=\"60\"] {\n    margin-left: 60%; }\n  [flex-offset-gt-lg=\"65\"] {\n    margin-left: 65%; }\n  [flex-offset-gt-lg=\"70\"] {\n    margin-left: 70%; }\n  [flex-offset-gt-lg=\"75\"] {\n    margin-left: 75%; }\n  [flex-offset-gt-lg=\"80\"] {\n    margin-left: 80%; }\n  [flex-offset-gt-lg=\"85\"] {\n    margin-left: 85%; }\n  [flex-offset-gt-lg=\"90\"] {\n    margin-left: 90%; }\n  [flex-offset-gt-lg=\"95\"] {\n    margin-left: 95%; }\n  [flex-offset-gt-lg=\"33\"] {\n    margin-left: calc(100% / 3); }\n  [flex-offset-gt-lg=\"66\"] {\n    margin-left: calc(200% / 3); }\n  [layout-align-gt-lg],\n  [layout-align-gt-lg=\"start stretch\"] {\n    justify-content: flex-start;\n    align-content: stretch;\n    align-items: stretch; }\n  [layout-align-gt-lg=\"start\"],\n  [layout-align-gt-lg=\"start start\"],\n  [layout-align-gt-lg=\"start center\"],\n  [layout-align-gt-lg=\"start end\"],\n  [layout-align-gt-lg=\"start stretch\"] {\n    justify-content: start; }\n  [layout-align-gt-lg=\"center\"],\n  [layout-align-gt-lg=\"center start\"],\n  [layout-align-gt-lg=\"center center\"],\n  [layout-align-gt-lg=\"center end\"],\n  [layout-align-gt-lg=\"center stretch\"] {\n    justify-content: center; }\n  [layout-align-gt-lg=\"end\"],\n  [layout-align-gt-lg=\"end center\"],\n  [layout-align-gt-lg=\"end start\"],\n  [layout-align-gt-lg=\"end end\"],\n  [layout-align-gt-lg=\"end stretch\"] {\n    justify-content: flex-end; }\n  [layout-align-gt-lg=\"space-around\"],\n  [layout-align-gt-lg=\"space-around center\"],\n  [layout-align-gt-lg=\"space-around start\"],\n  [layout-align-gt-lg=\"space-around end\"],\n  [layout-align-gt-lg=\"space-around stretch\"] {\n    justify-content: space-around; }\n  [layout-align-gt-lg=\"space-between\"],\n  [layout-align-gt-lg=\"space-between center\"],\n  [layout-align-gt-lg=\"space-between start\"],\n  [layout-align-gt-lg=\"space-between end\"],\n  [layout-align-gt-lg=\"space-between stretch\"] {\n    justify-content: space-between; }\n  [layout-align-gt-lg=\"start start\"],\n  [layout-align-gt-lg=\"center start\"],\n  [layout-align-gt-lg=\"end start\"],\n  [layout-align-gt-lg=\"space-between start\"],\n  [layout-align-gt-lg=\"space-around start\"] {\n    align-items: flex-start;\n    align-content: flex-start; }\n  [layout-align-gt-lg=\"start center\"],\n  [layout-align-gt-lg=\"center center\"],\n  [layout-align-gt-lg=\"end center\"],\n  [layout-align-gt-lg=\"space-between center\"],\n  [layout-align-gt-lg=\"space-around center\"] {\n    align-items: center;\n    align-content: center;\n    max-width: 100%; }\n  [layout-align-gt-lg=\"start center\"] > *,\n  [layout-align-gt-lg=\"center center\"] > *,\n  [layout-align-gt-lg=\"end center\"] > *,\n  [layout-align-gt-lg=\"space-between center\"] > *,\n  [layout-align-gt-lg=\"space-around center\"] > * {\n    max-width: 100%;\n    box-sizing: border-box; }\n  [layout-align-gt-lg=\"start end\"],\n  [layout-align-gt-lg=\"center end\"],\n  [layout-align-gt-lg=\"end end\"],\n  [layout-align-gt-lg=\"space-between end\"],\n  [layout-align-gt-lg=\"space-around end\"] {\n    align-items: flex-end;\n    align-content: flex-end; }\n  [layout-align-gt-lg=\"start stretch\"],\n  [layout-align-gt-lg=\"center stretch\"],\n  [layout-align-gt-lg=\"end stretch\"],\n  [layout-align-gt-lg=\"space-between stretch\"],\n  [layout-align-gt-lg=\"space-around stretch\"] {\n    align-items: stretch;\n    align-content: stretch; }\n  [flex-gt-lg] {\n    flex: 1;\n    box-sizing: border-box; } }\n\n@media screen\\0  and (min-width: 1280px) {\n  [flex-gt-lg] {\n    flex: 1 1 0%; } }\n\n@media (min-width: 1280px) {\n  [flex-gt-lg-grow] {\n    flex: 1 1 100%;\n    box-sizing: border-box; }\n  [flex-gt-lg-initial] {\n    flex: 0 1 auto;\n    box-sizing: border-box; }\n  [flex-gt-lg-auto] {\n    flex: 1 1 auto;\n    box-sizing: border-box; }\n  [flex-gt-lg-none] {\n    flex: 0 0 auto;\n    box-sizing: border-box; }\n  [flex-gt-lg-noshrink] {\n    flex: 1 0 auto;\n    box-sizing: border-box; }\n  [flex-gt-lg-nogrow] {\n    flex: 0 1 auto;\n    box-sizing: border-box; }\n  [flex-gt-lg=\"0\"] {\n    flex: 1 1 0%;\n    max-width: 0%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-lg=\"0\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"0\"] {\n    flex: 1 1 0%;\n    max-width: 0%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-lg=\"0\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"0\"] {\n    flex: 1 1 0%;\n    max-width: 100%;\n    max-height: 0%;\n    box-sizing: border-box; }\n  [flex-gt-lg=\"5\"] {\n    flex: 1 1 5%;\n    max-width: 5%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-lg=\"5\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"5\"] {\n    flex: 1 1 5%;\n    max-width: 5%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-lg=\"5\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"5\"] {\n    flex: 1 1 5%;\n    max-width: 100%;\n    max-height: 5%;\n    box-sizing: border-box; }\n  [flex-gt-lg=\"10\"] {\n    flex: 1 1 10%;\n    max-width: 10%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-lg=\"10\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"10\"] {\n    flex: 1 1 10%;\n    max-width: 10%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-lg=\"10\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"10\"] {\n    flex: 1 1 10%;\n    max-width: 100%;\n    max-height: 10%;\n    box-sizing: border-box; }\n  [flex-gt-lg=\"15\"] {\n    flex: 1 1 15%;\n    max-width: 15%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-lg=\"15\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"15\"] {\n    flex: 1 1 15%;\n    max-width: 15%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-lg=\"15\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"15\"] {\n    flex: 1 1 15%;\n    max-width: 100%;\n    max-height: 15%;\n    box-sizing: border-box; }\n  [flex-gt-lg=\"20\"] {\n    flex: 1 1 20%;\n    max-width: 20%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-lg=\"20\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"20\"] {\n    flex: 1 1 20%;\n    max-width: 20%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-lg=\"20\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"20\"] {\n    flex: 1 1 20%;\n    max-width: 100%;\n    max-height: 20%;\n    box-sizing: border-box; }\n  [flex-gt-lg=\"25\"] {\n    flex: 1 1 25%;\n    max-width: 25%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-lg=\"25\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"25\"] {\n    flex: 1 1 25%;\n    max-width: 25%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-lg=\"25\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"25\"] {\n    flex: 1 1 25%;\n    max-width: 100%;\n    max-height: 25%;\n    box-sizing: border-box; }\n  [flex-gt-lg=\"30\"] {\n    flex: 1 1 30%;\n    max-width: 30%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-lg=\"30\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"30\"] {\n    flex: 1 1 30%;\n    max-width: 30%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-lg=\"30\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"30\"] {\n    flex: 1 1 30%;\n    max-width: 100%;\n    max-height: 30%;\n    box-sizing: border-box; }\n  [flex-gt-lg=\"35\"] {\n    flex: 1 1 35%;\n    max-width: 35%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-lg=\"35\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"35\"] {\n    flex: 1 1 35%;\n    max-width: 35%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-lg=\"35\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"35\"] {\n    flex: 1 1 35%;\n    max-width: 100%;\n    max-height: 35%;\n    box-sizing: border-box; }\n  [flex-gt-lg=\"40\"] {\n    flex: 1 1 40%;\n    max-width: 40%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-lg=\"40\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"40\"] {\n    flex: 1 1 40%;\n    max-width: 40%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-lg=\"40\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"40\"] {\n    flex: 1 1 40%;\n    max-width: 100%;\n    max-height: 40%;\n    box-sizing: border-box; }\n  [flex-gt-lg=\"45\"] {\n    flex: 1 1 45%;\n    max-width: 45%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-lg=\"45\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"45\"] {\n    flex: 1 1 45%;\n    max-width: 45%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-lg=\"45\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"45\"] {\n    flex: 1 1 45%;\n    max-width: 100%;\n    max-height: 45%;\n    box-sizing: border-box; }\n  [flex-gt-lg=\"50\"] {\n    flex: 1 1 50%;\n    max-width: 50%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-lg=\"50\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"50\"] {\n    flex: 1 1 50%;\n    max-width: 50%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-lg=\"50\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"50\"] {\n    flex: 1 1 50%;\n    max-width: 100%;\n    max-height: 50%;\n    box-sizing: border-box; }\n  [flex-gt-lg=\"55\"] {\n    flex: 1 1 55%;\n    max-width: 55%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-lg=\"55\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"55\"] {\n    flex: 1 1 55%;\n    max-width: 55%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-lg=\"55\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"55\"] {\n    flex: 1 1 55%;\n    max-width: 100%;\n    max-height: 55%;\n    box-sizing: border-box; }\n  [flex-gt-lg=\"60\"] {\n    flex: 1 1 60%;\n    max-width: 60%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-lg=\"60\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"60\"] {\n    flex: 1 1 60%;\n    max-width: 60%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-lg=\"60\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"60\"] {\n    flex: 1 1 60%;\n    max-width: 100%;\n    max-height: 60%;\n    box-sizing: border-box; }\n  [flex-gt-lg=\"65\"] {\n    flex: 1 1 65%;\n    max-width: 65%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-lg=\"65\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"65\"] {\n    flex: 1 1 65%;\n    max-width: 65%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-lg=\"65\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"65\"] {\n    flex: 1 1 65%;\n    max-width: 100%;\n    max-height: 65%;\n    box-sizing: border-box; }\n  [flex-gt-lg=\"70\"] {\n    flex: 1 1 70%;\n    max-width: 70%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-lg=\"70\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"70\"] {\n    flex: 1 1 70%;\n    max-width: 70%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-lg=\"70\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"70\"] {\n    flex: 1 1 70%;\n    max-width: 100%;\n    max-height: 70%;\n    box-sizing: border-box; }\n  [flex-gt-lg=\"75\"] {\n    flex: 1 1 75%;\n    max-width: 75%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-lg=\"75\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"75\"] {\n    flex: 1 1 75%;\n    max-width: 75%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-lg=\"75\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"75\"] {\n    flex: 1 1 75%;\n    max-width: 100%;\n    max-height: 75%;\n    box-sizing: border-box; }\n  [flex-gt-lg=\"80\"] {\n    flex: 1 1 80%;\n    max-width: 80%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-lg=\"80\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"80\"] {\n    flex: 1 1 80%;\n    max-width: 80%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-lg=\"80\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"80\"] {\n    flex: 1 1 80%;\n    max-width: 100%;\n    max-height: 80%;\n    box-sizing: border-box; }\n  [flex-gt-lg=\"85\"] {\n    flex: 1 1 85%;\n    max-width: 85%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-lg=\"85\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"85\"] {\n    flex: 1 1 85%;\n    max-width: 85%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-lg=\"85\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"85\"] {\n    flex: 1 1 85%;\n    max-width: 100%;\n    max-height: 85%;\n    box-sizing: border-box; }\n  [flex-gt-lg=\"90\"] {\n    flex: 1 1 90%;\n    max-width: 90%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-lg=\"90\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"90\"] {\n    flex: 1 1 90%;\n    max-width: 90%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-lg=\"90\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"90\"] {\n    flex: 1 1 90%;\n    max-width: 100%;\n    max-height: 90%;\n    box-sizing: border-box; }\n  [flex-gt-lg=\"95\"] {\n    flex: 1 1 95%;\n    max-width: 95%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-lg=\"95\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"95\"] {\n    flex: 1 1 95%;\n    max-width: 95%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-lg=\"95\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"95\"] {\n    flex: 1 1 95%;\n    max-width: 100%;\n    max-height: 95%;\n    box-sizing: border-box; }\n  [flex-gt-lg=\"100\"] {\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-lg=\"100\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"100\"] {\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-lg=\"100\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"100\"] {\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-lg=\"33\"], [layout=\"row\"] > [flex-gt-lg=\"33\"], [layout-gt-lg=\"row\"] > [flex-gt-lg=\"33\"], [layout-gt-lg=\"row\"] > [flex-gt-lg=\"33\"] {\n    flex: 1 1 33%;\n    max-width: calc(100% / 3);\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-lg=\"34\"], [layout=\"row\"] > [flex-gt-lg=\"34\"], [layout-gt-lg=\"row\"] > [flex-gt-lg=\"34\"], [layout-gt-lg=\"row\"] > [flex-gt-lg=\"34\"] {\n    flex: 1 1 34%;\n    max-width: 34%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-lg=\"66\"], [layout=\"row\"] > [flex-gt-lg=\"66\"], [layout-gt-lg=\"row\"] > [flex-gt-lg=\"66\"], [layout-gt-lg=\"row\"] > [flex-gt-lg=\"66\"] {\n    flex: 1 1 66%;\n    max-width: calc(200% / 3);\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-gt-lg=\"67\"], [layout=\"row\"] > [flex-gt-lg=\"67\"], [layout-gt-lg=\"row\"] > [flex-gt-lg=\"67\"], [layout-gt-lg=\"row\"] > [flex-gt-lg=\"67\"] {\n    flex: 1 1 67%;\n    max-width: 67%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-lg=\"33\"], [layout=\"column\"] > [flex-gt-lg=\"33\"], [layout-gt-lg=\"column\"] > [flex-gt-lg=\"33\"], [layout-gt-lg=\"column\"] > [flex-gt-lg=\"33\"] {\n    flex: 1 1 33%;\n    max-width: 100%;\n    max-height: calc(100% / 3);\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-lg=\"34\"], [layout=\"column\"] > [flex-gt-lg=\"34\"], [layout-gt-lg=\"column\"] > [flex-gt-lg=\"34\"], [layout-gt-lg=\"column\"] > [flex-gt-lg=\"34\"] {\n    flex: 1 1 34%;\n    max-width: 100%;\n    max-height: 34%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-lg=\"66\"], [layout=\"column\"] > [flex-gt-lg=\"66\"], [layout-gt-lg=\"column\"] > [flex-gt-lg=\"66\"], [layout-gt-lg=\"column\"] > [flex-gt-lg=\"66\"] {\n    flex: 1 1 66%;\n    max-width: 100%;\n    max-height: calc(200% / 3);\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-gt-lg=\"67\"], [layout=\"column\"] > [flex-gt-lg=\"67\"], [layout-gt-lg=\"column\"] > [flex-gt-lg=\"67\"], [layout-gt-lg=\"column\"] > [flex-gt-lg=\"67\"] {\n    flex: 1 1 67%;\n    max-width: 100%;\n    max-height: 67%;\n    box-sizing: border-box; }\n  [layout-gt-lg], [layout-gt-lg=\"column\"], [layout-gt-lg=\"row\"] {\n    box-sizing: border-box;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -moz-box;\n    display: -ms-flexbox;\n    display: flex; }\n  [layout-gt-lg=\"column\"] {\n    flex-direction: column; }\n  [layout-gt-lg=\"row\"] {\n    flex-direction: row; }\n  [flex-order-xl=\"-20\"] {\n    order: -20; }\n  [flex-order-xl=\"-19\"] {\n    order: -19; }\n  [flex-order-xl=\"-18\"] {\n    order: -18; }\n  [flex-order-xl=\"-17\"] {\n    order: -17; }\n  [flex-order-xl=\"-16\"] {\n    order: -16; }\n  [flex-order-xl=\"-15\"] {\n    order: -15; }\n  [flex-order-xl=\"-14\"] {\n    order: -14; }\n  [flex-order-xl=\"-13\"] {\n    order: -13; }\n  [flex-order-xl=\"-12\"] {\n    order: -12; }\n  [flex-order-xl=\"-11\"] {\n    order: -11; }\n  [flex-order-xl=\"-10\"] {\n    order: -10; }\n  [flex-order-xl=\"-9\"] {\n    order: -9; }\n  [flex-order-xl=\"-8\"] {\n    order: -8; }\n  [flex-order-xl=\"-7\"] {\n    order: -7; }\n  [flex-order-xl=\"-6\"] {\n    order: -6; }\n  [flex-order-xl=\"-5\"] {\n    order: -5; }\n  [flex-order-xl=\"-4\"] {\n    order: -4; }\n  [flex-order-xl=\"-3\"] {\n    order: -3; }\n  [flex-order-xl=\"-2\"] {\n    order: -2; }\n  [flex-order-xl=\"-1\"] {\n    order: -1; }\n  [flex-order-xl=\"0\"] {\n    order: 0; }\n  [flex-order-xl=\"1\"] {\n    order: 1; }\n  [flex-order-xl=\"2\"] {\n    order: 2; }\n  [flex-order-xl=\"3\"] {\n    order: 3; }\n  [flex-order-xl=\"4\"] {\n    order: 4; }\n  [flex-order-xl=\"5\"] {\n    order: 5; }\n  [flex-order-xl=\"6\"] {\n    order: 6; }\n  [flex-order-xl=\"7\"] {\n    order: 7; }\n  [flex-order-xl=\"8\"] {\n    order: 8; }\n  [flex-order-xl=\"9\"] {\n    order: 9; }\n  [flex-order-xl=\"10\"] {\n    order: 10; }\n  [flex-order-xl=\"11\"] {\n    order: 11; }\n  [flex-order-xl=\"12\"] {\n    order: 12; }\n  [flex-order-xl=\"13\"] {\n    order: 13; }\n  [flex-order-xl=\"14\"] {\n    order: 14; }\n  [flex-order-xl=\"15\"] {\n    order: 15; }\n  [flex-order-xl=\"16\"] {\n    order: 16; }\n  [flex-order-xl=\"17\"] {\n    order: 17; }\n  [flex-order-xl=\"18\"] {\n    order: 18; }\n  [flex-order-xl=\"19\"] {\n    order: 19; }\n  [flex-order-xl=\"20\"] {\n    order: 20; }\n  [flex-offset-xl=\"0\"] {\n    margin-left: 0%; }\n  [flex-offset-xl=\"5\"] {\n    margin-left: 5%; }\n  [flex-offset-xl=\"10\"] {\n    margin-left: 10%; }\n  [flex-offset-xl=\"15\"] {\n    margin-left: 15%; }\n  [flex-offset-xl=\"20\"] {\n    margin-left: 20%; }\n  [flex-offset-xl=\"25\"] {\n    margin-left: 25%; }\n  [flex-offset-xl=\"30\"] {\n    margin-left: 30%; }\n  [flex-offset-xl=\"35\"] {\n    margin-left: 35%; }\n  [flex-offset-xl=\"40\"] {\n    margin-left: 40%; }\n  [flex-offset-xl=\"45\"] {\n    margin-left: 45%; }\n  [flex-offset-xl=\"50\"] {\n    margin-left: 50%; }\n  [flex-offset-xl=\"55\"] {\n    margin-left: 55%; }\n  [flex-offset-xl=\"60\"] {\n    margin-left: 60%; }\n  [flex-offset-xl=\"65\"] {\n    margin-left: 65%; }\n  [flex-offset-xl=\"70\"] {\n    margin-left: 70%; }\n  [flex-offset-xl=\"75\"] {\n    margin-left: 75%; }\n  [flex-offset-xl=\"80\"] {\n    margin-left: 80%; }\n  [flex-offset-xl=\"85\"] {\n    margin-left: 85%; }\n  [flex-offset-xl=\"90\"] {\n    margin-left: 90%; }\n  [flex-offset-xl=\"95\"] {\n    margin-left: 95%; }\n  [flex-offset-xl=\"33\"] {\n    margin-left: calc(100% / 3); }\n  [flex-offset-xl=\"66\"] {\n    margin-left: calc(200% / 3); }\n  [layout-align-xl],\n  [layout-align-xl=\"start stretch\"] {\n    justify-content: flex-start;\n    align-content: stretch;\n    align-items: stretch; }\n  [layout-align-xl=\"start\"],\n  [layout-align-xl=\"start start\"],\n  [layout-align-xl=\"start center\"],\n  [layout-align-xl=\"start end\"],\n  [layout-align-xl=\"start stretch\"] {\n    justify-content: start; }\n  [layout-align-xl=\"center\"],\n  [layout-align-xl=\"center start\"],\n  [layout-align-xl=\"center center\"],\n  [layout-align-xl=\"center end\"],\n  [layout-align-xl=\"center stretch\"] {\n    justify-content: center; }\n  [layout-align-xl=\"end\"],\n  [layout-align-xl=\"end center\"],\n  [layout-align-xl=\"end start\"],\n  [layout-align-xl=\"end end\"],\n  [layout-align-xl=\"end stretch\"] {\n    justify-content: flex-end; }\n  [layout-align-xl=\"space-around\"],\n  [layout-align-xl=\"space-around center\"],\n  [layout-align-xl=\"space-around start\"],\n  [layout-align-xl=\"space-around end\"],\n  [layout-align-xl=\"space-around stretch\"] {\n    justify-content: space-around; }\n  [layout-align-xl=\"space-between\"],\n  [layout-align-xl=\"space-between center\"],\n  [layout-align-xl=\"space-between start\"],\n  [layout-align-xl=\"space-between end\"],\n  [layout-align-xl=\"space-between stretch\"] {\n    justify-content: space-between; }\n  [layout-align-xl=\"start start\"],\n  [layout-align-xl=\"center start\"],\n  [layout-align-xl=\"end start\"],\n  [layout-align-xl=\"space-between start\"],\n  [layout-align-xl=\"space-around start\"] {\n    align-items: flex-start;\n    align-content: flex-start; }\n  [layout-align-xl=\"start center\"],\n  [layout-align-xl=\"center center\"],\n  [layout-align-xl=\"end center\"],\n  [layout-align-xl=\"space-between center\"],\n  [layout-align-xl=\"space-around center\"] {\n    align-items: center;\n    align-content: center;\n    max-width: 100%; }\n  [layout-align-xl=\"start center\"] > *,\n  [layout-align-xl=\"center center\"] > *,\n  [layout-align-xl=\"end center\"] > *,\n  [layout-align-xl=\"space-between center\"] > *,\n  [layout-align-xl=\"space-around center\"] > * {\n    max-width: 100%;\n    box-sizing: border-box; }\n  [layout-align-xl=\"start end\"],\n  [layout-align-xl=\"center end\"],\n  [layout-align-xl=\"end end\"],\n  [layout-align-xl=\"space-between end\"],\n  [layout-align-xl=\"space-around end\"] {\n    align-items: flex-end;\n    align-content: flex-end; }\n  [layout-align-xl=\"start stretch\"],\n  [layout-align-xl=\"center stretch\"],\n  [layout-align-xl=\"end stretch\"],\n  [layout-align-xl=\"space-between stretch\"],\n  [layout-align-xl=\"space-around stretch\"] {\n    align-items: stretch;\n    align-content: stretch; }\n  [flex-xl] {\n    flex: 1;\n    box-sizing: border-box; } }\n\n@media screen\\0  and (min-width: 1280px) {\n  [flex-xl] {\n    flex: 1 1 0%; } }\n\n@media (min-width: 1280px) {\n  [flex-xl-grow] {\n    flex: 1 1 100%;\n    box-sizing: border-box; }\n  [flex-xl-initial] {\n    flex: 0 1 auto;\n    box-sizing: border-box; }\n  [flex-xl-auto] {\n    flex: 1 1 auto;\n    box-sizing: border-box; }\n  [flex-xl-none] {\n    flex: 0 0 auto;\n    box-sizing: border-box; }\n  [flex-xl-noshrink] {\n    flex: 1 0 auto;\n    box-sizing: border-box; }\n  [flex-xl-nogrow] {\n    flex: 0 1 auto;\n    box-sizing: border-box; }\n  [flex-xl=\"0\"] {\n    flex: 1 1 0%;\n    max-width: 0%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xl=\"0\"],\n  [layout-xl=\"row\"] > [flex-xl=\"0\"] {\n    flex: 1 1 0%;\n    max-width: 0%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xl=\"0\"],\n  [layout-xl=\"column\"] > [flex-xl=\"0\"] {\n    flex: 1 1 0%;\n    max-width: 100%;\n    max-height: 0%;\n    box-sizing: border-box; }\n  [flex-xl=\"5\"] {\n    flex: 1 1 5%;\n    max-width: 5%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xl=\"5\"],\n  [layout-xl=\"row\"] > [flex-xl=\"5\"] {\n    flex: 1 1 5%;\n    max-width: 5%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xl=\"5\"],\n  [layout-xl=\"column\"] > [flex-xl=\"5\"] {\n    flex: 1 1 5%;\n    max-width: 100%;\n    max-height: 5%;\n    box-sizing: border-box; }\n  [flex-xl=\"10\"] {\n    flex: 1 1 10%;\n    max-width: 10%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xl=\"10\"],\n  [layout-xl=\"row\"] > [flex-xl=\"10\"] {\n    flex: 1 1 10%;\n    max-width: 10%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xl=\"10\"],\n  [layout-xl=\"column\"] > [flex-xl=\"10\"] {\n    flex: 1 1 10%;\n    max-width: 100%;\n    max-height: 10%;\n    box-sizing: border-box; }\n  [flex-xl=\"15\"] {\n    flex: 1 1 15%;\n    max-width: 15%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xl=\"15\"],\n  [layout-xl=\"row\"] > [flex-xl=\"15\"] {\n    flex: 1 1 15%;\n    max-width: 15%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xl=\"15\"],\n  [layout-xl=\"column\"] > [flex-xl=\"15\"] {\n    flex: 1 1 15%;\n    max-width: 100%;\n    max-height: 15%;\n    box-sizing: border-box; }\n  [flex-xl=\"20\"] {\n    flex: 1 1 20%;\n    max-width: 20%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xl=\"20\"],\n  [layout-xl=\"row\"] > [flex-xl=\"20\"] {\n    flex: 1 1 20%;\n    max-width: 20%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xl=\"20\"],\n  [layout-xl=\"column\"] > [flex-xl=\"20\"] {\n    flex: 1 1 20%;\n    max-width: 100%;\n    max-height: 20%;\n    box-sizing: border-box; }\n  [flex-xl=\"25\"] {\n    flex: 1 1 25%;\n    max-width: 25%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xl=\"25\"],\n  [layout-xl=\"row\"] > [flex-xl=\"25\"] {\n    flex: 1 1 25%;\n    max-width: 25%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xl=\"25\"],\n  [layout-xl=\"column\"] > [flex-xl=\"25\"] {\n    flex: 1 1 25%;\n    max-width: 100%;\n    max-height: 25%;\n    box-sizing: border-box; }\n  [flex-xl=\"30\"] {\n    flex: 1 1 30%;\n    max-width: 30%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xl=\"30\"],\n  [layout-xl=\"row\"] > [flex-xl=\"30\"] {\n    flex: 1 1 30%;\n    max-width: 30%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xl=\"30\"],\n  [layout-xl=\"column\"] > [flex-xl=\"30\"] {\n    flex: 1 1 30%;\n    max-width: 100%;\n    max-height: 30%;\n    box-sizing: border-box; }\n  [flex-xl=\"35\"] {\n    flex: 1 1 35%;\n    max-width: 35%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xl=\"35\"],\n  [layout-xl=\"row\"] > [flex-xl=\"35\"] {\n    flex: 1 1 35%;\n    max-width: 35%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xl=\"35\"],\n  [layout-xl=\"column\"] > [flex-xl=\"35\"] {\n    flex: 1 1 35%;\n    max-width: 100%;\n    max-height: 35%;\n    box-sizing: border-box; }\n  [flex-xl=\"40\"] {\n    flex: 1 1 40%;\n    max-width: 40%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xl=\"40\"],\n  [layout-xl=\"row\"] > [flex-xl=\"40\"] {\n    flex: 1 1 40%;\n    max-width: 40%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xl=\"40\"],\n  [layout-xl=\"column\"] > [flex-xl=\"40\"] {\n    flex: 1 1 40%;\n    max-width: 100%;\n    max-height: 40%;\n    box-sizing: border-box; }\n  [flex-xl=\"45\"] {\n    flex: 1 1 45%;\n    max-width: 45%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xl=\"45\"],\n  [layout-xl=\"row\"] > [flex-xl=\"45\"] {\n    flex: 1 1 45%;\n    max-width: 45%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xl=\"45\"],\n  [layout-xl=\"column\"] > [flex-xl=\"45\"] {\n    flex: 1 1 45%;\n    max-width: 100%;\n    max-height: 45%;\n    box-sizing: border-box; }\n  [flex-xl=\"50\"] {\n    flex: 1 1 50%;\n    max-width: 50%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xl=\"50\"],\n  [layout-xl=\"row\"] > [flex-xl=\"50\"] {\n    flex: 1 1 50%;\n    max-width: 50%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xl=\"50\"],\n  [layout-xl=\"column\"] > [flex-xl=\"50\"] {\n    flex: 1 1 50%;\n    max-width: 100%;\n    max-height: 50%;\n    box-sizing: border-box; }\n  [flex-xl=\"55\"] {\n    flex: 1 1 55%;\n    max-width: 55%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xl=\"55\"],\n  [layout-xl=\"row\"] > [flex-xl=\"55\"] {\n    flex: 1 1 55%;\n    max-width: 55%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xl=\"55\"],\n  [layout-xl=\"column\"] > [flex-xl=\"55\"] {\n    flex: 1 1 55%;\n    max-width: 100%;\n    max-height: 55%;\n    box-sizing: border-box; }\n  [flex-xl=\"60\"] {\n    flex: 1 1 60%;\n    max-width: 60%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xl=\"60\"],\n  [layout-xl=\"row\"] > [flex-xl=\"60\"] {\n    flex: 1 1 60%;\n    max-width: 60%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xl=\"60\"],\n  [layout-xl=\"column\"] > [flex-xl=\"60\"] {\n    flex: 1 1 60%;\n    max-width: 100%;\n    max-height: 60%;\n    box-sizing: border-box; }\n  [flex-xl=\"65\"] {\n    flex: 1 1 65%;\n    max-width: 65%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xl=\"65\"],\n  [layout-xl=\"row\"] > [flex-xl=\"65\"] {\n    flex: 1 1 65%;\n    max-width: 65%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xl=\"65\"],\n  [layout-xl=\"column\"] > [flex-xl=\"65\"] {\n    flex: 1 1 65%;\n    max-width: 100%;\n    max-height: 65%;\n    box-sizing: border-box; }\n  [flex-xl=\"70\"] {\n    flex: 1 1 70%;\n    max-width: 70%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xl=\"70\"],\n  [layout-xl=\"row\"] > [flex-xl=\"70\"] {\n    flex: 1 1 70%;\n    max-width: 70%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xl=\"70\"],\n  [layout-xl=\"column\"] > [flex-xl=\"70\"] {\n    flex: 1 1 70%;\n    max-width: 100%;\n    max-height: 70%;\n    box-sizing: border-box; }\n  [flex-xl=\"75\"] {\n    flex: 1 1 75%;\n    max-width: 75%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xl=\"75\"],\n  [layout-xl=\"row\"] > [flex-xl=\"75\"] {\n    flex: 1 1 75%;\n    max-width: 75%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xl=\"75\"],\n  [layout-xl=\"column\"] > [flex-xl=\"75\"] {\n    flex: 1 1 75%;\n    max-width: 100%;\n    max-height: 75%;\n    box-sizing: border-box; }\n  [flex-xl=\"80\"] {\n    flex: 1 1 80%;\n    max-width: 80%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xl=\"80\"],\n  [layout-xl=\"row\"] > [flex-xl=\"80\"] {\n    flex: 1 1 80%;\n    max-width: 80%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xl=\"80\"],\n  [layout-xl=\"column\"] > [flex-xl=\"80\"] {\n    flex: 1 1 80%;\n    max-width: 100%;\n    max-height: 80%;\n    box-sizing: border-box; }\n  [flex-xl=\"85\"] {\n    flex: 1 1 85%;\n    max-width: 85%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xl=\"85\"],\n  [layout-xl=\"row\"] > [flex-xl=\"85\"] {\n    flex: 1 1 85%;\n    max-width: 85%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xl=\"85\"],\n  [layout-xl=\"column\"] > [flex-xl=\"85\"] {\n    flex: 1 1 85%;\n    max-width: 100%;\n    max-height: 85%;\n    box-sizing: border-box; }\n  [flex-xl=\"90\"] {\n    flex: 1 1 90%;\n    max-width: 90%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xl=\"90\"],\n  [layout-xl=\"row\"] > [flex-xl=\"90\"] {\n    flex: 1 1 90%;\n    max-width: 90%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xl=\"90\"],\n  [layout-xl=\"column\"] > [flex-xl=\"90\"] {\n    flex: 1 1 90%;\n    max-width: 100%;\n    max-height: 90%;\n    box-sizing: border-box; }\n  [flex-xl=\"95\"] {\n    flex: 1 1 95%;\n    max-width: 95%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xl=\"95\"],\n  [layout-xl=\"row\"] > [flex-xl=\"95\"] {\n    flex: 1 1 95%;\n    max-width: 95%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xl=\"95\"],\n  [layout-xl=\"column\"] > [flex-xl=\"95\"] {\n    flex: 1 1 95%;\n    max-width: 100%;\n    max-height: 95%;\n    box-sizing: border-box; }\n  [flex-xl=\"100\"] {\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xl=\"100\"],\n  [layout-xl=\"row\"] > [flex-xl=\"100\"] {\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xl=\"100\"],\n  [layout-xl=\"column\"] > [flex-xl=\"100\"] {\n    flex: 1 1 100%;\n    max-width: 100%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xl=\"33\"], [layout=\"row\"] > [flex-xl=\"33\"], [layout-xl=\"row\"] > [flex-xl=\"33\"], [layout-xl=\"row\"] > [flex-xl=\"33\"] {\n    flex: 1 1 33%;\n    max-width: calc(100% / 3);\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xl=\"34\"], [layout=\"row\"] > [flex-xl=\"34\"], [layout-xl=\"row\"] > [flex-xl=\"34\"], [layout-xl=\"row\"] > [flex-xl=\"34\"] {\n    flex: 1 1 34%;\n    max-width: 34%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xl=\"66\"], [layout=\"row\"] > [flex-xl=\"66\"], [layout-xl=\"row\"] > [flex-xl=\"66\"], [layout-xl=\"row\"] > [flex-xl=\"66\"] {\n    flex: 1 1 66%;\n    max-width: calc(200% / 3);\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"row\"] > [flex-xl=\"67\"], [layout=\"row\"] > [flex-xl=\"67\"], [layout-xl=\"row\"] > [flex-xl=\"67\"], [layout-xl=\"row\"] > [flex-xl=\"67\"] {\n    flex: 1 1 67%;\n    max-width: 67%;\n    max-height: 100%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xl=\"33\"], [layout=\"column\"] > [flex-xl=\"33\"], [layout-xl=\"column\"] > [flex-xl=\"33\"], [layout-xl=\"column\"] > [flex-xl=\"33\"] {\n    flex: 1 1 33%;\n    max-width: 100%;\n    max-height: calc(100% / 3);\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xl=\"34\"], [layout=\"column\"] > [flex-xl=\"34\"], [layout-xl=\"column\"] > [flex-xl=\"34\"], [layout-xl=\"column\"] > [flex-xl=\"34\"] {\n    flex: 1 1 34%;\n    max-width: 100%;\n    max-height: 34%;\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xl=\"66\"], [layout=\"column\"] > [flex-xl=\"66\"], [layout-xl=\"column\"] > [flex-xl=\"66\"], [layout-xl=\"column\"] > [flex-xl=\"66\"] {\n    flex: 1 1 66%;\n    max-width: 100%;\n    max-height: calc(200% / 3);\n    box-sizing: border-box; }\n  [layout=\"column\"] > [flex-xl=\"67\"], [layout=\"column\"] > [flex-xl=\"67\"], [layout-xl=\"column\"] > [flex-xl=\"67\"], [layout-xl=\"column\"] > [flex-xl=\"67\"] {\n    flex: 1 1 67%;\n    max-width: 100%;\n    max-height: 67%;\n    box-sizing: border-box; }\n  [layout-xl], [layout-xl=\"column\"], [layout-xl=\"row\"] {\n    box-sizing: border-box;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -moz-box;\n    display: -ms-flexbox;\n    display: flex; }\n  [layout-xl=\"column\"] {\n    flex-direction: column; }\n  [layout-xl=\"row\"] {\n    flex-direction: row; }\n  [hide]:not([show-gt-xs]):not([show-gt-sm]):not([show-gt-md]):not([show-gt-lg]):not([show-xl]):not([show]), [hide-gt-xs]:not([show-gt-xs]):not([show-gt-sm]):not([show-gt-md]):not([show-gt-lg]):not([show-xl]):not([show]), [hide-gt-sm]:not([show-gt-xs]):not([show-gt-sm]):not([show-gt-md]):not([show-gt-lg]):not([show-xl]):not([show]), [hide-gt-md]:not([show-gt-xs]):not([show-gt-sm]):not([show-gt-md]):not([show-gt-lg]):not([show-xl]):not([show]), [hide-gt-lg]:not([show-gt-xs]):not([show-gt-sm]):not([show-gt-md]):not([show-gt-lg]):not([show-xl]):not([show]) {\n    display: none; }\n  [hide-xl]:not([show-xl]):not([show-gt-lg]):not([show]) {\n    display: none; } }\n\n.md-backdrop {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  width: 100%;\n  height: 100%;\n  transition: opacity 450ms;\n  opacity: 0;\n  z-index: 50;\n  pointer-events: none; }\n  .md-backdrop.md-backdrop-absolute {\n    position: absolute; }\n  .md-backdrop.md-active {\n    opacity: 1;\n    pointer-events: all; }\n  .md-backdrop.md-select-backdrop {\n    z-index: 81;\n    transition-duration: 0; }\n  .md-backdrop.md-dialog-backdrop {\n    z-index: 79; }\n  .md-backdrop.md-bottom-sheet-backdrop {\n    z-index: 69; }\n  .md-backdrop.md-sidenav-backdrop {\n    z-index: 59; }\n  .md-backdrop.md-opaque.md-active {\n    opacity: .48; }\n\n.md-backdrop {\n  background-color: rgba(33, 33, 33, 0); }\n  .md-backdrop.md-opaque {\n    background-color: #212121; }\n    .md-backdrop.md-opaque.md-active {\n      opacity: .48; }\n\n/** Mixin to create distinct classes for fab positions, e.g. \".md-fab-position-bottom-right\". */\n/** Mixin to set button size to fit an icon */\n/** Styles for all disabled buttons. */\n/** Base styles for all buttons. */\n/** Base styles for raised buttons, including FABs. */\n[md-button] {\n  box-sizing: border-box;\n  position: relative;\n  background: transparent;\n  text-align: center;\n  overflow: hidden;\n  cursor: pointer;\n  user-select: none;\n  outline: none;\n  border: none;\n  display: inline-block;\n  white-space: nowrap;\n  text-decoration: none;\n  vertical-align: middle;\n  font-size: 14px;\n  font-weight: 500;\n  text-transform: uppercase;\n  padding: 0 6px;\n  margin: 6px 8px;\n  min-width: 88px;\n  line-height: 36px;\n  border-radius: 3px;\n  transition: background 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); }\n  [md-button]:focus {\n    outline: none; }\n  [md-button]:hover, [md-button]:focus {\n    text-decoration: none; }\n  [md-button].md-button-focus {\n    background: rgba(158, 158, 158, 0.2); }\n  [md-button].md-primary {\n    color: #009688; }\n  [md-button].md-accent {\n    color: #9c27b0; }\n  [md-button].md-warn {\n    color: #f44336; }\n  [md-button].md-icon {\n    padding: 0;\n    background: none; }\n  [md-button].md-icon-button {\n    margin: 0 6px;\n    height: 40px;\n    min-width: 0;\n    line-height: 24px;\n    padding: 8px;\n    width: 40px;\n    border-radius: 50%; }\n    [md-button].md-icon-button .md-ripple-container {\n      border-radius: 50%;\n      background-clip: padding-box;\n      overflow: hidden;\n      -webkit-mask-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC\"); }\n  [md-button][disabled] {\n    color: rgba(0, 0, 0, 0.26);\n    background-color: #e0e0e0;\n    cursor: default; }\n  [md-button] .md-ripple-container {\n    border-radius: 3px;\n    background-clip: padding-box;\n    overflow: hidden;\n    -webkit-mask-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC\"); }\n  [md-button]:hover {\n    background: rgba(158, 158, 158, 0.2); }\n\n[md-raised-button] {\n  box-sizing: border-box;\n  position: relative;\n  background: transparent;\n  text-align: center;\n  overflow: hidden;\n  cursor: pointer;\n  user-select: none;\n  outline: none;\n  border: none;\n  display: inline-block;\n  white-space: nowrap;\n  text-decoration: none;\n  vertical-align: middle;\n  font-size: 14px;\n  font-weight: 500;\n  text-transform: uppercase;\n  padding: 0 6px;\n  margin: 6px 8px;\n  min-width: 88px;\n  line-height: 36px;\n  border-radius: 3px;\n  transition: background 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);\n  transform: translate3d(0, 0, 0);\n  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);\n  color: rgba(0, 0, 0, 0.870588);\n  background-color: #fafafa; }\n  [md-raised-button]:focus {\n    outline: none; }\n  [md-raised-button]:hover, [md-raised-button]:focus {\n    text-decoration: none; }\n  [md-raised-button].md-button-focus {\n    background: rgba(158, 158, 158, 0.2); }\n  [md-raised-button].md-primary {\n    color: #009688; }\n  [md-raised-button].md-accent {\n    color: #9c27b0; }\n  [md-raised-button].md-warn {\n    color: #f44336; }\n  [md-raised-button].md-icon {\n    padding: 0;\n    background: none; }\n  [md-raised-button].md-icon-button {\n    margin: 0 6px;\n    height: 40px;\n    min-width: 0;\n    line-height: 24px;\n    padding: 8px;\n    width: 40px;\n    border-radius: 50%; }\n    [md-raised-button].md-icon-button .md-ripple-container {\n      border-radius: 50%;\n      background-clip: padding-box;\n      overflow: hidden;\n      -webkit-mask-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC\"); }\n  [md-raised-button][disabled] {\n    color: rgba(0, 0, 0, 0.26);\n    background-color: #e0e0e0;\n    cursor: default; }\n  [md-raised-button] .md-ripple-container {\n    border-radius: 3px;\n    background-clip: padding-box;\n    overflow: hidden;\n    -webkit-mask-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC\"); }\n  [md-raised-button]:active {\n    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4); }\n  [md-raised-button][disabled] {\n    box-shadow: none; }\n  [md-raised-button].md-primary {\n    color: white;\n    background-color: #009688; }\n    [md-raised-button].md-primary:hover, [md-raised-button].md-primary.md-button-focus {\n      background-color: #00897b; }\n  [md-raised-button].md-accent {\n    color: rgba(255, 255, 255, 0.870588);\n    background-color: #9c27b0; }\n    [md-raised-button].md-accent:hover, [md-raised-button].md-accent.md-button-focus {\n      background-color: #aa00ff; }\n  [md-raised-button].md-warn {\n    color: white;\n    background-color: #f44336; }\n    [md-raised-button].md-warn [md-icon] {\n      color: white; }\n    [md-raised-button].md-warn:hover {\n      background-color: #f44336; }\n    [md-raised-button].md-warn.md-focused {\n      background-color: #d32f2f; }\n  [md-raised-button].md-primary[disabled], [md-raised-button].md-accent[disabled] {\n    color: rgba(0, 0, 0, 0.26);\n    background-color: #e0e0e0;\n    cursor: default; }\n  [md-raised-button].md-button-focus {\n    background: #9e9e9e; }\n\n[md-fab] {\n  box-sizing: border-box;\n  position: relative;\n  background: transparent;\n  text-align: center;\n  overflow: hidden;\n  cursor: pointer;\n  user-select: none;\n  outline: none;\n  border: none;\n  display: inline-block;\n  white-space: nowrap;\n  text-decoration: none;\n  vertical-align: middle;\n  font-size: 14px;\n  font-weight: 500;\n  text-transform: uppercase;\n  padding: 0 6px;\n  margin: 6px 8px;\n  min-width: 88px;\n  line-height: 36px;\n  border-radius: 3px;\n  transition: background 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);\n  transform: translate3d(0, 0, 0);\n  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);\n  margin: 0 6px;\n  height: 40px;\n  min-width: 0;\n  line-height: 24px;\n  padding: 8px;\n  width: 40px;\n  border-radius: 50%;\n  z-index: 20;\n  border-radius: 50%;\n  min-width: 0;\n  width: 56px;\n  height: 56px;\n  line-height: 56px;\n  vertical-align: middle;\n  background-color: #9c27b0;\n  color: rgba(255, 255, 255, 0.870588); }\n  [md-fab]:focus {\n    outline: none; }\n  [md-fab]:hover, [md-fab]:focus {\n    text-decoration: none; }\n  [md-fab].md-button-focus {\n    background: rgba(158, 158, 158, 0.2); }\n  [md-fab].md-primary {\n    color: #009688; }\n  [md-fab].md-accent {\n    color: #9c27b0; }\n  [md-fab].md-warn {\n    color: #f44336; }\n  [md-fab].md-icon {\n    padding: 0;\n    background: none; }\n  [md-fab].md-icon-button {\n    margin: 0 6px;\n    height: 40px;\n    min-width: 0;\n    line-height: 24px;\n    padding: 8px;\n    width: 40px;\n    border-radius: 50%; }\n    [md-fab].md-icon-button .md-ripple-container {\n      border-radius: 50%;\n      background-clip: padding-box;\n      overflow: hidden;\n      -webkit-mask-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC\"); }\n  [md-fab][disabled] {\n    color: rgba(0, 0, 0, 0.26);\n    background-color: #e0e0e0;\n    cursor: default; }\n  [md-fab] .md-ripple-container {\n    border-radius: 3px;\n    background-clip: padding-box;\n    overflow: hidden;\n    -webkit-mask-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC\"); }\n  [md-fab]:active {\n    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4); }\n  [md-fab][disabled] {\n    box-shadow: none; }\n  [md-fab].md-primary {\n    color: white;\n    background-color: #009688; }\n    [md-fab].md-primary:hover, [md-fab].md-primary.md-button-focus {\n      background-color: #00897b; }\n  [md-fab].md-accent {\n    color: rgba(255, 255, 255, 0.870588);\n    background-color: #9c27b0; }\n    [md-fab].md-accent:hover, [md-fab].md-accent.md-button-focus {\n      background-color: #aa00ff; }\n  [md-fab].md-warn {\n    color: white;\n    background-color: #f44336; }\n    [md-fab].md-warn [md-icon] {\n      color: white; }\n    [md-fab].md-warn:hover {\n      background-color: #f44336; }\n    [md-fab].md-warn.md-focused {\n      background-color: #d32f2f; }\n  [md-fab].md-primary[disabled], [md-fab].md-accent[disabled] {\n    color: rgba(0, 0, 0, 0.26);\n    background-color: #e0e0e0;\n    cursor: default; }\n  [md-fab].md-button-focus {\n    background: #9e9e9e; }\n  [md-fab] .md-ripple-container {\n    border-radius: 50%;\n    background-clip: padding-box;\n    overflow: hidden;\n    -webkit-mask-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC\"); }\n  [md-fab] [md-icon] {\n    color: rgba(255, 255, 255, 0.870588); }\n  [md-fab]:not([disabled]):hover {\n    background-color: #9c27b0; }\n  [md-fab]:not([disabled]).md-focused {\n    background-color: #aa00ff; }\n  [md-fab] .md-ripple-container {\n    border-radius: 50%;\n    background-clip: padding-box;\n    overflow: hidden;\n    -webkit-mask-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC\"); }\n  [md-fab].md-mini {\n    line-height: 40px;\n    width: 40px;\n    height: 40px; }\n\n@media screen and (-ms-high-contrast: active) {\n  [md-raised],\n  [md-fab] {\n    border: 1px solid #fff; } }\n\n.md-fab-position-bottom-right {\n  top: auto;\n  right: 20px;\n  bottom: 20px;\n  left: auto;\n  position: absolute; }\n\n.md-fab-position-bottom-left {\n  top: auto;\n  right: auto;\n  bottom: 20px;\n  left: 20px;\n  position: absolute; }\n\n.md-fab-position-top-right {\n  top: 20px;\n  right: 20px;\n  bottom: auto;\n  left: auto;\n  position: absolute; }\n\n.md-fab-position-top-left {\n  top: 20px;\n  right: auto;\n  bottom: auto;\n  left: 20px;\n  position: absolute; }\n\nmd-card {\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n  margin: 8px;\n  box-shadow: 0px 2px 5px 0 rgba(0, 0, 0, 0.26); }\n  md-card md-card-header {\n    padding: 16px;\n    display: flex;\n    flex-direction: row; }\n    md-card md-card-header:first-child md-card-avatar {\n      margin-right: 12px; }\n    md-card md-card-header:last-child md-card-avatar {\n      margin-left: 12px; }\n    md-card md-card-header md-card-avatar {\n      width: 40px;\n      height: 40px; }\n      md-card md-card-header md-card-avatar .md-user-avatar,\n      md-card md-card-header md-card-avatar [md-icon] {\n        border-radius: 50%; }\n      md-card md-card-header md-card-avatar [md-icon] {\n        padding: 8px; }\n      md-card md-card-header md-card-avatar + md-card-header-text {\n        max-height: 40px; }\n        md-card md-card-header md-card-avatar + md-card-header-text .md-title {\n          font-size: 14px; }\n    md-card md-card-header md-card-header-text {\n      display: flex;\n      flex: 1;\n      flex-direction: column; }\n      md-card md-card-header md-card-header-text .md-subhead {\n        font-size: 14px; }\n  md-card > img,\n  md-card > :not(md-card-content) img {\n    display: flex;\n    flex: 0 0 auto;\n    width: 100%;\n    height: auto; }\n  md-card md-card-title {\n    padding: 24px 16px 16px;\n    display: flex;\n    flex: 1;\n    flex-direction: row; }\n    md-card md-card-title + md-card-content {\n      padding-top: 0; }\n    md-card md-card-title md-card-title-text {\n      flex: 1;\n      flex-direction: column;\n      display: flex; }\n      md-card md-card-title md-card-title-text .md-subhead {\n        padding-top: 0;\n        font-size: 14px; }\n      md-card md-card-title md-card-title-text:only-child .md-subhead {\n        padding-top: 12px; }\n    md-card md-card-title md-card-title-media {\n      margin-top: -8px; }\n      md-card md-card-title md-card-title-media .md-media-sm {\n        height: 80px;\n        width: 80px; }\n      md-card md-card-title md-card-title-media .md-media-md {\n        height: 112px;\n        width: 112px; }\n      md-card md-card-title md-card-title-media .md-media-lg {\n        height: 152px;\n        width: 152px; }\n  md-card md-card-content {\n    display: block;\n    padding: 16px; }\n    md-card md-card-content > p {\n      margin: 0; }\n    md-card md-card-content .md-media-xl {\n      height: 240px;\n      width: 240px; }\n  md-card .md-actions, md-card md-card-actions {\n    margin: 8px; }\n    md-card .md-actions[layout=column] [md-button]:not(.md-icon-button), md-card md-card-actions[layout=column] [md-button]:not(.md-icon-button) {\n      margin: 2px 0; }\n      md-card .md-actions[layout=column] [md-button]:not(.md-icon-button):first-of-type, md-card md-card-actions[layout=column] [md-button]:not(.md-icon-button):first-of-type {\n        margin-top: 0; }\n      md-card .md-actions[layout=column] [md-button]:not(.md-icon-button):last-of-type, md-card md-card-actions[layout=column] [md-button]:not(.md-icon-button):last-of-type {\n        margin-bottom: 0; }\n    md-card .md-actions[layout=column] [md-button].md-icon-button, md-card md-card-actions[layout=column] [md-button].md-icon-button {\n      margin-top: 6px;\n      margin-bottom: 6px; }\n    md-card .md-actions md-card-icon-actions, md-card md-card-actions md-card-icon-actions {\n      flex: 1;\n      justify-content: flex-start;\n      display: flex;\n      flex-direction: row; }\n    md-card .md-actions:not([layout=column]) [md-button]:not(.md-icon-button), md-card md-card-actions:not([layout=column]) [md-button]:not(.md-icon-button) {\n      margin: 0 4px; }\n      md-card .md-actions:not([layout=column]) [md-button]:not(.md-icon-button):first-of-type, md-card md-card-actions:not([layout=column]) [md-button]:not(.md-icon-button):first-of-type {\n        margin-left: 0; }\n      md-card .md-actions:not([layout=column]) [md-button]:not(.md-icon-button):last-of-type, md-card md-card-actions:not([layout=column]) [md-button]:not(.md-icon-button):last-of-type {\n        margin-right: 0; }\n    md-card .md-actions:not([layout=column]) [md-button].md-icon-button, md-card md-card-actions:not([layout=column]) [md-button].md-icon-button {\n      margin-left: 6px;\n      margin-right: 6px; }\n      md-card .md-actions:not([layout=column]) [md-button].md-icon-button:first-of-type, md-card md-card-actions:not([layout=column]) [md-button].md-icon-button:first-of-type {\n        margin-left: 12px; }\n      md-card .md-actions:not([layout=column]) [md-button].md-icon-button:last-of-type, md-card md-card-actions:not([layout=column]) [md-button].md-icon-button:last-of-type {\n        margin-right: 12px; }\n    md-card .md-actions:not([layout=column]) [md-button] + md-card-icon-actions, md-card md-card-actions:not([layout=column]) [md-button] + md-card-icon-actions {\n      flex: 1;\n      justify-content: flex-end;\n      display: flex;\n      flex-direction: row; }\n  md-card md-card-footer {\n    margin-top: auto;\n    padding: 16px; }\n\n@media screen and (-ms-high-contrast: active) {\n  md-card {\n    border: 1px solid #fff; } }\n\nmd-card {\n  background-color: white;\n  border-radius: 2px; }\n  md-card .md-card-image {\n    border-radius: 2px 2px 0 0; }\n  md-card md-card-header md-card-avatar [md-icon] {\n    color: white;\n    background-color: rgba(0, 0, 0, 0.26); }\n  md-card md-card-header md-card-header-text .md-subhead {\n    color: rgba(0, 0, 0, 0.54); }\n  md-card md-card-title md-card-title-text:not(:only-child) .md-subhead {\n    color: rgba(0, 0, 0, 0.54); }\n\nmd-content {\n  display: block;\n  position: relative;\n  overflow: auto;\n  -webkit-overflow-scrolling: touch; }\n  md-content[md-scroll-y] {\n    overflow-y: auto;\n    overflow-x: hidden; }\n  md-content[md-scroll-x] {\n    overflow-x: auto;\n    overflow-y: hidden; }\n  md-content.autoScroll {\n    -webkit-overflow-scrolling: auto; }\n\nmd-content {\n  color: rgba(0, 0, 0, 0.87);\n  background-color: white; }\n\nmd-data-table, .md-data-table {\n  display: table;\n  border-spacing: 0;\n  border-collapse: collapse;\n  font-size: 13px;\n  box-sizing: border-box;\n  width: 100%; }\n  md-data-table md-checkbox, .md-data-table md-checkbox {\n    margin: 0;\n    width: 18px;\n    vertical-align: middle; }\n  md-data-table tr, .md-data-table tr {\n    vertical-align: middle; }\n    md-data-table tr:last-child, .md-data-table tr:last-child {\n      height: 56px; }\n  md-data-table th, md-data-table td, .md-data-table th, .md-data-table td {\n    padding: 0 32px 0 24px;\n    text-align: right; }\n    md-data-table th:first-of-type, md-data-table td:first-of-type, .md-data-table th:first-of-type, .md-data-table td:first-of-type {\n      padding-left: 24px; }\n    md-data-table th:last-of-type, md-data-table td:last-of-type, .md-data-table th:last-of-type, .md-data-table td:last-of-type {\n      padding-right: 24px; }\n    md-data-table th.md-text-cell, md-data-table td.md-text-cell, .md-data-table th.md-text-cell, .md-data-table td.md-text-cell {\n      text-align: left; }\n    md-data-table th.md-data-check-cell, md-data-table td.md-data-check-cell, .md-data-table th.md-data-check-cell, .md-data-table td.md-data-check-cell {\n      padding: 0 0 0 24px;\n      width: 18px; }\n  md-data-table th, .md-data-table th {\n    font-size: 12px;\n    font-weight: 600;\n    color: rgba(0, 0, 0, 0.54);\n    text-overflow: ellipsis;\n    box-sizing: border-box;\n    /*\n     TODO (ollwenjones) sorting functionality pending, but these class names\n     were tested, and can be used outside of the library component structures.\n     */ }\n    md-data-table th.sortable, .md-data-table th.sortable {\n      cursor: pointer; }\n    md-data-table th.sorted-ascending, md-data-table th.sorted-descending, .md-data-table th.sorted-ascending, .md-data-table th.sorted-descending {\n      color: rgba(0, 0, 0, 0.87); }\n      md-data-table th.sorted-ascending:before, md-data-table th.sorted-descending:before, .md-data-table th.sorted-ascending:before, .md-data-table th.sorted-descending:before {\n        font-family: 'Material Icons';\n        font-size: 16px;\n        content: \"\\E5D8\";\n        margin-right: 5px;\n        vertical-align: sub; }\n      md-data-table th.sorted-ascending:hover, md-data-table th.sorted-descending:hover, .md-data-table th.sorted-ascending:hover, .md-data-table th.sorted-descending:hover {\n        cursor: pointer; }\n        md-data-table th.sorted-ascending:hover:before, md-data-table th.sorted-descending:hover:before, .md-data-table th.sorted-ascending:hover:before, .md-data-table th.sorted-descending:hover:before {\n          color: rgba(0, 0, 0, 0.38); }\n    md-data-table th.sorted-descending:before, .md-data-table th.sorted-descending:before {\n      content: \"\\E5DB\"; }\n  md-data-table td, .md-data-table td {\n    position: relative;\n    vertical-align: middle;\n    height: 48px;\n    border-top: 1px solid rgba(0, 0, 0, 0.12);\n    border-bottom: 1px solid rgba(0, 0, 0, 0.12);\n    box-sizing: border-box;\n    color: rgba(0, 0, 0, 0.87); }\n  md-data-table th:first-child, md-data-table td:first-child, .md-data-table th:first-child, .md-data-table td:first-child {\n    padding-left: 24px; }\n  md-data-table th:last-child, md-data-table td:last-child, .md-data-table th:last-child, .md-data-table td:last-child {\n    padding-right: 24px; }\n  md-data-table tr, .md-data-table tr {\n    position: relative;\n    height: 48px; }\n  md-data-table tbody tr.selected, md-data-table tbody tr.active, md-data-table .md-data-tbody tr.selected, md-data-table .md-data-tbody tr.active, .md-data-table tbody tr.selected, .md-data-table tbody tr.active, .md-data-table .md-data-tbody tr.selected, .md-data-table .md-data-tbody tr.active {\n    background-color: whitesmoke; }\n  md-data-table tbody tr:hover, md-data-table .md-data-tbody tr:hover, .md-data-table tbody tr:hover, .md-data-table .md-data-tbody tr:hover {\n    background-color: #eeeeee; }\n\nhtml, body {\n  -webkit-tap-highlight-color: transparent;\n  -webkit-touch-callout: none;\n  min-height: 100%;\n  -webkit-text-size-adjust: 100%;\n  -ms-text-size-adjust: 100%;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n/************\n * Headings\n ************/\n.md-display-4 {\n  font-size: 112px;\n  font-weight: 300;\n  letter-spacing: -0.010em;\n  line-height: 112px; }\n\n.md-display-3 {\n  font-size: 56px;\n  font-weight: 400;\n  letter-spacing: -0.005em;\n  line-height: 56px; }\n\n.md-display-2 {\n  font-size: 45px;\n  font-weight: 400;\n  line-height: 64px; }\n\n.md-display-1 {\n  font-size: 34px;\n  font-weight: 400;\n  line-height: 40px; }\n\n.md-headline, .md-dialog md-dialog-title {\n  font-size: 24px;\n  font-weight: 400;\n  line-height: 32px; }\n\n.md-title {\n  font-size: 20px;\n  font-weight: 500;\n  letter-spacing: 0.005em; }\n\n.md-subhead {\n  font-size: 16px;\n  font-weight: 400;\n  letter-spacing: 0.010em;\n  line-height: 24px; }\n\n/************\n * Body Copy\n ************/\n.md-body-1 {\n  font-size: 14px;\n  font-weight: 400;\n  letter-spacing: 0.010em;\n  line-height: 20px; }\n\n.md-body-2 {\n  font-size: 14px;\n  font-weight: 500;\n  letter-spacing: 0.010em;\n  line-height: 24px; }\n\n.md-caption {\n  font-size: 12px;\n  letter-spacing: 0.020em; }\n\n.md-button {\n  letter-spacing: 0.010em; }\n\n/************\n * Defaults\n ************/\nbutton,\nselect,\nhtml,\ntextarea,\ninput {\n  font-family: RobotoDraft, Roboto, \"Helvetica Neue\", sans-serif; }\n\nselect,\nbutton,\ntextarea,\ninput {\n  font-size: 100%; }\n\nmd-dialog {\n  display: none; }\n\n.md-dialog {\n  min-width: 300px;\n  min-height: 100px;\n  padding: 24px;\n  box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 13px 19px 2px rgba(0, 0, 0, 0.14), 0px 5px 24px 4px rgba(0, 0, 0, 0.12);\n  display: flex;\n  flex-direction: column;\n  opacity: 0;\n  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);\n  transform: scale(0.2);\n  order: 1;\n  overflow: auto;\n  -webkit-overflow-scrolling: touch; }\n  .md-dialog:focus {\n    outline: none; }\n  .md-dialog.md-active {\n    opacity: 1;\n    transform: perspective(1px) scale(1); }\n\n.md-dialog {\n  border-radius: 4px;\n  background-color: white; }\n  .md-dialog.md-content-overflow .md-actions, .md-dialog.md-content-overflow md-dialog-actions {\n    border-top-color: rgba(0, 0, 0, 0.12); }\n\n.md-dialog md-dialog-actions {\n  display: flex;\n  order: 2;\n  box-sizing: border-box;\n  align-items: center;\n  justify-content: flex-end;\n  padding-top: 24px;\n  padding-right: 8px;\n  padding-left: 16px;\n  margin-bottom: -24px;\n  margin-left: -24px;\n  margin-right: -24px;\n  right: -24px;\n  min-height: 52px;\n  overflow: hidden; }\n  .md-dialog md-dialog-actions [md-button], .md-dialog md-dialog-actions [md-raised-button] {\n    margin-bottom: 8px;\n    margin-left: 8px;\n    margin-right: 0;\n    margin-top: 8px; }\n\nhtml, body {\n  -webkit-tap-highlight-color: transparent;\n  -webkit-touch-callout: none;\n  min-height: 100%;\n  -webkit-text-size-adjust: 100%;\n  -ms-text-size-adjust: 100%;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n/************\n * Headings\n ************/\n.md-display-4 {\n  font-size: 112px;\n  font-weight: 300;\n  letter-spacing: -0.010em;\n  line-height: 112px; }\n\n.md-display-3 {\n  font-size: 56px;\n  font-weight: 400;\n  letter-spacing: -0.005em;\n  line-height: 56px; }\n\n.md-display-2 {\n  font-size: 45px;\n  font-weight: 400;\n  line-height: 64px; }\n\n.md-display-1 {\n  font-size: 34px;\n  font-weight: 400;\n  line-height: 40px; }\n\n.md-headline, .md-dialog md-dialog-title {\n  font-size: 24px;\n  font-weight: 400;\n  line-height: 32px; }\n\n.md-title {\n  font-size: 20px;\n  font-weight: 500;\n  letter-spacing: 0.005em; }\n\n.md-subhead {\n  font-size: 16px;\n  font-weight: 400;\n  letter-spacing: 0.010em;\n  line-height: 24px; }\n\n/************\n * Body Copy\n ************/\n.md-body-1 {\n  font-size: 14px;\n  font-weight: 400;\n  letter-spacing: 0.010em;\n  line-height: 20px; }\n\n.md-body-2 {\n  font-size: 14px;\n  font-weight: 500;\n  letter-spacing: 0.010em;\n  line-height: 24px; }\n\n.md-caption {\n  font-size: 12px;\n  letter-spacing: 0.020em; }\n\n.md-button {\n  letter-spacing: 0.010em; }\n\n/************\n * Defaults\n ************/\nbutton,\nselect,\nhtml,\ntextarea,\ninput {\n  font-family: RobotoDraft, Roboto, \"Helvetica Neue\", sans-serif; }\n\nselect,\nbutton,\ntextarea,\ninput {\n  font-size: 100%; }\n\n.md-dialog md-dialog-title {\n  margin-bottom: 20px; }\n\nmd-divider {\n  display: block;\n  border-top-width: 1px;\n  border-top-style: solid;\n  margin: 0; }\n  md-divider[md-inset] {\n    margin-left: 80px; }\n\n.layout-row > md-divider {\n  border-top-width: 0;\n  border-right-width: 1px;\n  border-right-style: solid; }\n\nmd-divider {\n  border-top-color: rgba(0, 0, 0, 0.12); }\n\n.layout-row > md-divider {\n  border-right-color: rgba(0, 0, 0, 0.12); }\n\nmd-icon {\n  margin: auto;\n  background-repeat: no-repeat no-repeat;\n  display: inline-block;\n  vertical-align: middle;\n  fill: currentColor;\n  height: 24px;\n  width: 24px; }\n  md-icon svg {\n    pointer-events: none; }\n  md-icon[md-font-icon] {\n    line-height: 1;\n    width: auto; }\n\nmd-list {\n  display: block;\n  padding: 8px 0px 8px 0px; }\n  md-list .md-subheader {\n    font-size: 14px;\n    font-weight: 500;\n    letter-spacing: 0.010em;\n    line-height: 1.2em; }\n\nmd-list-item {\n  position: relative; }\n  md-list-item.md-proxy-focus.md-focused .md-no-style {\n    transition: background-color 0.15s linear; }\n  md-list-item.md-no-proxy,\n  md-list-item .md-no-style {\n    position: relative;\n    padding: 0px 16px;\n    flex: 1 1 auto; }\n    md-list-item.md-no-proxy.md-button,\n    md-list-item .md-no-style.md-button {\n      font-size: inherit;\n      height: inherit;\n      text-align: left;\n      text-transform: none;\n      width: 100%;\n      white-space: normal;\n      flex-direction: inherit;\n      align-items: inherit;\n      border-radius: 0; }\n      md-list-item.md-no-proxy.md-button > .md-ripple-container,\n      md-list-item .md-no-style.md-button > .md-ripple-container {\n        border-radius: 0; }\n    md-list-item.md-no-proxy:focus,\n    md-list-item .md-no-style:focus {\n      outline: none; }\n  md-list-item.md-with-secondary {\n    position: relative; }\n  md-list-item.md-clickable:hover {\n    cursor: pointer; }\n  md-list-item md-divider {\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 100%; }\n    md-list-item md-divider[md-inset] {\n      left: 96px;\n      width: calc(100% - 96px);\n      margin: 0; }\n\nmd-list-item, md-list-item .md-list-item-inner {\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  min-height: 48px;\n  height: auto; }\n  md-list-item > div.md-primary > [md-icon]:not(.md-avatar-icon),\n  md-list-item > div.md-secondary > [md-icon]:not(.md-avatar-icon),\n  md-list-item > [md-icon]:first-child:not(.md-avatar-icon),\n  md-list-item > [md-icon].md-secondary:not(.md-avatar-icon), md-list-item .md-list-item-inner > div.md-primary > [md-icon]:not(.md-avatar-icon),\n  md-list-item .md-list-item-inner > div.md-secondary > [md-icon]:not(.md-avatar-icon),\n  md-list-item .md-list-item-inner > [md-icon]:first-child:not(.md-avatar-icon),\n  md-list-item .md-list-item-inner > [md-icon].md-secondary:not(.md-avatar-icon) {\n    width: 24px;\n    margin-top: 16px;\n    margin-bottom: 12px;\n    box-sizing: content-box; }\n  md-list-item > div.md-primary > md-checkbox,\n  md-list-item > div.md-secondary > md-checkbox,\n  md-list-item > md-checkbox,\n  md-list-item md-checkbox.md-secondary, md-list-item .md-list-item-inner > div.md-primary > md-checkbox,\n  md-list-item .md-list-item-inner > div.md-secondary > md-checkbox,\n  md-list-item .md-list-item-inner > md-checkbox,\n  md-list-item .md-list-item-inner md-checkbox.md-secondary {\n    align-self: center; }\n    md-list-item > div.md-primary > md-checkbox .md-label,\n    md-list-item > div.md-secondary > md-checkbox .md-label,\n    md-list-item > md-checkbox .md-label,\n    md-list-item md-checkbox.md-secondary .md-label, md-list-item .md-list-item-inner > div.md-primary > md-checkbox .md-label,\n    md-list-item .md-list-item-inner > div.md-secondary > md-checkbox .md-label,\n    md-list-item .md-list-item-inner > md-checkbox .md-label,\n    md-list-item .md-list-item-inner md-checkbox.md-secondary .md-label {\n      display: none; }\n  md-list-item > [md-icon]:first-child:not(.md-avatar-icon), md-list-item .md-list-item-inner > [md-icon]:first-child:not(.md-avatar-icon) {\n    margin-right: 32px; }\n  md-list-item > md-checkbox, md-list-item .md-list-item-inner > md-checkbox {\n    width: 24px;\n    margin-left: 3px;\n    margin-right: 29px;\n    margin-top: 16px; }\n  md-list-item .md-avatar, md-list-item .md-avatar-icon, md-list-item .md-list-item-inner .md-avatar, md-list-item .md-list-item-inner .md-avatar-icon {\n    margin-top: 8px;\n    margin-bottom: 8px;\n    margin-right: 16px;\n    border-radius: 50%;\n    box-sizing: content-box; }\n  md-list-item .md-avatar, md-list-item .md-list-item-inner .md-avatar {\n    width: 40px;\n    height: 40px; }\n  md-list-item .md-avatar-icon, md-list-item .md-list-item-inner .md-avatar-icon {\n    padding: 8px; }\n  md-list-item md-checkbox.md-secondary,\n  md-list-item md-switch.md-secondary, md-list-item .md-list-item-inner md-checkbox.md-secondary,\n  md-list-item .md-list-item-inner md-switch.md-secondary {\n    margin-top: 0;\n    margin-bottom: 0; }\n  md-list-item md-checkbox.md-secondary, md-list-item .md-list-item-inner md-checkbox.md-secondary {\n    margin-right: 0; }\n  md-list-item md-switch.md-secondary, md-list-item .md-list-item-inner md-switch.md-secondary {\n    margin-right: -6px; }\n  md-list-item button.md-button.md-secondary-container, md-list-item .md-list-item-inner button.md-button.md-secondary-container {\n    background-color: transparent;\n    align-self: center;\n    border-radius: 50%;\n    margin: 0px;\n    min-width: 0px; }\n    md-list-item button.md-button.md-secondary-container .md-ripple,\n    md-list-item button.md-button.md-secondary-container .md-ripple-container, md-list-item .md-list-item-inner button.md-button.md-secondary-container .md-ripple,\n    md-list-item .md-list-item-inner button.md-button.md-secondary-container .md-ripple-container {\n      border-radius: 50%; }\n    md-list-item button.md-button.md-secondary-container.md-icon-button, md-list-item .md-list-item-inner button.md-button.md-secondary-container.md-icon-button {\n      margin-right: -12px; }\n  md-list-item .md-secondary-container,\n  md-list-item .md-secondary, md-list-item .md-list-item-inner .md-secondary-container,\n  md-list-item .md-list-item-inner .md-secondary {\n    position: absolute;\n    top: 50%;\n    right: 16px;\n    margin: 0 0 0 16px;\n    transform: translate3d(0, -50%, 0); }\n  md-list-item > .md-button.md-secondary-container > .md-secondary, md-list-item .md-list-item-inner > .md-button.md-secondary-container > .md-secondary {\n    margin-left: 0;\n    position: static; }\n  md-list-item > p, md-list-item > .md-list-item-inner > p, md-list-item .md-list-item-inner > p, md-list-item .md-list-item-inner > .md-list-item-inner > p {\n    flex: 1;\n    margin: 0; }\n\nmd-list-item.md-2-line,\nmd-list-item.md-2-line > .md-no-style,\nmd-list-item.md-3-line,\nmd-list-item.md-3-line > .md-no-style {\n  align-items: flex-start;\n  justify-content: center; }\n  md-list-item.md-2-line .md-list-item-text,\n  md-list-item.md-2-line > .md-no-style .md-list-item-text,\n  md-list-item.md-3-line .md-list-item-text,\n  md-list-item.md-3-line > .md-no-style .md-list-item-text {\n    flex: 1;\n    margin: auto;\n    text-overflow: ellipsis; }\n    md-list-item.md-2-line .md-list-item-text.md-offset,\n    md-list-item.md-2-line > .md-no-style .md-list-item-text.md-offset,\n    md-list-item.md-3-line .md-list-item-text.md-offset,\n    md-list-item.md-3-line > .md-no-style .md-list-item-text.md-offset {\n      margin-left: 56px; }\n    md-list-item.md-2-line .md-list-item-text h3,\n    md-list-item.md-2-line > .md-no-style .md-list-item-text h3,\n    md-list-item.md-3-line .md-list-item-text h3,\n    md-list-item.md-3-line > .md-no-style .md-list-item-text h3 {\n      font-size: 16px;\n      font-weight: 400;\n      letter-spacing: 0.010em;\n      margin: 0 0 0px 0;\n      line-height: 1.2em;\n      overflow: hidden;\n      white-space: nowrap;\n      text-overflow: ellipsis; }\n    md-list-item.md-2-line .md-list-item-text h4,\n    md-list-item.md-2-line > .md-no-style .md-list-item-text h4,\n    md-list-item.md-3-line .md-list-item-text h4,\n    md-list-item.md-3-line > .md-no-style .md-list-item-text h4 {\n      font-size: 14px;\n      letter-spacing: 0.010em;\n      margin: 3px 0 1px 0;\n      font-weight: 400;\n      line-height: 1.2em;\n      overflow: hidden;\n      white-space: nowrap;\n      text-overflow: ellipsis; }\n    md-list-item.md-2-line .md-list-item-text p,\n    md-list-item.md-2-line > .md-no-style .md-list-item-text p,\n    md-list-item.md-3-line .md-list-item-text p,\n    md-list-item.md-3-line > .md-no-style .md-list-item-text p {\n      font-size: 14px;\n      font-weight: 500;\n      letter-spacing: 0.010em;\n      margin: 0 0 0 0;\n      line-height: 1.6em; }\n\nmd-list-item.md-2-line,\nmd-list-item.md-2-line > .md-no-style {\n  height: auto;\n  min-height: 72px; }\n  md-list-item.md-2-line.md-long-text,\n  md-list-item.md-2-line > .md-no-style.md-long-text {\n    margin: 1.6em; }\n  md-list-item.md-2-line > .md-avatar, md-list-item.md-2-line .md-avatar-icon,\n  md-list-item.md-2-line > .md-no-style > .md-avatar,\n  md-list-item.md-2-line > .md-no-style .md-avatar-icon {\n    margin-top: 12px; }\n  md-list-item.md-2-line > [md-icon]:first-child,\n  md-list-item.md-2-line > .md-no-style > [md-icon]:first-child {\n    align-self: flex-start; }\n  md-list-item.md-2-line .md-list-item-text,\n  md-list-item.md-2-line > .md-no-style .md-list-item-text {\n    flex: 1; }\n\nmd-list-item.md-3-line,\nmd-list-item.md-3-line > .md-no-style {\n  height: auto;\n  min-height: 88px; }\n  md-list-item.md-3-line.md-long-text,\n  md-list-item.md-3-line > .md-no-style.md-long-text {\n    margin: 1.6em; }\n  md-list-item.md-3-line > [md-icon]:first-child,\n  md-list-item.md-3-line > .md-avatar,\n  md-list-item.md-3-line > .md-no-style > [md-icon]:first-child,\n  md-list-item.md-3-line > .md-no-style > .md-avatar {\n    margin-top: 16px; }\n\nmd-list md-list-item.md-2-line .md-list-item-text h3, md-list md-list-item.md-2-line .md-list-item-text h4,\nmd-list md-list-item.md-3-line .md-list-item-text h3,\nmd-list md-list-item.md-3-line .md-list-item-text h4 {\n  color: rgba(0, 0, 0, 0.87); }\n\nmd-list md-list-item.md-2-line .md-list-item-text p,\nmd-list md-list-item.md-3-line .md-list-item-text p {\n  color: rgba(0, 0, 0, 0.54); }\n\nmd-list .md-proxy-focus.md-focused div.md-no-style {\n  background-color: white; }\n\nmd-list md-list-item > .md-list-item-inner > [md-icon] {\n  color: rgba(0, 0, 0, 0.54); }\n  md-list md-list-item > .md-list-item-inner > [md-icon].md-highlight {\n    color: #009688; }\n    md-list md-list-item > .md-list-item-inner > [md-icon].md-highlight.md-accent {\n      color: #9c27b0; }\n\nmd-list md-list-item > .md-list-item-inner > .md-avatar-icon {\n  background-color: rgba(0, 0, 0, 0.54);\n  color: whitesmoke; }\n\n/**\n * Mixin that creates a new stacking context.\n * see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context\n */\nform md-messages, form [md-messages] {\n  position: relative;\n  order: 4;\n  overflow: hidden;\n  clear: left; }\n  html[dir=rtl] form md-messages, html[dir=rtl] form [md-messages] {\n    clear: right;\n    unicode-bidi: embed; }\n  body[dir=rtl] form md-messages, body[dir=rtl] form [md-messages] {\n    clear: right;\n    unicode-bidi: embed; }\n  form md-messages bdo[dir=rtl], form [md-messages] bdo[dir=rtl] {\n    direction: rtl;\n    unicode-bidi: bidi-override; }\n  form md-messages bdo[dir=ltr], form [md-messages] bdo[dir=ltr] {\n    direction: ltr;\n    unicode-bidi: bidi-override; }\n\nform md-message, form [md-message] {\n  overflow: hidden; }\n\n[md-peekaboo][breakAction=show] {\n  display: none; }\n  [md-peekaboo][breakAction=show].md-peekaboo-active {\n    display: inherit; }\n\n[md-peekaboo][breakAction=hide] {\n  display: inherit; }\n  [md-peekaboo][breakAction=hide].md-peekaboo-active {\n    display: none; }\n\n/**\n * Mixin that creates a new stacking context.\n * see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context\n */\n.md-subheader {\n  display: block;\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 1em;\n  margin: 0 0 0 0;\n  position: relative; }\n  .md-subheader .md-subheader-inner {\n    display: block;\n    padding: 16px; }\n  .md-subheader .md-subheader-content {\n    display: block;\n    z-index: 1;\n    position: relative; }\n\n.md-subheader {\n  color: rgba(0, 0, 0, 0.54);\n  background-color: white; }\n  .md-subheader.md-primary {\n    color: #009688; }\n  .md-subheader.md-accent {\n    color: #9c27b0; }\n  .md-subheader.md-warn {\n    color: #f44336; }\n\nmd-switch {\n  display: flex;\n  align-items: center;\n  margin: 15px;\n  white-space: nowrap;\n  cursor: pointer;\n  outline: none;\n  user-select: none; }\n  md-switch * {\n    box-sizing: border-box; }\n  md-switch .md-switch-container {\n    cursor: grab;\n    width: 36px;\n    height: 24px;\n    position: relative;\n    user-select: none;\n    margin-right: 8px; }\n  md-switch:not([disabled]) .md-switch-dragging,\n  md-switch:not([disabled]).md-switch-dragging .md-switch-container {\n    cursor: grabbing; }\n  md-switch .md-switch-label {\n    border: 0 transparent; }\n  md-switch .md-switch-bar {\n    left: 1px;\n    width: 34px;\n    top: 5px;\n    height: 14px;\n    border-radius: 8px;\n    position: absolute; }\n  md-switch .md-switch-thumb-container {\n    top: 2px;\n    left: 0;\n    width: 16px;\n    position: absolute;\n    transform: translate3d(0, 0, 0);\n    z-index: 1; }\n  md-switch[aria-checked=\"true\"] .md-switch-thumb-container {\n    transform: translate3d(100%, 0, 0); }\n  md-switch .md-switch-thumb {\n    position: absolute;\n    margin: 0;\n    left: 0;\n    top: 0;\n    outline: none;\n    height: 20px;\n    width: 20px;\n    border-radius: 50%;\n    box-shadow: 0px 2px 5px 0 rgba(0, 0, 0, 0.26); }\n    md-switch .md-switch-thumb .md-ripple-container {\n      position: absolute;\n      display: block;\n      width: auto;\n      height: auto;\n      left: -20px;\n      top: -20px;\n      right: -20px;\n      bottom: -20px; }\n  md-switch:not(.md-switch-dragging) .md-switch-bar,\n  md-switch:not(.md-switch-dragging) .md-switch-thumb-container,\n  md-switch:not(.md-switch-dragging) .md-switch-thumb {\n    transition: all 0.08s linear;\n    transition-property: transform, background-color; }\n  md-switch:not(.md-switch-dragging) .md-switch-bar,\n  md-switch:not(.md-switch-dragging) .md-switch-thumb {\n    transition-delay: 0.05s; }\n\n@media screen and (-ms-high-contrast: active) {\n  md-switch .md-switch-bar {\n    background-color: #666; }\n  md-switch[aria-checked=\"true\"] .md-switch-bar {\n    background-color: #9E9E9E; }\n  md-switch.md-default-theme .md-switch-thumb {\n    background-color: #fff; } }\n\nmd-switch .md-switch-thumb {\n  background-color: #fafafa; }\n\nmd-switch .md-switch-bar {\n  background-color: #9e9e9e; }\n\nmd-switch[aria-checked=\"true\"] .md-switch-thumb {\n  background-color: #9c27b0; }\n\nmd-switch[aria-checked=\"true\"] .md-switch-bar {\n  background-color: rgba(156, 39, 176, 0.5); }\n\nmd-switch[aria-checked=\"true\"].md-primary .md-switch-thumb {\n  background-color: #009688; }\n\nmd-switch[aria-checked=\"true\"].md-primary .md-switch-bar {\n  background-color: rgba(0, 150, 136, 0.5); }\n\nmd-switch[aria-checked=\"true\"].md-warn .md-switch-thumb {\n  background-color: #f44336; }\n\nmd-switch[aria-checked=\"true\"].md-warn .md-switch-bar {\n  background-color: rgba(244, 67, 54, 0.5); }\n\nmd-switch[disabled] .md-switch-thumb {\n  background-color: #bdbdbd; }\n\nmd-switch[disabled] .md-switch-bar {\n  background-color: rgba(0, 0, 0, 0.12); }\n\nmd-switch:focus .md-switch-label:not(:empty) {\n  border: 1px dotted rgba(0, 0, 0, 0.87); }\n\n/**\n * Mixin that creates a new stacking context.\n * see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context\n */\n@keyframes md-tab-content-hide {\n  0% {\n    opacity: 1; }\n  50% {\n    opacity: 1; }\n  100% {\n    opacity: 0; } }\n\nmd-tab-data {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: -1;\n  opacity: 0; }\n\nmd-tabs {\n  display: block;\n  margin: 0;\n  border-radius: 2px;\n  overflow: hidden;\n  position: relative;\n  flex-shrink: 0; }\n  md-tabs:not(.md-no-tab-content):not([md-dynamic-height]) {\n    min-height: 248px; }\n  md-tabs[md-align-tabs=\"bottom\"] {\n    padding-bottom: 48px; }\n    md-tabs[md-align-tabs=\"bottom\"] md-tabs-wrapper {\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      right: 0;\n      height: 48px;\n      z-index: 2; }\n    md-tabs[md-align-tabs=\"bottom\"] md-tabs-content-wrapper {\n      top: 0;\n      bottom: 48px; }\n  md-tabs[md-dynamic-height] md-tabs-content-wrapper {\n    min-height: 0;\n    position: relative;\n    top: auto;\n    left: auto;\n    right: auto;\n    bottom: auto;\n    overflow: visible; }\n  md-tabs[md-dynamic-height] md-tab-content.md-active {\n    position: relative; }\n  md-tabs[md-border-bottom] md-tabs-wrapper {\n    border-width: 0 0 1px;\n    border-style: solid; }\n  md-tabs[md-border-bottom]:not([md-dynamic-height]) md-tabs-content-wrapper {\n    top: 49px; }\n\nmd-tabs-wrapper {\n  display: block;\n  position: relative; }\n  md-tabs-wrapper md-prev-button, md-tabs-wrapper md-next-button {\n    height: 100%;\n    width: 32px;\n    position: absolute;\n    top: 50%;\n    transform: translateY(-50%);\n    line-height: 1em;\n    z-index: 2;\n    cursor: pointer;\n    font-size: 16px;\n    background: transparent no-repeat center center;\n    transition: all 0.5s cubic-bezier(0.35, 0, 0.25, 1); }\n    md-tabs-wrapper md-prev-button:focus, md-tabs-wrapper md-next-button:focus {\n      outline: none; }\n    md-tabs-wrapper md-prev-button.md-disabled, md-tabs-wrapper md-next-button.md-disabled {\n      opacity: 0.25;\n      cursor: default; }\n    md-tabs-wrapper md-prev-button.ng-leave, md-tabs-wrapper md-next-button.ng-leave {\n      transition: none; }\n    md-tabs-wrapper md-prev-button [md-icon], md-tabs-wrapper md-next-button [md-icon] {\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      transform: translate3d(-50%, -50%, 0); }\n  md-tabs-wrapper md-prev-button {\n    left: 0;\n    background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE3LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPiA8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPiA8c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjQgMjQiIHhtbDpzcGFjZT0icHJlc2VydmUiPiA8ZyBpZD0iSGVhZGVyIj4gPGc+IDxyZWN0IHg9Ii02MTgiIHk9Ii0xMjA4IiBmaWxsPSJub25lIiB3aWR0aD0iMTQwMCIgaGVpZ2h0PSIzNjAwIi8+IDwvZz4gPC9nPiA8ZyBpZD0iTGFiZWwiPiA8L2c+IDxnIGlkPSJJY29uIj4gPGc+IDxwb2x5Z29uIHBvaW50cz0iMTUuNCw3LjQgMTQsNiA4LDEyIDE0LDE4IDE1LjQsMTYuNiAxMC44LDEyIAkJIiBzdHlsZT0iZmlsbDp3aGl0ZTsiLz4gPHJlY3QgZmlsbD0ibm9uZSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ii8+IDwvZz4gPC9nPiA8ZyBpZD0iR3JpZCIgZGlzcGxheT0ibm9uZSI+IDxnIGRpc3BsYXk9ImlubGluZSI+IDwvZz4gPC9nPiA8L3N2Zz4NCg==\"); }\n  md-tabs-wrapper md-next-button {\n    right: 0;\n    background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE3LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPiA8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPiA8c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjQgMjQiIHhtbDpzcGFjZT0icHJlc2VydmUiPiA8ZyBpZD0iSGVhZGVyIj4gPGc+IDxyZWN0IHg9Ii02MTgiIHk9Ii0xMzM2IiBmaWxsPSJub25lIiB3aWR0aD0iMTQwMCIgaGVpZ2h0PSIzNjAwIi8+IDwvZz4gPC9nPiA8ZyBpZD0iTGFiZWwiPiA8L2c+IDxnIGlkPSJJY29uIj4gPGc+IDxwb2x5Z29uIHBvaW50cz0iMTAsNiA4LjYsNy40IDEzLjIsMTIgOC42LDE2LjYgMTAsMTggMTYsMTIgCQkiIHN0eWxlPSJmaWxsOndoaXRlOyIvPiA8cmVjdCBmaWxsPSJub25lIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiLz4gPC9nPiA8L2c+IDxnIGlkPSJHcmlkIiBkaXNwbGF5PSJub25lIj4gPGcgZGlzcGxheT0iaW5saW5lIj4gPC9nPiA8L2c+IDwvc3ZnPg0K\"); }\n    md-tabs-wrapper md-next-button [md-icon] {\n      transform: translate3d(-50%, -50%, 0) rotate(180deg); }\n  md-tabs-wrapper.md-stretch-tabs md-pagination-wrapper {\n    width: 100%;\n    display: flex;\n    flex-direction: row; }\n    md-tabs-wrapper.md-stretch-tabs md-pagination-wrapper md-tab-item {\n      flex-grow: 1; }\n\nmd-tabs-canvas {\n  position: relative;\n  overflow: hidden;\n  display: block;\n  height: 48px; }\n  md-tabs-canvas:after {\n    content: '';\n    display: table;\n    clear: both; }\n  md-tabs-canvas .md-dummy-wrapper {\n    position: absolute;\n    top: 0;\n    left: 0; }\n  md-tabs-canvas.md-paginated {\n    margin: 0 32px; }\n  md-tabs-canvas.md-center-tabs {\n    display: flex;\n    flex-direction: column;\n    text-align: center; }\n    md-tabs-canvas.md-center-tabs .md-tab {\n      float: none;\n      display: inline-block; }\n\nmd-pagination-wrapper {\n  height: 48px;\n  display: block;\n  transition: transform 0.5s cubic-bezier(0.35, 0, 0.25, 1);\n  position: absolute;\n  width: 999999px;\n  left: 0;\n  transform: translate3d(0, 0, 0); }\n  md-pagination-wrapper:after {\n    content: '';\n    display: table;\n    clear: both; }\n  md-pagination-wrapper.md-center-tabs {\n    position: relative;\n    width: initial;\n    margin: 0 auto; }\n\nmd-tabs-content-wrapper {\n  display: block;\n  position: absolute;\n  top: 48px;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  overflow: hidden; }\n\nmd-tab-content {\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  transition: transform 0.5s cubic-bezier(0.35, 0, 0.25, 1);\n  overflow: auto; }\n  md-tab-content.md-no-scroll {\n    bottom: auto;\n    overflow: hidden; }\n  md-tab-content.ng-leave, md-tab-content.md-no-transition {\n    transition: none; }\n  md-tab-content.md-left {\n    transform: translateX(-100%);\n    animation: 1s md-tab-content-hide;\n    opacity: 0; }\n    md-tab-content.md-left * {\n      transition: visibility 0s linear;\n      transition-delay: 0.5s;\n      visibility: hidden; }\n  md-tab-content.md-right {\n    transform: translateX(100%);\n    animation: 1s md-tab-content-hide;\n    opacity: 0; }\n    md-tab-content.md-right * {\n      transition: visibility 0s linear;\n      transition-delay: 0.5s;\n      visibility: hidden; }\n  md-tab-content > div.ng-leave {\n    animation: 1s md-tab-content-hide; }\n\nmd-ink-bar {\n  position: absolute;\n  left: auto;\n  right: auto;\n  bottom: 0;\n  height: 2px; }\n  md-ink-bar.md-left {\n    transition: left 0.125s cubic-bezier(0.35, 0, 0.25, 1), right 0.25s cubic-bezier(0.35, 0, 0.25, 1); }\n  md-ink-bar.md-right {\n    transition: left 0.25s cubic-bezier(0.35, 0, 0.25, 1), right 0.125s cubic-bezier(0.35, 0, 0.25, 1); }\n\n[md-tab] {\n  position: absolute;\n  z-index: -1;\n  left: -9999px; }\n\n.md-tab {\n  font-size: 14px;\n  text-align: center;\n  line-height: 24px;\n  padding: 12px 24px;\n  transition: background-color 0.35s cubic-bezier(0.35, 0, 0.25, 1);\n  cursor: pointer;\n  white-space: nowrap;\n  position: relative;\n  text-transform: uppercase;\n  float: left;\n  font-weight: 500;\n  box-sizing: border-box;\n  overflow: hidden;\n  text-overflow: ellipsis; }\n  .md-tab.md-focused {\n    box-shadow: none;\n    outline: none; }\n  .md-tab.md-active {\n    cursor: default; }\n  .md-tab.md-disabled {\n    pointer-events: none;\n    touch-action: pan-y;\n    user-select: none;\n    -webkit-user-drag: none;\n    opacity: 0.5;\n    cursor: default; }\n  .md-tab.ng-leave {\n    transition: none; }\n\nmd-toolbar + md-tabs {\n  border-top-left-radius: 0;\n  border-top-right-radius: 0; }\n\nmd-tabs md-tabs-wrapper {\n  background-color: transparent;\n  border-color: rgba(0, 0, 0, 0.12); }\n\nmd-tabs .md-paginator [md-icon] {\n  color: #009688; }\n\nmd-tabs md-ink-bar {\n  color: #9c27b0;\n  background: #9c27b0; }\n\nmd-tabs .md-tab {\n  color: rgba(0, 0, 0, 0.87); }\n  md-tabs .md-tab[disabled], md-tabs .md-tab[disabled] [md-icon] {\n    color: rgba(0, 0, 0, 0.26); }\n  md-tabs .md-tab.md-active, md-tabs .md-tab.md-active [md-icon], md-tabs .md-tab.md-focused, md-tabs .md-tab.md-focused [md-icon] {\n    color: #009688; }\n  md-tabs .md-tab.md-focused {\n    background: #b2dfdb; }\n  md-tabs .md-tab .md-ripple-container {\n    color: #e1bee7; }\n\nmd-tabs.md-accent > md-tabs-wrapper {\n  background-color: #9c27b0; }\n  md-tabs.md-accent > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]) {\n    color: #ba68c8; }\n    md-tabs.md-accent > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-active, md-tabs.md-accent > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-active [md-icon], md-tabs.md-accent > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused, md-tabs.md-accent > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused [md-icon] {\n      color: rgba(255, 255, 255, 0.870588); }\n    md-tabs.md-accent > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused {\n      background: white; }\n  md-tabs.md-accent > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-ink-bar {\n    color: #00897b;\n    background: #00897b; }\n\nmd-tabs.md-primary > md-tabs-wrapper {\n  background-color: #009688; }\n  md-tabs.md-primary > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]) {\n    color: #b2dfdb; }\n    md-tabs.md-primary > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-active, md-tabs.md-primary > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-active [md-icon], md-tabs.md-primary > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused, md-tabs.md-primary > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused [md-icon] {\n      color: white; }\n    md-tabs.md-primary > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused {\n      background: rgba(0, 0, 0, 0.870588); }\n\nmd-tabs.md-warn > md-tabs-wrapper {\n  background-color: #f44336; }\n  md-tabs.md-warn > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]) {\n    color: #e57373; }\n    md-tabs.md-warn > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-active, md-tabs.md-warn > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-active [md-icon], md-tabs.md-warn > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused, md-tabs.md-warn > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused [md-icon] {\n      color: white; }\n    md-tabs.md-warn > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused {\n      background: rgba(0, 0, 0, 0.870588); }\n\nmd-toolbar > md-tabs > md-tabs-wrapper {\n  background-color: #009688; }\n  md-toolbar > md-tabs > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]) {\n    color: #b2dfdb; }\n    md-toolbar > md-tabs > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-active, md-toolbar > md-tabs > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-active [md-icon], md-toolbar > md-tabs > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused, md-toolbar > md-tabs > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused [md-icon] {\n      color: white; }\n    md-toolbar > md-tabs > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused {\n      background: rgba(0, 0, 0, 0.870588); }\n\nmd-toolbar.md-accent > md-tabs > md-tabs-wrapper {\n  background-color: #9c27b0; }\n  md-toolbar.md-accent > md-tabs > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]) {\n    color: #ba68c8; }\n    md-toolbar.md-accent > md-tabs > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-active, md-toolbar.md-accent > md-tabs > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-active [md-icon], md-toolbar.md-accent > md-tabs > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused, md-toolbar.md-accent > md-tabs > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused [md-icon] {\n      color: rgba(255, 255, 255, 0.870588); }\n    md-toolbar.md-accent > md-tabs > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused {\n      background: white; }\n  md-toolbar.md-accent > md-tabs > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-ink-bar {\n    color: #00897b;\n    background: #00897b; }\n\nmd-toolbar.md-warn > md-tabs > md-tabs-wrapper {\n  background-color: #f44336; }\n  md-toolbar.md-warn > md-tabs > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]) {\n    color: #e57373; }\n    md-toolbar.md-warn > md-tabs > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-active, md-toolbar.md-warn > md-tabs > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-active [md-icon], md-toolbar.md-warn > md-tabs > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused, md-toolbar.md-warn > md-tabs > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused [md-icon] {\n      color: white; }\n    md-toolbar.md-warn > md-tabs > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused {\n      background: rgba(0, 0, 0, 0.870588); }\n\n.md-whiteframe-1dp, .md-whiteframe-z1 {\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12); }\n\n.md-whiteframe-2dp {\n  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12); }\n\n.md-whiteframe-3dp {\n  box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 3px 3px -2px rgba(0, 0, 0, 0.12); }\n\n.md-whiteframe-4dp, .md-whiteframe-z2 {\n  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12); }\n\n.md-whiteframe-5dp {\n  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12); }\n\n.md-whiteframe-6dp {\n  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12); }\n\n.md-whiteframe-7dp, .md-whiteframe-z3 {\n  box-shadow: 0px 4px 5px -2px rgba(0, 0, 0, 0.2), 0px 7px 10px 1px rgba(0, 0, 0, 0.14), 0px 2px 16px 1px rgba(0, 0, 0, 0.12); }\n\n.md-whiteframe-8dp {\n  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12); }\n\n.md-whiteframe-9dp {\n  box-shadow: 0px 5px 6px -3px rgba(0, 0, 0, 0.2), 0px 9px 12px 1px rgba(0, 0, 0, 0.14), 0px 3px 16px 2px rgba(0, 0, 0, 0.12); }\n\n.md-whiteframe-10dp, .md-whiteframe-z4 {\n  box-shadow: 0px 6px 6px -3px rgba(0, 0, 0, 0.2), 0px 10px 14px 1px rgba(0, 0, 0, 0.14), 0px 4px 18px 3px rgba(0, 0, 0, 0.12); }\n\n.md-whiteframe-11dp {\n  box-shadow: 0px 6px 7px -4px rgba(0, 0, 0, 0.2), 0px 11px 15px 1px rgba(0, 0, 0, 0.14), 0px 4px 20px 3px rgba(0, 0, 0, 0.12); }\n\n.md-whiteframe-12dp {\n  box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12); }\n\n.md-whiteframe-13dp, .md-whiteframe-z5 {\n  box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 13px 19px 2px rgba(0, 0, 0, 0.14), 0px 5px 24px 4px rgba(0, 0, 0, 0.12); }\n\n.md-whiteframe-14dp {\n  box-shadow: 0px 7px 9px -4px rgba(0, 0, 0, 0.2), 0px 14px 21px 2px rgba(0, 0, 0, 0.14), 0px 5px 26px 4px rgba(0, 0, 0, 0.12); }\n\n.md-whiteframe-15dp {\n  box-shadow: 0px 8px 9px -5px rgba(0, 0, 0, 0.2), 0px 15px 22px 2px rgba(0, 0, 0, 0.14), 0px 6px 28px 5px rgba(0, 0, 0, 0.12); }\n\n.md-whiteframe-16dp {\n  box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12); }\n\n.md-whiteframe-17dp {\n  box-shadow: 0px 8px 11px -5px rgba(0, 0, 0, 0.2), 0px 17px 26px 2px rgba(0, 0, 0, 0.14), 0px 6px 32px 5px rgba(0, 0, 0, 0.12); }\n\n.md-whiteframe-18dp {\n  box-shadow: 0px 9px 11px -5px rgba(0, 0, 0, 0.2), 0px 18px 28px 2px rgba(0, 0, 0, 0.14), 0px 7px 34px 6px rgba(0, 0, 0, 0.12); }\n\n.md-whiteframe-19dp {\n  box-shadow: 0px 9px 12px -6px rgba(0, 0, 0, 0.2), 0px 19px 29px 2px rgba(0, 0, 0, 0.14), 0px 7px 36px 6px rgba(0, 0, 0, 0.12); }\n\n.md-whiteframe-20dp {\n  box-shadow: 0px 10px 13px -6px rgba(0, 0, 0, 0.2), 0px 20px 31px 3px rgba(0, 0, 0, 0.14), 0px 8px 38px 7px rgba(0, 0, 0, 0.12); }\n\n.md-whiteframe-21dp {\n  box-shadow: 0px 10px 13px -6px rgba(0, 0, 0, 0.2), 0px 21px 33px 3px rgba(0, 0, 0, 0.14), 0px 8px 40px 7px rgba(0, 0, 0, 0.12); }\n\n.md-whiteframe-22dp {\n  box-shadow: 0px 10px 14px -6px rgba(0, 0, 0, 0.2), 0px 22px 35px 3px rgba(0, 0, 0, 0.14), 0px 8px 42px 7px rgba(0, 0, 0, 0.12); }\n\n.md-whiteframe-23dp {\n  box-shadow: 0px 11px 14px -7px rgba(0, 0, 0, 0.2), 0px 23px 36px 3px rgba(0, 0, 0, 0.14), 0px 9px 44px 8px rgba(0, 0, 0, 0.12); }\n\n.md-whiteframe-24dp {\n  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12); }\n\n@media screen and (-ms-high-contrast: active) {\n  md-whiteframe {\n    border: 1px solid #fff; } }\n", ""]);

	// exports


/***/ },
/* 225 */,
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var root_1 = __webpack_require__(80);
	var Subscription_1 = __webpack_require__(95);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var FutureAction = (function (_super) {
	    __extends(FutureAction, _super);
	    function FutureAction(scheduler, work) {
	        _super.call(this);
	        this.scheduler = scheduler;
	        this.work = work;
	        this.pending = false;
	    }
	    FutureAction.prototype.execute = function () {
	        if (this.isUnsubscribed) {
	            this.error = new Error('executing a cancelled action');
	        }
	        else {
	            try {
	                this.work(this.state);
	            }
	            catch (e) {
	                this.unsubscribe();
	                this.error = e;
	            }
	        }
	    };
	    FutureAction.prototype.schedule = function (state, delay) {
	        if (delay === void 0) { delay = 0; }
	        if (this.isUnsubscribed) {
	            return this;
	        }
	        return this._schedule(state, delay);
	    };
	    FutureAction.prototype._schedule = function (state, delay) {
	        var _this = this;
	        if (delay === void 0) { delay = 0; }
	        // Always replace the current state with the new state.
	        this.state = state;
	        // Set the pending flag indicating that this action has been scheduled, or
	        // has recursively rescheduled itself.
	        this.pending = true;
	        var id = this.id;
	        // If this action has an intervalID and the specified delay matches the
	        // delay we used to create the intervalID, don't call `setInterval` again.
	        if (id != null && this.delay === delay) {
	            return this;
	        }
	        this.delay = delay;
	        // If this action has an intervalID, but was rescheduled with a different
	        // `delay` time, cancel the current intervalID and call `setInterval` with
	        // the new `delay` time.
	        if (id != null) {
	            this.id = null;
	            root_1.root.clearInterval(id);
	        }
	        //
	        // Important implementation note:
	        //
	        // By default, FutureAction only executes once. However, Actions have the
	        // ability to be rescheduled from within the scheduled callback (mimicking
	        // recursion for asynchronous methods). This allows us to implement single
	        // and repeated actions with the same code path without adding API surface
	        // area, and implement tail-call optimization over asynchronous boundaries.
	        //
	        // However, JS runtimes make a distinction between intervals scheduled by
	        // repeatedly calling `setTimeout` vs. a single `setInterval` call, with
	        // the latter providing a better guarantee of precision.
	        //
	        // In order to accommodate both single and repeatedly rescheduled actions,
	        // use `setInterval` here for both cases. By default, the interval will be
	        // canceled after its first execution, or if the action schedules itself to
	        // run again with a different `delay` time.
	        //
	        // If the action recursively schedules itself to run again with the same
	        // `delay` time, the interval is not canceled, but allowed to loop again.
	        // The check of whether the interval should be canceled or not is run every
	        // time the interval is executed. The first time an action fails to
	        // reschedule itself, the interval is canceled.
	        //
	        this.id = root_1.root.setInterval(function () {
	            _this.pending = false;
	            var _a = _this, id = _a.id, scheduler = _a.scheduler;
	            scheduler.actions.push(_this);
	            scheduler.flush();
	            //
	            // Terminate this interval if the action didn't reschedule itself.
	            // Don't call `this.unsubscribe()` here, because the action could be
	            // rescheduled later. For example:
	            //
	            // ```
	            // scheduler.schedule(function doWork(counter) {
	            //   /* ... I'm a busy worker bee ... */
	            //   var originalAction = this;
	            //   /* wait 100ms before rescheduling this action again */
	            //   setTimeout(function () {
	            //     originalAction.schedule(counter + 1);
	            //   }, 100);
	            // }, 1000);
	            // ```
	            if (_this.pending === false && id != null) {
	                _this.id = null;
	                root_1.root.clearInterval(id);
	            }
	        }, delay);
	        return this;
	    };
	    FutureAction.prototype._unsubscribe = function () {
	        this.pending = false;
	        var _a = this, id = _a.id, scheduler = _a.scheduler;
	        var actions = scheduler.actions;
	        var index = actions.indexOf(this);
	        if (id != null) {
	            this.id = null;
	            root_1.root.clearInterval(id);
	        }
	        if (index !== -1) {
	            actions.splice(index, 1);
	        }
	        this.work = null;
	        this.state = null;
	        this.scheduler = null;
	    };
	    return FutureAction;
	}(Subscription_1.Subscription));
	exports.FutureAction = FutureAction;
	//# sourceMappingURL=FutureAction.js.map

/***/ },
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(374));
	__export(__webpack_require__(375));
	__export(__webpack_require__(372));
	__export(__webpack_require__(373));
	__export(__webpack_require__(664));


/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * angular2-google-maps - Angular 2 components for Google Maps
	 * @version v0.10.0
	 * @link https://github.com/SebastianM/angular2-google-maps#readme
	 * @license MIT
	 */
	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(1);
	var info_window_manager_1 = __webpack_require__(233);
	var infoWindowId = 0;
	/**
	 * SebmGoogleMapInfoWindow renders a info window inside a {@link SebmGoogleMapMarker} or standalone.
	 *
	 * ### Example
	 * ```typescript
	 * import {Component} from 'angular2/core';
	 * import {SebmGoogleMap, SebmGoogleMapMarker, SebmGoogleMapInfoWindow} from
	 * 'angular2-google-maps/core';
	 *
	 * @Component({
	 *  selector: 'my-map-cmp',
	 *  directives: [SebmGoogleMap, SebmGoogleMapMarker, SebmGoogleMapInfoWindow],
	 *  styles: [`
	 *    .sebm-google-map-container {
	 *      height: 300px;
	 *    }
	 * `],
	 *  template: `
	 *    <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
	 *      <sebm-google-map-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
	 *        <sebm-google-map-info-window [disableAutoPan]="true">
	 *          Hi, this is the content of the <strong>info window</strong>
	 *        </sebm-google-map-info-window>
	 *      </sebm-google-map-marker>
	 *    </sebm-google-map>
	 *  `
	 * })
	 * ```
	 */
	var SebmGoogleMapInfoWindow = (function () {
	    function SebmGoogleMapInfoWindow(_infoWindowManager, _el) {
	        this._infoWindowManager = _infoWindowManager;
	        this._el = _el;
	        this._infoWindowAddedToManager = false;
	        this._id = (infoWindowId++).toString();
	    }
	    SebmGoogleMapInfoWindow.prototype.ngOnInit = function () {
	        this.content = this._el.nativeElement.querySelector('.sebm-google-map-info-window-content');
	        this._infoWindowManager.addInfoWindow(this);
	        this._infoWindowAddedToManager = true;
	    };
	    /** @internal */
	    SebmGoogleMapInfoWindow.prototype.ngOnChanges = function (changes) {
	        if (!this._infoWindowAddedToManager) {
	            return;
	        }
	        if ((changes['latitude'] || changes['longitude']) && typeof this.latitude === 'number' &&
	            typeof this.longitude === 'number') {
	            this._infoWindowManager.setPosition(this);
	        }
	        if (changes['zIndex']) {
	            this._infoWindowManager.setZIndex(this);
	        }
	        this._setInfoWindowOptions(changes);
	    };
	    SebmGoogleMapInfoWindow.prototype._setInfoWindowOptions = function (changes) {
	        var options = {};
	        var optionKeys = Object.keys(changes).filter(function (k) { return SebmGoogleMapInfoWindow._infoWindowOptionsInputs.indexOf(k) !== -1; });
	        optionKeys.forEach(function (k) { options[k] = changes[k].currentValue; });
	        this._infoWindowManager.setOptions(this, options);
	    };
	    /**
	     * Opens the info window.
	     */
	    SebmGoogleMapInfoWindow.prototype.open = function () { return this._infoWindowManager.open(this); };
	    /**
	     * Closes the info window.
	     */
	    SebmGoogleMapInfoWindow.prototype.close = function () { return this._infoWindowManager.close(this); };
	    /** @internal */
	    SebmGoogleMapInfoWindow.prototype.id = function () { return this._id; };
	    /** @internal */
	    SebmGoogleMapInfoWindow.prototype.toString = function () { return 'SebmGoogleMapInfoWindow-' + this._id.toString(); };
	    /** @internal */
	    SebmGoogleMapInfoWindow.prototype.ngOnDestroy = function () { this._infoWindowManager.deleteInfoWindow(this); };
	    SebmGoogleMapInfoWindow._infoWindowOptionsInputs = ['disableAutoPan', 'maxWidth'];
	    SebmGoogleMapInfoWindow = __decorate([
	        core_1.Component({
	            selector: 'sebm-google-map-info-window',
	            inputs: ['latitude', 'longitude', 'disableAutoPan'],
	            template: "<div class='sebm-google-map-info-window-content'>\n      <ng-content></ng-content>\n    </div>\n  "
	        }), 
	        __metadata('design:paramtypes', [info_window_manager_1.InfoWindowManager, core_1.ElementRef])
	    ], SebmGoogleMapInfoWindow);
	    return SebmGoogleMapInfoWindow;
	}());
	exports.SebmGoogleMapInfoWindow = SebmGoogleMapInfoWindow;

	

/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global) {"use strict";
	var objectTypes = {
	    'boolean': false,
	    'function': true,
	    'object': true,
	    'number': false,
	    'string': false,
	    'undefined': false
	};
	exports.root = (objectTypes[typeof self] && self) || (objectTypes[typeof window] && window);
	/* tslint:disable:no-unused-variable */
	var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
	var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
	var freeGlobal = objectTypes[typeof global] && global;
	if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
	    exports.root = freeGlobal;
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(441)(module), (function() { return this; }())))

/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * angular2-google-maps - Angular 2 components for Google Maps
	 * @version v0.10.0
	 * @link https://github.com/SebastianM/angular2-google-maps#readme
	 * @license MIT
	 */
	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(1);
	var google_maps_api_wrapper_1 = __webpack_require__(146);
	var marker_manager_1 = __webpack_require__(148);
	var InfoWindowManager = (function () {
	    function InfoWindowManager(_mapsWrapper, _zone, _markerManager) {
	        this._mapsWrapper = _mapsWrapper;
	        this._zone = _zone;
	        this._markerManager = _markerManager;
	        this._infoWindows = new Map();
	    }
	    InfoWindowManager.prototype.deleteInfoWindow = function (infoWindow) {
	        var _this = this;
	        var iWindow = this._infoWindows.get(infoWindow);
	        if (iWindow == null) {
	            // info window already deleted
	            return Promise.resolve();
	        }
	        return iWindow.then(function (i) {
	            return _this._zone.run(function () {
	                i.close();
	                _this._infoWindows.delete(infoWindow);
	            });
	        });
	    };
	    InfoWindowManager.prototype.setPosition = function (infoWindow) {
	        return this._infoWindows.get(infoWindow).then(function (i) { return i.setPosition({
	            lat: infoWindow.latitude,
	            lng: infoWindow.longitude
	        }); });
	    };
	    InfoWindowManager.prototype.setZIndex = function (infoWindow) {
	        return this._infoWindows.get(infoWindow)
	            .then(function (i) { return i.setZIndex(infoWindow.zIndex); });
	    };
	    InfoWindowManager.prototype.open = function (infoWindow) {
	        var _this = this;
	        return this._infoWindows.get(infoWindow).then(function (w) {
	            if (infoWindow.hostMarker != null) {
	                return _this._markerManager.getNativeMarker(infoWindow.hostMarker).then(function (marker) {
	                    return _this._mapsWrapper.getMap().then(function (map) { return w.open(map, marker); });
	                });
	            }
	            return _this._mapsWrapper.getMap().then(function (map) { return w.open(map); });
	        });
	    };
	    InfoWindowManager.prototype.close = function (infoWindow) {
	        return this._infoWindows.get(infoWindow).then(function (w) { return w.close(); });
	    };
	    InfoWindowManager.prototype.setOptions = function (infoWindow, options) {
	        return this._infoWindows.get(infoWindow).then(function (i) { return i.setOptions(options); });
	    };
	    InfoWindowManager.prototype.addInfoWindow = function (infoWindow) {
	        var options = {
	            content: infoWindow.content,
	        };
	        if (typeof infoWindow.latitude === 'number' && typeof infoWindow.longitude === 'number') {
	            options.position = { lat: infoWindow.latitude, lng: infoWindow.longitude };
	        }
	        var infoWindowPromise = this._mapsWrapper.createInfoWindow(options);
	        this._infoWindows.set(infoWindow, infoWindowPromise);
	    };
	    InfoWindowManager = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [google_maps_api_wrapper_1.GoogleMapsAPIWrapper, core_1.NgZone, marker_manager_1.MarkerManager])
	    ], InfoWindowManager);
	    return InfoWindowManager;
	}());
	exports.InfoWindowManager = InfoWindowManager;

	

/***/ },
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var file_like_object_class_1 = __webpack_require__(413);
	var file_item_class_1 = __webpack_require__(835);
	var file_type_class_1 = __webpack_require__(836);
	function isFile(value) {
	    return (File && value instanceof File);
	}
	var FileUploader = (function () {
	    function FileUploader(options) {
	        this.isUploading = false;
	        this.queue = [];
	        this.progress = 0;
	        this._nextIndex = 0;
	        this.options = {
	            autoUpload: false,
	            isHTML5: true,
	            filters: [],
	            removeAfterUpload: false
	        };
	        this.setOptions(options);
	    }
	    FileUploader.prototype.setOptions = function (options) {
	        this.options = Object.assign(this.options, options);
	        this.authToken = options.authToken;
	        this.autoUpload = options.autoUpload;
	        this.options.filters.unshift({ name: 'queueLimit', fn: this._queueLimitFilter });
	        if (this.options.maxFileSize) {
	            this.options.filters.unshift({ name: 'fileSize', fn: this._fileSizeFilter });
	        }
	        if (this.options.allowedFileType) {
	            this.options.filters.unshift({ name: 'fileType', fn: this._fileTypeFilter });
	        }
	        if (this.options.allowedMimeType) {
	            this.options.filters.unshift({ name: 'mimeType', fn: this._mimeTypeFilter });
	        }
	        // this.options.filters.unshift({name: 'folder', fn: this._folderFilter});
	    };
	    FileUploader.prototype.addToQueue = function (files, options, filters) {
	        var _this = this;
	        var list = [];
	        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
	            var file = files_1[_i];
	            list.push(file);
	        }
	        var arrayOfFilters = this._getFilters(filters);
	        var count = this.queue.length;
	        var addedFileItems = [];
	        list.map(function (some) {
	            if (!options) {
	                options = _this.options;
	            }
	            var temp = new file_like_object_class_1.FileLikeObject(some);
	            if (_this._isValidFile(temp, arrayOfFilters, options)) {
	                var fileItem = new file_item_class_1.FileItem(_this, some, options);
	                addedFileItems.push(fileItem);
	                _this.queue.push(fileItem);
	                _this._onAfterAddingFile(fileItem);
	            }
	            else {
	                var filter = arrayOfFilters[_this._failFilterIndex];
	                _this._onWhenAddingFileFailed(temp, filter, options);
	            }
	        });
	        if (this.queue.length !== count) {
	            this._onAfterAddingAll(addedFileItems);
	            this.progress = this._getTotalProgress();
	        }
	        this._render();
	        if (this.options.autoUpload) {
	            this.uploadAll();
	        }
	    };
	    FileUploader.prototype.removeFromQueue = function (value) {
	        var index = this.getIndexOfItem(value);
	        var item = this.queue[index];
	        if (item.isUploading) {
	            item.cancel();
	        }
	        this.queue.splice(index, 1);
	        this.progress = this._getTotalProgress();
	    };
	    FileUploader.prototype.clearQueue = function () {
	        while (this.queue.length) {
	            this.queue[0].remove();
	        }
	        this.progress = 0;
	    };
	    FileUploader.prototype.uploadItem = function (value) {
	        var index = this.getIndexOfItem(value);
	        var item = this.queue[index];
	        var transport = this.options.isHTML5 ? '_xhrTransport' : '_iframeTransport';
	        item._prepareToUploading();
	        if (this.isUploading) {
	            return;
	        }
	        this.isUploading = true;
	        this[transport](item);
	    };
	    FileUploader.prototype.cancelItem = function (value) {
	        var index = this.getIndexOfItem(value);
	        var item = this.queue[index];
	        var prop = this.options.isHTML5 ? '_xhr' : '_form';
	        if (item && item.isUploading) {
	            item[prop].abort();
	        }
	    };
	    FileUploader.prototype.uploadAll = function () {
	        var items = this.getNotUploadedItems().filter(function (item) { return !item.isUploading; });
	        if (!items.length) {
	            return;
	        }
	        items.map(function (item) { return item._prepareToUploading(); });
	        items[0].upload();
	    };
	    FileUploader.prototype.cancelAll = function () {
	        var items = this.getNotUploadedItems();
	        items.map(function (item) { return item.cancel(); });
	    };
	    FileUploader.prototype.isFile = function (value) {
	        return isFile(value);
	    };
	    FileUploader.prototype.isFileLikeObject = function (value) {
	        return value instanceof file_like_object_class_1.FileLikeObject;
	    };
	    FileUploader.prototype.getIndexOfItem = function (value) {
	        return typeof value === 'number' ? value : this.queue.indexOf(value);
	    };
	    FileUploader.prototype.getNotUploadedItems = function () {
	        return this.queue.filter(function (item) { return !item.isUploaded; });
	    };
	    FileUploader.prototype.getReadyItems = function () {
	        return this.queue
	            .filter(function (item) { return (item.isReady && !item.isUploading); })
	            .sort(function (item1, item2) { return item1.index - item2.index; });
	    };
	    FileUploader.prototype.destroy = function () {
	        return void 0;
	        /*forEach(this._directives, (key) => {
	         forEach(this._directives[key], (object) => {
	         object.destroy();
	         });
	         });*/
	    };
	    FileUploader.prototype.onAfterAddingAll = function (fileItems) {
	        return { fileItems: fileItems };
	    };
	    FileUploader.prototype.onBuildItemForm = function (fileItem, form) {
	        return { fileItem: fileItem, form: form };
	    };
	    FileUploader.prototype.onAfterAddingFile = function (fileItem) {
	        return { fileItem: fileItem };
	    };
	    FileUploader.prototype.onWhenAddingFileFailed = function (item, filter, options) {
	        return { item: item, filter: filter, options: options };
	    };
	    FileUploader.prototype.onBeforeUploadItem = function (fileItem) {
	        return { fileItem: fileItem };
	    };
	    FileUploader.prototype.onProgressItem = function (fileItem, progress) {
	        return { fileItem: fileItem, progress: progress };
	    };
	    FileUploader.prototype.onProgressAll = function (progress) {
	        return { progress: progress };
	    };
	    FileUploader.prototype.onSuccessItem = function (item, response, status, headers) {
	        return { item: item, response: response, status: status, headers: headers };
	    };
	    FileUploader.prototype.onErrorItem = function (item, response, status, headers) {
	        return { item: item, response: response, status: status, headers: headers };
	    };
	    FileUploader.prototype.onCancelItem = function (item, response, status, headers) {
	        return { item: item, response: response, status: status, headers: headers };
	    };
	    FileUploader.prototype.onCompleteItem = function (item, response, status, headers) {
	        return { item: item, response: response, status: status, headers: headers };
	    };
	    FileUploader.prototype.onCompleteAll = function () {
	        return void 0;
	    };
	    FileUploader.prototype._mimeTypeFilter = function (item) {
	        return !(this.options.allowedMimeType && this.options.allowedMimeType.indexOf(item.type) === -1);
	    };
	    FileUploader.prototype._fileSizeFilter = function (item) {
	        return !(this.options.maxFileSize && item.size > this.options.maxFileSize);
	    };
	    FileUploader.prototype._fileTypeFilter = function (item) {
	        return !(this.options.allowedFileType &&
	            this.options.allowedFileType.indexOf(file_type_class_1.FileType.getMimeClass(item)) === -1);
	    };
	    FileUploader.prototype._onErrorItem = function (item, response, status, headers) {
	        item._onError(response, status, headers);
	        this.onErrorItem(item, response, status, headers);
	    };
	    FileUploader.prototype._onCompleteItem = function (item, response, status, headers) {
	        item._onComplete(response, status, headers);
	        this.onCompleteItem(item, response, status, headers);
	        var nextItem = this.getReadyItems()[0];
	        this.isUploading = false;
	        if (nextItem) {
	            nextItem.upload();
	            return;
	        }
	        this.onCompleteAll();
	        this.progress = this._getTotalProgress();
	        this._render();
	    };
	    FileUploader.prototype._headersGetter = function (parsedHeaders) {
	        return function (name) {
	            if (name) {
	                return parsedHeaders[name.toLowerCase()] || void 0;
	            }
	            return parsedHeaders;
	        };
	    };
	    FileUploader.prototype._xhrTransport = function (item) {
	        var _this = this;
	        var xhr = item._xhr = new XMLHttpRequest();
	        var form = new FormData();
	        this._onBeforeUploadItem(item);
	        // todo
	        /*item.formData.map(obj => {
	         obj.map((value, key) => {
	         form.append(key, value);
	         });
	         });*/
	        if (typeof item._file.size !== 'number') {
	            throw new TypeError('The file specified is no longer valid');
	        }
	        this._onBuildItemForm(item, form);
	        form.append(item.alias, item._file, item.file.name);
	        xhr.upload.onprogress = function (event) {
	            var progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
	            _this._onProgressItem(item, progress);
	        };
	        xhr.onload = function () {
	            var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
	            var response = _this._transformResponse(xhr.response, headers);
	            var gist = _this._isSuccessCode(xhr.status) ? 'Success' : 'Error';
	            var method = '_on' + gist + 'Item';
	            _this[method](item, response, xhr.status, headers);
	            _this._onCompleteItem(item, response, xhr.status, headers);
	        };
	        xhr.onerror = function () {
	            var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
	            var response = _this._transformResponse(xhr.response, headers);
	            _this._onErrorItem(item, response, xhr.status, headers);
	            _this._onCompleteItem(item, response, xhr.status, headers);
	        };
	        xhr.onabort = function () {
	            var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
	            var response = _this._transformResponse(xhr.response, headers);
	            _this._onCancelItem(item, response, xhr.status, headers);
	            _this._onCompleteItem(item, response, xhr.status, headers);
	        };
	        xhr.open(item.method, item.url, true);
	        xhr.withCredentials = item.withCredentials;
	        // todo
	        /*item.headers.map((value, name) => {
	         xhr.setRequestHeader(name, value);
	         });*/
	        if (this.options.headers) {
	            for (var _i = 0, _a = this.options.headers; _i < _a.length; _i++) {
	                var header = _a[_i];
	                xhr.setRequestHeader(header.name, header.value);
	            }
	        }
	        if (this.authToken) {
	            xhr.setRequestHeader('Authorization', this.authToken);
	        }
	        xhr.send(form);
	        this._render();
	    };
	    FileUploader.prototype._getTotalProgress = function (value) {
	        if (value === void 0) { value = 0; }
	        if (this.options.removeAfterUpload) {
	            return value;
	        }
	        var notUploaded = this.getNotUploadedItems().length;
	        var uploaded = notUploaded ? this.queue.length - notUploaded : this.queue.length;
	        var ratio = 100 / this.queue.length;
	        var current = value * ratio / 100;
	        return Math.round(uploaded * ratio + current);
	    };
	    FileUploader.prototype._getFilters = function (filters) {
	        if (!filters) {
	            return this.options.filters;
	        }
	        if (Array.isArray(filters)) {
	            return filters;
	        }
	        if (typeof filters === 'string') {
	            var names_1 = filters.match(/[^\s,]+/g);
	            return this.options.filters
	                .filter(function (filter) { return names_1.indexOf(filter.name) !== -1; });
	        }
	        return this.options.filters;
	    };
	    FileUploader.prototype._render = function () {
	        return void 0;
	        // todo: ?
	    };
	    // private _folderFilter(item:any):boolean {
	    //   return !!(item.size || item.type);
	    // }
	    FileUploader.prototype._queueLimitFilter = function () {
	        return this.options.queueLimit === undefined || this.queue.length < this.options.queueLimit;
	    };
	    FileUploader.prototype._isValidFile = function (file, filters, options) {
	        var _this = this;
	        this._failFilterIndex = -1;
	        return !filters.length ? true : filters.every(function (filter) {
	            _this._failFilterIndex++;
	            return filter.fn.call(_this, file, options);
	        });
	    };
	    FileUploader.prototype._isSuccessCode = function (status) {
	        return (status >= 200 && status < 300) || status === 304;
	    };
	    /* tslint:disable */
	    FileUploader.prototype._transformResponse = function (response, headers) {
	        // todo: ?
	        /*var headersGetter = this._headersGetter(headers);
	         forEach($http.defaults.transformResponse, (transformFn) => {
	         response = transformFn(response, headersGetter);
	         });*/
	        return response;
	    };
	    /* tslint:enable */
	    FileUploader.prototype._parseHeaders = function (headers) {
	        var parsed = {};
	        var key;
	        var val;
	        var i;
	        if (!headers) {
	            return parsed;
	        }
	        headers.split('\n').map(function (line) {
	            i = line.indexOf(':');
	            key = line.slice(0, i).trim().toLowerCase();
	            val = line.slice(i + 1).trim();
	            if (key) {
	                parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	            }
	        });
	        return parsed;
	    };
	    /*private _iframeTransport(item:any) {
	     // todo: implement it later
	     }*/
	    FileUploader.prototype._onWhenAddingFileFailed = function (item, filter, options) {
	        this.onWhenAddingFileFailed(item, filter, options);
	    };
	    FileUploader.prototype._onAfterAddingFile = function (item) {
	        this.onAfterAddingFile(item);
	    };
	    FileUploader.prototype._onAfterAddingAll = function (items) {
	        this.onAfterAddingAll(items);
	    };
	    FileUploader.prototype._onBeforeUploadItem = function (item) {
	        item._onBeforeUpload();
	        this.onBeforeUploadItem(item);
	    };
	    FileUploader.prototype._onBuildItemForm = function (item, form) {
	        item._onBuildForm(form);
	        this.onBuildItemForm(item, form);
	    };
	    FileUploader.prototype._onProgressItem = function (item, progress) {
	        var total = this._getTotalProgress(progress);
	        this.progress = total;
	        item._onProgress(progress);
	        this.onProgressItem(item, progress);
	        this.onProgressAll(total);
	        this._render();
	    };
	    /* tslint:disable */
	    FileUploader.prototype._onSuccessItem = function (item, response, status, headers) {
	        item._onSuccess(response, status, headers);
	        this.onSuccessItem(item, response, status, headers);
	    };
	    /* tslint:enable */
	    FileUploader.prototype._onCancelItem = function (item, response, status, headers) {
	        item._onCancel(response, status, headers);
	        this.onCancelItem(item, response, status, headers);
	    };
	    return FileUploader;
	}());
	exports.FileUploader = FileUploader;


/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(1);
	__webpack_require__(367);
	__webpack_require__(225);
	var checkbox_1 = __webpack_require__(59);
	var data_table_1 = __webpack_require__(418);
	var AbstractMdDataTableSelectableRow = (function () {
	    function AbstractMdDataTableSelectableRow(table, _element) {
	        this.table = table;
	        this._element = _element;
	        this.onChange = new core_1.EventEmitter(false);
	        this.isActive = false;
	        this.onChange.share();
	    }
	    AbstractMdDataTableSelectableRow.prototype.change = function () {
	        this.isActive = !this.isActive;
	        var event = {
	            name: 'selectable_row_change',
	            target: this,
	            isActive: this.isActive,
	            selectableValue: this.selectableValue
	        };
	        this.onChange.emit(event);
	    };
	    AbstractMdDataTableSelectableRow.prototype.ngAfterContentInit = function () { };
	    __decorate([
	        core_1.Input('selectable-value'), 
	        __metadata('design:type', String)
	    ], AbstractMdDataTableSelectableRow.prototype, "selectableValue", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], AbstractMdDataTableSelectableRow.prototype, "onChange", void 0);
	    AbstractMdDataTableSelectableRow = __decorate([
	        __param(0, core_1.Optional()),
	        __param(0, core_1.Inject(core_1.forwardRef(function () { return data_table_1.MdDataTable; }))), 
	        __metadata('design:paramtypes', [data_table_1.MdDataTable, core_1.ElementRef])
	    ], AbstractMdDataTableSelectableRow);
	    return AbstractMdDataTableSelectableRow;
	}());
	exports.AbstractMdDataTableSelectableRow = AbstractMdDataTableSelectableRow;
	var MdDataTableHeaderSelectableRow = (function (_super) {
	    __extends(MdDataTableHeaderSelectableRow, _super);
	    function MdDataTableHeaderSelectableRow(table, _element) {
	        _super.call(this, table, _element);
	        this.table = table;
	        this._element = _element;
	    }
	    MdDataTableHeaderSelectableRow.prototype._bindListener = function () {
	        var _this = this;
	        this.table.onSelectableChange
	            .map(function (event) { return event.allSelected; })
	            .subscribe(function (newActiveStatus) { return _this.isActive = newActiveStatus; });
	    };
	    MdDataTableHeaderSelectableRow.prototype.ngAfterContentInit = function () {
	        if (!!this.table) {
	            this._bindListener();
	        }
	    };
	    MdDataTableHeaderSelectableRow = __decorate([
	        core_1.Component({
	            selector: 'tr[md-data-table-header-selectable-row]',
	            template: "\n        <th class=\"md-data-check-cell\">\n            <md-checkbox #check [checked]=\"isActive\"></md-checkbox>\n        </th>\n        <ng-content></ng-content>\n    ",
	            directives: [checkbox_1.MdCheckbox],
	            host: {
	                '[class.active]': 'isActive',
	                '(click)': 'change()'
	            }
	        }),
	        __param(0, core_1.Optional()),
	        __param(0, core_1.Inject(core_1.forwardRef(function () { return data_table_1.MdDataTable; }))), 
	        __metadata('design:paramtypes', [data_table_1.MdDataTable, core_1.ElementRef])
	    ], MdDataTableHeaderSelectableRow);
	    return MdDataTableHeaderSelectableRow;
	}(AbstractMdDataTableSelectableRow));
	exports.MdDataTableHeaderSelectableRow = MdDataTableHeaderSelectableRow;
	var MdDataTableSelectableRow = (function (_super) {
	    __extends(MdDataTableSelectableRow, _super);
	    function MdDataTableSelectableRow(table, _element) {
	        _super.call(this, table, _element);
	        this.table = table;
	        this._element = _element;
	    }
	    MdDataTableSelectableRow.prototype._getIndex = function (element) {
	        return Array.prototype.indexOf.call(element.parentNode.children, element).toString();
	    };
	    MdDataTableSelectableRow.prototype._bindListener = function () {
	        var _this = this;
	        this.table.onSelectableChange
	            .map(function (event) {
	            return event.values !== undefined &&
	                event.values.length &&
	                (event.values.findIndex(function (value) { return value === _this.selectableValue; })) !== -1;
	        })
	            .subscribe(function (newActiveStatus) { return _this.isActive = newActiveStatus; });
	    };
	    MdDataTableSelectableRow.prototype.ngAfterContentInit = function () {
	        var element = this._element.nativeElement;
	        if (this.selectableValue === undefined) {
	            this.selectableValue = this._getIndex(element);
	        }
	        if (!!this.table) {
	            this._bindListener();
	        }
	    };
	    MdDataTableSelectableRow = __decorate([
	        core_1.Component({
	            selector: 'tr[md-data-table-selectable-row]',
	            template: "\n        <td class=\"md-data-check-cell\">\n          <md-checkbox #check [checked]=\"isActive\"></md-checkbox>\n        </td>\n        <ng-content></ng-content>\n    ",
	            directives: [checkbox_1.MdCheckbox],
	            host: {
	                '[class.active]': 'isActive',
	                '(click)': 'change()'
	            }
	        }),
	        __param(0, core_1.Optional()),
	        __param(0, core_1.Inject(core_1.forwardRef(function () { return data_table_1.MdDataTable; }))), 
	        __metadata('design:paramtypes', [data_table_1.MdDataTable, core_1.ElementRef])
	    ], MdDataTableSelectableRow);
	    return MdDataTableSelectableRow;
	}(AbstractMdDataTableSelectableRow));
	exports.MdDataTableSelectableRow = MdDataTableSelectableRow;
	

/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(1);
	var viewport_1 = __webpack_require__(113);
	var BehaviorSubject_1 = __webpack_require__(366);
	exports.MEDIA = {
	    'xs': '(max-width: 599px)',
	    'gt-xs': '(min-width: 600px)',
	    'sm': '(min-width: 600px) and (max-width: 959px)',
	    'gt-sm': '(min-width: 960px)',
	    'md': '(min-width: 960px) and (max-width: 1279px)',
	    'gt-md': '(min-width: 1280px)',
	    'lg': '(min-width: 1280px) and (max-width: 1919px)',
	    'gt-lg': '(min-width: 1920px)',
	    'xl': '(min-width: 1920px)'
	};
	exports.MEDIA_PRIORITY = [
	    'xl',
	    'gt-lg',
	    'lg',
	    'gt-md',
	    'md',
	    'gt-sm',
	    'sm',
	    'gt-xs',
	    'xs'
	];
	var MediaListener = (function () {
	    function MediaListener(query, zone, mql, media) {
	        this.query = query;
	        this.zone = zone;
	        this.mql = mql;
	        this.media = media;
	        this.onMatched = new BehaviorSubject_1.BehaviorSubject(this.mql);
	        this._destroyed = false;
	        var subject = this.onMatched;
	        this._listener = function (mql) {
	            zone.run(function () { return subject.next(mql); });
	        };
	        this.mql.addListener(this._listener);
	    }
	    Object.defineProperty(MediaListener.prototype, "matches", {
	        get: function () {
	            return !this._destroyed && this.mql.matches;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    MediaListener.prototype.destroy = function () {
	        if (!this._destroyed) {
	            this.mql.removeListener(this._listener);
	            this.media.unregisterListener(this);
	            this._destroyed = true;
	            this._listener = null;
	            this.mql = null;
	        }
	    };
	    return MediaListener;
	}());
	exports.MediaListener = MediaListener;
	var Media = (function () {
	    function Media(viewport, zone) {
	        this.viewport = viewport;
	        this.zone = zone;
	        this.cache = {};
	    }
	    Media.prototype.listen = function (query) {
	        var listener = this.cache[query];
	        if (!listener) {
	            listener = this.cache[query] = {
	                mql: this.viewport.matchMedia(query),
	                references: 0
	            };
	        }
	        listener.references++;
	        return new MediaListener(query, this.zone, listener.mql, this);
	    };
	    Media.prototype.unregisterListener = function (listener) {
	        var cached = this.cache[listener.query];
	        if (cached) {
	            cached.references--;
	            if (cached.references === 0) {
	                delete this.cache[listener.query];
	            }
	        }
	    };
	    Media.prototype.hasMedia = function (size) {
	        var query = Media.getQuery(size);
	        if (!query) {
	            return false;
	        }
	        return this.viewport.matchMedia(query).matches;
	    };
	    Media.getQuery = function (size) {
	        var query = exports.MEDIA[size];
	        if (!query) {
	            console.warn("unknown media query size " + size + ". Expected one of [" + exports.MEDIA_PRIORITY.join(',') + "]");
	            return null;
	        }
	        return query;
	    };
	    Media = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [viewport_1.ViewportHelper, core_1.NgZone])
	    ], Media);
	    return Media;
	}());
	exports.Media = Media;
	

/***/ },
/* 258 */
/***/ function(module, exports) {

	"use strict";
	function debounce(func, wait, scope) {
	    var timer = null;
	    return function debounced() {
	        var context = scope, args = Array.prototype.slice.call(arguments);
	        if (timer) {
	            clearTimeout(timer);
	        }
	        timer = setTimeout(function () {
	            timer = undefined;
	            func.apply(context, args);
	        }, wait || 10);
	    };
	}
	exports.debounce = debounce;
	function throttle(func, delay, scope) {
	    var recent;
	    return function throttled() {
	        var context = scope;
	        var args = arguments;
	        var now = new Date().getTime();
	        if (!recent || (now - recent > delay)) {
	            func.apply(context, args);
	            recent = now;
	        }
	    };
	}
	exports.throttle = throttle;
	function parseTabIndexAttribute(attr) {
	    return !!attr ? parseInt(attr, 10) : 0;
	}
	exports.parseTabIndexAttribute = parseTabIndexAttribute;
	function isNumber(value) {
	    return Object.prototype.toString.call(value) === '[object Number]';
	}
	exports.isNumber = isNumber;
	

/***/ },
/* 259 */,
/* 260 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Reference to an overlay that has been created with the Overlay service.
	 * Used to manipulate or dispose of said overlay.
	 */
	var OverlayRef = (function () {
	    function OverlayRef(_portalHost, _pane, _state) {
	        this._portalHost = _portalHost;
	        this._pane = _pane;
	        this._state = _state;
	    }
	    OverlayRef.prototype.attach = function (portal) {
	        var _this = this;
	        return this._portalHost.attach(portal).then(function () {
	            _this._updatePosition();
	        });
	    };
	    OverlayRef.prototype.detach = function () {
	        return this._portalHost.detach();
	    };
	    OverlayRef.prototype.dispose = function () {
	        this._portalHost.dispose();
	    };
	    OverlayRef.prototype.hasAttached = function () {
	        return this._portalHost.hasAttached();
	    };
	    /** Gets the current state config of the overlay. */
	    OverlayRef.prototype.getState = function () {
	        return this._state;
	    };
	    /** Updates the position of the overlay based on the position strategy. */
	    OverlayRef.prototype._updatePosition = function () {
	        if (this._state.positionStrategy) {
	            this._state.positionStrategy.apply(this._pane);
	        }
	    };
	    return OverlayRef;
	}());
	exports.OverlayRef = OverlayRef;
	//# sourceMappingURL=/usr/local/google/home/jelbourn/material2/tmp/broccoli_type_script_compiler-input_base_path-OxHzApZr.tmp/0/core/overlay/overlay-ref.js.map

/***/ },
/* 261 */
/***/ function(module, exports) {

	"use strict";
	/** The points of the origin element and the overlay element to connect. */
	var ConnectionPositionPair = (function () {
	    function ConnectionPositionPair(origin, overlay) {
	        this.originX = origin.originX;
	        this.originY = origin.originY;
	        this.overlayX = overlay.overlayX;
	        this.overlayY = overlay.overlayY;
	    }
	    return ConnectionPositionPair;
	}());
	exports.ConnectionPositionPair = ConnectionPositionPair;
	//# sourceMappingURL=/usr/local/google/home/jelbourn/material2/tmp/broccoli_type_script_compiler-input_base_path-OxHzApZr.tmp/0/core/overlay/position/connected-position.js.map

/***/ },
/* 262 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(1);
	/**
	 * Simple utility for getting the bounds of the browser viewport.
	 * TODO: internal
	 */
	var ViewportRuler = (function () {
	    function ViewportRuler() {
	    }
	    // TODO(jelbourn): cache the document's bounding rect and only update it when the window
	    // is resized (debounced).
	    /** Gets a ClientRect for the viewport's bounds. */
	    ViewportRuler.prototype.getViewportRect = function () {
	        // Use the document element's bounding rect rather than the window scroll properties
	        // (e.g. pageYOffset, scrollY) due to in issue in Chrome and IE where window scroll
	        // properties and client coordinates (boundingClientRect, clientX/Y, etc.) are in different
	        // conceptual viewports. Under most circumstances these viewports are equivalent, but they
	        // can disagree when the page is pinch-zoomed (on devices that support touch).
	        // See https://bugs.chromium.org/p/chromium/issues/detail?id=489206#c4
	        // We use the documentElement instead of the body because, by default (without a css reset)
	        // browsers typically give the document body an 8px margin, which is not included in
	        // getBoundingClientRect().
	        var documentRect = document.documentElement.getBoundingClientRect();
	        var scrollPosition = this.getViewportScrollPosition(documentRect);
	        var height = window.innerHeight;
	        var width = window.innerWidth;
	        return {
	            top: scrollPosition.top,
	            left: scrollPosition.left,
	            bottom: scrollPosition.top + height,
	            right: scrollPosition.left + width,
	            height: height,
	            width: width,
	        };
	    };
	    /**
	     * Gets the (top, left) scroll position of the viewport.
	     * @param documentRect
	     */
	    ViewportRuler.prototype.getViewportScrollPosition = function (documentRect) {
	        if (documentRect === void 0) { documentRect = document.documentElement.getBoundingClientRect(); }
	        // The top-left-corner of the viewport is determined by the scroll position of the document
	        // body, normally just (scrollLeft, scrollTop). However, Chrome and Firefox disagree about
	        // whether `document.body` or `document.documentElement` is the scrolled element, so reading
	        // `scrollTop` and `scrollLeft` is inconsistent. However, using the bounding rect of
	        // `document.documentElement` works consistently, where the `top` and `left` values will
	        // equal negative the scroll position.
	        var top = documentRect.top < 0 && document.body.scrollTop == 0 ?
	            -documentRect.top :
	            document.body.scrollTop;
	        var left = documentRect.left < 0 && document.body.scrollLeft == 0 ?
	            -documentRect.left :
	            document.body.scrollLeft;
	        return { top: top, left: left };
	    };
	    ViewportRuler = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], ViewportRuler);
	    return ViewportRuler;
	}());
	exports.ViewportRuler = ViewportRuler;
	//# sourceMappingURL=/usr/local/google/home/jelbourn/material2/tmp/broccoli_type_script_compiler-input_base_path-OxHzApZr.tmp/0/core/overlay/position/viewport-ruler.js.map

/***/ },
/* 263 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var portal_1 = __webpack_require__(114);
	var portal_errors_1 = __webpack_require__(265);
	/**
	 * A PortalHost for attaching portals to an arbitrary DOM element outside of the Angular
	 * application context.
	 *
	 * This is the only part of the portal core that directly touches the DOM.
	 */
	var DomPortalHost = (function (_super) {
	    __extends(DomPortalHost, _super);
	    function DomPortalHost(_hostDomElement, _componentResolver) {
	        _super.call(this);
	        this._hostDomElement = _hostDomElement;
	        this._componentResolver = _componentResolver;
	    }
	    /** Attach the given ComponentPortal to DOM element using the ComponentResolver. */
	    DomPortalHost.prototype.attachComponentPortal = function (portal) {
	        var _this = this;
	        if (portal.viewContainerRef == null) {
	            throw new portal_errors_1.MdComponentPortalAttachedToDomWithoutOriginError();
	        }
	        return this._componentResolver.resolveComponent(portal.component).then(function (componentFactory) {
	            var ref = portal.viewContainerRef.createComponent(componentFactory, portal.viewContainerRef.length, portal.viewContainerRef.parentInjector);
	            var hostView = ref.hostView;
	            _this._hostDomElement.appendChild(hostView.rootNodes[0]);
	            _this.setDisposeFn(function () { return ref.destroy(); });
	            return ref;
	        });
	    };
	    DomPortalHost.prototype.attachTemplatePortal = function (portal) {
	        var _this = this;
	        var viewContainer = portal.viewContainerRef;
	        var viewRef = viewContainer.createEmbeddedView(portal.templateRef);
	        viewRef.rootNodes.forEach(function (rootNode) { return _this._hostDomElement.appendChild(rootNode); });
	        this.setDisposeFn((function () {
	            var index = viewContainer.indexOf(viewRef);
	            if (index != -1) {
	                viewContainer.remove(index);
	            }
	        }));
	        // TODO(jelbourn): Return locals from view.
	        return Promise.resolve(new Map());
	    };
	    DomPortalHost.prototype.dispose = function () {
	        _super.prototype.dispose.call(this);
	        if (this._hostDomElement.parentNode != null) {
	            this._hostDomElement.parentNode.removeChild(this._hostDomElement);
	        }
	    };
	    return DomPortalHost;
	}(portal_1.BasePortalHost));
	exports.DomPortalHost = DomPortalHost;
	//# sourceMappingURL=/usr/local/google/home/jelbourn/material2/tmp/broccoli_type_script_compiler-input_base_path-OxHzApZr.tmp/0/core/portal/dom-portal-host.js.map

/***/ },
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(1);
	var portal_1 = __webpack_require__(114);
	/**
	 * Directive version of a `TemplatePortal`. Because the directive *is* a TemplatePortal,
	 * the directive instance itself can be attached to a host, enabling declarative use of portals.
	 *
	 * Usage:
	 * <template portal #greeting>
	 *   <p> Hello {{name}} </p>
	 * </template>
	 */
	var TemplatePortalDirective = (function (_super) {
	    __extends(TemplatePortalDirective, _super);
	    function TemplatePortalDirective(templateRef, viewContainerRef) {
	        _super.call(this, templateRef, viewContainerRef);
	    }
	    TemplatePortalDirective = __decorate([
	        core_1.Directive({
	            selector: '[portal]',
	            exportAs: 'portal',
	        }), 
	        __metadata('design:paramtypes', [core_1.TemplateRef, core_1.ViewContainerRef])
	    ], TemplatePortalDirective);
	    return TemplatePortalDirective;
	}(portal_1.TemplatePortal));
	exports.TemplatePortalDirective = TemplatePortalDirective;
	/**
	 * Directive version of a PortalHost. Because the directive *is* a PortalHost, portals can be
	 * directly attached to it, enabling declarative use.
	 *
	 * Usage:
	 * <template [portalHost]="greeting"></template>
	 */
	var PortalHostDirective = (function (_super) {
	    __extends(PortalHostDirective, _super);
	    function PortalHostDirective(_componentResolver, _viewContainerRef) {
	        _super.call(this);
	        this._componentResolver = _componentResolver;
	        this._viewContainerRef = _viewContainerRef;
	    }
	    Object.defineProperty(PortalHostDirective.prototype, "portal", {
	        get: function () {
	            return this._portal;
	        },
	        set: function (p) {
	            this._replaceAttachedPortal(p);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /** Attach the given ComponentPortal to this PortlHost using the ComponentResolver. */
	    PortalHostDirective.prototype.attachComponentPortal = function (portal) {
	        var _this = this;
	        portal.setAttachedHost(this);
	        // If the portal specifies an origin, use that as the logical location of the component
	        // in the application tree. Otherwise use the location of this PortalHost.
	        var viewContainerRef = portal.viewContainerRef != null ?
	            portal.viewContainerRef :
	            this._viewContainerRef;
	        return this._componentResolver.resolveComponent(portal.component).then(function (componentFactory) {
	            var ref = viewContainerRef.createComponent(componentFactory, viewContainerRef.length, viewContainerRef.parentInjector);
	            _this.setDisposeFn(function () { return ref.destroy(); });
	            return ref;
	        });
	    };
	    /** Attach the given TemplatePortal to this PortlHost as an embedded View. */
	    PortalHostDirective.prototype.attachTemplatePortal = function (portal) {
	        var _this = this;
	        portal.setAttachedHost(this);
	        this._viewContainerRef.createEmbeddedView(portal.templateRef);
	        this.setDisposeFn(function () { return _this._viewContainerRef.clear(); });
	        // TODO(jelbourn): return locals from view
	        return Promise.resolve(new Map());
	    };
	    /** Detatches the currently attached Portal (if there is one) and attaches the given Portal. */
	    PortalHostDirective.prototype._replaceAttachedPortal = function (p) {
	        var _this = this;
	        var maybeDetach = this.hasAttached() ? this.detach() : Promise.resolve();
	        maybeDetach.then(function () {
	            if (p != null) {
	                _this.attach(p);
	                _this._portal = p;
	            }
	        });
	    };
	    PortalHostDirective = __decorate([
	        core_1.Directive({
	            selector: '[portalHost]',
	            inputs: ['portal: portalHost']
	        }), 
	        __metadata('design:paramtypes', [core_1.ComponentResolver, core_1.ViewContainerRef])
	    ], PortalHostDirective);
	    return PortalHostDirective;
	}(portal_1.BasePortalHost));
	exports.PortalHostDirective = PortalHostDirective;
	exports.PORTAL_DIRECTIVES = [TemplatePortalDirective, PortalHostDirective];
	//# sourceMappingURL=/usr/local/google/home/jelbourn/material2/tmp/broccoli_type_script_compiler-input_base_path-OxHzApZr.tmp/0/core/portal/portal-directives.js.map

/***/ },
/* 265 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var error_1 = __webpack_require__(446);
	/** Exception thrown when a ComponentPortal is attached to a DomPortalHost without an origin. */
	var MdComponentPortalAttachedToDomWithoutOriginError = (function (_super) {
	    __extends(MdComponentPortalAttachedToDomWithoutOriginError, _super);
	    function MdComponentPortalAttachedToDomWithoutOriginError() {
	        _super.call(this, 'A ComponentPortal must have an origin set when attached to a DomPortalHost ' +
	            'because the DOM element is not part of the Angular application context.');
	    }
	    return MdComponentPortalAttachedToDomWithoutOriginError;
	}(error_1.MdError));
	exports.MdComponentPortalAttachedToDomWithoutOriginError = MdComponentPortalAttachedToDomWithoutOriginError;
	/** Exception thrown when attempting to attach a null portal to a host. */
	var MdNullPortalError = (function (_super) {
	    __extends(MdNullPortalError, _super);
	    function MdNullPortalError() {
	        _super.call(this, 'Must provide a portal to attach');
	    }
	    return MdNullPortalError;
	}(error_1.MdError));
	exports.MdNullPortalError = MdNullPortalError;
	/** Exception thrown when attempting to attach a portal to a host that is already attached. */
	var MdPortalAlreadyAttachedError = (function (_super) {
	    __extends(MdPortalAlreadyAttachedError, _super);
	    function MdPortalAlreadyAttachedError() {
	        _super.call(this, 'Host already has a portal attached');
	    }
	    return MdPortalAlreadyAttachedError;
	}(error_1.MdError));
	exports.MdPortalAlreadyAttachedError = MdPortalAlreadyAttachedError;
	/** Exception thrown when attempting to attach a portal to an already-disposed host. */
	var MdPortalHostAlreadyDisposedError = (function (_super) {
	    __extends(MdPortalHostAlreadyDisposedError, _super);
	    function MdPortalHostAlreadyDisposedError() {
	        _super.call(this, 'This PortalHost has already been disposed');
	    }
	    return MdPortalHostAlreadyDisposedError;
	}(error_1.MdError));
	exports.MdPortalHostAlreadyDisposedError = MdPortalHostAlreadyDisposedError;
	/** Exception thrown when attempting to attach an unknown portal type. */
	var MdUnknownPortalTypeError = (function (_super) {
	    __extends(MdUnknownPortalTypeError, _super);
	    function MdUnknownPortalTypeError() {
	        _super.call(this, 'Attempting to attach an unknown Portal type. ' +
	            'BasePortalHost accepts either a ComponentPortal or a TemplatePortal.');
	    }
	    return MdUnknownPortalTypeError;
	}(error_1.MdError));
	exports.MdUnknownPortalTypeError = MdUnknownPortalTypeError;
	/** Exception thrown when attempting to attach a portal to a null host. */
	var MdNullPortalHostError = (function (_super) {
	    __extends(MdNullPortalHostError, _super);
	    function MdNullPortalHostError() {
	        _super.call(this, 'Attmepting to attach a portal to a null PortalHost');
	    }
	    return MdNullPortalHostError;
	}(error_1.MdError));
	exports.MdNullPortalHostError = MdNullPortalHostError;
	/** Exception thrown when attempting to detach a portal that is not attached. */
	var MdNoPortalAttachedError = (function (_super) {
	    __extends(MdNoPortalAttachedError, _super);
	    function MdNoPortalAttachedError() {
	        _super.call(this, 'Attmepting to detach a portal that is not attached to a host');
	    }
	    return MdNoPortalAttachedError;
	}(error_1.MdError));
	exports.MdNoPortalAttachedError = MdNoPortalAttachedError;
	//# sourceMappingURL=/usr/local/google/home/jelbourn/material2/tmp/broccoli_type_script_compiler-input_base_path-OxHzApZr.tmp/0/core/portal/portal-errors.js.map

/***/ },
/* 266 */,
/* 267 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Applies a CSS transform to an element, including browser-prefixed properties.
	 * @param element
	 * @param transformValue
	 */
	function applyCssTransform(element, transformValue) {
	    // It's important to trim the result, because the browser will ignore the set operation
	    // if the string contains only whitespace.
	    var value = transformValue.trim();
	    element.style.transform = value;
	    element.style.webkitTransform = value;
	}
	exports.applyCssTransform = applyCssTransform;
	//# sourceMappingURL=/usr/local/google/home/jelbourn/material2/tmp/broccoli_type_script_compiler-input_base_path-OxHzApZr.tmp/0/core/style/apply-transform.js.map

/***/ },
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var core_2 = __webpack_require__(1);
	var user_service_1 = __webpack_require__(23);
	var MapAutocomplete = (function () {
	    function MapAutocomplete(zone, u) {
	        this.zone = zone;
	        this.u = u;
	        this.address = '';
	        this.latitude = 22.5867;
	        this.longitude = 88.4171;
	        console.log('map component');
	    }
	    MapAutocomplete.prototype.pickLocation = function () {
	        var _this = this;
	        console.log('setting location');
	        this.infowindow.close();
	        if (window && window.navigator && window.navigator.geolocation) {
	            window.navigator.geolocation.getCurrentPosition(function (position) {
	                console.log('new location', position, _this.map);
	                if (position.coords) {
	                    _this.location = position.coords;
	                    _this.latitude = position.coords.latitude;
	                    _this.longitude = position.coords.longitude;
	                    _this.u.latitude = position.coords.latitude;
	                    _this.u.longitude = position.coords.longitude;
	                    _this.map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
	                    var marker = _this.marker;
	                    marker.setIcon(/** @type {google.maps.Icon} */ ({
	                        // url: place.icon,
	                        size: new google.maps.Size(71, 71),
	                        origin: new google.maps.Point(0, 0),
	                        anchor: new google.maps.Point(17, 34),
	                        scaledSize: new google.maps.Size(35, 35)
	                    }));
	                    marker.setPosition({ lat: position.coords.latitude, lng: position.coords.longitude });
	                    marker.setVisible(true);
	                }
	            });
	        } // if
	    };
	    MapAutocomplete.prototype.ngOnInit = function () {
	        console.log('init  map component', this.latitude, this.longitude);
	        var lat = this.latitude || 22.58;
	        var lon = this.longitude || 88.4171;
	        this.map = new google.maps.Map(document.getElementById('map'), {
	            center: { lat: lat, lng: lon },
	            zoom: 15,
	            mapTypeControl: false
	        });
	        var map = this.map;
	        var input = (document.getElementById('pac-input'));
	        var pickLocationButton = (document.getElementById('pick-location'));
	        //var types = document.getElementById('type-selector');
	        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
	        map.controls[google.maps.ControlPosition.TOP_LEFT].push(pickLocationButton);
	        this.autocomplete = new google.maps.places.Autocomplete(input);
	        var autocomplete = this.autocomplete;
	        autocomplete.bindTo('bounds', map);
	        this.infowindow = new google.maps.InfoWindow();
	        var infowindow = this.infowindow;
	        this.marker = new google.maps.Marker({
	            map: map,
	            anchorPoint: new google.maps.Point(0, -29)
	        });
	        var marker = this.marker;
	        var self = this;
	        map.addListener('click', function (e) {
	            //placeMarkerAndPanTo(e.latLng, map);
	            marker.setPosition(e.latLng);
	            console.log(e.latLng);
	            self.u.location = e.latLng;
	            self.u.latitude = e.latLng.lat();
	            self.u.longitude = e.latLng.lng();
	            console.log("lat lon", self.u.latitude, self.u.longitude);
	            map.panTo(e.latLng);
	        });
	        autocomplete.addListener('place_changed', function () {
	            infowindow.close();
	            marker.setVisible(false);
	            var place = autocomplete.getPlace();
	            if (!place.geometry) {
	                //window.alert("Autocomplete's returned place contains no geometry");
	                return;
	            }
	            // If the place has a geometry, then present it on a map.
	            if (place.geometry.viewport) {
	                map.fitBounds(place.geometry.viewport);
	            }
	            else {
	                map.setCenter(place.geometry.location);
	                this.location = place.geometry.location;
	                map.setZoom(17); // Why 17? Because it looks good.
	            }
	            marker.setIcon(/** @type {google.maps.Icon} */ ({
	                url: place.icon,
	                size: new google.maps.Size(71, 71),
	                origin: new google.maps.Point(0, 0),
	                anchor: new google.maps.Point(17, 34),
	                scaledSize: new google.maps.Size(35, 35)
	            }));
	            marker.setPosition(place.geometry.location);
	            self.u.latitude = place.geometry.location.lat();
	            self.u.longitude = place.geometry.location.lng();
	            marker.setVisible(true);
	            var address = '';
	            if (place.address_components) {
	                address = [
	                    (place.address_components[0] && place.address_components[0].short_name || ''),
	                    (place.address_components[1] && place.address_components[1].short_name || ''),
	                    (place.address_components[2] && place.address_components[2].short_name || '')
	                ].join(' ');
	            }
	            self.address = address;
	            self.u.map_address = address;
	            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
	            infowindow.open(map, marker);
	        });
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], MapAutocomplete.prototype, "latitude", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], MapAutocomplete.prototype, "longitude", void 0);
	    MapAutocomplete = __decorate([
	        core_1.Component({
	            moduleId: module.id,
	            selector: 'map-autocomplete',
	            template: __webpack_require__(590),
	            styles: [__webpack_require__(589)],
	        }), 
	        __metadata('design:paramtypes', [core_2.NgZone, user_service_1.UserService])
	    ], MapAutocomplete);
	    return MapAutocomplete;
	}());
	exports.MapAutocomplete = MapAutocomplete;
	

/***/ },
/* 363 */
/***/ function(module, exports, __webpack_require__) {

	// ```
	// product.service.js
	// (c) 2016 David Newman
	// blackshuriken@hotmail.com
	// product.service.js may be freely distributed under the MIT license
	// ```
	"use strict";
	// # Product Service
	var http_1 = __webpack_require__(21);
	var store_1 = __webpack_require__(230);
	var core_1 = __webpack_require__(1);
	var HEADER = {
	    headers: new http_1.Headers({
	        'Content-Type': 'application/json'
	    })
	};
	var ProductService = (function () {
	    // Inject the `AppStore` into the constructor with a type of `AppStore`
	    function ProductService(http, store) {
	        this.http = http;
	        this.store = store;
	        // Bind an observable of our `products` to `ProductService`
	        // Since this is essentially a `key, value` system, we can
	        // set our `products` by calling `store.select('products')`
	        this.products = store.select('products');
	    }
	    ProductService.prototype.loadProducts = function () {
	        var _this = this;
	        this.http.get('/api/product')
	            .map(function (res) { return res.json(); })
	            .map(function (payload) { return ({ type: 'ADD_PRODUCTS', payload: payload }); })
	            .subscribe(function (action) { return _this.store.dispatch(action); });
	    };
	    ProductService.prototype.saveProduct = function (product) {
	        (product._id) ? this.updateProduct(product) : this.createProduct(product);
	    };
	    ProductService.prototype.createProduct = function (product) {
	        var _this = this;
	        this.http.post('/api/product', JSON.stringify(product), HEADER)
	            .map(function (res) { return res.json(); })
	            .map(function (payload) { return ({ type: 'CREATE_PRODUCT', payload: payload }); })
	            .subscribe(function (action) { return _this.store.dispatch(action); });
	    };
	    ProductService.prototype.updateProduct = function (product) {
	        var _this = this;
	        this.http.put("/api/product/" + product._id, JSON.stringify(product), HEADER)
	            .subscribe(function (action) { return _this.store.dispatch({ type: 'UPDATE_PRODUCT', payload: product }); });
	    };
	    ProductService.prototype.deleteProduct = function (product) {
	        var _this = this;
	        this.http.delete("/api/product/" + product._id)
	            .subscribe(function (action) { return _this.store.dispatch({ type: 'DELETE_PRODUCT', payload: product }); });
	    };
	    ProductService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [http_1.Http, store_1.Store])
	    ], ProductService);
	    return ProductService;
	}());
	exports.ProductService = ProductService;
	

/***/ },
/* 364 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var Accordion = (function () {
	    function Accordion() {
	        this.groups = [];
	    }
	    Accordion.prototype.addGroup = function (group) {
	        this.groups.push(group);
	    };
	    Accordion.prototype.closeOthers = function (openGroup) {
	        this.groups.forEach(function (group) {
	            if (group !== openGroup) {
	                group.isOpen = false;
	            }
	        });
	    };
	    Accordion.prototype.removeGroup = function (group) {
	        var index = this.groups.indexOf(group);
	        if (index !== -1) {
	            this.groups.splice(index, 1);
	        }
	    };
	    Accordion = __decorate([
	        core_1.Component({
	            selector: 'accordion, [accordion]',
	            host: {
	                'class': 'panel-group'
	            },
	            template: '<ng-content></ng-content>'
	        }), 
	        __metadata('design:paramtypes', [])
	    ], Accordion);
	    return Accordion;
	}());
	exports.Accordion = Accordion;
	

/***/ },
/* 365 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var button_1 = __webpack_require__(73);
	var card_1 = __webpack_require__(74);
	var checkbox_1 = __webpack_require__(59);
	var sidenav_1 = __webpack_require__(61);
	var input_1 = __webpack_require__(75);
	var list_1 = __webpack_require__(60);
	var radio_1 = __webpack_require__(164);
	var progress_bar_1 = __webpack_require__(102);
	var progress_circle_1 = __webpack_require__(163);
	var toolbar_1 = __webpack_require__(62);
	/*
	 * We are grouping the module so we only need to
	 * manage the imports in one location
	 */
	exports.MATERIAL_PIPES = [];
	exports.MATERIAL_DIRECTIVES = sidenav_1.MD_SIDENAV_DIRECTIVES.concat([
	    button_1.MdAnchor,
	    button_1.MdButton,
	    toolbar_1.MdToolbar,
	    checkbox_1.MdCheckbox,
	    radio_1.MdRadioButton,
	    radio_1.MdRadioGroup,
	    progress_circle_1.MdSpinner,
	    progress_bar_1.MdProgressBar,
	    progress_circle_1.MdProgressCircle
	], input_1.MD_INPUT_DIRECTIVES, list_1.MD_LIST_DIRECTIVES, card_1.MD_CARD_DIRECTIVES);
	exports.MATERIAL_PROVIDERS = [
	    radio_1.MdRadioDispatcher
	];
	

/***/ },
/* 366 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subject_1 = __webpack_require__(35);
	var throwError_1 = __webpack_require__(662);
	var ObjectUnsubscribedError_1 = __webpack_require__(370);
	/**
	 * @class BehaviorSubject<T>
	 */
	var BehaviorSubject = (function (_super) {
	    __extends(BehaviorSubject, _super);
	    function BehaviorSubject(_value) {
	        _super.call(this);
	        this._value = _value;
	    }
	    BehaviorSubject.prototype.getValue = function () {
	        if (this.hasError) {
	            throwError_1.throwError(this.thrownError);
	        }
	        else if (this.isUnsubscribed) {
	            throwError_1.throwError(new ObjectUnsubscribedError_1.ObjectUnsubscribedError());
	        }
	        else {
	            return this._value;
	        }
	    };
	    Object.defineProperty(BehaviorSubject.prototype, "value", {
	        get: function () {
	            return this.getValue();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    BehaviorSubject.prototype._subscribe = function (subscriber) {
	        var subscription = _super.prototype._subscribe.call(this, subscriber);
	        if (subscription && !subscription.isUnsubscribed) {
	            subscriber.next(this._value);
	        }
	        return subscription;
	    };
	    BehaviorSubject.prototype.next = function (value) {
	        _super.prototype.next.call(this, this._value = value);
	    };
	    return BehaviorSubject;
	}(Subject_1.Subject));
	exports.BehaviorSubject = BehaviorSubject;
	//# sourceMappingURL=BehaviorSubject.js.map

/***/ },
/* 367 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(8);
	var share_1 = __webpack_require__(648);
	Observable_1.Observable.prototype.share = share_1.share;
	//# sourceMappingURL=share.js.map

/***/ },
/* 368 */,
/* 369 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var QueueAction_1 = __webpack_require__(652);
	var FutureAction_1 = __webpack_require__(226);
	var QueueScheduler = (function () {
	    function QueueScheduler() {
	        this.active = false;
	        this.actions = []; // XXX: use `any` to remove type param `T` from `VirtualTimeScheduler`.
	        this.scheduledId = null;
	    }
	    QueueScheduler.prototype.now = function () {
	        return Date.now();
	    };
	    QueueScheduler.prototype.flush = function () {
	        if (this.active || this.scheduledId) {
	            return;
	        }
	        this.active = true;
	        var actions = this.actions;
	        // XXX: use `any` to remove type param `T` from `VirtualTimeScheduler`.
	        for (var action = null; action = actions.shift();) {
	            action.execute();
	            if (action.error) {
	                this.active = false;
	                throw action.error;
	            }
	        }
	        this.active = false;
	    };
	    QueueScheduler.prototype.schedule = function (work, delay, state) {
	        if (delay === void 0) { delay = 0; }
	        return (delay <= 0) ?
	            this.scheduleNow(work, state) :
	            this.scheduleLater(work, delay, state);
	    };
	    QueueScheduler.prototype.scheduleNow = function (work, state) {
	        return new QueueAction_1.QueueAction(this, work).schedule(state);
	    };
	    QueueScheduler.prototype.scheduleLater = function (work, delay, state) {
	        return new FutureAction_1.FutureAction(this, work).schedule(state, delay);
	    };
	    return QueueScheduler;
	}());
	exports.QueueScheduler = QueueScheduler;
	//# sourceMappingURL=QueueScheduler.js.map

/***/ },
/* 370 */,
/* 371 */,
/* 372 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subject_1 = __webpack_require__(35);
	var Dispatcher = (function (_super) {
	    __extends(Dispatcher, _super);
	    function Dispatcher() {
	        _super.apply(this, arguments);
	    }
	    Dispatcher.prototype.dispatch = function (action) {
	        this.next(action);
	    };
	    return Dispatcher;
	}(Subject_1.Subject));
	exports.Dispatcher = Dispatcher;


/***/ },
/* 373 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var queue_1 = __webpack_require__(654);
	__webpack_require__(627);
	__webpack_require__(630);
	__webpack_require__(629);
	exports.ActionTypes = {
	    INIT: '@@ngrx/INIT'
	};
	var StoreBackend = (function () {
	    function StoreBackend(_dispatcher, _reducer, _initialState, _preMiddleware, _postMiddleware) {
	        if (_preMiddleware === void 0) { _preMiddleware = function (t) { return t; }; }
	        if (_postMiddleware === void 0) { _postMiddleware = function (t) { return t; }; }
	        this._dispatcher = _dispatcher;
	        this._reducer = _reducer;
	        this._initialState = _initialState;
	        this._preMiddleware = _preMiddleware;
	        this._postMiddleware = _postMiddleware;
	    }
	    StoreBackend.prototype._init = function () {
	        this._dispatcher.dispatch({ type: exports.ActionTypes.INIT });
	    };
	    StoreBackend.prototype.connect = function (nextCallbackFn) {
	        var _this = this;
	        this._dispatcher
	            .let(this._preMiddleware)
	            .observeOn(queue_1.queue)
	            .scan(function (state, action) { return _this._reducer(state, action); }, this._initialState)
	            .let(this._postMiddleware)
	            .subscribe(nextCallbackFn);
	        this._init();
	    };
	    StoreBackend.prototype.replaceReducer = function (reducer) {
	        this._reducer = reducer;
	        this._init();
	    };
	    return StoreBackend;
	}());
	exports.StoreBackend = StoreBackend;


/***/ },
/* 374 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var BehaviorSubject_1 = __webpack_require__(366);
	__webpack_require__(225);
	__webpack_require__(625);
	var Store = (function (_super) {
	    __extends(Store, _super);
	    function Store(_dispatcher, _backend, initialState) {
	        var _this = this;
	        _super.call(this, initialState);
	        this._dispatcher = _dispatcher;
	        this._backend = _backend;
	        _backend.connect(function (state) { return _super.prototype.next.call(_this, state); });
	    }
	    Store.prototype.select = function (keyOrSelector) {
	        if (typeof keyOrSelector === 'string' ||
	            typeof keyOrSelector === 'number' ||
	            typeof keyOrSelector === 'symbol') {
	            return this.map(function (state) { return state[keyOrSelector]; }).distinctUntilChanged();
	        }
	        else if (typeof keyOrSelector === 'function') {
	            return this.map(keyOrSelector).distinctUntilChanged();
	        }
	        else {
	            throw new TypeError("Store@select Unknown Parameter Type: "
	                + ("Expected type of function or valid key type, got " + typeof keyOrSelector));
	        }
	    };
	    Store.prototype.getState = function () {
	        return this.value;
	    };
	    Store.prototype.dispatch = function (action) {
	        this._dispatcher.dispatch(action);
	    };
	    Store.prototype.next = function (action) {
	        this._dispatcher.next(action);
	    };
	    Store.prototype.error = function (error) {
	        this._dispatcher.error(error);
	    };
	    Store.prototype.replaceReducer = function (reducer) {
	        this._backend.replaceReducer(reducer);
	    };
	    return Store;
	}(BehaviorSubject_1.BehaviorSubject));
	exports.Store = Store;


/***/ },
/* 375 */
/***/ function(module, exports) {

	"use strict";
	function combineReducers(reducers) {
	    var reducerKeys = Object.keys(reducers);
	    var finalReducers = {};
	    for (var i = 0; i < reducerKeys.length; i++) {
	        var key = reducerKeys[i];
	        if (typeof reducers[key] === 'function') {
	            finalReducers[key] = reducers[key];
	        }
	    }
	    var finalReducerKeys = Object.keys(finalReducers);
	    return function combination(state, action) {
	        if (state === void 0) { state = {}; }
	        var hasChanged = false;
	        var nextState = {};
	        for (var i = 0; i < finalReducerKeys.length; i++) {
	            var key = finalReducerKeys[i];
	            var reducer = finalReducers[key];
	            var previousStateForKey = state[key];
	            var nextStateForKey = reducer(previousStateForKey, action);
	            nextState[key] = nextStateForKey;
	            hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
	        }
	        return hasChanged ? nextState : state;
	    };
	}
	exports.combineReducers = combineReducers;
	exports.compose = function () {
	    var funcs = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        funcs[_i - 0] = arguments[_i];
	    }
	    return function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i - 0] = arguments[_i];
	        }
	        if (funcs.length === 0) {
	            return args[0];
	        }
	        var last = funcs[funcs.length - 1];
	        var rest = funcs.slice(0, -1);
	        return rest.reduceRight(function (composed, f) { return f(composed); }, last.apply(void 0, args));
	    };
	};


/***/ },
/* 376 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * angular2-google-maps - Angular 2 components for Google Maps
	 * @version v0.10.0
	 * @link https://github.com/SebastianM/angular2-google-maps#readme
	 * @license MIT
	 */
	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(1);
	var marker_manager_1 = __webpack_require__(148);
	var google_map_info_window_1 = __webpack_require__(231);
	var markerId = 0;
	/**
	 * SebmGoogleMapMarker renders a map marker inside a {@link SebmGoogleMap}.
	 *
	 * ### Example
	 * ```typescript
	 * import {Component} from 'angular2/core';
	 * import {SebmGoogleMap, SebmGoogleMapMarker} from 'angular2-google-maps/core';
	 *
	 * @Component({
	 *  selector: 'my-map-cmp',
	 *  directives: [SebmGoogleMap, SebmGoogleMapMarker],
	 *  styles: [`
	 *    .sebm-google-map-container {
	 *      height: 300px;
	 *    }
	 * `],
	 *  template: `
	 *    <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
	 *      <sebm-google-map-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
	 *      </sebm-google-map-marker>
	 *    </sebm-google-map>
	 *  `
	 * })
	 * ```
	 */
	var SebmGoogleMapMarker = (function () {
	    function SebmGoogleMapMarker(_markerManager) {
	        this._markerManager = _markerManager;
	        /**
	         * If true, the marker can be dragged. Default value is false.
	         */
	        this.draggable = false;
	        /**
	         * This event emitter gets emitted when the user clicks on the marker.
	         */
	        this.markerClick = new core_1.EventEmitter();
	        /**
	         * This event is fired when the user stops dragging the marker.
	         */
	        this.dragEnd = new core_1.EventEmitter();
	        this._markerAddedToManger = false;
	        this._id = (markerId++).toString();
	    }
	    /* @internal */
	    SebmGoogleMapMarker.prototype.ngAfterContentInit = function () {
	        if (this._infoWindow != null) {
	            this._infoWindow.hostMarker = this;
	        }
	    };
	    /** @internal */
	    SebmGoogleMapMarker.prototype.ngOnChanges = function (changes) {
	        if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
	            return;
	        }
	        if (!this._markerAddedToManger) {
	            this._markerManager.addMarker(this);
	            this._markerAddedToManger = true;
	            this._addEventListeners();
	            return;
	        }
	        if (changes['latitude'] || changes['longitude']) {
	            this._markerManager.updateMarkerPosition(this);
	        }
	        if (changes['title']) {
	            this._markerManager.updateTitle(this);
	        }
	        if (changes['label']) {
	            this._markerManager.updateLabel(this);
	        }
	        if (changes['draggable']) {
	            this._markerManager.updateDraggable(this);
	        }
	        if (changes['iconUrl']) {
	            this._markerManager.updateIcon(this);
	        }
	    };
	    SebmGoogleMapMarker.prototype._addEventListeners = function () {
	        var _this = this;
	        this._markerManager.createEventObservable('click', this).subscribe(function () {
	            if (_this._infoWindow != null) {
	                _this._infoWindow.open();
	            }
	            _this.markerClick.next(null);
	        });
	        this._markerManager.createEventObservable('dragend', this)
	            .subscribe(function (e) {
	            _this.dragEnd.next({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
	        });
	    };
	    /** @internal */
	    SebmGoogleMapMarker.prototype.id = function () { return this._id; };
	    /** @internal */
	    SebmGoogleMapMarker.prototype.toString = function () { return 'SebmGoogleMapMarker-' + this._id.toString(); };
	    /** @internal */
	    SebmGoogleMapMarker.prototype.ngOnDestroy = function () { this._markerManager.deleteMarker(this); };
	    __decorate([
	        core_1.ContentChild(google_map_info_window_1.SebmGoogleMapInfoWindow), 
	        __metadata('design:type', google_map_info_window_1.SebmGoogleMapInfoWindow)
	    ], SebmGoogleMapMarker.prototype, "_infoWindow", void 0);
	    SebmGoogleMapMarker = __decorate([
	        core_1.Directive({
	            selector: 'sebm-google-map-marker',
	            inputs: ['latitude', 'longitude', 'title', 'label', 'draggable: markerDraggable', 'iconUrl'],
	            outputs: ['markerClick', 'dragEnd']
	        }), 
	        __metadata('design:paramtypes', [marker_manager_1.MarkerManager])
	    ], SebmGoogleMapMarker);
	    return SebmGoogleMapMarker;
	}());
	exports.SebmGoogleMapMarker = SebmGoogleMapMarker;

	

/***/ },
/* 377 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * angular2-google-maps - Angular 2 components for Google Maps
	 * @version v0.10.0
	 * @link https://github.com/SebastianM/angular2-google-maps#readme
	 * @license MIT
	 */
	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(1);
	var google_maps_api_wrapper_1 = __webpack_require__(146);
	var marker_manager_1 = __webpack_require__(148);
	var info_window_manager_1 = __webpack_require__(233);
	/**
	 * SebMGoogleMap renders a Google Map.
	 * **Important note**: To be able see a map in the browser, you have to define a height for the CSS
	 * class `sebm-google-map-container`.
	 *
	 * ### Example
	 * ```typescript
	 * import {Component} from 'angular2/core';
	 * import {SebmGoogleMap} from 'angular2-google-maps/core';
	 *
	 * @Component({
	 *  selector: 'my-map-cmp',
	 *  directives: [SebmGoogleMap],
	 *  styles: [`
	 *    .sebm-google-map-container {
	 *      height: 300px;
	 *    }
	 * `],
	 *  template: `
	 *    <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
	 *    </sebm-google-map>
	 *  `
	 * })
	 * ```
	 */
	var SebmGoogleMap = (function () {
	    function SebmGoogleMap(_elem, _mapsWrapper) {
	        this._elem = _elem;
	        this._mapsWrapper = _mapsWrapper;
	        this._longitude = 0;
	        this._latitude = 0;
	        this._zoom = 8;
	        /**
	         * Enables/disables zoom and center on double click. Enabled by default.
	         */
	        this.disableDoubleClickZoom = false;
	        /**
	         * Enables/disables all default UI of the Google map. Please note: When the map is created, this
	         * value cannot get updated.
	         */
	        this.disableDefaultUI = false;
	        /**
	         * If false, disables scrollwheel zooming on the map. The scrollwheel is enabled by default.
	         */
	        this.scrollwheel = true;
	        /**
	         * If false, prevents the map from being controlled by the keyboard. Keyboard shortcuts are
	         * enabled by default.
	         */
	        this.keyboardShortcuts = true;
	        /**
	         * The enabled/disabled state of the Zoom control.
	         */
	        this.zoomControl = true;
	        /**
	         * This event emitter gets emitted when the user clicks on the map (but not when they click on a
	         * marker or infoWindow).
	         */
	        this.mapClick = new core_1.EventEmitter();
	        /**
	         * This event emitter gets emitted when the user right-clicks on the map (but not when they click
	         * on a marker or infoWindow).
	         */
	        this.mapRightClick = new core_1.EventEmitter();
	        /**
	         * This event emitter gets emitted when the user double-clicks on the map (but not when they click
	         * on a marker or infoWindow).
	         */
	        this.mapDblClick = new core_1.EventEmitter();
	        /**
	         * This event emitter is fired when the map center changes.
	         */
	        this.centerChange = new core_1.EventEmitter();
	    }
	    /** @internal */
	    SebmGoogleMap.prototype.ngOnInit = function () {
	        var container = this._elem.nativeElement.querySelector('.sebm-google-map-container-inner');
	        this._initMapInstance(container);
	    };
	    SebmGoogleMap.prototype._initMapInstance = function (el) {
	        this._mapsWrapper.createMap(el, {
	            center: { lat: this._latitude, lng: this._longitude },
	            zoom: this._zoom,
	            disableDefaultUI: this.disableDefaultUI,
	            backgroundColor: this.backgroundColor,
	            draggableCursor: this.draggableCursor,
	            draggingCursor: this.draggingCursor,
	            keyboardShortcuts: this.keyboardShortcuts,
	            zoomControl: this.zoomControl
	        });
	        this._handleMapCenterChange();
	        this._handleMapZoomChange();
	        this._handleMapMouseEvents();
	    };
	    /* @internal */
	    SebmGoogleMap.prototype.ngOnChanges = function (changes) {
	        this._updateMapOptionsChanges(changes);
	    };
	    SebmGoogleMap.prototype._updateMapOptionsChanges = function (changes) {
	        var options = {};
	        var optionKeys = Object.keys(changes).filter(function (k) { return SebmGoogleMap._mapOptionsAttributes.indexOf(k) !== -1; });
	        optionKeys.forEach(function (k) { options[k] = changes[k].currentValue; });
	        this._mapsWrapper.setMapOptions(options);
	    };
	    /**
	     * Triggers a resize event on the google map instance.
	     * Returns a promise that gets resolved after the event was triggered.
	     */
	    SebmGoogleMap.prototype.triggerResize = function () {
	        var _this = this;
	        // Note: When we would trigger the resize event and show the map in the same turn (which is a
	        // common case for triggering a resize event), then the resize event would not
	        // work (to show the map), so we trigger the event in a timeout.
	        return new Promise(function (resolve) {
	            setTimeout(function () { return _this._mapsWrapper.triggerMapEvent('resize').then(function () { return resolve(); }); });
	        });
	    };
	    Object.defineProperty(SebmGoogleMap.prototype, "zoom", {
	        /**
	         * Sets the zoom level of the map. The default value is `8`.
	         */
	        set: function (value) {
	            this._zoom = this._convertToDecimal(value, 8);
	            if (typeof this._zoom === 'number') {
	                this._mapsWrapper.setZoom(this._zoom);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SebmGoogleMap.prototype, "longitude", {
	        /**
	         * The longitude that sets the center of the map.
	         */
	        set: function (value) {
	            this._longitude = this._convertToDecimal(value);
	            this._updateCenter();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SebmGoogleMap.prototype, "latitude", {
	        /**
	         * The latitude that sets the center of the map.
	         */
	        set: function (value) {
	            this._latitude = this._convertToDecimal(value);
	            this._updateCenter();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SebmGoogleMap.prototype._convertToDecimal = function (value, defaultValue) {
	        if (defaultValue === void 0) { defaultValue = null; }
	        if (typeof value === 'string') {
	            return parseFloat(value);
	        }
	        else if (typeof value === 'number') {
	            return value;
	        }
	        return defaultValue;
	    };
	    SebmGoogleMap.prototype._updateCenter = function () {
	        if (typeof this._latitude !== 'number' || typeof this._longitude !== 'number') {
	            return;
	        }
	        this._mapsWrapper.setCenter({
	            lat: this._latitude,
	            lng: this._longitude,
	        });
	    };
	    SebmGoogleMap.prototype._handleMapCenterChange = function () {
	        var _this = this;
	        this._mapsWrapper.subscribeToMapEvent('center_changed').subscribe(function () {
	            _this._mapsWrapper.getCenter().then(function (center) {
	                _this._latitude = center.lat();
	                _this._longitude = center.lng();
	                _this.centerChange.emit({ lat: _this._latitude, lng: _this._longitude });
	            });
	        });
	    };
	    SebmGoogleMap.prototype._handleMapZoomChange = function () {
	        var _this = this;
	        this._mapsWrapper.subscribeToMapEvent('zoom_changed').subscribe(function () {
	            _this._mapsWrapper.getZoom().then(function (z) { return _this._zoom = z; });
	        });
	    };
	    SebmGoogleMap.prototype._handleMapMouseEvents = function () {
	        var _this = this;
	        var events = [
	            { name: 'click', emitter: this.mapClick },
	            { name: 'rightclick', emitter: this.mapRightClick },
	        ];
	        events.forEach(function (e) {
	            _this._mapsWrapper.subscribeToMapEvent(e.name).subscribe(function (event) {
	                var value = { coords: { lat: event.latLng.lat(), lng: event.latLng.lng() } };
	                e.emitter.emit(value);
	            });
	        });
	    };
	    /**
	     * Map option attributes that can change over time
	     */
	    SebmGoogleMap._mapOptionsAttributes = [
	        'disableDoubleClickZoom', 'scrollwheel', 'draggableCursor', 'draggingCursor',
	        'keyboardShortcuts', 'zoomControl'
	    ];
	    SebmGoogleMap = __decorate([
	        core_1.Component({
	            selector: 'sebm-google-map',
	            providers: [google_maps_api_wrapper_1.GoogleMapsAPIWrapper, marker_manager_1.MarkerManager, info_window_manager_1.InfoWindowManager],
	            inputs: [
	                'longitude', 'latitude', 'zoom', 'disableDoubleClickZoom', 'disableDefaultUI', 'scrollwheel',
	                'backgroundColor', 'draggableCursor', 'draggingCursor', 'keyboardShortcuts', 'zoomControl'
	            ],
	            outputs: ['mapClick', 'mapRightClick', 'mapDblClick', 'centerChange'],
	            host: { '[class.sebm-google-map-container]': 'true' },
	            styles: ["\n    .sebm-google-map-container-inner {\n      width: inherit;\n      height: inherit;\n    }\n    .sebm-google-map-content {\n      display:none;\n    }\n  "],
	            template: "\n    <div class='sebm-google-map-container-inner'></div>\n    <div class='sebm-google-map-content'>\n      <ng-content></ng-content>\n    </div>\n  "
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef, google_maps_api_wrapper_1.GoogleMapsAPIWrapper])
	    ], SebmGoogleMap);
	    return SebmGoogleMap;
	}());
	exports.SebmGoogleMap = SebmGoogleMap;

	

/***/ },
/* 378 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(232);
	var observable_1 = __webpack_require__(670);
	var toSubscriber_1 = __webpack_require__(674);
	/**
	 * A representation of any set of values over any amount of time. This the most basic building block
	 * of RxJS.
	 *
	 * @class Observable<T>
	 */
	var Observable = (function () {
	    /**
	     * @constructor
	     * @param {Function} subscribe the function that is  called when the Observable is
	     * initially subscribed to. This function is given a Subscriber, to which new values
	     * can be `next`ed, or an `error` method can be called to raise an error, or
	     * `complete` can be called to notify of a successful completion.
	     */
	    function Observable(subscribe) {
	        this._isScalar = false;
	        if (subscribe) {
	            this._subscribe = subscribe;
	        }
	    }
	    /**
	     * Creates a new Observable, with this Observable as the source, and the passed
	     * operator defined as the new observable's operator.
	     * @method lift
	     * @param {Operator} operator the operator defining the operation to take on the observable
	     * @return {Observable} a new observable with the Operator applied
	     */
	    Observable.prototype.lift = function (operator) {
	        var observable = new Observable();
	        observable.source = this;
	        observable.operator = operator;
	        return observable;
	    };
	    /**
	     * Registers handlers for handling emitted values, error and completions from the observable, and
	     *  executes the observable's subscriber function, which will take action to set up the underlying data stream
	     * @method subscribe
	     * @param {PartialObserver|Function} observerOrNext (optional) either an observer defining all functions to be called,
	     *  or the first of three possible handlers, which is the handler for each value emitted from the observable.
	     * @param {Function} error (optional) a handler for a terminal event resulting from an error. If no error handler is provided,
	     *  the error will be thrown as unhandled
	     * @param {Function} complete (optional) a handler for a terminal event resulting from successful completion.
	     * @return {ISubscription} a subscription reference to the registered handlers
	     */
	    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
	        var operator = this.operator;
	        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
	        sink.add(operator ? operator.call(sink, this) : this._subscribe(sink));
	        if (sink.syncErrorThrowable) {
	            sink.syncErrorThrowable = false;
	            if (sink.syncErrorThrown) {
	                throw sink.syncErrorValue;
	            }
	        }
	        return sink;
	    };
	    /**
	     * @method forEach
	     * @param {Function} next a handler for each value emitted by the observable
	     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
	     * @return {Promise} a promise that either resolves on observable completion or
	     *  rejects with the handled error
	     */
	    Observable.prototype.forEach = function (next, PromiseCtor) {
	        var _this = this;
	        if (!PromiseCtor) {
	            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
	                PromiseCtor = root_1.root.Rx.config.Promise;
	            }
	            else if (root_1.root.Promise) {
	                PromiseCtor = root_1.root.Promise;
	            }
	        }
	        if (!PromiseCtor) {
	            throw new Error('no Promise impl found');
	        }
	        return new PromiseCtor(function (resolve, reject) {
	            var subscription = _this.subscribe(function (value) {
	                if (subscription) {
	                    // if there is a subscription, then we can surmise
	                    // the next handling is asynchronous. Any errors thrown
	                    // need to be rejected explicitly and unsubscribe must be
	                    // called manually
	                    try {
	                        next(value);
	                    }
	                    catch (err) {
	                        reject(err);
	                        subscription.unsubscribe();
	                    }
	                }
	                else {
	                    // if there is NO subscription, then we're getting a nexted
	                    // value synchronously during subscription. We can just call it.
	                    // If it errors, Observable's `subscribe` imple will ensure the
	                    // unsubscription logic is called, then synchronously rethrow the error.
	                    // After that, Promise will trap the error and send it
	                    // down the rejection path.
	                    next(value);
	                }
	            }, reject, resolve);
	        });
	    };
	    Observable.prototype._subscribe = function (subscriber) {
	        return this.source.subscribe(subscriber);
	    };
	    /**
	     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
	     * @method Symbol.observable
	     * @return {Observable} this instance of the observable
	     */
	    Observable.prototype[observable_1.$$observable] = function () {
	        return this;
	    };
	    // HACK: Since TypeScript inherits static properties too, we have to
	    // fight against TypeScript here so Subject can have a different static create signature
	    /**
	     * Creates a new cold Observable by calling the Observable constructor
	     * @static true
	     * @owner Observable
	     * @method create
	     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
	     * @return {Observable} a new cold observable
	     */
	    Observable.create = function (subscribe) {
	        return new Observable(subscribe);
	    };
	    return Observable;
	}());
	exports.Observable = Observable;
	

/***/ },
/* 379 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(232);
	var Symbol = root_1.root.Symbol;
	exports.$$rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
	    Symbol.for('rxSubscriber') : '@@rxSubscriber';
	

/***/ },
/* 380 */
/***/ function(module, exports) {

	"use strict";
	// typeof any so that it we don't have to cast when comparing a result to the error object
	exports.errorObject = { e: {} };
	

/***/ },
/* 381 */
/***/ function(module, exports) {

	"use strict";
	function isFunction(x) {
	    return typeof x === 'function';
	}
	exports.isFunction = isFunction;
	

/***/ },
/* 382 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * angular2-google-maps - Angular 2 components for Google Maps
	 * @version v0.10.0
	 * @link https://github.com/SebastianM/angular2-google-maps#readme
	 * @license MIT
	 */
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(1);
	var maps_api_loader_1 = __webpack_require__(147);
	(function (GoogleMapsScriptProtocol) {
	    GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["HTTP"] = 0] = "HTTP";
	    GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["HTTPS"] = 1] = "HTTPS";
	    GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["AUTO"] = 2] = "AUTO";
	})(exports.GoogleMapsScriptProtocol || (exports.GoogleMapsScriptProtocol = {}));
	var GoogleMapsScriptProtocol = exports.GoogleMapsScriptProtocol;
	var LazyMapsAPILoaderConfig = (function () {
	    function LazyMapsAPILoaderConfig() {
	        /**
	         * The Google Maps API Key (see:
	         * https://developers.google.com/maps/documentation/javascript/get-api-key)
	         */
	        this.apiKey = null;
	        /**
	         * The Google Maps client ID (for premium plans).
	         * When you have a Google Maps APIs Premium Plan license, you must authenticate
	         * your application with either an API key or a client ID.
	         * The Google Maps API will fail to load if both a client ID and an API key are included.
	         */
	        this.clientId = null;
	        /**
	         * Google Maps API version.
	         */
	        this.apiVersion = '3';
	        /**
	         * Host and Path used for the `<script>` tag.
	         */
	        this.hostAndPath = 'maps.googleapis.com/maps/api/js';
	        /**
	         * Protocol used for the `<script>` tag.
	         */
	        this.protocol = GoogleMapsScriptProtocol.HTTPS;
	        /**
	         * Defines which Google Maps libraries should get loaded.
	         */
	        this.libraries = [];
	        /**
	         * The default bias for the map behavior is US.
	         * If you wish to alter your application to serve different map tiles or bias the
	         * application, you can overwrite the default behavior (US) by defining a `region`.
	         * See https://developers.google.com/maps/documentation/javascript/basics#Region
	         */
	        this.region = null;
	        /**
	         * The Google Maps API uses the browser's preferred language when displaying
	         * textual information. If you wish to overwrite this behavior and force the API
	         * to use a given language, you can use this setting.
	         * See https://developers.google.com/maps/documentation/javascript/basics#Language
	         */
	        this.language = null;
	    }
	    return LazyMapsAPILoaderConfig;
	}());
	exports.LazyMapsAPILoaderConfig = LazyMapsAPILoaderConfig;
	var DEFAULT_CONFIGURATION = new LazyMapsAPILoaderConfig();
	var LazyMapsAPILoader = (function (_super) {
	    __extends(LazyMapsAPILoader, _super);
	    function LazyMapsAPILoader(_config) {
	        _super.call(this);
	        this._config = _config;
	        if (this._config === null || this._config === undefined) {
	            this._config = DEFAULT_CONFIGURATION;
	        }
	    }
	    LazyMapsAPILoader.prototype.load = function () {
	        if (this._scriptLoadingPromise) {
	            return this._scriptLoadingPromise;
	        }
	        var script = document.createElement('script');
	        script.type = 'text/javascript';
	        script.async = true;
	        script.defer = true;
	        var callbackName = "angular2googlemaps" + new Date().getMilliseconds();
	        script.src = this._getScriptSrc(callbackName);
	        this._scriptLoadingPromise = new Promise(function (resolve, reject) {
	            window[callbackName] = function () { resolve(); };
	            script.onerror = function (error) { reject(error); };
	        });
	        document.body.appendChild(script);
	        return this._scriptLoadingPromise;
	    };
	    LazyMapsAPILoader.prototype._getScriptSrc = function (callbackName) {
	        var protocolType = (this._config && this._config.protocol) || DEFAULT_CONFIGURATION.protocol;
	        var protocol;
	        switch (protocolType) {
	            case GoogleMapsScriptProtocol.AUTO:
	                protocol = '';
	                break;
	            case GoogleMapsScriptProtocol.HTTP:
	                protocol = 'http:';
	                break;
	            case GoogleMapsScriptProtocol.HTTPS:
	                protocol = 'https:';
	                break;
	        }
	        var hostAndPath = this._config.hostAndPath || DEFAULT_CONFIGURATION.hostAndPath;
	        var apiKey = this._config.apiKey || DEFAULT_CONFIGURATION.apiKey;
	        var clientId = this._config.clientId || DEFAULT_CONFIGURATION.clientId;
	        var libraries = this._config.libraries || DEFAULT_CONFIGURATION.libraries;
	        var region = this._config.region || DEFAULT_CONFIGURATION.region;
	        var language = this._config.language || DEFAULT_CONFIGURATION.language;
	        var queryParams = {
	            v: this._config.apiVersion || DEFAULT_CONFIGURATION.apiVersion,
	            callback: callbackName
	        };
	        if (apiKey) {
	            queryParams['key'] = apiKey;
	        }
	        if (clientId) {
	            queryParams['client'] = clientId;
	        }
	        if (libraries != null && libraries.length > 0) {
	            queryParams['libraries'] = libraries.join(',');
	        }
	        if (region != null && region.length > 0) {
	            queryParams['region'] = region;
	        }
	        if (language != null && language.length > 0) {
	            queryParams['language'] = language;
	        }
	        var params = Object.keys(queryParams)
	            .map(function (k, i) {
	            var param = (i === 0) ? '?' : '&';
	            return param += k + "=" + queryParams[k];
	        })
	            .join('');
	        return protocol + "//" + hostAndPath + params;
	    };
	    LazyMapsAPILoader = __decorate([
	        core_1.Injectable(),
	        __param(0, core_1.Optional()), 
	        __metadata('design:paramtypes', [LazyMapsAPILoaderConfig])
	    ], LazyMapsAPILoader);
	    return LazyMapsAPILoader;
	}(maps_api_loader_1.MapsAPILoader));
	exports.LazyMapsAPILoader = LazyMapsAPILoader;

	

/***/ },
/* 383 */,
/* 384 */,
/* 385 */,
/* 386 */,
/* 387 */,
/* 388 */,
/* 389 */,
/* 390 */,
/* 391 */,
/* 392 */,
/* 393 */,
/* 394 */,
/* 395 */,
/* 396 */,
/* 397 */,
/* 398 */,
/* 399 */,
/* 400 */,
/* 401 */,
/* 402 */,
/* 403 */,
/* 404 */,
/* 405 */,
/* 406 */,
/* 407 */,
/* 408 */,
/* 409 */,
/* 410 */,
/* 411 */,
/* 412 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(1);
	var file_uploader_class_1 = __webpack_require__(255);
	var FileDropDirective = (function () {
	    function FileDropDirective(element) {
	        this.fileOver = new core_1.EventEmitter();
	        this.onFileDrop = new core_1.EventEmitter();
	        this.element = element;
	    }
	    FileDropDirective.prototype.getOptions = function () {
	        return this.uploader.options;
	    };
	    FileDropDirective.prototype.getFilters = function () {
	        return {};
	    };
	    FileDropDirective.prototype.onDrop = function (event) {
	        var transfer = this._getTransfer(event);
	        if (!transfer) {
	            return;
	        }
	        var options = this.getOptions();
	        var filters = this.getFilters();
	        this._preventAndStop(event);
	        this.uploader.addToQueue(transfer.files, options, filters);
	        this.fileOver.emit(false);
	        this.onFileDrop.emit(transfer.files);
	    };
	    FileDropDirective.prototype.onDragOver = function (event) {
	        var transfer = this._getTransfer(event);
	        if (!this._haveFiles(transfer.types)) {
	            return;
	        }
	        transfer.dropEffect = 'copy';
	        this._preventAndStop(event);
	        this.fileOver.emit(true);
	    };
	    FileDropDirective.prototype.onDragLeave = function (event) {
	        if (event.currentTarget === this.element[0]) {
	            return;
	        }
	        this._preventAndStop(event);
	        this.fileOver.emit(false);
	    };
	    FileDropDirective.prototype._getTransfer = function (event) {
	        return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer; // jQuery fix;
	    };
	    FileDropDirective.prototype._preventAndStop = function (event) {
	        event.preventDefault();
	        event.stopPropagation();
	    };
	    FileDropDirective.prototype._haveFiles = function (types) {
	        if (!types) {
	            return false;
	        }
	        if (types.indexOf) {
	            return types.indexOf('Files') !== -1;
	        }
	        else if (types.contains) {
	            return types.contains('Files');
	        }
	        else {
	            return false;
	        }
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', file_uploader_class_1.FileUploader)
	    ], FileDropDirective.prototype, "uploader", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], FileDropDirective.prototype, "fileOver", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], FileDropDirective.prototype, "onFileDrop", void 0);
	    __decorate([
	        core_1.HostListener('drop', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [Object]), 
	        __metadata('design:returntype', void 0)
	    ], FileDropDirective.prototype, "onDrop", null);
	    __decorate([
	        core_1.HostListener('dragover', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [Object]), 
	        __metadata('design:returntype', void 0)
	    ], FileDropDirective.prototype, "onDragOver", null);
	    __decorate([
	        core_1.HostListener('dragleave', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [Object]), 
	        __metadata('design:returntype', Object)
	    ], FileDropDirective.prototype, "onDragLeave", null);
	    FileDropDirective = __decorate([
	        core_1.Directive({ selector: '[ng2FileDrop]' }), 
	        __metadata('design:paramtypes', [core_1.ElementRef])
	    ], FileDropDirective);
	    return FileDropDirective;
	}());
	exports.FileDropDirective = FileDropDirective;


/***/ },
/* 413 */
/***/ function(module, exports) {

	"use strict";
	function isElement(node) {
	    return !!(node && (node.nodeName || node.prop && node.attr && node.find));
	}
	var FileLikeObject = (function () {
	    function FileLikeObject(fileOrInput) {
	        var isInput = isElement(fileOrInput);
	        var fakePathOrObject = isInput ? fileOrInput.value : fileOrInput;
	        var postfix = typeof fakePathOrObject === 'string' ? 'FakePath' : 'Object';
	        var method = '_createFrom' + postfix;
	        this[method](fakePathOrObject);
	    }
	    FileLikeObject.prototype._createFromFakePath = function (path) {
	        this.lastModifiedDate = void 0;
	        this.size = void 0;
	        this.type = 'like/' + path.slice(path.lastIndexOf('.') + 1).toLowerCase();
	        this.name = path.slice(path.lastIndexOf('/') + path.lastIndexOf('\\') + 2);
	    };
	    FileLikeObject.prototype._createFromObject = function (object) {
	        // this.lastModifiedDate = copy(object.lastModifiedDate);
	        this.size = object.size;
	        this.type = object.type;
	        this.name = object.name;
	    };
	    return FileLikeObject;
	}());
	exports.FileLikeObject = FileLikeObject;


/***/ },
/* 414 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(1);
	var file_uploader_class_1 = __webpack_require__(255);
	// todo: filters
	var FileSelectDirective = (function () {
	    function FileSelectDirective(element) {
	        this.element = element;
	    }
	    FileSelectDirective.prototype.getOptions = function () {
	        return this.uploader.options;
	    };
	    FileSelectDirective.prototype.getFilters = function () {
	        return void 0;
	    };
	    FileSelectDirective.prototype.isEmptyAfterSelection = function () {
	        return !!this.element.nativeElement.attributes.multiple;
	    };
	    FileSelectDirective.prototype.onChange = function () {
	        // let files = this.uploader.isHTML5 ? this.element.nativeElement[0].files : this.element.nativeElement[0];
	        var files = this.element.nativeElement.files;
	        var options = this.getOptions();
	        var filters = this.getFilters();
	        // if(!this.uploader.isHTML5) this.destroy();
	        this.uploader.addToQueue(files, options, filters);
	        if (this.isEmptyAfterSelection()) {
	        }
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', file_uploader_class_1.FileUploader)
	    ], FileSelectDirective.prototype, "uploader", void 0);
	    __decorate([
	        core_1.HostListener('change'), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', []), 
	        __metadata('design:returntype', Object)
	    ], FileSelectDirective.prototype, "onChange", null);
	    FileSelectDirective = __decorate([
	        core_1.Directive({ selector: '[ng2FileSelect]' }), 
	        __metadata('design:paramtypes', [core_1.ElementRef])
	    ], FileSelectDirective);
	    return FileSelectDirective;
	}());
	exports.FileSelectDirective = FileSelectDirective;


/***/ },
/* 415 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var animate_1 = __webpack_require__(159);
	var core_1 = __webpack_require__(1);
	var viewport_1 = __webpack_require__(113);
	var MdBackdrop = (function () {
	    function MdBackdrop(element, viewport) {
	        this.element = element;
	        this.viewport = viewport;
	        this.clickClose = false;
	        this.hideScroll = true;
	        this.onHiding = new core_1.EventEmitter(false);
	        this.onHidden = new core_1.EventEmitter(false);
	        this.onShowing = new core_1.EventEmitter();
	        this.onShown = new core_1.EventEmitter();
	        this.transitionClass = 'md-active';
	        this.transitionAddClass = true;
	        this._visible = false;
	        this._transitioning = false;
	        this._previousOverflow = null;
	        this._body = document.body;
	    }
	    Object.defineProperty(MdBackdrop.prototype, "visible", {
	        get: function () {
	            return this._visible;
	        },
	        set: function (value) {
	            this.toggle(value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    MdBackdrop.prototype.onClick = function () {
	        if (this.clickClose && !this._transitioning && this.visible) {
	            this.hide();
	        }
	    };
	    MdBackdrop.prototype.hide = function () {
	        return this.toggle(false);
	    };
	    MdBackdrop.prototype.show = function () {
	        return this.toggle(true);
	    };
	    MdBackdrop.prototype.toggle = function (visible) {
	        var _this = this;
	        if (visible === void 0) { visible = !this.visible; }
	        if (visible === this._visible) {
	            return Promise.resolve();
	        }
	        var beginEvent = visible ? this.onShowing : this.onHiding;
	        var endEvent = visible ? this.onShown : this.onHidden;
	        this._visible = visible;
	        this._transitioning = true;
	        beginEvent.emit(this);
	        var action = visible ?
	            (this.transitionAddClass ? animate_1.Animate.enter : animate_1.Animate.leave) :
	            (this.transitionAddClass ? animate_1.Animate.leave : animate_1.Animate.enter);
	        if (visible && this.hideScroll && this.element && !this._previousOverflow) {
	            var style = this._body.style['overflow'];
	            if (style !== 'hidden') {
	                this._previousOverflow = style;
	                this._body.style['overflow'] = 'hidden';
	            }
	        }
	        else if (!visible && this.hideScroll && this.element && this._previousOverflow !== null) {
	            this._body.style['overflow'] = this._previousOverflow;
	            this._previousOverflow = null;
	        }
	        return action(this.element.nativeElement, this.transitionClass).then(function () {
	            _this._transitioning = false;
	            endEvent.emit(_this);
	        });
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], MdBackdrop.prototype, "clickClose", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], MdBackdrop.prototype, "hideScroll", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], MdBackdrop.prototype, "onHiding", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], MdBackdrop.prototype, "onHidden", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], MdBackdrop.prototype, "onShowing", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], MdBackdrop.prototype, "onShown", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], MdBackdrop.prototype, "transitionClass", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], MdBackdrop.prototype, "transitionAddClass", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], MdBackdrop.prototype, "visible", null);
	    MdBackdrop = __decorate([
	        core_1.Component({
	            selector: 'md-backdrop',
	            template: '',
	            encapsulation: core_1.ViewEncapsulation.None,
	            host: {
	                'class': 'md-backdrop',
	                '(click)': 'onClick()',
	            },
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef, viewport_1.ViewportHelper])
	    ], MdBackdrop);
	    return MdBackdrop;
	}());
	exports.MdBackdrop = MdBackdrop;
	

/***/ },
/* 416 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(1);
	var ink_1 = __webpack_require__(160);
	var BUTTON_TEMPLATE = "<span class=\"md-button-wrapper\"><ng-content></ng-content></span>";
	var MdButton = (function () {
	    function MdButton(_element) {
	        this._element = _element;
	        this.isMouseDown = false;
	        this.isKeyboardFocused = false;
	    }
	    MdButton.prototype.onMousedown = function (event) {
	        var _this = this;
	        this.isMouseDown = true;
	        setTimeout(function () {
	            _this.isMouseDown = false;
	        }, 100);
	        if (this._element && ink_1.Ink.canApply(this._element.nativeElement)) {
	            ink_1.Ink.rippleEvent(this._element.nativeElement, event);
	        }
	    };
	    MdButton.prototype.onFocus = function () {
	        this.isKeyboardFocused = !this.isMouseDown;
	    };
	    MdButton.prototype.onBlur = function () {
	        this.isKeyboardFocused = false;
	    };
	    MdButton = __decorate([
	        core_1.Component({
	            selector: '[md-button]:not(a), [md-fab]:not(a), [md-raised-button]:not(a)',
	            template: BUTTON_TEMPLATE,
	            encapsulation: core_1.ViewEncapsulation.None,
	            host: {
	                '(mousedown)': 'onMousedown($event)',
	                '(focus)': 'onFocus()',
	                '(blur)': 'onBlur()',
	                '[class.md-button-focus]': 'isKeyboardFocused',
	            },
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef])
	    ], MdButton);
	    return MdButton;
	}());
	exports.MdButton = MdButton;
	var MdAnchor = (function (_super) {
	    __extends(MdAnchor, _super);
	    function MdAnchor() {
	        _super.apply(this, arguments);
	    }
	    Object.defineProperty(MdAnchor.prototype, "disabled", {
	        get: function () {
	            return this.disabled_;
	        },
	        set: function (value) {
	            this.disabled_ = !!value && this.disabled !== false;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    MdAnchor.prototype.onClick = function (event) {
	        if (this.disabled) {
	            event.preventDefault();
	        }
	    };
	    MdAnchor.prototype.ngOnChanges = function (_) {
	        this.tabIndex = this.disabled ? -1 : 0;
	    };
	    Object.defineProperty(MdAnchor.prototype, "isAriaDisabled", {
	        get: function () {
	            return this.disabled ? 'true' : 'false';
	        },
	        enumerable: true,
	        configurable: true
	    });
	    MdAnchor = __decorate([
	        core_1.Component({
	            selector: 'a[md-button], a[md-raised-button], a[md-fab]',
	            inputs: ['disabled'],
	            template: BUTTON_TEMPLATE,
	            encapsulation: core_1.ViewEncapsulation.None,
	            host: {
	                '(click)': 'onClick($event)',
	                '(mousedown)': 'onMousedown()',
	                '(focus)': 'onFocus()',
	                '(blur)': 'onBlur()',
	                '[tabIndex]': 'tabIndex',
	                '[class.md-button-focus]': 'isKeyboardFocused',
	                '[attr.aria-disabled]': 'isAriaDisabled',
	            },
	        }), 
	        __metadata('design:paramtypes', [])
	    ], MdAnchor);
	    return MdAnchor;
	}(MdButton));
	exports.MdAnchor = MdAnchor;
	

/***/ },
/* 417 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(1);
	var MdContent = (function () {
	    function MdContent() {
	    }
	    MdContent = __decorate([
	        core_1.Directive({ selector: 'md-content' }), 
	        __metadata('design:paramtypes', [])
	    ], MdContent);
	    return MdContent;
	}());
	exports.MdContent = MdContent;
	

/***/ },
/* 418 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var core_1 = __webpack_require__(1);
	__webpack_require__(367);
	var data_table_selectable_tr_1 = __webpack_require__(256);
	__export(__webpack_require__(256));
	var MdDataTable = (function () {
	    function MdDataTable() {
	        this.onSelectableAll = new core_1.EventEmitter(false);
	        this.onSelectableChange = new core_1.EventEmitter(false);
	        this.selected = [];
	        this.onSelectableChange.share();
	    }
	    MdDataTable.prototype.change = function (event) {
	        var outputEvent = {
	            name: 'selectable_change',
	            allSelected: false,
	            values: []
	        };
	        if (event.target instanceof data_table_selectable_tr_1.MdDataTableHeaderSelectableRow === true) {
	            if (event.isActive === true) {
	                outputEvent.allSelected = true;
	                outputEvent.values = this._getRowsValues();
	            }
	        }
	        else {
	            outputEvent.values = this.selected.slice(0);
	            if (event.isActive === true) {
	                outputEvent.values.push(event.selectableValue);
	            }
	            else {
	                var index = outputEvent.values.indexOf(event.selectableValue);
	                if (index !== -1) {
	                    outputEvent.values.splice(index, 1);
	                }
	            }
	        }
	        this.selected = outputEvent.values;
	        this.onSelectableChange.emit(outputEvent);
	    };
	    MdDataTable.prototype._getRowsValues = function () {
	        return this._rows.toArray()
	            .map(function (tr) { return tr.selectableValue; });
	    };
	    MdDataTable.prototype.ngAfterContentInit = function () {
	        var _this = this;
	        if (this.selectable === true) {
	            if (!!this._masterRow) {
	                this._masterRow.onChange.subscribe(this.change.bind(this));
	            }
	            this._rows.toArray()
	                .map(function (tr) {
	                tr.onChange.subscribe(_this.change.bind(_this));
	            });
	        }
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], MdDataTable.prototype, "selectable", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], MdDataTable.prototype, "onSelectableAll", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], MdDataTable.prototype, "onSelectableChange", void 0);
	    __decorate([
	        core_1.ContentChild(data_table_selectable_tr_1.MdDataTableHeaderSelectableRow), 
	        __metadata('design:type', data_table_selectable_tr_1.MdDataTableHeaderSelectableRow)
	    ], MdDataTable.prototype, "_masterRow", void 0);
	    __decorate([
	        core_1.ContentChildren(data_table_selectable_tr_1.MdDataTableSelectableRow, true), 
	        __metadata('design:type', core_1.QueryList)
	    ], MdDataTable.prototype, "_rows", void 0);
	    MdDataTable = __decorate([
	        core_1.Component({
	            selector: 'md-data-table',
	            template: "<ng-content></ng-content>",
	            directives: [data_table_selectable_tr_1.MdDataTableHeaderSelectableRow, data_table_selectable_tr_1.MdDataTableSelectableRow],
	            host: {
	                '[class.md-data-table]': 'true',
	                '[class.md-data-table-selectable]': 'selectable',
	            }
	        }), 
	        __metadata('design:paramtypes', [])
	    ], MdDataTable);
	    return MdDataTable;
	}());
	exports.MdDataTable = MdDataTable;
	

/***/ },
/* 419 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(418));
	__export(__webpack_require__(256));
	

/***/ },
/* 420 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(1);
	var dialog_1 = __webpack_require__(423);
	var MdDialogActions = (function () {
	    function MdDialogActions() {
	    }
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], MdDialogActions.prototype, "cancel", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], MdDialogActions.prototype, "ok", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', dialog_1.MdDialog)
	    ], MdDialogActions.prototype, "dialog", void 0);
	    MdDialogActions = __decorate([
	        core_1.Component({
	            selector: 'md-dialog-actions',
	            template: "\n  <button *ngIf=\"cancel\" md-button type=\"button\" (click)=\"dialog.close(false)\">\n    <span>{{ cancel }}</span>\n  </button>\n  <button *ngIf=\"ok\" md-button class=\"md-primary\" type=\"button\" (click)=\"dialog.close(true)\">\n    <span>{{ ok }}</span>\n  </button> \n  <ng-content></ng-content>",
	            changeDetection: core_1.ChangeDetectionStrategy.OnPush
	        }), 
	        __metadata('design:paramtypes', [])
	    ], MdDialogActions);
	    return MdDialogActions;
	}());
	exports.MdDialogActions = MdDialogActions;
	

/***/ },
/* 421 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(1);
	var core_2 = __webpack_require__(445);
	var MdDialogPortal = (function (_super) {
	    __extends(MdDialogPortal, _super);
	    function MdDialogPortal(templateRef, viewContainerRef) {
	        _super.call(this, templateRef, viewContainerRef);
	    }
	    MdDialogPortal = __decorate([
	        core_1.Directive({ selector: '[mdDialogPortal]' }), 
	        __metadata('design:paramtypes', [core_1.TemplateRef, core_1.ViewContainerRef])
	    ], MdDialogPortal);
	    return MdDialogPortal;
	}(core_2.TemplatePortalDirective));
	exports.MdDialogPortal = MdDialogPortal;
	

/***/ },
/* 422 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(1);
	var MdDialogTitle = (function () {
	    function MdDialogTitle() {
	    }
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], MdDialogTitle.prototype, "title", void 0);
	    MdDialogTitle = __decorate([
	        core_1.Component({
	            selector: 'md-dialog-title',
	            template: "<h2 *ngIf=\"title\">{{title}}</h2><ng-content></ng-content>",
	            changeDetection: core_1.ChangeDetectionStrategy.OnPush
	        }), 
	        __metadata('design:paramtypes', [])
	    ], MdDialogTitle);
	    return MdDialogTitle;
	}());
	exports.MdDialogTitle = MdDialogTitle;
	

/***/ },
/* 423 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(1);
	var overlay_1 = __webpack_require__(162);
	var animate_1 = __webpack_require__(159);
	var dialog_portal_1 = __webpack_require__(421);
	var dialog_actions_1 = __webpack_require__(420);
	var dialog_title_1 = __webpack_require__(422);
	var key_codes_1 = __webpack_require__(435);
	var MdDialog = (function () {
	    function MdDialog(overlay) {
	        this.overlay = overlay;
	        this.onShow = new core_1.EventEmitter();
	        this.onClose = new core_1.EventEmitter();
	        this.onCancel = new core_1.EventEmitter();
	        this.active = false;
	        this.config = new overlay_1.OverlayState();
	        this.overlayRef = null;
	        this.config.positionStrategy = this.overlay.position()
	            .global()
	            .centerHorizontally()
	            .centerVertically();
	    }
	    MdDialog.prototype.ngAfterContentInit = function () {
	        if (this.actions) {
	            this.actions.dialog = this;
	        }
	    };
	    MdDialog.prototype.ngOnDestroy = function () {
	        return this.close();
	    };
	    MdDialog.prototype.show = function () {
	        var _this = this;
	        return this.close()
	            .then(function () { return _this.overlay.create(_this.config); })
	            .then(function (ref) {
	            _this.overlayRef = ref;
	            return ref.attach(_this.portal);
	        })
	            .then(function () { return animate_1.Animate.wait(); })
	            .then(function () {
	            _this.active = true;
	            _this.onShow.emit(_this);
	            return _this;
	        });
	    };
	    MdDialog.prototype.close = function (result, cancel) {
	        var _this = this;
	        if (result === void 0) { result = true; }
	        if (cancel === void 0) { cancel = false; }
	        if (!this.overlayRef) {
	            return Promise.resolve(this);
	        }
	        this.active = false;
	        return animate_1.Animate.wait(100)
	            .then(function () { return _this.overlayRef.detach(); })
	            .then(function () {
	            _this.overlayRef.dispose();
	            _this.overlayRef = null;
	            if (cancel) {
	                _this.onCancel.emit(result);
	            }
	            else {
	                _this.onClose.emit(result);
	            }
	            return _this;
	        });
	    };
	    MdDialog.prototype.onDocumentKeypress = function (event) {
	        if (event.keyCode == key_codes_1.KeyCodes.ESCAPE) {
	            this.close();
	        }
	    };
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], MdDialog.prototype, "onShow", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], MdDialog.prototype, "onClose", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], MdDialog.prototype, "onCancel", void 0);
	    __decorate([
	        core_1.ViewChild(dialog_portal_1.MdDialogPortal), 
	        __metadata('design:type', dialog_portal_1.MdDialogPortal)
	    ], MdDialog.prototype, "portal", void 0);
	    __decorate([
	        core_1.ContentChild(dialog_actions_1.MdDialogActions), 
	        __metadata('design:type', dialog_actions_1.MdDialogActions)
	    ], MdDialog.prototype, "actions", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], MdDialog.prototype, "config", void 0);
	    MdDialog = __decorate([
	        core_1.Component({
	            selector: 'md-dialog',
	            directives: [dialog_title_1.MdDialogTitle, dialog_actions_1.MdDialogActions, dialog_portal_1.MdDialogPortal],
	            providers: [overlay_1.Overlay],
	            encapsulation: core_1.ViewEncapsulation.None,
	            template: "\n<template mdDialogPortal>\n  <div class=\"md-dialog\" [class.md-active]=\"active\">\n    <ng-content select=\"md-dialog-title\"></ng-content>\n    <ng-content></ng-content>\n    <ng-content select=\"md-dialog-actions\"></ng-content>  \n  </div>\n</template>\n",
	            host: {
	                'tabindex': '0',
	                '(body:keydown)': 'onDocumentKeypress($event)'
	            }
	        }), 
	        __metadata('design:paramtypes', [overlay_1.Overlay])
	    ], MdDialog);
	    return MdDialog;
	}());
	exports.MdDialog = MdDialog;
	

/***/ },
/* 424 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(423));
	__export(__webpack_require__(420));
	__export(__webpack_require__(421));
	__export(__webpack_require__(422));
	

/***/ },
/* 425 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(1);
	var MdDivider = (function () {
	    function MdDivider() {
	    }
	    MdDivider = __decorate([
	        core_1.Component({
	            selector: 'md-divider',
	            template: '',
	            encapsulation: core_1.ViewEncapsulation.None
	        }), 
	        __metadata('design:paramtypes', [])
	    ], MdDivider);
	    return MdDivider;
	}());
	exports.MdDivider = MdDivider;
	

/***/ },
/* 426 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var common_1 = __webpack_require__(7);
	var core_1 = __webpack_require__(1);
	var MdMessage = (function () {
	    function MdMessage() {
	        this.okay = true;
	    }
	    __decorate([
	        core_1.Input('md-message'), 
	        __metadata('design:type', String)
	    ], MdMessage.prototype, "errorKey", void 0);
	    MdMessage = __decorate([
	        core_1.Directive({
	            selector: '[md-message]',
	            host: {
	                '[style.display]': 'okay ? "none" : "inherit"'
	            }
	        }), 
	        __metadata('design:paramtypes', [])
	    ], MdMessage);
	    return MdMessage;
	}());
	exports.MdMessage = MdMessage;
	var MdMessages = (function () {
	    function MdMessages(messages, form) {
	        this.messages = messages;
	        this.form = form;
	        this._unsubscribe = null;
	    }
	    Object.defineProperty(MdMessages.prototype, "valid", {
	        get: function () {
	            if (this.property instanceof common_1.NgControlName) {
	                var ctrl_1 = this.property;
	                return !!ctrl_1.valid;
	            }
	            var prop = this.property;
	            var group = this.form.control;
	            var ctrl = group.controls[prop];
	            return ctrl && ctrl.valid;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdMessages.prototype, "isTouched", {
	        get: function () {
	            if (this.property instanceof common_1.NgControlName) {
	                return this.property.touched;
	            }
	            var prop = this.property;
	            var group = this.form.control;
	            var ctrl = group.controls[prop];
	            return ctrl && ctrl.touched;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    MdMessages.prototype.ngOnInit = function () {
	        if (this.property instanceof common_1.NgControlName) {
	            var ctrl = this.property;
	            this.form = ctrl.formDirective;
	            this._unsubscribe = ctrl.update.subscribe(this._valueChanged.bind(this));
	        }
	        else {
	            if (!this.form) {
	                throw new Error('md-messages cannot bind to text property without a parent NgFormModel');
	            }
	            var prop = this.property;
	            var group = this.form.control;
	            if (!group) {
	                throw new Error('md-messages cannot bind to text property without a ControlGroup');
	            }
	            var ctrl = group.controls[prop];
	            if (!ctrl) {
	                throw new Error("md-messages cannot find property(" + prop + ") in ControlGroup!");
	            }
	            this._unsubscribe = ctrl.statusChanges.subscribe(this._valueChanged.bind(this));
	        }
	    };
	    MdMessages.prototype.ngOnDestroy = function () {
	        this._unsubscribe.unsubscribe();
	    };
	    MdMessages.prototype._valueChanged = function () {
	        var errors = null;
	        if (this.property instanceof common_1.NgControlName) {
	            var ctrl = this.property;
	            errors = ctrl.errors;
	        }
	        else {
	            var prop = this.property;
	            var group = this.form.control;
	            var ctrl = group.controls[prop];
	            errors = ctrl.errors;
	        }
	        if (errors) {
	            this.messages.toArray().forEach(function (m) {
	                m.okay = !m.errorKey ? !errors : !errors.hasOwnProperty(m.errorKey);
	            });
	        }
	        else {
	            this.messages.toArray().forEach(function (m) {
	                m.okay = true;
	            });
	        }
	    };
	    __decorate([
	        core_1.Input('md-messages'), 
	        __metadata('design:type', Object)
	    ], MdMessages.prototype, "property", void 0);
	    MdMessages = __decorate([
	        core_1.Directive({
	            selector: '[md-messages]',
	            host: {
	                'md-messages': '',
	                '[style.display]': '(valid || !isTouched) ? "none" : "inherit"',
	                '[class.md-valid]': 'valid && isTouched',
	                '[class.md-invalid]': '!valid && isTouched'
	            }
	        }),
	        __param(0, core_1.Query(MdMessage)),
	        __param(1, core_1.Optional()),
	        __param(1, core_1.SkipSelf()),
	        __param(1, core_1.Host()), 
	        __metadata('design:paramtypes', [core_1.QueryList, common_1.NgFormModel])
	    ], MdMessages);
	    return MdMessages;
	}());
	exports.MdMessages = MdMessages;
	

/***/ },
/* 427 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var common_1 = __webpack_require__(7);
	var core_1 = __webpack_require__(1);
	var util_1 = __webpack_require__(258);
	var PATTERN_VALIDATOR = new core_1.Provider(common_1.NG_VALIDATORS, {
	    useExisting: core_1.forwardRef(function () { return MdPatternValidator; }),
	    multi: true
	});
	var MdPatternValidator = (function () {
	    function MdPatternValidator() {
	    }
	    MdPatternValidator.inline = function (pattern) {
	        return function validate(control) {
	            if (control.value === '' || new RegExp(pattern).test(control.value)) {
	                return null;
	            }
	            return {
	                mdPattern: true
	            };
	        };
	    };
	    MdPatternValidator.prototype.validate = function (control) {
	        return MdPatternValidator.inline(this.mdPattern)(control);
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], MdPatternValidator.prototype, "mdPattern", void 0);
	    MdPatternValidator = __decorate([
	        core_1.Directive({
	            selector: '[mdPattern]',
	            providers: [PATTERN_VALIDATOR]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], MdPatternValidator);
	    return MdPatternValidator;
	}());
	exports.MdPatternValidator = MdPatternValidator;
	var MAXLENGTH_VALIDATOR = new core_1.Provider(common_1.NG_VALIDATORS, {
	    useExisting: core_1.forwardRef(function () { return MdMaxLengthValidator; }),
	    multi: true
	});
	var MdMaxLengthValidator = (function () {
	    function MdMaxLengthValidator() {
	    }
	    MdMaxLengthValidator.inline = function (length) {
	        return function validate(control) {
	            if (!control.value || control.value.length <= length) {
	                return null;
	            }
	            return {
	                mdMaxLength: true
	            };
	        };
	    };
	    MdMaxLengthValidator.prototype.validate = function (control) {
	        return MdMaxLengthValidator.inline(this.mdMaxLength)(control);
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], MdMaxLengthValidator.prototype, "mdMaxLength", void 0);
	    MdMaxLengthValidator = __decorate([
	        core_1.Directive({ selector: '[mdMaxLength]', providers: [MAXLENGTH_VALIDATOR] }), 
	        __metadata('design:paramtypes', [])
	    ], MdMaxLengthValidator);
	    return MdMaxLengthValidator;
	}());
	exports.MdMaxLengthValidator = MdMaxLengthValidator;
	var MAXVALUE_VALIDATOR = new core_1.Provider(common_1.NG_VALIDATORS, {
	    useExisting: core_1.forwardRef(function () { return MdMaxValueValidator; }),
	    multi: true
	});
	var MdMaxValueValidator = (function () {
	    function MdMaxValueValidator() {
	    }
	    MdMaxValueValidator.inline = function (length) {
	        return function validate(control) {
	            if (isNaN(control.value) || control.value <= length) {
	                return null;
	            }
	            return {
	                mdMax: true
	            };
	        };
	    };
	    MdMaxValueValidator.prototype.validate = function (control) {
	        return MdMaxValueValidator.inline(this.mdMax)(control);
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], MdMaxValueValidator.prototype, "mdMax", void 0);
	    MdMaxValueValidator = __decorate([
	        core_1.Directive({ selector: '[mdMax]', providers: [MAXVALUE_VALIDATOR] }), 
	        __metadata('design:paramtypes', [])
	    ], MdMaxValueValidator);
	    return MdMaxValueValidator;
	}());
	exports.MdMaxValueValidator = MdMaxValueValidator;
	var MINVALUE_VALIDATOR = new core_1.Provider(common_1.NG_VALIDATORS, {
	    useExisting: core_1.forwardRef(function () { return MdMinValueValidator; }),
	    multi: true
	});
	var MdMinValueValidator = (function () {
	    function MdMinValueValidator() {
	    }
	    MdMinValueValidator.inline = function (length) {
	        return function validate(control) {
	            if (isNaN(control.value) || control.value >= length) {
	                return null;
	            }
	            return {
	                mdMin: true
	            };
	        };
	    };
	    MdMinValueValidator.prototype.validate = function (control) {
	        return MdMinValueValidator.inline(this.mdMin)(control);
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], MdMinValueValidator.prototype, "mdMin", void 0);
	    MdMinValueValidator = __decorate([
	        core_1.Directive({ selector: '[mdMin]', providers: [MINVALUE_VALIDATOR] }), 
	        __metadata('design:paramtypes', [])
	    ], MdMinValueValidator);
	    return MdMinValueValidator;
	}());
	exports.MdMinValueValidator = MdMinValueValidator;
	var NUMBER_REQUIRED_VALIDATOR = new core_1.Provider(common_1.NG_VALIDATORS, {
	    useExisting: core_1.forwardRef(function () { return MdNumberRequiredValidator; }),
	    multi: true
	});
	var MdNumberRequiredValidator = (function () {
	    function MdNumberRequiredValidator() {
	    }
	    MdNumberRequiredValidator.inline = function () {
	        return function validate(control) {
	            var isNum = !isNaN(control.value) && util_1.isNumber(control.value);
	            return isNum ? null : { mdNumberRequired: true };
	        };
	    };
	    MdNumberRequiredValidator.prototype.validate = function (control) {
	        return MdNumberRequiredValidator.inline()(control);
	    };
	    MdNumberRequiredValidator = __decorate([
	        core_1.Directive({ selector: '[mdNumberRequired]', providers: [NUMBER_REQUIRED_VALIDATOR] }), 
	        __metadata('design:paramtypes', [])
	    ], MdNumberRequiredValidator);
	    return MdNumberRequiredValidator;
	}());
	exports.MdNumberRequiredValidator = MdNumberRequiredValidator;
	exports.INPUT_VALIDATORS = [
	    MdMaxLengthValidator,
	    MdPatternValidator,
	    MdMaxValueValidator,
	    MdMinValueValidator,
	    MdNumberRequiredValidator
	];
	

/***/ },
/* 428 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(1);
	var MdIcon = (function () {
	    function MdIcon() {
	    }
	    MdIcon = __decorate([
	        core_1.Directive({
	            selector: '[md-icon], .md-icon',
	            host: {
	                '[class.material-icons]': 'true'
	            }
	        }), 
	        __metadata('design:paramtypes', [])
	    ], MdIcon);
	    return MdIcon;
	}());
	exports.MdIcon = MdIcon;
	

/***/ },
/* 429 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(1);
	var ink_1 = __webpack_require__(160);
	var MdInk = (function () {
	    function MdInk(_element) {
	        this._element = _element;
	        this.inked = new core_1.EventEmitter(false);
	    }
	    MdInk.prototype.onMousedown = function (event) {
	        var _this = this;
	        if (this._element && ink_1.Ink.canApply(this._element.nativeElement)) {
	            ink_1.Ink.rippleEvent(this._element.nativeElement, event).then(function () {
	                _this.inked.emit(_this);
	            });
	        }
	    };
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], MdInk.prototype, "inked", void 0);
	    MdInk = __decorate([
	        core_1.Directive({
	            selector: '[md-ink]',
	            host: {
	                '(mousedown)': 'onMousedown($event)'
	            },
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef])
	    ], MdInk);
	    return MdInk;
	}());
	exports.MdInk = MdInk;
	

/***/ },
/* 430 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(1);
	var MdList = (function () {
	    function MdList() {
	    }
	    MdList = __decorate([
	        core_1.Directive({
	            selector: 'md-list',
	            host: {
	                'role': 'list'
	            }
	        }), 
	        __metadata('design:paramtypes', [])
	    ], MdList);
	    return MdList;
	}());
	exports.MdList = MdList;
	var MdListItem = (function () {
	    function MdListItem() {
	    }
	    MdListItem = __decorate([
	        core_1.Component({
	            selector: 'md-list-item',
	            host: {
	                'role': 'listitem',
	            },
	            template: "\n    <div class=\"md-no-style md-list-item-inner\">\n      <ng-content></ng-content>\n    </div>"
	        }), 
	        __metadata('design:paramtypes', [])
	    ], MdListItem);
	    return MdListItem;
	}());
	exports.MdListItem = MdListItem;
	

/***/ },
/* 431 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(1);
	var media_1 = __webpack_require__(257);
	var util_1 = __webpack_require__(258);
	var viewport_1 = __webpack_require__(113);
	var MdPeekaboo = (function () {
	    function MdPeekaboo(media, element, viewport, _app) {
	        var _this = this;
	        this.media = media;
	        this.element = element;
	        this.viewport = viewport;
	        this._app = _app;
	        this.break = 100;
	        this._active = false;
	        this._breakXs = -1;
	        this._breakSm = -1;
	        this._breakMd = -1;
	        this._breakLg = -1;
	        this._breakXl = -1;
	        this._breakpoint = null;
	        this._scroller = null;
	        this._mediaListeners = [];
	        this._windowScroll = this.evaluate.bind(this);
	        MdPeekaboo.SIZES.forEach(function (size) {
	            _this._watchMediaQuery(size);
	            if (_this.media.hasMedia(size)) {
	                _this._breakpoint = size;
	            }
	        });
	        this.evaluate();
	        this._scrollTick = util_1.debounce(function () {
	            if (!!_this._app.tick) {
	                _this._app.tick();
	            }
	        }, 100, this);
	    }
	    MdPeekaboo.MakeNumber = function (value) {
	        return typeof value === 'string' ? parseInt(value, 10) : value;
	    };
	    Object.defineProperty(MdPeekaboo.prototype, "active", {
	        get: function () {
	            return this._active;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdPeekaboo.prototype, "breakXs", {
	        get: function () {
	            return this._breakXs;
	        },
	        set: function (value) {
	            this._breakXs = MdPeekaboo.MakeNumber(value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdPeekaboo.prototype, "breakSm", {
	        get: function () {
	            return this._breakSm;
	        },
	        set: function (value) {
	            this._breakSm = MdPeekaboo.MakeNumber(value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdPeekaboo.prototype, "breakMd", {
	        get: function () {
	            return this._breakMd;
	        },
	        set: function (value) {
	            this._breakMd = MdPeekaboo.MakeNumber(value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdPeekaboo.prototype, "breakLg", {
	        get: function () {
	            return this._breakLg;
	        },
	        set: function (value) {
	            this._breakLg = MdPeekaboo.MakeNumber(value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdPeekaboo.prototype, "breakXl", {
	        get: function () {
	            return this._breakXl;
	        },
	        set: function (value) {
	            this._breakXl = MdPeekaboo.MakeNumber(value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdPeekaboo.prototype, "breakpoint", {
	        get: function () {
	            return this._breakpoint;
	        },
	        set: function (size) {
	            this._breakpoint = size;
	            this.evaluate();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdPeekaboo.prototype, "scroller", {
	        get: function () {
	            return this._scroller;
	        },
	        set: function (scroll) {
	            if (this._scroller) {
	                this._scroller.removeEventListener('scroll', this._windowScroll);
	            }
	            this._scroller = scroll;
	            if (this._scroller) {
	                this._scroller.addEventListener('scroll', this._windowScroll, true);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    MdPeekaboo.prototype.ngOnDestroy = function () {
	        this._mediaListeners.forEach(function (l) {
	            l.destroy();
	        });
	        this._mediaListeners = [];
	    };
	    MdPeekaboo.prototype._watchMediaQuery = function (size) {
	        var _this = this;
	        var l = this.media.listen(media_1.Media.getQuery(size));
	        l.onMatched.subscribe(function (mql) {
	            _this.breakpoint = size;
	        });
	        this._mediaListeners.push(l);
	    };
	    MdPeekaboo.prototype.evaluate = function () {
	        var top = this._scroller ? this._scroller.scrollTop : this.viewport.scrollTop();
	        var bp = this.break;
	        switch (this._breakpoint) {
	            case 'xl':
	                if (this._breakXl !== -1) {
	                    bp = this._breakXl;
	                    break;
	                }
	            case 'lg':
	                if (this._breakLg !== -1) {
	                    bp = this._breakLg;
	                    break;
	                }
	            case 'md':
	                if (this._breakMd !== -1) {
	                    bp = this._breakMd;
	                    break;
	                }
	            case 'sm':
	                if (this._breakSm !== -1) {
	                    bp = this._breakSm;
	                    break;
	                }
	            case 'xs':
	                if (this._breakXs !== -1) {
	                    bp = this._breakXs;
	                    break;
	                }
	        }
	        if (top >= bp && !this._active) {
	            this._active = true;
	            this._scrollTick();
	        }
	        else if (top < bp && this._active) {
	            this._active = false;
	            this._scrollTick();
	        }
	        return bp;
	    };
	    MdPeekaboo.SIZES = ['xs', 'sm', 'md', 'lg', 'xl'];
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], MdPeekaboo.prototype, "break", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], MdPeekaboo.prototype, "breakAction", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number), 
	        __metadata('design:paramtypes', [Number])
	    ], MdPeekaboo.prototype, "breakXs", null);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number), 
	        __metadata('design:paramtypes', [Number])
	    ], MdPeekaboo.prototype, "breakSm", null);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number), 
	        __metadata('design:paramtypes', [Number])
	    ], MdPeekaboo.prototype, "breakMd", null);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number), 
	        __metadata('design:paramtypes', [Number])
	    ], MdPeekaboo.prototype, "breakLg", null);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number), 
	        __metadata('design:paramtypes', [Number])
	    ], MdPeekaboo.prototype, "breakXl", null);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object), 
	        __metadata('design:paramtypes', [Object])
	    ], MdPeekaboo.prototype, "scroller", null);
	    MdPeekaboo = __decorate([
	        core_1.Directive({
	            selector: '[md-peekaboo]',
	            host: {
	                '[class.md-peekaboo-active]': 'active',
	                '[attr.breakAction]': 'breakAction',
	                '(window:scroll)': '_windowScroll($event)'
	            }
	        }), 
	        __metadata('design:paramtypes', [media_1.Media, core_1.ElementRef, viewport_1.ViewportHelper, core_1.ApplicationRef])
	    ], MdPeekaboo);
	    return MdPeekaboo;
	}());
	exports.MdPeekaboo = MdPeekaboo;
	

/***/ },
/* 432 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(1);
	var MdSubheader = (function () {
	    function MdSubheader() {
	    }
	    MdSubheader = __decorate([
	        core_1.Component({
	            selector: 'md-subheader',
	            host: {
	                'class': 'md-subheader'
	            },
	            template: "\n    <div class=\"md-subheader-inner\">\n      <span class=\"md-subheader-content\"><ng-content></ng-content></span>\n    </div>"
	        }), 
	        __metadata('design:paramtypes', [])
	    ], MdSubheader);
	    return MdSubheader;
	}());
	exports.MdSubheader = MdSubheader;
	

/***/ },
/* 433 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(1);
	var key_codes_1 = __webpack_require__(435);
	var util_1 = __webpack_require__(258);
	var MdSwitch = (function () {
	    function MdSwitch() {
	        this.checkedChange = new core_1.EventEmitter(false);
	        this.checked = false;
	        this.disabled_ = false;
	    }
	    Object.defineProperty(MdSwitch.prototype, "tabindex", {
	        get: function () {
	            return this._tabindex;
	        },
	        set: function (value) {
	            this._tabindex = util_1.parseTabIndexAttribute(value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdSwitch.prototype, "disabled", {
	        get: function () {
	            return this.disabled_;
	        },
	        set: function (value) {
	            this.disabled_ = typeof value !== 'undefined' && value !== false;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    MdSwitch.prototype.onKeydown = function (event) {
	        if (event.keyCode === key_codes_1.KeyCodes.SPACE) {
	            event.preventDefault();
	            this.toggle(event);
	        }
	    };
	    MdSwitch.prototype.toggle = function (event) {
	        if (this.disabled) {
	            event.stopPropagation();
	            return;
	        }
	        this.checked = !this.checked;
	        this.checkedChange.emit(this.checked);
	    };
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], MdSwitch.prototype, "checkedChange", void 0);
	    __decorate([
	        core_1.Input(),
	        core_1.HostBinding('attr.aria-checked'), 
	        __metadata('design:type', Boolean)
	    ], MdSwitch.prototype, "checked", void 0);
	    __decorate([
	        core_1.Input('disabled'),
	        core_1.HostBinding('attr.aria-disabled'), 
	        __metadata('design:type', Boolean)
	    ], MdSwitch.prototype, "disabled_", void 0);
	    __decorate([
	        core_1.Input('tabindex'), 
	        __metadata('design:type', Number)
	    ], MdSwitch.prototype, "_tabindex", void 0);
	    __decorate([
	        core_1.HostListener('keydown', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [KeyboardEvent]), 
	        __metadata('design:returntype', void 0)
	    ], MdSwitch.prototype, "onKeydown", null);
	    __decorate([
	        core_1.HostListener('click', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [Object]), 
	        __metadata('design:returntype', void 0)
	    ], MdSwitch.prototype, "toggle", null);
	    MdSwitch = __decorate([
	        core_1.Component({
	            selector: 'md-switch',
	            inputs: ['checked', 'disabled'],
	            host: {
	                'role': 'checkbox'
	            },
	            template: "\n    <div class=\"md-switch-container\">\n      <div class=\"md-switch-bar\"></div>\n      <div class=\"md-switch-thumb-container\">\n        <div class=\"md-switch-thumb\"></div>\n      </div>\n    </div>\n    <div class=\"md-switch-label\">\n      <ng-content></ng-content>\n    </div>",
	            directives: []
	        }), 
	        __metadata('design:paramtypes', [])
	    ], MdSwitch);
	    return MdSwitch;
	}());
	exports.MdSwitch = MdSwitch;
	

/***/ },
/* 434 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(1);
	var ink_1 = __webpack_require__(160);
	var common_1 = __webpack_require__(7);
	var MdTab = (function () {
	    function MdTab(viewContainer, templateRef) {
	        this.viewContainer = viewContainer;
	        this.templateRef = templateRef;
	        this.disabled = false;
	        this._active = false;
	    }
	    Object.defineProperty(MdTab.prototype, "active", {
	        get: function () {
	            return this._active;
	        },
	        set: function (active) {
	            if (active == this._active) {
	                return;
	            }
	            this._active = active;
	            if (active) {
	                this.viewContainer.createEmbeddedView(this.templateRef);
	            }
	            else {
	                this.viewContainer.remove(0);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], MdTab.prototype, "label", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], MdTab.prototype, "disabled", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean), 
	        __metadata('design:paramtypes', [Boolean])
	    ], MdTab.prototype, "active", null);
	    MdTab = __decorate([
	        core_1.Directive({
	            selector: '[md-tab]'
	        }), 
	        __metadata('design:paramtypes', [core_1.ViewContainerRef, core_1.TemplateRef])
	    ], MdTab);
	    return MdTab;
	}());
	exports.MdTab = MdTab;
	var MdTabs = (function () {
	    function MdTabs(panes, _element) {
	        var _this = this;
	        this.panes = panes;
	        this._element = _element;
	        this.mdNoScroll = false;
	        this._selected = 0;
	        this.panes.changes.subscribe(function (_) {
	            _this.panes.toArray().forEach(function (p, index) {
	                p.active = index === _this._selected;
	            });
	        });
	    }
	    Object.defineProperty(MdTabs.prototype, "selected", {
	        get: function () {
	            return this._selected;
	        },
	        set: function (index) {
	            var panes = this.panes.toArray();
	            var pane = null;
	            if (index >= 0 && index < panes.length) {
	                pane = panes[index];
	            }
	            this.selectedTab = pane;
	            this._selected = index;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MdTabs.prototype, "selectedTab", {
	        get: function () {
	            var result = null;
	            this.panes.toArray().forEach(function (p) {
	                if (p.active) {
	                    result = p;
	                }
	            });
	            return result;
	        },
	        set: function (value) {
	            var _this = this;
	            this.panes.toArray().forEach(function (p, index) {
	                p.active = p == value;
	                if (p.active) {
	                    _this._selected = index;
	                }
	            });
	        },
	        enumerable: true,
	        configurable: true
	    });
	    MdTabs.prototype.onTabClick = function (pane, event) {
	        if (event && ink_1.Ink.canApply(this._element.nativeElement)) {
	            ink_1.Ink.rippleEvent(event.target, event);
	        }
	        this.selectedTab = pane;
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], MdTabs.prototype, "mdNoScroll", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], MdTabs.prototype, "selected", null);
	    MdTabs = __decorate([
	        core_1.Component({
	            selector: 'md-tabs',
	            template: "\n    <md-tabs-wrapper>\n      <md-tab-data></md-tab-data>\n      <md-tabs-canvas role=\"tablist\">\n        <md-pagination-wrapper>\n          <template ngFor [ngForOf]=\"panes\" let-pane=\"$implicit\" let-index=\"i\">\n          <md-tab-item tabindex=\"-1\"\n                       class=\"md-tab\"\n                       (click)=\"onTabClick(pane,$event)\"\n                       [class.md-active]=\"selectedTab == pane\"\n                       [disabled]=\"pane.disabled\"\n                       [style.max-width]=\"maxTabWidth + 'px'\"\n                       role=\"tab\">\n            {{pane.label}}\n          </md-tab-item>\n          </template>\n          <md-ink-bar></md-ink-bar>\n        </md-pagination-wrapper>\n      </md-tabs-canvas>\n    </md-tabs-wrapper>\n    <md-tabs-content-wrapper>\n      <md-tab-content role=\"tabpanel\" class=\"md-active\"\n                      [class.md-no-scroll]=\"mdNoScroll\">\n        <ng-content></ng-content>\n      </md-tab-content>\n    </md-tabs-content-wrapper>",
	            directives: [common_1.NgFor],
	            properties: ['selected'],
	            encapsulation: core_1.ViewEncapsulation.None
	        }),
	        __param(0, core_1.Query(MdTab)), 
	        __metadata('design:paramtypes', [core_1.QueryList, core_1.ElementRef])
	    ], MdTabs);
	    return MdTabs;
	}());
	exports.MdTabs = MdTabs;
	

/***/ },
/* 435 */
/***/ function(module, exports) {

	"use strict";
	(function (KeyCodes) {
	    KeyCodes[KeyCodes["ESCAPE"] = 27] = "ESCAPE";
	    KeyCodes[KeyCodes["SPACE"] = 32] = "SPACE";
	    KeyCodes[KeyCodes["UP"] = 38] = "UP";
	    KeyCodes[KeyCodes["DOWN"] = 40] = "DOWN";
	})(exports.KeyCodes || (exports.KeyCodes = {}));
	var KeyCodes = exports.KeyCodes;
	

/***/ },
/* 436 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var select_1 = __webpack_require__(438);
	exports.SELECT_DIRECTIVES = [select_1.SelectComponent];


/***/ },
/* 437 */
/***/ function(module, exports) {

	"use strict";
	function escapeRegexp(queryToEscape) {
	    return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
	}
	exports.escapeRegexp = escapeRegexp;


/***/ },
/* 438 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(1);
	var select_item_1 = __webpack_require__(839);
	var select_pipes_1 = __webpack_require__(840);
	var common_1 = __webpack_require__(437);
	var off_click_1 = __webpack_require__(838);
	var optionsTemplate = "\n    <ul *ngIf=\"optionsOpened && options && options.length > 0 && !firstItemHasChildren\"\n        class=\"ui-select-choices ui-select-choices-content ui-select-dropdown dropdown-menu\">\n      <li class=\"ui-select-choices-group\">\n        <div *ngFor=\"let o of options\"\n             class=\"ui-select-choices-row\"\n             [class.active]=\"isActive(o)\"\n             (mouseenter)=\"selectActive(o)\"\n             (click)=\"selectMatch(o, $event)\">\n          <a href=\"javascript:void(0)\" class=\"ui-select-choices-row-inner\">\n            <div [innerHtml]=\"o.text | highlight:inputValue\"></div>\n          </a>\n        </div>\n      </li>\n    </ul>\n\n    <ul *ngIf=\"optionsOpened && options && options.length > 0 && firstItemHasChildren\"\n        class=\"ui-select-choices ui-select-choices-content ui-select-dropdown dropdown-menu\">\n      <li *ngFor=\"let c of options; let index=index\" class=\"ui-select-choices-group\">\n        <div class=\"divider\" *ngIf=\"index > 0\"></div>\n        <div class=\"ui-select-choices-group-label dropdown-header\">{{c.text}}</div>\n\n        <div *ngFor=\"let o of c.children\"\n             class=\"ui-select-choices-row\"\n             [class.active]=\"isActive(o)\"\n             (mouseenter)=\"selectActive(o)\"\n             (click)=\"selectMatch(o, $event)\"\n             [ngClass]=\"{'active': isActive(o)}\">\n          <a href=\"javascript:void(0)\" class=\"ui-select-choices-row-inner\">\n            <div [innerHtml]=\"o.text | highlight:inputValue\"></div>\n          </a>\n        </div>\n      </li>\n    </ul>\n";
	var SelectComponent = (function () {
	    function SelectComponent(element) {
	        this.allowClear = false;
	        this.placeholder = '';
	        this.initData = [];
	        this.multiple = false;
	        this.data = new core_1.EventEmitter();
	        this.selected = new core_1.EventEmitter();
	        this.removed = new core_1.EventEmitter();
	        this.typed = new core_1.EventEmitter();
	        this.options = [];
	        this.itemObjects = [];
	        this.active = [];
	        this.inputMode = false;
	        this.optionsOpened = false;
	        this.inputValue = '';
	        this._items = [];
	        this._disabled = false;
	        this.element = element;
	        this.clickedOutside = this.clickedOutside.bind(this);
	    }
	    Object.defineProperty(SelectComponent.prototype, "items", {
	        set: function (value) {
	            this._items = value;
	            this.itemObjects = this._items.map(function (item) { return new select_item_1.SelectItem(item); });
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SelectComponent.prototype, "disabled", {
	        set: function (value) {
	            this._disabled = value;
	            if (this._disabled === true) {
	                this.hideOptions();
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SelectComponent.prototype.inputEvent = function (e, isUpMode) {
	        if (isUpMode === void 0) { isUpMode = false; }
	        // tab
	        if (e.keyCode === 9) {
	            return;
	        }
	        if (isUpMode && (e.keyCode === 37 || e.keyCode === 39 || e.keyCode === 38 ||
	            e.keyCode === 40 || e.keyCode === 13)) {
	            e.preventDefault();
	            return;
	        }
	        // backspace
	        if (!isUpMode && e.keyCode === 8) {
	            var el = this.element.nativeElement
	                .querySelector('div.ui-select-container > input');
	            if (!el.value || el.value.length <= 0) {
	                if (this.active.length > 0) {
	                    this.remove(this.active[this.active.length - 1]);
	                }
	                e.preventDefault();
	            }
	        }
	        // esc
	        if (!isUpMode && e.keyCode === 27) {
	            this.hideOptions();
	            this.element.nativeElement.children[0].focus();
	            e.preventDefault();
	            return;
	        }
	        // del
	        if (!isUpMode && e.keyCode === 46) {
	            if (this.active.length > 0) {
	                this.remove(this.active[this.active.length - 1]);
	            }
	            e.preventDefault();
	        }
	        // left
	        if (!isUpMode && e.keyCode === 37 && this._items.length > 0) {
	            this.behavior.first();
	            e.preventDefault();
	            return;
	        }
	        // right
	        if (!isUpMode && e.keyCode === 39 && this._items.length > 0) {
	            this.behavior.last();
	            e.preventDefault();
	            return;
	        }
	        // up
	        if (!isUpMode && e.keyCode === 38) {
	            this.behavior.prev();
	            e.preventDefault();
	            return;
	        }
	        // down
	        if (!isUpMode && e.keyCode === 40) {
	            this.behavior.next();
	            e.preventDefault();
	            return;
	        }
	        // enter
	        if (!isUpMode && e.keyCode === 13) {
	            if (this.active.indexOf(this.activeOption) === -1) {
	                this.selectActiveMatch();
	                this.behavior.next();
	            }
	            e.preventDefault();
	            return;
	        }
	        if (e.srcElement) {
	            this.inputValue = e.srcElement.value;
	            this.behavior.filter(new RegExp(common_1.escapeRegexp(this.inputValue), 'ig'));
	            this.doEvent('typed', this.inputValue);
	        }
	    };
	    SelectComponent.prototype.ngOnInit = function () {
	        this.behavior = (this.firstItemHasChildren) ?
	            new ChildrenBehavior(this) : new GenericBehavior(this);
	        if (this.initData) {
	            this.active = this.initData.map(function (data) { return new select_item_1.SelectItem(data); });
	            this.data.emit(this.active);
	        }
	    };
	    SelectComponent.prototype.remove = function (item) {
	        if (this._disabled === true) {
	            return;
	        }
	        if (this.multiple === true && this.active) {
	            var index = this.active.indexOf(item);
	            this.active.splice(index, 1);
	            this.data.next(this.active);
	            this.doEvent('removed', item);
	        }
	        if (this.multiple === false) {
	            this.active = [];
	            this.data.next(this.active);
	            this.doEvent('removed', item);
	        }
	    };
	    SelectComponent.prototype.doEvent = function (type, value) {
	        if (this[type] && value) {
	            this[type].next(value);
	        }
	    };
	    SelectComponent.prototype.clickedOutside = function () {
	        this.inputMode = false;
	        this.optionsOpened = false;
	    };
	    Object.defineProperty(SelectComponent.prototype, "firstItemHasChildren", {
	        get: function () {
	            return this.itemObjects[0] && this.itemObjects[0].hasChildren();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SelectComponent.prototype.matchClick = function (e) {
	        if (this._disabled === true) {
	            return;
	        }
	        this.inputMode = !this.inputMode;
	        if (this.inputMode === true && ((this.multiple === true && e) || this.multiple === false)) {
	            this.focusToInput();
	            this.open();
	        }
	    };
	    SelectComponent.prototype.mainClick = function (event) {
	        if (this.inputMode === true || this._disabled === true) {
	            return;
	        }
	        if (event.keyCode === 46) {
	            event.preventDefault();
	            this.inputEvent(event);
	            return;
	        }
	        if (event.keyCode === 8) {
	            event.preventDefault();
	            this.inputEvent(event, true);
	            return;
	        }
	        if (event.keyCode === 9 || event.keyCode === 13 ||
	            event.keyCode === 27 || (event.keyCode >= 37 && event.keyCode <= 40)) {
	            event.preventDefault();
	            return;
	        }
	        this.inputMode = true;
	        var value = String
	            .fromCharCode(96 <= event.keyCode && event.keyCode <= 105 ? event.keyCode - 48 : event.keyCode)
	            .toLowerCase();
	        this.focusToInput(value);
	        this.open();
	        event.srcElement.value = value;
	        this.inputEvent(event);
	    };
	    SelectComponent.prototype.selectActive = function (value) {
	        this.activeOption = value;
	    };
	    SelectComponent.prototype.isActive = function (value) {
	        return this.activeOption.text === value.text;
	    };
	    SelectComponent.prototype.focusToInput = function (value) {
	        var _this = this;
	        if (value === void 0) { value = ''; }
	        setTimeout(function () {
	            var el = _this.element.nativeElement.querySelector('div.ui-select-container > input');
	            if (el) {
	                el.focus();
	                el.value = value;
	            }
	        }, 0);
	    };
	    SelectComponent.prototype.open = function () {
	        var _this = this;
	        this.options = this.itemObjects
	            .filter(function (option) { return (_this.multiple === false ||
	            _this.multiple === true &&
	                !_this.active.find(function (o) { return option.text === o.text; })); });
	        if (this.options.length > 0) {
	            this.behavior.first();
	        }
	        this.optionsOpened = true;
	    };
	    SelectComponent.prototype.hideOptions = function () {
	        this.inputMode = false;
	        this.optionsOpened = false;
	    };
	    SelectComponent.prototype.selectActiveMatch = function () {
	        this.selectMatch(this.activeOption);
	    };
	    SelectComponent.prototype.selectMatch = function (value, e) {
	        if (e === void 0) { e = void 0; }
	        if (e) {
	            e.stopPropagation();
	            e.preventDefault();
	        }
	        if (this.options.length <= 0) {
	            return;
	        }
	        if (this.multiple === true) {
	            this.active.push(value);
	            this.data.next(this.active);
	        }
	        if (this.multiple === false) {
	            this.active[0] = value;
	            this.data.next(this.active[0]);
	        }
	        this.doEvent('selected', value);
	        this.hideOptions();
	        if (this.multiple === true) {
	            this.focusToInput('');
	        }
	        else {
	            this.focusToInput(select_pipes_1.stripTags(value.text));
	            this.element.nativeElement.querySelector('.ui-select-container').focus();
	        }
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], SelectComponent.prototype, "allowClear", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], SelectComponent.prototype, "placeholder", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Array)
	    ], SelectComponent.prototype, "initData", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], SelectComponent.prototype, "multiple", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Array), 
	        __metadata('design:paramtypes', [Array])
	    ], SelectComponent.prototype, "items", null);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean), 
	        __metadata('design:paramtypes', [Boolean])
	    ], SelectComponent.prototype, "disabled", null);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], SelectComponent.prototype, "data", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], SelectComponent.prototype, "selected", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], SelectComponent.prototype, "removed", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], SelectComponent.prototype, "typed", void 0);
	    SelectComponent = __decorate([
	        core_1.Component({
	            selector: 'ng-select',
	            directives: [off_click_1.OffClickDirective],
	            pipes: [select_pipes_1.HighlightPipe],
	            template: "\n  <div tabindex=\"0\"\n     *ngIf=\"multiple === false\"\n     (keyup)=\"mainClick($event)\"\n     [offClick]=\"clickedOutside\"\n     class=\"ui-select-container ui-select-bootstrap dropdown open\">\n    <div [ngClass]=\"{'ui-disabled': disabled}\"></div>\n    <div class=\"ui-select-match\"\n         *ngIf=\"!inputMode\">\n      <span tabindex=\"-1\"\n          class=\"btn btn-default btn-secondary form-control ui-select-toggle\"\n          (click)=\"matchClick($event)\"\n          style=\"outline: 0;\">\n        <span *ngIf=\"active.length <= 0\" class=\"ui-select-placeholder text-muted\">{{placeholder}}</span>\n        <span *ngIf=\"active.length > 0\" class=\"ui-select-match-text pull-left\"\n              [ngClass]=\"{'ui-select-allow-clear': allowClear && active.length > 0}\"\n              [innerHTML]=\"active[0].text\"></span>\n        <i class=\"dropdown-toggle pull-right\"></i>\n        <i class=\"caret pull-right\"></i>\n        <a *ngIf=\"allowClear && active.length>0\" style=\"margin-right: 10px; padding: 0;\"\n          (click)=\"remove(activeOption)\" class=\"btn btn-xs btn-link pull-right\">\n          <i class=\"glyphicon glyphicon-remove\"></i>\n        </a>\n      </span>\n    </div>\n    <input type=\"text\" autocomplete=\"false\" tabindex=\"-1\"\n           (keydown)=\"inputEvent($event)\"\n           (keyup)=\"inputEvent($event, true)\"\n           [disabled]=\"disabled\"\n           class=\"form-control ui-select-search\"\n           *ngIf=\"inputMode\"\n           placeholder=\"{{active.length <= 0 ? placeholder : ''}}\">\n      " + optionsTemplate + "\n  </div>\n\n  <div tabindex=\"0\"\n     *ngIf=\"multiple === true\"\n     (keyup)=\"mainClick($event)\"\n     (focus)=\"focusToInput('')\"\n     class=\"ui-select-container ui-select-multiple ui-select-bootstrap dropdown form-control open\">\n    <div [ngClass]=\"{'ui-disabled': disabled}\"></div>\n    <span class=\"ui-select-match\">\n        <span *ngFor=\"let a of active\">\n            <span class=\"ui-select-match-item btn btn-default btn-secondary btn-xs\"\n                  tabindex=\"-1\"\n                  type=\"button\"\n                  [ngClass]=\"{'btn-default': true}\">\n               <a class=\"close ui-select-match-close\"\n                  (click)=\"remove(a)\">&nbsp;&times;</a>\n               <span>{{a.text}}</span>\n           </span>\n        </span>\n    </span>\n    <input type=\"text\"\n           (keydown)=\"inputEvent($event)\"\n           (keyup)=\"inputEvent($event, true)\"\n           (click)=\"matchClick($event)\"\n           [disabled]=\"disabled\"\n           autocomplete=\"false\"\n           autocorrect=\"off\"\n           autocapitalize=\"off\"\n           spellcheck=\"false\"\n           class=\"ui-select-search input-xs\"\n           placeholder=\"{{active.length <= 0 ? placeholder : ''}}\"\n           role=\"combobox\">\n    " + optionsTemplate + "\n  </div>\n  "
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef])
	    ], SelectComponent);
	    return SelectComponent;
	}());
	exports.SelectComponent = SelectComponent;
	var Behavior = (function () {
	    function Behavior(actor) {
	        this.optionsMap = new Map();
	        this.actor = actor;
	    }
	    Behavior.prototype.fillOptionsMap = function () {
	        var _this = this;
	        this.optionsMap.clear();
	        var startPos = 0;
	        this.actor.itemObjects
	            .map(function (item) {
	            startPos = item.fillChildrenHash(_this.optionsMap, startPos);
	        });
	    };
	    Behavior.prototype.ensureHighlightVisible = function (optionsMap) {
	        if (optionsMap === void 0) { optionsMap = void 0; }
	        var container = this.actor.element.nativeElement.querySelector('.ui-select-choices-content');
	        if (!container) {
	            return;
	        }
	        var choices = container.querySelectorAll('.ui-select-choices-row');
	        if (choices.length < 1) {
	            return;
	        }
	        var activeIndex = this.getActiveIndex(optionsMap);
	        if (activeIndex < 0) {
	            return;
	        }
	        var highlighted = choices[activeIndex];
	        if (!highlighted) {
	            return;
	        }
	        var posY = highlighted.offsetTop + highlighted.clientHeight - container.scrollTop;
	        var height = container.offsetHeight;
	        if (posY > height) {
	            container.scrollTop += posY - height;
	        }
	        else if (posY < highlighted.clientHeight) {
	            container.scrollTop -= highlighted.clientHeight - posY;
	        }
	    };
	    Behavior.prototype.getActiveIndex = function (optionsMap) {
	        if (optionsMap === void 0) { optionsMap = void 0; }
	        var ai = this.actor.options.indexOf(this.actor.activeOption);
	        if (ai < 0 && optionsMap !== void 0) {
	            ai = optionsMap.get(this.actor.activeOption.id);
	        }
	        return ai;
	    };
	    return Behavior;
	}());
	exports.Behavior = Behavior;
	var GenericBehavior = (function (_super) {
	    __extends(GenericBehavior, _super);
	    function GenericBehavior(actor) {
	        _super.call(this, actor);
	    }
	    GenericBehavior.prototype.first = function () {
	        this.actor.activeOption = this.actor.options[0];
	        _super.prototype.ensureHighlightVisible.call(this);
	    };
	    GenericBehavior.prototype.last = function () {
	        this.actor.activeOption = this.actor.options[this.actor.options.length - 1];
	        _super.prototype.ensureHighlightVisible.call(this);
	    };
	    GenericBehavior.prototype.prev = function () {
	        var index = this.actor.options.indexOf(this.actor.activeOption);
	        this.actor.activeOption = this.actor
	            .options[index - 1 < 0 ? this.actor.options.length - 1 : index - 1];
	        _super.prototype.ensureHighlightVisible.call(this);
	    };
	    GenericBehavior.prototype.next = function () {
	        var index = this.actor.options.indexOf(this.actor.activeOption);
	        this.actor.activeOption = this.actor
	            .options[index + 1 > this.actor.options.length - 1 ? 0 : index + 1];
	        _super.prototype.ensureHighlightVisible.call(this);
	    };
	    GenericBehavior.prototype.filter = function (query) {
	        var _this = this;
	        var options = this.actor.itemObjects
	            .filter(function (option) {
	            return select_pipes_1.stripTags(option.text).match(query) &&
	                (_this.actor.multiple === false ||
	                    (_this.actor.multiple === true && _this.actor.active.indexOf(option) < 0));
	        });
	        this.actor.options = options;
	        if (this.actor.options.length > 0) {
	            this.actor.activeOption = this.actor.options[0];
	            _super.prototype.ensureHighlightVisible.call(this);
	        }
	    };
	    return GenericBehavior;
	}(Behavior));
	exports.GenericBehavior = GenericBehavior;
	var ChildrenBehavior = (function (_super) {
	    __extends(ChildrenBehavior, _super);
	    function ChildrenBehavior(actor) {
	        _super.call(this, actor);
	    }
	    ChildrenBehavior.prototype.first = function () {
	        this.actor.activeOption = this.actor.options[0].children[0];
	        this.fillOptionsMap();
	        this.ensureHighlightVisible(this.optionsMap);
	    };
	    ChildrenBehavior.prototype.last = function () {
	        this.actor.activeOption =
	            this.actor
	                .options[this.actor.options.length - 1]
	                .children[this.actor.options[this.actor.options.length - 1].children.length - 1];
	        this.fillOptionsMap();
	        this.ensureHighlightVisible(this.optionsMap);
	    };
	    ChildrenBehavior.prototype.prev = function () {
	        var _this = this;
	        var indexParent = this.actor.options
	            .findIndex(function (option) { return _this.actor.activeOption.parent && _this.actor.activeOption.parent.id === option.id; });
	        var index = this.actor.options[indexParent].children
	            .findIndex(function (option) { return _this.actor.activeOption && _this.actor.activeOption.id === option.id; });
	        this.actor.activeOption = this.actor.options[indexParent].children[index - 1];
	        if (!this.actor.activeOption) {
	            if (this.actor.options[indexParent - 1]) {
	                this.actor.activeOption = this.actor
	                    .options[indexParent - 1]
	                    .children[this.actor.options[indexParent - 1].children.length - 1];
	            }
	        }
	        if (!this.actor.activeOption) {
	            this.last();
	        }
	        this.fillOptionsMap();
	        this.ensureHighlightVisible(this.optionsMap);
	    };
	    ChildrenBehavior.prototype.next = function () {
	        var _this = this;
	        var indexParent = this.actor.options
	            .findIndex(function (option) { return _this.actor.activeOption.parent && _this.actor.activeOption.parent.id === option.id; });
	        var index = this.actor.options[indexParent].children
	            .findIndex(function (option) { return _this.actor.activeOption && _this.actor.activeOption.id === option.id; });
	        this.actor.activeOption = this.actor.options[indexParent].children[index + 1];
	        if (!this.actor.activeOption) {
	            if (this.actor.options[indexParent + 1]) {
	                this.actor.activeOption = this.actor.options[indexParent + 1].children[0];
	            }
	        }
	        if (!this.actor.activeOption) {
	            this.first();
	        }
	        this.fillOptionsMap();
	        this.ensureHighlightVisible(this.optionsMap);
	    };
	    ChildrenBehavior.prototype.filter = function (query) {
	        var options = [];
	        var optionsMap = new Map();
	        var startPos = 0;
	        for (var _i = 0, _a = this.actor.itemObjects; _i < _a.length; _i++) {
	            var si = _a[_i];
	            var children = si.children.filter(function (option) { return query.test(option.text); });
	            startPos = si.fillChildrenHash(optionsMap, startPos);
	            if (children.length > 0) {
	                var newSi = si.getSimilar();
	                newSi.children = children;
	                options.push(newSi);
	            }
	        }
	        this.actor.options = options;
	        if (this.actor.options.length > 0) {
	            this.actor.activeOption = this.actor.options[0].children[0];
	            _super.prototype.ensureHighlightVisible.call(this, optionsMap);
	        }
	    };
	    return ChildrenBehavior;
	}(Behavior));
	exports.ChildrenBehavior = ChildrenBehavior;


/***/ },
/* 439 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', { value: true });

	var _angular_core = __webpack_require__(1);
	var _angular_http = __webpack_require__(21);
	var rxjs_Observable = __webpack_require__(8);
	var rxjs_add_operator_do = __webpack_require__(626);
	var rxjs_add_observable_interval = __webpack_require__(623);
	var rxjs_add_observable_fromEvent = __webpack_require__(622);
	var rxjs_add_operator_concatMap = __webpack_require__(624);
	var rxjs_add_operator_take = __webpack_require__(631);
	var rxjs_add_operator_takeWhile = __webpack_require__(632);

	function __extends(d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	}

	function __decorate(decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	}

	function __metadata(k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	}

	var Config = (function () {
	    function Config(config) {
	        var _this = this;
	        this.withCredentials = false;
	        this.tokenRoot = null;
	        this.cordova = false;
	        this.baseUrl = '/';
	        this.loginUrl = '/auth/login';
	        this.signupUrl = '/auth/signup';
	        this.unlinkUrl = '/auth/unlink/';
	        this.tokenName = 'token';
	        this.tokenSeparator = '_';
	        this.tokenPrefix = 'ng2-ui-auth';
	        this.authHeader = 'Authorization';
	        this.authToken = 'Bearer';
	        this.storageType = 'localStorage';
	        this.defaultHeaders = null;
	        this.providers = {
	            facebook: {
	                name: 'facebook',
	                url: '/auth/facebook',
	                authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
	                redirectUri: window.location.origin + '/',
	                requiredUrlParams: ['display', 'scope'],
	                scope: ['email'],
	                scopeDelimiter: ',',
	                display: 'popup',
	                type: '2.0',
	                popupOptions: { width: 580, height: 400 }
	            },
	            google: {
	                name: 'google',
	                url: '/auth/google',
	                authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
	                redirectUri: window.location.origin,
	                requiredUrlParams: ['scope'],
	                optionalUrlParams: ['display'],
	                scope: ['profile', 'email'],
	                scopePrefix: 'openid',
	                scopeDelimiter: ' ',
	                display: 'popup',
	                type: '2.0',
	                popupOptions: { width: 452, height: 633 }
	            },
	            github: {
	                name: 'github',
	                url: '/auth/github',
	                authorizationEndpoint: 'https://github.com/login/oauth/authorize',
	                redirectUri: window.location.origin,
	                optionalUrlParams: ['scope'],
	                scope: ['user:email'],
	                scopeDelimiter: ' ',
	                type: '2.0',
	                popupOptions: { width: 1020, height: 618 }
	            },
	            instagram: {
	                name: 'instagram',
	                url: '/auth/instagram',
	                authorizationEndpoint: 'https://api.instagram.com/oauth/authorize',
	                redirectUri: window.location.origin,
	                requiredUrlParams: ['scope'],
	                scope: ['basic'],
	                scopeDelimiter: '+',
	                type: '2.0'
	            },
	            linkedin: {
	                name: 'linkedin',
	                url: '/auth/linkedin',
	                authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
	                redirectUri: window.location.origin,
	                requiredUrlParams: ['state'],
	                scope: ['r_emailaddress'],
	                scopeDelimiter: ' ',
	                state: 'STATE',
	                type: '2.0',
	                popupOptions: { width: 527, height: 582 }
	            },
	            twitter: {
	                name: 'twitter',
	                url: '/auth/twitter',
	                authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
	                redirectUri: window.location.origin,
	                type: '1.0',
	                popupOptions: { width: 495, height: 645 }
	            },
	            twitch: {
	                name: 'twitch',
	                url: '/auth/twitch',
	                authorizationEndpoint: 'https://api.twitch.tv/kraken/oauth2/authorize',
	                redirectUri: window.location.origin,
	                requiredUrlParams: ['scope'],
	                scope: ['user_read'],
	                scopeDelimiter: ' ',
	                display: 'popup',
	                type: '2.0',
	                popupOptions: { width: 500, height: 560 }
	            },
	            live: {
	                name: 'live',
	                url: '/auth/live',
	                authorizationEndpoint: 'https://login.live.com/oauth20_authorize.srf',
	                redirectUri: window.location.origin,
	                requiredUrlParams: ['display', 'scope'],
	                scope: ['wl.emails'],
	                scopeDelimiter: ' ',
	                display: 'popup',
	                type: '2.0',
	                popupOptions: { width: 500, height: 560 }
	            },
	            yahoo: {
	                name: 'yahoo',
	                url: '/auth/yahoo',
	                authorizationEndpoint: 'https://api.login.yahoo.com/oauth2/request_auth',
	                redirectUri: window.location.origin,
	                scope: [],
	                scopeDelimiter: ',',
	                type: '2.0',
	                popupOptions: { width: 559, height: 519 }
	            },
	            bitbucket: {
	                name: 'bitbucket',
	                url: '/auth/bitbucket',
	                authorizationEndpoint: 'https://bitbucket.org/site/oauth2/authorize',
	                redirectUri: window.location.origin + '/',
	                requiredUrlParams: ['scope'],
	                scope: ['email'],
	                scopeDelimiter: ',',
	                type: '2.0',
	                popupOptions: { width: 1028, height: 529 }
	            }
	        };
	        Object.keys(config).forEach(function (key) {
	            if (key !== 'providers') {
	                _this[key] = config[key];
	            }
	            else {
	                Object.keys(config[key]).forEach(function (provider) {
	                    if (typeof _this.providers[provider] === 'undefined') {
	                        _this.providers[provider] = config.providers[provider];
	                    }
	                    else {
	                        Object.keys(config.providers[provider]).forEach(function (prop) {
	                            _this.providers[provider][prop] = config.providers[provider][prop];
	                        });
	                    }
	                });
	            }
	        });
	    }
	    Config = __decorate([
	        _angular_core.Injectable(), 
	        __metadata('design:paramtypes', [Object])
	    ], Config);
	    return Config;
	}());

	var Storage = (function () {
	    function Storage(config) {
	        var _this = this;
	        this.config = config;
	        this.store = {};
	        this.isStorageAvailable = (function () {
	            try {
	                var supported = config.storageType in window && window[config.storageType] !== null;
	                if (supported) {
	                    var key = Math.random().toString(36).substring(7);
	                    window[_this.config.storageType].setItem(key, '');
	                    window[_this.config.storageType].removeItem(key);
	                }
	                return supported;
	            }
	            catch (e) {
	                return false;
	            }
	        })();
	        if (!this.isStorageAvailable) {
	            console.warn(config.storageType + ' is not available.');
	        }
	    }
	    Storage.prototype.get = function (key) {
	        return this.isStorageAvailable ? window[this.config.storageType].getItem(key) : this.store[key];
	    };
	    Storage.prototype.set = function (key, value) {
	        return this.isStorageAvailable ? window[this.config.storageType].setItem(key, value) : this.store[key] = value;
	    };
	    Storage.prototype.remove = function (key) {
	        return this.isStorageAvailable ? window[this.config.storageType].removeItem(key) : delete this.store[key];
	    };
	    Storage = __decorate([
	        _angular_core.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof Config !== 'undefined' && Config) === 'function' && _a) || Object])
	    ], Storage);
	    return Storage;
	    var _a;
	}());

	var Shared = (function () {
	    function Shared(storage, config) {
	        this.storage = storage;
	        this.config = config;
	        this.tokenName = this.config.tokenPrefix ? [this.config.tokenPrefix, this.config.tokenName].join(this.config.tokenSeparator) : this.config.tokenName;
	    }
	    Shared.prototype.getToken = function () {
	        return this.storage.get(this.tokenName);
	    };
	    Shared.prototype.getPayload = function () {
	        var token = this.getToken();
	        if (token && token.split('.').length === 3) {
	            try {
	                var base64Url = token.split('.')[1];
	                var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	                return JSON.parse(decodeURIComponent(encodeURIComponent(window.atob(base64))));
	            }
	            catch (e) {
	                return undefined;
	            }
	        }
	    };
	    Shared.prototype.setToken = function (response) {
	        if (!response) {
	            console.warn('Can\'t set token without passing a value');
	            return;
	        }
	        var token;
	        if (typeof response === 'string') {
	            token = response;
	        }
	        else {
	            var accessToken = response && response.json() && (response.json().access_token || response.json().token);
	            var tokenObject = void 0;
	            if (accessToken) {
	                if (typeof accessToken === 'object' && typeof accessToken.data === 'object') {
	                    tokenObject = accessToken;
	                }
	                else if (typeof accessToken === 'string') {
	                    token = accessToken;
	                }
	            }
	            if (!token && tokenObject) {
	                var tokenRootData = this.config.tokenRoot &&
	                    this.config.tokenRoot.split('.').reduce(function (o, x) {
	                        return o[x];
	                    }, tokenObject.data);
	                token = tokenRootData ? tokenRootData[this.config.tokenName] : tokenObject.data[this.config.tokenName];
	            }
	            if (!token) {
	                var tokenPath = this.config.tokenRoot ? this.config.tokenRoot + '.' + this.config.tokenName : this.config.tokenName;
	                console.warn('Expecting a token named "' + tokenPath);
	                return;
	            }
	        }
	        this.storage.set(this.tokenName, token);
	    };
	    Shared.prototype.removeToken = function () {
	        this.storage.remove(this.tokenName);
	    };
	    Shared.prototype.isAuthenticated = function () {
	        var token = this.getToken();
	        if (token) {
	            if (token.split('.').length === 3) {
	                try {
	                    var base64Url = token.split('.')[1];
	                    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	                    var exp = JSON.parse(window.atob(base64)).exp;
	                    if (exp) {
	                        var isExpired = Math.round(new Date().getTime() / 1000) >= exp;
	                        if (isExpired) {
	                            this.storage.remove(this.tokenName);
	                            return false;
	                        }
	                        else {
	                            return true;
	                        }
	                    }
	                }
	                catch (e) {
	                    return true;
	                }
	            }
	            return true;
	        }
	        return false;
	    };
	    Shared.prototype.getExpirationDate = function () {
	        var payload = this.getPayload();
	        if (payload.exp && Math.round(new Date().getTime() / 1000) < payload.exp) {
	            var date = new Date(0);
	            date.setUTCSeconds(payload.exp);
	            return date;
	        }
	        return null;
	    };
	    Shared.prototype.logout = function () {
	        this.storage.remove(this.tokenName);
	        return rxjs_Observable.Observable.create(function (observer) {
	            observer.next();
	            observer.complete();
	        });
	    };
	    Shared.prototype.setStorageType = function (type) {
	        this.config.storageType = type;
	    };
	    Shared = __decorate([
	        _angular_core.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof Storage !== 'undefined' && Storage) === 'function' && _a) || Object, (typeof (_b = typeof Config !== 'undefined' && Config) === 'function' && _b) || Object])
	    ], Shared);
	    return Shared;
	    var _a, _b;
	}());

	function extend(dst, src) {
	    Object.keys(src)
	        .forEach(function (key) {
	        dst[key] = dst[key];
	    });
	    return dst;
	}
	function joinUrl(baseUrl, url) {
	    if (/^(?:[a-z]+:)?\/\//i.test(url)) {
	        return url;
	    }
	    var joined = [baseUrl, url].join('/');
	    var normalize = function (str) {
	        return str
	            .replace(/[\/]+/g, '/')
	            .replace(/\/\?/g, '?')
	            .replace(/\/\#/g, '#')
	            .replace(/\:\//g, '://');
	    };
	    return normalize(joined);
	}
	function merge(obj1, obj2) {
	    var result = {};
	    for (var i in obj1) {
	        if (obj1.hasOwnProperty(i)) {
	            if ((i in obj2) && (typeof obj1[i] === 'object') && (i !== null)) {
	                result[i] = merge(obj1[i], obj2[i]);
	            }
	            else {
	                result[i] = obj1[i];
	            }
	        }
	    }
	    for (i in obj2) {
	        if (obj2.hasOwnProperty(i)) {
	            if (i in result) {
	                continue;
	            }
	            result[i] = obj2[i];
	        }
	    }
	    return result;
	}
	function camelCase(name) {
	    return name.replace(/([\:\-\_]+(.))/g, function (_, separator, letter, offset) {
	        return offset ? letter.toUpperCase() : letter;
	    });
	}

	function getFullOpts(user, userOpts) {
	    var opts = userOpts || {};
	    if (user) {
	        opts.body = typeof user === 'string' ? user : JSON.stringify(user);
	    }
	    opts.method = opts.method || 'POST';
	    return opts;
	}
	var Local = (function () {
	    function Local(http, shared, config) {
	        this.http = http;
	        this.shared = shared;
	        this.config = config;
	    }
	    Local.prototype.login = function (user, opts) {
	        var _this = this;
	        var fullOpts = getFullOpts(user, opts);
	        var url = fullOpts.url ? fullOpts.url : joinUrl(this.config.baseUrl, this.config.loginUrl);
	        return this.http.request(url, fullOpts)
	            .do(function (response) { return _this.shared.setToken(response); });
	    };
	    Local.prototype.signup = function (user, opts) {
	        var fullOpts = getFullOpts(user, opts);
	        var url = fullOpts.url ? fullOpts.url : joinUrl(this.config.baseUrl, this.config.signupUrl);
	        return this.http.request(url, getFullOpts(user, fullOpts));
	    };
	    Local = __decorate([
	        _angular_core.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof _angular_http.Http !== 'undefined' && _angular_http.Http) === 'function' && _a) || Object, (typeof (_b = typeof Shared !== 'undefined' && Shared) === 'function' && _b) || Object, (typeof (_c = typeof Config !== 'undefined' && Config) === 'function' && _c) || Object])
	    ], Local);
	    return Local;
	    var _a, _b, _c;
	}());

	var Popup = (function () {
	    function Popup(config) {
	        this.config = config;
	        this.url = '';
	        this.popupWindow = null;
	    }
	    Popup.prepareOptions = function (options) {
	        options = options || {};
	        var width = options.width || 500;
	        var height = options.height || 500;
	        return extend({
	            width: width,
	            height: height,
	            left: window.screenX + ((window.outerWidth - width) / 2),
	            top: window.screenY + ((window.outerHeight - height) / 2.5)
	        }, options);
	    };
	    Popup.stringifyOptions = function (options) {
	        return Object.keys(options).map(function (key) {
	            return key + '=' + options[key];
	        }).join(',');
	    };
	    Popup.parseQueryString = function (joinedKeyValue) {
	        var key, value;
	        return joinedKeyValue.split('&').reduce(function (obj, keyValue) {
	            if (keyValue) {
	                value = keyValue.split('=');
	                key = decodeURIComponent(value[0]);
	                obj[key] = typeof value[1] !== 'undefined' ? decodeURIComponent(value[1]) : true;
	            }
	            return obj;
	        }, {});
	    };
	    Popup.prototype.open = function (url, name, options) {
	        this.url = url;
	        var stringifiedOptions = Popup.stringifyOptions(Popup.prepareOptions(options));
	        var UA = window.navigator.userAgent;
	        var windowName = (this.config.cordova || UA.indexOf('CriOS') > -1) ? '_blank' : name;
	        this.popupWindow = window.open(url, windowName, stringifiedOptions);
	        window['popup'] = this.popupWindow;
	        if (this.popupWindow && this.popupWindow.focus) {
	            this.popupWindow.focus();
	        }
	        return this;
	    };
	    Popup.prototype.eventListener = function (redirectUri) {
	        var _this = this;
	        return rxjs_Observable.Observable
	            .fromEvent(this.popupWindow, 'loadstart')
	            .concatMap(function (event) {
	            if (!_this.popupWindow || _this.popupWindow.closed) {
	                return ['Popup Window Closed'];
	            }
	            if (event.url.indexOf(redirectUri) !== 0) {
	                return [];
	            }
	            var parser = document.createElement('a');
	            parser.href = event.url;
	            if (parser.search || parser.hash) {
	                var queryParams = parser.search.substring(1).replace(/\/$/, '');
	                var hashParams = parser.hash.substring(1).replace(/\/$/, '');
	                var hash = Popup.parseQueryString(hashParams);
	                var qs = Popup.parseQueryString(queryParams);
	                extend(qs, hash);
	                _this.popupWindow.close();
	                if (qs.error) {
	                    throw qs.error;
	                }
	                else {
	                    return [qs];
	                }
	            }
	            return [];
	        })
	            .take(1)
	            .takeWhile(function (response) { return response !== 'Popup Window Closed'; });
	    };
	    Popup.prototype.pollPopup = function () {
	        var _this = this;
	        return rxjs_Observable.Observable
	            .interval(50)
	            .concatMap(function () {
	            if (!_this.popupWindow || _this.popupWindow.closed) {
	                return ['Popup Window Closed'];
	            }
	            var documentOrigin = document.location.host;
	            var popupWindowOrigin = '';
	            try {
	                popupWindowOrigin = _this.popupWindow.location.host;
	            }
	            catch (error) {
	            }
	            if (popupWindowOrigin === documentOrigin && (_this.popupWindow.location.search || _this.popupWindow.location.hash)) {
	                var queryParams = _this.popupWindow.location.search.substring(1).replace(/\/$/, '');
	                var hashParams = _this.popupWindow.location.hash.substring(1).replace(/[\/$]/, '');
	                var hash = Popup.parseQueryString(hashParams);
	                var qs = Popup.parseQueryString(queryParams);
	                _this.popupWindow.close();
	                extend(qs, hash);
	                if (qs.error) {
	                    throw qs.error;
	                }
	                else {
	                    return [qs];
	                }
	            }
	            return [];
	        })
	            .take(1)
	            .takeWhile(function (response) { return response !== 'Popup Window Closed'; });
	    };
	    Popup = __decorate([
	        _angular_core.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof Config !== 'undefined' && Config) === 'function' && _a) || Object])
	    ], Popup);
	    return Popup;
	    var _a;
	}());

	var Oauth1 = (function () {
	    function Oauth1(http, popup, config) {
	        this.http = http;
	        this.popup = popup;
	        this.config = config;
	    }
	    Oauth1.prototype.open = function (options, userData) {
	        var _this = this;
	        this.defaults = extend(options, Oauth1.base);
	        var popupWindow;
	        var serverUrl = this.config.baseUrl ? joinUrl(this.config.baseUrl, this.defaults.url) : this.defaults.url;
	        if (!this.config.cordova) {
	            popupWindow = this.popup.open('', this.defaults.name, this.defaults.popupOptions);
	        }
	        return this.http.post(serverUrl, JSON.stringify(this.defaults))
	            .concatMap(function (response) {
	            if (_this.config.cordova) {
	                popupWindow = _this.popup.open([_this.defaults.authorizationEndpoint, _this.buildQueryString(response.json())].join('?'), _this.defaults.name, _this.defaults.popupOptions);
	            }
	            else {
	                popupWindow.popupWindow.location =
	                    [_this.defaults.authorizationEndpoint, _this.buildQueryString(response.json())].join('?');
	            }
	            return _this.config.cordova ? popupWindow.eventListener(_this.defaults.redirectUri) : popupWindow.pollPopup();
	        })
	            .concatMap(function (response) {
	            return _this.exchangeForToken(response, userData);
	        });
	    };
	    Oauth1.prototype.exchangeForToken = function (oauthData, userData) {
	        var data = extend({}, userData);
	        extend(data, oauthData);
	        var exchangeForTokenUrl = this.config.baseUrl ? joinUrl(this.config.baseUrl, this.defaults.url) : this.defaults.url;
	        return this.http.post(exchangeForTokenUrl, data, { withCredentials: this.config.withCredentials });
	    };
	    Oauth1.prototype.buildQueryString = function (obj) {
	        return Object.keys(obj).map(function (key) {
	            return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
	        }).join('&');
	    };
	    Oauth1.base = {
	        url: null,
	        name: null,
	        popupOptions: null,
	        redirectUri: null,
	        authorizationEndpoint: null
	    };
	    Oauth1 = __decorate([
	        _angular_core.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof _angular_http.Http !== 'undefined' && _angular_http.Http) === 'function' && _a) || Object, (typeof (_b = typeof Popup !== 'undefined' && Popup) === 'function' && _b) || Object, (typeof (_c = typeof Config !== 'undefined' && Config) === 'function' && _c) || Object])
	    ], Oauth1);
	    return Oauth1;
	    var _a, _b, _c;
	}());

	var Oauth2 = (function () {
	    function Oauth2(http, popup, storage, config) {
	        this.http = http;
	        this.popup = popup;
	        this.storage = storage;
	        this.config = config;
	    }
	    Oauth2.prototype.open = function (options, userData) {
	        var _this = this;
	        this.defaults = merge(options, Oauth2.base);
	        var url;
	        var openPopup;
	        var stateName = this.defaults.name + '_state';
	        var state = this.defaults.state;
	        if (typeof state === 'string') {
	            this.storage.set(stateName, state);
	        }
	        else if (typeof state === 'function') {
	            this.storage.set(stateName, state());
	        }
	        url = [this.defaults.authorizationEndpoint, this.buildQueryString()].join('?');
	        if (this.config.cordova) {
	            openPopup = this.popup
	                .open(url, this.defaults.name, this.defaults.popupOptions)
	                .eventListener(this.defaults.redirectUri);
	        }
	        else {
	            openPopup = this.popup
	                .open(url, this.defaults.name, this.defaults.popupOptions)
	                .pollPopup();
	        }
	        return openPopup
	            .concatMap(function (oauthData) {
	            if (_this.defaults.responseType === 'token' || !_this.defaults.url) {
	                return oauthData;
	            }
	            if (oauthData.state && oauthData.state !== _this.storage.get(stateName)) {
	                throw 'OAuth "state" mismatch';
	            }
	            return _this.exchangeForToken(oauthData, userData);
	        });
	    };
	    Oauth2.prototype.exchangeForToken = function (oauthData, userData) {
	        var _this = this;
	        var data = extend({}, userData);
	        Object.keys(this.defaults.responseParams).forEach(function (key) {
	            switch (key) {
	                case 'code':
	                    data[_this.defaults.responseParams[key]] = oauthData.code;
	                    break;
	                case 'clientId':
	                    data[_this.defaults.responseParams[key]] = _this.defaults.clientId;
	                    break;
	                case 'redirectUri':
	                    data[_this.defaults.responseParams[key]] = _this.defaults.redirectUri;
	                    break;
	                default:
	                    data[_this.defaults.responseParams[key]] = oauthData[key];
	            }
	        });
	        if (oauthData.state) {
	            data.state = oauthData.state;
	        }
	        var exchangeForTokenUrl = this.config.baseUrl ? joinUrl(this.config.baseUrl, this.defaults.url) : this.defaults.url;
	        return this.http.post(exchangeForTokenUrl, JSON.stringify(data), { withCredentials: this.config.withCredentials });
	    };
	    Oauth2.prototype.buildQueryString = function () {
	        var _this = this;
	        var keyValuePairs = [];
	        var urlParams = ['defaultUrlParams', 'requiredUrlParams', 'optionalUrlParams'];
	        urlParams.forEach(function (params) {
	            if (_this.defaults[params]) {
	                _this.defaults[params].forEach(function (paramName) {
	                    var camelizedName = camelCase(paramName);
	                    var paramValue = typeof _this.defaults[paramName] === 'function' ?
	                        _this.defaults[paramName]() :
	                        _this.defaults[camelizedName];
	                    if (paramName === 'state') {
	                        var stateName = _this.defaults.name + '_state';
	                        paramValue = encodeURIComponent(_this.storage.get(stateName));
	                    }
	                    if (paramName === 'scope' && Array.isArray(paramValue)) {
	                        paramValue = paramValue.join(_this.defaults.scopeDelimiter);
	                        if (_this.defaults.scopePrefix) {
	                            paramValue = [_this.defaults.scopePrefix, paramValue].join(_this.defaults.scopeDelimiter);
	                        }
	                    }
	                    keyValuePairs.push([paramName, paramValue]);
	                });
	            }
	        });
	        return keyValuePairs.map(function (pair) {
	            return pair.join('=');
	        }).join('&');
	    };
	    Oauth2.base = {
	        defaultUrlParams: ['response_type', 'client_id', 'redirect_uri'],
	        responseType: 'code',
	        responseParams: {
	            code: 'code',
	            clientId: 'clientId',
	            redirectUri: 'redirectUri'
	        }
	    };
	    Oauth2 = __decorate([
	        _angular_core.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof _angular_http.Http !== 'undefined' && _angular_http.Http) === 'function' && _a) || Object, (typeof (_b = typeof Popup !== 'undefined' && Popup) === 'function' && _b) || Object, (typeof (_c = typeof Storage !== 'undefined' && Storage) === 'function' && _c) || Object, (typeof (_d = typeof Config !== 'undefined' && Config) === 'function' && _d) || Object])
	    ], Oauth2);
	    return Oauth2;
	    var _a, _b, _c, _d;
	}());

	var Oauth = (function () {
	    function Oauth(http, injector, shared, config) {
	        this.http = http;
	        this.injector = injector;
	        this.shared = shared;
	        this.config = config;
	    }
	    Oauth.prototype.authenticate = function (name, userData) {
	        var _this = this;
	        var provider = this.config.providers[name].type === '1.0' ? this.injector.get(Oauth1) : this.injector.get(Oauth2);
	        return provider.open(this.config.providers[name], userData || {})
	            .do(function (response) {
	            if (_this.config.providers[name].url) {
	                _this.shared.setToken(response);
	            }
	        });
	    };
	    Oauth.prototype.unlink = function (provider, opts) {
	        opts = opts || {};
	        var url = opts.url ? opts.url : joinUrl(this.config.baseUrl, this.config.unlinkUrl);
	        opts.body = JSON.stringify({ provider: provider }) || opts.body;
	        opts.method = opts.method || 'POST';
	        return this.http.request(url, opts);
	    };
	    Oauth = __decorate([
	        _angular_core.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof _angular_http.Http !== 'undefined' && _angular_http.Http) === 'function' && _a) || Object, (typeof (_b = typeof _angular_core.Injector !== 'undefined' && _angular_core.Injector) === 'function' && _b) || Object, (typeof (_c = typeof Shared !== 'undefined' && Shared) === 'function' && _c) || Object, (typeof (_d = typeof Config !== 'undefined' && Config) === 'function' && _d) || Object])
	    ], Oauth);
	    return Oauth;
	    var _a, _b, _c, _d;
	}());

	var JwtHttp = (function (_super) {
	    __extends(JwtHttp, _super);
	    function JwtHttp(_backend, _defaultOptions, _shared, _config) {
	        _super.call(this, _backend, _defaultOptions);
	        this._shared = _shared;
	        this._config = _config;
	    }
	    JwtHttp.prototype.request = function (url, options) {
	        if (url instanceof _angular_http.Request) {
	            url.headers = url.headers || new _angular_http.Headers();
	            this.setHeaders(url);
	        }
	        else {
	            options = options || {};
	            this.setHeaders(options);
	        }
	        return _super.prototype.request.call(this, url, options);
	    };
	    JwtHttp.prototype.get = function (url, options) {
	        options = options || {};
	        options.method = _angular_http.RequestMethod.Get;
	        return this.request(url, options);
	    };
	    JwtHttp.prototype.post = function (url, body, options) {
	        options = options || {};
	        options.method = _angular_http.RequestMethod.Post;
	        options.body = body;
	        return this.request(url, options);
	    };
	    JwtHttp.prototype.put = function (url, body, options) {
	        options = options || {};
	        options.method = _angular_http.RequestMethod.Put;
	        options.body = body;
	        return this.request(url, options);
	    };
	    JwtHttp.prototype.delete = function (url, options) {
	        options = options || {};
	        options.method = _angular_http.RequestMethod.Delete;
	        return this.request(url, options);
	    };
	    JwtHttp.prototype.patch = function (url, body, options) {
	        options = options || {};
	        options.method = _angular_http.RequestMethod.Patch;
	        options.body = body;
	        return this.request(url, options);
	    };
	    JwtHttp.prototype.head = function (url, options) {
	        options = options || {};
	        options.method = _angular_http.RequestMethod.Head;
	        return this.request(url, options);
	    };
	    JwtHttp.prototype.setHeaders = function (obj) {
	        var _this = this;
	        obj.headers = obj.headers || new _angular_http.Headers();
	        if (this._config.defaultHeaders) {
	            Object.keys(this._config.defaultHeaders).forEach(function (defaultHeader) {
	                if (!obj.headers.has(defaultHeader)) {
	                    obj.headers.set(defaultHeader, _this._config.defaultHeaders[defaultHeader]);
	                }
	            });
	        }
	        if (this._shared.isAuthenticated()) {
	            obj.headers.set(this._config.authHeader, this._config.authToken + ' ' + this._shared.getToken());
	        }
	    };
	    JwtHttp = __decorate([
	        _angular_core.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof _angular_http.ConnectionBackend !== 'undefined' && _angular_http.ConnectionBackend) === 'function' && _a) || Object, (typeof (_b = typeof _angular_http.RequestOptions !== 'undefined' && _angular_http.RequestOptions) === 'function' && _b) || Object, (typeof (_c = typeof Shared !== 'undefined' && Shared) === 'function' && _c) || Object, (typeof (_d = typeof Config !== 'undefined' && Config) === 'function' && _d) || Object])
	    ], JwtHttp);
	    return JwtHttp;
	    var _a, _b, _c, _d;
	}(_angular_http.Http));

	function NG2_UI_AUTH_PROVIDERS(config) {
	    return [_angular_core.provide(Config, { useFactory: function () { return new Config(config); } }),
	        _angular_core.provide(Storage, { useFactory: function (providedConfig) { return new Storage(providedConfig); }, deps: [Config] }),
	        _angular_core.provide(Shared, { useFactory: function (storage, providedConfig) { return new Shared(storage, providedConfig); }, deps: [Storage, Config] }),
	        _angular_core.provide(JwtHttp, { useFactory: function (xhrBackend, requestOptions, shared, config, router) { return new JwtHttp(xhrBackend, requestOptions, shared, config); }, deps: [_angular_http.XHRBackend, _angular_http.RequestOptions, Shared, Config] }),
	        _angular_core.provide(Oauth, { useFactory: function (http, injector, shared, providedConfig) { return new Oauth(http, injector, shared, providedConfig); }, deps: [JwtHttp, _angular_core.Injector, Shared, Config] }),
	        _angular_core.provide(Popup, { useFactory: function (providedConfig) { return new Popup(providedConfig); }, deps: [Config] }),
	        _angular_core.provide(Oauth1, { useFactory: function (http, popup, providedConfig) { return new Oauth1(http, popup, providedConfig); }, deps: [JwtHttp, Popup, Config] }),
	        _angular_core.provide(Oauth2, { useFactory: function (http, popup, storage, providedConfig) { return new Oauth2(http, popup, storage, providedConfig); }, deps: [JwtHttp, Popup, Storage, Config] }),
	        _angular_core.provide(Local, { useFactory: function (http, shared, providedConfig) { return new Local(http, shared, providedConfig); }, deps: [JwtHttp, Shared, Config] }),
	        _angular_core.provide(Auth, { useFactory: function (shared, local, oauth) { return new Auth(shared, local, oauth); }, deps: [Shared, Local, Oauth] }),
	    ];
	}
	var Auth = (function () {
	    function Auth(shared, local, oauth) {
	        this.shared = shared;
	        this.local = local;
	        this.oauth = oauth;
	    }
	    Auth.prototype.login = function (user, opts) {
	        return this.local.login(user, opts);
	    };
	    Auth.prototype.signup = function (user, opts) {
	        return this.local.signup(user, opts);
	    };
	    Auth.prototype.logout = function () {
	        return this.shared.logout();
	    };
	    Auth.prototype.authenticate = function (name, userData) {
	        return this.oauth.authenticate(name, userData);
	    };
	    Auth.prototype.link = function (name, userData) {
	        return this.oauth.authenticate(name, userData);
	    };
	    Auth.prototype.unlink = function (provider, opts) {
	        return this.oauth.unlink(provider, opts);
	    };
	    Auth.prototype.isAuthenticated = function () {
	        return this.shared.isAuthenticated();
	    };
	    Auth.prototype.getToken = function () {
	        return this.shared.getToken();
	    };
	    Auth.prototype.setToken = function (token) {
	        this.shared.setToken(token);
	    };
	    Auth.prototype.removeToken = function () {
	        this.shared.removeToken();
	    };
	    Auth.prototype.getPayload = function () {
	        return this.shared.getPayload();
	    };
	    Auth.prototype.setStorageType = function (type) {
	        this.shared.setStorageType(type);
	    };
	    Auth.prototype.getExpirationDate = function () {
	        return this.shared.getExpirationDate();
	    };
	    Auth = __decorate([
	        _angular_core.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof Shared !== 'undefined' && Shared) === 'function' && _a) || Object, (typeof (_b = typeof Local !== 'undefined' && Local) === 'function' && _b) || Object, (typeof (_c = typeof Oauth !== 'undefined' && Oauth) === 'function' && _c) || Object])
	    ], Auth);
	    return Auth;
	    var _a, _b, _c;
	}());

	exports.Auth = Auth;
	exports.NG2_UI_AUTH_PROVIDERS = NG2_UI_AUTH_PROVIDERS;
	exports.Config = Config;
	exports.Shared = Shared;
	exports.JwtHttp = JwtHttp;


/***/ },
/* 440 */,
/* 441 */,
/* 442 */,
/* 443 */,
/* 444 */,
/* 445 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	// RTL
	__export(__webpack_require__(266));
	// Portals
	__export(__webpack_require__(114));
	__export(__webpack_require__(264));
	// Gestures
	__export(__webpack_require__(447));
	__export(__webpack_require__(448));
	//# sourceMappingURL=/usr/local/google/home/jelbourn/material2/tmp/broccoli_type_script_compiler-input_base_path-OxHzApZr.tmp/0/core/core.js.map

/***/ },
/* 446 */
/***/ function(module, exports) {

	// TODO(kara): Revisit why error messages are not being properly set.
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * Wrapper around Error that sets the error message.
	 */
	var MdError = (function (_super) {
	    __extends(MdError, _super);
	    function MdError(value) {
	        _super.call(this);
	        _super.prototype.message = value;
	    }
	    return MdError;
	}(Error));
	exports.MdError = MdError;
	//# sourceMappingURL=/usr/local/google/home/jelbourn/material2/tmp/broccoli_type_script_compiler-input_base_path-OxHzApZr.tmp/0/core/errors/error.js.map

/***/ },
/* 447 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(1);
	var platform_browser_1 = __webpack_require__(137);
	/* Adjusts configuration of our gesture library, Hammer. */
	var MdGestureConfig = (function (_super) {
	    __extends(MdGestureConfig, _super);
	    function MdGestureConfig() {
	        _super.apply(this, arguments);
	        /* List of new event names to add to the gesture support list */
	        this.events = [
	            'drag',
	            'dragstart',
	            'dragend',
	            'dragright',
	            'dragleft',
	            'longpress',
	        ];
	    }
	    /*
	     * Builds Hammer instance manually to add custom recognizers that match the Material Design spec.
	     *
	     * Our gesture names come from the Material Design gestures spec:
	     * https://www.google.com/design/spec/patterns/gestures.html#gestures-touch-mechanics
	     *
	     * More information on default recognizers can be found in Hammer docs:
	     * http://hammerjs.github.io/recognizer-pan/
	     * http://hammerjs.github.io/recognizer-press/
	     *
	     * TODO: Confirm threshold numbers with Material Design UX Team
	     * */
	    MdGestureConfig.prototype.buildHammer = function (element) {
	        var mc = new Hammer(element);
	        // create custom gesture recognizers
	        var drag = new Hammer.Pan({ event: 'drag', threshold: 6 });
	        var longpress = new Hammer.Press({ event: 'longpress', time: 500 });
	        // ensure custom recognizers can coexist with the default gestures (i.e. pan, press, swipe)
	        var pan = new Hammer.Pan();
	        var press = new Hammer.Press();
	        var swipe = new Hammer.Swipe();
	        drag.recognizeWith(pan);
	        drag.recognizeWith(swipe);
	        pan.recognizeWith(swipe);
	        longpress.recognizeWith(press);
	        // add customized gestures to Hammer manager
	        mc.add([drag, pan, swipe, press, longpress]);
	        return mc;
	    };
	    MdGestureConfig = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], MdGestureConfig);
	    return MdGestureConfig;
	}(platform_browser_1.HammerGestureConfig));
	exports.MdGestureConfig = MdGestureConfig;
	//# sourceMappingURL=/usr/local/google/home/jelbourn/material2/tmp/broccoli_type_script_compiler-input_base_path-OxHzApZr.tmp/0/core/gestures/MdGestureConfig.js.map

/***/ },
/* 448 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(1);
	/**
	 * Shared directive to count lines inside a text area, such as a list item.
	 * Line elements can be extracted with a @ContentChildren(MdLine) query, then
	 * counted by checking the query list's length.
	 */
	var MdLine = (function () {
	    function MdLine() {
	    }
	    MdLine = __decorate([
	        core_1.Directive({ selector: '[md-line]' }), 
	        __metadata('design:paramtypes', [])
	    ], MdLine);
	    return MdLine;
	}());
	exports.MdLine = MdLine;
	/* Helper that takes a query list of lines and sets the correct class on the host */
	var MdLineSetter = (function () {
	    function MdLineSetter(_lines, _renderer, _element) {
	        var _this = this;
	        this._lines = _lines;
	        this._renderer = _renderer;
	        this._element = _element;
	        this._setLineClass(this._lines.length);
	        this._lines.changes.subscribe(function () {
	            _this._setLineClass(_this._lines.length);
	        });
	    }
	    MdLineSetter.prototype._setLineClass = function (count) {
	        this._resetClasses();
	        if (count === 2 || count === 3) {
	            this._setClass("md-" + count + "-line", true);
	        }
	    };
	    MdLineSetter.prototype._resetClasses = function () {
	        this._setClass('md-2-line', false);
	        this._setClass('md-3-line', false);
	    };
	    MdLineSetter.prototype._setClass = function (className, bool) {
	        this._renderer.setElementClass(this._element.nativeElement, className, bool);
	    };
	    return MdLineSetter;
	}());
	exports.MdLineSetter = MdLineSetter;
	//# sourceMappingURL=/usr/local/google/home/jelbourn/material2/tmp/broccoli_type_script_compiler-input_base_path-OxHzApZr.tmp/0/core/line/line.js.map

/***/ },
/* 449 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Create the overlay container element, which is simply a div
	 * with the 'md-overlay-container' class on the document body.
	 */
	function createOverlayContainer() {
	    var container = document.createElement('div');
	    container.classList.add('md-overlay-container');
	    document.body.appendChild(container);
	    return container;
	}
	exports.createOverlayContainer = createOverlayContainer;
	//# sourceMappingURL=/usr/local/google/home/jelbourn/material2/tmp/broccoli_type_script_compiler-input_base_path-OxHzApZr.tmp/0/core/overlay/overlay-container.js.map

/***/ },
/* 450 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(1);
	var overlay_1 = __webpack_require__(162);
	var portal_1 = __webpack_require__(114);
	var overlay_state_1 = __webpack_require__(161);
	var connected_position_1 = __webpack_require__(261);
	/** Default set of positions for the overlay. Follows the behavior of a dropdown. */
	var defaultPositionList = [
	    new connected_position_1.ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
	    new connected_position_1.ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }),
	];
	/**
	 * Directive to facilitate declarative creation of an Overlay using a ConnectedPositionStrategy.
	 */
	var ConnectedOverlayDirective = (function () {
	    // TODO(jelbourn): inputs for size, scroll behavior, animation, etc.
	    function ConnectedOverlayDirective(_overlay, templateRef, viewContainerRef) {
	        this._overlay = _overlay;
	        this._templatePortal = new portal_1.TemplatePortal(templateRef, viewContainerRef);
	    }
	    Object.defineProperty(ConnectedOverlayDirective.prototype, "overlayRef", {
	        get: function () {
	            return this._overlayRef;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /** TODO: internal */
	    ConnectedOverlayDirective.prototype.ngOnInit = function () {
	        this._createOverlay();
	    };
	    /** TODO: internal */
	    ConnectedOverlayDirective.prototype.ngOnDestroy = function () {
	        this._destroyOverlay();
	    };
	    /** Creates an overlay and attaches this directive's template to it. */
	    ConnectedOverlayDirective.prototype._createOverlay = function () {
	        var _this = this;
	        if (!this.positions || !this.positions.length) {
	            this.positions = defaultPositionList;
	        }
	        var overlayConfig = new overlay_state_1.OverlayState();
	        overlayConfig.positionStrategy =
	            this._overlay.position().connectedTo(this.origin.elementRef, { originX: this.positions[0].overlayX, originY: this.positions[0].originY }, { overlayX: this.positions[0].overlayX, overlayY: this.positions[0].overlayY });
	        this._overlay.create(overlayConfig).then(function (ref) {
	            _this._overlayRef = ref;
	            _this._overlayRef.attach(_this._templatePortal);
	        });
	    };
	    /** Destroys the overlay created by this directive. */
	    ConnectedOverlayDirective.prototype._destroyOverlay = function () {
	        this._overlayRef.dispose();
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', OverlayOrigin)
	    ], ConnectedOverlayDirective.prototype, "origin", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Array)
	    ], ConnectedOverlayDirective.prototype, "positions", void 0);
	    ConnectedOverlayDirective = __decorate([
	        core_1.Directive({
	            selector: '[connected-overlay]'
	        }), 
	        __metadata('design:paramtypes', [overlay_1.Overlay, core_1.TemplateRef, core_1.ViewContainerRef])
	    ], ConnectedOverlayDirective);
	    return ConnectedOverlayDirective;
	}());
	exports.ConnectedOverlayDirective = ConnectedOverlayDirective;
	/**
	 * Directive applied to an element to make it usable as an origin for an Overlay using a
	 * ConnectedPositionStrategy.
	 */
	var OverlayOrigin = (function () {
	    function OverlayOrigin(_elementRef) {
	        this._elementRef = _elementRef;
	    }
	    Object.defineProperty(OverlayOrigin.prototype, "elementRef", {
	        get: function () {
	            return this._elementRef;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    OverlayOrigin = __decorate([
	        core_1.Directive({
	            selector: '[overlay-origin]',
	            exportAs: 'overlayOrigin',
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef])
	    ], OverlayOrigin);
	    return OverlayOrigin;
	}());
	exports.OverlayOrigin = OverlayOrigin;
	exports.OVERLAY_DIRECTIVES = [ConnectedOverlayDirective, OverlayOrigin];
	//# sourceMappingURL=/usr/local/google/home/jelbourn/material2/tmp/broccoli_type_script_compiler-input_base_path-OxHzApZr.tmp/0/core/overlay/overlay-directives.js.map

/***/ },
/* 451 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var apply_transform_1 = __webpack_require__(267);
	var connected_position_1 = __webpack_require__(261);
	/**
	 * A strategy for positioning overlays. Using this strategy, an overlay is given an
	 * implict position relative some origin element. The relative position is defined in terms of
	 * a point on the origin element that is connected to a point on the overlay element. For example,
	 * a basic dropdown is connecting the bottom-left corner of the origin to the top-left corner
	 * of the overlay.
	 */
	var ConnectedPositionStrategy = (function () {
	    function ConnectedPositionStrategy(_connectedTo, _originPos, _overlayPos, _viewportRuler) {
	        this._connectedTo = _connectedTo;
	        this._originPos = _originPos;
	        this._overlayPos = _overlayPos;
	        this._viewportRuler = _viewportRuler;
	        // TODO(jelbourn): set RTL to the actual value from the app.
	        /** Whether the we're dealing with an RTL context */
	        this._isRtl = false;
	        /** Ordered list of preferred positions, from most to least desirable. */
	        this._preferredPositions = [];
	        this._origin = this._connectedTo.nativeElement;
	        this.withFallbackPosition(_originPos, _overlayPos);
	    }
	    Object.defineProperty(ConnectedPositionStrategy.prototype, "positions", {
	        get: function () {
	            return this._preferredPositions;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Updates the position of the overlay element, using whichever preferred position relative
	     * to the origin fits on-screen.
	     * TODO: internal
	     */
	    ConnectedPositionStrategy.prototype.apply = function (element) {
	        // We need the bounding rects for the origin and the overlay to determine how to position
	        // the overlay relative to the origin.
	        var originRect = this._origin.getBoundingClientRect();
	        var overlayRect = element.getBoundingClientRect();
	        // We use the viewport rect to determine whether a position would go off-screen.
	        var viewportRect = this._viewportRuler.getViewportRect();
	        var firstOverlayPoint = null;
	        // We want to place the overlay in the first of the preferred positions such that the
	        // overlay fits on-screen.
	        for (var _i = 0, _a = this._preferredPositions; _i < _a.length; _i++) {
	            var pos = _a[_i];
	            // Get the (x, y) point of connection on the origin, and then use that to get the
	            // (top, left) coordinate for the overlay at `pos`.
	            var originPoint = this._getOriginConnectionPoint(originRect, pos);
	            var overlayPoint = this._getOverlayPoint(originPoint, overlayRect, pos);
	            firstOverlayPoint = firstOverlayPoint || overlayPoint;
	            // If the overlay in the calculated position fits on-screen, put it there and we're done.
	            if (this._willOverlayFitWithinViewport(overlayPoint, overlayRect, viewportRect)) {
	                this._setElementPosition(element, overlayPoint);
	                return Promise.resolve();
	            }
	        }
	        // TODO(jelbourn): fallback behavior for when none of the preferred positions fit on-screen.
	        // For now, just stick it in the first position and let it go off-screen.
	        this._setElementPosition(element, firstOverlayPoint);
	        return Promise.resolve();
	    };
	    ConnectedPositionStrategy.prototype.withFallbackPosition = function (originPos, overlayPos) {
	        this._preferredPositions.push(new connected_position_1.ConnectionPositionPair(originPos, overlayPos));
	        return this;
	    };
	    /**
	     * Gets the horizontal (x) "start" dimension based on whether the overlay is in an RTL context.
	     * @param rect
	     */
	    ConnectedPositionStrategy.prototype._getStartX = function (rect) {
	        return this._isRtl ? rect.right : rect.left;
	    };
	    /**
	     * Gets the horizontal (x) "end" dimension based on whether the overlay is in an RTL context.
	     * @param rect
	     */
	    ConnectedPositionStrategy.prototype._getEndX = function (rect) {
	        return this._isRtl ? rect.left : rect.right;
	    };
	    /**
	     * Gets the (x, y) coordinate of a connection point on the origin based on a relative position.
	     * @param originRect
	     * @param pos
	     */
	    ConnectedPositionStrategy.prototype._getOriginConnectionPoint = function (originRect, pos) {
	        var originStartX = this._getStartX(originRect);
	        var originEndX = this._getEndX(originRect);
	        var x;
	        if (pos.originX == 'center') {
	            x = originStartX + (originRect.width / 2);
	        }
	        else {
	            x = pos.originX == 'start' ? originStartX : originEndX;
	        }
	        var y;
	        if (pos.originY == 'center') {
	            y = originRect.top + (originRect.height / 2);
	        }
	        else {
	            y = pos.originY == 'top' ? originRect.top : originRect.bottom;
	        }
	        return { x: x, y: y };
	    };
	    /**
	     * Gets the (x, y) coordinate of the top-left corner of the overlay given a given position and
	     * origin point to which the overlay should be connected.
	     * @param originPoint
	     * @param overlayRect
	     * @param pos
	     */
	    ConnectedPositionStrategy.prototype._getOverlayPoint = function (originPoint, overlayRect, pos) {
	        // Calculate the (overlayStartX, overlayStartY), the start of the potential overlay position
	        // relative to the origin point.
	        var overlayStartX;
	        if (pos.overlayX == 'center') {
	            overlayStartX = -overlayRect.width / 2;
	        }
	        else {
	            overlayStartX = pos.overlayX == 'start' ? 0 : -overlayRect.width;
	        }
	        var overlayStartY;
	        if (pos.overlayY == 'center') {
	            overlayStartY = -overlayRect.height / 2;
	        }
	        else {
	            overlayStartY = pos.overlayY == 'top' ? 0 : -overlayRect.height;
	        }
	        return {
	            x: originPoint.x + overlayStartX,
	            y: originPoint.y + overlayStartY
	        };
	    };
	    /**
	     * Gets whether the overlay positioned at the given point will fit on-screen.
	     * @param overlayPoint The top-left coordinate of the overlay.
	     * @param overlayRect Bounding rect of the overlay, used to get its size.
	     * @param viewportRect The bounding viewport.
	     */
	    ConnectedPositionStrategy.prototype._willOverlayFitWithinViewport = function (overlayPoint, overlayRect, viewportRect) {
	        // TODO(jelbourn): probably also want some space between overlay edge and viewport edge.
	        return overlayPoint.x >= viewportRect.left &&
	            overlayPoint.x + overlayRect.width <= viewportRect.right &&
	            overlayPoint.y >= viewportRect.top &&
	            overlayPoint.y + overlayRect.height <= viewportRect.bottom;
	    };
	    /**
	     * Physically positions the overlay element to the given coordinate.
	     * @param element
	     * @param overlayPoint
	     */
	    ConnectedPositionStrategy.prototype._setElementPosition = function (element, overlayPoint) {
	        var scrollPos = this._viewportRuler.getViewportScrollPosition();
	        var x = overlayPoint.x + scrollPos.left;
	        var y = overlayPoint.y + scrollPos.top;
	        // TODO(jelbourn): we don't want to always overwrite the transform property here,
	        // because it will need to be used for animations.
	        apply_transform_1.applyCssTransform(element, "translateX(" + x + "px) translateY(" + y + "px)");
	    };
	    return ConnectedPositionStrategy;
	}());
	exports.ConnectedPositionStrategy = ConnectedPositionStrategy;
	//# sourceMappingURL=/usr/local/google/home/jelbourn/material2/tmp/broccoli_type_script_compiler-input_base_path-OxHzApZr.tmp/0/core/overlay/position/connected-position-strategy.js.map

/***/ },
/* 452 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var apply_transform_1 = __webpack_require__(267);
	/**
	 * A strategy for positioning overlays. Using this strategy, an overlay is given an
	 * explicit position relative to the browser's viewport.
	 */
	var GlobalPositionStrategy = (function () {
	    function GlobalPositionStrategy() {
	        this._cssPosition = 'absolute';
	        this._top = '';
	        this._bottom = '';
	        this._left = '';
	        this._right = '';
	        /** Array of individual applications of translateX(). Currently only for centering. */
	        this._translateX = [];
	        /** Array of individual applications of translateY(). Currently only for centering. */
	        this._translateY = [];
	    }
	    /** Sets the element to usee CSS position: fixed */
	    GlobalPositionStrategy.prototype.fixed = function () {
	        this._cssPosition = 'fixed';
	        return this;
	    };
	    /** Sets the element to usee CSS position: absolute. This is the default. */
	    GlobalPositionStrategy.prototype.absolute = function () {
	        this._cssPosition = 'absolute';
	        return this;
	    };
	    /** Sets the top position of the overlay. Clears any previously set vertical position. */
	    GlobalPositionStrategy.prototype.top = function (value) {
	        this._bottom = '';
	        this._translateY = [];
	        this._top = value;
	        return this;
	    };
	    /** Sets the left position of the overlay. Clears any previously set horizontal position. */
	    GlobalPositionStrategy.prototype.left = function (value) {
	        this._right = '';
	        this._translateX = [];
	        this._left = value;
	        return this;
	    };
	    /** Sets the bottom position of the overlay. Clears any previously set vertical position. */
	    GlobalPositionStrategy.prototype.bottom = function (value) {
	        this._top = '';
	        this._translateY = [];
	        this._bottom = value;
	        return this;
	    };
	    /** Sets the right position of the overlay. Clears any previously set horizontal position. */
	    GlobalPositionStrategy.prototype.right = function (value) {
	        this._left = '';
	        this._translateX = [];
	        this._right = value;
	        return this;
	    };
	    /**
	     * Centers the overlay horizontally with an optional offset.
	     * Clears any previously set horizontal position.
	     */
	    GlobalPositionStrategy.prototype.centerHorizontally = function (offset) {
	        if (offset === void 0) { offset = '0px'; }
	        this._left = '50%';
	        this._right = '';
	        this._translateX = ['-50%', offset];
	        return this;
	    };
	    /**
	     * Centers the overlay vertically with an optional offset.
	     * Clears any previously set vertical position.
	     */
	    GlobalPositionStrategy.prototype.centerVertically = function (offset) {
	        if (offset === void 0) { offset = '0px'; }
	        this._top = '50%';
	        this._bottom = '';
	        this._translateY = ['-50%', offset];
	        return this;
	    };
	    /**
	     * Apply the position to the element.
	     * TODO: internal
	     */
	    GlobalPositionStrategy.prototype.apply = function (element) {
	        element.style.position = this._cssPosition;
	        element.style.top = this._top;
	        element.style.left = this._left;
	        element.style.bottom = this._bottom;
	        element.style.right = this._right;
	        // TODO(jelbourn): we don't want to always overwrite the transform property here,
	        // because it will need to be used for animations.
	        var tranlateX = this._reduceTranslateValues('translateX', this._translateX);
	        var translateY = this._reduceTranslateValues('translateY', this._translateY);
	        apply_transform_1.applyCssTransform(element, tranlateX + " " + translateY);
	        return Promise.resolve();
	    };
	    /** Reduce a list of translate values to a string that can be used in the transform property */
	    GlobalPositionStrategy.prototype._reduceTranslateValues = function (translateFn, values) {
	        return values.map(function (t) { return (translateFn + "(" + t + ")"); }).join(' ');
	    };
	    return GlobalPositionStrategy;
	}());
	exports.GlobalPositionStrategy = GlobalPositionStrategy;
	//# sourceMappingURL=/usr/local/google/home/jelbourn/material2/tmp/broccoli_type_script_compiler-input_base_path-OxHzApZr.tmp/0/core/overlay/position/global-position-strategy.js.map

/***/ },
/* 453 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var viewport_ruler_1 = __webpack_require__(262);
	var connected_position_strategy_1 = __webpack_require__(451);
	var core_1 = __webpack_require__(1);
	var global_position_strategy_1 = __webpack_require__(452);
	/** Builder for overlay position strategy. */
	var OverlayPositionBuilder = (function () {
	    function OverlayPositionBuilder(_viewportRuler) {
	        this._viewportRuler = _viewportRuler;
	    }
	    /** Creates a global position strategy. */
	    OverlayPositionBuilder.prototype.global = function () {
	        return new global_position_strategy_1.GlobalPositionStrategy();
	    };
	    /** Creates a relative position strategy. */
	    OverlayPositionBuilder.prototype.connectedTo = function (elementRef, originPos, overlayPos) {
	        return new connected_position_strategy_1.ConnectedPositionStrategy(elementRef, originPos, overlayPos, this._viewportRuler);
	    };
	    OverlayPositionBuilder = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [viewport_ruler_1.ViewportRuler])
	    ], OverlayPositionBuilder);
	    return OverlayPositionBuilder;
	}());
	exports.OverlayPositionBuilder = OverlayPositionBuilder;
	//# sourceMappingURL=/usr/local/google/home/jelbourn/material2/tmp/broccoli_type_script_compiler-input_base_path-OxHzApZr.tmp/0/core/overlay/position/overlay-position-builder.js.map

/***/ },
/* 454 */,
/* 455 */,
/* 456 */,
/* 457 */,
/* 458 */,
/* 459 */,
/* 460 */,
/* 461 */,
/* 462 */,
/* 463 */,
/* 464 */,
/* 465 */,
/* 466 */,
/* 467 */,
/* 468 */,
/* 469 */,
/* 470 */,
/* 471 */,
/* 472 */,
/* 473 */,
/* 474 */,
/* 475 */,
/* 476 */,
/* 477 */,
/* 478 */,
/* 479 */,
/* 480 */,
/* 481 */,
/* 482 */,
/* 483 */,
/* 484 */,
/* 485 */,
/* 486 */,
/* 487 */,
/* 488 */,
/* 489 */,
/* 490 */,
/* 491 */,
/* 492 */,
/* 493 */,
/* 494 */,
/* 495 */,
/* 496 */,
/* 497 */,
/* 498 */,
/* 499 */,
/* 500 */,
/* 501 */,
/* 502 */,
/* 503 */,
/* 504 */,
/* 505 */,
/* 506 */,
/* 507 */,
/* 508 */,
/* 509 */,
/* 510 */,
/* 511 */,
/* 512 */,
/* 513 */,
/* 514 */,
/* 515 */,
/* 516 */,
/* 517 */,
/* 518 */,
/* 519 */,
/* 520 */,
/* 521 */,
/* 522 */,
/* 523 */,
/* 524 */,
/* 525 */,
/* 526 */,
/* 527 */,
/* 528 */,
/* 529 */,
/* 530 */,
/* 531 */,
/* 532 */,
/* 533 */,
/* 534 */,
/* 535 */,
/* 536 */,
/* 537 */,
/* 538 */,
/* 539 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var router_deprecated_1 = __webpack_require__(34);
	var core_2 = __webpack_require__(1);
	//import {Router} from '@angular/router';
	var sidenav_1 = __webpack_require__(61);
	var toolbar_1 = __webpack_require__(62);
	var ng2_material_1 = __webpack_require__(72);
	var app_service_1 = __webpack_require__(142);
	var router_active_directive_1 = __webpack_require__(570);
	var core_3 = __webpack_require__(27);
	var auth_service_1 = __webpack_require__(568);
	var home_1 = __webpack_require__(550);
	var shop_component_1 = __webpack_require__(576);
	var add_component_1 = __webpack_require__(571);
	var list_component_1 = __webpack_require__(573);
	var search_component_1 = __webpack_require__(575);
	var md_dropdown_component_1 = __webpack_require__(544);
	var test_1 = __webpack_require__(577);
	var signin_component_1 = __webpack_require__(540);
	var signup_component_1 = __webpack_require__(541);
	var material2_app_component_1 = __webpack_require__(554);
	//import {Product} from './product/product.component';
	//import {Products} from './product/products.component';
	///import {PrdRoot} from './prd/prd-root.component';
	//import {Shop} from './shop/shop.component';
	// Import Products component
	var products_component_1 = __webpack_require__(563);
	var product_component_1 = __webpack_require__(560);
	var add_component_2 = __webpack_require__(555);
	var list_component_2 = __webpack_require__(558);
	var plist_component_1 = __webpack_require__(559);
	var list_component_3 = __webpack_require__(543);
	var details_component_1 = __webpack_require__(556);
	var shared_service_1 = __webpack_require__(223);
	var user_service_1 = __webpack_require__(23);
	var file_upload_1 = __webpack_require__(546);
	var demo_1 = __webpack_require__(545);
	var map_auto_1 = __webpack_require__(362);
	var avatar_component_1 = __webpack_require__(566);
	var profile_component_1 = __webpack_require__(567);
	/*
	 * App Component
	 */
	var App = (function () {
	    function App(appState, auth, s, u) {
	        this.appState = appState;
	        this.auth = auth;
	        this.s = s;
	        this.u = u;
	        this.angularLogo = 'assets/img/angular-logo.png';
	        this.name = 'Angular Shop';
	        this.url = 'https://google.com/';
	        this.latitude = 51.678418;
	        this.longitude = 7.809007;
	        //@Input()
	        //fullPage: boolean = true;
	        this.site = 'Angular2 Material';
	        this.angularVersion = null;
	        this.linkTag = null;
	        //  components: IComponentMeta[] = [];
	        this._subscription = null;
	        this.navigation = {};
	        //If using Auth0 for SSO
	        //lock = new Auth0Lock('tN9xVfIaUEeUCrFxleVwhIoObMbSe9be', 'xxx.auth0.com');
	        this.items = ['A', 'B', 'C', 'Pizza'];
	        s.userId = "";
	        s.userEmail = "";
	        //u.id = 'u.id = '574c5677c534abb86bf27452';'
	        u.id = '574c5677c534abb86bf27452';
	        u.id = '575465132056a2184f8262f6';
	        u.email = 'auto';
	        //Asking for get current location and stroring it  in user service
	        if (window && window.navigator && window.navigator.geolocation) {
	            window.navigator.geolocation.getCurrentPosition(function (position) {
	                console.log('location', position);
	                if (position.coords) {
	                    u.location = position.coords;
	                    u.latitude = position.coords.latitude;
	                    u.longitude = position.coords.longitude;
	                }
	            });
	        } // if
	    }
	    App.prototype.login = function () {
	        this.auth.login();
	    };
	    App.prototype.logout = function () {
	        this.auth.logout();
	    };
	    App.prototype.loggedIn = function () {
	        return false;
	    };
	    /*
	    
	    login() {
	        var hash = this.lock.parseHash();
	        if (hash) {
	          if (hash.error)
	            console.log('There was an error logging in', hash.error);
	          else
	            this.lock.getProfile(hash.id_token, function(err, profile) {
	              if (err) {
	                console.log(err);
	                return;
	              }
	              localStorage.setItem('profile', JSON.stringify(profile));
	              localStorage.setItem('id_token', hash.id_token);
	            });
	        }
	      }
	    
	      logout() {
	        localStorage.removeItem('profile');
	        localStorage.removeItem('id_token');
	      }
	    
	      loggedIn() {
	        return tokenNotExpired();
	      }
	    
	    */
	    // Fire off upon initialization
	    App.prototype.ngOnInit = function () {
	        console.log('Initial App Loading');
	        console.log('Initial App State', this.appState.state);
	    };
	    Object.defineProperty(App.prototype, "pushed", {
	        get: function () { return this.menu && this.menu.mode === 'side'; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(App.prototype, "over", {
	        get: function () { return this.menu && this.menu.mode === 'over' && this.menu.opened; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(App.prototype, "sidenavWidth", {
	        // TODO(jd): these two property hacks are to work around issues with the peekaboo fixed nav
	        // overlapping the sidenav and toolbar.  They will not properly "fix" to the top if inside
	        // md-sidenav-layout, and they will overlap the sidenav and scrollbar when outside.  So just
	        // calculate left and right properties for fixed toolbars based on the media query and browser
	        // scrollbar width.  :sob: :rage:
	        get: function () { return this.pushed ? 281 : 0; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(App.prototype, "scrollWidth", {
	        get: function () {
	            var inner = document.createElement('p');
	            inner.style.width = '100%';
	            inner.style.height = '200px';
	            var outer = document.createElement('div');
	            outer.style.position = 'absolute';
	            outer.style.top = '0px';
	            outer.style.left = '0px';
	            outer.style.visibility = 'hidden';
	            outer.style.width = '200px';
	            outer.style.height = '150px';
	            outer.style.overflow = 'hidden';
	            outer.appendChild(inner);
	            document.body.appendChild(outer);
	            var w1 = inner.offsetWidth;
	            outer.style.overflow = 'scroll';
	            var w2 = inner.offsetWidth;
	            if (w1 == w2)
	                w2 = outer.clientWidth;
	            document.body.removeChild(outer);
	            return (w1 - w2);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ;
	    __decorate([
	        core_2.ViewChild(sidenav_1.MdSidenav), 
	        __metadata('design:type', sidenav_1.MdSidenav)
	    ], App.prototype, "menu", void 0);
	    __decorate([
	        core_2.Input(), 
	        __metadata('design:type', Number)
	    ], App.prototype, "sidenavWidth", null);
	    __decorate([
	        core_2.Input(), 
	        __metadata('design:type', Number)
	    ], App.prototype, "scrollWidth", null);
	    App = __decorate([
	        core_1.Component({
	            selector: 'app',
	            providers: [core_3.ANGULAR2_GOOGLE_MAPS_PROVIDERS, auth_service_1.AuthService],
	            directives: [md_dropdown_component_1.MdDropdown, map_auto_1.MapAutocomplete,
	                router_active_directive_1.RouterActive,
	                sidenav_1.MD_SIDENAV_DIRECTIVES, ng2_material_1.MdIcon, toolbar_1.MdToolbar],
	            encapsulation: core_1.ViewEncapsulation.None,
	            pipes: [],
	            styles: ["\n    .sebm-google-map-container {\n      height: 300px;\n    }\n  "],
	            // Load our main `Sass` file into our `app` `component`
	            styleUrls: [__webpack_require__(847)],
	            //template: require('./app.side.nav.html')
	            template: __webpack_require__(584)
	        }),
	        router_deprecated_1.RouteConfig([
	            { path: '/', name: 'Index', component: home_1.Home, useAsDefault: true },
	            { path: '/home', name: 'Home', component: home_1.Home },
	            { path: '/shop', component: shop_component_1.Shop, name: 'Shop' },
	            { path: '/shopadd', component: add_component_1.ShopAdd, name: 'ShopAdd' },
	            { path: '/shoplist', component: list_component_1.ShopList, name: 'ShopList' },
	            { path: '/cartlist', component: list_component_3.CartList, name: 'CartList' },
	            { path: '/file', component: file_upload_1.FileUpload, name: 'FileUpload' },
	            { path: '/demo', component: demo_1.Demo, name: 'Demo' },
	            { path: '/map', component: map_auto_1.MapAutocomplete, name: 'MapAutocomplete' },
	            // { path: '/shopsearch', component: ShopSearch, name: 'ShopSearch' },
	            { path: '/search', component: search_component_1.ShopSearch, name: 'ShopSearch' },
	            { path: '/products', component: products_component_1.Products, name: 'Products' },
	            { path: '/product', component: product_component_1.Product, name: 'Product' },
	            { path: '/signup', component: signup_component_1.Signup, name: 'Signup' },
	            { path: '/signin', component: signin_component_1.Signin, name: 'Signin' },
	            { path: '/avatar', component: avatar_component_1.Avatar, name: 'Avatar' },
	            { path: '/profile', component: profile_component_1.Profile, name: 'Profile' },
	            { path: '/test', component: test_1.Test, name: 'Test' },
	            { path: '/material', component: material2_app_component_1.Material2App, name: 'Material' },
	            { path: '/productadd/:shopid', component: add_component_2.ProductAdd, name: 'ProductAdd' },
	            { path: '/productlist/:shopid', component: list_component_2.ProductList, name: 'ProductList' },
	            //Products List by shop for customer
	            { path: '/plist/:shopid', component: plist_component_1.PList, name: 'PList' },
	            { path: '/productdetails/:id', component: details_component_1.ProductDetails, name: 'ProductDetails' },
	            // Async load
	            { path: '/about', name: 'About', loader: function () { return __webpack_require__(583)('About'); } },
	        ]), 
	        __metadata('design:paramtypes', [app_service_1.AppState, auth_service_1.AuthService, shared_service_1.SharedService, user_service_1.UserService])
	    ], App);
	    return App;
	}());
	exports.App = App;
	

/***/ },
/* 540 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	//import {Router} from '@angular/router';
	var router_deprecated_1 = __webpack_require__(34);
	var common_1 = __webpack_require__(7);
	var sidenav_1 = __webpack_require__(61);
	var toolbar_1 = __webpack_require__(62);
	var button_1 = __webpack_require__(73);
	var checkbox_1 = __webpack_require__(59);
	var progress_bar_1 = __webpack_require__(102);
	var card_1 = __webpack_require__(74);
	var input_1 = __webpack_require__(75);
	var user_service_1 = __webpack_require__(23);
	var ng2_ui_auth_1 = __webpack_require__(439);
	var Signin = (function () {
	    function Signin(auth, u, router) {
	        //super();
	        this.auth = auth;
	        this.u = u;
	        this.router = router;
	        var fb = new common_1.FormBuilder();
	        this.signinForm = fb.group({
	            email: ['', common_1.Validators.required],
	            password: ['', common_1.Validators.required]
	        });
	        this.error = '';
	    }
	    Signin.prototype.authenticate = function (provider) {
	        this.auth.authenticate(provider)
	            .subscribe();
	    };
	    Signin.prototype.submit = function (data) {
	        var _this = this;
	        if (this.signinForm.valid) {
	            //  alert('valid');
	            //alert(this.u);
	            var sendData = {
	                email: data.email,
	                password: data.password,
	                username: data.email
	            };
	            console.log(sendData);
	            this.u.verify(sendData)
	                .subscribe(function (res) {
	                //console.log('ssss');
	                //console.log(res);
	                console.log(res._id);
	                _this.u.id = res._id;
	                if (_this.u.id) {
	                    _this.u.email = res.email;
	                    _this.u.isLogged = true;
	                    //                    this.router.navigate(['/home']);
	                    console.log('going to home');
	                    _this.router.parent.navigate(['Home']);
	                }
	            });
	        }
	    }; //submit
	    Signin = __decorate([
	        core_1.Component({
	            selector: 'signin',
	            template: __webpack_require__(585),
	            //  providers: [Router],
	            directives: [
	                sidenav_1.MD_SIDENAV_DIRECTIVES,
	                card_1.MD_CARD_DIRECTIVES,
	                toolbar_1.MdToolbar,
	                button_1.MdButton,
	                checkbox_1.MdCheckbox,
	                input_1.MD_INPUT_DIRECTIVES,
	                progress_bar_1.MdProgressBar
	            ]
	        }), 
	        __metadata('design:paramtypes', [ng2_ui_auth_1.Auth, user_service_1.UserService, router_deprecated_1.Router])
	    ], Signin);
	    return Signin;
	}());
	exports.Signin = Signin;
	

/***/ },
/* 541 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var common_1 = __webpack_require__(7);
	//import {MATERIAL_DIRECTIVES} from 'ng2-material';
	//import {RouterLink} from '@angular/router';
	//import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from "ng2-material";
	//import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
	//import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
	var sidenav_1 = __webpack_require__(61);
	var toolbar_1 = __webpack_require__(62);
	var button_1 = __webpack_require__(73);
	var checkbox_1 = __webpack_require__(59);
	//import {MdRadioButton} from '@angular2-material/radio';
	//import {MdRadioDispatcher} from '@angular2-material/radio/radio_dispatcher';
	//import {MdSpinner} from '@angular2-material/progress-circle';
	var progress_bar_1 = __webpack_require__(102);
	var card_1 = __webpack_require__(74);
	var input_1 = __webpack_require__(75);
	//import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
	var user_service_1 = __webpack_require__(23);
	var Signup = (function () {
	    function Signup(u) {
	        //super();
	        this.u = u;
	        var fb = new common_1.FormBuilder();
	        this.signupForm = fb.group({
	            email: ['', common_1.Validators.required],
	            password: ['', common_1.Validators.required]
	        });
	        this.error = '';
	    }
	    Signup.prototype.signup = function (data) {
	        //Accounts.createUser({ email: credentials.email, password: credentials.password}, (err) => {
	        //alert(data.email);
	        var _this = this;
	        if (this.signupForm.valid) {
	            //  alert('valid');
	            //alert(this.u);
	            var sendData = {
	                email: data.email,
	                password: data.password,
	                username: data.email
	            };
	            console.log(sendData);
	            this.u.create(sendData)
	                .subscribe(function (res) {
	                //console.log('ssss');
	                //console.log(res);
	                console.log(res._id);
	                _this.u.id = res._id;
	                if (_this.u.id) {
	                    _this.u.email = res.email;
	                    _this.u.isLogged = true;
	                }
	                //alert(res);  
	            });
	            //alert(a);
	            //console.log('kkk');
	            /*
	            this.u.create(sendData , (err) => {
	               if (err) {
	                  //  this.error = err;
	              }
	          else {
	              // this.router.navigate(['/PartiesList']);
	          }
	            })*/
	            ;
	        }
	    };
	    Signup = __decorate([
	        core_1.Component({
	            selector: 'signup',
	            template: __webpack_require__(586),
	            directives: [
	                sidenav_1.MD_SIDENAV_DIRECTIVES,
	                card_1.MD_CARD_DIRECTIVES,
	                toolbar_1.MdToolbar,
	                button_1.MdButton,
	                checkbox_1.MdCheckbox,
	                //    MdRadioButton,
	                //   MdSpinner,
	                input_1.MD_INPUT_DIRECTIVES,
	                //  MD_LIST_DIRECTIVES,
	                progress_bar_1.MdProgressBar,
	            ]
	        }), 
	        __metadata('design:paramtypes', [user_service_1.UserService])
	    ], Signup);
	    return Signup;
	}());
	exports.Signup = Signup;
	

/***/ },
/* 542 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var list_1 = __webpack_require__(60);
	var CartLine = (function () {
	    function CartLine() {
	        this.shops = [];
	        this.items = [];
	        this.para = '';
	    }
	    CartLine.prototype.selectItem = function (item) { };
	    CartLine.prototype.remove = function () {
	        alert('removing');
	        this.item.removed = true;
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], CartLine.prototype, "showMap", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Array)
	    ], CartLine.prototype, "shops", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Array)
	    ], CartLine.prototype, "items", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], CartLine.prototype, "para", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], CartLine.prototype, "item", void 0);
	    CartLine = __decorate([
	        core_1.Component({
	            selector: 'cart-line',
	            providers: [],
	            directives: [
	                //        ANGULAR2_GOOGLE_MAPS_DIRECTIVES,
	                list_1.MdList,
	                list_1.MdListItem
	            ],
	            pipes: [],
	            styles: [],
	            template: __webpack_require__(587)
	        }), 
	        __metadata('design:paramtypes', [])
	    ], CartLine);
	    return CartLine;
	}());
	exports.CartLine = CartLine;
	

/***/ },
/* 543 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var product_service_1 = __webpack_require__(94);
	var shop_service_1 = __webpack_require__(67);
	// We `import` `http` into our `ProductService` but we can only
	// specify providers within our component
	var http_1 = __webpack_require__(21);
	var user_service_1 = __webpack_require__(23);
	var core_2 = __webpack_require__(27);
	var core_3 = __webpack_require__(27);
	var ng2_material_1 = __webpack_require__(72);
	//import {Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig, RouteParams} from
	//'@angular/router';
	var router_deprecated_1 = __webpack_require__(34);
	var common_1 = __webpack_require__(7);
	var line_component_1 = __webpack_require__(542);
	// Create metadata with the `@Component` decorator
	var CartList = (function () {
	    function CartList(params, productService, shopService, u) {
	        this.params = params;
	        this.productService = productService;
	        this.shopService = shopService;
	        this.u = u;
	        // Initialize our `productData.text` to an empty `string`
	        this.productData = {
	            text: ''
	        };
	        this.url = 'https://google.com/';
	        this.latitude = 51.678418;
	        this.longitude = 7.809007;
	        this.zoom = 16;
	        this.isPickup = false;
	        this.isDelivery = false;
	        this.isVeg = true;
	        this.mode = '';
	        this.currentItem = { text: '', userId: '' };
	        this.products = [];
	        this.items = [];
	        this.items = this.u.cartItems;
	        var fb = new common_1.FormBuilder();
	        this.myForm = fb.group({
	            title: ['', common_1.Validators.required],
	            cuisine: ['', common_1.Validators.required],
	            price: ['', common_1.Validators.required],
	            url: [''],
	            imageUrl: [''],
	            image: [''],
	            isVeg: [''],
	            isDelivery: [''],
	            isPickup: ['']
	        });
	    }
	    CartList.prototype.order = function () {
	        alert('order');
	        this.u.order().subscribe(function (res) {
	            alert('Contine Shoping');
	        });
	    };
	    CartList = __decorate([
	        core_1.Component({
	            // HTML tag for specifying this component
	            selector: 'cart-list',
	            //    providers: [...HTTP_PROVIDERS, ProductService],
	            providers: http_1.HTTP_PROVIDERS.concat([
	                product_service_1.ProductService,
	                shop_service_1.ShopService,
	                core_2.ANGULAR2_GOOGLE_MAPS_PROVIDERS,
	            ]),
	            directives: [
	                ng2_material_1.MdSwitch,
	                core_3.ANGULAR2_GOOGLE_MAPS_DIRECTIVES,
	                line_component_1.CartLine
	            ],
	            //encapsulation: ViewEncapsulation.None,
	            pipes: [],
	            styles: ["\n    .sebm-google-map-container {\n      height: 200px;\n    }\n  "],
	            template: __webpack_require__(588)
	        }), 
	        __metadata('design:paramtypes', [router_deprecated_1.RouteParams, product_service_1.ProductService, shop_service_1.ShopService, user_service_1.UserService])
	    ], CartList);
	    return CartList;
	}());
	exports.CartList = CartList;
	

/***/ },
/* 544 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var core_2 = __webpack_require__(1);
	var filterItemsPipe = (function () {
	    function filterItemsPipe() {
	    }
	    filterItemsPipe.prototype.transform = function (items, like) {
	        return items.filter(function (item) { return item.startsWith(like); });
	    };
	    filterItemsPipe = __decorate([
	        core_2.Pipe({
	            name: 'filterItems',
	            pure: false
	        }), 
	        __metadata('design:paramtypes', [])
	    ], filterItemsPipe);
	    return filterItemsPipe;
	}());
	exports.filterItemsPipe = filterItemsPipe;
	var MdDropdown = (function () {
	    function MdDropdown() {
	        this.title = '';
	        this.items = ['C', 'D'];
	        this.showPopup = true;
	        //private items = ['Apple', 'Orange', 'Banana', 'Apple', 'Orange', 'Banana', 'Apple', 'Orange', 'Banana', 'Apple', 'Orange', 'Banana'];
	        this.itemText = '';
	        this.currentItem = 'A';
	    }
	    MdDropdown.prototype.toggle = function () {
	        this.showPopup = !this.showPopup;
	    };
	    MdDropdown.prototype.select = function (item) {
	        alert('select');
	        this.itemText = item;
	        this.currentItem = item;
	        this.showPopup = false;
	    };
	    MdDropdown.prototype.change = function ($event) {
	        this.showPopup = true;
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Array)
	    ], MdDropdown.prototype, "items", void 0);
	    MdDropdown = __decorate([
	        core_1.Component({
	            moduleId: module.id,
	            selector: 'md-dropdown',
	            template: __webpack_require__(592),
	            styles: [__webpack_require__(591)],
	            pipes: [filterItemsPipe]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], MdDropdown);
	    return MdDropdown;
	}());
	exports.MdDropdown = MdDropdown;
	

/***/ },
/* 545 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	// webpack html imports
	var template = __webpack_require__(593);
	var Demo = (function () {
	    function Demo() {
	    }
	    Demo = __decorate([
	        core_1.Component({
	            selector: 'demo',
	            template: template,
	            directives: []
	        }), 
	        __metadata('design:paramtypes', [])
	    ], Demo);
	    return Demo;
	}());
	exports.Demo = Demo;
	

/***/ },
/* 546 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var common_1 = __webpack_require__(7);
	var ng2_file_upload_1 = __webpack_require__(837);
	// webpack html imports
	var template = __webpack_require__(594);
	var URL = '/api/upload';
	// const URL = 'http://localhost:8080/api/upload';
	var FileUpload = (function () {
	    function FileUpload() {
	        this.uploader = new ng2_file_upload_1.FileUploader({ url: URL });
	        this.hasBaseDropZoneOver = false;
	        this.hasAnotherDropZoneOver = false;
	    }
	    FileUpload.prototype.fileOverBase = function (e) {
	        this.hasBaseDropZoneOver = e;
	    };
	    FileUpload.prototype.fileOverAnother = function (e) {
	        this.hasAnotherDropZoneOver = e;
	    };
	    FileUpload = __decorate([
	        core_1.Component({
	            selector: 'file-upload',
	            template: template,
	            directives: [ng2_file_upload_1.FILE_UPLOAD_DIRECTIVES, common_1.NgClass, common_1.NgStyle, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], FileUpload);
	    return FileUpload;
	}());
	exports.FileUpload = FileUpload;
	

/***/ },
/* 547 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(548));
	

/***/ },
/* 548 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	/*
	 * Directive
	 * XLarge is a simple directive to show how one is made
	 */
	var XLarge = (function () {
	    function XLarge(element, renderer) {
	        // simple DOM manipulation to set font size to x-large
	        // `nativeElement` is the direct reference to the DOM element
	        // element.nativeElement.style.fontSize = 'x-large';
	        // for server/webworker support use the renderer
	        renderer.setElementStyle(element.nativeElement, 'fontSize', 'x-large');
	    }
	    XLarge = __decorate([
	        core_1.Directive({
	            selector: '[x-large]' // using [ ] means selecting attributes
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
	    ], XLarge);
	    return XLarge;
	}());
	exports.XLarge = XLarge;
	

/***/ },
/* 549 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var app_service_1 = __webpack_require__(142);
	var title_1 = __webpack_require__(551);
	var x_large_1 = __webpack_require__(547);
	var accordion_component_1 = __webpack_require__(364);
	var accordion_group_component_1 = __webpack_require__(569);
	// Import NgFor directive
	var common_1 = __webpack_require__(7);
	var Home = (function () {
	    // TypeScript public modifiers
	    function Home(appState, title) {
	        this.appState = appState;
	        this.title = title;
	        // Set our default values
	        this.localState = { value: '' };
	        this.isOpen = false;
	        this.groups = [
	            {
	                heading: 'Dynamic 1',
	                content: 'I am dynamic!'
	            },
	            {
	                heading: 'Dynamic 2',
	                content: 'Dynamic as well'
	            }
	        ];
	    }
	    Home.prototype.removeDynamic = function () {
	        this.groups.pop();
	    };
	    Home.prototype.ngOnInit = function () {
	        console.log('hello `Home` component');
	        // this.title.getData().subscribe(data => this.data = data);
	    };
	    Home.prototype.submitState = function (value) {
	        console.log('submitState', value);
	        this.appState.set('value', value);
	        this.localState.value = '';
	    };
	    Home = __decorate([
	        core_1.Component({
	            // The selector is what angular internally uses
	            // for `document.querySelectorAll(selector)` in our index.html
	            // where, in this case, selector is the string 'home'
	            selector: 'home',
	            // We need to tell Angular's Dependency Injection which providers are in our app.
	            providers: [
	                title_1.Title
	            ],
	            // We need to tell Angular's compiler which directives are in our template.
	            // Doing so will allow Angular to attach our behavior to an element
	            directives: [
	                x_large_1.XLarge,
	                accordion_component_1.Accordion,
	                accordion_group_component_1.AccordionGroup,
	                common_1.NgFor
	            ],
	            // We need to tell Angular's compiler which custom pipes are in our template.
	            pipes: [],
	            // Our list of styles in our component. We may add more to compose many styles together
	            styles: [__webpack_require__(595)],
	            // Every Angular template is first compiled by the browser before Angular runs it's compiler
	            template: __webpack_require__(596)
	        }), 
	        __metadata('design:paramtypes', [app_service_1.AppState, title_1.Title])
	    ], Home);
	    return Home;
	}());
	exports.Home = Home;
	

/***/ },
/* 550 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(549));
	

/***/ },
/* 551 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(552));
	

/***/ },
/* 552 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var http_1 = __webpack_require__(21);
	var Title = (function () {
	    function Title(http) {
	        this.http = http;
	        this.value = 'Angular 2';
	    }
	    Title.prototype.getData = function () {
	        console.log('Title#getData(): Get Data');
	        // return this.http.get('/assets/data.json')
	        // .map(res => res.json());
	        return {
	            value: 'Angular 2 MEAN Webpack Starter'
	        };
	    };
	    Title = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [http_1.Http])
	    ], Title);
	    return Title;
	}());
	exports.Title = Title;
	

/***/ },
/* 553 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	// App
	__export(__webpack_require__(539));
	__export(__webpack_require__(142));
	var app_service_2 = __webpack_require__(142);
	// Application wide providers
	exports.APP_PROVIDERS = [
	    app_service_2.AppState
	];
	//# Global Redux Stores
	//
	//** These `redux` `stores` are available in any template **
	// Import module to provide an app `store` for the life-cycle of the app
	var store_1 = __webpack_require__(230);
	// Import all of the files necessary for our `products` component
	var product_service_1 = __webpack_require__(363);
	var products_reducer_1 = __webpack_require__(564);
	var selected_product_reducer_1 = __webpack_require__(565);
	//# Application Redux Stores
	//
	//** Redux stores for use with our Angular 2 app **
	exports.APP_STORES = [
	    // These are the primary consumers of our app store
	    product_service_1.ProductService,
	    // Inititialize app store available to entire app
	    // and pass in our reducers.
	    // Notice that we are passing in an object that matches the
	    // `AppStore` interface
	    store_1.provideStore({ products: products_reducer_1.products, selectedProduct: selected_product_reducer_1.selectedProduct })
	];
	

/***/ },
/* 554 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var sidenav_1 = __webpack_require__(61);
	var toolbar_1 = __webpack_require__(62);
	var button_1 = __webpack_require__(73);
	var checkbox_1 = __webpack_require__(59);
	var radio_1 = __webpack_require__(164);
	var radio_dispatcher_1 = __webpack_require__(165);
	var progress_circle_1 = __webpack_require__(163);
	var progress_bar_1 = __webpack_require__(102);
	var card_1 = __webpack_require__(74);
	var input_1 = __webpack_require__(75);
	var list_1 = __webpack_require__(60);
	//import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
	var Material2App = (function () {
	    function Material2App() {
	        var _this = this;
	        this.foods = [
	            { name: 'Pizza', rating: 'Excellent' },
	            { name: 'Burritos', rating: 'Great' },
	            { name: 'French fries', rating: 'Pretty good' },
	        ];
	        this.progress = 0;
	        // Update the value for the progress-bar on an interval.
	        setInterval(function () {
	            _this.progress = (_this.progress + Math.floor(Math.random() * 4) + 1) % 100;
	        }, 200);
	    }
	    Material2App = __decorate([
	        core_1.Component({
	            moduleId: module.id,
	            selector: 'material2-app',
	            //templateUrl: 'material2-app.component.html',
	            template: __webpack_require__(597),
	            //template: '<h1>ff</h1>',
	            //styleUrls: ['material2-app.component.css'],
	            providers: [radio_dispatcher_1.MdRadioDispatcher,
	            ],
	            directives: [
	                sidenav_1.MD_SIDENAV_DIRECTIVES,
	                card_1.MD_CARD_DIRECTIVES,
	                toolbar_1.MdToolbar,
	                button_1.MdButton,
	                checkbox_1.MdCheckbox,
	                radio_1.MdRadioButton,
	                progress_circle_1.MdSpinner,
	                input_1.MD_INPUT_DIRECTIVES,
	                list_1.MD_LIST_DIRECTIVES,
	                progress_bar_1.MdProgressBar,
	            ],
	        }), 
	        __metadata('design:paramtypes', [])
	    ], Material2App);
	    return Material2App;
	}());
	exports.Material2App = Material2App;
	

/***/ },
/* 555 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var product_service_1 = __webpack_require__(94);
	var http_1 = __webpack_require__(21);
	var user_service_1 = __webpack_require__(23);
	var ng2_material_1 = __webpack_require__(72);
	var router_deprecated_1 = __webpack_require__(34);
	var common_1 = __webpack_require__(7);
	var ProductAdd = (function () {
	    function ProductAdd(params, router, productService, u) {
	        this.params = params;
	        this.router = router;
	        this.productService = productService;
	        this.u = u;
	        this.showForm = true;
	        this.url = 'https://google.com/';
	        this.latitude = 51.678418;
	        this.longitude = 7.809007;
	        this.zoom = 16;
	        this.isPickup = false;
	        this.isDelivery = false;
	        this.isVeg = true;
	        this.mode = '';
	        this.currentItem = { text: '', userId: '' };
	        this.products = [];
	        u.currency = 'Rs';
	        u.setLocation();
	        this.shopId = params.get('shopid');
	        console.log('In Product constructor!', this.shopId);
	        this.error = '';
	        productService.userId = u.id;
	        this.latitude = u.latitude;
	        this.longitude = u.longitude;
	        this.createForm();
	    }
	    ProductAdd.prototype.reset = function () {
	        this.createForm();
	    };
	    ProductAdd.prototype.createForm = function () {
	        //this.createForm();
	        var fb = new common_1.FormBuilder();
	        this.myForm = fb.group({
	            title: ['', common_1.Validators.required],
	            cuisine: ['', common_1.Validators.required],
	            price: ['', common_1.Validators.required],
	            url: [''],
	            imageUrl: [''],
	            image: [''],
	            isVeg: [''],
	            isDelivery: [''],
	            isPickup: ['']
	        });
	    };
	    ProductAdd.prototype.submit = function (data) {
	        var _this = this;
	        if (this.myForm.valid || 1) {
	            var sendData = {
	                title: data.title,
	                price: data.price,
	                rate: data.price,
	                currency: this.u.currency,
	                shopId: this.shopId,
	                isVeg: this.isVeg,
	                isDelivery: this.isDelivery,
	                isPickup: this.isPickup,
	                userId: this.u.id,
	                latitude: this.u.latitude,
	                longitude: this.u.longitude
	            };
	            this.productService.create(sendData)
	                .subscribe(function (res) {
	                console.log(res._id);
	                if (_this.u.id) {
	                    console.log('refresh form');
	                    _this.router.parent.navigate(['ProductAdd', { shopid: _this.shopId }]);
	                    _this.showForm = false;
	                    alert('Product Added!, You can add more!!');
	                    _this.showForm = true;
	                    _this.reset();
	                }
	            });
	        }
	    }; //submit
	    ProductAdd.prototype.mapClicked = function ($event) {
	        console.log('map click');
	        console.log($event.coords.lat, $event.coords.lng);
	        this.u.latitude = $event.coords.lat;
	        this.u.longitude = $event.coords.lng;
	    };
	    ProductAdd = __decorate([
	        core_1.Component({
	            selector: 'product-add',
	            providers: http_1.HTTP_PROVIDERS.concat([
	                product_service_1.ProductService,
	            ]),
	            directives: [
	                ng2_material_1.MdSwitch,
	            ],
	            //encapsulation: ViewEncapsulation.None,
	            pipes: [],
	            styles: [],
	            template: __webpack_require__(598)
	        }), 
	        __metadata('design:paramtypes', [router_deprecated_1.RouteParams, router_deprecated_1.Router, product_service_1.ProductService, user_service_1.UserService])
	    ], ProductAdd);
	    return ProductAdd;
	}());
	exports.ProductAdd = ProductAdd;
	

/***/ },
/* 556 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var product_service_1 = __webpack_require__(94);
	var shop_service_1 = __webpack_require__(67);
	var router_deprecated_1 = __webpack_require__(34);
	var http_1 = __webpack_require__(21);
	var user_service_1 = __webpack_require__(23);
	var common_1 = __webpack_require__(7);
	var ProductDetails = (function () {
	    function ProductDetails(params, router, productService, shopService, u) {
	        var _this = this;
	        this.params = params;
	        this.router = router;
	        this.productService = productService;
	        this.shopService = shopService;
	        this.u = u;
	        // Initialize our `productData.text` to an empty `string`
	        this.productData = {
	            text: ''
	        };
	        this.mode = '';
	        this.currentItem = { text: '', userId: '' };
	        this.products = [];
	        this.item = { title: '' };
	        this.shopId = '';
	        console.log('Product constructor go!');
	        var fb = new common_1.FormBuilder();
	        this.myForm = fb.group({
	            query: ['', common_1.Validators.required],
	            quantity: ['1'],
	            option1: [''],
	            option2: [''],
	            instructions: [''],
	            isDelivery: [''],
	            isPickup: ['']
	        });
	        this.error = '';
	        this.id = params.get('id');
	        this.shopId = '';
	        productService.getOne(this.id)
	            .subscribe(function (res) {
	            //#console.log('In Product Details constructor!', this.id);
	            //console.log('In Product Details constructor!', res);
	            _this.item = res;
	            _this.shopId = res.shopId;
	            console.log('In Details constructor shop id!', _this.id, res._id);
	            console.log('In Details constructor shop id!', res.shopId);
	            console.log('In Details constructor shop id!', _this.item);
	            //  console.log('In Details constructor shop id!', this.item.title);
	            //this.item.title = 'Paneer Butter Masala';
	            //this.title = this.item.title;
	            //this.shopId = this.item.shopId;
	            shopService.get(_this.shopId)
	                .subscribe(function (res) {
	                console.log('In Get Shop Product List constructor!', res);
	                _this.shop = res;
	            });
	        });
	    } // constructer
	    ProductDetails.prototype.submit = function (data) {
	        console.log('in submit of add cart', this.myForm.valid);
	        if (this.myForm.valid || 1) {
	            //alert('valid');
	            var sendData = {
	                productId: this.item._id,
	                title: this.item.title,
	                quantity: data.quantity,
	                instructions: data.instructions,
	                option1: data.option1,
	                option2: data.option2,
	                rate: this.item.rate,
	                //  currency: this.shop.currency,
	                shopId: this.shop._id,
	                shopTitle: this.shop.title
	            };
	            /*
	            console.log("shop", this.shop);
	            
	            console.log("adding to cart", sendData);
	            this.u.addToCart(sendData);
	            console.log("r-start");
	            console.log("Shop ID",this.shopId);
	            console.log("Shop ID Item", this.item.shopId);
	  
	            alert('Contine Shoping');
	            //this.router.parent.navigate(['PList', {shopid:this.shopId}]);
	            //console.log("r-start adding to cart");
	            */
	            this.u.addToCart(sendData)
	                .subscribe(function (res) {
	                alert('Contine Shoping');
	            });
	        }
	    }; //submit
	    ProductDetails = __decorate([
	        core_1.Component({
	            selector: 'product-details',
	            providers: http_1.HTTP_PROVIDERS.concat([product_service_1.ProductService, shop_service_1.ShopService]),
	            template: __webpack_require__(599)
	        }), 
	        __metadata('design:paramtypes', [router_deprecated_1.RouteParams, router_deprecated_1.Router, product_service_1.ProductService, shop_service_1.ShopService, user_service_1.UserService])
	    ], ProductDetails);
	    return ProductDetails;
	}());
	exports.ProductDetails = ProductDetails;
	

/***/ },
/* 557 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var list_1 = __webpack_require__(60);
	var ProductLine = (function () {
	    function ProductLine() {
	        this.shops = [];
	        this.items = [];
	        this.para = 'ddddd';
	        console.log("in ressss");
	        console.log("in ressss...", this.items);
	    }
	    ProductLine.prototype.selectItem = function (item) { };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], ProductLine.prototype, "showMap", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Array)
	    ], ProductLine.prototype, "shops", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Array)
	    ], ProductLine.prototype, "items", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], ProductLine.prototype, "para", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], ProductLine.prototype, "item", void 0);
	    ProductLine = __decorate([
	        core_1.Component({
	            selector: 'product-line',
	            providers: [],
	            directives: [
	                //        ANGULAR2_GOOGLE_MAPS_DIRECTIVES,
	                list_1.MdList,
	                list_1.MdListItem
	            ],
	            pipes: [],
	            styles: [],
	            template: __webpack_require__(600)
	        }), 
	        __metadata('design:paramtypes', [])
	    ], ProductLine);
	    return ProductLine;
	}());
	exports.ProductLine = ProductLine;
	

/***/ },
/* 558 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var product_service_1 = __webpack_require__(94);
	var shop_service_1 = __webpack_require__(67);
	// We `import` `http` into our `ProductService` but we can only
	// specify providers within our component
	var http_1 = __webpack_require__(21);
	var user_service_1 = __webpack_require__(23);
	var core_2 = __webpack_require__(27);
	var core_3 = __webpack_require__(27);
	var ng2_material_1 = __webpack_require__(72);
	//import {Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig, RouteParams} from
	//'@angular/router';
	var router_deprecated_1 = __webpack_require__(34);
	var common_1 = __webpack_require__(7);
	// Create metadata with the `@Component` decorator
	var ProductList = (function () {
	    function ProductList(params, productService, shopService, u) {
	        var _this = this;
	        this.params = params;
	        this.productService = productService;
	        this.shopService = shopService;
	        this.u = u;
	        this.shopId = 'aa';
	        // Initialize our `productData.text` to an empty `string`
	        this.productData = {
	            text: ''
	        };
	        this.url = 'https://google.com/';
	        this.latitude = 51.678418;
	        this.longitude = 7.809007;
	        this.zoom = 16;
	        this.isPickup = false;
	        this.isDelivery = false;
	        this.isVeg = true;
	        this.mode = '';
	        this.currentItem = { text: '', userId: '' };
	        this.products = [];
	        this.items = [];
	        console.log('In Product constructor!', params.get('shopid'));
	        console.log('In Product constructor!', params.get('id'));
	        // u.id = '574c5677c534abb86bf27452';
	        u.currency = 'Rs';
	        u.setLocation();
	        this.shopId = params.get('shopid');
	        if (!this.shopId) {
	            this.shopId = params.get('shopid');
	        }
	        console.log('In Product List constructor!', this.shopId);
	        this.shop = {};
	        this.shop.title = '..';
	        shopService.get(this.shopId)
	            .subscribe(function (res) {
	            console.log('In Get Shop Product List constructor!', res);
	            _this.shop = res;
	        });
	        productService.getProductsByShop(this.shopId)
	            .subscribe(function (res) {
	            console.log('In Product getProductsByShop!', res);
	            _this.items = res;
	        });
	        var fb = new common_1.FormBuilder();
	        this.myForm = fb.group({
	            title: ['', common_1.Validators.required],
	            cuisine: ['', common_1.Validators.required],
	            price: ['', common_1.Validators.required],
	            url: [''],
	            imageUrl: [''],
	            image: [''],
	            isVeg: [''],
	            isDelivery: [''],
	            isPickup: ['']
	        });
	        this.error = '';
	        //passing id
	        productService.userId = u.id;
	        this.latitude = u.latitude;
	        this.longitude = u.longitude;
	        //this.lng = u.longitude;
	        //this.products = [];
	        productService.getUserProducts(u.id)
	            .subscribe(function (res) {
	            // Populate our `product` array with the `response` data
	            _this.products = res;
	            // Reset `product` input
	            _this.productData.text = '';
	        });
	    }
	    ProductList.prototype.changeMode = function (newMode) {
	        this.mode = newMode;
	        //this.mode='edit';
	    };
	    ProductList.prototype.submit = function (data) {
	        var _this = this;
	        console.log('in submit of product add', this.myForm.valid);
	        if (this.myForm.valid || 1) {
	            alert('valid');
	            //alert(this.u);
	            var sendData = {
	                title: data.title,
	                price: data.price,
	                rate: data.price,
	                currency: this.u.currency,
	                shopId: this.shopId,
	                isVeg: this.isVeg,
	                isDelivery: this.isDelivery,
	                isPickup: this.isPickup,
	                userId: this.u.id,
	                latitude: this.u.latitude,
	                longitude: this.u.longitude
	            };
	            console.log("ddd", sendData);
	            this.productService.create(sendData)
	                .subscribe(function (res) {
	                //console.log('ssss');
	                //console.log(res);
	                console.log(res._id);
	                //this.u.id = res._id;
	                if (_this.u.id) {
	                    //  this.u.email = res.email;
	                    //this.u.isLogged = true;
	                    //                    this.router.navigate(['/home']);
	                    console.log('going to home');
	                }
	            });
	        }
	    }; //submit
	    ProductList.prototype.create = function () {
	        var _this = this;
	        this.currentItem.userId = this.u.id;
	        this.productService.create(this.currentItem)
	            .subscribe(function (res) {
	            // Populate our `product` array with the `response` data
	            _this.products = res;
	            // Reset `product` input
	            _this.productData.text = '';
	            _this.mode = '';
	        });
	    };
	    ProductList.prototype.save = function () {
	        this.create();
	    };
	    ProductList.prototype.selectItem = function (item) {
	        //this.u.productId = item._id;
	        //this.u.productTitle = item.title;
	        this.currentItem = item;
	        this.mode = 'edit';
	    };
	    ProductList.prototype.startEdit = function (item) {
	        this.currentItem = item;
	        this.mode = 'edit';
	    };
	    ProductList.prototype.delete = function (id) {
	        var _this = this;
	        this.productService.delete(id)
	            .subscribe(function (res) {
	            // Populate our `product` array with the `response` data
	            _this.products = res;
	        });
	    };
	    ProductList.prototype.mapClicked = function ($event) {
	        console.log('map click');
	        console.log($event.coords.lat, $event.coords.lng);
	        this.u.latitude = $event.coords.lat;
	        this.u.longitude = $event.coords.lng;
	    };
	    ProductList = __decorate([
	        core_1.Component({
	            // HTML tag for specifying this component
	            selector: 'product-list',
	            //    providers: [...HTTP_PROVIDERS, ProductService],
	            providers: http_1.HTTP_PROVIDERS.concat([
	                product_service_1.ProductService,
	                shop_service_1.ShopService,
	                core_2.ANGULAR2_GOOGLE_MAPS_PROVIDERS,
	            ]),
	            directives: [
	                ng2_material_1.MdSwitch,
	                core_3.ANGULAR2_GOOGLE_MAPS_DIRECTIVES,
	            ],
	            //encapsulation: ViewEncapsulation.None,
	            pipes: [],
	            styles: ["\n    .sebm-google-map-container {\n      height: 200px;\n    }\n  "],
	            template: __webpack_require__(601)
	        }), 
	        __metadata('design:paramtypes', [router_deprecated_1.RouteParams, product_service_1.ProductService, shop_service_1.ShopService, user_service_1.UserService])
	    ], ProductList);
	    return ProductList;
	}());
	exports.ProductList = ProductList;
	

/***/ },
/* 559 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var product_service_1 = __webpack_require__(94);
	var shop_service_1 = __webpack_require__(67);
	// We `import` `http` into our `ProductService` but we can only
	// specify providers within our component
	var http_1 = __webpack_require__(21);
	var user_service_1 = __webpack_require__(23);
	var core_2 = __webpack_require__(27);
	var core_3 = __webpack_require__(27);
	var ng2_material_1 = __webpack_require__(72);
	//import {Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig, RouteParams} from
	//'@angular/router';
	var router_deprecated_1 = __webpack_require__(34);
	var common_1 = __webpack_require__(7);
	var line_component_1 = __webpack_require__(557);
	// Create metadata with the `@Component` decorator
	var PList = (function () {
	    function PList(params, productService, shopService, u) {
	        var _this = this;
	        this.params = params;
	        this.productService = productService;
	        this.shopService = shopService;
	        this.u = u;
	        // Initialize our `productData.text` to an empty `string`
	        this.productData = {
	            text: ''
	        };
	        this.url = 'https://google.com/';
	        this.latitude = 51.678418;
	        this.longitude = 7.809007;
	        this.zoom = 16;
	        this.isPickup = false;
	        this.isDelivery = false;
	        this.isVeg = true;
	        this.mode = '';
	        this.currentItem = { text: '', userId: '' };
	        this.products = [];
	        this.items = [];
	        console.log('In Product constructor!', params.get('shopid'));
	        console.log('In Product constructor!', params.get('id'));
	        //u.id = '574c5677c534abb86bf27452';
	        u.currency = 'Rs';
	        u.setLocation();
	        this.shopId = params.get('shopid');
	        console.log('In Product List constructor!', this.shopId);
	        this.shop = {};
	        this.shop.title = '..';
	        shopService.get(this.shopId)
	            .subscribe(function (res) {
	            _this.shop = res;
	        });
	        productService.getProductsByShop(this.shopId)
	            .subscribe(function (res) {
	            _this.items = res;
	        });
	        var fb = new common_1.FormBuilder();
	        this.myForm = fb.group({
	            title: ['', common_1.Validators.required],
	            cuisine: ['', common_1.Validators.required],
	            price: ['', common_1.Validators.required],
	            url: [''],
	            imageUrl: [''],
	            image: [''],
	            isVeg: [''],
	            isDelivery: [''],
	            isPickup: ['']
	        });
	        this.error = '';
	        //passing id
	        productService.userId = u.id;
	        this.latitude = u.latitude;
	        this.longitude = u.longitude;
	        //this.lng = u.longitude;
	        //this.products = [];
	        productService.getUserProducts(u.id)
	            .subscribe(function (res) {
	            // Populate our `product` array with the `response` data
	            _this.products = res;
	            // Reset `product` input
	            _this.productData.text = '';
	        });
	    }
	    PList.prototype.changeMode = function (newMode) {
	        this.mode = newMode;
	        //this.mode='edit';
	    };
	    PList.prototype.submit = function (data) {
	        var _this = this;
	        console.log('in submit of product add', this.myForm.valid);
	        if (this.myForm.valid || 1) {
	            alert('valid');
	            //alert(this.u);
	            var sendData = {
	                title: data.title,
	                price: data.price,
	                rate: data.price,
	                currency: this.u.currency,
	                shopId: this.shopId,
	                isVeg: this.isVeg,
	                isDelivery: this.isDelivery,
	                isPickup: this.isPickup,
	                userId: this.u.id,
	                latitude: this.u.latitude,
	                longitude: this.u.longitude
	            };
	            console.log("ddd", sendData);
	            this.productService.create(sendData)
	                .subscribe(function (res) {
	                //console.log('ssss');
	                //console.log(res);
	                console.log(res._id);
	                //this.u.id = res._id;
	                if (_this.u.id) {
	                    //  this.u.email = res.email;
	                    //this.u.isLogged = true;
	                    //                    this.router.navigate(['/home']);
	                    console.log('going to home');
	                }
	            });
	        }
	    }; //submit
	    PList.prototype.create = function () {
	        var _this = this;
	        this.currentItem.userId = this.u.id;
	        this.productService.create(this.currentItem)
	            .subscribe(function (res) {
	            // Populate our `product` array with the `response` data
	            _this.products = res;
	            // Reset `product` input
	            _this.productData.text = '';
	            _this.mode = '';
	        });
	    };
	    PList.prototype.save = function () {
	        this.create();
	    };
	    PList.prototype.selectItem = function (item) {
	        //this.u.productId = item._id;
	        //this.u.productTitle = item.title;
	        this.currentItem = item;
	        this.mode = 'edit';
	    };
	    PList.prototype.startEdit = function (item) {
	        this.currentItem = item;
	        this.mode = 'edit';
	    };
	    PList.prototype.delete = function (id) {
	        var _this = this;
	        this.productService.delete(id)
	            .subscribe(function (res) {
	            // Populate our `product` array with the `response` data
	            _this.products = res;
	        });
	    };
	    PList.prototype.mapClicked = function ($event) {
	        console.log('map click');
	        console.log($event.coords.lat, $event.coords.lng);
	        this.u.latitude = $event.coords.lat;
	        this.u.longitude = $event.coords.lng;
	    };
	    PList = __decorate([
	        core_1.Component({
	            // HTML tag for specifying this component
	            selector: 'p-list',
	            //    providers: [...HTTP_PROVIDERS, ProductService],
	            providers: http_1.HTTP_PROVIDERS.concat([
	                product_service_1.ProductService,
	                shop_service_1.ShopService,
	                core_2.ANGULAR2_GOOGLE_MAPS_PROVIDERS,
	            ]),
	            directives: [
	                ng2_material_1.MdSwitch,
	                core_3.ANGULAR2_GOOGLE_MAPS_DIRECTIVES,
	                line_component_1.ProductLine
	            ],
	            //encapsulation: ViewEncapsulation.None,
	            pipes: [],
	            styles: ["\n    .sebm-google-map-container {\n      height: 200px;\n    }\n  "],
	            template: __webpack_require__(602)
	        }), 
	        __metadata('design:paramtypes', [router_deprecated_1.RouteParams, product_service_1.ProductService, shop_service_1.ShopService, user_service_1.UserService])
	    ], PList);
	    return PList;
	}());
	exports.PList = PList;
	

/***/ },
/* 560 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var product_service_1 = __webpack_require__(94);
	// We `import` `http` into our `ProductService` but we can only
	// specify providers within our component
	var http_1 = __webpack_require__(21);
	var user_service_1 = __webpack_require__(23);
	// Create metadata with the `@Component` decorator
	var Product = (function () {
	    function Product(productService, u) {
	        var _this = this;
	        this.productService = productService;
	        this.u = u;
	        // Initialize our `productData.text` to an empty `string`
	        this.productData = {
	            text: ''
	        };
	        this.mode = '';
	        this.currentItem = { text: '', userId: '' };
	        this.products = [];
	        console.log('Product constructor go!');
	        //passing id
	        productService.userId = u.id;
	        productService.userId = u.id;
	        //this.products = [];
	        productService.getUserProducts(u.id)
	            .subscribe(function (res) {
	            console.log(res);
	            // Populate our `product` array with the `response` data
	            _this.products = res;
	            // Reset `product` input
	            _this.productData.text = '';
	        });
	    }
	    Product.prototype.changeMode = function (newMode) {
	        this.mode = newMode;
	        //this.mode='edit';
	    };
	    Product.prototype.create = function () {
	        var _this = this;
	        this.currentItem.userId = this.u.id;
	        this.productService.create(this.currentItem)
	            .subscribe(function (res) {
	            console.log(res);
	            // Populate our `product` array with the `response` data
	            //            this.products = res;
	            // Reset `product` input
	            _this.productData.text = '';
	            _this.mode = '';
	        });
	    };
	    Product.prototype.save = function () {
	        this.create();
	    };
	    Product.prototype.selectItem = function (item) {
	        //this.u.productId = item._id;
	        //this.u.productTitle = item.title;
	        this.currentItem = item;
	        this.mode = 'edit';
	    };
	    Product.prototype.startEdit = function (item) {
	        this.currentItem = item;
	        this.mode = 'edit';
	    };
	    Product.prototype.delete = function (id) {
	        var _this = this;
	        this.productService.delete(id)
	            .subscribe(function (res) {
	            // Populate our `product` array with the `response` data
	            _this.products = res;
	        });
	    };
	    Product = __decorate([
	        core_1.Component({
	            // HTML tag for specifying this component
	            selector: 'product',
	            // Let Angular 2 know about `Http` and `ProductService`
	            providers: http_1.HTTP_PROVIDERS.concat([product_service_1.ProductService]),
	            template: __webpack_require__(603)
	        }), 
	        __metadata('design:paramtypes', [product_service_1.ProductService, user_service_1.UserService])
	    ], Product);
	    return Product;
	}());
	exports.Product = Product;
	

/***/ },
/* 561 */
/***/ function(module, exports, __webpack_require__) {

	// ```
	// products.component.js
	// (c) 2016 David Newman
	// blackshuriken@hotmail.com
	// products.component.js may be freely distributed under the MIT license
	// ```
	"use strict";
	// # Products Component
	var core_1 = __webpack_require__(1);
	//import {Rating} from './rating.component';
	var ProductDetails = (function () {
	    function ProductDetails() {
	        // Allow the user to save/delete a `product or cancel the
	        // operation. Flow events up from here.
	        this.saved = new core_1.EventEmitter();
	        this.cancelled = new core_1.EventEmitter();
	    }
	    Object.defineProperty(ProductDetails.prototype, "_product", {
	        // Assign our `product` to a locally scoped property
	        // Perform additional logic on every update via ES6 setter
	        // Create a copy of `_product` and assign it to `this.selectedProduct`
	        // which we will use to bind our form to
	        set: function (value) {
	            if (value)
	                this.originalTitle = value.title;
	            this.selectedProduct = Object.assign({}, value);
	            // DEBUG
	            console.log('this.selectedProduct: ');
	            console.log(this.selectedProduct);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    // Whenever the user needs to add a new `tag`, push an
	    // empty `tag` object to the `tags` array on the
	    // `selectedProduct`
	    ProductDetails.prototype.newTag = function () {
	        // blank `tag` object
	        var tag = {
	            name: ''
	        };
	        // Check to see if the `tags` array exists before
	        // attempting to push a `tag` to it
	        if (!this.selectedProduct.tags)
	            this.selectedProduct.tags = [];
	        this.selectedProduct.tags.push(tag);
	    };
	    // Whenever the user needs to add a new `ingredient`, push an
	    // empty `ingredient` object to the `ingredient` array on the
	    // `selectedProduct`
	    ProductDetails.prototype.newIngredient = function () {
	        // blank `ingredient` object
	        var ingredient = {
	            amount: '',
	            unit: '',
	            name: ''
	        };
	        // Check to see if the `ingredients` array exists before
	        // attempting to push an `ingredient` to it
	        if (!this.selectedProduct.ingredients)
	            this.selectedProduct.ingredients = [];
	        this.selectedProduct.ingredients.push(ingredient);
	    };
	    // Whenever the user needs to add a new `direction`, push an
	    // empty `direction` object to the `direction` array on the
	    // `selectedProduct`
	    ProductDetails.prototype.newDirection = function () {
	        // blank `direction` object
	        var direction = {
	            step: ''
	        };
	        // Check to see if the `directions` array exists before
	        // attempting to push a `direction` to it
	        if (!this.selectedProduct.directions)
	            this.selectedProduct.directions = [];
	        this.selectedProduct.directions.push(direction);
	    };
	    ProductDetails.prototype.onUpdate = function (value) {
	        // Set the value of the selected product's rating to the
	        // value passed up from the `rating` component
	        this.selectedProduct.rating = value;
	    };
	    ProductDetails.prototype.deleteTag = function (tag) {
	        // loop through all of the `tags` in the `selectedProduct`
	        for (var i = 0; i < this.selectedProduct.tags.length; i++) {
	            // if the `tag` at the current index matches that of the one
	            // the user is trying to delete
	            if (this.selectedProduct.tags[i] === tag) {
	                // delete the `tag` at the current index
	                this.selectedProduct.tags.splice(i, 1);
	            }
	        }
	    };
	    ProductDetails.prototype.deleteIngredient = function (ingredient) {
	        // loop through all of the `ingredients` in the `selectedProduct`
	        for (var i = 0; i < this.selectedProduct.ingredients.length; i++) {
	            // if the `ingredient` at the current index matches that of the one
	            // the user is trying to delete
	            if (this.selectedProduct.ingredients[i] === ingredient) {
	                // delete the `ingredient` at the current index
	                this.selectedProduct.ingredients.splice(i, 1);
	            }
	        }
	    };
	    ProductDetails.prototype.deleteDirection = function (step) {
	        // loop through all of the `directions` in the `selectedProduct`
	        for (var i = 0; i < this.selectedProduct.directions.length; i++) {
	            // if the `direction` at the current index matches that of the one
	            // the user is trying to delete
	            if (this.selectedProduct.directions[i] === step) {
	                // delete the `direction` at the current index
	                this.selectedProduct.directions.splice(i, 1);
	            }
	        }
	    };
	    __decorate([
	        core_1.Input('product'), 
	        __metadata('design:type', Object), 
	        __metadata('design:paramtypes', [Object])
	    ], ProductDetails.prototype, "_product", null);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], ProductDetails.prototype, "saved", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], ProductDetails.prototype, "cancelled", void 0);
	    ProductDetails = __decorate([
	        core_1.Component({
	            selector: 'product-detail',
	            template: __webpack_require__(604),
	            directives: []
	        }), 
	        __metadata('design:paramtypes', [])
	    ], ProductDetails);
	    return ProductDetails;
	}());
	exports.ProductDetails = ProductDetails;
	

/***/ },
/* 562 */
/***/ function(module, exports, __webpack_require__) {

	// ```
	// product-list.component.js
	// (c) 2016 David Newman
	// blackshuriken@hotmail.com
	// product-list.component.js may be freely distributed under the MIT license
	// ```
	"use strict";
	// # Product List
	var core_1 = __webpack_require__(1);
	//import {Rating} from './rating.component';
	var ProductList = (function () {
	    function ProductList() {
	        // Two event outputs for when a product is selected or deleted
	        this.selected = new core_1.EventEmitter();
	        this.deleted = new core_1.EventEmitter();
	    }
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Array)
	    ], ProductList.prototype, "products", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], ProductList.prototype, "selected", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], ProductList.prototype, "deleted", void 0);
	    ProductList = __decorate([
	        core_1.Component({
	            selector: 'product-list',
	            template: __webpack_require__(605),
	            directives: []
	        }), 
	        __metadata('design:paramtypes', [])
	    ], ProductList);
	    return ProductList;
	}());
	exports.ProductList = ProductList;
	

/***/ },
/* 563 */
/***/ function(module, exports, __webpack_require__) {

	// ```
	// products.component.js
	// (c) 2016 David Newman
	// blackshuriken@hotmail.com
	// products.component.js may be freely distributed under the MIT license
	// ```
	"use strict";
	// # Products Component
	var core_1 = __webpack_require__(1);
	var store_1 = __webpack_require__(230);
	var product_service_1 = __webpack_require__(363);
	var product_details_component_1 = __webpack_require__(561);
	var product_list_component_1 = __webpack_require__(562);
	var Products = (function () {
	    function Products(productService, store) {
	        this.productService = productService;
	        this.store = store;
	        this.mode = '';
	        // Bind to the `products` observable on `ProductService`
	        this.products = productService.products;
	        // Bind the `selectedProduct` observable from the store
	        this.selectedProduct = store.select('selectedProduct');
	        // DEBUG
	        this.selectedProduct.subscribe(function (v) { return console.log(v); });
	        // `productService.loadProducts` dispatches the `ADD_PRODUCTS` event
	        // to our store which in turn updates the `products` collection
	        productService.loadProducts();
	    }
	    Products.prototype.changeMode = function (newMode) {
	        this.mode = newMode;
	        //this.mode='edit';
	    };
	    Products.prototype.selectProduct = function (product) {
	        this.store.dispatch({
	            type: 'SELECT_PRODUCT',
	            payload: product
	        });
	    };
	    Products.prototype.deleteProduct = function (product) {
	        this.productService.deleteProduct(product);
	    };
	    Products.prototype.resetProduct = function () {
	        var emptyProduct = {
	            _id: null,
	            tags: [],
	            //amount:0,
	            title: '',
	            amount: '0',
	            description: '',
	            rating: null,
	            creator: '',
	            ingredients: [],
	            directions: []
	        };
	        this.store.dispatch({
	            type: 'SELECT_PRODUCT',
	            payload: emptyProduct
	        });
	    };
	    Products.prototype.saveProduct = function (product) {
	        this.productService.saveProduct(product);
	        this.resetProduct();
	    };
	    Products = __decorate([
	        core_1.Component({
	            selector: 'products',
	            providers: [],
	            template: __webpack_require__(606),
	            directives: [product_list_component_1.ProductList, product_details_component_1.ProductDetails],
	            changeDetection: core_1.ChangeDetectionStrategy.OnPush
	        }), 
	        __metadata('design:paramtypes', [product_service_1.ProductService, store_1.Store])
	    ], Products);
	    return Products;
	}());
	exports.Products = Products;
	

/***/ },
/* 564 */
/***/ function(module, exports) {

	// ```
	// products.reducer.js
	// (c) 2016 David Newman
	// blackshuriken@hotmail.com
	// products.reducer.js may be freely distributed under the MIT license
	// ```
	"use strict";
	// # Redux reducer for `products`
	// A traditional `reducer` is a function which takes a `state`
	// object and an action to perform.
	// `ngrx` reducers work differently:
	//   * the second parameter is an object with the type of
	//     action to perform and the payload for that action
	// The `products` reducer performs actions on our list of `products`
	// Notice that we set `state` to a default value to initialize
	// smoothly
	exports.products = function (state, _a) {
	    if (state === void 0) { state = []; }
	    var type = _a.type, payload = _a.payload;
	    // DEBUG
	    console.log('Products reducer hit! type: ');
	    console.log(type);
	    console.log('payload: ');
	    console.log(payload);
	    console.log('state: ');
	    console.log(state);
	    switch (type) {
	        // `ADD_PRODUCTS` returns whatever collection passed in as a
	        // new array
	        case 'ADD_PRODUCTS':
	            return payload;
	        // `CREATE_PRODUCT` returns a new array by concatenating the
	        // existing product array with our new product
	        case 'CREATE_PRODUCT':
	            return state.concat([payload]);
	        // `UPDATE_PRODUCT` returns a new array by mapping to the current
	        // array, locating the product to update and cloning to create
	        // a new object using `Object.assign`
	        case 'UPDATE_PRODUCT':
	            return state.map(function (product) {
	                return product._id === payload._id
	                    ? Object.assign({}, product, payload) : product;
	            });
	        // `DELETE_PRODUCT` returns a new array by filtering out the
	        // `product` that we want to delete
	        case 'DELETE_PRODUCT':
	            return state.filter(function (product) {
	                return product._id !== payload._id;
	            });
	        default:
	            return state;
	    }
	};
	

/***/ },
/* 565 */
/***/ function(module, exports) {

	// ```
	// selected-product.reducer.js
	// (c) 2016 David Newman
	// blackshuriken@hotmail.com
	// selected-product.reducer.js may be freely distributed under the MIT license
	// ```
	"use strict";
	// # Redux interface/reducer for `products`
	// The `selected product` reducer handles the currently
	// selected product
	exports.selectedProduct = function (state, _a) {
	    if (state === void 0) { state = null; }
	    var type = _a.type, payload = _a.payload;
	    // DEBUG
	    console.log('selected product reducer hit! type: ');
	    console.log(type);
	    console.log('payload: ');
	    console.log(payload);
	    console.log('state: ');
	    console.log(state);
	    switch (type) {
	        // When an `event` from our store is dispatched with an action
	        // type of `SELECT_PRODUCT`, it will hit this switch case
	        case 'SELECT_PRODUCT':
	            return payload;
	        default:
	            return state;
	    }
	};
	

/***/ },
/* 566 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var common_1 = __webpack_require__(7);
	var sidenav_1 = __webpack_require__(61);
	var toolbar_1 = __webpack_require__(62);
	var button_1 = __webpack_require__(73);
	var checkbox_1 = __webpack_require__(59);
	var card_1 = __webpack_require__(74);
	var input_1 = __webpack_require__(75);
	var user_service_1 = __webpack_require__(23);
	var Avatar = (function () {
	    function Avatar(u) {
	        //super();
	        this.u = u;
	        var fb = new common_1.FormBuilder();
	        this.thisForm = fb.group({
	            email: [''],
	            password: ['']
	        });
	        this.error = '';
	    }
	    Avatar.prototype.submit = function (data) {
	        var _this = this;
	        if (this.thisForm.valid || 1) {
	            var sendData = {
	                email: data.email,
	                password: data.password,
	                username: data.email
	            };
	            console.log(sendData);
	            this.u.create(sendData)
	                .subscribe(function (res) {
	                console.log(res._id);
	                _this.u.id = res._id;
	                if (_this.u.id) {
	                    _this.u.email = res.email;
	                    _this.u.isLogged = true;
	                }
	            });
	        }
	    };
	    Avatar = __decorate([
	        core_1.Component({
	            selector: 'avatar',
	            template: __webpack_require__(607),
	            directives: [
	                sidenav_1.MD_SIDENAV_DIRECTIVES,
	                card_1.MD_CARD_DIRECTIVES,
	                toolbar_1.MdToolbar,
	                button_1.MdButton,
	                checkbox_1.MdCheckbox,
	                input_1.MD_INPUT_DIRECTIVES,
	            ]
	        }), 
	        __metadata('design:paramtypes', [user_service_1.UserService])
	    ], Avatar);
	    return Avatar;
	}());
	exports.Avatar = Avatar;
	

/***/ },
/* 567 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var common_1 = __webpack_require__(7);
	var sidenav_1 = __webpack_require__(61);
	var toolbar_1 = __webpack_require__(62);
	var button_1 = __webpack_require__(73);
	var checkbox_1 = __webpack_require__(59);
	var card_1 = __webpack_require__(74);
	var input_1 = __webpack_require__(75);
	var user_service_1 = __webpack_require__(23);
	var Profile = (function () {
	    //public cusine: string = '';
	    function Profile(u) {
	        //super();
	        this.u = u;
	        this.firstName = '';
	        this.lastName = '';
	        this.address1 = '';
	        this.address2 = '';
	        this.city = '';
	        this.country = '';
	        this.zip = '';
	        this.mobile = '';
	        this.phone = '';
	        this.gmail = '';
	        this.facebook = '';
	        this.profile_url = '';
	        this.url = '';
	        this.delivery = true;
	        this.pickup = true;
	        this.veg = true;
	        this.cusine = '';
	        var fb = new common_1.FormBuilder();
	        this.thisForm = fb.group({
	            firstName: [''],
	            lastName: [''],
	            address1: [''],
	            address2: [''],
	            city: [''],
	            country: [''],
	            zip: [''],
	            mobile: [''],
	            phone: [''],
	            gmail: [''],
	            facebook: [''],
	            profile_url: [''],
	            url: [''],
	            delivery: [true],
	            pickup: [true],
	            veg: [true],
	            cusine: ['']
	        });
	        this.error = '';
	    }
	    Profile.prototype.submit = function (data) {
	        var _this = this;
	        if (this.thisForm.valid || 1) {
	            var sendData = data;
	            console.log(sendData);
	            this.u.updateProfile(sendData)
	                .subscribe(function (res) {
	                console.log(res._id);
	                //this.u.id = res._id;
	                if (_this.u.id) {
	                }
	            });
	        }
	    };
	    Profile = __decorate([
	        core_1.Component({
	            selector: 'profile',
	            template: __webpack_require__(608),
	            directives: [
	                sidenav_1.MD_SIDENAV_DIRECTIVES,
	                card_1.MD_CARD_DIRECTIVES,
	                toolbar_1.MdToolbar,
	                button_1.MdButton,
	                checkbox_1.MdCheckbox,
	                input_1.MD_INPUT_DIRECTIVES,
	            ]
	        }), 
	        __metadata('design:paramtypes', [user_service_1.UserService])
	    ], Profile);
	    return Profile;
	}());
	exports.Profile = Profile;
	

/***/ },
/* 568 */
/***/ function(module, exports, __webpack_require__) {

	//auth.service.ts
	"use strict";
	var core_1 = __webpack_require__(1);
	var AuthService = (function () {
	    function AuthService() {
	    }
	    //lock = new Auth0Lock('YOUR_AUTH0_CLIENT_ID', 'YOUR_AUTH0_DOMAIN');
	    //lock = new Auth0Lock('tN9xVfIaUEeUCrFxleVwhIoObMbSe9be', 'ruchi.auth0.com')
	    AuthService.prototype.login = function () {
	        // this.lock.show((error: string, profile: Object, id_token: string) => {
	        // if (error) {
	        // console.log(error);
	        //}
	        // We get a profile object for the user from Auth0
	        //localStorage.setItem('profile', JSON.stringify(profile));
	        // We also get the user's JWT
	        //localStorage.setItem('id_token', id_token);
	        //});
	    };
	    AuthService.prototype.logout = function () {
	        // To log out, we just need to remove
	        // the user's profile and token
	        localStorage.removeItem('profile');
	        localStorage.removeItem('id_token');
	    };
	    AuthService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], AuthService);
	    return AuthService;
	}());
	exports.AuthService = AuthService;
	

/***/ },
/* 569 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	// Import NgClass directive
	var common_1 = __webpack_require__(7);
	var accordion_component_1 = __webpack_require__(364);
	var AccordionGroup = (function () {
	    function AccordionGroup(accordion) {
	        this.accordion = accordion;
	        this._isOpen = false;
	        this.accordion.addGroup(this);
	    }
	    AccordionGroup.prototype.toggleOpen = function (event) {
	        event.preventDefault();
	        this.isOpen = !this.isOpen;
	    };
	    AccordionGroup.prototype.onDestroy = function () {
	        this.accordion.removeGroup(this);
	    };
	    Object.defineProperty(AccordionGroup.prototype, "isOpen", {
	        get: function () {
	            return this._isOpen;
	        },
	        set: function (value) {
	            this._isOpen = value;
	            if (value) {
	                this.accordion.closeOthers(this);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    AccordionGroup = __decorate([
	        core_1.Component({
	            selector: 'accordion-group, [accordion-group]',
	            inputs: ['heading', 'isOpen'],
	            directives: [common_1.NgClass],
	            template: __webpack_require__(609)
	        }), 
	        __metadata('design:paramtypes', [accordion_component_1.Accordion])
	    ], AccordionGroup);
	    return AccordionGroup;
	}());
	exports.AccordionGroup = AccordionGroup;
	

/***/ },
/* 570 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var lang_1 = __webpack_require__(4);
	var router_deprecated_1 = __webpack_require__(34);
	/*
	 * RouterActive dynamically finds the first element with routerLink and toggles the active class
	 *
	 * ## Use
	 *
	 * ```
	 * <li router-active="active"><a [routerLink]=" ['/Home'] ">Home</a></li>
	 * <li [routerActive]=" activeStringValue "><a [routerLink]=" ['/Home'] ">Home</a></li>
	 * ```
	 */
	var RouterActive = (function () {
	    function RouterActive(router, element, renderer, routerLink, routerActiveAttr) {
	        this.router = router;
	        this.element = element;
	        this.renderer = renderer;
	        this.routerLink = routerLink;
	        this.routerActive = undefined;
	        this.routerActiveAttr = 'active';
	        this.routerActiveAttr = this._defaultAttrValue(routerActiveAttr);
	    }
	    RouterActive.prototype.ngOnInit = function () {
	        var _this = this;
	        this.routerLink.changes.subscribe(function () {
	            if (_this.routerLink.first) {
	                _this._updateClass();
	                _this._findRootRouter().subscribe(function () {
	                    _this._updateClass();
	                });
	            }
	        });
	    };
	    RouterActive.prototype._findRootRouter = function () {
	        var router = this.router;
	        while (lang_1.isPresent(router.parent)) {
	            router = router.parent;
	        }
	        return router;
	    };
	    RouterActive.prototype._updateClass = function () {
	        var active = this.routerLink.first.isRouteActive;
	        this.renderer.setElementClass(this.element.nativeElement, this._attrOrProp(), active);
	    };
	    RouterActive.prototype._defaultAttrValue = function (attr) {
	        return this.routerActiveAttr = attr || this.routerActiveAttr;
	    };
	    RouterActive.prototype._attrOrProp = function () {
	        return lang_1.isPresent(this.routerActive) ? this.routerActive : this.routerActiveAttr;
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], RouterActive.prototype, "routerActive", void 0);
	    RouterActive = __decorate([
	        core_1.Directive({
	            selector: '[router-active]'
	        }),
	        __param(3, core_1.Query(router_deprecated_1.RouterLink)),
	        __param(4, core_1.Optional()),
	        __param(4, core_1.Attribute('router-active')), 
	        __metadata('design:paramtypes', [router_deprecated_1.Router, core_1.ElementRef, core_1.Renderer, core_1.QueryList, String])
	    ], RouterActive);
	    return RouterActive;
	}());
	exports.RouterActive = RouterActive;
	

/***/ },
/* 571 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var shop_service_1 = __webpack_require__(67);
	// We `import` `http` into our `ShopService` but we can only
	// specify providers within our component
	var http_1 = __webpack_require__(21);
	var user_service_1 = __webpack_require__(23);
	var ng2_material_1 = __webpack_require__(72);
	var common_1 = __webpack_require__(7);
	var router_deprecated_1 = __webpack_require__(34);
	var map_auto_1 = __webpack_require__(362);
	// Create metadata with the `@Component` decorator
	var ShopAdd = (function () {
	    function ShopAdd(router, shopService, u) {
	        var _this = this;
	        this.router = router;
	        this.shopService = shopService;
	        this.u = u;
	        // Initialize our `shopData.text` to an empty `string`
	        this.shopData = {
	            text: ''
	        };
	        this.url = 'https://google.com/';
	        this.id = '';
	        this.latitude = 51.678418;
	        this.longitude = 7.809007;
	        this.zoom = 16;
	        this.isPickup = true;
	        this.isDelivery = true;
	        this.isVeg = true;
	        this.allDay = true;
	        this.day1 = true; //Monday
	        this.day2 = true;
	        this.day3 = true;
	        this.day4 = true;
	        this.day5 = true;
	        this.day6 = true;
	        this.day7 = true; //Sunday
	        this.callAndConfirm = false;
	        this.phone = 0;
	        this.advanceOrderOnly = true;
	        this.openTime = 12.30;
	        this.closeTime = 21.30;
	        this.prepareTime = 1.00;
	        this.deliveryTime = 1.00;
	        this.minDeliveryOrder = 200;
	        this.minOrder = 200;
	        this.discount = 10;
	        this.mode = '';
	        this.currentItem = { text: '', userId: '' };
	        this.shops = [];
	        console.log('In Shop constructor!', u.latitude, u.longitude);
	        //u.id = '574c5677c534abb86bf27452';
	        u.setLocation();
	        console.log('In Shop constructor!', u.latitude, u.longitude);
	        var fb = new common_1.FormBuilder();
	        this.myForm = fb.group({
	            title: ['Mrs.... Kitchen', common_1.Validators.required],
	            cuisine: ['Continental', common_1.Validators.required],
	            description: ['The best home made food in your locality'],
	            address: ['Somewhere in earth'],
	            city: [''],
	            isVeg: [''],
	            isDelivery: [''],
	            isPickup: ['']
	        });
	        this.error = '';
	        //passing id
	        shopService.userId = u.id;
	        this.latitude = u.latitude;
	        this.longitude = u.longitude;
	        //this.shops = [];
	        shopService.getUserShops(u.id)
	            .subscribe(function (res) {
	            // Populate our `shop` array with the `response` data
	            _this.shops = res;
	            // Reset `shop` input
	            _this.shopData.text = '';
	        });
	    }
	    ShopAdd.prototype.changeMode = function (newMode) {
	        this.mode = newMode;
	        //this.mode='edit';
	    };
	    ShopAdd.prototype.submit = function (data) {
	        var _this = this;
	        console.log('going to home aub', this.myForm.valid);
	        if (this.myForm.valid || 1) {
	            alert(this.myForm.valid);
	            //alert(this.u);
	            var sendData = {
	                title: data.title,
	                cuisine: data.cuisine,
	                description: data.description,
	                address: data.address,
	                city: data.city,
	                isVeg: this.isVeg,
	                isDelivery: this.isDelivery,
	                isPickup: this.isPickup,
	                userId: this.u.id,
	                latitude: this.u.latitude,
	                longitude: this.u.longitude
	            };
	            console.log("ddd", sendData);
	            this.shopService.create(sendData)
	                .subscribe(function (res) {
	                console.log('ssss');
	                console.log(res);
	                console.log(res._id);
	                //this.u.id = res._id;
	                if (_this.u.id) {
	                    //  this.u.email = res.email;
	                    //this.u.isLogged = true;
	                    //                    this.router.navigate(['/home']);
	                    alert('Shop Added! Please add products');
	                    console.log('going to product add page');
	                    _this.router.parent.navigate(['ShopList']);
	                }
	            });
	        }
	    }; //submit
	    ShopAdd.prototype.create = function () {
	        var _this = this;
	        this.currentItem.userId = this.u.id;
	        this.shopService.create(this.currentItem)
	            .subscribe(function (res) {
	            // Populate our `shop` array with the `response` data
	            _this.shops = res;
	            // Reset `shop` input
	            _this.shopData.text = '';
	            _this.mode = '';
	        });
	    };
	    ShopAdd.prototype.save = function () {
	        this.create();
	    };
	    ShopAdd.prototype.selectItem = function (item) {
	        this.u.shopId = item._id;
	        this.u.shopTitle = item.title;
	        this.currentItem = item;
	        this.mode = 'edit';
	    };
	    ShopAdd.prototype.startEdit = function (item) {
	        this.currentItem = item;
	        this.mode = 'edit';
	    };
	    ShopAdd.prototype.delete = function (id) {
	        var _this = this;
	        this.shopService.delete(id)
	            .subscribe(function (res) {
	            // Populate our `shop` array with the `response` data
	            _this.shops = res;
	        });
	    };
	    ShopAdd.prototype.mapClicked = function ($event) {
	        console.log('map click');
	        console.log($event.coords.lat, $event.coords.lng);
	        this.u.latitude = $event.coords.lat;
	        this.u.longitude = $event.coords.lng;
	    };
	    ShopAdd = __decorate([
	        core_1.Component({
	            // HTML tag for specifying this component
	            selector: 'shop-add',
	            //    providers: [...HTTP_PROVIDERS, ShopService],
	            providers: http_1.HTTP_PROVIDERS.concat([
	                shop_service_1.ShopService,
	            ]),
	            directives: [
	                ng2_material_1.MdSwitch,
	                map_auto_1.MapAutocomplete,
	            ],
	            //encapsulation: ViewEncapsulation.None,
	            pipes: [],
	            styles: ["\n    .sebm-google-map-container {\n      height: 200px;\n    }\n  "],
	            template: __webpack_require__(610)
	        }), 
	        __metadata('design:paramtypes', [router_deprecated_1.Router, shop_service_1.ShopService, user_service_1.UserService])
	    ], ShopAdd);
	    return ShopAdd;
	}());
	exports.ShopAdd = ShopAdd;
	

/***/ },
/* 572 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var list_1 = __webpack_require__(60);
	var ShopLine = (function () {
	    function ShopLine() {
	        this.shops = [];
	        this.items = [];
	        this.para = 'ddddd';
	        console.log("in ressss");
	        console.log("in ressss...", this.items);
	    }
	    ShopLine.prototype.selectItem = function (item) { };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], ShopLine.prototype, "showMap", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Array)
	    ], ShopLine.prototype, "shops", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Array)
	    ], ShopLine.prototype, "items", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], ShopLine.prototype, "para", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], ShopLine.prototype, "item", void 0);
	    ShopLine = __decorate([
	        core_1.Component({
	            selector: 'shop-line',
	            providers: [],
	            directives: [
	                //        ANGULAR2_GOOGLE_MAPS_DIRECTIVES,
	                list_1.MdList,
	                list_1.MdListItem
	            ],
	            pipes: [],
	            styles: [],
	            template: __webpack_require__(611)
	        }), 
	        __metadata('design:paramtypes', [])
	    ], ShopLine);
	    return ShopLine;
	}());
	exports.ShopLine = ShopLine;
	

/***/ },
/* 573 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var shop_service_1 = __webpack_require__(67);
	// We `import` `http` into our `ShopService` but we can only
	// specify providers within our component
	var http_1 = __webpack_require__(21);
	var user_service_1 = __webpack_require__(23);
	var core_2 = __webpack_require__(27);
	var core_3 = __webpack_require__(27);
	var list_1 = __webpack_require__(60);
	//import {MATERIAL_DIRECTIVES} from 'ng2-material';
	//import {MdListItem} from 'ng2-material'
	// Create metadata with the `@Component` decorator
	var ShopList = (function () {
	    function ShopList(shopService, u) {
	        var _this = this;
	        this.shopService = shopService;
	        this.u = u;
	        // Initialize our `shopData.text` to an empty `string`
	        this.shopData = {
	            text: ''
	        };
	        this.url = 'https://google.com/';
	        this.latitude = 51.678418;
	        this.longitude = 7.809007;
	        this.zoom = 16;
	        this.mode = '';
	        this.currentItem = { text: '', userId: '' };
	        this.shops = [];
	        this.allshops = [];
	        console.log('Shop constructor go!');
	        //passing id
	        shopService.userId = u.id;
	        this.latitude = u.latitude;
	        this.longitude = u.longitude;
	        //  this.lng = u.longitude;
	        //this.shops = [];
	        //shopService.getUserShops(u.id)
	        shopService.getAll()
	            .subscribe(function (res) {
	            // Populate our `shop` array with the `response` data
	            _this.shops = res;
	            // Reset `shop` input
	            _this.shopData.text = '';
	        });
	    }
	    ShopList.prototype.changeMode = function (newMode) {
	        this.mode = newMode;
	        //this.mode='edit';
	    };
	    ShopList.prototype.create = function () {
	        var _this = this;
	        this.currentItem.userId = this.u.id;
	        this.shopService.create(this.currentItem)
	            .subscribe(function (res) {
	            // Populate our `shop` array with the `response` data
	            _this.shops = res;
	            // Reset `shop` input
	            _this.shopData.text = '';
	            _this.mode = '';
	        });
	    };
	    ShopList.prototype.save = function () {
	        this.create();
	    };
	    ShopList.prototype.selectItem = function (item) {
	        this.u.shopId = item._id;
	        this.u.shopTitle = item.title;
	        this.currentItem = item;
	        this.mode = 'edit';
	    };
	    ShopList.prototype.startEdit = function (item) {
	        this.currentItem = item;
	        this.mode = 'edit';
	    };
	    ShopList.prototype.delete = function (id) {
	        var _this = this;
	        this.shopService.delete(id)
	            .subscribe(function (res) {
	            // Populate our `shop` array with the `response` data
	            _this.shops = res;
	        });
	    };
	    ShopList = __decorate([
	        core_1.Component({
	            // HTML tag for specifying this component
	            selector: 'shop-list',
	            //    providers: [...HTTP_PROVIDERS, ShopService],
	            providers: http_1.HTTP_PROVIDERS.concat([
	                shop_service_1.ShopService,
	                core_2.ANGULAR2_GOOGLE_MAPS_PROVIDERS,
	            ]),
	            directives: [
	                core_3.ANGULAR2_GOOGLE_MAPS_DIRECTIVES,
	                list_1.MdList,
	                list_1.MdListItem
	            ],
	            //encapsulation: ViewEncapsulation.None,
	            pipes: [],
	            styles: ["\n    .sebm-google-map-container {\n      height: 300px;\n    }\n  "],
	            template: __webpack_require__(612)
	        }), 
	        __metadata('design:paramtypes', [shop_service_1.ShopService, user_service_1.UserService])
	    ], ShopList);
	    return ShopList;
	}());
	exports.ShopList = ShopList;
	

/***/ },
/* 574 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var core_2 = __webpack_require__(27);
	var core_3 = __webpack_require__(27);
	var list_1 = __webpack_require__(60);
	var line_component_1 = __webpack_require__(572);
	var ShopSearchResults = (function () {
	    function ShopSearchResults() {
	        this.shops = [];
	        this.items = [];
	        this.para = 'ddddd';
	        console.log("in ressss");
	        console.log("in ressss...", this.items);
	    }
	    ShopSearchResults.prototype.selectItem = function (item) { };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], ShopSearchResults.prototype, "showMap", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Array)
	    ], ShopSearchResults.prototype, "shops", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Array)
	    ], ShopSearchResults.prototype, "items", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], ShopSearchResults.prototype, "para", void 0);
	    ShopSearchResults = __decorate([
	        core_1.Component({
	            selector: 'shop-search-results',
	            providers: [
	                //        ShopService,
	                core_2.ANGULAR2_GOOGLE_MAPS_PROVIDERS,
	            ],
	            directives: [
	                core_3.ANGULAR2_GOOGLE_MAPS_DIRECTIVES,
	                list_1.MdList,
	                list_1.MdListItem,
	                line_component_1.ShopLine
	            ],
	            pipes: [],
	            styles: ["\n    .sebm-google-map-container {\n      height: 300px;\n    }\n  "],
	            template: __webpack_require__(613)
	        }), 
	        __metadata('design:paramtypes', [])
	    ], ShopSearchResults);
	    return ShopSearchResults;
	}());
	exports.ShopSearchResults = ShopSearchResults;
	

/***/ },
/* 575 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var shop_service_1 = __webpack_require__(67);
	// We `import` `http` into our `ShopService` but we can only
	// specify providers within our component
	var http_1 = __webpack_require__(21);
	var user_service_1 = __webpack_require__(23);
	var core_2 = __webpack_require__(27);
	var core_3 = __webpack_require__(27);
	var ng2_material_1 = __webpack_require__(72);
	var common_1 = __webpack_require__(7);
	var results_component_1 = __webpack_require__(574);
	// Create metadata with the `@Component` decorator
	var ShopSearch = (function () {
	    function ShopSearch(shopService, u) {
	        var _this = this;
	        this.shopService = shopService;
	        this.u = u;
	        // Initialize our `shopData.text` to an empty `string`
	        this.shopData = {
	            text: ''
	        };
	        this.url = 'https://google.com/';
	        this.latitude = 51.678418;
	        this.longitute = 7.809007;
	        //lon: number = 7.809007;
	        this.zoom = 16;
	        this.limitResults = 10;
	        this.isPickup = true;
	        this.isDelivery = true;
	        this.isVeg = true;
	        this.searchShop = true;
	        this.showMyLocation = false;
	        this.showResultsShop = false;
	        this.showResultsProduct = false;
	        this.showSearchForm = true;
	        this.moreOptions = true;
	        this.radius = 5;
	        this.mode = '';
	        this.currentItem = { text: '', userId: '' };
	        this.items = [];
	        this.products = [];
	        this.shops = [];
	        console.log('In Shop Search constructor!');
	        //u.id = '574c5677c534abb86bf27452';
	        u.setLocation();
	        var fb = new common_1.FormBuilder();
	        this.myForm = fb.group({
	            query: ['', common_1.Validators.required],
	            radius: [''],
	            location: [''],
	            isShop: [''],
	            isVeg: [''],
	            isDelivery: [''],
	            isPickup: ['']
	        });
	        this.error = '';
	        //passing id
	        shopService.userId = u.id;
	        this.latitude = u.latitude;
	        this.longitute = u.longitude;
	        //this.shops = [];
	        console.log('getting data!');
	        shopService.getAll()
	            .subscribe(function (res) {
	            console.log('In Shop Search constructor! results', res);
	            console.log(res);
	            _this.shops = res;
	            _this.items = res;
	        });
	    }
	    ShopSearch.prototype.changeMode = function (newMode) {
	        this.mode = newMode;
	        //this.mode='edit';
	    };
	    ShopSearch.prototype.submit = function (data) {
	        var _this = this;
	        console.log('going to home aub', this.myForm.valid);
	        if (this.myForm.valid || 1) {
	            this.showSearchForm = false;
	            this.showResultsShop = true;
	            //alert('valid');
	            //alert(this.u);
	            var sendData = {
	                // title: data.title,
	                cuisine: data.cuisine,
	                isVeg: this.isVeg,
	                isDelivery: this.isDelivery,
	                isPickup: this.isPickup,
	                userId: this.u.id,
	                latitude: this.u.latitude,
	                longitude: this.u.longitude
	            };
	            console.log("ddd", sendData);
	            this.shopService.create(sendData)
	                .subscribe(function (res) {
	                //console.log('ssss');
	                //console.log(res);
	                console.log(res._id);
	                //this.u.id = res._id;
	                if (_this.u.id) {
	                    //  this.u.email = res.email;
	                    //this.u.isLogged = true;
	                    //                    this.router.navigate(['/home']);
	                    console.log('going to home');
	                }
	            });
	        }
	    }; //submit
	    ShopSearch.prototype.create = function () {
	        var _this = this;
	        this.currentItem.userId = this.u.id;
	        this.shopService.create(this.currentItem)
	            .subscribe(function (res) {
	            // Populate our `shop` array with the `response` data
	            _this.shops = res;
	            // Reset `shop` input
	            _this.shopData.text = '';
	            _this.mode = '';
	        });
	    };
	    ShopSearch.prototype.save = function () {
	        this.create();
	    };
	    ShopSearch.prototype.selectItem = function (item) {
	        this.u.shopId = item._id;
	        //this.u.shopTitle = item.title;
	        this.currentItem = item;
	        this.mode = 'edit';
	    };
	    ShopSearch.prototype.startEdit = function (item) {
	        this.currentItem = item;
	        this.mode = 'edit';
	    };
	    ShopSearch.prototype.delete = function (id) {
	        var _this = this;
	        this.shopService.delete(id)
	            .subscribe(function (res) {
	            // Populate our `shop` array with the `response` data
	            _this.shops = res;
	        });
	    };
	    ShopSearch.prototype.mapClicked = function ($event) {
	        console.log('map click');
	        console.log($event.coords.lat, $event.coords.lng);
	        this.u.latitude = $event.coords.lat;
	        this.u.longitude = $event.coords.lng;
	    };
	    ShopSearch = __decorate([
	        core_1.Component({
	            // HTML tag for specifying this component
	            selector: 'shop-search',
	            //    providers: [...HTTP_PROVIDERS, ShopService],
	            providers: http_1.HTTP_PROVIDERS.concat([
	                shop_service_1.ShopService,
	                core_2.ANGULAR2_GOOGLE_MAPS_PROVIDERS,
	            ]),
	            directives: [
	                ng2_material_1.MdSwitch,
	                core_3.ANGULAR2_GOOGLE_MAPS_DIRECTIVES,
	                results_component_1.ShopSearchResults
	            ],
	            //encapsulation: ViewEncapsulation.None,
	            pipes: [],
	            styles: ["\n    .sebm-google-map-container {\n      height: 200px;\n    }\n  "],
	            template: __webpack_require__(614)
	        }), 
	        __metadata('design:paramtypes', [shop_service_1.ShopService, user_service_1.UserService])
	    ], ShopSearch);
	    return ShopSearch;
	}());
	exports.ShopSearch = ShopSearch;
	

/***/ },
/* 576 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var shop_service_1 = __webpack_require__(67);
	// We `import` `http` into our `ShopService` but we can only
	// specify providers within our component
	var http_1 = __webpack_require__(21);
	var user_service_1 = __webpack_require__(23);
	var core_2 = __webpack_require__(27);
	var core_3 = __webpack_require__(27);
	// Create metadata with the `@Component` decorator
	var Shop = (function () {
	    function Shop(shopService, u) {
	        var _this = this;
	        this.shopService = shopService;
	        this.u = u;
	        // Initialize our `shopData.text` to an empty `string`
	        this.shopData = {
	            text: ''
	        };
	        this.url = 'https://google.com/';
	        this.latitude = 51.678418;
	        this.longitude = 7.809007;
	        this.zoom = 16;
	        this.mode = '';
	        this.currentItem = { text: '', userId: '' };
	        this.shops = [];
	        console.log('Shop constructor go!');
	        u.setLocation();
	        //passing id
	        shopService.userId = u.id;
	        this.latitude = u.latitude;
	        this.longitude = u.longitude;
	        //this.shops = [];
	        shopService.getUserShops(u.id)
	            .subscribe(function (res) {
	            // Populate our `shop` array with the `response` data
	            _this.shops = res;
	            // Reset `shop` input
	            _this.shopData.text = '';
	        });
	    }
	    Shop.prototype.changeMode = function (newMode) {
	        this.mode = newMode;
	        //this.mode='edit';
	    };
	    Shop.prototype.create = function () {
	        var _this = this;
	        this.currentItem.userId = this.u.id;
	        this.shopService.create(this.currentItem)
	            .subscribe(function (res) {
	            // Populate our `shop` array with the `response` data
	            _this.shops = res;
	            // Reset `shop` input
	            _this.shopData.text = '';
	            _this.mode = '';
	        });
	    };
	    Shop.prototype.save = function () {
	        this.create();
	    };
	    Shop.prototype.selectItem = function (item) {
	        this.u.shopId = item._id;
	        this.u.shopTitle = item.title;
	        this.currentItem = item;
	        this.mode = 'edit';
	    };
	    Shop.prototype.startEdit = function (item) {
	        this.currentItem = item;
	        this.mode = 'edit';
	    };
	    Shop.prototype.delete = function (id) {
	        var _this = this;
	        this.shopService.delete(id)
	            .subscribe(function (res) {
	            // Populate our `shop` array with the `response` data
	            _this.shops = res;
	        });
	    };
	    Shop = __decorate([
	        core_1.Component({
	            // HTML tag for specifying this component
	            selector: 'shop',
	            //    providers: [...HTTP_PROVIDERS, ShopService],
	            providers: http_1.HTTP_PROVIDERS.concat([
	                shop_service_1.ShopService,
	                core_2.ANGULAR2_GOOGLE_MAPS_PROVIDERS,
	            ]),
	            directives: [
	                core_3.ANGULAR2_GOOGLE_MAPS_DIRECTIVES,
	            ],
	            //encapsulation: ViewEncapsulation.None,
	            pipes: [],
	            styles: ["\n    .sebm-google-map-container {\n      height: 300px;\n    }\n  "],
	            template: __webpack_require__(615)
	        }), 
	        __metadata('design:paramtypes', [shop_service_1.ShopService, user_service_1.UserService])
	    ], Shop);
	    return Shop;
	}());
	exports.Shop = Shop;
	

/***/ },
/* 577 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	//import {Router} from '@angular/router';
	var common_1 = __webpack_require__(7);
	//import {MATERIAL_DIRECTIVES} from 'ng2-material';
	//import {RouterLink} from '@angular/router';
	var ng2_material_1 = __webpack_require__(72);
	var shared_service_1 = __webpack_require__(223);
	var common_2 = __webpack_require__(7);
	//import {BUTTON_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
	var ng2_select_1 = __webpack_require__(841);
	var COLORS = [
	    { 'name': 'Blue 10', 'hex': '#C0E6FF' },
	    { 'name': 'Blue 20', 'hex': '#7CC7FF' },
	    { 'name': 'Blue 30', 'hex': '#5AAAFA' },
	    { 'name': 'Blue 40', 'hex': '#5596E6' },
	    { 'name': 'Blue 50', 'hex': '#4178BE' },
	    { 'name': 'Blue 60', 'hex': '#325C80' },
	    { 'name': 'Blue 70', 'hex': '#264A60' },
	    { 'name': 'Blue 80', 'hex': '#1D3649' },
	    { 'name': 'Blue 90', 'hex': '#152935' },
	    { 'name': 'Blue 100', 'hex': '#010205' },
	    { 'name': 'Green 10', 'hex': '#C8F08F' },
	    { 'name': 'Green 20', 'hex': '#B4E051' },
	    { 'name': 'Green 30', 'hex': '#8CD211' },
	    { 'name': 'Green 40', 'hex': '#5AA700' },
	    { 'name': 'Green 50', 'hex': '#4B8400' },
	    { 'name': 'Green 60', 'hex': '#2D660A' },
	    { 'name': 'Green 70', 'hex': '#144D14' },
	    { 'name': 'Green 80', 'hex': '#0A3C02' },
	    { 'name': 'Green 90', 'hex': '#0C2808' },
	    { 'name': 'Green 100', 'hex': '#010200' },
	    { 'name': 'Red 10', 'hex': '#FFD2DD' },
	    { 'name': 'Red 20', 'hex': '#FFA5B4' },
	    { 'name': 'Red 30', 'hex': '#FF7D87' },
	    { 'name': 'Red 40', 'hex': '#FF5050' },
	    { 'name': 'Red 50', 'hex': '#E71D32' },
	    { 'name': 'Red 60', 'hex': '#AD1625' },
	    { 'name': 'Red 70', 'hex': '#8C101C' },
	    { 'name': 'Red 80', 'hex': '#6E0A1E' },
	    { 'name': 'Red 90', 'hex': '#4C0A17' },
	    { 'name': 'Red 100', 'hex': '#040001' },
	    { 'name': 'Yellow 10', 'hex': '#FDE876' },
	    { 'name': 'Yellow 20', 'hex': '#FDD600' },
	    { 'name': 'Yellow 30', 'hex': '#EFC100' },
	    { 'name': 'Yellow 40', 'hex': '#BE9B00' },
	    { 'name': 'Yellow 50', 'hex': '#8C7300' },
	    { 'name': 'Yellow 60', 'hex': '#735F00' },
	    { 'name': 'Yellow 70', 'hex': '#574A00' },
	    { 'name': 'Yellow 80', 'hex': '#3C3200' },
	    { 'name': 'Yellow 90', 'hex': '#281E00' },
	    { 'name': 'Yellow 100', 'hex': '#020100' }
	];
	var Test = (function () {
	    function Test(s) {
	        //super();
	        this.s = s;
	        this.data = { cb1: true, cb4: true, cb5: false };
	        this.message = 'false';
	        this.value = {};
	        this._disabledV = '0';
	        this.disabled = false;
	        this.items = [];
	        s.userId = "tttttttt";
	        var fb = new common_1.FormBuilder();
	        this.testForm = fb.group({});
	        this.error = '';
	    }
	    Test.prototype.onChange = function (cbState) { this.message = cbState; };
	    ;
	    Test.prototype.ngOnInit = function () {
	        var _this = this;
	        COLORS.forEach(function (color) {
	            _this.items.push({
	                id: color.hex,
	                text: "<colorbox style='display:inline-block; height:14px; width:14px;margin-right:4px; border:1px solid #000;background-color:" + color.hex + ";'></colorbox>" + color.name + " (" + color.hex + ")"
	            });
	        });
	    };
	    Object.defineProperty(Test.prototype, "disabledV", {
	        get: function () {
	            return this._disabledV;
	        },
	        set: function (value) {
	            this._disabledV = value;
	            this.disabled = this._disabledV === '1';
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Test.prototype.selected = function (value) {
	        console.log('Selected value is: ', value);
	    };
	    Test.prototype.removed = function (value) {
	        console.log('Removed value is: ', value);
	    };
	    Test.prototype.typed = function (value) {
	        console.log('New search input: ', value);
	    };
	    Test.prototype.refreshValue = function (value) {
	        this.value = value;
	    };
	    Test.prototype.test = function (credentials) {
	        if (this.testForm.valid) {
	        }
	    };
	    Test = __decorate([
	        core_1.Component({
	            selector: 'test',
	            template: __webpack_require__(616),
	            providers: [],
	            // template: '<h1>dd</h1>'
	            //directives: [MATERIAL_DIRECTIVES]
	            styles: ["colorbox,.colorbox { display:inline-block; height:14px; width:14px;margin-right:4px; border:1px solid #000;}"],
	            directives: [ng2_material_1.MATERIAL_DIRECTIVES, ng2_select_1.SELECT_DIRECTIVES, common_2.NgClass, common_2.CORE_DIRECTIVES,
	                common_2.FORM_DIRECTIVES
	            ],
	        }), 
	        __metadata('design:paramtypes', [shared_service_1.SharedService])
	    ], Test);
	    return Test;
	}());
	exports.Test = Test;
	

/***/ },
/* 578 */
/***/ function(module, exports, __webpack_require__) {

	//# Global Directives
	//
	//** These `directives` are available in any template **
	"use strict";
	var core_1 = __webpack_require__(1);
	// Angular 2 Router
	var router_deprecated_1 = __webpack_require__(34);
	// Angular 2 Material 2
	//
	// TODO(datatypevoid): replace with @angular2-material/all
	var angular2_material2_1 = __webpack_require__(365);
	// APPLICATION_DIRECTIVES
	//
	// directives that are global through out the application
	exports.APPLICATION_DIRECTIVES = router_deprecated_1.ROUTER_DIRECTIVES.concat(angular2_material2_1.MATERIAL_DIRECTIVES);
	exports.DIRECTIVES = [
	    { provide: core_1.PLATFORM_DIRECTIVES, multi: true, useValue: exports.APPLICATION_DIRECTIVES }
	];
	

/***/ },
/* 579 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(578));
	__export(__webpack_require__(580));
	__export(__webpack_require__(581));
	

/***/ },
/* 580 */
/***/ function(module, exports, __webpack_require__) {

	//# Global Pipes
	//
	//** These `pipes` are available in any template **
	"use strict";
	var core_1 = __webpack_require__(1);
	//# APPLICATION_PIPES
	//
	//** Pipes that are global throughout our application **
	exports.APPLICATION_PIPES = [];
	exports.PIPES = [
	    { provide: core_1.PLATFORM_PIPES, multi: true, useValue: exports.APPLICATION_PIPES }
	];
	

/***/ },
/* 581 */
/***/ function(module, exports, __webpack_require__) {

	//# Global Providers
	//
	//** These `providers` are available in any template **
	"use strict";
	// Angular 2
	var common_1 = __webpack_require__(7);
	// Angular 2 Http
	var http_1 = __webpack_require__(21);
	// Angular 2 Router
	var router_deprecated_1 = __webpack_require__(34);
	// Angular 2 Material 2
	//
	// TODO:(datatypevoid): replace with @angular2-material/all
	var angular2_material2_1 = __webpack_require__(365);
	//# Application Providers/Directives/Pipes
	//
	//** providers/directives/pipes that only live in our browser environment **
	exports.APPLICATION_PROVIDERS = common_1.FORM_PROVIDERS.concat(http_1.HTTP_PROVIDERS, angular2_material2_1.MATERIAL_PROVIDERS, router_deprecated_1.ROUTER_PROVIDERS, [
	    { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }
	]);
	exports.PROVIDERS = exports.APPLICATION_PROVIDERS.slice();
	

/***/ },
/* 582 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	// Angular 2
	var core_1 = __webpack_require__(1);
	// Environment Providers
	var PROVIDERS = [];
	if (false) {
	    // Production
	    core_1.enableProdMode();
	    PROVIDERS = PROVIDERS.slice();
	}
	else {
	    // Development
	    PROVIDERS = PROVIDERS.slice();
	}
	exports.ENV_PROVIDERS = PROVIDERS.slice();
	

/***/ },
/* 583 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function (namespace) {
	  return new Promise(function (resolve) {
	    __webpack_require__.e/* nsure */(1, function (require) {
	      if (namespace) {
	        resolve(__webpack_require__(442)[namespace]);
	      } else {
	        resolve(__webpack_require__(442));
	      }
	    });
	  });
	}

/***/ },
/* 584 */
/***/ function(module, exports) {

	module.exports = "<md-sidenav-layout layout=\"row\" fullscreen>\r\n    <md-sidenav #menu class=\"app-menu\">\r\n        <md-toolbar>\r\n            <h3>Food Rings</h3>\r\n        </md-toolbar>\r\n        <md-list>\r\n\r\n            <md-list-item>\r\n\r\n            <button md-button router-active [routerLink]=\" ['Signin'] \">\r\n                Login\r\n            </button>\r\n</md-list-item>\r\n            <md-list-item>\r\n\r\n           <button md-button router-active [routerLink]=\" ['Signup'] \">\r\n                Signup\r\n            </button>\r\n</md-list-item>\r\n\r\n\t\t\r\n            <md-list-item>\r\n\r\n                <md-button md-button router-active [routerLink]=\" ['CartList'] \">\r\n                    Cart\r\n                </md-button>\r\n            </md-list-item>\r\n            <md-list-item>\r\n\r\n                <md-button md-button router-active [routerLink]=\" ['ShopSearch'] \">\r\n                    Search\r\n                </md-button>\r\n            </md-list-item>\r\n\r\n\t\t\t\r\n            <md-list-item>\r\n\t\t\t\r\n\t\t\t\r\n\t\t\t\r\n\r\n            <button md-button router-active [routerLink]=\" ['ShopAdd'] \">\r\n                Add a Kitchen\r\n            </button>\r\n            \r\n\t\t\t</md-list-item>\r\n            <md-list-item>\r\n<button md-button router-active [routerLink]=\" ['ShopList'] \">\r\n                Manage Kitchen\r\n            </button>\r\n</md-list-item>\r\n            <md-list-item>\r\n\r\n            <button md-button router-active [routerLink]=\" ['Profile'] \">\r\n                Profile\r\n            </button>\r\n</md-list-item>\r\n\r\n\t\t\t\r\n\t\t\t\r\n        </md-list>\r\n\r\n    </md-sidenav>\r\n\r\n    <md-content1 #content>\r\n        <md-toolbar color=\"primary\" class=\"hero\">\r\n\r\n\r\n            <button md-button\r\n                    class=\"md-hamburger md-icon-button\"\r\n                    xx-hide-gt-lg\r\n                    (click)=\"menu.open($event)\"\r\n                    aria-label=\"Home\">\r\n                <i md-icon class=\"md-dark\">menu</i>\r\n            </button>\r\n\r\n\t\t\t<h3>Food Rings</h3>\r\n\r\n\r\n\r\n            <h1></h1>\r\n\r\n            <h1 md-peekaboo\r\n                breakAction=\"hide\">\r\n                {{navigation?.currentTitle}}\r\n            </h1>\r\n        </md-toolbar>\r\n\r\n<router-outlet></router-outlet>\r\n\r\n\r\n\r\n    </md-content1>\r\n</md-sidenav-layout>\r\n"

/***/ },
/* 585 */
/***/ function(module, exports) {

	module.exports = "<md-content layout=\"row\" layout-align=\"center start\" layout-fill layout-margin>\r\n    <md-whiteframe layout=\"column\" flex flex-md=\"50\" flex-lg=\"50\" flex-gt-lg=\"33\" class=\"md-whiteframe-z2\" layout-fill>\r\n        <md-toolbar class=\"md-primary md-tall\" layout=\"column\" layout-align=\"end\" layout-fill>\r\n            <div layout=\"row\" class=\"md-toolbar-tools md-toolbar-tools-bottom\">\r\n                <h3 class=\"md-display-1\"> Login </h3>\r\n            </div>\r\n        </md-toolbar>\r\n        <div layout=\"column\" layout-fill layout-margin layout-padding>\r\n            <form [ngFormModel]=\"signinForm\" #f=\"ngForm\" (submit)=\"submit(f.value)\" layout=\"column\" layout-fill layout-padding layout-margin>\r\n                <md-input-container>\r\n                    <md-input placeholder=\"E-Mail\" ngControl=\"email\" aria-label=\"email\">\r\n\r\n                    </md-input>\r\n                    <md-input placeholder=\"Password\" md-input type=\"password\" ngControl=\"password\" aria-label=\"password\"></md-input>\r\n                </md-input-container>\r\n                <div layout=\"row\" layout-align=\"space-between center\">\r\n                    <button md-raised-button color=\"primary\" type=\"submit\" aria-label=\"login\">\r\n                        !Log in nnn!\r\n                    </button>\r\n                </div>\r\n\r\n\r\n                <button class=\"btn btn-block btn-google-plus\" (click)=\"authenticate('google')\">\r\n                    <i class=\"fa fa-google-plus\"></i>\r\n                    sign in with Google\r\n                </button>\r\n                 \r\n            </form>\r\n        </div>\r\n    </md-whiteframe>\r\n</md-content>\r\n"

/***/ },
/* 586 */
/***/ function(module, exports) {

	module.exports = "<md-content layout=\"row\" layout-align=\"center start\" layout-fill layout-margin>\r\n  <md-whiteframe layout=\"column\" flex flex-md=\"50\" flex-lg=\"50\" flex-gt-lg=\"33\" class=\"md-whiteframe-z2\" layout-fill>\r\n    <md-toolbar class=\"md-primary md-tall\" layout=\"column\" layout-align=\"end\" layout-fill>\r\n      <div layout=\"row\" class=\"md-toolbar-tools md-toolbar-tools-bottom\">\r\n        <h3 class=\"md-display-1\"> Sign up </h3>\r\n      </div>\r\n    </md-toolbar>\r\n    <div layout=\"column\" layout-fill layout-margin layout-padding>\r\n      <form [ngFormModel]=\"signupForm\" #f=\"ngForm\" (submit)=\"signup(f.value)\" layout=\"column\" layout-fill layout-padding layout-margin>\r\n        <md-input-container>\r\n            <md-input placeholder=\"E-Mail\"  ngControl=\"email\" aria-label=\"email\" >\r\n  \r\n            </md-input>\r\n            <md-input placeholder=\"Password\" md-input type=\"password\" ngControl=\"password\" aria-label=\"password\" ></md-input>\r\n        </md-input-container>\r\n        <div layout=\"row\" layout-align=\"space-between center\">\r\n          <button md-raised-button color=\"primary\" type=\"submit\" aria-label=\"login\">Sign Up!\r\n          </button>\r\n        </div>\r\n      </form>      \r\n    </div>           \r\n  </md-whiteframe>\r\n</md-content>\r\n"

/***/ },
/* 587 */
/***/ function(module, exports) {

	module.exports = "<md-list-item *ngIf=\"!item.removed\" class=\"\">\r\n    <div class=\"md-list-item-text\" layout=\"column\">\r\n        \r\n        <a router-active [routerLink]=\" ['ProductDetails',{'id' :item._id }] \"> {{ item.title }} @ {{ item.rate }}</a>\r\n\r\n        <md-input-container>\r\n            <md-input placeholder=\"Quantity\" [(ngModel)]=\"item.quantity\" aria-label=\"quantity\">\r\n            </md-input> # {{item.quantity*item.rate}}\r\n\r\n        </md-input-container>\r\n        <button md-raised-button color=\"primary\" (click)=\"remove()\"\r\n                type=\"submit\" aria-label=\"Search\">\r\n            Remove\r\n        </button>\r\n    </div>\r\n</md-list-item>\r\n\r\n"

/***/ },
/* 588 */
/***/ function(module, exports) {

	module.exports = "<md-content layout=\"row\" layout-align=\"center start\" layout-fill layout-margin>\r\n    <md-whiteframe layout=\"column\" flex flex-md=\"50\" flex-lg=\"50\" flex-gt-lg=\"33\" class=\"md-whiteframe-z2\" layout-fill>\r\n        <md-toolbar>\r\n            <div layout=\"row\">\r\n                <h3 class=\"md-display-1\"> My Shopping Cart </h3>\r\n            </div>\r\n        </md-toolbar>\r\n        <div class=\"\" *ngFor=\"let item of items; let index = index\">\r\n            \r\n            <cart-line [item]=\"item\"></cart-line>\r\n        </div>\r\n        <md-list>\r\n            <md-subheader class=\"md-no-sticky\"></md-subheader>\r\n            <md-list-item class=\"md-3-line\" >\r\n                <div class=\"md-list-item-text\" layout=\"column\">\r\n                    \r\n                </div>\r\n            </md-list-item>\r\n            <md-divider></md-divider>\r\n            <button md-raised-button color=\"primary\" type=\"submit\" aria-label=\"login\" (click)=\"order()\">\r\n                Confirm Order\r\n            </button>\r\n\r\n        </md-list>\r\n    </md-whiteframe>\r\n</md-content>\r\n\r\n"

/***/ },
/* 589 */
/***/ function(module, exports) {

	module.exports = "#map {\r\n    height: 100%;\r\n}\r\n\r\n.controls {\r\n    margin-top: 10px;\r\n    border: 1px solid transparent;\r\n    border-radius: 2px 0 0 2px;\r\n    box-sizing: border-box;\r\n    -moz-box-sizing: border-box;\r\n    height: 32px;\r\n    outline: none;\r\n    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);\r\n}\r\n\r\n#pac-input {\r\n    background-color: #fff;\r\n    font-family: Roboto;\r\n    font-size: 15px;\r\n    font-weight: 300;\r\n    margin-left: 12px;\r\n    padding: 0 11px 0 13px;\r\n    text-overflow: ellipsis;\r\n    width: 300px;\r\n}\r\n\r\n#pac-input:focus {\r\n    border-color: #4d90fe;\r\n}\r\n\r\n.pac-container {\r\n    font-family: Roboto;\r\n}\r\n\r\n#type-selector {\r\n    color: #fff;\r\n    background-color: #4d90fe;\r\n    padding: 5px 11px 0px 11px;\r\n}\r\n\r\n#type-selector label {\r\n    font-family: Roboto;\r\n    font-size: 13px;\r\n    font-weight: 300;\r\n}\r\n\r\n"

/***/ },
/* 590 */
/***/ function(module, exports) {

	module.exports = "<input id=\"pac-input\" class=\"controls\" type=\"text\"\r\n        placeholder=\"Enter your location\" [(ngModel)]=\"address\">\r\n\r\n<button id=\"pick-location\" class=\"controls\" type=\"button\"\r\n       placeholder=\"Enter your location\" value=\"My Current Location\" (click)=\"pickLocation()\">Geo Location\r\n</button>\r\n\r\n<div id=\"map\"></div>\r\n\r\n"

/***/ },
/* 591 */
/***/ function(module, exports) {

	module.exports = "   .arrow-down {\r\n    display: inline-block;\r\n    width: 0;\r\n    height: 0;\r\n    /* top: 20px; */\r\n    border-left: 10px solid transparent;\r\n    border-right: 10px solid transparent;\r\n    margin-left: -28px;\r\n    vertical-align: middle;\r\n    border-top: 14px dashed;\r\n    /* border-bottom: 16px solid; */\r\n}\r\n\r\n    \r\n.md-dropdown-outer-container {\r\n  \r\n}\r\n\r\n.md-dropdown-popup-container {\r\n  position: relative;\r\n}\r\n\r\n.md-dropdown-toggle:focus {\r\n  outline: 0;\r\n}\r\n.md-dropdown-popup {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 10 px;\r\n  z-index: 1000;\r\n/*  display: block; */\r\n  float: left;\r\n  min-width: 160px;\r\n  max-height: 300px;\r\n  overflow-y:scroll;\r\n  padding: 5px 0;\r\n  margin: 2px 0 0;\r\n  font-size: 14px;\r\n  text-align: left;\r\n  list-style: none;\r\n  background-color: #fff;\r\n  -webkit-background-clip: padding-box;\r\n          background-clip: padding-box;\r\n  border: 1px solid #ccc;\r\n  border: 1px solid rgba(0, 0, 0, .15);\r\n  border-radius: 4px;\r\n  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, .175);\r\n          box-shadow: 0 6px 12px rgba(0, 0, 0, .175);\r\n}\r\n.md-dropdown-popup.pull-right {\r\n  right: 0;\r\n  left: auto;\r\n}\r\n.md-dropdown-popup .divider {\r\n  height: 1px;\r\n  margin: 9px 0;\r\n  overflow: hidden;\r\n  background-color: #e5e5e5;\r\n}\r\n.md-dropdown-popup > li > a {\r\n  display: block;\r\n  padding: 3px 20px;\r\n  clear: both;\r\n  font-weight: normal;\r\n  line-height: 1.42857143;\r\n  color: #333;\r\n  white-space: nowrap;\r\n}\r\n.md-dropdown-popup > li > a:hover,\r\n.md-dropdown-popup > li > a:focus {\r\n  color: #262626;\r\n  text-decoration: none;\r\n  background-color: #f5f5f5;\r\n}\r\n.md-dropdown-popup > .active > a,\r\n.md-dropdown-popup > .active > a:hover,\r\n.md-dropdown-popup > .active > a:focus {\r\n  color: #fff;\r\n  text-decoration: none;\r\n  background-color: #337ab7;\r\n  outline: 0;\r\n}\r\n.md-dropdown-popup > .disabled > a,\r\n.md-dropdown-popup > .disabled > a:hover,\r\n.md-dropdown-popup > .disabled > a:focus {\r\n  color: #777;\r\n}\r\n.md-dropdown-popup > .disabled > a:hover,\r\n.md-dropdown-popup > .disabled > a:focus {\r\n  text-decoration: none;\r\n  cursor: not-allowed;\r\n  background-color: transparent;\r\n  background-image: none;\r\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);\r\n}\r\n.open > .md-dropdown-popup {\r\n  display: block;\r\n}\r\n.open > a {\r\n  outline: 0;\r\n}\r\n.md-dropdown-popup-right {\r\n  right: 0;\r\n  left: auto;\r\n}\r\n.md-dropdown-popup-left {\r\n  right: auto;\r\n  left: 0;\r\n}\r\n.md-dropdown-header {\r\n  display: block;\r\n  padding: 3px 20px;\r\n  font-size: 12px;\r\n  line-height: 1.42857143;\r\n  color: #777;\r\n  white-space: nowrap;\r\n}\r\n.md-dropdown-backdrop {\r\n  position: fixed;\r\n  top: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  z-index: 990;\r\n}\r\n.pull-right > .md-dropdown-popup {\r\n  right: 0;\r\n  left: auto;\r\n}\r\n.md-dropup .caret,\r\n.navbar-fixed-bottom .md-dropdown .caret {\r\n  content: \"\";\r\n  border-top: 0;\r\n  border-bottom: 4px dashed;\r\n  border-bottom: 4px solid \\9;\r\n}\r\n.md-dropup .md-dropdown-popup,\r\n.navbar-fixed-bottom .md-dropdown .md-dropdown-popup {\r\n  top: auto;\r\n  bottom: 100%;\r\n  margin-bottom: 2px;\r\n}\r\n@media (min-width: 768px) {\r\n  .md-dropdown-popup {\r\n  /*  right: 0;\r\n    left: auto;*/\r\n  }\r\n   .md-dropdown-popup-left {\r\n    /*right: auto;\r\n    left: 0;*/\r\n  }\r\n}\r\n"

/***/ },
/* 592 */
/***/ function(module, exports) {

	module.exports = "<style>\r\n</style>\r\n\r\nItems {{items|json}}\r\n<div class=\"md-dropdown-outer-container\">\r\n    <input type=\"text\" \r\n           name=\"md-dropdown-input\" \r\n           class=\"md-dropdown-input\" [(ngModel)]=\"itemText\" (change)=\"change($event)\"\r\n            (keyup)=\"change($event)\" /> \r\n    <span class=\"arrow-down\" (click)=toggle()></span>\r\n    {{itemText}}\r\n    <div *ngIf=\"showPopup\" class=\"md-dropdown-popup-container\">\r\n        <ul class=\"md-dropdown-popup\">\r\n            <li class=\"md-dropdown-item\"\r\n                (click1) =\"select(item)\" \r\n                *ngFor=\"let item of items | filterItems :itemText ; let index = index \">\r\n                <a style=\"vertical-align:middle\">\r\n                    <span style=\"vertical-align:central;min-height:42px;min-width:80px;display:inline-block\">\r\n                    {{item}}  \r\n                        <ng-content></ng-content>\r\n                    </span>\r\n\r\n                        <img src=\"https://source.unsplash.com/category/food/40x40/?apple\" />\r\n                 \r\n                </a>\r\n             </li>           \r\n        </ul>\r\n    </div>\r\n</div> \r\n\r\n\r\n"

/***/ },
/* 593 */
/***/ function(module, exports) {

	module.exports = "<h1>\r\n    <input/>\r\n</h1>"

/***/ },
/* 594 */
/***/ function(module, exports) {

	module.exports = "<style>\n    .my-drop-zone { border: dotted 3px lightgray; }\n    .nv-file-over { border: dotted 3px red; } /* Default class applied to drop zones on over */\n    .another-file-over-class { border: dotted 3px green; }\n\n    html, body { height: 100%; }\n</style>\n\n<div class=\"container\">\n\n    <div class=\"navbar navbar-default\">\n        <div class=\"navbar-header\">\n            <a class=\"navbar-brand\" href>Angular2 File Upload</a>\n        </div>\n    </div>\n\n    <div class=\"row\">\n\n        <div class=\"col-md-3\">\n\n            <h3>Select files</h3>\n\n            <div ng2FileDrop\n                 [ngClass]=\"{'nv-file-over': hasBaseDropZoneOver}\"\n                 (fileOver)=\"fileOverBase($event)\"\n                 [uploader]=\"uploader\"\n                 class=\"well my-drop-zone\">\n                Base drop zone\n            </div>\n\n            <div ng2FileDrop\n                 [ngClass]=\"{'another-file-over-class': hasAnotherDropZoneOver}\"\n                 (fileOver)=\"fileOverAnother($event)\"\n                 [uploader]=\"uploader\"\n                 class=\"well my-drop-zone\">\n                Another drop zone\n            </div>\n\n            Multiple\n            <input type=\"file\" ng2FileSelect [uploader]=\"uploader\" multiple  /><br/>\n\n            Single\n            <input type=\"file\" ng2FileSelect [uploader]=\"uploader\" />\n        </div>\n\n        <div class=\"col-md-9\" style=\"margin-bottom: 40px\">\n\n            <h3>Upload queue</h3>\n            <p>Queue length: {{ uploader?.queue?.length }}</p>\n\n            <table class=\"table\">\n                <thead>\n                <tr>\n                    <th width=\"50%\">Name</th>\n                    <th>Size</th>\n                    <th>Progress</th>\n                    <th>Status</th>\n                    <th>Actions</th>\n                </tr>\n                </thead>\n                <tbody>\n                <tr *ngFor=\"let item of uploader.queue\">\n                    <td><strong>{{ item?.file?.name }}</strong></td>\n                    <td *ngIf=\"uploader.isHTML5\" nowrap>{{ item?.file?.size/1024/1024 | number:'.2' }} MB</td>\n                    <td *ngIf=\"uploader.isHTML5\">\n                        <div class=\"progress\" style=\"margin-bottom: 0;\">\n                            <div class=\"progress-bar\" role=\"progressbar\" [ngStyle]=\"{ 'width': item.progress + '%' }\"></div>\n                        </div>\n                    </td>\n                    <td class=\"text-center\">\n                        <span *ngIf=\"item.isSuccess\"><i class=\"glyphicon glyphicon-ok\"></i></span>\n                        <span *ngIf=\"item.isCancel\"><i class=\"glyphicon glyphicon-ban-circle\"></i></span>\n                        <span *ngIf=\"item.isError\"><i class=\"glyphicon glyphicon-remove\"></i></span>\n                    </td>\n                    <td nowrap>\n                        <button type=\"button\" class=\"btn btn-success btn-xs\"\n                                (click)=\"item.upload()\" [disabled]=\"item.isReady || item.isUploading || item.isSuccess\">\n                            <span class=\"glyphicon glyphicon-upload\"></span> Upload\n                        </button>\n                        <button type=\"button\" class=\"btn btn-warning btn-xs\"\n                                (click)=\"item.cancel()\" [disabled]=\"!item.isUploading\">\n                            <span class=\"glyphicon glyphicon-ban-circle\"></span> Cancel\n                        </button>\n                        <button type=\"button\" class=\"btn btn-danger btn-xs\"\n                                (click)=\"item.remove()\">\n                            <span class=\"glyphicon glyphicon-trash\"></span> Remove\n                        </button>\n                    </td>\n                </tr>\n                </tbody>\n            </table>\n\n            <div>\n                <div>\n                    Queue progress:\n                    <div class=\"progress\" style=\"\">\n                        <div class=\"progress-bar\" role=\"progressbar\" [ngStyle]=\"{ 'width': uploader.progress + '%' }\"></div>\n                    </div>\n                </div>\n                <button type=\"button\" class=\"btn btn-success btn-s\"\n                        (click)=\"uploader.uploadAll()\" [disabled]=\"!uploader.getNotUploadedItems().length\">\n                    <span class=\"glyphicon glyphicon-upload\"></span> Upload all\n                </button>\n                <button type=\"button\" class=\"btn btn-warning btn-s\"\n                        (click)=\"uploader.cancelAll()\" [disabled]=\"!uploader.isUploading\">\n                    <span class=\"glyphicon glyphicon-ban-circle\"></span> Cancel all\n                </button>\n                <button type=\"button\" class=\"btn btn-danger btn-s\"\n                        (click)=\"uploader.clearQueue()\" [disabled]=\"!uploader.queue.length\">\n                    <span class=\"glyphicon glyphicon-trash\"></span> Remove all\n                </button>\n            </div>\n\n        </div>\n\n    </div>\n\n</div>\n"

/***/ },
/* 595 */
/***/ function(module, exports) {

	module.exports = ""

/***/ },
/* 596 */
/***/ function(module, exports) {

	module.exports = "\r\n  <nav class=\"white\" role=\"navigation\">\r\n    <div class=\"nav-wrapper container\">\r\n      <a id=\"logo-container\" href=\"#\" class=\"brand-logo\">Food Rings</a>\r\n      <ul class=\"right hide-on-med-and-down\">\r\n        <li><a href=\"#\">Signup/Signin</a></li>\r\n      </ul>\r\n\r\n      <ul id=\"nav-mobile\" class=\"side-nav\">\r\n        <li><a href=\"#\">Signup/Signin</a></li>\r\n      </ul>\r\n      <a href=\"#\" data-activates=\"nav-mobile\" class=\"button-collapse\"><i class=\"material-icons\">menu</i></a>\r\n    </div>\r\n  </nav>\r\n\r\n  \r\n  <div id=\"index-banner\" class=\"parallax-container\" style=\"background-image: url(https://source.unsplash.com/category/food/1500x400); background-size: 100% 100%;\r\n    background-repeat: no-repeat; width:100%\" >\r\n    <div class=\"section no-pad-bot\">\r\n      <div class=\"container\">\r\n        <br><br>\r\n        <h1 class=\"header center teal-text text-lighten-2\">Food Rings</h1>\r\n        <div class=\"row center\">\r\n          <h5 class=\"header col s12 light\">A place to share, buy and sell Home Cooked Food from Home Chefs. This is a marketplace and location aware search engine for Home Cooked Meal in your Neighbourhood</h5>\r\n        </div>\r\n        <div class=\"row center\">\r\n          <a href=\"\" id=\"start-button\" class=\"btn-large waves-effect waves-light teal lighten-1\">Get Started</a>\r\n        </div>\r\n        <br><br>\r\n\r\n      </div>\r\n    </div>\r\n    \r\n  </div>\r\n\r\n  \r\n  <div class=\"container\">\r\n    <div class=\"section\">\r\n\r\n      <!--   Icon Section   -->\r\n      <div class=\"row\">\r\n        <div class=\"col s12 m4\">\r\n          <div class=\"icon-block\">\r\n            <h2 class=\"center brown-text\"><i class=\"material-icons\">flash_on</i></h2>\r\n            <h5 class=\"center\">Home Chef</h5>\r\n\r\n            <p class=\"light\">If you enjoy cooking, This is the best place for you. We did most of the heavy lifting for you to provide a free eCommerce site for you. Just register and create the food menu. Additionally, we refined the technology and application to provide a smoother experience for your customer.</p>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"col s12 m4\">\r\n          <div class=\"icon-block\">\r\n            <h2 class=\"center brown-text\"><i class=\"material-icons\">group</i></h2>\r\n            <h5 class=\"center\">Food Lovers</h5>\r\n\r\n            <p class=\"light\">Want to try the different varity from differnt culture. This is the best place for you. Our food is fresh, home cooked with fresh organic ingredients. Our cooks are passionate with their job</p>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"col s12 m4\">\r\n          <div class=\"icon-block\">\r\n            <h2 class=\"center brown-text\"><i class=\"material-icons\">More</i></h2>\r\n            <h5 class=\"center\">F.A.Q.</h5>\r\n\r\n            <p class=\"light\">We have provided detailed F.A.Q. and sample food meanu  to help new Chefs to get started. We are also always open to feedback and can answer any questions a user may have about this site.</p>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n\r\n\r\n  <div id=\"index-banner\" class=\"parallax-container\" style=\"background-image: url(https://source.unsplash.com/category/food/weekly); background-size: 100% 100%;\r\n    background-repeat: no-repeat; width:100% \" >\r\n    <div class=\"section no-pad-bot\">\r\n      <div class=\"container\">\r\n        <br><br>\r\n        <h1 class=\"header center teal-text text-lighten-2\">Food Rings</h1>\r\n        <div class=\"row center\">\r\n          <h5 class=\"header col s12 light\">A place to share, buy and sell Home Cooked Food from Home Chefs. This is a marketplace and location aware search engine for Home Cooked Meal in your Neighbourhood</h5>\r\n        </div>\r\n        <div class=\"row center\">\r\n          <a href=\"\" id=\"start-button\" class=\"btn-large waves-effect waves-light teal lighten-1\">Get Started</a>\r\n        </div>\r\n        <br><br>\r\n\r\n      </div>\r\n    </div>\r\n    \r\n  </div>\r\n\r\n\r\n<div style=\"margin:20px\">\r\n<h3>Buy or sell home cooked food - Direct </h3>\t\r\n\r\n\r\n\r\n            <button md-button router-active [routerLink]=\" ['Signin'] \">\r\n                Login/Signup\r\n            </button>\r\n\t\t\t<br>\r\n\t\t\t<br>\r\n\t\t\t<button md-button  >\r\n                Search\r\n            </button>\r\n\t\t\t<br>\r\n\t\t\t<br>\r\n\t\t\t<button md-button  >\r\n                Faq\r\n            </button>\r\n\t\t\t\r\n</div>\r\n\r\n\r\n  <div id=\"index-banner\" class=\"parallax-container\" \r\n\tstyle=\"background-image: url(https://source.unsplash.com/category/food/daily/); background-size: 100% 100%;\r\n    background-repeat: no-repeat; width:100%\"\r\n  style1=\"background-image: url(https://source.unsplash.com/category/food); width:100%\" >\r\n    <div class=\"section no-pad-bot\">\r\n      <div class=\"container\">\r\n        <br><br>\r\n        <h1 class=\"header center teal-text text-lighten-2\">Food Rings</h1>\r\n        <div class=\"row center\">\r\n          <h5 class=\"header col s12 light\">A place to share, buy and sell Home Cooked Food from Home Chefs. This is a marketplace and location aware search engine for Home Cooked Meal in your Neighbourhood</h5>\r\n        </div>\r\n        <div class=\"row center\">\r\n          <a href=\"\" id=\"start-button\" class=\"btn-large waves-effect waves-light teal lighten-1\">Get Started</a>\r\n        </div>\r\n        <br><br>\r\n\r\n      </div>\r\n    </div>\r\n    \r\n  </div>\r\n  <footer class=\"page-footer teal\">\r\n    <div class=\"container\">\r\n      <div class=\"row\">\r\n        <div class=\"col l6 s12\">\r\n          <h5 class=\"white-text\">Company Bio</h5>\r\n          <p class=\"grey-text text-lighten-4\">We are a team of software developers working on this project. This is a showcase project in the latest technology area. You can join us and enhance this project. We wanted to help the society and empower the home maker and give then a plateform to earn extra part time money for doing what they enjoy to doand this the the outcome of our effort. We do not charge commision from the food seller and this make the food more affordable to our customer.</p>\r\n\r\n\r\n        </div>\r\n        <div class=\"col l3 s12\">\r\n          <h5 class=\"white-text\">Settings</h5>\r\n          <ul>\r\n            <li><a class=\"white-text\" href=\"#!\">Sign In</a></li>\r\n            <li><a class=\"white-text\" href=\"#!\">Link 2</a></li>\r\n            <li><a class=\"white-text\" href=\"#!\">Link 3</a></li>\r\n            <li><a class=\"white-text\" href=\"#!\">Link 4</a></li>\r\n          </ul>\r\n        </div>\r\n        <div class=\"col l3 s12\">\r\n          <h5 class=\"white-text\">Connect</h5>\r\n          <ul>\r\n            <li><a class=\"white-text\" href=\"#!\">Link 1</a></li>\r\n            \r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"footer-copyright\">\r\n      <div class=\"container\">\r\n      Made by <a class=\"brown-text text-lighten-3\" href=\"\">Food Rings</a>\r\n      </div>\r\n    </div>\r\n  </footer>\r\n\r\n\r\n  <!--  Scripts-->\r\n  <script src=\"https://code.jquery.com/jquery-2.1.1.min.js\"></script>\r\n  <script src=\"js/materialize.js\"></script>\r\n  <script src=\"js/init.js\"></script>\r\n\r\n  \r\n\r\n"

/***/ },
/* 597 */
/***/ function(module, exports) {

	module.exports = "<md-sidenav-layout>\n  <md-sidenav #sidenav mode=\"side\" class=\"app-sidenav\">\n    Sidenav\n  </md-sidenav>\n\n  <md-toolbar color=\"primary\">\n    <button class=\"app-icon-button\" (click)=\"sidenav.toggle()\">\n      <i class=\"material-icons app-toolbar-menu\">menu</i>\n    </button>\n\n    Angular Material2 Example App\n\n    <span class=\"app-toolbar-filler\"></span>\n  </md-toolbar>\n\n  <div class=\"app-content\">\n\n    <md-card>\n      <button md-button>FLAT</button>\n      <button md-raised-button>RAISED</button>\n      <button md-raised-button color=\"primary\">PRIMARY RAISED</button>\n      <button md-raised-button color=\"accent\">ACCENT RAISED</button>\n    </md-card>\n\n    <md-card>\n      <md-checkbox>Unchecked</md-checkbox>\n      <md-checkbox [checked]=\"true\">Checked</md-checkbox>\n      <md-checkbox [indeterminate]=\"true\">Indeterminate</md-checkbox>\n      <md-checkbox [disabled]=\"true\">Disabled</md-checkbox>\n    </md-card>\n\n    <md-card>\n      <md-radio-button name=\"symbol\">Alpha</md-radio-button>\n      <md-radio-button name=\"symbol\">Beta</md-radio-button>\n      <md-radio-button name=\"symbol\" disabled>Gamma</md-radio-button>\n    </md-card>\n\n    <md-card class=\"app-input-section\">\n      <md-input placeholder=\"First name\"></md-input>\n\n      <md-input #nickname placeholder=\"Nickname\" maxlength=\"50\">\n        <md-hint align=\"end\">\n          {{nickname.characterCount}} / 50\n        </md-hint>\n      </md-input>\n\n      <md-input>\n        <md-placeholder>\n          <i class=\"material-icons app-input-icon\">android</i> Favorite phone\n        </md-placeholder>\n      </md-input>\n\n      <md-input placeholder=\"Motorcycle model\">\n        <span md-prefix>\n          <i class=\"material-icons app-input-icon\">motorcycle</i>\n          &nbsp;\n        </span>\n      </md-input>\n    </md-card>\n\n    <md-card>\n      <md-list class=\"app-list\">\n        <md-list-item *ngFor=\"let food of foods\">\n          <h3 md-line>{{food.name}}</h3>\n          <p md-line class=\"demo-secondary-text\">{{food.rating}}</p>\n        </md-list-item>\n      </md-list>\n    </md-card>\n\n    <md-card>\n      <md-spinner class=\"app-spinner\"></md-spinner>\n      <md-spinner color=\"accent\" class=\"app-spinner\"></md-spinner>\n    </md-card>\n\n    <md-card>\n      <label>\n        Indeterminate progress-bar\n        <md-progress-bar\n            class=\"app-progress\"\n            mode=\"indeterminate\"\n            aria-label=\"Indeterminate progress-bar example\"></md-progress-bar>\n      </label>\n\n      <label>\n        Determinate progress bar - {{progress}}%\n        <md-progress-bar\n            class=\"app-progress\"\n            color=\"accent\"\n            mode=\"determinate\"\n            [value]=\"progress\"\n            aria-label=\"Determinate progress-bar example\"></md-progress-bar>\n      </label>\n    </md-card>\n\n\n    <md-card>\n      <md-icon>build</md-icon>\n    </md-card>\n\n  </div>\n\n</md-sidenav-layout>\n\n<span class=\"app-action\">\n  <button md-fab><i class=\"material-icons md-24\">check circle</i></button>\n</span>\n"

/***/ },
/* 598 */
/***/ function(module, exports) {

	module.exports = "<md-content layout=\"row\" layout-align=\"center start\" layout-fill layout-margin>\r\n    <md-whiteframe layout=\"column\" flex flex-md=\"50\" flex-lg=\"50\" flex-gt-lg=\"33\" class=\"md-whiteframe-z2\" layout-fill>\r\n        <md-toolbar class=\"md-primary md-tall\" layout=\"column\" layout-align=\"end\" layout-fill>\r\n            <div layout=\"row\" class=\"md-toolbar-tools md-toolbar-tools-bottom\">\r\n                <h3 class=\"md-display-1\"> Add/Edit Product</h3>\r\n            </div>\r\n        </md-toolbar>\r\n        <div layout=\"column\" layout-fill layout-margin layout-padding>\r\n            <form [ngFormModel]=\"myForm\" #f=\"ngForm\" (submit)=\"submit(f.value)\" layout=\"column\" layout-fill layout-padding layout-margin>\r\n                <md-input-container>\r\n                    <md-input placeholder=\"Name\" ngControl=\"title\" aria-label=\"title\">\r\n                        {{title}}\r\n                    </md-input>\r\n                    <md-input placeholder=\"Price\" ngControl=\"price\" aria-label=\"cuisine\">\r\n\r\n                    </md-input>\r\n               \r\n                </md-input-container>\r\n                    <md-switch style=\"margin:5px\" [(checked)]=\"isVeg\">Veg {{isveg}}</md-switch>\r\n \r\n                    <div layout=\"row\" layout-align=\"space-between center\">\r\n                    <button md-raised-button color=\"primary\" type=\"submit\" aria-label=\"login\">\r\n                        Save\r\n                    </button>\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </md-whiteframe>\r\n</md-content>\r\nShop Id {{shopId}}"

/***/ },
/* 599 */
/***/ function(module, exports) {

	module.exports = "<md-content layout=\"row\" layout-align=\"center start\" layout-fill layout-margin>\r\n    <md-whiteframe layout=\"column\" flex flex-md=\"50\" flex-lg=\"50\" flex-gt-lg=\"33\" class=\"md-whiteframe-z2\" layout-fill>\r\n        <md-toolbar>\r\n            <div layout=\"row\" class=\"md-toolbar-tools md-toolbar-tools-bottom\">\r\n                <h3 class=\"md-display-1\">\r\n                    \r\n                    Order : {{item.title}} \r\n                </h3>\r\n                \r\n\r\n            </div>\r\n        </md-toolbar>\r\n\r\n        <div  layout=\"column\" layout-fill layout-margin layout-padding>\r\n            <form [ngFormModel]=\"myForm\" #f=\"ngForm\" (submit)=\"submit(f.value)\" layout=\"column\" layout-fill layout-padding layout-margin>\r\n                <div layout=\"row\" layout-align=\"space-between center\">\r\n                      @ {{item.rate}} (INR) \r\n                </div>\r\n\r\n                <div layout=\"row\" layout-align=\"space-between center\">                    \r\n                    Also known as Paneer Makhani is a vegetarian dish. The dish combines paneer (Indian cottage cheese) in a butter sauce.\r\n                </div>\r\n                \r\n                <div layout=\"row\" layout-align=\"space-between center\">\r\n                    <img src=\"https://source.unsplash.com/category/food/600x300/?pizza\" />\r\n                </div>\r\n    \r\n\r\n                <md-input-container>\r\n                    <md-input placeholder=\"Quantity\" ngControl=\"quantity\" aria-label=\"quantity\">\r\n                        {{quantity}}\r\n                    </md-input>\r\n\r\n                </md-input-container>\r\n                \r\n                \r\n                <div layout=\"row\" layout-align=\"space-between center\">\r\n                    <button md-raised-button color=\"primary\" type=\"submit\" aria-label=\"Search\">\r\n                        Add to Cart\r\n                    </button>\r\n                </div>\r\n\r\n            </form>\r\n        </div>\r\n\r\n    </md-whiteframe>\r\n</md-content>\r\n\r\n"

/***/ },
/* 600 */
/***/ function(module, exports) {

	module.exports = "<md-list-item class=\"\">\r\n    <div class=\"md-list-item-text\" layout=\"column\">\r\n        <a router-active [routerLink]=\"['ProductDetails',{'id' :item._id }]\">\r\n\r\n            <img src=\"https://source.unsplash.com/category/food/20x20/?salad\" />\r\n            {{ item.title }} @ {{ item.price }}\r\n        </a>\r\n            \r\n</div>\r\n</md-list-item>\r\n<md-divider></md-divider>\r\n\r\n"

/***/ },
/* 601 */
/***/ function(module, exports) {

	module.exports = "<md-content layout=\"row\" layout-align=\"center start\" layout-fill layout-margin>\r\n    <md-whiteframe-dis layout=\"column\" flex flex-md=\"50\" flex-lg=\"50\" flex-gt-lg=\"40\" class=\"md-whiteframe-z2-dis\" layout-fill>\r\n        <md-toolbar>\r\n            <div layout=\"row\">\r\n                <h3 class=\"md-display-1\"> {{shop.title}} </h3>\r\n            </div>\r\n\r\n            \r\n        </md-toolbar>\r\n\r\n        <md-list>\r\n            <md-subheader class=\"md-no-sticky\">\r\n\r\n                <button md-button router-active [routerLink]=\"['ProductAdd',{shopid:shopId}]\">\r\n                    Add New Product\r\n                </button>\r\n            </md-subheader>\r\n            <md-list-item class=\"md-3-line\" *ngFor=\"let item of items; let index = index\">\r\n                <div class=\"md-list-item-text\" layout=\"column\">\r\n                    <p>\r\n                        <a router-active [routerLink]=\" ['Home'] \"> {{ item.title }} @ {{ item.price }} </a>\r\n                        <br/>\r\n\r\n                    </p>\r\n                </div>\r\n            </md-list-item>\r\n            <md-divider></md-divider>\r\n            <md-subheader class=\"md-no-sticky\">\r\n\r\n                <button md-button router-active [routerLink]=\"['ProductAdd',{shopid:shopId}]\">\r\n                    Add New Product\r\n                </button>\r\n            </md-subheader>\r\n        </md-list>\r\n    </md-whiteframe-dis>\r\n</md-content>\r\n\r\n"

/***/ },
/* 602 */
/***/ function(module, exports) {

	module.exports = "<md-content layout=\"row\" layout-align=\"center start\" layout-fill layout-margin>\r\n    <md-whiteframe layout=\"column\" flex flex-md=\"50\" flex-lg=\"50\" flex-gt-lg=\"40\" class=\"md-whiteframe-z2\" layout-fill>\r\n        <md-toolbar>\r\n            <div layout=\"row\">\r\n                <h3 class=\"md-display\">{{shop.title}}</h3>\r\n            </div>\r\n        </md-toolbar>\r\n        \r\n        <div class=\"\" *ngFor=\"let item of items; let index = index\">\r\n            <product-line [item]=\"item\"></product-line>\r\n        </div>\r\n    </md-whiteframe>\r\n</md-content>"

/***/ },
/* 603 */
/***/ function(module, exports) {

	module.exports = "<div class=\"container\">\r\n    {{mode}}\r\n    {{currentItem.amount}}\r\n    {{currentItem.text}}\r\n    \r\n  \r\n  <div *ngIf=\"!mode\" id=\"data-list\" class=\"row\">\r\n      <ul class=\"col-sm-4 col-sm-offset-4\">\r\n\r\n          <li  *ngFor=\"let item of products\" (click)=\"selectItem(item)\">\r\n               {{ item.title }}\r\n          </li>\r\n\r\n      </ul>\r\n  </div>\r\n    {{mode}}\r\n\r\n            <button *ngIf=\"!mode\" type=\"submit\"\r\n                (click)=\"changeMode('add')\">Add New Product</button>\r\n  \r\n  <div *ngIf=\"mode\">  \r\n \r\n  <div id=\"data-form\" class=\"row\">\r\n      <div class=\"col-sm-8 col-sm-offset-2 text-center\">\r\n          <form>\r\n              <div class=\"form-group\">\r\n\r\n                  <!-- BIND THIS VALUE TO productData.text IN ANGULAR -->\r\n                  <input type=\"text\" class=\"form-control input-lg text-center\" \r\n                  placeholder=\"Product Name\" [(ngModel)]=\"currentItem.title\" required>\r\n                  \r\n                  <!-- BIND THIS VALUE TO productData.text IN ANGULAR -->\r\n                  <input type=\"text\" class=\"form-control input-lg text-center\"\r\n                         placeholder=\"cuisine\" [(ngModel)]=\"currentItem.cuisine\">\r\n\r\n                  \r\n                  <!-- BIND THIS VALUE TO productData.text IN ANGULAR -->\r\n                  <input type=\"text\" class=\"form-control input-lg text-center\" \r\n                  placeholder=\"Product No\" [(ngModel)]=\"currentItem.no\" >\r\n\r\n\r\n                  \r\n              </div>\r\n\r\n              <button type=\"submit\" class=\"btn btn-primary btn-lg\"\r\n                (click)=\"save()\">Save</button>\r\n          </form>\r\n      </div>\r\n  </div>\r\n\r\n</div>\r\n\r\n</div>\r\n"

/***/ },
/* 604 */
/***/ function(module, exports) {

	module.exports = "<div class=\"product-card\">\n  <div>\n    <h2 *ngIf=\"selectedProduct._id\">Edit {{originalTitle}}</h2>\n    <h2 *ngIf=\"!selectedProduct._id\">Create New Product</h2>\n  </div>\n  <div>\n    <form novalidate>\n        <div>\n          <label>Name</label>\n          <input [(ngModel)]=\"selectedProduct.title\"\n            placeholder=\"Enter a Name\" type=\"text\">\n            \n        </div>\n        <div>\n          <label>Amount</label>\n          <input [(ngModel)]=\"selectedProduct.amount\"\n            placeholder=\"Enter a Name\" type=\"text\">\n            \n        </div>\n        \n    </form>\n  </div>\n  <div>\n      <button type=\"submit\" (click)=\"cancelled.emit(selectedProduct)\">\n        Cancel\n      </button>\n      <button type=\"submit\" (click)=\"saved.emit(selectedProduct)\">\n        Save\n      </button>\n  </div>\n</div>\n"

/***/ },
/* 605 */
/***/ function(module, exports) {

	module.exports = "<div *ngFor=\"let product of products\" (click)=\"selected.emit(product)\"\n  class=\"product-card\">\n  <div>\n    {{product.title}}+{{product.amount}}\n  </div> \n</div>\n"

/***/ },
/* 606 */
/***/ function(module, exports) {

	module.exports = "{{mode}}\n   <button *ngIf=\"!mode\" type=\"submit\"\n                (click)=\"changeMode('add')\">Add New</button>\n  \n\n<div *ngIf=\"!mode\">\n  \n  <product-list [products]=\"products | async\"\n    (selected)=\"selectProduct($event)\" (deleted)=\"deleteProduct($event)\">\n  </product-list>\n</div>\n<div *ngIf=\"mode\">\n  <product-detail\n    (saved)=\"saveProduct($event)\" (cancelled)=\"resetProduct($event)\"\n    [product]=\"selectedProduct | async\">\n    \n    </product-detail>\n\n</div>\n"

/***/ },
/* 607 */
/***/ function(module, exports) {

	module.exports = "<md-content layout=\"row\" layout-align=\"center start\" layout-fill layout-margin>\r\n  <md-whiteframe layout=\"column\" flex flex-md=\"50\" flex-lg=\"50\" flex-gt-lg=\"33\" class=\"md-whiteframe-z2\" layout-fill>\r\n    <md-toolbar class=\"md-primary md-tall\" layout=\"column\" layout-align=\"end\" layout-fill>\r\n      <div layout=\"row\" class=\"md-toolbar-tools md-toolbar-tools-bottom\">\r\n        <h3 class=\"md-display-1\"> Profile </h3>\r\n      </div>\r\n    </md-toolbar>\r\n    <div layout=\"column\" layout-fill layout-margin layout-padding>\r\n      <form [ngFormModel]=\"thisForm\" #f=\"ngForm\" (submit)=\"submit(f.value)\" layout=\"column\" layout-fill layout-padding layout-margin>\r\n        <md-input-container>\r\n            <md-input placeholder=\"E-Mail\"  ngControl=\"email\" aria-label=\"email\" >\r\n  \r\n            </md-input>\r\n            <md-input placeholder=\"Password\" md-input type=\"password\" ngControl=\"password\" aria-label=\"password\" ></md-input>\r\n        </md-input-container>\r\n        <div layout=\"row\" layout-align=\"space-between center\">\r\n          <button md-raised-button color=\"primary\" type=\"submit\" aria-label=\"login\">Sign Up!\r\n          </button>\r\n        </div>\r\n      </form>      \r\n    </div>           \r\n  </md-whiteframe>\r\n</md-content>"

/***/ },
/* 608 */
/***/ function(module, exports) {

	module.exports = "<md-content layout=\"row\" layout-align=\"center start\" layout-fill layout-margin>\r\n  <md-whiteframe layout=\"column\" flex flex-md=\"80\" flex-lg-dis=\"66\" flex-gt-lg=\"40\" class=\"md-whiteframe-z2\" layout-fill>\r\n    <md-toolbar class=\"md-primary md-tall\" layout=\"column\" layout-align=\"end\" layout-fill>\r\n      <div layout=\"row\" class=\"md-toolbar-tools md-toolbar-tools-bottom\">\r\n        <h3 class=\"md-display-1\"> Edit Profile </h3>\r\n      </div>\r\n    </md-toolbar>\r\n    <div layout=\"column\" layout-fill layout-margin layout-padding>\r\n      <form [ngFormModel]=\"thisForm\" #f=\"ngForm\" (submit)=\"submit(f.value)\" layout=\"column\" layout-fill layout-padding layout-margin>\r\n          <md-input-container>\r\n\r\n              <md-input placeholder=\"First Name *\" ngControl=\"firstName\" [(ngModel)]=\"u.profile.firstName\" ></md-input>\r\n\r\n              <md-input placeholder=\"Last Name\" ngControl=\"lastName\" [(ngModel)]=\"u.profile.lastName\"></md-input>\r\n\r\n\r\n              <md-input placeholder=\"Address Line 1\" ngControl=\"address1\" [(ngModel)]=\"u.profile.address1\"></md-input>\r\n\r\n              <md-input placeholder=\"Address Line 2\" ngControl=\"address2\" [(ngModel)]=\"u.profile.address2\"></md-input>\r\n\r\n              <md-input placeholder=\"City\" ngControl=\"city\" [(ngModel)]=\"u.profile.city\"></md-input>\r\n\r\n\r\n              <md-input placeholder=\"Country\" ngControl=\"country\" [(ngModel)]=\"u.profile.country\"></md-input>\r\n              <md-input placeholder=\"Mobile\" ngControl=\"mobile\" [(ngModel)]=\"u.profile.mobile\"></md-input>\r\n              <md-input placeholder=\"Phone\" ngControl=\"phone\" [(ngModel)]=\"u.profile.phone\"></md-input>\r\n\r\n\r\n          </md-input-container>\r\n\r\n        <div layout=\"row\" layout-align=\"space-between center\">\r\n          <button md-raised-button color=\"primary\" type=\"submit\" aria-label=\"submit\">Submit\r\n          </button>\r\n        </div>\r\n      </form>      \r\n    </div>           \r\n  </md-whiteframe>\r\n</md-content>\r\n"

/***/ },
/* 609 */
/***/ function(module, exports) {

	module.exports = "<div class=\"panel panel-default\" [ngClass]=\"{'panel-open': isOpen}\">\n  <div class=\"panel-heading\" (click)=\"toggleOpen($event)\">\n    <h4 class=\"panel-title\">\n      <a href tabindex=\"0\"><span>{{heading}}</span></a>\n    </h4>\n  </div>\n  <div class=\"panel-collapse\" [hidden]=\"!isOpen\">\n    <div class=\"panel-body\">\n      <ng-content></ng-content>\n    </div>\n  </div>\n</div>\n"

/***/ },
/* 610 */
/***/ function(module, exports) {

	module.exports = "<md-content layout=\"row\" layout-align=\"center start\" layout-fill layout-margin>\r\n    <md-whiteframe-1 layout=\"column\" flex flex-md-dis=\"50\" flex-lg-dis=\"50\" flex-gt-lg=\"66\" class=\"md-whiteframe-z2-dis\" layout-fill>\r\n        <md-toolbar class=\"md-primary md-tall\" layout=\"column\" layout-align=\"end\" layout-fill>\r\n            <div layout=\"row\" class=\"md-toolbar-tools md-toolbar-tools-bottom\">\r\n                <h3 class=\"md-display-1\"> Add/Edit Shop </h3>\r\n            </div>\r\n        </md-toolbar>\r\n        \r\n        \r\n        <div layout=\"column\" layout-fill layout-margin layout-padding>\r\n            \r\n            <map-autocomplete style=\"height:250px\" \r\n                              [latitude]=\"u.latitude\"\r\n                                 [longitude]=\"u.longitude\" zoom=\"zoom\" mapClick=\"mapClicked($event)\"\r\n\r\n                              >\r\n                            \r\n            </map-autocomplete>\r\n            \r\n            <form [ngFormModel]=\"myForm\" #f=\"ngForm\" (submit)=\"submit(f.value)\" layout=\"column\" layout-fill layout-padding layout-margin>\r\n                <md-input-container>\r\n                    <md-input placeholder=\"Shop Name\" ngControl=\"title\"  aria-label=\"title\">\r\n                    </md-input>\r\n                    \r\n                    <md-input placeholder=\"Cuisine\" ngControl=\"cuisine\" aria-label=\"cuisine\">\r\n\r\n                    </md-input>\r\n                    <md-input style=\"width:400px\" placeholder=\"Description\" ngControl=\"description\" aria-label=\"description\">\r\n\r\n                    </md-input>\r\n                    <md-input style=\"width:400px\"  placeholder=\"Address\" ngControl=\"address\" [(ngModel)]=\"u.map_address\" aria-label=\"address\">\r\n\r\n                    </md-input>\r\n\r\n                    <md-switch style=\"margin:5px;width:200px;display:inline-block\" [(checked)]=\"isVeg\">Veg </md-switch>\r\n\r\n                    <md-switch style=\"margin:2px;width:200px;display:inline-block\" [(checked)]=\"isDelivery\">Delivery</md-switch>\r\n                    <md-switch style=\"margin:2px;width:200px;display:inline-block\" [(checked)]=\"isPickup\">Pickup </md-switch>\r\n                </md-input-container>\r\n            \r\n\r\n                \r\n                <div layout=\"row\" layout-align=\"space-between center\">\r\n                    <button md-raised-button color=\"primary\" type=\"submit\" aria-label=\"login\">\r\n                        Save\r\n                    </button>\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </md-whiteframe-1>\r\n</md-content>\r\n\r\n{{u.latitude}}+"

/***/ },
/* 611 */
/***/ function(module, exports) {

	module.exports = "<md-list-item class=\"\">\r\n    <div class=\"md-list-item-text\" layout=\"column\">\r\n\r\n        <a router-active [routerLink]=\"['PList',{'shopid': item._id }]\"> \r\n        {{ item.title }} \r\n        </a>\r\n\r\n    </div>\r\n</md-list-item>\r\n<md-list-item class=\"\">\r\n    <div class=\"md-list-item-text\" layout=\"column\">\r\n\r\n        <a router-active [routerLink]=\"['PList',{'shopid': item._id }]\">\r\n            Distance - 2.5 Miles {{item.cuisine}}\r\n        </a>\r\n\r\n    </div>\r\n</md-list-item>\r\n\r\n\r\n<md-divider></md-divider>"

/***/ },
/* 612 */
/***/ function(module, exports) {

	module.exports = "\r\n<md-content layout=\"row\" layout-align=\"center start\" layout-fill layout-margin>\r\n    <md-whiteframe layout=\"column\" flex flex-md=\"50\" flex-lg=\"50\" flex-gt-lg=\"33\" class=\"md-whiteframe-z2\" layout-fill>\r\n        <md-toolbar class=\"md-primary md-tall\" layout=\"column\" layout-align=\"end\" layout-fill>\r\n            <div layout=\"row\">\r\n                <h3 class=\"md-display-1\"> My Shop List </h3>\r\n            </div>   \r\n            <button md-button router-active [routerLink]=\"['ShopAdd']\">\r\n                Add New Shop\r\n            </button>\r\n         \r\n        </md-toolbar>\r\n        <md-list>\r\n            <md-subheader class=\"md-no-sticky\"></md-subheader>\r\n            <div class=\"\" *ngFor=\"let item of shops; let index = index\">\r\n            \r\n                    <div class=\"md-list-item-text\" layout=\"column\">\r\n                    <p>\r\n                        <a router-active [routerLink]=\"['ProductList',{shopid: item._id}]\"> {{ item.title }}</a>\r\n                        \r\n                        <br/>\r\n                        <a router-active [routerLink]=\"['ProductList',{shopid: item._id}] \"> Manage</a>\r\n                        <a router-active [routerLink]=\"['ProductAdd',{shopid: item._id}]\"> Add Product</a>\r\n\r\n                    </p>\r\n\r\n\r\n                </div>\r\n                <md-divider></md-divider>\r\n            </div>\r\n\r\n\r\n            \r\n\r\n        </md-list>\r\n    </md-whiteframe>\r\n</md-content>\r\n\r\n"

/***/ },
/* 613 */
/***/ function(module, exports) {

	module.exports = "<md-list>\r\n    <md-subheader class=\"md-no-sticky\">Shops near you</md-subheader>\r\n    <div class=\"\" *ngFor=\"let item of items; let index = index\">\r\n        <shop-line [item]=\"item\"></shop-line>\r\n    </div>\r\n    <md-divider></md-divider>\r\n</md-list>\r\n"

/***/ },
/* 614 */
/***/ function(module, exports) {

	module.exports = "<md-content layout=\"row\" layout-align=\"center start\" layout-fill layout-margin>\r\n    <md-whiteframe layout=\"column\" flex flex-md=\"50\" flex-lg=\"50\" flex-gt-lg=\"40\" class=\"md-whiteframe-z2\" layout-fill>\r\n        <md-toolbar>\r\n            <div layout=\"row\" class=\"md-toolbar-tools md-toolbar-tools-bottom\">\r\n                <h3 class=\"md-display-1\">\r\n                    <md-switch style=\"margin:5px\" [(checked)]=\"searchShop\">\r\n                        <span *ngIf=\"searchShop\"> Search Shop </span>\r\n                        <span *ngIf=\"!searchShop\"> Search Product </span>\r\n                    </md-switch>\r\n                </h3>\r\n            </div>\r\n        </md-toolbar>\r\n        \r\n        <md-switch *ngIf=\"!showSearchForm\" style=\"margin:5px\" [(checked)]=\"showSearchForm\"> Search</md-switch>\r\n\r\n        <div  *ngIf=\"showSearchForm\" layout=\"column\" layout-fill layout-margin layout-padding>\r\n            <form [ngFormModel]=\"myForm\" #f=\"ngForm\" (submit)=\"submit(f.value)\" layout=\"column\" layout-fill layout-padding layout-margin>\r\n                <md-input-container>\r\n                    <md-input placeholder=\"Search\" ngControl=\"query\" aria-label=\"query\">\r\n                        {{query}}\r\n                    </md-input>\r\n\r\n                    <md-input placeholder=\"Near (KM/Mile)\" ngControl=\"radius\" aria-label=\"query\">\r\n                        {{radius}}\r\n                    </md-input>\r\n\r\n                    <div *ngIf=\"showMap\">\r\n                        <sebm-google-map [latitude]=\"u.latitude\"\r\n                                         [longitude]=\"u.longitude\" [zoom]=\"zoom\" (mapClick)=\"mapClicked($event)\">\r\n                            <sebm-google-map-marker [latitude]=\"u.latitude\"\r\n                                                    [longitude]=\"u.longitude\">\r\n                            </sebm-google-map-marker>\r\n                        </sebm-google-map>\r\n                    </div>\r\n               \r\n                </md-input-container>\r\n                <md-switch style=\"margin:5px\" [(checked)]=\"showMore\">\r\n                    <span *ngIf=\"showMore\"> - </span>\r\n                    <span *ngIf=\"!showMore\"> + </span>\r\n                </md-switch>\r\n\r\n                <div *ngIf=\"showMore\">\r\n                    <md-switch style=\"margin:5px\" [(checked)]=\"isVeg\">Veg {{isVeg}}</md-switch>\r\n                    <md-switch style=\"margin:2px\" [(checked)]=\"isDelivery\">Delivery {{isDelivery}}</md-switch>\r\n                    <md-switch style=\"margin:2px\" [(checked)]=\"isPickup\">Pickup {{isPickup}}</md-switch>\r\n                    <md-switch style=\"margin:2px\" [(checked)]=\"showMap\">\r\n                        Pick Location \r\n                    </md-switch>\r\n\r\n\r\n\r\n                </div>\r\n\r\n                <div layout=\"row\" layout-align=\"space-between center\">\r\n                    <button md-raised-button color=\"primary\" type=\"submit\" aria-label=\"Search\">\r\n                        Search\r\n                    </button>\r\n                </div>\r\n            </form>\r\n        </div>\r\n        \r\n        <div *ngIf=\"showResultsShop && showResultsShop\">\r\n\r\n            <shop-search-results [items]=\"shops\">\r\n\r\n            </shop-search-results>\r\n        </div>\r\n\r\n\r\n\r\n\r\n</md-whiteframe>\r\n</md-content>\r\n"

/***/ },
/* 615 */
/***/ function(module, exports) {

	module.exports = "<div class=\"container\">\r\n    {{mode}}\r\n    {{currentItem.amount}}\r\n    {{currentItem.text}}\r\n    \r\n  \r\n  <div *ngIf=\"!mode\" id=\"data-list\" class=\"row\">\r\n      <ul class=\"col-sm-4 col-sm-offset-4\">\r\n\r\n          <li  *ngFor=\"let item of shops\" (click)=\"selectItem(item)\">\r\n               {{ item.title }}\r\n          </li>\r\n\r\n      </ul>\r\n  </div>\r\n    {{mode}}\r\n\r\n            <button *ngIf=\"!mode\" type=\"submit\"\r\n                (click)=\"changeMode('add')\">Add New Shop</button>\r\n  \r\n  <div *ngIf=\"mode\">  \r\n \r\n  <div id=\"data-form\" class=\"row\">\r\n      <div class=\"col-sm-8 col-sm-offset-2 text-center\">\r\n          <form>\r\n              <div class=\"form-group\">\r\n\r\n                  <!-- BIND THIS VALUE TO shopData.text IN ANGULAR -->\r\n                  <input type=\"text\" class=\"form-control input-lg text-center\" \r\n                  placeholder=\"Shop Name\" [(ngModel)]=\"currentItem.title\" required>\r\n                  \r\n                  <!-- BIND THIS VALUE TO shopData.text IN ANGULAR -->\r\n                  <input type=\"text\" class=\"form-control input-lg text-center\"\r\n                         placeholder=\"cuisine\" [(ngModel)]=\"currentItem.cuisine\">\r\n\r\n                  \r\n                  <!-- BIND THIS VALUE TO shopData.text IN ANGULAR -->\r\n                  <input type=\"text\" class=\"form-control input-lg text-center\" \r\n                  placeholder=\"Shop No\" [(ngModel)]=\"currentItem.no\" >\r\n                  Maps\r\n                  <sebm-google-map [latitude]=\"lat\" [longitude]=\"lng\">\r\n                  </sebm-google-map>\r\n\r\n                  \r\n              </div>\r\n\r\n              <button type=\"submit\" class=\"btn btn-primary btn-lg\"\r\n                (click)=\"save()\">Save</button>\r\n          </form>\r\n      </div>\r\n  </div>\r\n\r\n</div>\r\n\r\n</div>\r\n"

/***/ },
/* 616 */
/***/ function(module, exports) {

	module.exports = "<style>\r\n.arrow-down {\r\n    display: inline-block;\r\n    width: 0;\r\n    height: 0;\r\n    /* top: 20px; */\r\n    border-left: 10px solid transparent;\r\n    border-right: 10px solid transparent;\r\n    margin-left: -28px;\r\n    vertical-align: middle;\r\n    border-top: 14px dashed;\r\n    /* border-bottom: 16px solid; */\r\n}\r\n.md-dropdown {\r\n  position: relative;\r\n}\r\n.md-dropdown-toggle:focus {\r\n  outline: 0;\r\n}\r\n.md-dropdown-menu {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  z-index: 1000;\r\n  display: block;\r\n  float: left;\r\n  min-width: 160px;\r\n  padding: 5px 0;\r\n  margin: 2px 0 0;\r\n  font-size: 14px;\r\n  text-align: left;\r\n  list-style: none;\r\n  background-color: #fff;\r\n  -webkit-background-clip: padding-box;\r\n          background-clip: padding-box;\r\n  border: 1px solid #ccc;\r\n  border: 1px solid rgba(0, 0, 0, .15);\r\n  border-radius: 4px;\r\n  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, .175);\r\n          box-shadow: 0 6px 12px rgba(0, 0, 0, .175);\r\n}\r\n.md-dropdown-menu.pull-right {\r\n  right: 0;\r\n  left: auto;\r\n}\r\n.md-dropdown-menu .divider {\r\n  height: 1px;\r\n  margin: 9px 0;\r\n  overflow: hidden;\r\n  background-color: #e5e5e5;\r\n}\r\n.md-dropdown-menu > li > a {\r\n  display: block;\r\n  padding: 3px 20px;\r\n  clear: both;\r\n  font-weight: normal;\r\n  line-height: 1.42857143;\r\n  color: #333;\r\n  white-space: nowrap;\r\n}\r\n.md-dropdown-menu > li > a:hover,\r\n.md-dropdown-menu > li > a:focus {\r\n  color: #262626;\r\n  text-decoration: none;\r\n  background-color: #f5f5f5;\r\n}\r\n.md-dropdown-menu > .active > a,\r\n.md-dropdown-menu > .active > a:hover,\r\n.md-dropdown-menu > .active > a:focus {\r\n  color: #fff;\r\n  text-decoration: none;\r\n  background-color: #337ab7;\r\n  outline: 0;\r\n}\r\n.md-dropdown-menu > .disabled > a,\r\n.md-dropdown-menu > .disabled > a:hover,\r\n.md-dropdown-menu > .disabled > a:focus {\r\n  color: #777;\r\n}\r\n.md-dropdown-menu > .disabled > a:hover,\r\n.md-dropdown-menu > .disabled > a:focus {\r\n  text-decoration: none;\r\n  cursor: not-allowed;\r\n  background-color: transparent;\r\n  background-image: none;\r\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);\r\n}\r\n.open > .md-dropdown-menu {\r\n  display: block;\r\n}\r\n.open > a {\r\n  outline: 0;\r\n}\r\n.md-dropdown-menu-right {\r\n  right: 0;\r\n  left: auto;\r\n}\r\n.md-dropdown-menu-left {\r\n  right: auto;\r\n  left: 0;\r\n}\r\n.md-dropdown-header {\r\n  display: block;\r\n  padding: 3px 20px;\r\n  font-size: 12px;\r\n  line-height: 1.42857143;\r\n  color: #777;\r\n  white-space: nowrap;\r\n}\r\n.md-dropdown-backdrop {\r\n  position: fixed;\r\n  top: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  z-index: 990;\r\n}\r\n.pull-right > .md-dropdown-menu {\r\n  right: 0;\r\n  left: auto;\r\n}\r\n.md-dropup .caret,\r\n.navbar-fixed-bottom .md-dropdown .caret {\r\n  content: \"\";\r\n  border-top: 0;\r\n  border-bottom: 4px dashed;\r\n  border-bottom: 4px solid \\9;\r\n}\r\n.md-dropup .md-dropdown-menu,\r\n.navbar-fixed-bottom .md-dropdown .md-dropdown-menu {\r\n  top: auto;\r\n  bottom: 100%;\r\n  margin-bottom: 2px;\r\n}\r\n@media (min-width: 768px) {\r\n  .md-dropdown-menu {\r\n    right: 0;\r\n    left: auto;\r\n  }\r\n   .md-dropdown-menu-left {\r\n    right: auto;\r\n    left: 0;\r\n  }\r\n}\r\n\r\n</style>\r\n\r\nfffffffff\r\n<br />\r\n<div>\r\n\r\n    <input type=\"text\" name=\"md-dropdown_input\" class=\"md-dropdown-input\" />\r\n\r\n    <span class=\"arrow-down\" (click)=toggle()></span>\r\n\r\n\r\n\r\n    <ul class=\"md-dropdown-menu\">\r\n        <li class=\"md-dropdown-item\">\r\n            <a>Apple2</a>\r\n\r\n        </li>\r\n        <li class=\"md-dropdown-item\">\r\n            <a>Apple2</a>\r\n\r\n        </li>\r\n        <li class=\"dropdown-item\">\r\n            <a>Apple2</a>\r\n\r\n        </li>\r\n        <li class=\"dropdown-item\">\r\n            <a>Apple2</a>\r\n\r\n        </li>\r\n        <li class=\"dropdown-item\">\r\n            <a>Apple2</a>\r\n\r\n        </li>\r\n        <li class=\"dropdown-item\">\r\n            <a>Apple2</a>\r\n\r\n        </li>\r\n        <li class=\"dropdown-item\">\r\n            <a>Apple2</a>\r\n\r\n        </li>\r\n\r\n\r\n\r\n\r\n    </ul>\r\n    <br />\r\n</div>\r\n\r\n\r\n"

/***/ },
/* 617 */,
/* 618 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(8);
	/**
	 * Represents a push-based event or value that an {@link Observable} can emit.
	 * This class is particularly useful for operators that manage notifications,
	 * like {@link materialize}, {@link dematerialize}, {@link observeOn}, and
	 * others. Besides wrapping the actual delivered value, it also annotates it
	 * with metadata of, for instance, what type of push message it is (`next`,
	 * `error`, or `complete`).
	 *
	 * @see {@link materialize}
	 * @see {@link dematerialize}
	 * @see {@link observeOn}
	 *
	 * @class Notification<T>
	 */
	var Notification = (function () {
	    function Notification(kind, value, exception) {
	        this.kind = kind;
	        this.value = value;
	        this.exception = exception;
	        this.hasValue = kind === 'N';
	    }
	    /**
	     * Delivers to the given `observer` the value wrapped by this Notification.
	     * @param {Observer} observer
	     * @return
	     */
	    Notification.prototype.observe = function (observer) {
	        switch (this.kind) {
	            case 'N':
	                return observer.next && observer.next(this.value);
	            case 'E':
	                return observer.error && observer.error(this.exception);
	            case 'C':
	                return observer.complete && observer.complete();
	        }
	    };
	    /**
	     * Given some {@link Observer} callbacks, deliver the value represented by the
	     * current Notification to the correctly corresponding callback.
	     * @param {function(value: T): void} next An Observer `next` callback.
	     * @param {function(err: any): void} [error] An Observer `error` callback.
	     * @param {function(): void} [complete] An Observer `complete` callback.
	     * @return {any}
	     */
	    Notification.prototype.do = function (next, error, complete) {
	        var kind = this.kind;
	        switch (kind) {
	            case 'N':
	                return next && next(this.value);
	            case 'E':
	                return error && error(this.exception);
	            case 'C':
	                return complete && complete();
	        }
	    };
	    /**
	     * Takes an Observer or its individual callback functions, and calls `observe`
	     * or `do` methods accordingly.
	     * @param {Observer|function(value: T): void} nextOrObserver An Observer or
	     * the `next` callback.
	     * @param {function(err: any): void} [error] An Observer `error` callback.
	     * @param {function(): void} [complete] An Observer `complete` callback.
	     * @return {any}
	     */
	    Notification.prototype.accept = function (nextOrObserver, error, complete) {
	        if (nextOrObserver && typeof nextOrObserver.next === 'function') {
	            return this.observe(nextOrObserver);
	        }
	        else {
	            return this.do(nextOrObserver, error, complete);
	        }
	    };
	    /**
	     * Returns a simple Observable that just delivers the notification represented
	     * by this Notification instance.
	     * @return {any}
	     */
	    Notification.prototype.toObservable = function () {
	        var kind = this.kind;
	        switch (kind) {
	            case 'N':
	                return Observable_1.Observable.of(this.value);
	            case 'E':
	                return Observable_1.Observable.throw(this.exception);
	            case 'C':
	                return Observable_1.Observable.empty();
	        }
	    };
	    /**
	     * A shortcut to create a Notification instance of the type `next` from a
	     * given value.
	     * @param {T} value The `next` value.
	     * @return {Notification<T>} The "next" Notification representing the
	     * argument.
	     */
	    Notification.createNext = function (value) {
	        if (typeof value !== 'undefined') {
	            return new Notification('N', value);
	        }
	        return this.undefinedValueNotification;
	    };
	    /**
	     * A shortcut to create a Notification instance of the type `error` from a
	     * given error.
	     * @param {any} [err] The `error` exception.
	     * @return {Notification<T>} The "error" Notification representing the
	     * argument.
	     */
	    Notification.createError = function (err) {
	        return new Notification('E', undefined, err);
	    };
	    /**
	     * A shortcut to create a Notification instance of the type `complete`.
	     * @return {Notification<any>} The valueless "complete" Notification.
	     */
	    Notification.createComplete = function () {
	        return this.completeNotification;
	    };
	    Notification.completeNotification = new Notification('C');
	    Notification.undefinedValueNotification = new Notification('N', undefined);
	    return Notification;
	}());
	exports.Notification = Notification;
	//# sourceMappingURL=Notification.js.map

/***/ },
/* 619 */,
/* 620 */,
/* 621 */,
/* 622 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(8);
	var fromEvent_1 = __webpack_require__(638);
	Observable_1.Observable.fromEvent = fromEvent_1.fromEvent;
	//# sourceMappingURL=fromEvent.js.map

/***/ },
/* 623 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(8);
	var interval_1 = __webpack_require__(639);
	Observable_1.Observable.interval = interval_1.interval;
	//# sourceMappingURL=interval.js.map

/***/ },
/* 624 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(8);
	var concatMap_1 = __webpack_require__(640);
	Observable_1.Observable.prototype.concatMap = concatMap_1.concatMap;
	//# sourceMappingURL=concatMap.js.map

/***/ },
/* 625 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(8);
	var distinctUntilChanged_1 = __webpack_require__(641);
	Observable_1.Observable.prototype.distinctUntilChanged = distinctUntilChanged_1.distinctUntilChanged;
	//# sourceMappingURL=distinctUntilChanged.js.map

/***/ },
/* 626 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(8);
	var do_1 = __webpack_require__(642);
	Observable_1.Observable.prototype.do = do_1._do;
	//# sourceMappingURL=do.js.map

/***/ },
/* 627 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(8);
	var let_1 = __webpack_require__(643);
	Observable_1.Observable.prototype.let = let_1.letProto;
	Observable_1.Observable.prototype.letBind = let_1.letProto;
	//# sourceMappingURL=let.js.map

/***/ },
/* 628 */,
/* 629 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(8);
	var observeOn_1 = __webpack_require__(646);
	Observable_1.Observable.prototype.observeOn = observeOn_1.observeOn;
	//# sourceMappingURL=observeOn.js.map

/***/ },
/* 630 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(8);
	var scan_1 = __webpack_require__(647);
	Observable_1.Observable.prototype.scan = scan_1.scan;
	//# sourceMappingURL=scan.js.map

/***/ },
/* 631 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(8);
	var take_1 = __webpack_require__(649);
	Observable_1.Observable.prototype.take = take_1.take;
	//# sourceMappingURL=take.js.map

/***/ },
/* 632 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(8);
	var takeWhile_1 = __webpack_require__(650);
	Observable_1.Observable.prototype.takeWhile = takeWhile_1.takeWhile;
	//# sourceMappingURL=takeWhile.js.map

/***/ },
/* 633 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subject_1 = __webpack_require__(35);
	var Observable_1 = __webpack_require__(8);
	var Subscriber_1 = __webpack_require__(36);
	var Subscription_1 = __webpack_require__(95);
	/**
	 * @class ConnectableObservable<T>
	 */
	var ConnectableObservable = (function (_super) {
	    __extends(ConnectableObservable, _super);
	    function ConnectableObservable(source, subjectFactory) {
	        _super.call(this);
	        this.source = source;
	        this.subjectFactory = subjectFactory;
	        this._refCount = 0;
	    }
	    ConnectableObservable.prototype._subscribe = function (subscriber) {
	        return this.getSubject().subscribe(subscriber);
	    };
	    ConnectableObservable.prototype.getSubject = function () {
	        var subject = this._subject;
	        if (!subject || subject.isStopped) {
	            this._subject = this.subjectFactory();
	        }
	        return this._subject;
	    };
	    ConnectableObservable.prototype.connect = function () {
	        var connection = this._connection;
	        if (!connection) {
	            connection = this._connection = new Subscription_1.Subscription();
	            connection.add(this.source
	                .subscribe(new ConnectableSubscriber(this.getSubject(), this)));
	            if (connection.isUnsubscribed) {
	                this._connection = null;
	                connection = Subscription_1.Subscription.EMPTY;
	            }
	            else {
	                this._connection = connection;
	            }
	        }
	        return connection;
	    };
	    ConnectableObservable.prototype.refCount = function () {
	        return this.lift(new RefCountOperator(this));
	    };
	    return ConnectableObservable;
	}(Observable_1.Observable));
	exports.ConnectableObservable = ConnectableObservable;
	var ConnectableSubscriber = (function (_super) {
	    __extends(ConnectableSubscriber, _super);
	    function ConnectableSubscriber(destination, connectable) {
	        _super.call(this, destination);
	        this.connectable = connectable;
	    }
	    ConnectableSubscriber.prototype._error = function (err) {
	        this._unsubscribe();
	        _super.prototype._error.call(this, err);
	    };
	    ConnectableSubscriber.prototype._complete = function () {
	        this._unsubscribe();
	        _super.prototype._complete.call(this);
	    };
	    ConnectableSubscriber.prototype._unsubscribe = function () {
	        var connectable = this.connectable;
	        if (connectable) {
	            this.connectable = null;
	            var connection = connectable._connection;
	            connectable._refCount = 0;
	            connectable._subject = null;
	            connectable._connection = null;
	            if (connection) {
	                connection.unsubscribe();
	            }
	        }
	    };
	    return ConnectableSubscriber;
	}(Subject_1.SubjectSubscriber));
	var RefCountOperator = (function () {
	    function RefCountOperator(connectable) {
	        this.connectable = connectable;
	    }
	    RefCountOperator.prototype.call = function (subscriber, source) {
	        var connectable = this.connectable;
	        connectable._refCount++;
	        var refCounter = new RefCountSubscriber(subscriber, connectable);
	        var subscription = source._subscribe(refCounter);
	        if (!refCounter.isUnsubscribed) {
	            refCounter.connection = connectable.connect();
	        }
	        return subscription;
	    };
	    return RefCountOperator;
	}());
	var RefCountSubscriber = (function (_super) {
	    __extends(RefCountSubscriber, _super);
	    function RefCountSubscriber(destination, connectable) {
	        _super.call(this, destination);
	        this.connectable = connectable;
	    }
	    RefCountSubscriber.prototype._unsubscribe = function () {
	        var connectable = this.connectable;
	        if (!connectable) {
	            this.connection = null;
	            return;
	        }
	        this.connectable = null;
	        var refCount = connectable._refCount;
	        if (refCount <= 0) {
	            this.connection = null;
	            return;
	        }
	        connectable._refCount = refCount - 1;
	        if (refCount > 1) {
	            this.connection = null;
	            return;
	        }
	        ///
	        // Compare the local RefCountSubscriber's connection Subscription to the
	        // connection Subscription on the shared ConnectableObservable. In cases
	        // where the ConnectableObservable source synchronously emits values, and
	        // the RefCountSubscriber's dowstream Observers synchronously unsubscribe,
	        // execution continues to here before the RefCountOperator has a chance to
	        // supply the RefCountSubscriber with the shared connection Subscription.
	        // For example:
	        // ```
	        // Observable.range(0, 10)
	        //   .publish()
	        //   .refCount()
	        //   .take(5)
	        //   .subscribe();
	        // ```
	        // In order to account for this case, RefCountSubscriber should only dispose
	        // the ConnectableObservable's shared connection Subscription if the
	        // connection Subscription exists, *and* either:
	        //   a. RefCountSubscriber doesn't have a reference to the shared connection
	        //      Subscription yet, or,
	        //   b. RefCountSubscriber's connection Subscription reference is identical
	        //      to the shared connection Subscription
	        ///
	        var connection = this.connection;
	        var sharedConnection = connectable._connection;
	        this.connection = null;
	        if (sharedConnection && (!connection || sharedConnection === connection)) {
	            sharedConnection.unsubscribe();
	        }
	    };
	    return RefCountSubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=ConnectableObservable.js.map

/***/ },
/* 634 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(8);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var EmptyObservable = (function (_super) {
	    __extends(EmptyObservable, _super);
	    function EmptyObservable(scheduler) {
	        _super.call(this);
	        this.scheduler = scheduler;
	    }
	    /**
	     * Creates an Observable that emits no items to the Observer and immediately
	     * emits a complete notification.
	     *
	     * <span class="informal">Just emits 'complete', and nothing else.
	     * </span>
	     *
	     * <img src="./img/empty.png" width="100%">
	     *
	     * This static operator is useful for creating a simple Observable that only
	     * emits the complete notification. It can be used for composing with other
	     * Observables, such as in a {@link mergeMap}.
	     *
	     * @example <caption>Emit the number 7, then complete.</caption>
	     * var result = Rx.Observable.empty().startWith(7);
	     * result.subscribe(x => console.log(x));
	     *
	     * @example <caption>Map and flatten only odd numbers to the sequence 'a', 'b', 'c'</caption>
	     * var interval = Rx.Observable.interval(1000);
	     * var result = interval.mergeMap(x =>
	     *   x % 2 === 1 ? Rx.Observable.of('a', 'b', 'c') : Rx.Observable.empty()
	     * );
	     * result.subscribe(x => console.log(x));
	     *
	     * @see {@link create}
	     * @see {@link never}
	     * @see {@link of}
	     * @see {@link throw}
	     *
	     * @param {Scheduler} [scheduler] A {@link Scheduler} to use for scheduling
	     * the emission of the complete notification.
	     * @return {Observable} An "empty" Observable: emits only the complete
	     * notification.
	     * @static true
	     * @name empty
	     * @owner Observable
	     */
	    EmptyObservable.create = function (scheduler) {
	        return new EmptyObservable(scheduler);
	    };
	    EmptyObservable.dispatch = function (arg) {
	        var subscriber = arg.subscriber;
	        subscriber.complete();
	    };
	    EmptyObservable.prototype._subscribe = function (subscriber) {
	        var scheduler = this.scheduler;
	        if (scheduler) {
	            return scheduler.schedule(EmptyObservable.dispatch, 0, { subscriber: subscriber });
	        }
	        else {
	            subscriber.complete();
	        }
	    };
	    return EmptyObservable;
	}(Observable_1.Observable));
	exports.EmptyObservable = EmptyObservable;
	//# sourceMappingURL=EmptyObservable.js.map

/***/ },
/* 635 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(8);
	var tryCatch_1 = __webpack_require__(229);
	var errorObject_1 = __webpack_require__(145);
	var Subscription_1 = __webpack_require__(95);
	function isNodeStyleEventEmmitter(sourceObj) {
	    return !!sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';
	}
	function isJQueryStyleEventEmitter(sourceObj) {
	    return !!sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';
	}
	function isNodeList(sourceObj) {
	    return !!sourceObj && sourceObj.toString() === '[object NodeList]';
	}
	function isHTMLCollection(sourceObj) {
	    return !!sourceObj && sourceObj.toString() === '[object HTMLCollection]';
	}
	function isEventTarget(sourceObj) {
	    return !!sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';
	}
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var FromEventObservable = (function (_super) {
	    __extends(FromEventObservable, _super);
	    function FromEventObservable(sourceObj, eventName, selector) {
	        _super.call(this);
	        this.sourceObj = sourceObj;
	        this.eventName = eventName;
	        this.selector = selector;
	    }
	    /**
	     * Creates an Observable that emits events of a specific type coming from the
	     * given event target.
	     *
	     * <span class="informal">Creates an Observable from DOM events, or Node
	     * EventEmitter events or others.</span>
	     *
	     * <img src="./img/fromEvent.png" width="100%">
	     *
	     * Creates an Observable by attaching an event listener to an "event target",
	     * which may be an object with `addEventListener` and `removeEventListener`,
	     * a Node.js EventEmitter, a jQuery style EventEmitter, a NodeList from the
	     * DOM, or an HTMLCollection from the DOM. The event handler is attached when
	     * the output Observable is subscribed, and removed when the Subscription is
	     * unsubscribed.
	     *
	     * @example <caption>Emits clicks happening on the DOM document</caption>
	     * var clicks = Rx.Observable.fromEvent(document, 'click');
	     * clicks.subscribe(x => console.log(x));
	     *
	     * @see {@link from}
	     * @see {@link fromEventPattern}
	     *
	     * @param {EventTargetLike} target The DOMElement, event target, Node.js
	     * EventEmitter, NodeList or HTMLCollection to attach the event handler to.
	     * @param {string} eventName The event name of interest, being emitted by the
	     * `target`.
	     * @param {function(...args: any): T} [selector] An optional function to
	     * post-process results. It takes the arguments from the event handler and
	     * should return a single value.
	     * @return {Observable<T>}
	     * @static true
	     * @name fromEvent
	     * @owner Observable
	     */
	    FromEventObservable.create = function (target, eventName, selector) {
	        return new FromEventObservable(target, eventName, selector);
	    };
	    FromEventObservable.setupSubscription = function (sourceObj, eventName, handler, subscriber) {
	        var unsubscribe;
	        if (isNodeList(sourceObj) || isHTMLCollection(sourceObj)) {
	            for (var i = 0, len = sourceObj.length; i < len; i++) {
	                FromEventObservable.setupSubscription(sourceObj[i], eventName, handler, subscriber);
	            }
	        }
	        else if (isEventTarget(sourceObj)) {
	            var source_1 = sourceObj;
	            sourceObj.addEventListener(eventName, handler);
	            unsubscribe = function () { return source_1.removeEventListener(eventName, handler); };
	        }
	        else if (isJQueryStyleEventEmitter(sourceObj)) {
	            var source_2 = sourceObj;
	            sourceObj.on(eventName, handler);
	            unsubscribe = function () { return source_2.off(eventName, handler); };
	        }
	        else if (isNodeStyleEventEmmitter(sourceObj)) {
	            var source_3 = sourceObj;
	            sourceObj.addListener(eventName, handler);
	            unsubscribe = function () { return source_3.removeListener(eventName, handler); };
	        }
	        subscriber.add(new Subscription_1.Subscription(unsubscribe));
	    };
	    FromEventObservable.prototype._subscribe = function (subscriber) {
	        var sourceObj = this.sourceObj;
	        var eventName = this.eventName;
	        var selector = this.selector;
	        var handler = selector ? function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i - 0] = arguments[_i];
	            }
	            var result = tryCatch_1.tryCatch(selector).apply(void 0, args);
	            if (result === errorObject_1.errorObject) {
	                subscriber.error(errorObject_1.errorObject.e);
	            }
	            else {
	                subscriber.next(result);
	            }
	        } : function (e) { return subscriber.next(e); };
	        FromEventObservable.setupSubscription(sourceObj, eventName, handler, subscriber);
	    };
	    return FromEventObservable;
	}(Observable_1.Observable));
	exports.FromEventObservable = FromEventObservable;
	//# sourceMappingURL=FromEventObservable.js.map

/***/ },
/* 636 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var isNumeric_1 = __webpack_require__(658);
	var Observable_1 = __webpack_require__(8);
	var async_1 = __webpack_require__(653);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var IntervalObservable = (function (_super) {
	    __extends(IntervalObservable, _super);
	    function IntervalObservable(period, scheduler) {
	        if (period === void 0) { period = 0; }
	        if (scheduler === void 0) { scheduler = async_1.async; }
	        _super.call(this);
	        this.period = period;
	        this.scheduler = scheduler;
	        if (!isNumeric_1.isNumeric(period) || period < 0) {
	            this.period = 0;
	        }
	        if (!scheduler || typeof scheduler.schedule !== 'function') {
	            this.scheduler = async_1.async;
	        }
	    }
	    /**
	     * Creates an Observable that emits sequential numbers every specified
	     * interval of time, on a specified Scheduler.
	     *
	     * <span class="informal">Emits incremental numbers periodically in time.
	     * </span>
	     *
	     * <img src="./img/interval.png" width="100%">
	     *
	     * `interval` returns an Observable that emits an infinite sequence of
	     * ascending integers, with a constant interval of time of your choosing
	     * between those emissions. The first emission is not sent immediately, but
	     * only after the first period has passed. By default, this operator uses the
	     * `async` Scheduler to provide a notion of time, but you may pass any
	     * Scheduler to it.
	     *
	     * @example <caption>Emits ascending numbers, one every second (1000ms)</caption>
	     * var numbers = Rx.Observable.interval(1000);
	     * numbers.subscribe(x => console.log(x));
	     *
	     * @see {@link timer}
	     * @see {@link delay}
	     *
	     * @param {number} [period=0] The interval size in milliseconds (by default)
	     * or the time unit determined by the scheduler's clock.
	     * @param {Scheduler} [scheduler=async] The Scheduler to use for scheduling
	     * the emission of values, and providing a notion of "time".
	     * @return {Observable} An Observable that emits a sequential number each time
	     * interval.
	     * @static true
	     * @name interval
	     * @owner Observable
	     */
	    IntervalObservable.create = function (period, scheduler) {
	        if (period === void 0) { period = 0; }
	        if (scheduler === void 0) { scheduler = async_1.async; }
	        return new IntervalObservable(period, scheduler);
	    };
	    IntervalObservable.dispatch = function (state) {
	        var index = state.index, subscriber = state.subscriber, period = state.period;
	        subscriber.next(index);
	        if (subscriber.isUnsubscribed) {
	            return;
	        }
	        state.index += 1;
	        this.schedule(state, period);
	    };
	    IntervalObservable.prototype._subscribe = function (subscriber) {
	        var index = 0;
	        var period = this.period;
	        var scheduler = this.scheduler;
	        subscriber.add(scheduler.schedule(IntervalObservable.dispatch, period, {
	            index: index, subscriber: subscriber, period: period
	        }));
	    };
	    return IntervalObservable;
	}(Observable_1.Observable));
	exports.IntervalObservable = IntervalObservable;
	//# sourceMappingURL=IntervalObservable.js.map

/***/ },
/* 637 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(8);
	var MulticastObservable = (function (_super) {
	    __extends(MulticastObservable, _super);
	    function MulticastObservable(source, connectable, selector) {
	        _super.call(this);
	        this.source = source;
	        this.connectable = connectable;
	        this.selector = selector;
	    }
	    MulticastObservable.prototype._subscribe = function (subscriber) {
	        var _a = this, selector = _a.selector, connectable = _a.connectable;
	        var subscription = selector(connectable).subscribe(subscriber);
	        subscription.add(connectable.connect());
	        return subscription;
	    };
	    return MulticastObservable;
	}(Observable_1.Observable));
	exports.MulticastObservable = MulticastObservable;
	//# sourceMappingURL=MulticastObservable.js.map

/***/ },
/* 638 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var FromEventObservable_1 = __webpack_require__(635);
	exports.fromEvent = FromEventObservable_1.FromEventObservable.create;
	//# sourceMappingURL=fromEvent.js.map

/***/ },
/* 639 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var IntervalObservable_1 = __webpack_require__(636);
	exports.interval = IntervalObservable_1.IntervalObservable.create;
	//# sourceMappingURL=interval.js.map

/***/ },
/* 640 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var mergeMap_1 = __webpack_require__(368);
	/**
	 * Projects each source value to an Observable which is merged in the output
	 * Observable, in a serialized fashion waiting for each one to complete before
	 * merging the next.
	 *
	 * <span class="informal">Maps each value to an Observable, then flattens all of
	 * these inner Observables using {@link concatAll}.</span>
	 *
	 * <img src="./img/concatMap.png" width="100%">
	 *
	 * Returns an Observable that emits items based on applying a function that you
	 * supply to each item emitted by the source Observable, where that function
	 * returns an (so-called "inner") Observable. Each new inner Observable is
	 * concatenated with the previous inner Observable.
	 *
	 * __Warning:__ if source values arrive endlessly and faster than their
	 * corresponding inner Observables can complete, it will result in memory issues
	 * as inner Observables amass in an unbounded buffer waiting for their turn to
	 * be subscribed to.
	 *
	 * Note: `concatMap` is equivalent to `mergeMap` with concurrency parameter set
	 * to `1`.
	 *
	 * @example <caption>For each click event, tick every second from 0 to 3, with no concurrency</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var result = clicks.concatMap(ev => Rx.Observable.interval(1000).take(4));
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link concat}
	 * @see {@link concatAll}
	 * @see {@link concatMapTo}
	 * @see {@link exhaustMap}
	 * @see {@link mergeMap}
	 * @see {@link switchMap}
	 *
	 * @param {function(value: T, ?index: number): Observable} project A function
	 * that, when applied to an item emitted by the source Observable, returns an
	 * Observable.
	 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
	 * A function to produce the value on the output Observable based on the values
	 * and the indices of the source (outer) emission and the inner Observable
	 * emission. The arguments passed to this function are:
	 * - `outerValue`: the value that came from the source
	 * - `innerValue`: the value that came from the projected Observable
	 * - `outerIndex`: the "index" of the value that came from the source
	 * - `innerIndex`: the "index" of the value from the projected Observable
	 * @return {Observable} an observable of values merged from the projected
	 * Observables as they were subscribed to, one at a time. Optionally, these
	 * values may have been projected from a passed `projectResult` argument.
	 * @return {Observable} An Observable that emits the result of applying the
	 * projection function (and the optional `resultSelector`) to each item emitted
	 * by the source Observable and taking values from each projected inner
	 * Observable sequentially.
	 * @method concatMap
	 * @owner Observable
	 */
	function concatMap(project, resultSelector) {
	    return this.lift(new mergeMap_1.MergeMapOperator(project, resultSelector, 1));
	}
	exports.concatMap = concatMap;
	//# sourceMappingURL=concatMap.js.map

/***/ },
/* 641 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(36);
	var tryCatch_1 = __webpack_require__(229);
	var errorObject_1 = __webpack_require__(145);
	/**
	 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item.
	 * If a comparator function is provided, then it will be called for each item to test for whether or not that value should be emitted.
	 * If a comparator function is not provided, an equality check is used by default.
	 * @param {function} [compare] optional comparison function called to test if an item is distinct from the previous item in the source.
	 * @return {Observable} an Observable that emits items from the source Observable with distinct values.
	 * @method distinctUntilChanged
	 * @owner Observable
	 */
	function distinctUntilChanged(compare, keySelector) {
	    return this.lift(new DistinctUntilChangedOperator(compare, keySelector));
	}
	exports.distinctUntilChanged = distinctUntilChanged;
	var DistinctUntilChangedOperator = (function () {
	    function DistinctUntilChangedOperator(compare, keySelector) {
	        this.compare = compare;
	        this.keySelector = keySelector;
	    }
	    DistinctUntilChangedOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new DistinctUntilChangedSubscriber(subscriber, this.compare, this.keySelector));
	    };
	    return DistinctUntilChangedOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var DistinctUntilChangedSubscriber = (function (_super) {
	    __extends(DistinctUntilChangedSubscriber, _super);
	    function DistinctUntilChangedSubscriber(destination, compare, keySelector) {
	        _super.call(this, destination);
	        this.keySelector = keySelector;
	        this.hasKey = false;
	        if (typeof compare === 'function') {
	            this.compare = compare;
	        }
	    }
	    DistinctUntilChangedSubscriber.prototype.compare = function (x, y) {
	        return x === y;
	    };
	    DistinctUntilChangedSubscriber.prototype._next = function (value) {
	        var keySelector = this.keySelector;
	        var key = value;
	        if (keySelector) {
	            key = tryCatch_1.tryCatch(this.keySelector)(value);
	            if (key === errorObject_1.errorObject) {
	                return this.destination.error(errorObject_1.errorObject.e);
	            }
	        }
	        var result = false;
	        if (this.hasKey) {
	            result = tryCatch_1.tryCatch(this.compare)(this.key, key);
	            if (result === errorObject_1.errorObject) {
	                return this.destination.error(errorObject_1.errorObject.e);
	            }
	        }
	        else {
	            this.hasKey = true;
	        }
	        if (Boolean(result) === false) {
	            this.key = key;
	            this.destination.next(value);
	        }
	    };
	    return DistinctUntilChangedSubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=distinctUntilChanged.js.map

/***/ },
/* 642 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(36);
	/**
	 * Perform a side effect for every emission on the source Observable, but return
	 * an Observable that is identical to the source.
	 *
	 * <span class="informal">Intercepts each emission on the source and runs a
	 * function, but returns an output which is identical to the source.</span>
	 *
	 * <img src="./img/do.png" width="100%">
	 *
	 * Returns a mirrored Observable of the source Observable, but modified so that
	 * the provided Observer is called to perform a side effect for every value,
	 * error, and completion emitted by the source. Any errors that are thrown in
	 * the aforementioned Observer or handlers are safely sent down the error path
	 * of the output Observable.
	 *
	 * This operator is useful for debugging your Observables for the correct values
	 * or performing other side effects.
	 *
	 * Note: this is different to a `subscribe` on the Observable. If the Observable
	 * returned by `do` is not subscribed, the side effects specified by the
	 * Observer will never happen. `do` therefore simply spies on existing
	 * execution, it does not trigger an execution to happen like `subscribe` does.
	 *
	 * @example <caption>Map every every click to the clientX position of that click, while also logging the click event</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var positions = clicks
	 *   .do(ev => console.log(ev))
	 *   .map(ev => ev.clientX);
	 * positions.subscribe(x => console.log(x));
	 *
	 * @see {@link map}
	 * @see {@link subscribe}
	 *
	 * @param {Observer|function} [nextOrObserver] A normal Observer object or a
	 * callback for `next`.
	 * @param {function} [error] Callback for errors in the source.
	 * @param {function} [complete] Callback for the completion of the source.
	 * @return {Observable} An Observable identical to the source, but runs the
	 * specified Observer or callback(s) for each item.
	 * @method do
	 * @name do
	 * @owner Observable
	 */
	function _do(nextOrObserver, error, complete) {
	    return this.lift(new DoOperator(nextOrObserver, error, complete));
	}
	exports._do = _do;
	var DoOperator = (function () {
	    function DoOperator(nextOrObserver, error, complete) {
	        this.nextOrObserver = nextOrObserver;
	        this.error = error;
	        this.complete = complete;
	    }
	    DoOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new DoSubscriber(subscriber, this.nextOrObserver, this.error, this.complete));
	    };
	    return DoOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var DoSubscriber = (function (_super) {
	    __extends(DoSubscriber, _super);
	    function DoSubscriber(destination, nextOrObserver, error, complete) {
	        _super.call(this, destination);
	        var safeSubscriber = new Subscriber_1.Subscriber(nextOrObserver, error, complete);
	        safeSubscriber.syncErrorThrowable = true;
	        this.add(safeSubscriber);
	        this.safeSubscriber = safeSubscriber;
	    }
	    DoSubscriber.prototype._next = function (value) {
	        var safeSubscriber = this.safeSubscriber;
	        safeSubscriber.next(value);
	        if (safeSubscriber.syncErrorThrown) {
	            this.destination.error(safeSubscriber.syncErrorValue);
	        }
	        else {
	            this.destination.next(value);
	        }
	    };
	    DoSubscriber.prototype._error = function (err) {
	        var safeSubscriber = this.safeSubscriber;
	        safeSubscriber.error(err);
	        if (safeSubscriber.syncErrorThrown) {
	            this.destination.error(safeSubscriber.syncErrorValue);
	        }
	        else {
	            this.destination.error(err);
	        }
	    };
	    DoSubscriber.prototype._complete = function () {
	        var safeSubscriber = this.safeSubscriber;
	        safeSubscriber.complete();
	        if (safeSubscriber.syncErrorThrown) {
	            this.destination.error(safeSubscriber.syncErrorValue);
	        }
	        else {
	            this.destination.complete();
	        }
	    };
	    return DoSubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=do.js.map

/***/ },
/* 643 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * @param func
	 * @return {Observable<R>}
	 * @method let
	 * @owner Observable
	 */
	function letProto(func) {
	    return func(this);
	}
	exports.letProto = letProto;
	//# sourceMappingURL=let.js.map

/***/ },
/* 644 */,
/* 645 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var MulticastObservable_1 = __webpack_require__(637);
	var ConnectableObservable_1 = __webpack_require__(633);
	/**
	 * Returns an Observable that emits the results of invoking a specified selector on items
	 * emitted by a ConnectableObservable that shares a single subscription to the underlying stream.
	 *
	 * <img src="./img/multicast.png" width="100%">
	 *
	 * @param {Function|Subject} Factory function to create an intermediate subject through
	 * which the source sequence's elements will be multicast to the selector function
	 * or Subject to push source elements into.
	 * @param {Function} Optional selector function that can use the multicasted source stream
	 * as many times as needed, without causing multiple subscriptions to the source stream.
	 * Subscribers to the given source will receive all notifications of the source from the
	 * time of the subscription forward.
	 * @return {Observable} an Observable that emits the results of invoking the selector
	 * on the items emitted by a `ConnectableObservable` that shares a single subscription to
	 * the underlying stream.
	 * @method multicast
	 * @owner Observable
	 */
	function multicast(subjectOrSubjectFactory, selector) {
	    var subjectFactory;
	    if (typeof subjectOrSubjectFactory === 'function') {
	        subjectFactory = subjectOrSubjectFactory;
	    }
	    else {
	        subjectFactory = function subjectFactory() {
	            return subjectOrSubjectFactory;
	        };
	    }
	    var connectable = new ConnectableObservable_1.ConnectableObservable(this, subjectFactory);
	    return selector ? new MulticastObservable_1.MulticastObservable(this, connectable, selector) : connectable;
	}
	exports.multicast = multicast;
	//# sourceMappingURL=multicast.js.map

/***/ },
/* 646 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(36);
	var Notification_1 = __webpack_require__(618);
	/**
	 * @see {@link Notification}
	 *
	 * @param scheduler
	 * @param delay
	 * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
	 * @method observeOn
	 * @owner Observable
	 */
	function observeOn(scheduler, delay) {
	    if (delay === void 0) { delay = 0; }
	    return this.lift(new ObserveOnOperator(scheduler, delay));
	}
	exports.observeOn = observeOn;
	var ObserveOnOperator = (function () {
	    function ObserveOnOperator(scheduler, delay) {
	        if (delay === void 0) { delay = 0; }
	        this.scheduler = scheduler;
	        this.delay = delay;
	    }
	    ObserveOnOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new ObserveOnSubscriber(subscriber, this.scheduler, this.delay));
	    };
	    return ObserveOnOperator;
	}());
	exports.ObserveOnOperator = ObserveOnOperator;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var ObserveOnSubscriber = (function (_super) {
	    __extends(ObserveOnSubscriber, _super);
	    function ObserveOnSubscriber(destination, scheduler, delay) {
	        if (delay === void 0) { delay = 0; }
	        _super.call(this, destination);
	        this.scheduler = scheduler;
	        this.delay = delay;
	    }
	    ObserveOnSubscriber.dispatch = function (arg) {
	        var notification = arg.notification, destination = arg.destination;
	        notification.observe(destination);
	    };
	    ObserveOnSubscriber.prototype.scheduleMessage = function (notification) {
	        this.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
	    };
	    ObserveOnSubscriber.prototype._next = function (value) {
	        this.scheduleMessage(Notification_1.Notification.createNext(value));
	    };
	    ObserveOnSubscriber.prototype._error = function (err) {
	        this.scheduleMessage(Notification_1.Notification.createError(err));
	    };
	    ObserveOnSubscriber.prototype._complete = function () {
	        this.scheduleMessage(Notification_1.Notification.createComplete());
	    };
	    return ObserveOnSubscriber;
	}(Subscriber_1.Subscriber));
	exports.ObserveOnSubscriber = ObserveOnSubscriber;
	var ObserveOnMessage = (function () {
	    function ObserveOnMessage(notification, destination) {
	        this.notification = notification;
	        this.destination = destination;
	    }
	    return ObserveOnMessage;
	}());
	exports.ObserveOnMessage = ObserveOnMessage;
	//# sourceMappingURL=observeOn.js.map

/***/ },
/* 647 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(36);
	/**
	 * Applies an accumulator function over the source Observable, and returns each
	 * intermediate result, with an optional seed value.
	 *
	 * <span class="informal">It's like {@link reduce}, but emits the current
	 * accumulation whenever the source emits a value.</span>
	 *
	 * <img src="./img/scan.png" width="100%">
	 *
	 * Combines together all values emitted on the source, using an accumulator
	 * function that knows how to join a new source value into the accumulation from
	 * the past. Is similar to {@link reduce}, but emits the intermediate
	 * accumulations.
	 *
	 * Returns an Observable that applies a specified `accumulator` function to each
	 * item emitted by the source Observable. If a `seed` value is specified, then
	 * that value will be used as the initial value for the accumulator. If no seed
	 * value is specified, the first item of the source is used as the seed.
	 *
	 * @example <caption>Count the number of click events</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var ones = clicks.mapTo(1);
	 * var seed = 0;
	 * var count = ones.scan((acc, one) => acc + one, seed);
	 * count.subscribe(x => console.log(x));
	 *
	 * @see {@link expand}
	 * @see {@link mergeScan}
	 * @see {@link reduce}
	 *
	 * @param {function(acc: R, value: T, index: number): R} accumulator
	 * The accumulator function called on each source value.
	 * @param {T|R} [seed] The initial accumulation value.
	 * @return {Observable<R>} An observable of the accumulated values.
	 * @method scan
	 * @owner Observable
	 */
	function scan(accumulator, seed) {
	    return this.lift(new ScanOperator(accumulator, seed));
	}
	exports.scan = scan;
	var ScanOperator = (function () {
	    function ScanOperator(accumulator, seed) {
	        this.accumulator = accumulator;
	        this.seed = seed;
	    }
	    ScanOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new ScanSubscriber(subscriber, this.accumulator, this.seed));
	    };
	    return ScanOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var ScanSubscriber = (function (_super) {
	    __extends(ScanSubscriber, _super);
	    function ScanSubscriber(destination, accumulator, seed) {
	        _super.call(this, destination);
	        this.accumulator = accumulator;
	        this.index = 0;
	        this.accumulatorSet = false;
	        this.seed = seed;
	        this.accumulatorSet = typeof seed !== 'undefined';
	    }
	    Object.defineProperty(ScanSubscriber.prototype, "seed", {
	        get: function () {
	            return this._seed;
	        },
	        set: function (value) {
	            this.accumulatorSet = true;
	            this._seed = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ScanSubscriber.prototype._next = function (value) {
	        if (!this.accumulatorSet) {
	            this.seed = value;
	            this.destination.next(value);
	        }
	        else {
	            return this._tryNext(value);
	        }
	    };
	    ScanSubscriber.prototype._tryNext = function (value) {
	        var index = this.index++;
	        var result;
	        try {
	            result = this.accumulator(this.seed, value, index);
	        }
	        catch (err) {
	            this.destination.error(err);
	        }
	        this.seed = result;
	        this.destination.next(result);
	    };
	    return ScanSubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=scan.js.map

/***/ },
/* 648 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var multicast_1 = __webpack_require__(645);
	var Subject_1 = __webpack_require__(35);
	function shareSubjectFactory() {
	    return new Subject_1.Subject();
	}
	/**
	 * Returns a new Observable that multicasts (shares) the original Observable. As long as there is at least one
	 * Subscriber this Observable will be subscribed and emitting data. When all subscribers have unsubscribed it will
	 * unsubscribe from the source Observable. Because the Observable is multicasting it makes the stream `hot`.
	 * This is an alias for .publish().refCount().
	 *
	 * <img src="./img/share.png" width="100%">
	 *
	 * @return {Observable<T>} an Observable that upon connection causes the source Observable to emit items to its Observers
	 * @method share
	 * @owner Observable
	 */
	function share() {
	    return multicast_1.multicast.call(this, shareSubjectFactory).refCount();
	}
	exports.share = share;
	;
	//# sourceMappingURL=share.js.map

/***/ },
/* 649 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(36);
	var ArgumentOutOfRangeError_1 = __webpack_require__(656);
	var EmptyObservable_1 = __webpack_require__(634);
	/**
	 * Emits only the first `count` values emitted by the source Observable.
	 *
	 * <span class="informal">Takes the first `count` values from the source, then
	 * completes.</span>
	 *
	 * <img src="./img/take.png" width="100%">
	 *
	 * `take` returns an Observable that emits only the first `count` values emitted
	 * by the source Observable. If the source emits fewer than `count` values then
	 * all of its values are emitted. After that, it completes, regardless if the
	 * source completes.
	 *
	 * @example <caption>Take the first 5 seconds of an infinite 1-second interval Observable</caption>
	 * var interval = Rx.Observable.interval(1000);
	 * var five = interval.take(5);
	 * five.subscribe(x => console.log(x));
	 *
	 * @see {@link takeLast}
	 * @see {@link takeUntil}
	 * @see {@link takeWhile}
	 * @see {@link skip}
	 *
	 * @throws {ArgumentOutOfRangeError} When using `take(i)`, it delivers an
	 * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0`.
	 *
	 * @param {number} count The maximum number of `next` values to emit.
	 * @return {Observable<T>} An Observable that emits only the first `count`
	 * values emitted by the source Observable, or all of the values from the source
	 * if the source emits fewer than `count` values.
	 * @method take
	 * @owner Observable
	 */
	function take(count) {
	    if (count === 0) {
	        return new EmptyObservable_1.EmptyObservable();
	    }
	    else {
	        return this.lift(new TakeOperator(count));
	    }
	}
	exports.take = take;
	var TakeOperator = (function () {
	    function TakeOperator(total) {
	        this.total = total;
	        if (this.total < 0) {
	            throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
	        }
	    }
	    TakeOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new TakeSubscriber(subscriber, this.total));
	    };
	    return TakeOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var TakeSubscriber = (function (_super) {
	    __extends(TakeSubscriber, _super);
	    function TakeSubscriber(destination, total) {
	        _super.call(this, destination);
	        this.total = total;
	        this.count = 0;
	    }
	    TakeSubscriber.prototype._next = function (value) {
	        var total = this.total;
	        if (++this.count <= total) {
	            this.destination.next(value);
	            if (this.count === total) {
	                this.destination.complete();
	                this.unsubscribe();
	            }
	        }
	    };
	    return TakeSubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=take.js.map

/***/ },
/* 650 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(36);
	/**
	 * Emits values emitted by the source Observable so long as each value satisfies
	 * the given `predicate`, and then completes as soon as this `predicate` is not
	 * satisfied.
	 *
	 * <span class="informal">Takes values from the source only while they pass the
	 * condition given. When the first value does not satisfy, it completes.</span>
	 *
	 * <img src="./img/takeWhile.png" width="100%">
	 *
	 * `takeWhile` subscribes and begins mirroring the source Observable. Each value
	 * emitted on the source is given to the `predicate` function which returns a
	 * boolean, representing a condition to be satisfied by the source values. The
	 * output Observable emits the source values until such time as the `predicate`
	 * returns false, at which point `takeWhile` stops mirroring the source
	 * Observable and completes the output Observable.
	 *
	 * @example <caption>Emit click events only while the clientX property is greater than 200</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var result = clicks.takeWhile(ev => ev.clientX > 200);
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link take}
	 * @see {@link takeLast}
	 * @see {@link takeUntil}
	 * @see {@link skip}
	 *
	 * @param {function(value: T, index: number): boolean} predicate A function that
	 * evaluates a value emitted by the source Observable and returns a boolean.
	 * Also takes the (zero-based) index as the second argument.
	 * @return {Observable<T>} An Observable that emits the values from the source
	 * Observable so long as each value satisfies the condition defined by the
	 * `predicate`, then completes.
	 * @method takeWhile
	 * @owner Observable
	 */
	function takeWhile(predicate) {
	    return this.lift(new TakeWhileOperator(predicate));
	}
	exports.takeWhile = takeWhile;
	var TakeWhileOperator = (function () {
	    function TakeWhileOperator(predicate) {
	        this.predicate = predicate;
	    }
	    TakeWhileOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new TakeWhileSubscriber(subscriber, this.predicate));
	    };
	    return TakeWhileOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var TakeWhileSubscriber = (function (_super) {
	    __extends(TakeWhileSubscriber, _super);
	    function TakeWhileSubscriber(destination, predicate) {
	        _super.call(this, destination);
	        this.predicate = predicate;
	        this.index = 0;
	    }
	    TakeWhileSubscriber.prototype._next = function (value) {
	        var destination = this.destination;
	        var result;
	        try {
	            result = this.predicate(value, this.index++);
	        }
	        catch (err) {
	            destination.error(err);
	            return;
	        }
	        this.nextOrComplete(value, result);
	    };
	    TakeWhileSubscriber.prototype.nextOrComplete = function (value, predicateResult) {
	        var destination = this.destination;
	        if (Boolean(predicateResult)) {
	            destination.next(value);
	        }
	        else {
	            destination.complete();
	        }
	    };
	    return TakeWhileSubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=takeWhile.js.map

/***/ },
/* 651 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var FutureAction_1 = __webpack_require__(226);
	var QueueScheduler_1 = __webpack_require__(369);
	var AsyncScheduler = (function (_super) {
	    __extends(AsyncScheduler, _super);
	    function AsyncScheduler() {
	        _super.apply(this, arguments);
	    }
	    AsyncScheduler.prototype.scheduleNow = function (work, state) {
	        return new FutureAction_1.FutureAction(this, work).schedule(state, 0);
	    };
	    return AsyncScheduler;
	}(QueueScheduler_1.QueueScheduler));
	exports.AsyncScheduler = AsyncScheduler;
	//# sourceMappingURL=AsyncScheduler.js.map

/***/ },
/* 652 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var FutureAction_1 = __webpack_require__(226);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var QueueAction = (function (_super) {
	    __extends(QueueAction, _super);
	    function QueueAction() {
	        _super.apply(this, arguments);
	    }
	    QueueAction.prototype._schedule = function (state, delay) {
	        if (delay === void 0) { delay = 0; }
	        if (delay > 0) {
	            return _super.prototype._schedule.call(this, state, delay);
	        }
	        this.delay = delay;
	        this.state = state;
	        var scheduler = this.scheduler;
	        scheduler.actions.push(this);
	        scheduler.flush();
	        return this;
	    };
	    return QueueAction;
	}(FutureAction_1.FutureAction));
	exports.QueueAction = QueueAction;
	//# sourceMappingURL=QueueAction.js.map

/***/ },
/* 653 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var AsyncScheduler_1 = __webpack_require__(651);
	exports.async = new AsyncScheduler_1.AsyncScheduler();
	//# sourceMappingURL=async.js.map

/***/ },
/* 654 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var QueueScheduler_1 = __webpack_require__(369);
	exports.queue = new QueueScheduler_1.QueueScheduler();
	//# sourceMappingURL=queue.js.map

/***/ },
/* 655 */,
/* 656 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * An error thrown when an element was queried at a certain index of an
	 * Observable, but no such index or position exists in that sequence.
	 *
	 * @see {@link elementAt}
	 * @see {@link take}
	 * @see {@link takeLast}
	 *
	 * @class ArgumentOutOfRangeError
	 */
	var ArgumentOutOfRangeError = (function (_super) {
	    __extends(ArgumentOutOfRangeError, _super);
	    function ArgumentOutOfRangeError() {
	        _super.call(this, 'argument out of range');
	        this.name = 'ArgumentOutOfRangeError';
	    }
	    return ArgumentOutOfRangeError;
	}(Error));
	exports.ArgumentOutOfRangeError = ArgumentOutOfRangeError;
	//# sourceMappingURL=ArgumentOutOfRangeError.js.map

/***/ },
/* 657 */,
/* 658 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var isArray_1 = __webpack_require__(228);
	function isNumeric(val) {
	    // parseFloat NaNs numeric-cast false positives (null|true|false|"")
	    // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
	    // subtraction forces infinities to NaN
	    // adding 1 corrects loss of precision from parseFloat (#15100)
	    return !isArray_1.isArray(val) && (val - parseFloat(val) + 1) >= 0;
	}
	exports.isNumeric = isNumeric;
	;
	//# sourceMappingURL=isNumeric.js.map

/***/ },
/* 659 */,
/* 660 */,
/* 661 */,
/* 662 */
/***/ function(module, exports) {

	"use strict";
	function throwError(e) { throw e; }
	exports.throwError = throwError;
	//# sourceMappingURL=throwError.js.map

/***/ },
/* 663 */,
/* 664 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var dispatcher_1 = __webpack_require__(372);
	var store_1 = __webpack_require__(374);
	var store_backend_1 = __webpack_require__(373);
	var utils_1 = __webpack_require__(375);
	exports.PRE_MIDDLEWARE = new core_1.OpaqueToken('ngrx/store/pre-middleware');
	exports.POST_MIDDLEWARE = new core_1.OpaqueToken('ngrx/store/post-middleware');
	exports.RESOLVED_PRE_MIDDLEWARE = new core_1.OpaqueToken('ngrx/store/resolved-pre-middleware');
	exports.RESOLVED_POST_MIDDLEWARE = new core_1.OpaqueToken('ngrx/store/resolved-post-middleware');
	exports.REDUCER = new core_1.OpaqueToken('ngrx/store/reducer');
	exports.INITIAL_STATE = new core_1.OpaqueToken('ngrx/store/initial-state');
	var dispatcherProvider = core_1.provide(dispatcher_1.Dispatcher, {
	    useFactory: function () {
	        return new dispatcher_1.Dispatcher();
	    }
	});
	var storeProvider = core_1.provide(store_1.Store, {
	    deps: [dispatcher_1.Dispatcher, store_backend_1.StoreBackend, exports.INITIAL_STATE],
	    useFactory: function (dispatcher, backend, initialState) {
	        return new store_1.Store(dispatcher, backend, initialState);
	    }
	});
	var storeBackendProvider = core_1.provide(store_backend_1.StoreBackend, {
	    deps: [dispatcher_1.Dispatcher, exports.REDUCER, exports.INITIAL_STATE, exports.RESOLVED_PRE_MIDDLEWARE, exports.RESOLVED_POST_MIDDLEWARE],
	    useFactory: function (dispatcher, reducer, initialState, preMiddleware, postMiddleware) {
	        return new store_backend_1.StoreBackend(dispatcher, reducer, initialState, preMiddleware, postMiddleware);
	    }
	});
	var resolvedPreMiddlewareProvider = core_1.provide(exports.RESOLVED_PRE_MIDDLEWARE, {
	    deps: [exports.PRE_MIDDLEWARE],
	    useFactory: function (middleware) {
	        return utils_1.compose.apply(void 0, middleware);
	    }
	});
	var resolvedPostMiddlewareProvider = core_1.provide(exports.RESOLVED_POST_MIDDLEWARE, {
	    deps: [exports.POST_MIDDLEWARE],
	    useFactory: function (middleware) {
	        return utils_1.compose.apply(void 0, middleware);
	    }
	});
	function provideStore(reducer, initialState) {
	    return [
	        core_1.provide(exports.REDUCER, {
	            useFactory: function () {
	                if (typeof reducer === 'function') {
	                    return reducer;
	                }
	                return utils_1.combineReducers(reducer);
	            }
	        }),
	        core_1.provide(exports.INITIAL_STATE, {
	            deps: [exports.REDUCER],
	            useFactory: function (reducer) {
	                if (initialState === undefined) {
	                    return reducer(undefined, { type: store_backend_1.ActionTypes.INIT });
	                }
	                return initialState;
	            }
	        }),
	        core_1.provide(exports.PRE_MIDDLEWARE, { multi: true, useValue: (function (T) { return T; }) }),
	        core_1.provide(exports.POST_MIDDLEWARE, { multi: true, useValue: (function (T) { return T; }) }),
	        dispatcherProvider,
	        storeProvider,
	        storeBackendProvider,
	        resolvedPreMiddlewareProvider,
	        resolvedPostMiddlewareProvider
	    ];
	}
	exports.provideStore = provideStore;
	function usePreMiddleware() {
	    var middleware = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        middleware[_i - 0] = arguments[_i];
	    }
	    return provideMiddlewareForToken(exports.PRE_MIDDLEWARE, middleware);
	}
	exports.usePreMiddleware = usePreMiddleware;
	function usePostMiddleware() {
	    var middleware = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        middleware[_i - 0] = arguments[_i];
	    }
	    return provideMiddlewareForToken(exports.POST_MIDDLEWARE, middleware);
	}
	exports.usePostMiddleware = usePostMiddleware;
	function createMiddleware(useFactory, deps) {
	    return core_1.provide(new core_1.OpaqueToken('@ngrx/store middleware'), {
	        deps: deps,
	        useFactory: useFactory
	    });
	}
	exports.createMiddleware = createMiddleware;
	function provideMiddlewareForToken(token, _middleware) {
	    function isProvider(t) {
	        return t instanceof core_1.Provider;
	    }
	    var provider = core_1.provide(token, {
	        multi: true,
	        deps: [core_1.Injector],
	        useFactory: function (injector) {
	            var middleware = _middleware.map(function (m) {
	                if (isProvider(m)) {
	                    return injector.get(m.token);
	                }
	                return m;
	            });
	            return utils_1.compose.apply(void 0, middleware);
	        }
	    });
	    return _middleware.filter(isProvider).concat([provider]);
	}
	exports.provideMiddlewareForToken = provideMiddlewareForToken;


/***/ },
/* 665 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * angular2-google-maps - Angular 2 components for Google Maps
	 * @version v0.10.0
	 * @link https://github.com/SebastianM/angular2-google-maps#readme
	 * @license MIT
	 */
	"use strict";
	var google_map_1 = __webpack_require__(377);
	var google_map_marker_1 = __webpack_require__(376);
	var google_map_info_window_1 = __webpack_require__(231);
	exports.ANGULAR2_GOOGLE_MAPS_DIRECTIVES = [google_map_1.SebmGoogleMap, google_map_marker_1.SebmGoogleMapMarker, google_map_info_window_1.SebmGoogleMapInfoWindow];

	

/***/ },
/* 666 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * angular2-google-maps - Angular 2 components for Google Maps
	 * @version v0.10.0
	 * @link https://github.com/SebastianM/angular2-google-maps#readme
	 * @license MIT
	 */
	"use strict";
	var google_map_1 = __webpack_require__(377);
	exports.SebmGoogleMap = google_map_1.SebmGoogleMap;
	var google_map_marker_1 = __webpack_require__(376);
	exports.SebmGoogleMapMarker = google_map_marker_1.SebmGoogleMapMarker;
	var google_map_info_window_1 = __webpack_require__(231);
	exports.SebmGoogleMapInfoWindow = google_map_info_window_1.SebmGoogleMapInfoWindow;
	var directives_const_1 = __webpack_require__(665);
	exports.ANGULAR2_GOOGLE_MAPS_DIRECTIVES = directives_const_1.ANGULAR2_GOOGLE_MAPS_DIRECTIVES;

	

/***/ },
/* 667 */
/***/ function(module, exports) {

	"use strict";
	exports.empty = {
	    isUnsubscribed: true,
	    next: function (value) { },
	    error: function (err) { throw err; },
	    complete: function () { }
	};
	

/***/ },
/* 668 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var isFunction_1 = __webpack_require__(381);
	var Subscription_1 = __webpack_require__(669);
	var rxSubscriber_1 = __webpack_require__(379);
	var Observer_1 = __webpack_require__(667);
	/**
	 * Implements the {@link Observer} interface and extends the
	 * {@link Subscription} class. While the {@link Observer} is the public API for
	 * consuming the values of an {@link Observable}, all Observers get converted to
	 * a Subscriber, in order to provide Subscription-like capabilities such as
	 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
	 * implementing operators, but it is rarely used as a public API.
	 *
	 * @class Subscriber<T>
	 */
	var Subscriber = (function (_super) {
	    __extends(Subscriber, _super);
	    /**
	     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
	     * defined Observer or a `next` callback function.
	     * @param {function(e: ?any): void} [error] The `error` callback of an
	     * Observer.
	     * @param {function(): void} [complete] The `complete` callback of an
	     * Observer.
	     */
	    function Subscriber(destinationOrNext, error, complete) {
	        _super.call(this);
	        this.syncErrorValue = null;
	        this.syncErrorThrown = false;
	        this.syncErrorThrowable = false;
	        this.isStopped = false;
	        switch (arguments.length) {
	            case 0:
	                this.destination = Observer_1.empty;
	                break;
	            case 1:
	                if (!destinationOrNext) {
	                    this.destination = Observer_1.empty;
	                    break;
	                }
	                if (typeof destinationOrNext === 'object') {
	                    if (destinationOrNext instanceof Subscriber) {
	                        this.destination = destinationOrNext;
	                        this.destination.add(this);
	                    }
	                    else {
	                        this.syncErrorThrowable = true;
	                        this.destination = new SafeSubscriber(this, destinationOrNext);
	                    }
	                    break;
	                }
	            default:
	                this.syncErrorThrowable = true;
	                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
	                break;
	        }
	    }
	    /**
	     * A static factory for a Subscriber, given a (potentially partial) definition
	     * of an Observer.
	     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
	     * @param {function(e: ?any): void} [error] The `error` callback of an
	     * Observer.
	     * @param {function(): void} [complete] The `complete` callback of an
	     * Observer.
	     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
	     * Observer represented by the given arguments.
	     */
	    Subscriber.create = function (next, error, complete) {
	        var subscriber = new Subscriber(next, error, complete);
	        subscriber.syncErrorThrowable = false;
	        return subscriber;
	    };
	    /**
	     * The {@link Observer} callback to receive notifications of type `next` from
	     * the Observable, with a value. The Observable may call this method 0 or more
	     * times.
	     * @param {T} [value] The `next` value.
	     * @return {void}
	     */
	    Subscriber.prototype.next = function (value) {
	        if (!this.isStopped) {
	            this._next(value);
	        }
	    };
	    /**
	     * The {@link Observer} callback to receive notifications of type `error` from
	     * the Observable, with an attached {@link Error}. Notifies the Observer that
	     * the Observable has experienced an error condition.
	     * @param {any} [err] The `error` exception.
	     * @return {void}
	     */
	    Subscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            this.isStopped = true;
	            this._error(err);
	        }
	    };
	    /**
	     * The {@link Observer} callback to receive a valueless notification of type
	     * `complete` from the Observable. Notifies the Observer that the Observable
	     * has finished sending push-based notifications.
	     * @return {void}
	     */
	    Subscriber.prototype.complete = function () {
	        if (!this.isStopped) {
	            this.isStopped = true;
	            this._complete();
	        }
	    };
	    Subscriber.prototype.unsubscribe = function () {
	        if (this.isUnsubscribed) {
	            return;
	        }
	        this.isStopped = true;
	        _super.prototype.unsubscribe.call(this);
	    };
	    Subscriber.prototype._next = function (value) {
	        this.destination.next(value);
	    };
	    Subscriber.prototype._error = function (err) {
	        this.destination.error(err);
	        this.unsubscribe();
	    };
	    Subscriber.prototype._complete = function () {
	        this.destination.complete();
	        this.unsubscribe();
	    };
	    Subscriber.prototype[rxSubscriber_1.$$rxSubscriber] = function () {
	        return this;
	    };
	    return Subscriber;
	}(Subscription_1.Subscription));
	exports.Subscriber = Subscriber;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SafeSubscriber = (function (_super) {
	    __extends(SafeSubscriber, _super);
	    function SafeSubscriber(_parent, observerOrNext, error, complete) {
	        _super.call(this);
	        this._parent = _parent;
	        var next;
	        var context = this;
	        if (isFunction_1.isFunction(observerOrNext)) {
	            next = observerOrNext;
	        }
	        else if (observerOrNext) {
	            context = observerOrNext;
	            next = observerOrNext.next;
	            error = observerOrNext.error;
	            complete = observerOrNext.complete;
	            if (isFunction_1.isFunction(context.unsubscribe)) {
	                this.add(context.unsubscribe.bind(context));
	            }
	            context.unsubscribe = this.unsubscribe.bind(this);
	        }
	        this._context = context;
	        this._next = next;
	        this._error = error;
	        this._complete = complete;
	    }
	    SafeSubscriber.prototype.next = function (value) {
	        if (!this.isStopped && this._next) {
	            var _parent = this._parent;
	            if (!_parent.syncErrorThrowable) {
	                this.__tryOrUnsub(this._next, value);
	            }
	            else if (this.__tryOrSetError(_parent, this._next, value)) {
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            var _parent = this._parent;
	            if (this._error) {
	                if (!_parent.syncErrorThrowable) {
	                    this.__tryOrUnsub(this._error, err);
	                    this.unsubscribe();
	                }
	                else {
	                    this.__tryOrSetError(_parent, this._error, err);
	                    this.unsubscribe();
	                }
	            }
	            else if (!_parent.syncErrorThrowable) {
	                this.unsubscribe();
	                throw err;
	            }
	            else {
	                _parent.syncErrorValue = err;
	                _parent.syncErrorThrown = true;
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.complete = function () {
	        if (!this.isStopped) {
	            var _parent = this._parent;
	            if (this._complete) {
	                if (!_parent.syncErrorThrowable) {
	                    this.__tryOrUnsub(this._complete);
	                    this.unsubscribe();
	                }
	                else {
	                    this.__tryOrSetError(_parent, this._complete);
	                    this.unsubscribe();
	                }
	            }
	            else {
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
	        try {
	            fn.call(this._context, value);
	        }
	        catch (err) {
	            this.unsubscribe();
	            throw err;
	        }
	    };
	    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
	        try {
	            fn.call(this._context, value);
	        }
	        catch (err) {
	            parent.syncErrorValue = err;
	            parent.syncErrorThrown = true;
	            return true;
	        }
	        return false;
	    };
	    SafeSubscriber.prototype._unsubscribe = function () {
	        var _parent = this._parent;
	        this._context = null;
	        this._parent = null;
	        _parent.unsubscribe();
	    };
	    return SafeSubscriber;
	}(Subscriber));
	

/***/ },
/* 669 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var isArray_1 = __webpack_require__(672);
	var isObject_1 = __webpack_require__(673);
	var isFunction_1 = __webpack_require__(381);
	var tryCatch_1 = __webpack_require__(675);
	var errorObject_1 = __webpack_require__(380);
	var UnsubscriptionError_1 = __webpack_require__(671);
	/**
	 * Represents a disposable resource, such as the execution of an Observable. A
	 * Subscription has one important method, `unsubscribe`, that takes no argument
	 * and just disposes the resource held by the subscription.
	 *
	 * Additionally, subscriptions may be grouped together through the `add()`
	 * method, which will attach a child Subscription to the current Subscription.
	 * When a Subscription is unsubscribed, all its children (and its grandchildren)
	 * will be unsubscribed as well.
	 *
	 * @class Subscription
	 */
	var Subscription = (function () {
	    /**
	     * @param {function(): void} [unsubscribe] A function describing how to
	     * perform the disposal of resources when the `unsubscribe` method is called.
	     */
	    function Subscription(unsubscribe) {
	        /**
	         * A flag to indicate whether this Subscription has already been unsubscribed.
	         * @type {boolean}
	         */
	        this.isUnsubscribed = false;
	        if (unsubscribe) {
	            this._unsubscribe = unsubscribe;
	        }
	    }
	    /**
	     * Disposes the resources held by the subscription. May, for instance, cancel
	     * an ongoing Observable execution or cancel any other type of work that
	     * started when the Subscription was created.
	     * @return {void}
	     */
	    Subscription.prototype.unsubscribe = function () {
	        var hasErrors = false;
	        var errors;
	        if (this.isUnsubscribed) {
	            return;
	        }
	        this.isUnsubscribed = true;
	        var _a = this, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
	        this._subscriptions = null;
	        if (isFunction_1.isFunction(_unsubscribe)) {
	            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
	            if (trial === errorObject_1.errorObject) {
	                hasErrors = true;
	                (errors = errors || []).push(errorObject_1.errorObject.e);
	            }
	        }
	        if (isArray_1.isArray(_subscriptions)) {
	            var index = -1;
	            var len = _subscriptions.length;
	            while (++index < len) {
	                var sub = _subscriptions[index];
	                if (isObject_1.isObject(sub)) {
	                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
	                    if (trial === errorObject_1.errorObject) {
	                        hasErrors = true;
	                        errors = errors || [];
	                        var err = errorObject_1.errorObject.e;
	                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
	                            errors = errors.concat(err.errors);
	                        }
	                        else {
	                            errors.push(err);
	                        }
	                    }
	                }
	            }
	        }
	        if (hasErrors) {
	            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
	        }
	    };
	    /**
	     * Adds a tear down to be called during the unsubscribe() of this
	     * Subscription.
	     *
	     * If the tear down being added is a subscription that is already
	     * unsubscribed, is the same reference `add` is being called on, or is
	     * `Subscription.EMPTY`, it will not be added.
	     *
	     * If this subscription is already in an `isUnsubscribed` state, the passed
	     * tear down logic will be executed immediately.
	     *
	     * @param {TeardownLogic} teardown The additional logic to execute on
	     * teardown.
	     * @return {Subscription} Returns the Subscription used or created to be
	     * added to the inner subscriptions list. This Subscription can be used with
	     * `remove()` to remove the passed teardown logic from the inner subscriptions
	     * list.
	     */
	    Subscription.prototype.add = function (teardown) {
	        if (!teardown || (teardown === this) || (teardown === Subscription.EMPTY)) {
	            return;
	        }
	        var sub = teardown;
	        switch (typeof teardown) {
	            case 'function':
	                sub = new Subscription(teardown);
	            case 'object':
	                if (sub.isUnsubscribed || typeof sub.unsubscribe !== 'function') {
	                    break;
	                }
	                else if (this.isUnsubscribed) {
	                    sub.unsubscribe();
	                }
	                else {
	                    (this._subscriptions || (this._subscriptions = [])).push(sub);
	                }
	                break;
	            default:
	                throw new Error('Unrecognized teardown ' + teardown + ' added to Subscription.');
	        }
	        return sub;
	    };
	    /**
	     * Removes a Subscription from the internal list of subscriptions that will
	     * unsubscribe during the unsubscribe process of this Subscription.
	     * @param {Subscription} subscription The subscription to remove.
	     * @return {void}
	     */
	    Subscription.prototype.remove = function (subscription) {
	        // HACK: This might be redundant because of the logic in `add()`
	        if (subscription == null || (subscription === this) || (subscription === Subscription.EMPTY)) {
	            return;
	        }
	        var subscriptions = this._subscriptions;
	        if (subscriptions) {
	            var subscriptionIndex = subscriptions.indexOf(subscription);
	            if (subscriptionIndex !== -1) {
	                subscriptions.splice(subscriptionIndex, 1);
	            }
	        }
	    };
	    Subscription.EMPTY = (function (empty) {
	        empty.isUnsubscribed = true;
	        return empty;
	    }(new Subscription()));
	    return Subscription;
	}());
	exports.Subscription = Subscription;
	

/***/ },
/* 670 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(232);
	var Symbol = root_1.root.Symbol;
	if (typeof Symbol === 'function') {
	    if (Symbol.observable) {
	        exports.$$observable = Symbol.observable;
	    }
	    else {
	        if (typeof Symbol.for === 'function') {
	            exports.$$observable = Symbol.for('observable');
	        }
	        else {
	            exports.$$observable = Symbol('observable');
	        }
	        Symbol.observable = exports.$$observable;
	    }
	}
	else {
	    exports.$$observable = '@@observable';
	}
	

/***/ },
/* 671 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * An error thrown when one or more errors have occurred during the
	 * `unsubscribe` of a {@link Subscription}.
	 */
	var UnsubscriptionError = (function (_super) {
	    __extends(UnsubscriptionError, _super);
	    function UnsubscriptionError(errors) {
	        _super.call(this);
	        this.errors = errors;
	        this.name = 'UnsubscriptionError';
	        this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n') : '';
	    }
	    return UnsubscriptionError;
	}(Error));
	exports.UnsubscriptionError = UnsubscriptionError;
	

/***/ },
/* 672 */
/***/ function(module, exports) {

	"use strict";
	exports.isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });
	

/***/ },
/* 673 */
/***/ function(module, exports) {

	"use strict";
	function isObject(x) {
	    return x != null && typeof x === 'object';
	}
	exports.isObject = isObject;
	

/***/ },
/* 674 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Subscriber_1 = __webpack_require__(668);
	var rxSubscriber_1 = __webpack_require__(379);
	function toSubscriber(nextOrObserver, error, complete) {
	    if (nextOrObserver && typeof nextOrObserver === 'object') {
	        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
	            return nextOrObserver;
	        }
	        else if (typeof nextOrObserver[rxSubscriber_1.$$rxSubscriber] === 'function') {
	            return nextOrObserver[rxSubscriber_1.$$rxSubscriber]();
	        }
	    }
	    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
	}
	exports.toSubscriber = toSubscriber;
	

/***/ },
/* 675 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var errorObject_1 = __webpack_require__(380);
	var tryCatchTarget;
	function tryCatcher() {
	    try {
	        return tryCatchTarget.apply(this, arguments);
	    }
	    catch (e) {
	        errorObject_1.errorObject.e = e;
	        return errorObject_1.errorObject;
	    }
	}
	function tryCatch(fn) {
	    tryCatchTarget = fn;
	    return tryCatcher;
	}
	exports.tryCatch = tryCatch;
	;
	

/***/ },
/* 676 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * angular2-google-maps - Angular 2 components for Google Maps
	 * @version v0.10.0
	 * @link https://github.com/SebastianM/angular2-google-maps#readme
	 * @license MIT
	 */
	"use strict";
	var maps_api_loader_1 = __webpack_require__(147);
	exports.MapsAPILoader = maps_api_loader_1.MapsAPILoader;
	var noop_maps_api_loader_1 = __webpack_require__(677);
	exports.NoOpMapsAPILoader = noop_maps_api_loader_1.NoOpMapsAPILoader;
	var google_maps_api_wrapper_1 = __webpack_require__(146);
	exports.GoogleMapsAPIWrapper = google_maps_api_wrapper_1.GoogleMapsAPIWrapper;
	var marker_manager_1 = __webpack_require__(148);
	exports.MarkerManager = marker_manager_1.MarkerManager;
	var info_window_manager_1 = __webpack_require__(233);
	exports.InfoWindowManager = info_window_manager_1.InfoWindowManager;
	var lazy_maps_api_loader_1 = __webpack_require__(382);
	exports.LazyMapsAPILoader = lazy_maps_api_loader_1.LazyMapsAPILoader;
	exports.LazyMapsAPILoaderConfig = lazy_maps_api_loader_1.LazyMapsAPILoaderConfig;
	exports.GoogleMapsScriptProtocol = lazy_maps_api_loader_1.GoogleMapsScriptProtocol;

	

/***/ },
/* 677 */
/***/ function(module, exports) {

	/**
	 * angular2-google-maps - Angular 2 components for Google Maps
	 * @version v0.10.0
	 * @link https://github.com/SebastianM/angular2-google-maps#readme
	 * @license MIT
	 */
	"use strict";
	/**
	 * When using the NoOpMapsAPILoader, the Google Maps API must be added to the page via a `<script>`
	 * Tag.
	 * It's important that the Google Maps API script gets loaded first on the page.
	 */
	var NoOpMapsAPILoader = (function () {
	    function NoOpMapsAPILoader() {
	    }
	    NoOpMapsAPILoader.prototype.load = function () {
	        if (!window.google || !window.google.maps) {
	            throw new Error('Google Maps API not loaded on page. Make sure window.google.maps is available!');
	        }
	        return Promise.resolve();
	    };
	    ;
	    return NoOpMapsAPILoader;
	}());
	exports.NoOpMapsAPILoader = NoOpMapsAPILoader;

	

/***/ },
/* 678 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";
	var hmr_store_1 = __webpack_require__(149);
	// noop in parentNode
	// TODO: find a better way to noop
	var _env = typeof process !== 'undefined' &&
	    process &&
	    ({"ENV":"development","NODE_ENV":"development","HMR":false}) &&
	    (("development") ||
	        ("development"));
	var _dev = ((_env &&
	    typeof _env === 'string' &&
	    (_env.indexOf('dev') > -1)) ||
	    _env === undefined);
	function setDev(newDev) {
	    if (typeof newDev === 'string') {
	        return _dev = (newDev.indexOf('dev') > -1);
	    }
	    else if (typeof newDev === 'boolean') {
	        return _dev = newDev;
	    }
	    throw new Error('Please provide a string or boolean');
	}
	exports.setDev = setDev;
	function HmrState(namespaceOrConfig, config) {
	    function decoratorFactory(target, decoratedPropertyName, descriptor) {
	        if (!_dev) {
	            return descriptor;
	        }
	        var key = namespaceOrConfig || target.constructor.name + '#' + decoratedPropertyName;
	        hmr_store_1.HmrStore.select(key, function () { return hmr_store_1.HmrStore.get(key); });
	        Object.defineProperty(target, decoratedPropertyName, {
	            get: function () { return hmr_store_1.HmrStore.get(key); },
	            set: function (newValue) {
	                var currentValue = hmr_store_1.HmrStore.get(key);
	                if (!currentValue) {
	                    hmr_store_1.HmrStore._initialValues[key] = newValue;
	                }
	                else {
	                    newValue = Object.assign(newValue, currentValue);
	                }
	                return hmr_store_1.HmrStore.set(key, newValue);
	            },
	            enumerable: true,
	            configurable: true
	        });
	        return descriptor;
	    }
	    return decoratorFactory;
	}
	exports.HmrState = HmrState;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(259)))

/***/ },
/* 679 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var hmr_store_1 = __webpack_require__(149);
	__export(__webpack_require__(680));
	__export(__webpack_require__(678));
	__export(__webpack_require__(149));
	function provideHmrState(initialState) {
	    if (initialState === void 0) { initialState = {}; }
	    return [
	        { provide: hmr_store_1.HMR_STATE, useValue: initialState },
	        { provide: hmr_store_1.HmrStore, useValue: hmr_store_1.HmrStore }
	    ];
	}
	exports.provideHmrState = provideHmrState;
	

/***/ },
/* 680 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var hmr_store_1 = __webpack_require__(149);
	function hotModuleReplacement(bootloader, module, options) {
	    if (options === void 0) { options = {}; }
	    if (!module.hot) {
	        console.warn('Warning: please use webpack hot flag');
	        return document.addEventListener('DOMContentLoaded', function () { return bootloader(); });
	    }
	    hmr_store_1.HmrStore.dev = true;
	    var LOCALSTORAGE_KEY = options.LOCALSTORAGE_KEY || '@@WEBPACK_INITIAL_DATA';
	    var LOCAL = options.localStorage || false;
	    var TOKEN = options.storeToken || hmr_store_1.HmrStore;
	    var DISPOSE = options.globalDispose || 'WEBPACK_HMR_beforeunload';
	    var GET_STATE = options.getState || getState;
	    var DATA = options.data || module.hot.data && module.hot.data.state;
	    var COMPONENT_REF = null;
	    var disposed = false;
	    function getState(appState) {
	        var json = appState.toJSON();
	        if (LOCAL) {
	            console.time('localStorage');
	            localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(appState));
	            console.timeEnd('localStorage');
	        }
	        return json;
	    }
	    console.log('DATA', DATA);
	    if (!DATA && LOCAL) {
	        try {
	            console.time('start localStorage');
	            DATA = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || DATA;
	            console.timeEnd('start localStorage');
	        }
	        catch (e) {
	            console.log('JSON.parse Error', e);
	        }
	    }
	    console.time('bootstrap');
	    if (document.readyState === 'complete') {
	        bootloader(DATA)
	            .then(function (cmpRef) { return COMPONENT_REF = cmpRef; })
	            .then((function (cmpRef) { return (console.timeEnd('bootstrap'), cmpRef); }));
	    }
	    else {
	        document.addEventListener('DOMContentLoaded', function () {
	            bootloader(DATA)
	                .then(function (cmpRef) { return COMPONENT_REF = cmpRef; })
	                .then((function (cmpRef) { return (console.timeEnd('bootstrap'), cmpRef); }));
	        });
	    }
	    function beforeunload(event) {
	        var injector = COMPONENT_REF.injector;
	        var appState;
	        if ('getOptional' in injector) {
	            appState = COMPONENT_REF.injector.getOptional(TOKEN) || TOKEN;
	        }
	        else {
	            appState = COMPONENT_REF.injector.get(TOKEN, TOKEN);
	        }
	        return GET_STATE(appState);
	    }
	    window[DISPOSE] = function () {
	        disposed = true;
	        window.removeEventListener('beforeunload', beforeunload);
	        if (LOCAL) {
	            localStorage.removeItem(LOCALSTORAGE_KEY);
	        }
	    };
	    module.hot.accept();
	    window.addEventListener('beforeunload', beforeunload);
	    module.hot.dispose(function (data) {
	        console.time('dispose');
	        var componentNode = COMPONENT_REF.location.nativeElement;
	        var newNode = document.createElement(componentNode.tagName);
	        // display none
	        var currentDisplay = newNode.style.display;
	        newNode.style.display = 'none';
	        var parentNode = componentNode.parentNode;
	        parentNode.insertBefore(newNode, componentNode);
	        var injector = COMPONENT_REF.injector;
	        var appState;
	        if ('getOptional' in injector) {
	            appState = COMPONENT_REF.injector.getOptional(TOKEN) || TOKEN;
	        }
	        else {
	            appState = COMPONENT_REF.injector.get(TOKEN, TOKEN);
	        }
	        var json = GET_STATE(appState, COMPONENT_REF);
	        data.state = json;
	        if ('destroy' in COMPONENT_REF) {
	            COMPONENT_REF.destroy();
	        }
	        else if ('dispose' in COMPONENT_REF) {
	            COMPONENT_REF.dispose();
	        }
	        newNode.style.display = currentDisplay;
	        if (!disposed) {
	            window.removeEventListener('beforeunload', beforeunload);
	        }
	        disposed = true;
	        console.timeEnd('dispose');
	    });
	}
	exports.hotModuleReplacement = hotModuleReplacement;
	

/***/ },
/* 681 */,
/* 682 */,
/* 683 */,
/* 684 */,
/* 685 */,
/* 686 */,
/* 687 */,
/* 688 */,
/* 689 */,
/* 690 */,
/* 691 */,
/* 692 */,
/* 693 */,
/* 694 */,
/* 695 */,
/* 696 */,
/* 697 */,
/* 698 */,
/* 699 */,
/* 700 */,
/* 701 */,
/* 702 */,
/* 703 */,
/* 704 */,
/* 705 */,
/* 706 */,
/* 707 */,
/* 708 */,
/* 709 */,
/* 710 */,
/* 711 */,
/* 712 */,
/* 713 */,
/* 714 */,
/* 715 */,
/* 716 */,
/* 717 */,
/* 718 */,
/* 719 */,
/* 720 */,
/* 721 */,
/* 722 */,
/* 723 */,
/* 724 */,
/* 725 */,
/* 726 */,
/* 727 */,
/* 728 */,
/* 729 */,
/* 730 */,
/* 731 */,
/* 732 */,
/* 733 */,
/* 734 */,
/* 735 */,
/* 736 */,
/* 737 */,
/* 738 */,
/* 739 */,
/* 740 */,
/* 741 */,
/* 742 */,
/* 743 */,
/* 744 */,
/* 745 */,
/* 746 */,
/* 747 */,
/* 748 */,
/* 749 */,
/* 750 */,
/* 751 */,
/* 752 */,
/* 753 */,
/* 754 */,
/* 755 */,
/* 756 */,
/* 757 */,
/* 758 */,
/* 759 */,
/* 760 */,
/* 761 */,
/* 762 */,
/* 763 */,
/* 764 */,
/* 765 */,
/* 766 */,
/* 767 */,
/* 768 */,
/* 769 */,
/* 770 */,
/* 771 */,
/* 772 */,
/* 773 */,
/* 774 */,
/* 775 */,
/* 776 */,
/* 777 */,
/* 778 */,
/* 779 */,
/* 780 */,
/* 781 */,
/* 782 */,
/* 783 */,
/* 784 */,
/* 785 */,
/* 786 */,
/* 787 */,
/* 788 */,
/* 789 */,
/* 790 */,
/* 791 */,
/* 792 */,
/* 793 */,
/* 794 */,
/* 795 */,
/* 796 */,
/* 797 */,
/* 798 */,
/* 799 */,
/* 800 */,
/* 801 */,
/* 802 */,
/* 803 */,
/* 804 */,
/* 805 */,
/* 806 */,
/* 807 */,
/* 808 */,
/* 809 */,
/* 810 */,
/* 811 */,
/* 812 */,
/* 813 */,
/* 814 */,
/* 815 */,
/* 816 */,
/* 817 */,
/* 818 */,
/* 819 */,
/* 820 */,
/* 821 */,
/* 822 */,
/* 823 */,
/* 824 */,
/* 825 */,
/* 826 */,
/* 827 */,
/* 828 */,
/* 829 */,
/* 830 */,
/* 831 */,
/* 832 */,
/* 833 */,
/* 834 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 835 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var file_like_object_class_1 = __webpack_require__(413);
	var FileItem = (function () {
	    function FileItem(uploader, some, options) {
	        this.alias = 'file';
	        this.url = '/';
	        this.method = 'POST';
	        this.headers = [];
	        this.withCredentials = true;
	        this.formData = [];
	        this.isReady = false;
	        this.isUploading = false;
	        this.isUploaded = false;
	        this.isSuccess = false;
	        this.isCancel = false;
	        this.isError = false;
	        this.progress = 0;
	        this.index = void 0;
	        this.uploader = uploader;
	        this.some = some;
	        this.options = options;
	        this.file = new file_like_object_class_1.FileLikeObject(some);
	        this._file = some;
	        this.url = uploader.options.url;
	        this._zone = new core_1.NgZone({ enableLongStackTrace: false });
	    }
	    FileItem.prototype.upload = function () {
	        try {
	            this.uploader.uploadItem(this);
	        }
	        catch (e) {
	            this.uploader._onCompleteItem(this, '', 0, []);
	            this.uploader._onErrorItem(this, '', 0, []);
	        }
	    };
	    FileItem.prototype.cancel = function () {
	        this.uploader.cancelItem(this);
	    };
	    FileItem.prototype.remove = function () {
	        this.uploader.removeFromQueue(this);
	    };
	    FileItem.prototype.onBeforeUpload = function () {
	        return void 0;
	    };
	    FileItem.prototype.onBuildForm = function (form) {
	        return { form: form };
	    };
	    FileItem.prototype.onProgress = function (progress) {
	        return { progress: progress };
	    };
	    FileItem.prototype.onSuccess = function (response, status, headers) {
	        return { response: response, status: status, headers: headers };
	    };
	    FileItem.prototype.onError = function (response, status, headers) {
	        return { response: response, status: status, headers: headers };
	    };
	    FileItem.prototype.onCancel = function (response, status, headers) {
	        return { response: response, status: status, headers: headers };
	    };
	    FileItem.prototype.onComplete = function (response, status, headers) {
	        return { response: response, status: status, headers: headers };
	    };
	    FileItem.prototype._onBeforeUpload = function () {
	        this.isReady = true;
	        this.isUploading = true;
	        this.isUploaded = false;
	        this.isSuccess = false;
	        this.isCancel = false;
	        this.isError = false;
	        this.progress = 0;
	        this.onBeforeUpload();
	    };
	    FileItem.prototype._onBuildForm = function (form) {
	        this.onBuildForm(form);
	    };
	    FileItem.prototype._onProgress = function (progress) {
	        var _this = this;
	        this._zone.run(function () {
	            _this.progress = progress;
	        });
	        this.onProgress(progress);
	    };
	    FileItem.prototype._onSuccess = function (response, status, headers) {
	        this.isReady = false;
	        this.isUploading = false;
	        this.isUploaded = true;
	        this.isSuccess = true;
	        this.isCancel = false;
	        this.isError = false;
	        this.progress = 100;
	        this.index = void 0;
	        this.onSuccess(response, status, headers);
	    };
	    FileItem.prototype._onError = function (response, status, headers) {
	        this.isReady = false;
	        this.isUploading = false;
	        this.isUploaded = true;
	        this.isSuccess = false;
	        this.isCancel = false;
	        this.isError = true;
	        this.progress = 0;
	        this.index = void 0;
	        this.onError(response, status, headers);
	    };
	    FileItem.prototype._onCancel = function (response, status, headers) {
	        this.isReady = false;
	        this.isUploading = false;
	        this.isUploaded = false;
	        this.isSuccess = false;
	        this.isCancel = true;
	        this.isError = false;
	        this.progress = 0;
	        this.index = void 0;
	        this.onCancel(response, status, headers);
	    };
	    FileItem.prototype._onComplete = function (response, status, headers) {
	        this.onComplete(response, status, headers);
	        if (this.uploader.options.removeAfterUpload) {
	            this.remove();
	        }
	    };
	    FileItem.prototype._prepareToUploading = function () {
	        this.index = this.index || ++this.uploader._nextIndex;
	        this.isReady = true;
	    };
	    return FileItem;
	}());
	exports.FileItem = FileItem;


/***/ },
/* 836 */
/***/ function(module, exports) {

	"use strict";
	var FileType = (function () {
	    function FileType() {
	    }
	    FileType.getMimeClass = function (file) {
	        var mimeClass = 'application';
	        if (this.mime_psd.indexOf(file.type) !== -1) {
	            mimeClass = 'image';
	        }
	        else if (file.type.match('image.*')) {
	            mimeClass = 'image';
	        }
	        else if (file.type.match('video.*')) {
	            mimeClass = 'video';
	        }
	        else if (file.type.match('audio.*')) {
	            mimeClass = 'audio';
	        }
	        else if (file.type === 'application/pdf') {
	            mimeClass = 'pdf';
	        }
	        else if (this.mime_compress.indexOf(file.type) !== -1) {
	            mimeClass = 'compress';
	        }
	        else if (this.mime_doc.indexOf(file.type) !== -1) {
	            mimeClass = 'doc';
	        }
	        else if (this.mime_xsl.indexOf(file.type) !== -1) {
	            mimeClass = 'xls';
	        }
	        else if (this.mime_ppt.indexOf(file.type) !== -1) {
	            mimeClass = 'ppt';
	        }
	        if (mimeClass === 'application') {
	            mimeClass = this.fileTypeDetection(file.name);
	        }
	        return mimeClass;
	    };
	    FileType.fileTypeDetection = function (inputFilename) {
	        var types = {
	            'jpg': 'image',
	            'jpeg': 'image',
	            'tif': 'image',
	            'psd': 'image',
	            'bmp': 'image',
	            'png': 'image',
	            'nef': 'image',
	            'tiff': 'image',
	            'cr2': 'image',
	            'dwg': 'image',
	            'cdr': 'image',
	            'ai': 'image',
	            'indd': 'image',
	            'pin': 'image',
	            'cdp': 'image',
	            'skp': 'image',
	            'stp': 'image',
	            '3dm': 'image',
	            'mp3': 'audio',
	            'wav': 'audio',
	            'wma': 'audio',
	            'mod': 'audio',
	            'm4a': 'audio',
	            'compress': 'compress',
	            'rar': 'compress',
	            '7z': 'compress',
	            'lz': 'compress',
	            'z01': 'compress',
	            'pdf': 'pdf',
	            'xls': 'xls',
	            'xlsx': 'xls',
	            'ods': 'xls',
	            'mp4': 'video',
	            'avi': 'video',
	            'wmv': 'video',
	            'mpg': 'video',
	            'mts': 'video',
	            'flv': 'video',
	            '3gp': 'video',
	            'vob': 'video',
	            'm4v': 'video',
	            'mpeg': 'video',
	            'm2ts': 'video',
	            'mov': 'video',
	            'doc': 'doc',
	            'docx': 'doc',
	            'eps': 'doc',
	            'txt': 'doc',
	            'odt': 'doc',
	            'rtf': 'doc',
	            'ppt': 'ppt',
	            'pptx': 'ppt',
	            'pps': 'ppt',
	            'ppsx': 'ppt',
	            'odp': 'ppt'
	        };
	        var chunks = inputFilename.split('.');
	        if (chunks.length < 2) {
	            return 'application';
	        }
	        var extension = chunks[chunks.length - 1].toLowerCase();
	        if (types[extension] === undefined) {
	            return 'application';
	        }
	        else {
	            return types[extension];
	        }
	    };
	    /*  MS office  */
	    FileType.mime_doc = [
	        'application/msword',
	        'application/msword',
	        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	        'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
	        'application/vnd.ms-word.document.macroEnabled.12',
	        'application/vnd.ms-word.template.macroEnabled.12'
	    ];
	    FileType.mime_xsl = [
	        'application/vnd.ms-excel',
	        'application/vnd.ms-excel',
	        'application/vnd.ms-excel',
	        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	        'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
	        'application/vnd.ms-excel.sheet.macroEnabled.12',
	        'application/vnd.ms-excel.template.macroEnabled.12',
	        'application/vnd.ms-excel.addin.macroEnabled.12',
	        'application/vnd.ms-excel.sheet.binary.macroEnabled.12'
	    ];
	    FileType.mime_ppt = [
	        'application/vnd.ms-powerpoint',
	        'application/vnd.ms-powerpoint',
	        'application/vnd.ms-powerpoint',
	        'application/vnd.ms-powerpoint',
	        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
	        'application/vnd.openxmlformats-officedocument.presentationml.template',
	        'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
	        'application/vnd.ms-powerpoint.addin.macroEnabled.12',
	        'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
	        'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
	        'application/vnd.ms-powerpoint.slideshow.macroEnabled.12'
	    ];
	    /* PSD */
	    FileType.mime_psd = [
	        'image/photoshop',
	        'image/x-photoshop',
	        'image/psd',
	        'application/photoshop',
	        'application/psd',
	        'zz-application/zz-winassoc-psd'
	    ];
	    /* Compressed files */
	    FileType.mime_compress = [
	        'application/x-gtar',
	        'application/x-gcompress',
	        'application/compress',
	        'application/x-tar',
	        'application/x-rar-compressed',
	        'application/octet-stream'
	    ];
	    return FileType;
	}());
	exports.FileType = FileType;


/***/ },
/* 837 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(414));
	__export(__webpack_require__(412));
	__export(__webpack_require__(255));
	var file_select_directive_2 = __webpack_require__(414);
	var file_drop_directive_2 = __webpack_require__(412);
	exports.FILE_UPLOAD_DIRECTIVES = [file_select_directive_2.FileSelectDirective, file_drop_directive_2.FileDropDirective];
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = {
	    directives: [
	        exports.FILE_UPLOAD_DIRECTIVES
	    ]
	};


/***/ },
/* 838 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(1);
	var OffClickDirective = (function () {
	    function OffClickDirective() {
	    }
	    /* tslint:enable */
	    OffClickDirective.prototype.onClick = function ($event) {
	        $event.stopPropagation();
	    };
	    OffClickDirective.prototype.ngOnInit = function () {
	        var _this = this;
	        setTimeout(function () { document.addEventListener('click', _this.offClickHandler); }, 0);
	    };
	    OffClickDirective.prototype.ngOnDestroy = function () {
	        document.removeEventListener('click', this.offClickHandler);
	    };
	    __decorate([
	        core_1.Input('offClick'), 
	        __metadata('design:type', Object)
	    ], OffClickDirective.prototype, "offClickHandler", void 0);
	    __decorate([
	        core_1.HostListener('click', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [MouseEvent]), 
	        __metadata('design:returntype', void 0)
	    ], OffClickDirective.prototype, "onClick", null);
	    OffClickDirective = __decorate([
	        core_1.Directive({
	            selector: '[offClick]'
	        }), 
	        __metadata('design:paramtypes', [])
	    ], OffClickDirective);
	    return OffClickDirective;
	}());
	exports.OffClickDirective = OffClickDirective;


/***/ },
/* 839 */
/***/ function(module, exports) {

	"use strict";
	var SelectItem = (function () {
	    function SelectItem(source) {
	        var _this = this;
	        if (typeof source === 'string') {
	            this.id = this.text = source;
	        }
	        if (typeof source === 'object') {
	            this.id = source.id || source.text;
	            this.text = source.text;
	            if (source.children && source.text) {
	                this.children = source.children.map(function (c) {
	                    var r = new SelectItem(c);
	                    r.parent = _this;
	                    return r;
	                });
	                this.text = source.text;
	            }
	        }
	    }
	    SelectItem.prototype.fillChildrenHash = function (optionsMap, startIndex) {
	        var i = startIndex;
	        this.children.map(function (child) {
	            optionsMap.set(child.id, i++);
	        });
	        return i;
	    };
	    SelectItem.prototype.hasChildren = function () {
	        return this.children && this.children.length > 0;
	    };
	    SelectItem.prototype.getSimilar = function () {
	        var r = new SelectItem(false);
	        r.id = this.id;
	        r.text = this.text;
	        r.parent = this.parent;
	        return r;
	    };
	    return SelectItem;
	}());
	exports.SelectItem = SelectItem;


/***/ },
/* 840 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(1);
	var common_1 = __webpack_require__(437);
	var HighlightPipe = (function () {
	    function HighlightPipe() {
	    }
	    HighlightPipe.prototype.transform = function (value, args) {
	        if (args.length < 1) {
	            return value;
	        }
	        var query = args[0];
	        if (query) {
	            var tagRE = new RegExp('<[^<>]*>', 'ig');
	            // get ist of tags
	            var tagList = value.match(tagRE);
	            // Replace tags with token
	            var tmpValue = value.replace(tagRE, '$!$');
	            // Replace search words
	            value = tmpValue.replace(new RegExp(common_1.escapeRegexp(query), 'gi'), '<strong>$&</strong>');
	            // Reinsert HTML
	            for (var i = 0; value.indexOf('$!$') > -1; i++) {
	                value = value.replace('$!$', tagList[i]);
	            }
	        }
	        return value;
	    };
	    HighlightPipe = __decorate([
	        core_1.Pipe({ name: 'highlight' }), 
	        __metadata('design:paramtypes', [])
	    ], HighlightPipe);
	    return HighlightPipe;
	}());
	exports.HighlightPipe = HighlightPipe;
	function stripTags(input) {
	    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
	    var commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
	    return input.replace(commentsAndPhpTags, '').replace(tags, '');
	}
	exports.stripTags = stripTags;


/***/ },
/* 841 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var select_1 = __webpack_require__(436);
	__export(__webpack_require__(438));
	__export(__webpack_require__(436));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = {
	    directives: [
	        select_1.SELECT_DIRECTIVES
	    ]
	};


/***/ },
/* 842 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 843 */,
/* 844 */,
/* 845 */,
/* 846 */,
/* 847 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(224);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(842)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(224, function() {
				var newContent = __webpack_require__(224);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }
]);
//# sourceMappingURL=main.map