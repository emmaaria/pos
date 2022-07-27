"use strict";
(() => {
var exports = {};
exports.id = 221;
exports.ids = [221];
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




function AutocompleteInput({ type , token  }) {
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
    };
    const setValue = (label, value)=>{
        jquery__WEBPACK_IMPORTED_MODULE_2___default()(".supplier-input").val(label);
        if (type === "supplier") {
            jquery__WEBPACK_IMPORTED_MODULE_2___default()(".supplier-id").val(value);
        }
        if (type === "customer") {
            jquery__WEBPACK_IMPORTED_MODULE_2___default()(".customer").val(value);
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
                    onChange: search
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


/***/ }),

/***/ 8373:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreatePurchase),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_layout_Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9629);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(968);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var iron_session_next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9531);
/* harmony import */ var _lib_session__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2180);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1187);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2947);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_datepicker__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(8743);
/* harmony import */ var react_datepicker__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_datepicker__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _components_AutocompleteInput__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(8194);
/* harmony import */ var _components_Loader__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(9270);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([iron_session_next__WEBPACK_IMPORTED_MODULE_3__]);
iron_session_next__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];












function CreatePurchase({ user  }) {
    const { 0: loader , 1: setLoader  } = (0,react__WEBPACK_IMPORTED_MODULE_8__.useState)(false);
    const { 0: total , 1: setTotal  } = (0,react__WEBPACK_IMPORTED_MODULE_8__.useState)(0);
    const { 0: due , 1: setDue  } = (0,react__WEBPACK_IMPORTED_MODULE_8__.useState)(0);
    const { 0: products , 1: setProducts  } = (0,react__WEBPACK_IMPORTED_MODULE_8__.useState)();
    const { 0: timer , 1: setTimer  } = (0,react__WEBPACK_IMPORTED_MODULE_8__.useState)(null);
    const { 0: date1 , 1: setDate  } = (0,react__WEBPACK_IMPORTED_MODULE_8__.useState)(new Date());
    const { 0: purchaseProducts , 1: setPurchaseProducts  } = (0,react__WEBPACK_IMPORTED_MODULE_8__.useState)([]);
    const headers = {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    };
    const handleForm = async (e)=>{
        e.preventDefault();
        react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.loading("Submitting", {
            position: "bottom-right",
            theme: "dark"
        });
        setLoader(true);
        const productIds = jquery__WEBPACK_IMPORTED_MODULE_7___default()(".productId").map(function(index, el) {
            return jquery__WEBPACK_IMPORTED_MODULE_7___default()(el).val();
        }).get();
        const productQuantities = jquery__WEBPACK_IMPORTED_MODULE_7___default()(".productQuantity").map(function(index, el) {
            return jquery__WEBPACK_IMPORTED_MODULE_7___default()(el).val();
        }).get();
        const productPrices = jquery__WEBPACK_IMPORTED_MODULE_7___default()(".productPrice").map(function(index, el) {
            return jquery__WEBPACK_IMPORTED_MODULE_7___default()(el).val();
        }).get();
        const comment = jquery__WEBPACK_IMPORTED_MODULE_7___default()(".note").val();
        const date = jquery__WEBPACK_IMPORTED_MODULE_7___default()(".date").val();
        const paid = jquery__WEBPACK_IMPORTED_MODULE_7___default()(".paid").val();
        const supplier = jquery__WEBPACK_IMPORTED_MODULE_7___default()(".supplier-id").val();
        if (supplier === "") {
            setLoader(false);
            react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.dismiss();
            react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.error("Please select supplier", {
                position: "bottom-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark"
            });
            return;
        }
        if (productIds.length <= 0) {
            setLoader(false);
            react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.dismiss();
            react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.error("No product added", {
                position: "bottom-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark"
            });
            return;
        }
        try {
            const res = await axios__WEBPACK_IMPORTED_MODULE_6___default().post(`${"http://pos-backend.webxcode.xyz/api"}/purchase/store`, {
                supplier_id: supplier,
                productIds,
                productQuantities,
                productPrices,
                date,
                comment,
                paid,
                total
            }, headers);
            if (res.data.status === true) {
                react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.dismiss();
                react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.success("Successfully Saved", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark"
                });
                jquery__WEBPACK_IMPORTED_MODULE_7___default()("form").trigger("reset");
                setDue(0);
                setPurchaseProducts([]);
                setTotal(0);
                setLoader(false);
            } else {
                react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.dismiss();
                react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.success(res.data.error, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark"
                });
                setLoader(false);
            }
        } catch (e1) {
            react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.dismiss();
            react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.error(e1.response.data, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark"
            });
            setLoader(false);
        }
    };
    const removeProduct = (productId)=>{
        const newProducts = purchaseProducts.filter((product)=>{
            return product.id !== productId;
        });
        setPurchaseProducts(newProducts);
        setTotal(0);
        newProducts.map((el)=>{
            setTotal((oldTotal)=>oldTotal + parseFloat(jquery__WEBPACK_IMPORTED_MODULE_7___default()(`.subtotal_${el.id}`).text())
            );
        });
    };
    const calculateSubtotal = (productId)=>{
        const price = parseFloat(jquery__WEBPACK_IMPORTED_MODULE_7___default()(`.productPrice_${productId}`).val());
        const quantity = parseFloat(jquery__WEBPACK_IMPORTED_MODULE_7___default()(`.productQuantity_${productId}`).val());
        const subTotal = price * quantity;
        jquery__WEBPACK_IMPORTED_MODULE_7___default()(`.subtotal_${productId}`).text(`${subTotal}`);
        calculateSum();
    };
    const calculateSum = ()=>{
        setTotal(0);
        jquery__WEBPACK_IMPORTED_MODULE_7___default()(`.subtotal`).each(function() {
            setTotal((oldTotal)=>oldTotal + parseFloat(jquery__WEBPACK_IMPORTED_MODULE_7___default()(this).text())
            );
        });
    };
    const calculateDue = ()=>{
        const paid = jquery__WEBPACK_IMPORTED_MODULE_7___default()(`.paid`).val();
        setDue(parseFloat(paid));
    };
    const searchProduct = async ()=>{
        jquery__WEBPACK_IMPORTED_MODULE_7___default()(".autocompleteItemContainer.product").show();
        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }
        const name = jquery__WEBPACK_IMPORTED_MODULE_7___default()(`.search-product`).val();
        setTimer(setTimeout(()=>{
            axios__WEBPACK_IMPORTED_MODULE_6___default().get(`${"http://pos-backend.webxcode.xyz/api"}/product?name=${name}`, headers).then((res)=>{
                if (res.data.status === true) {
                    setProducts(res.data.products.data);
                }
            }).catch((err)=>{
                console.log(err);
            });
        }, 500));
    };
    const addProduct = (data)=>{
        const alreadyAdded = purchaseProducts.filter((product)=>{
            return product.id === data.id;
        });
        if (alreadyAdded.length > 0) {
            alert("Product already added");
        } else {
            setPurchaseProducts((currentProduct)=>[
                    ...currentProduct,
                    data
                ]
            );
            setTotal((oldTotal)=>oldTotal + parseFloat(data.price)
            );
        }
        jquery__WEBPACK_IMPORTED_MODULE_7___default()(".autocompleteItemContainer.product").hide();
        jquery__WEBPACK_IMPORTED_MODULE_7___default()(`.search-product`).val("");
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
                    children: "Add New Purchase"
                })
            }),
            loader && loader === true && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Loader__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {}),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_toastify__WEBPACK_IMPORTED_MODULE_5__.ToastContainer, {}),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_layout_Layout__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
                user: user,
                title: `Add New Purchase`,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "content",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "custom-card",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                            onSubmit: handleForm,
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "mb-3",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "row",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "col-md-6",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                        htmlFor: "supplier",
                                                        className: `form-label`,
                                                        children: "Supplier"
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_AutocompleteInput__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
                                                        type: "supplier",
                                                        token: user.token
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "col-md-6",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                        htmlFor: "date",
                                                        className: `form-label`,
                                                        children: "Date"
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_datepicker__WEBPACK_IMPORTED_MODULE_9___default()), {
                                                        selected: date1,
                                                        onChange: (date)=>setDate(date)
                                                        ,
                                                        dateFormat: "yyyy-MM-dd",
                                                        className: `form-control date`
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "mb-3",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                            htmlFor: "product",
                                            className: `form-label`,
                                            children: "Choose Product"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: `autocompleteWrapper product`,
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                    type: "text",
                                                    className: `form-control autocompleteInput search-product`,
                                                    autoComplete: `off`,
                                                    onKeyUp: searchProduct,
                                                    onKeyDown: searchProduct,
                                                    onChange: searchProduct,
                                                    placeholder: `Search product`
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: `autocompleteItemContainer product`,
                                                    children: products && products.map((el)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            className: `autocompleteItem`,
                                                            onClick: ()=>addProduct(el)
                                                            ,
                                                            children: el.name
                                                        }, `search-product-item-${el.id}`)
                                                    )
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("table", {
                                    className: `table table-bordered table-hover`,
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("thead", {
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                                        width: `5%`,
                                                        children: "SL"
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                                        width: `40%`,
                                                        children: "Product Name"
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                                        width: `15%`,
                                                        children: "Purchase Price"
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                                        width: `15%`,
                                                        children: "Quantity"
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                                        className: `text-end`,
                                                        width: `20%`,
                                                        children: "Subtotal"
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                                        className: `text-center`,
                                                        width: `5%`,
                                                        children: "Action"
                                                    })
                                                ]
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("tbody", {
                                            children: purchaseProducts.map((el, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                            children: index + 1
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                                                            children: [
                                                                el.name,
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                                    type: "hidden",
                                                                    className: `productId`,
                                                                    defaultValue: el.id
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                                type: "text",
                                                                className: `form-control productPrice productPrice_${el.id}`,
                                                                defaultValue: el.price,
                                                                onChange: ()=>calculateSubtotal(el.id)
                                                                ,
                                                                onKeyUp: ()=>calculateSubtotal(el.id)
                                                                ,
                                                                onKeyDown: ()=>calculateSubtotal(el.id)
                                                            })
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                                type: "text",
                                                                className: `form-control productQuantity productQuantity_${el.id}`,
                                                                defaultValue: 1,
                                                                onChange: ()=>calculateSubtotal(el.id)
                                                                ,
                                                                onKeyUp: ()=>calculateSubtotal(el.id)
                                                                ,
                                                                onKeyDown: ()=>calculateSubtotal(el.id)
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                                                            className: `text-end`,
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                    className: `subtotal subtotal_${el.id}`,
                                                                    children: el.price
                                                                }),
                                                                " Tk."
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                            className: `text-center`,
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                                className: `btn btn-danger btn-sm`,
                                                                onClick: ()=>removeProduct(el.id)
                                                                ,
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                                    className: "fa-solid fa-trash-can"
                                                                })
                                                            })
                                                        })
                                                    ]
                                                }, `purchase-product-item-${el.id}`)
                                            )
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tfoot", {
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                            className: `text-end`,
                                                            colSpan: 4,
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                                                children: "Total"
                                                            })
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                            className: `text-end border-1 border-white d-block`,
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                className: `total`,
                                                                children: [
                                                                    total,
                                                                    " Tk."
                                                                ]
                                                            })
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {})
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                            className: `text-end`,
                                                            colSpan: 4,
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                                                children: "Paid"
                                                            })
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                            className: `px-0`,
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                                type: "text",
                                                                className: `form-control paid`,
                                                                onKeyUp: calculateDue,
                                                                onKeyDown: calculateDue,
                                                                onChange: calculateDue
                                                            })
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                            className: `text-end`,
                                                            colSpan: 4,
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                                                children: "Due"
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                                                            className: `text-end border-1 border-white d-block`,
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                    className: `due`,
                                                                    children: total - due
                                                                }),
                                                                " Tk."
                                                            ]
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "mb-3 mt-3",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                            htmlFor: "note",
                                            className: `form-label`,
                                            children: "Note"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
                                            id: "note",
                                            rows: "3",
                                            className: `note form-control`
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    className: `btn btn-success`,
                                    type: `submit`,
                                    children: "Save"
                                })
                            ]
                        })
                    })
                })
            })
        ]
    });
};
const getServerSideProps = (0,iron_session_next__WEBPACK_IMPORTED_MODULE_3__/* .withIronSessionSsr */ .c)(async function getServerSideProps({ req  }) {
    const session1 = req.session;
    if (!session1.user) {
        return {
            redirect: {
                destination: `/`
            }
        };
    }
    return {
        props: {
            user: session1.user
        }
    };
}, _lib_session__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2167:
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ 2947:
/***/ ((module) => {

module.exports = require("jquery");

/***/ }),

/***/ 562:
/***/ ((module) => {

module.exports = require("next/dist/server/denormalize-page-path.js");

/***/ }),

/***/ 4957:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 1925:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 4241:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/routing-items.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 8743:
/***/ ((module) => {

module.exports = require("react-datepicker");

/***/ }),

/***/ 7784:
/***/ ((module) => {

module.exports = require("react-detect-offline");

/***/ }),

/***/ 1187:
/***/ ((module) => {

module.exports = require("react-toastify");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = import("iron-session");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [895,531,61,126], () => (__webpack_exec__(8373)));
module.exports = __webpack_exports__;

})();