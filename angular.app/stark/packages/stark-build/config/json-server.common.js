"use strict";

const jsonServer = require("json-server");
const bodyParser = require("body-parser");
const pluralize = require("pluralize");
const _uniqueId = require("lodash/uniqueId");

module.exports = {
	getJSONServer: getJSONServer,
	initializeServer: initializeServer,
	deepReplaceProperty: deepReplaceProperty
};

// Stark HTTP headers constants
const starkHttpHeader = {
	ACCEPT_LANGUAGE: "Accept-Language",
	ETAG: "etag",
	IF_MATCH: "If-Match"
};

// Stark valid query parameters
const starkQueryParam = {
	LIMIT: "limit",
	OFFSET: "offset",
	SORT: "sort",
	MOCK_COLLECTION_REQUEST: "mockCollectionRequest"
};

// Stark pagination metadata properties
const starkMetadata = {
	PAGINATION: {
		LIMIT: "limit",
		OFFSET: "offset",
		TOTAL_COUNT: "totalCount",
		CURRENT_PAGE: "currentPage",
		PREVIOUS_OFFSET: "previousOffset",
		NEXT_OFFSET: "nextOffset",
		PAGE_COUNT: "pageCount"
	},
	ETAGS: "etags",
	SORTED_BY: "sortedBy"
};

/**
 * Return Stark default JSON-Server configuration
 * @param data {*} Mock data to be handled by the server
 * @param middlewares {object} Middlewares to be applied just after the default Stark middlewares
 * @param routes {object} (Optional) Routes to be rewritten (in order to support nested resources)
 * @param uploadEndpoints {object} (Optional) Endpoints for file uploads
 * @returns ExpressJS server definition
 */
function getJSONServer(data, middlewares, routes, uploadEndpoints) {
	var server = jsonServer.create();
	var router = jsonServer.router(data);
	var defaultMiddlewares = jsonServer.defaults({ bodyParser: false }); // disable default bodyParser usage since it causes some issues

	// set ExpressJS App settings
	// http://expressjs.com/en/api.html#app.settings.table
	server.set("etag", false); // disable default etag generation

	router.db._.id = "uuid"; // use "uuid" as resource id

	routes = routes || {};
	var starkRoutes = {};
	// merge routes into starkRoutes
	Object.assign(starkRoutes, routes);
	starkRoutes = expandRewrittenRoutes(starkRoutes);

	server.use(jsonServer.rewriter(starkRoutes));
	server.use(defaultMiddlewares);
	// use bodyParser separately passing the same options as in json-server defaults
	server.use(bodyParser.json({ limit: "10mb", extended: false }));
	server.use(bodyParser.urlencoded({ extended: false }));
	server.use(transformRequests);

	if (uploadEndpoints && uploadEndpoints instanceof Array) {
		addUploadEndpoints(server, uploadEndpoints);
	}

	// Apply custom request transformations (if any)
	middlewares = middlewares || {};
	if (middlewares.transformRequests) {
		server.use(middlewares.transformRequests);
	}

	// Apply stark default response transformations + custom transformations (if any)
	router.render = composeTransformResponses(middlewares.transformResponses);
	server.use(router);

	return server;
}

function addUploadEndpoints(server, endPoints) {
	const multer = require("multer");

	// multer disk storage settings
	var storage = multer.diskStorage({
		destination: function(req, file, callback) {
			callback(null, "./uploads/");
		},
		filename: function(req, file, callback) {
			var timestamp = Date.now();
			var fileNamePartials = file.originalname.split(".");
			var fileExtension = fileNamePartials.pop();
			var fileName = fileNamePartials.join("");

			callback(null, fileName + "-" + timestamp + "." + fileExtension);
		}
	});

	endPoints.forEach(function(endPoint) {
		// multer settings
		var upload = multer({ storage: storage }).single("file");

		// API path that will upload the files
		server.post(endPoint.path, function(req, res) {
			upload(req, res, function(err) {
				if (err) {
					res.jsonp({ error_code: 1, error_dec: err });
					return;
				}
				res.jsonp("File uploaded successfully!");
			});
		});
	});
}

/**
 * Start the server (listen to the different ports defined for every backend)
 * @param server
 * @param backends
 */
