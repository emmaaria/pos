"use strict";
exports.id = 734;
exports.ids = [734];
exports.modules = {

/***/ 8194:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ AutocompleteInput)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2947);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);




function AutocompleteInput({ type , token , placeholder  }) {
    const headers = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const { 0: timer , 1: setTimer  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);
    const { 0: data , 1: setData  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)();
    const search = async ()=>{
        jquery__WEBPACK_IMPORTED_MODULE_2___default()(".autocompleteItemContainer.supplier").show();
        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }
        if (type === "supplier") {
            const name = jquery__WEBPACK_IMPORTED_MODULE_2___default()(".autocompleteInput").val();
            setTimer(setTimeout(()=>{
                axios__WEBPACK_IMPORTED_MODULE_1___default().get(`${"http://pos-backend.webxcode.xyz/api"}/supplier?name=${name}`, headers).then((res)=>{
                    if (res.data.status === true) {
                        setData(res.data.suppliers.data);
                    }
                }).catch((err)=>{
                    console.log(err);
                });
            }, 1000));
        }
        if (type === "customer") {
            const name = jquery__WEBPACK_IMPORTED_MODULE_2___default()(".autocompleteInput").val();
            setTimer(setTimeout(()=>{
                axios__WEBPACK_IMPORTED_MODULE_1___default().get(`${"http://pos-backend.webxcode.xyz/api"}/customer?name=${name}`, headers).then((res)=>{
                    if (res.data.status === true) {
                        setData(res.data.customers.data);
                    }
                }).catch((err)=>{
                    console.log(err);
                });
            }, 1000));
        }
    };
    const setValue = (label, value)=>{
        jquery__WEBPACK_IMPORTED_MODULE_2___default()(".supplier-input").val(label);
        if (type === "supplier") {
            jquery__WEBPACK_IMPORTED_MODULE_2___default()(".supplier-id").val(value);
        }
        if (type === "customer") {
            jquery__WEBPACK_IMPORTED_MODULE_2___default()(".customer-id").val(value);
        }
        jquery__WEBPACK_IMPORTED_MODULE_2___default()(".autocompleteItemContainer.supplier").hide();
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: `autocompleteWrapper`,
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                    type: "text",
                    className: `form-control autocompleteInput supplier-input`,
                    autoComplete: `off`,
                    onKeyUp: search,
                    onKeyDown: search,
                    onChange: search,
                    placeholder: placeholder ? placeholder : ""
                }),
                type && type === "supplier" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                    type: "hidden",
                    className: `supplier-id`
                }),
                type && type === "customer" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                    type: "hidden",
                    className: `customer-id`
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: `autocompleteItemContainer supplier`,
                    children: data && data.map((el)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: `autocompleteItem`,
                            onClick: ()=>setValue(el.name, el.id)
                            ,
                            children: el.name
                        }, `supplier-${el.id}`)
                    )
                })
            ]
        })
    });
};


/***/ }),

/***/ 9270:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Loader)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function Loader() {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "loader"
    });
};


/***/ })

};
;