webpackJsonp([1],{

/***/ 442:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(848));
	

/***/ },

/***/ 848:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	/*
	 * We're loading this component asynchronously
	 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
	 * see https://github.com/gdi2290/es6-promise-loader for more info
	 */
	console.log('`About` component loaded asynchronously');
	var About = (function () {
	    function About() {
	    }
	    About.prototype.ngOnInit = function () {
	        console.log('hello `About` component');
	        // static data that is bundled
	        //var mockData = require('assets/mock-data/mock-data.json');
	        //console.log('mockData', mockData);
	        // if you're working with mock data you can also use http.get('assets/mock-data/mock-data.json')
	        //this.asyncDataWithWebpack();
	    };
	    About.prototype.asyncDataWithWebpack = function () {
	        // you can also async load mock data with 'es6-promise-loader'
	        // you would do this if you don't want the mock-data bundled
	        // remember that 'es6-promise-loader' is a promise
	        //var asyncMockDataPromiseFactory = require('es6-promise!assets/mock-data/mock-data.json');
	        //setTimeout(() => {
	        //  let asyncDataPromise = asyncMockDataPromiseFactory();
	        //  asyncDataPromise.then(json => {
	        //    console.log('async mockData', json);
	        //  });
	        //});
	    };
	    About = __decorate([
	        core_1.Component({
	            selector: 'about',
	            template: "\n    <md-card>\n      <h3>\n        About Us\n      </h3>\n    </md-card>\n  ",
	        }), 
	        __metadata('design:paramtypes', [])
	    ], About);
	    return About;
	}());
	exports.About = About;
	

/***/ }

});
//# sourceMappingURL=1.map