function initializeServer(server, backends) {
	var usedPorts = [];
	const listenPort = function(server, name, port) {
		server.listen(port, function() {
			console.log("JSON Server is running mock backend " + name + " in port " + port);
		});
	};

	Object.keys(backends).forEach(function(key) {
		var backend = backends[key];
		if (backend.mock === "json-server") {
			var port = backend.url.split(":").slice(-1)[0];
			if (usedPorts.indexOf(port) < 0) {
				usedPorts.push(port);
				listenPort(server, backend.name, port);
			}
		}
	});
}

/**
 * Default Stark request transformations: from Stark API REST specifics into json-server API specifics
 * @param req {*} The current request
 * @param res {*} The current response
 * @param next {Function} Function to call next middleware (should always be called at the end of the current middleware)
 */
function transformRequests(req, res, next) {
	console.log("transformRequests Stark middleware");

	transformPaginationParams(req);
	transformSortingParams(req);

	convertUpdateRequestMethod(req);

	next();
}

/**
 * Call all the different Stark default transformations first, then the provided custom transformation (if any) and
 * finally return the final response.
 * @param transformFn {Function} Transform function to be applied to the response. This function should be
 * provided via the "middlewares" parameter in the getJSONServer method.
 * This function will be called with 3 parameters:
 * - Request: the current request
 * - Response: the current response (containing the default changes made by Stark middleware)
 * - StarkMetadata: metadata object constructed by the Stark middleware (only for Collection responses)
 */
function composeTransformResponses(transformFn) {
	return function(req, res) {
		var collectionMetadata = {};

		transformResponses(req, res, collectionMetadata);

		if (transformFn) {
			transformFn(req, res, collectionMetadata);
		}

		// Finally send the response to the client (in case it has not been sent yet)
		// See: http://expressjs.com/es/api.html#res.headersSent
		if (!res.headersSent) {
			if (isGetCollectionRequest(req)) {
				res.jsonp({ items: res.locals.data, metadata: collectionMetadata });
			} else {
				res.jsonp(res.locals.data);
			}
		}
	};
}

/**
 * Default Stark response transformations: metadata and etags
 * @param req {*} The current request (already changed by Stark default middleware)
 * @param res {*} The current response (already changed by Stark default middleware)
 * @param collectionMetadata : Metadata object constructed by the Stark middleware (only for Collection responses)
 */
function transformResponses(req, res, collectionMetadata) {
	console.log("transformResponses Stark middleware");

	if (isGetCollectionRequest(req)) {
		// Add "metadata" and "etags" to all responses of GetCollection requests
		addPaginationMetadata(req, res, collectionMetadata);
		addSortingMetadata(req, collectionMetadata);
		addEtagInfo(res, collectionMetadata);
		console.log("response transformed for getCollection request => %s", req.url);
	} else if (req.method !== "DELETE") {
		// Add "etag" to all responses of SingleItem requests except DELETE
		addEtagInfo(res);
		console.log("response transformed for single item request => %s", req.url);
	}

	if (isNestedResourceQuery(req)) {
		// remove the parent resource data and return only the nested resource
		var nestedResourceName = getNestedResourceName(req);
		var data = res.locals.data;

		// the nested resource is returned in an array since the query most likely doesn't have a nested resource uuid defined
		// so an array is expected to be returned
		res.locals.data = [Object.assign({}, data[nestedResourceName])];
		console.log("response transformed for nested resource request => %s", req.url);
	}
}

// Private methods

/**
 * Extract the query parameters from the request url
 * @param url: Request url
 * @returns Object containing the different query parameters
 */
function extractUrlParams(url) {
	var queryParams = {};

	if (typeof url !== "undefined") {
		var params = url.substring(url.indexOf("?") + 1).split("&");

		for (var queryParam of params) {
			if (queryParam) {
				var param = queryParam.split("=");
				queryParams[param[0]] = param[1];
			}
		}
	}

	return queryParams;
}

/**
 * Replace Stark pagination params by JSON-server pagination params
 * @param req : The current request
 */
function transformPaginationParams(req) {
	const limit = parseInt(req.query[starkQueryParam.LIMIT], 10) || 10; // defaults to 10
	const offset = parseInt(req.query[starkQueryParam.OFFSET], 10) || 0; // defaults to 0
	const page = Math.floor(offset / limit) + 1;

	req.query["_limit"] = limit;
	delete req.query[starkQueryParam.LIMIT];

	req.query["_page"] = page;
	delete req.query[starkQueryParam.OFFSET];
}

