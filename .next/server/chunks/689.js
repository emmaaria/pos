"use strict";
exports.id = 689;
exports.ids = [689];
exports.modules = {

/***/ 4689:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ TableSkeleton)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9012);
/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1__);


function TableSkeleton({ td , tr  }) {
    const countTr = [];
    for(let i = 0; i < tr; i++){
        countTr.push(i);
    }
    const countTd = [];
    for(let i1 = 0; i1 < td; i1++){
        countTd.push(i1);
    }
    return countTr.map((el, index1)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("tr", {
            children: countTd.map((el, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1__.SkeletonTheme, {
                        baseColor: "rgba(249, 58, 11, 0.1)",
                        highlightColor: "#212130",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default()), {
                                width: `100%`,
                                height: 30
                            })
                        })
                    })
                }, index)
            )
        }, index1)
    );
};


/***/ })

};
;