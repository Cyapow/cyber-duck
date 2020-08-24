(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

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

/***/ })

}]);