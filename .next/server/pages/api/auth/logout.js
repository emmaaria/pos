"use strict";
(() => {
var exports = {};
exports.id = 845;
exports.ids = [845];
exports.modules = {

/***/ 4014:
/***/ ((module) => {

module.exports = import("iron-session");;

/***/ }),

/***/ 2182:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const session = {
    cookieName: "sm-pos",
    password: "s%3Al3ozSdvQ83TtC5RvJ.CibaQoHtaY0H3QOB1kqR8H2A",
    cookieOptions: {
        secure: true
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (session);


/***/ }),

/***/ 9242:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var iron_session_next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8534);
/* harmony import */ var _lib_session__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2182);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([iron_session_next__WEBPACK_IMPORTED_MODULE_0__]);
iron_session_next__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,iron_session_next__WEBPACK_IMPORTED_MODULE_0__/* .withIronSessionApiRoute */ .n)(function logoutRoute(req, res) {
    req.session.destroy();
    res.status(200).send({
        ok: true
    });
}, _lib_session__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [534], () => (__webpack_exec__(9242)));
module.exports = __webpack_exports__;

})();