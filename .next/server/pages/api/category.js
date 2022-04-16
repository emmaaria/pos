"use strict";
(() => {
var exports = {};
exports.id = 988;
exports.ids = [988];
exports.modules = {

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = import("iron-session");;

/***/ }),

/***/ 1132:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2759);
/* harmony import */ var _lib_session__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2182);
/* harmony import */ var iron_session_next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8534);
/* harmony import */ var _models_Category__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4487);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([iron_session_next__WEBPACK_IMPORTED_MODULE_2__]);
iron_session_next__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,iron_session_next__WEBPACK_IMPORTED_MODULE_2__/* .withIronSessionApiRoute */ .n)(async (req, res)=>{
    if (req.session.user) {
        const name = req.body.name;
        const all = req.body.all;
        const page = parseFloat(req.body.page);
        await _lib_db__WEBPACK_IMPORTED_MODULE_0__/* ["default"].connect */ .Z.connect();
        if (name && name !== "") {
            const total = await _models_Category__WEBPACK_IMPORTED_MODULE_3__/* ["default"].find */ .Z.find({
                name: new RegExp(name, "i")
            }).count();
            const categories = await _models_Category__WEBPACK_IMPORTED_MODULE_3__/* ["default"].find */ .Z.find({
                name: new RegExp(name, "i")
            }).lean();
            const totalPagesCount = Math.ceil(total / 50);
            let totalPages = [];
            for(let i = 0; i <= totalPagesCount - 1; i++){
                totalPages.push(i);
            }
            res.status(200).send({
                categories,
                totalPages
            });
        } else if (all && all === true) {
            const categories = await _models_Category__WEBPACK_IMPORTED_MODULE_3__/* ["default"].find */ .Z.find({});
            res.status(200).send({
                categories
            });
        } else {
            const total = await _models_Category__WEBPACK_IMPORTED_MODULE_3__/* ["default"].find */ .Z.find({}).count();
            const categories = await _models_Category__WEBPACK_IMPORTED_MODULE_3__/* ["default"].find */ .Z.find({}).skip(50 * page).limit(50);
            const totalPagesCount = Math.ceil(total / 50);
            let totalPages = [];
            for(let i = 0; i <= totalPagesCount - 1; i++){
                totalPages.push(i);
            }
            res.status(200).send({
                categories,
                totalPages
            });
        }
    } else {
        res.status(401).send("Your are not authorized");
    }
}, _lib_session__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [8534,6766], () => (__webpack_exec__(1132)));
module.exports = __webpack_exports__;

})();