exports.id = 126;
exports.ids = [126];
exports.modules = {

/***/ 9492:
/***/ ((module) => {

// Exports
module.exports = {
	"customImg": "CustomImage_customImg__xW4_c",
	"circle": "CustomImage_circle__xh9GU",
	"unsetImg": "CustomImage_unsetImg__zmucL"
};


/***/ }),

/***/ 3537:
/***/ ((module) => {

// Exports
module.exports = {
	"sidebar": "Sidebar_sidebar___c9st",
	"avatar": "Sidebar_avatar__Zsdwp",
	"userName": "Sidebar_userName__GcLoc",
	"active": "Sidebar_active___WQjj",
	"dropdownIcon": "Sidebar_dropdownIcon__29uPR",
	"subMenu": "Sidebar_subMenu__qi3Rh"
};


/***/ }),

/***/ 4683:
/***/ ((module) => {

// Exports
module.exports = {
	"topBar": "TopBar_topBar__uVF4B",
	"pageTitle": "TopBar_pageTitle__7KGK3",
	"logoBox": "TopBar_logoBox__GxJfu"
};


/***/ }),

/***/ 9629:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ Layout)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./components/layout/TopBar.module.css
var TopBar_module = __webpack_require__(4683);
var TopBar_module_default = /*#__PURE__*/__webpack_require__.n(TopBar_module);
;// CONCATENATED MODULE: ./components/layout/TopBar.js


function TopBar({ title  }) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (TopBar_module_default()).topBar,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: (TopBar_module_default()).logoBox
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                className: (TopBar_module_default()).pageTitle,
                children: title
            })
        ]
    });
};

// EXTERNAL MODULE: ./components/layout/Sidebar.module.css
var Sidebar_module = __webpack_require__(3537);
var Sidebar_module_default = /*#__PURE__*/__webpack_require__.n(Sidebar_module);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
// EXTERNAL MODULE: ./components/CustomImage.module.css
var CustomImage_module = __webpack_require__(9492);
var CustomImage_module_default = /*#__PURE__*/__webpack_require__.n(CustomImage_module);
;// CONCATENATED MODULE: ./components/CustomImage.js



function CustomImage({ src , circle  }) {
    return circle === true ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: (CustomImage_module_default()).unsetImg,
        children: /*#__PURE__*/ jsx_runtime_.jsx(next_image["default"], {
            src: src,
            layout: "fill",
            className: `${(CustomImage_module_default()).customImg} ${(CustomImage_module_default()).circle}`,
            alt: "Logo"
        })
    }) : /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: (CustomImage_module_default()).unsetImg,
        children: /*#__PURE__*/ jsx_runtime_.jsx(next_image["default"], {
            src: src,
            layout: "fill",
            className: (CustomImage_module_default()).customImg,
            alt: "Logo"
        })
    });
};

// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: external "jquery"
var external_jquery_ = __webpack_require__(2947);
var external_jquery_default = /*#__PURE__*/__webpack_require__.n(external_jquery_);
;// CONCATENATED MODULE: ./components/layout/Sidebar.js






