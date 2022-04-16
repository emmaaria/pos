"use strict";
(() => {
var exports = {};
exports.id = 3781;
exports.ids = [3781];
exports.modules = {

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = import("iron-session");;

/***/ }),

/***/ 557:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2759);
/* harmony import */ var _lib_session__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2182);
/* harmony import */ var iron_session_next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8534);
/* harmony import */ var _models_Product__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9442);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([iron_session_next__WEBPACK_IMPORTED_MODULE_2__]);
iron_session_next__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,iron_session_next__WEBPACK_IMPORTED_MODULE_2__/* .withIronSessionApiRoute */ .n)(async (req, res)=>{
    if (req.session.user) {
        const name = req.body.name;
        const category = req.body.category;
        const defaultUnit = req.body.defaultUnit;
        const secondaryUnit = req.body.secondaryUnit;
        const defaultUnitPrice = req.body.defaultUnitPrice;
        const purchasePrice = req.body.purchasePrice;
        const secondaryUnitPrice = req.body.secondaryUnitPrice;
        const defaultUnitValue = req.body.defaultUnitValue;
        const secondaryUnitValue = req.body.secondaryUnitValue;
        const id = req.body.id;
        if (name === "") {
            res.status(400).send({
                error: "Name is required"
            });
        }
        if (defaultUnit === "") {
            res.status(400).send({
                error: "Default unit is required"
            });
        }
        await _lib_db__WEBPACK_IMPORTED_MODULE_0__/* ["default"].connect */ .Z.connect();
        const product = await _models_Product__WEBPACK_IMPORTED_MODULE_3__/* ["default"].findByIdAndUpdate */ .Z.findByIdAndUpdate(id, {
            name,
            category,
            defaultUnit,
            secondaryUnit,
            defaultUnitPrice,
            purchasePrice,
            secondaryUnitPrice,
            defaultUnitValue,
            secondaryUnitValue
        });
        if (product) {
            res.status(201).send({
                success: "Updated"
            });
        } else {
            res.status(400).send({
                error: "Something went wrong"
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
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [8534,2606], () => (__webpack_exec__(557)));
module.exports = __webpack_exports__;

})();