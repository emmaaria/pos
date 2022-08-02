exports.id = 220;
exports.ids = [220];
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

/***/ 1144:
/***/ ((module) => {

// Exports
module.exports = {
	"sidebar": "PosSidebar_sidebar__q7yMo",
	"avatar": "PosSidebar_avatar__YLsbP",
	"active": "PosSidebar_active__uBb3d",
	"dropdownIcon": "PosSidebar_dropdownIcon__Qy_lK",
	"subMenu": "PosSidebar_subMenu__jnTvl"
};


/***/ }),

/***/ 4946:
/***/ ((module) => {

// Exports
module.exports = {
	"topBar": "PosTopBar_topBar__T4LNX",
	"pageTitle": "PosTopBar_pageTitle__ddRsJ",
	"logoBox": "PosTopBar_logoBox__E3uX9"
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

/***/ 5688:
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
    const showSaleMenu = (e)=>{
        e.preventDefault();
        external_jquery_default()(".saleMenu").slideToggle();
        external_jquery_default()(".sales").toggleClass("open");
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
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                href: `/supplier`,
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                    onClick: showSaleMenu,
                                    className: `
                                ${router.pathname === "/sale" || router.pathname === "/sale/create" || router.pathname === "/sale/[id]" ? (Sidebar_module_default()).active : ""}
                            `,
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                            className: "fa-solid fa-shopping-cart"
                                        }),
                                        "Sales",
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: `fa-solid fa-caret-right float-end ${(Sidebar_module_default()).dropdownIcon} sale`
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                                className: `saleMenu ${(Sidebar_module_default()).subMenu}`,
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                            href: `/sale`,
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                className: `
                                ${router.pathname === "/sale" || router.pathname === "/sale/[id]" ? (Sidebar_module_default()).active : ""}
                            `,
                                                children: "Sale List"
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                            href: `/sale/create`,
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                className: `
                                ${router.pathname === "/sale/create" ? (Sidebar_module_default()).active : ""}
                            `,
                                                children: "POS"
                                            })
                                        })
                                    })
                                ]
                            })
                        ]
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

// EXTERNAL MODULE: ./components/layout/PosSidebar.module.css
var PosSidebar_module = __webpack_require__(1144);
var PosSidebar_module_default = /*#__PURE__*/__webpack_require__.n(PosSidebar_module);
;// CONCATENATED MODULE: ./components/layout/PosSidebar.js





function PosSidebar() {
    const router = (0,router_.useRouter)();
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (PosSidebar_module_default()).sidebar,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: (PosSidebar_module_default()).avatar,
                children: /*#__PURE__*/ jsx_runtime_.jsx(CustomImage, {
                    src: `/avatar.jpg`,
                    circle: true
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                            href: `/dashboard`,
                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                className: `
                                ${router.pathname === "/dashboard" ? (PosSidebar_module_default()).active : ""}
                            `,
                                children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                    className: "fa-solid fa-gauge-high"
                                })
                            })
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                href: `/supplier`,
                                children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                    className: `
                                ${router.pathname === "/sale" || router.pathname === "/sale/create" || router.pathname === "/sale/[id]" ? (PosSidebar_module_default()).active : ""}
                            `,
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                        className: "fa-solid fa-shopping-cart"
                                    })
                                })
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                                className: `saleMenu ${(PosSidebar_module_default()).subMenu}`,
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                            href: `/sale`,
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                className: `
                                ${router.pathname === "/sale" || router.pathname === "/sale/[id]" ? (PosSidebar_module_default()).active : ""}
                            `,
                                                children: "Sale List"
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                            href: `/sale/create`,
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                className: `
                                ${router.pathname === "/sale/create" ? (PosSidebar_module_default()).active : ""}
                            `,
                                                children: "Add New Sale"
                                            })
                                        })
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                            href: `/product`,
                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                className: `
                                ${router.pathname === "/product" || router.pathname === "/product/create" || router.pathname === "/product/[id]" ? (PosSidebar_module_default()).active : ""}
                            `,
                                children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                    className: "fa-solid fa-bag-shopping"
                                })
                            })
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                            href: `/category`,
                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                className: `
                                ${router.pathname === "/category" || router.pathname === "/category/create" || router.pathname === "/category/[id]" ? (PosSidebar_module_default()).active : ""}
                            `,
                                children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                    className: "fa-solid fa-book"
                                })
                            })
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                href: `/customer`,
                                children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                    className: `
                                ${router.pathname === "/customer" || router.pathname === "/customer/create" || router.pathname === "/customer/[id]" ? (PosSidebar_module_default()).active : ""}
                            `,
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                        className: "fa-solid fa-user-group"
                                    })
                                })
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                                className: `customerMenu ${(PosSidebar_module_default()).subMenu}`,
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                            href: `/customer`,
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                className: `
                                ${router.pathname === "/customer" || router.pathname === "/customer/[id]" ? (PosSidebar_module_default()).active : ""}
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
                                ${router.pathname === "/customer/create" ? (PosSidebar_module_default()).active : ""}
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
                                ${router.pathname === "/customer/ledger" ? (PosSidebar_module_default()).active : ""}
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
                                children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                    className: `
                                ${router.pathname === "/supplier" || router.pathname === "/supplier/create" || router.pathname === "/supplier/[id]" ? (PosSidebar_module_default()).active : ""}
                            `,
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                        className: "fa-solid fa-users"
                                    })
                                })
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                                className: `supplierMenu ${(PosSidebar_module_default()).subMenu}`,
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                            href: `/supplier`,
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                className: `
                                ${router.pathname === "/supplier" || router.pathname === "/supplier/[id]" ? (PosSidebar_module_default()).active : ""}
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
                                ${router.pathname === "/supplier/create" ? (PosSidebar_module_default()).active : ""}
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
                                ${router.pathname === "/supplier/ledger" ? (PosSidebar_module_default()).active : ""}
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
                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                className: `
                                ${router.pathname === "/unit" || router.pathname === "/unit/create" || router.pathname === "/unit/[id]" ? (PosSidebar_module_default()).active : ""}
                            `,
                                children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                    className: "fa-solid fa-scale-balanced"
                                })
                            })
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                            href: `/purchase`,
                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                className: `
                                ${router.pathname === "/purchase" || router.pathname === "/purchase/create" || router.pathname === "/purchase/[id]" || router.pathname === "/purchase/view/[id]" ? (PosSidebar_module_default()).active : ""}
                            `,
                                children: /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                    className: "fa-solid fa-cart-plus"
                                })
                            })
                        })
                    })
                ]
            })
        ]
    });
};

