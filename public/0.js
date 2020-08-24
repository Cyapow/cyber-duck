(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./resources/js/sections sync recursive ^((?!index|\\.unit\\.).)*\\.js$":
/*!*****************************************************************!*\
  !*** ./resources/js/sections sync ^((?!index|\.unit\.).)*\.js$ ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./companies.js": "./resources/js/sections/companies.js",
	"./employees.js": "./resources/js/sections/employees.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./resources/js/sections sync recursive ^((?!index|\\.unit\\.).)*\\.js$";

/***/ }),

/***/ "./resources/js/sections/companies.js":
/*!********************************************!*\
  !*** ./resources/js/sections/companies.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var route = 'companies';
var fields = [{
  column: 'id',
  type: 'string',
  editable: false
}, {
  column: 'name',
  type: 'string',
  validation: 'required',
  editable: false
}, {
  column: 'email',
  type: 'string',
  validation: 'required|email',
  editable: false
}, {
  column: 'logo',
  type: 'string',
  validation: 'image',
  editable: false
}];
/* harmony default export */ __webpack_exports__["default"] = ({
  route: route,
  fields: fields
});

/***/ }),

/***/ "./resources/js/sections/employees.js":
/*!********************************************!*\
  !*** ./resources/js/sections/employees.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var route = 'employees';
var fields = [{
  column: 'id',
  type: 'string',
  editable: false
}, {
  column: 'first_name',
  type: 'string',
  validation: 'required'
}, {
  column: 'last_name',
  type: 'string',
  validation: 'required'
}, {
  column: 'email',
  type: 'string',
  validation: 'required|email'
}, {
  column: 'phone',
  type: 'string',
  validation: 'image'
}, {
  column: 'company_id',
  type: 'relationship',
  object: 'companies'
}];
/* harmony default export */ __webpack_exports__["default"] = ({
  route: route,
  fields: fields
});

/***/ }),

/***/ "./resources/js/sections/index.js":
/*!****************************************!*\
  !*** ./resources/js/sections/index.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_camelCase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/camelCase */ "./node_modules/lodash/camelCase.js");
/* harmony import */ var lodash_camelCase__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_camelCase__WEBPACK_IMPORTED_MODULE_0__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Register each file as a corresponding Vuex module. Module nesting
// will mirror [sub-]directory hierarchy and modules are namespaced
// as the camelCase equivalent of their file name.
 // Recursively get the namespace of a Vuex module, even if nested.

function getNamespace(subtree, path) {
  if (path.length === 1) return subtree;
  var namespace = path.shift();
  subtree.modules[namespace] = _objectSpread({
    modules: {},
    namespaced: true
  }, subtree.modules[namespace]);
  return getNamespace(subtree.modules[namespace], path);
}

var modulesCache = {};
var routes = [];

(function updateModules() {
  // Allow us to dynamically require all Vuex module files.
  // https://webpack.js.org/guides/dependency-management/#require-context
  var requireModule = __webpack_require__("./resources/js/sections sync recursive ^((?!index|\\.unit\\.).)*\\.js$"); // For every Vuex module...


  requireModule.keys().forEach(function (fileName) {
    console.log(fileName);
    var moduleDefinition = requireModule(fileName)["default"] || requireModule(fileName); // Skip the module during hot reload if it refers to the
    // same module definition as the one we have cached.

    if (modulesCache[fileName] === moduleDefinition) return; // Update the module cache, for efficient hot reloading.

    modulesCache[fileName] = moduleDefinition; // Get the module path as an array.

    var modulePath = fileName // Remove the "./" from the beginning.
    .replace(/^\.\//, '') // Remove the file extension from the end.
    .replace(/\.\w+$/, '') // Split nested modules into an array path.
    .split(/\//) // camelCase all module namespaces and names.
    .map(lodash_camelCase__WEBPACK_IMPORTED_MODULE_0___default.a);
    /*
    // Get the modules object for the current path.
    const { modules } = getNamespace(storeData, modulePath)
     // Add the module to our modules object.
    routes[modulePath.pop()] = {
      // Modules are namespaced by default.
      namespaced: true,
      ...moduleDefinition,
    }*/
  });
})();

/* harmony default export */ __webpack_exports__["default"] = (routes);

/***/ })

}]);