/**
 * Replace Stark sorting params by JSON-server sorting params
 * @param req : The current request
 */
function transformSortingParams(req) {
	const sortingRegex = /(\w+)\+(ASC|DESC)/g; // perform a global search to match all the sort items

	if (req.query[starkQueryParam.SORT] && req.query[starkQueryParam.SORT].match(sortingRegex)) {
		const sortingParams = req.query[starkQueryParam.SORT].match(sortingRegex);

		var fields = [];
		var order = [];

		sortingParams.forEach(function(sortingParam) {
			fields.push(sortingParam.split("+")[0]);
			order.push(sortingParam.split("+")[1].toLowerCase());
		});

		req.query["_sort"] = fields.join(",");
		req.query["_order"] = order.join(",");

		delete req.query[starkQueryParam.SORT];
	}
}

/**
 * Change POST requests to PATCH for an existing resource (when the uuid is defined)
 * @param req : The current request
 */
function convertUpdateRequestMethod(req) {
	if (req.method === "POST" && req.body && req.body.uuid) {
		req.method = "PATCH";
	}
}

/**
 * Add "pagination" object to metadata for Collection responses
 * See https://github.com/NationalBankBelgium/REST-API-Design-Guide/wiki/Pagination-Rules-and-metadata
 * @param req : The current request
 * @param res : The current response
 * @param collectionMetadata : Metadata object constructed by the Stark middleware (only for Collection responses)
 */
function addPaginationMetadata(req, res, collectionMetadata) {
	var pagination = (collectionMetadata["pagination"] = {});
	var params = extractUrlParams(req.originalUrl);

	// setting default values in case they are not defined
	pagination[starkMetadata.PAGINATION.LIMIT] = parseInt(params[starkQueryParam.LIMIT]) || 10;
	pagination[starkMetadata.PAGINATION.OFFSET] = parseInt(params[starkQueryParam.OFFSET]) || 0;
	pagination[starkMetadata.PAGINATION.TOTAL_COUNT] = res.get("X-Total-Count") || 1000; // 'X-Total-Count' is added by json-server
	pagination[starkMetadata.PAGINATION.PAGE_COUNT] = Math.ceil(
		pagination[starkMetadata.PAGINATION.TOTAL_COUNT] / pagination[starkMetadata.PAGINATION.LIMIT]
	);
	pagination[starkMetadata.PAGINATION.CURRENT_PAGE] =
		Math.floor(pagination[starkMetadata.PAGINATION.OFFSET] / pagination[starkMetadata.PAGINATION.LIMIT]) + 1;
	pagination[starkMetadata.PAGINATION.PREVIOUS_OFFSET] = null;
	pagination[starkMetadata.PAGINATION.NEXT_OFFSET] = null;

	var calculatedOffset =
		Math.floor(pagination[starkMetadata.PAGINATION.OFFSET] / pagination[starkMetadata.PAGINATION.LIMIT]) *
		pagination[starkMetadata.PAGINATION.LIMIT];

	if (calculatedOffset - pagination[starkMetadata.PAGINATION.LIMIT] >= 0) {
		pagination[starkMetadata.PAGINATION.PREVIOUS_OFFSET] = calculatedOffset - pagination[starkMetadata.PAGINATION.LIMIT];
	}

	if (calculatedOffset + pagination[starkMetadata.PAGINATION.LIMIT] < pagination[starkMetadata.PAGINATION.TOTAL_COUNT]) {
		pagination[starkMetadata.PAGINATION.NEXT_OFFSET] = calculatedOffset + pagination[starkMetadata.PAGINATION.LIMIT];
	}
}

/**
 * In case the metadata object is passed, the "etags" object is added to it (Collection responses)
 * Otherwise the "etag" header is added to the response (single item responses)
 * @param res : The current request
 * @param collectionMetadata : Metadata object constructed by the Stark middleware (only for Collection responses)
 */
