"use strict";
(() => {
var exports = {};
exports.id = 698;
exports.ids = [698];
exports.modules = {

/***/ 8891:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Unit),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_layout_Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9629);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(968);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var iron_session_next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9531);
/* harmony import */ var _lib_session__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2180);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1664);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _components_TableSkeleton__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4689);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(2947);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(1187);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_10__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([iron_session_next__WEBPACK_IMPORTED_MODULE_3__]);
iron_session_next__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];











function Unit({ user  }) {
    const headers = {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    };
    const { 0: units , 1: setUnits  } = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)();
    const { 0: links , 1: setLinks  } = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)([]);
    const { 0: loading , 1: setLoading  } = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(true);
    const { 0: timer , 1: setTimer  } = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_6__.useEffect)(()=>{
        axios__WEBPACK_IMPORTED_MODULE_7___default().get(`${"http://pos-backend.webxcode.xyz/api"}/unit`, headers).then((res)=>{
            if (res.data.status === true) {
                setUnits(res.data.units.data);
                setLinks(res.data.units.links);
                setLoading(false);
            }
        }).catch((err)=>{
            console.log(err);
        });
    }, []);
    const searchUnits = async ()=>{
        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }
        setTimer(setTimeout(()=>{
            setLoading(true);
            const name = jquery__WEBPACK_IMPORTED_MODULE_9___default()(".terms").val();
            axios__WEBPACK_IMPORTED_MODULE_7___default().get(`${"http://pos-backend.webxcode.xyz/api"}/unit?name=${name}`, headers).then((res)=>{
                if (res.data.status === true) {
                    setUnits(res.data.units.data);
                    setLinks(res.data.units.links);
                    setLoading(false);
                }
            }).catch((err)=>{
                console.log(err);
            });
        }, 2000));
    };
    const paginate = async (url)=>{
        setLoading(true);
        try {
            const res = await axios__WEBPACK_IMPORTED_MODULE_7___default().get(url, headers);
            if (res.data.status === true) {
                setUnits(res.data.units.data);
                setLinks(res.data.units.links);
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
        }
    };
    const deleteHandler = async (id)=>{
        react_toastify__WEBPACK_IMPORTED_MODULE_10__.toast.loading("Deleting", {
            position: "bottom-right",
            theme: "dark"
        });
        try {
            const response = await axios__WEBPACK_IMPORTED_MODULE_7___default().post(`${"http://pos-backend.webxcode.xyz/api"}/unit/delete`, {
                id: id
            }, headers);
            console.log(response.data);
            if (response.data.status === true) {
                react_toastify__WEBPACK_IMPORTED_MODULE_10__.toast.dismiss();
                react_toastify__WEBPACK_IMPORTED_MODULE_10__.toast.success("Successfully Deleted", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark"
                });
                jquery__WEBPACK_IMPORTED_MODULE_9___default()(`.row-id-${id}`).fadeOut();
            } else {
                react_toastify__WEBPACK_IMPORTED_MODULE_10__.toast.dismiss();
                react_toastify__WEBPACK_IMPORTED_MODULE_10__.toast.error(response.data.error, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark"
                });
            }
        } catch (err) {
            react_toastify__WEBPACK_IMPORTED_MODULE_10__.toast.dismiss();
            react_toastify__WEBPACK_IMPORTED_MODULE_10__.toast.error(err.response.data.errors, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark"
            });
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
                    children: "Units"
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_toastify__WEBPACK_IMPORTED_MODULE_10__.ToastContainer, {}),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_layout_Layout__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
                user: user,
                title: `Units`,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "content",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "custom-card",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "row",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "col-md-9",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_5__["default"], {
                                            href: `/unit/create`,
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                className: `btn btn-success`,
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                        className: "fa-solid fa-plus"
                                                    }),
                                                    " Add New Unit"
                                                ]
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "col-md-3",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("form", {
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: "row",
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: "col",
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                        type: "text",
                                                        className: "form-control terms",
                                                        placeholder: `Search unit`,
                                                        name: "email",
                                                        onKeyUp: searchUnits,
                                                        onKeyDown: searchUnits,
                                                        onChange: searchUnits
                                                    })
                                                })
                                            })
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("table", {
                                className: `table mt-4`,
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("thead", {
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                                    width: `10%`,
                                                    children: "Sl"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                                    width: `80%`,
                                                    children: "Name"
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("th", {
                                                    width: `10%`,
                                                    children: "Action"
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tbody", {
                                        children: [
                                            units && units.length <= 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("tr", {
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                    colSpan: 3,
                                                    className: `text-center`,
                                                    children: "No Unit Found"
                                                })
                                            }),
                                            units && !loading && units.map((el, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
                                                    valign: `middle`,
                                                    className: `row-id-${el.id}`,
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                            children: index + 1
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                            children: el.name
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("td", {
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_5__["default"], {
                                                                    href: `/unit/${el.id}`,
                                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                                        className: `btn btn-warning btn-sm me-2`,
                                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                                            className: "fa-solid fa-pen-to-square"
                                                                        })
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                                    className: `btn btn-danger btn-sm`,
                                                                    onClick: (e)=>{
                                                                        e.preventDefault();
                                                                        const result = confirm("Want to delete?");
                                                                        if (result) {
                                                                            deleteHandler(el.id);
                                                                        }
                                                                    },
                                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                                        className: "fa-solid fa-trash-can"
                                                                    })
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }, el.id)
                                            ) || /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_TableSkeleton__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                                                tr: 3,
                                                td: 3
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("tfoot", {
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("tr", {
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("td", {
                                                colSpan: 3,
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("nav", {
                                                    className: `float-end`,
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                                                        className: "pagination mt-3",
                                                        children: links.map((el)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                                                className: `page-item ${el.active === true ? "active" : ""}`,
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                                    className: `page-link`,
                                                                    onClick: ()=>paginate(el.url)
                                                                    ,
                                                                    dangerouslySetInnerHTML: {
                                                                        __html: el.label
                                                                    }
                                                                })
                                                            }, el.label)
                                                        )
                                                    })
                                                })
                                            })
                                        })
                                    })
                                ]
                            })
                        ]
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

/***/ 7784:
/***/ ((module) => {

module.exports = require("react-detect-offline");

/***/ }),

/***/ 9012:
/***/ ((module) => {

module.exports = require("react-loading-skeleton");

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
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [895,531,61,126,689], () => (__webpack_exec__(8891)));
module.exports = __webpack_exports__;

})();