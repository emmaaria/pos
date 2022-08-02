"use strict";
(() => {
var exports = {};
exports.id = 653;
exports.ids = [653];
exports.modules = {

/***/ 7094:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateSale),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_layout_Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5688);
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












function CreateSale({ user  }) {
    const { 0: loader , 1: setLoader  } = (0,react__WEBPACK_IMPORTED_MODULE_8__.useState)(false);
    const { 0: subTotal , 1: setSubTotal  } = (0,react__WEBPACK_IMPORTED_MODULE_8__.useState)(0);
    const { 0: total , 1: setTotal  } = (0,react__WEBPACK_IMPORTED_MODULE_8__.useState)(0);
    const { 0: grandTotal , 1: setGrandTotal  } = (0,react__WEBPACK_IMPORTED_MODULE_8__.useState)(0);
    const { 0: paid , 1: setPaid  } = (0,react__WEBPACK_IMPORTED_MODULE_8__.useState)(0);
    const { 0: discountAmount , 1: setDiscountAmount  } = (0,react__WEBPACK_IMPORTED_MODULE_8__.useState)(0);
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
        const cash = jquery__WEBPACK_IMPORTED_MODULE_7___default()(".cash").val();
        const bcash = jquery__WEBPACK_IMPORTED_MODULE_7___default()(".bcash").val();
        const nagad = jquery__WEBPACK_IMPORTED_MODULE_7___default()(".nagad").val();
        const card = jquery__WEBPACK_IMPORTED_MODULE_7___default()(".card").val();
        const customer = jquery__WEBPACK_IMPORTED_MODULE_7___default()(".customer-id").val();
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
            const res = await axios__WEBPACK_IMPORTED_MODULE_6___default().post(`${"//pos-backend.webxcode.xyz/api"}/invoice/store`, {
                customer_id: customer,
                productIds,
                productQuantities,
                productPrices,
                date,
                comment,
                cash,
                bcash,
                nagad,
                card,
                discountAmount
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
                setPaid(0);
                setGrandTotal(0);
                setSubTotal(0);
                setDiscountAmount(0);
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
        setGrandTotal(0);
        setSubTotal(0);
        newProducts.map((el)=>{
            setTotal((oldTotal)=>oldTotal + parseFloat(jquery__WEBPACK_IMPORTED_MODULE_7___default()(`.subtotal_${el.id}`).text())
            );
            setGrandTotal((oldTotal)=>oldTotal + parseFloat(jquery__WEBPACK_IMPORTED_MODULE_7___default()(`.subtotal_${el.id}`).text())
            );
        });
    };
    const calculateSubtotal = (productId)=>{
        const price = parseFloat(jquery__WEBPACK_IMPORTED_MODULE_7___default()(`.productPrice_${productId}`).val());
        const quantity = parseFloat(jquery__WEBPACK_IMPORTED_MODULE_7___default()(`.productQuantity_${productId}`).val());
        jquery__WEBPACK_IMPORTED_MODULE_7___default()(`.subtotal_${productId}`).text(price * quantity);
        calculateSum();
    };
    const calculateSum = ()=>{
        setSubTotal(0);
        setTotal(0);
        setGrandTotal(0);
        jquery__WEBPACK_IMPORTED_MODULE_7___default()(`.subtotal`).each(function() {
            setSubTotal((oldTotal)=>oldTotal + parseFloat(jquery__WEBPACK_IMPORTED_MODULE_7___default()(this).text())
            );
            setTotal((oldTotal)=>oldTotal + parseFloat(jquery__WEBPACK_IMPORTED_MODULE_7___default()(this).text())
            );
            setGrandTotal((oldTotal)=>oldTotal + parseFloat(jquery__WEBPACK_IMPORTED_MODULE_7___default()(this).text())
            );
        });
    };
    const calculateDue = ()=>{
        setPaid(0);
        jquery__WEBPACK_IMPORTED_MODULE_7___default()(`.paid`).each(function() {
            setPaid((oldTotal)=>oldTotal + parseFloat(jquery__WEBPACK_IMPORTED_MODULE_7___default()(this).val() ? jquery__WEBPACK_IMPORTED_MODULE_7___default()(this).val() : 0)
            );
        });
    };
    const searchProduct = async ()=>{
        jquery__WEBPACK_IMPORTED_MODULE_7___default()(".autocompleteItemContainer.product").show();
        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }
        const name = jquery__WEBPACK_IMPORTED_MODULE_7___default()(`.search-product`).val();
        setTimer(setTimeout(()=>{
            axios__WEBPACK_IMPORTED_MODULE_6___default().get(`${"//pos-backend.webxcode.xyz/api"}/product?name=${name}`, headers).then((res)=>{
                if (res.data.status === true) {
                    setProducts(res.data.products.data);
                }
            }).catch((err)=>{
                console.log(err);
            });
        }, 500));
    };
    const searchProductByBarcode = async (e)=>{
        e.preventDefault();
        const id = jquery__WEBPACK_IMPORTED_MODULE_7___default()(`.scan-barcode`).val();
        if (id !== "") {
            axios__WEBPACK_IMPORTED_MODULE_6___default().get(`${"//pos-backend.webxcode.xyz/api"}/product-by-barcode?id=${id}`, headers).then((res)=>{
                if (res.data.status === true) {
                    addProduct(res.data.product);
                    jquery__WEBPACK_IMPORTED_MODULE_7___default()(`.scan-barcode`).val("");
                    calculateSubtotal(res.data.product.id);
                } else {
                    alert("No product found");
                }
            }).catch((err)=>{
                console.log(err);
            });
        }
    };
    const addProduct = (data)=>{
        const alreadyAdded = purchaseProducts.filter((product)=>{
            return product.id === data.id;
        });
        if (alreadyAdded.length > 0) {
            const oldQty = jquery__WEBPACK_IMPORTED_MODULE_7___default()(`.productQuantity_${data.id}`).val();
            const newQty = parseFloat(oldQty) + 1;
            jquery__WEBPACK_IMPORTED_MODULE_7___default()(`.productQuantity_${data.id}`).val(newQty);
        } else {
            setPurchaseProducts((currentProduct)=>[
                    ...currentProduct,
                    data
                ]
            );
            setSubTotal((oldTotal)=>oldTotal + parseFloat(data.price)
            );
            setTotal((oldTotal)=>oldTotal + parseFloat(data.price)
            );
            setGrandTotal((oldTotal)=>oldTotal + parseFloat(data.price)
            );
        }
        jquery__WEBPACK_IMPORTED_MODULE_7___default()(".autocompleteItemContainer.product").hide();
        jquery__WEBPACK_IMPORTED_MODULE_7___default()(`.search-product`).val("");
    };
    const showPayment = ()=>{
        jquery__WEBPACK_IMPORTED_MODULE_7___default()(".payment-modal").fadeIn();
    };
    const hidePayment = ()=>{
        jquery__WEBPACK_IMPORTED_MODULE_7___default()(".payment-modal").fadeOut();
    };
    const addMoney = (amount)=>{
        jquery__WEBPACK_IMPORTED_MODULE_7___default()(".cash").val(amount);
        calculateDue();
    };
    const calculateDiscount = ()=>{
        const discount = jquery__WEBPACK_IMPORTED_MODULE_7___default()(".discount").val();
        const discountType = jquery__WEBPACK_IMPORTED_MODULE_7___default()(".discount-type").val();
        setTotal(0);
        setGrandTotal(0);
        jquery__WEBPACK_IMPORTED_MODULE_7___default()(`.subtotal`).each(function() {
            setTotal((oldTotal)=>oldTotal + parseFloat(jquery__WEBPACK_IMPORTED_MODULE_7___default()(this).text())
            );
            setGrandTotal((oldTotal)=>oldTotal + parseFloat(jquery__WEBPACK_IMPORTED_MODULE_7___default()(this).text())
            );
        });
        if (discountType === "%") {
            const discountedAmount = total * parseFloat(discount) / 100;
            setDiscountAmount(discountedAmount);
        } else {
            setDiscountAmount(parseFloat(discount));
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
                    children: "POS"
                })
            }),
            loader && loader === true && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Loader__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {}),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_toastify__WEBPACK_IMPORTED_MODULE_5__.ToastContainer, {}),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_layout_Layout__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
                user: user,
                title: `POS`,
                sidebar: "pos",
                topbar: "pos",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "content-pos",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("form", {
                            onSubmit: handleForm,
                            id: "invoice"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "custom-card mb-3",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "row",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "col-md-3",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_AutocompleteInput__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
                                            type: "customer",
                                            token: user.token,
                                            placeholder: "Search customer"
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "col-md-3",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_datepicker__WEBPACK_IMPORTED_MODULE_9___default()), {
                                            selected: date1,
                                            onChange: (date)=>setDate(date)
                                            ,
                                            dateFormat: "yyyy-MM-dd",
                                            className: `form-control date`
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "col-md-3",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("form", {
                                            onSubmit: searchProductByBarcode,
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                type: "text",
                                                className: `form-control scan-barcode`,
                                                placeholder: `Scan Barcode Here`,
                                                id: "barcode",
                                                autoFocus: true
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "col-md-3",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
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
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "custom-card",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("table", {
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
                                                    width: `35%`,
                                                    children: "Product Name"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                                    width: `15%`,
                                                    children: "Price"
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
                                                    width: `10%`,
                                                    children: "Action"
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tbody", {
                                        className: `border-bottom border-1 border-white`,
                                        children: [
                                            purchaseProducts && purchaseProducts.length <= 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("tr", {
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                    colSpan: 6,
                                                    className: `text-center`,
                                                    children: "No product added"
                                                })
                                            }),
                                            purchaseProducts.map((el, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
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
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tfoot", {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                        className: `text-end`,
                                                        colSpan: 4,
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                                            children: "Subtotal"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                        className: `text-end d-block`,
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                            children: [
                                                                subTotal,
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
                                                            children: "Sale Discount"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                        className: `text-end d-block`,
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                            type: "text",
                                                            className: `form-control discount`,
                                                            onKeyUp: calculateDiscount,
                                                            onKeyDown: calculateDiscount,
                                                            onChange: calculateDiscount
                                                        })
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                                                            className: `form-select form-control discount-type`,
                                                            onChange: calculateDiscount,
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                                    value: "%",
                                                                    children: "Percent"
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                                    value: "fixed",
                                                                    children: "Fixed"
                                                                })
                                                            ]
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
                                                            children: "Discount Amount"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                                                        className: `text-end d-block`,
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                children: discountAmount
                                                            }),
                                                            " Tk."
                                                        ]
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
                                                            children: "Total"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                                                        className: `text-end d-block`,
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                className: "total",
                                                                children: total - discountAmount
                                                            }),
                                                            " Tk."
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {})
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "mb-3 mt-3",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
                                id: "note",
                                rows: "3",
                                className: `note form-control`,
                                placeholder: "Note"
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            className: `btn btn-success mb-5`,
                            onClick: showPayment,
                            children: "Payment"
                        })
                    ]
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "payment-modal",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "payment-modal-container",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "close",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: "fa-solid fa-close",
                                onClick: hidePayment
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "title",
                            children: "Payment"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("hr", {}),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "row gx-5",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "col-md-8",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "form-group mb-3",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                    className: `form-label`,
                                                    children: "Cash"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                    type: "text",
                                                    className: `form-control paid cash`,
                                                    onKeyUp: calculateDue,
                                                    onKeyDown: calculateDue,
                                                    onChange: calculateDue
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "form-group mb-3",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                    className: `form-label`,
                                                    children: "Bkash"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                    type: "text",
                                                    className: `form-control paid bkash`,
                                                    onKeyUp: calculateDue,
                                                    onKeyDown: calculateDue,
                                                    onChange: calculateDue
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "form-group mb-3",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                    className: `form-label`,
                                                    children: "Nagad"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                    type: "text",
                                                    className: `form-control paid nagad`,
                                                    onKeyUp: calculateDue,
                                                    onKeyDown: calculateDue,
                                                    onChange: calculateDue
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "form-group mb-3",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                    className: `form-label`,
                                                    children: "Card"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                    type: "text",
                                                    className: `form-control paid card`,
                                                    onKeyUp: calculateDue,
                                                    onKeyDown: calculateDue,
                                                    onChange: calculateDue
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "col-md-4",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: "notes",
                                            children: "Notes"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                                            className: "note-list",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                    onClick: ()=>addMoney(50)
                                                    ,
                                                    children: "50"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                    onClick: ()=>addMoney(100)
                                                    ,
                                                    children: "100"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                    onClick: ()=>addMoney(200)
                                                    ,
                                                    children: "200"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                    onClick: ()=>addMoney(500)
                                                    ,
                                                    children: "500"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                    onClick: ()=>addMoney(1000)
                                                    ,
                                                    children: "1000"
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("hr", {}),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "row",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "col-md-6",
                                    children: [
                                        "Total : ",
                                        grandTotal - discountAmount,
                                        " Tk."
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "col-md-6",
                                    children: [
                                        "Change/Due : ",
                                        grandTotal - paid,
                                        " Tk."
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            className: `btn btn-success mt-3 float-end`,
                            onClick: handleForm,
                            children: "Save"
                        })
                    ]
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
var __webpack_exports__ = __webpack_require__.X(0, [895,531,61,220,734], () => (__webpack_exec__(7094)));
module.exports = __webpack_exports__;

})();