function Sidebar({ user  }) {
    const router = (0,router_.useRouter)();
    const showCustomerMenu = (e)=>{
        e.preventDefault();
        external_jquery_default()(".customerMenu").slideToggle();
        external_jquery_default()(".ci").toggleClass("open");
    };
    const showSupplierMenu = (e)=>{
        e.preventDefault();
        external_jquery_default()(".supplierMenu").slideToggle();
        external_jquery_default()(".si").toggleClass("open");
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (Sidebar_module_default()).sidebar,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: (Sidebar_module_default()).avatar,
                children: /*#__PURE__*/ jsx_runtime_.jsx(CustomImage, {
                    src: `/avatar.jpg`,
                    circle: true
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                className: (Sidebar_module_default()).userName,
                children: user.name
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                            href: `/dashboard`,
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                className: `
                                ${router.pathname === "/dashboard" ? (Sidebar_module_default()).active : ""}
                            `,
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                        className: "fa-solid fa-gauge-high"
                                    }),
                                    "Dashboard"
                                ]
                            })
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                            href: `/product`,
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                className: `
                                ${router.pathname === "/product" || router.pathname === "/product/create" || router.pathname === "/product/[id]" ? (Sidebar_module_default()).active : ""}
                            `,
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                        className: "fa-solid fa-bag-shopping"
                                    }),
                                    "Products"
                                ]
                            })
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                            href: `/category`,
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                className: `
                                ${router.pathname === "/category" || router.pathname === "/category/create" || router.pathname === "/category/[id]" ? (Sidebar_module_default()).active : ""}
                            `,
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                        className: "fa-solid fa-book"
                                    }),
                                    "Category"
                                ]
                            })
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                href: `/customer`,
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                    onClick: showCustomerMenu,
                                    className: `
                                ${router.pathname === "/customer" || router.pathname === "/customer/create" || router.pathname === "/customer/[id]" ? (Sidebar_module_default()).active : ""}
                            `,
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                            className: "fa-solid fa-user-group"
                                        }),
                                        "Customer",
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: `fa-solid fa-caret-right float-end ${(Sidebar_module_default()).dropdownIcon} ci`
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                                className: `customerMenu ${(Sidebar_module_default()).subMenu}`,
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                            href: `/customer`,
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                className: `
                                ${router.pathname === "/customer" || router.pathname === "/customer/[id]" ? (Sidebar_module_default()).active : ""}
                            `,
                                                children: "Customer List"
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                            href: `/customer/create`,
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                className: `
                                ${router.pathname === "/customer/create" ? (Sidebar_module_default()).active : ""}
                            `,
                                                children: "Add Customer"
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                            href: `#`,
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                className: `
                                ${router.pathname === "/customer/ledger" ? (Sidebar_module_default()).active : ""}
                            `,
                                                children: "Customer Ledger"
                                            })
                                        })
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                href: `/supplier`,
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                    onClick: showSupplierMenu,
                                    className: `
                                ${router.pathname === "/supplier" || router.pathname === "/supplier/create" || router.pathname === "/supplier/[id]" ? (Sidebar_module_default()).active : ""}
                            `,
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                            className: "fa-solid fa-users"
                                        }),
                                        "Supplier",
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: `fa-solid fa-caret-right float-end ${(Sidebar_module_default()).dropdownIcon} si`
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                                className: `supplierMenu ${(Sidebar_module_default()).subMenu}`,
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                            href: `/supplier`,
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                className: `
                                ${router.pathname === "/supplier" || router.pathname === "/supplier/[id]" ? (Sidebar_module_default()).active : ""}
                            `,
                                                children: "Supplier List"
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                            href: `/supplier/create`,
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                className: `
                                ${router.pathname === "/supplier/create" ? (Sidebar_module_default()).active : ""}
                            `,
                                                children: "Add Supplier"
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                            href: `#`,
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                className: `
                                ${router.pathname === "/supplier/ledger" ? (Sidebar_module_default()).active : ""}
                            `,
                                                children: "Supplier Ledger"
                                            })
                                        })
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                            href: `/unit`,
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                className: `
                                ${router.pathname === "/unit" || router.pathname === "/unit/create" || router.pathname === "/unit/[id]" ? (Sidebar_module_default()).active : ""}
                            `,
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                        className: "fa-solid fa-scale-balanced"
                                    }),
                                    "Unit"
                                ]
                            })
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                            href: `/purchase`,
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                className: `
                                ${router.pathname === "/purchase" || router.pathname === "/purchase/create" || router.pathname === "/purchase/[id]" || router.pathname === "/purchase/view/[id]" ? (Sidebar_module_default()).active : ""}
                            `,
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                        className: "fa-solid fa-cart-plus"
                                    }),
                                    "Purchase"
                                ]
                            })
                        })
                    })
                ]
            })
        ]
    });
};

// EXTERNAL MODULE: external "react-detect-offline"
var external_react_detect_offline_ = __webpack_require__(7784);
;// CONCATENATED MODULE: ./components/layout/Layout.js




function Layout(props) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(TopBar, {
                title: props.title
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(Sidebar, {
                user: props.user
            }),
            props.children,
            /*#__PURE__*/ jsx_runtime_.jsx(external_react_detect_offline_.Offline, {
                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    style: {
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        background: "red",
                        width: "100%",
                        textAlign: "center",
                        color: "#ffffff",
                        fontSize: "20px",
                        zIndex: 999999999999
                    },
                    children: "No Internet Connection"
                })
            })
        ]
    });
};


/***/ }),

/***/ 2180:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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


/***/ })

};
;