// EXTERNAL MODULE: ./components/layout/PosTopBar.module.css
var PosTopBar_module = __webpack_require__(4946);
var PosTopBar_module_default = /*#__PURE__*/__webpack_require__.n(PosTopBar_module);
;// CONCATENATED MODULE: ./components/layout/PosTopBar.js


function PosTopBar({ title  }) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (PosTopBar_module_default()).topBar,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: (PosTopBar_module_default()).logoBox
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                className: (PosTopBar_module_default()).pageTitle,
                children: title
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
            props.sidebar && props.sidebar === "pos" && /*#__PURE__*/ jsx_runtime_.jsx(PosTopBar, {
                title: props.title
            }) || /*#__PURE__*/ jsx_runtime_.jsx(TopBar, {
                title: props.title
            }),
            props.sidebar && props.sidebar === "pos" && /*#__PURE__*/ jsx_runtime_.jsx(PosSidebar, {
                user: props.user
            }) || /*#__PURE__*/ jsx_runtime_.jsx(Sidebar, {
                user: props.user
            }),
            props.children,
            /*#__PURE__*/ jsx_runtime_.jsx(external_react_detect_offline_.Offline, {
                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    style: {
                        position: "fixed",
                        top: 0,
                        left: 0,
                        background: "rgba(0,0,0,0.9)",
                        width: "100%",
                        textAlign: "center",
                        color: "#ffffff",
                        fontSize: "20px",
                        zIndex: 999999999999,
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        height: "100%"
                    },
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        style: {
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%,-50%)"
                        },
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "img",
                                style: {
                                    marginBottom: "10px"
                                },
                                children: /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                                    width: "50px",
                                    height: "50px",
                                    viewBox: "0 0 24 24",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                        fill: "#ffffff",
                                        d: "M6.92,5.51h0L3.71,2.29A1,1,0,0,0,2.29,3.71L4.56,6A15.21,15.21,0,0,0,1.4,8.39a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.3,1,1,0,0,0,.7-.29A13.07,13.07,0,0,1,6.05,7.46L7.54,9a10.78,10.78,0,0,0-3.32,2.27,1,1,0,1,0,1.42,1.4,8.8,8.8,0,0,1,3.45-2.12l1.62,1.61a7.07,7.07,0,0,0-3.66,1.94,1,1,0,1,0,1.42,1.4A5,5,0,0,1,12,14a4.13,4.13,0,0,1,.63.05l7.66,7.66a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42ZM12,16a3,3,0,1,0,3,3A3,3,0,0,0,12,16Zm0,4a1,1,0,1,1,1-1A1,1,0,0,1,12,20ZM22.61,8.39A15,15,0,0,0,10.29,4.1a1,1,0,1,0,.22,2A13.07,13.07,0,0,1,21.2,9.81a1,1,0,0,0,1.41-1.42Zm-4.25,4.24a1,1,0,0,0,1.42-1.4,10.75,10.75,0,0,0-4.84-2.82,1,1,0,1,0-.52,1.92A8.94,8.94,0,0,1,18.36,12.63Z"
                                    })
                                })
                            }),
                            "No internet connection!"
                        ]
                    })
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
        secure: false
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (session);


/***/ })

};
;