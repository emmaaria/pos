(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[221],{8694:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/purchase/create",function(){return n(8373)}])},8194:function(e,t,n){"use strict";n.d(t,{Z:function(){return p}});var r=n(4051),a=n.n(r),o=n(5893),c=n(9669),s=n.n(c),i=n(9755),u=n.n(i),l=n(7294);function d(e,t,n,r,a,o,c){try{var s=e[o](c),i=s.value}catch(u){return void n(u)}s.done?t(i):Promise.resolve(i).then(r,a)}function p(e){var t=e.type,n=e.token,r=e.placeholder,c={headers:{Authorization:"Bearer ".concat(n)}},i=(0,l.useState)(null),p=i[0],m=i[1],h=(0,l.useState)(),f=h[0],x=h[1],v=function(){var e,n=(e=a().mark((function e(){var n,r;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:u()(".autocompleteItemContainer.supplier").show(),p&&(clearTimeout(p),m(null)),"supplier"===t&&(n=u()(".autocompleteInput").val(),m(setTimeout((function(){s().get("".concat("//pos-backend.webxcode.xyz/api","/supplier?name=").concat(n),c).then((function(e){!0===e.data.status&&x(e.data.suppliers.data)})).catch((function(e){console.log(e)}))}),1e3))),"customer"===t&&(r=u()(".autocompleteInput").val(),m(setTimeout((function(){s().get("".concat("//pos-backend.webxcode.xyz/api","/customer?name=").concat(r),c).then((function(e){!0===e.data.status&&x(e.data.customers.data)})).catch((function(e){console.log(e)}))}),1e3)));case 4:case"end":return e.stop()}}),e)})),function(){var t=this,n=arguments;return new Promise((function(r,a){var o=e.apply(t,n);function c(e){d(o,r,a,c,s,"next",e)}function s(e){d(o,r,a,c,s,"throw",e)}c(void 0)}))});return function(){return n.apply(this,arguments)}}();return(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)("div",{className:"autocompleteWrapper",children:[(0,o.jsx)("input",{type:"text",className:"form-control autocompleteInput supplier-input",autoComplete:"off",onKeyUp:v,onKeyDown:v,onChange:v,placeholder:r||""}),t&&"supplier"===t&&(0,o.jsx)("input",{type:"hidden",className:"supplier-id"}),t&&"customer"===t&&(0,o.jsx)("input",{type:"hidden",className:"customer-id"}),(0,o.jsx)("div",{className:"autocompleteItemContainer supplier",children:f&&f.map((function(e){return(0,o.jsx)("div",{className:"autocompleteItem",onClick:function(){return n=e.name,r=e.id,u()(".supplier-input").val(n),"supplier"===t&&u()(".supplier-id").val(r),"customer"===t&&u()(".customer-id").val(r),void u()(".autocompleteItemContainer.supplier").hide();var n,r},children:e.name},"supplier-".concat(e.id))}))})]})})}},9270:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var r=n(5893);function a(){return(0,r.jsx)("div",{className:"loader"})}},8373:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSP:function(){return g},default:function(){return w}});var r=n(4051),a=n.n(r),o=n(5893),c=n(5688),s=n(9008),i=n(5538),u=n(9669),l=n.n(u),d=n(9755),p=n.n(d),m=n(7294),h=n(9198),f=n.n(h),x=n(8194),v=n(9270);function j(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function b(e,t,n,r,a,o,c){try{var s=e[o](c),i=s.value}catch(u){return void n(u)}s.done?t(i):Promise.resolve(i).then(r,a)}function y(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var o=e.apply(t,n);function c(e){b(o,r,a,c,s,"next",e)}function s(e){b(o,r,a,c,s,"throw",e)}c(void 0)}))}}function N(e){return function(e){if(Array.isArray(e))return j(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"===typeof e)return j(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return j(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var g=!0;function w(e){var t=e.user,n=(0,m.useState)(!1),r=n[0],u=n[1],d=(0,m.useState)(0),h=d[0],j=d[1],b=(0,m.useState)(0),g=b[0],w=b[1],k=(0,m.useState)(),C=k[0],S=k[1],P=(0,m.useState)(null),A=P[0],_=P[1],I=(0,m.useState)(new Date),O=I[0],F=I[1],T=(0,m.useState)([]),K=T[0],D=T[1],B={headers:{Authorization:"Bearer ".concat(t.token)}},z=function(){var e=y(a().mark((function e(t){var n,r,o,c,s,d,m,f;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),i.Am.loading("Submitting",{position:"bottom-right",theme:"dark"}),u(!0),n=p()(".productId").map((function(e,t){return p()(t).val()})).get(),r=p()(".productQuantity").map((function(e,t){return p()(t).val()})).get(),o=p()(".productPrice").map((function(e,t){return p()(t).val()})).get(),c=p()(".note").val(),s=p()(".date").val(),d=p()(".paid").val(),""!==(m=p()(".supplier-id").val())){e.next=15;break}return u(!1),i.Am.dismiss(),i.Am.error("Please select supplier",{position:"bottom-right",autoClose:!1,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,theme:"dark"}),e.abrupt("return");case 15:if(!(n.length<=0)){e.next=20;break}return u(!1),i.Am.dismiss(),i.Am.error("No product added",{position:"bottom-right",autoClose:!1,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,theme:"dark"}),e.abrupt("return");case 20:return e.prev=20,e.next=23,l().post("".concat("//pos-backend.webxcode.xyz/api","/purchase/store"),{supplier_id:m,productIds:n,productQuantities:r,productPrices:o,date:s,comment:c,paid:d,total:h},B);case 23:!0===(f=e.sent).data.status?(i.Am.dismiss(),i.Am.success("Successfully Saved",{position:"bottom-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,theme:"dark"}),p()("form").trigger("reset"),w(0),D([]),j(0),u(!1)):(i.Am.dismiss(),i.Am.success(f.data.error,{position:"bottom-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,theme:"dark"}),u(!1)),e.next=32;break;case 27:e.prev=27,e.t0=e.catch(20),i.Am.dismiss(),i.Am.error(e.t0.response.data,{position:"bottom-right",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,theme:"dark"}),u(!1);case 32:case"end":return e.stop()}}),e,null,[[20,27]])})));return function(t){return e.apply(this,arguments)}}(),E=function(e){var t=parseFloat(p()(".productPrice_".concat(e)).val())*parseFloat(p()(".productQuantity_".concat(e)).val());p()(".subtotal_".concat(e)).text("".concat(t)),Q()},Q=function(){j(0),p()(".subtotal").each((function(){var e=this;j((function(t){return t+parseFloat(p()(e).text())}))}))},U=function(){var e=p()(".paid").val();w(parseFloat(e))},H=function(){var e=y(a().mark((function e(){var t;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:p()(".autocompleteItemContainer.product").show(),A&&(clearTimeout(A),_(null)),t=p()(".search-product").val(),_(setTimeout((function(){l().get("".concat("//pos-backend.webxcode.xyz/api","/product?name=").concat(t),B).then((function(e){!0===e.data.status&&S(e.data.products.data)})).catch((function(e){console.log(e)}))}),500));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(s.default,{children:(0,o.jsx)("title",{children:"Add New Purchase"})}),r&&!0===r&&(0,o.jsx)(v.Z,{}),(0,o.jsx)(i.Ix,{}),(0,o.jsx)(c.Z,{user:t,title:"Add New Purchase",children:(0,o.jsx)("div",{className:"content",children:(0,o.jsx)("div",{className:"custom-card",children:(0,o.jsxs)("form",{onSubmit:z,children:[(0,o.jsx)("div",{className:"mb-3",children:(0,o.jsxs)("div",{className:"row",children:[(0,o.jsxs)("div",{className:"col-md-6",children:[(0,o.jsx)("label",{htmlFor:"supplier",className:"form-label",children:"Supplier"}),(0,o.jsx)(x.Z,{type:"supplier",token:t.token})]}),(0,o.jsxs)("div",{className:"col-md-6",children:[(0,o.jsx)("label",{htmlFor:"date",className:"form-label",children:"Date"}),(0,o.jsx)(f(),{selected:O,onChange:function(e){return F(e)},dateFormat:"yyyy-MM-dd",className:"form-control date"})]})]})}),(0,o.jsxs)("div",{className:"mb-3",children:[(0,o.jsx)("label",{htmlFor:"product",className:"form-label",children:"Choose Product"}),(0,o.jsxs)("div",{className:"autocompleteWrapper product",children:[(0,o.jsx)("input",{type:"text",className:"form-control autocompleteInput search-product",autoComplete:"off",onKeyUp:H,onKeyDown:H,onChange:H,placeholder:"Search product"}),(0,o.jsx)("div",{className:"autocompleteItemContainer product",children:C&&C.map((function(e){return(0,o.jsx)("div",{className:"autocompleteItem",onClick:function(){return t=e,K.filter((function(e){return e.id===t.id})).length>0?alert("Product already added"):(D((function(e){return N(e).concat([t])})),j((function(e){return e+parseFloat(t.price)}))),p()(".autocompleteItemContainer.product").hide(),void p()(".search-product").val("");var t},children:e.name},"search-product-item-".concat(e.id))}))})]})]}),(0,o.jsxs)("table",{className:"table table-bordered table-hover",children:[(0,o.jsx)("thead",{children:(0,o.jsxs)("tr",{children:[(0,o.jsx)("th",{width:"5%",children:"SL"}),(0,o.jsx)("th",{width:"40%",children:"Product Name"}),(0,o.jsx)("th",{width:"15%",children:"Purchase Price"}),(0,o.jsx)("th",{width:"15%",children:"Quantity"}),(0,o.jsx)("th",{className:"text-end",width:"20%",children:"Subtotal"}),(0,o.jsx)("th",{className:"text-center",width:"5%",children:"Action"})]})}),(0,o.jsx)("tbody",{children:K.map((function(e,t){return(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{children:t+1}),(0,o.jsxs)("td",{children:[e.name,(0,o.jsx)("input",{type:"hidden",className:"productId",defaultValue:e.id})]}),(0,o.jsx)("td",{children:(0,o.jsx)("input",{type:"text",className:"form-control productPrice productPrice_".concat(e.id),defaultValue:e.price,onChange:function(){return E(e.id)},onKeyUp:function(){return E(e.id)},onKeyDown:function(){return E(e.id)}})}),(0,o.jsx)("td",{children:(0,o.jsx)("input",{type:"text",className:"form-control productQuantity productQuantity_".concat(e.id),defaultValue:1,onChange:function(){return E(e.id)},onKeyUp:function(){return E(e.id)},onKeyDown:function(){return E(e.id)}})}),(0,o.jsxs)("td",{className:"text-end",children:[(0,o.jsx)("span",{className:"subtotal subtotal_".concat(e.id),children:e.price})," Tk."]}),(0,o.jsx)("td",{className:"text-center",children:(0,o.jsx)("button",{className:"btn btn-danger btn-sm",onClick:function(){return function(e){var t=K.filter((function(t){return t.id!==e}));D(t),j(0),t.map((function(e){j((function(t){return t+parseFloat(p()(".subtotal_".concat(e.id)).text())}))}))}(e.id)},children:(0,o.jsx)("i",{className:"fa-solid fa-trash-can"})})})]},"purchase-product-item-".concat(e.id))}))}),(0,o.jsxs)("tfoot",{children:[(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{className:"text-end",colSpan:4,children:(0,o.jsx)("strong",{children:"Total"})}),(0,o.jsx)("td",{className:"text-end border-1 border-white d-block",children:(0,o.jsxs)("span",{className:"total",children:[h," Tk."]})}),(0,o.jsx)("td",{})]}),(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{className:"text-end",colSpan:4,children:(0,o.jsx)("strong",{children:"Paid"})}),(0,o.jsx)("td",{className:"px-0",children:(0,o.jsx)("input",{type:"text",className:"form-control paid",onKeyUp:U,onKeyDown:U,onChange:U})})]}),(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{className:"text-end",colSpan:4,children:(0,o.jsx)("strong",{children:"Due"})}),(0,o.jsxs)("td",{className:"text-end border-1 border-white d-block",children:[(0,o.jsx)("span",{className:"due",children:h-g})," Tk."]})]})]})]}),(0,o.jsxs)("div",{className:"mb-3 mt-3",children:[(0,o.jsx)("label",{htmlFor:"note",className:"form-label",children:"Note"}),(0,o.jsx)("textarea",{id:"note",rows:"3",className:"note form-control"})]}),(0,o.jsx)("button",{className:"btn btn-success",type:"submit",children:"Save"})]})})})})]})}}},function(e){e.O(0,[571,619,669,782,198,688,774,888,179],(function(){return t=8694,e(e.s=t);var t}));var t=e.O();_N_E=t}]);