function addEtagInfo(res, collectionMetadata) {
	const data = res.locals.data;

	if (collectionMetadata) {
		var etags = (collectionMetadata[starkMetadata.ETAGS] = {});

		if (data instanceof Array) {
			for (var dataItem of data) {
				if (typeof dataItem.uuid !== "undefined") {
					etags[dataItem.uuid] = generateEtagValue(dataItem);
				}
			}
		}
	} else if (!(data instanceof Array) && typeof data === "object") {
		res.header(starkHttpHeader.ETAG, generateEtagValue(data));
	}
}

/**
 * Add "sortedBy" object to metadata for Collection responses (if "sort" is defined in the query parameters)
 * @param req {*} The current request
 * @param collectionMetadata {object} Metadata object constructed by the Stark middleware (only for Collection responses)
 */
function addSortingMetadata(req, collectionMetadata) {
	var params = extractUrlParams(req.originalUrl);
	var sortingParam = params[starkQueryParam.SORT] ? decodeURIComponent(params[starkQueryParam.SORT]) : undefined;

	const sortingRegex = /(\w+)\+(ASC|DESC)/g; // perform a global search to match all the sort items

	if (sortingParam && sortingParam.match(sortingRegex)) {
		var sortedBy = [];

		const sortingParams = sortingParam.match(sortingRegex);

		sortingParams.forEach(function(sortingParam) {
			sortedBy.push({
				field: sortingParam.split("+")[0],
				order: sortingParam.split("+")[1]
			});
		});

		collectionMetadata[starkMetadata.SORTED_BY] = sortedBy;
	}
}

/**
 * Check whether the request is a GetCollection request.
 * GetCollection requests are the ones with a "mockCollectionRequest" query param.
 * See: https://jira.prd.nbb/browse/NG-1335
 * @param req : The current request
 */
function isGetCollectionRequest(req) {
	var params = extractUrlParams(req.originalUrl);
	return req.method === "GET" && params[starkQueryParam.MOCK_COLLECTION_REQUEST] === "true";
}

/**
 * Check whether the request is aimed to get a nested resource (from a many-to-one relationship).
 * Such requests have a '_expand' query parameter
 * @param req : The current request
 */
function isNestedResourceQuery(req) {
	return req.method === "GET" && typeof req.query["_expand"] !== "undefined";
}

/**
 * Get the name of the nested resource to be fetched in the request (from a many-to-one relationship).
 * Such resource is the one passed in the '_expand' query parameter.
 * @param req : The current request
 */
function getNestedResourceName(req) {
	return req.query["_expand"];
}

/**
 * Generate an Etag random value
 * @param item
 */
function generateEtagValue(item) {
	return _uniqueId(
		item.uuid +
			Math.random()
				.toFixed(8)
				.toString()
				.replace("0.", "")
	);
}

/**
 * Replace an object property recursively
 * @param item
 * @param property
 * @param newProperty
 */
function deepReplaceProperty(item, property, newProperty) {
	if (item instanceof Array) {
		for (var childItem of item) {
			deepReplaceProperty(childItem, property, newProperty);
		}
	} else if (typeof item === "object") {
		if (item.hasOwnProperty(property)) {
			item[newProperty] = item[property];
			delete item[property];
		}

		Object.keys(item).forEach(function(subItem) {
			deepReplaceProperty(item[subItem], property, newProperty);
		});
	}
}

/**
 * Add to the original routes for nested resources (those that will be rewritten with a '_expand' query parameter)
 * with an optional query param regex so that the route can match regardless of whether it has or not query params
 * @param routes : Routes to be rewritten (in order to support nested resources)
 */
function expandRewrittenRoutes(routes) {
	const nestedResourceRegex = /^\/(\w+)\/:(\w+)\/(\w+)$/;
	const optionalQueryParamsString = "(\\?[\\w\\W]+)?";

	var expandedRoutes = {};
	var keysToDelete = [];

	Object.keys(routes).forEach(function(key) {
		if (key.match(nestedResourceRegex)) {
			let expandedKey = key + optionalQueryParamsString;
			expandedRoutes[expandedKey] = routes[key]; // add new key with the expanded route
			keysToDelete.push(key); // keep the original route that was expanded to delete it afterwards
		}
	});

	if (keysToDelete.length) {
		// deleting routes that were expanded
		keysToDelete.forEach(function(key) {
			delete routes[key];
		});

		// merging expandedRoutes into routes object
		Object.assign(routes, expandedRoutes);
	}

	return routes;
}
