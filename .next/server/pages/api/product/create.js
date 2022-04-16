"use strict";
(() => {
var exports = {};
exports.id = 2070;
exports.ids = [2070];
exports.modules = {

/***/ 1081:
/***/ ((module) => {

module.exports = require("generate-unique-id");

/***/ }),

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = import("iron-session");;

/***/ }),

/***/ 2228:
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
/* harmony import */ var generate_unique_id__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1081);
/* harmony import */ var generate_unique_id__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(generate_unique_id__WEBPACK_IMPORTED_MODULE_4__);
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
        const productId = generate_unique_id__WEBPACK_IMPORTED_MODULE_4___default()({
            length: 10,
            useLetters: false
        });
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
        const product = new _models_Product__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z({
            name,
            productId,
            category,
            defaultUnit,
            secondaryUnit,
            defaultUnitPrice,
            purchasePrice,
            secondaryUnitPrice,
            defaultUnitValue,
            secondaryUnitValue
        });
        await product.save();
        res.status(201).send("Saved");
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
var __webpack_exports__ = __webpack_require__.X(0, [8534,2606], () => (__webpack_exec__(2228)));
module.exports = __webpack_exports__;

})();