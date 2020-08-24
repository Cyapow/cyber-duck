(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

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

/***/ })

}]);