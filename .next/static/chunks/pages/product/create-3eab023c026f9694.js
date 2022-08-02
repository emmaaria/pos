(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[533],{4072:function(e,r,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/product/create",function(){return t(257)}])},9270:function(e,r,t){"use strict";t.d(r,{Z:function(){return a}});var s=t(5893);function a(){return(0,s.jsx)("div",{className:"loader"})}},257:function(e,r,t){"use strict";t.r(r),t.d(r,{__N_SSP:function(){return v},default:function(){return b}});var s=t(4051),a=t.n(s),n=t(5893),c=t(5688),o=t(9008),i=t(782),l=t(9669),u=t.n(l),d=t(9755),m=t.n(d),h=t(7294),p=t(9270);function x(e,r,t,s,a,n,c){try{var o=e[n](c),i=o.value}catch(l){return void t(l)}o.done?r(i):Promise.resolve(i).then(s,a)}function f(e){return function(){var r=this,t=arguments;return new Promise((function(s,a){var n=e.apply(r,t);function c(e){x(n,s,a,c,o,"next",e)}function o(e){x(n,s,a,c,o,"throw",e)}c(void 0)}))}}var v=!0;function b(e){var r=e.user,t=(0,h.useState)(!1),s=t[0],l=t[1],d=(0,h.useState)(),x=d[0],v=d[1],b=(0,h.useState)(),g=b[0],j=b[1],N={headers:{Authorization:"Bearer ".concat(r.token)}};(0,h.useEffect)((function(){function e(){return(e=f(a().mark((function e(){var r,t;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u().get("".concat("//pos-backend.webxcode.xyz/api","/category?allData=true"),N);case 3:!0===(r=e.sent).data.status&&v(r.data.categories),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:return e.prev=10,e.next=13,u().get("".concat("//pos-backend.webxcode.xyz/api","/unit?allData=true"),N);case 13:!0===(t=e.sent).data.status&&j(t.data.units),e.next=20;break;case 17:e.prev=17,e.t1=e.catch(10),console.log(e.t1);case 20:case"end":return e.stop()}}),e,null,[[0,7],[10,17]])})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[v,j]);var k=function(){var e=f(a().mark((function e(r){var t,s,n,c,o;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r.preventDefault(),i.Am.loading("Submitting",{position:"bottom-right",theme:"dark"}),l(!0),t=m()(".name").val(),s=m()(".category").val(),n=m()(".unit").val(),c=m()(".price").val(),o=m()(".purchasePrice").val(),""!==t){e.next=13;break}return i.Am.dismiss(),i.Am.error("Name is required",{position:"bottom-left",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,theme:"dark"}),l(!1),e.abrupt("return");case 13:return e.prev=13,e.next=16,u().post("".concat("//pos-backend.webxcode.xyz/api","/product/store"),{name:t,category:s,unit:n,price:c,purchase_price:o},N);case 16:!0===e.sent.data.status?(i.Am.dismiss(),i.Am.success("Successfully Saved",{position:"bottom-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,theme:"dark"}),m()("form").trigger("reset"),l(!1)):(i.Am.dismiss(),i.Am.success("Something went wrong",{position:"bottom-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,theme:"dark"}),l(!1)),e.next=25;break;case 20:e.prev=20,e.t0=e.catch(13),i.Am.dismiss(),i.Am.error(e.t0.response.statusText,{position:"bottom-right",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,theme:"dark"}),l(!1);case 25:case"end":return e.stop()}}),e,null,[[13,20]])})));return function(r){return e.apply(this,arguments)}}();return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(o.default,{children:(0,n.jsx)("title",{children:"Add New Product"})}),s&&!0===s&&(0,n.jsx)(p.Z,{}),(0,n.jsx)(i.Ix,{}),(0,n.jsx)(c.Z,{user:r,title:"Add New Product",children:(0,n.jsx)("div",{className:"content",children:(0,n.jsx)("div",{className:"custom-card",children:(0,n.jsxs)("form",{onSubmit:k,children:[(0,n.jsxs)("div",{className:"mb-3 row",children:[(0,n.jsxs)("div",{className:"col-md-6",children:[(0,n.jsx)("label",{htmlFor:"name",className:"form-label",children:"Product Name"}),(0,n.jsx)("input",{type:"text",className:"form-control name",id:"name",required:!0})]}),(0,n.jsxs)("div",{className:"col-md-6",children:[(0,n.jsx)("label",{htmlFor:"category",className:"form-label",children:"Category"}),(0,n.jsxs)("select",{className:"form-control category",children:[(0,n.jsx)("option",{value:"",children:"Choose Category"}),x&&x.map((function(e){return(0,n.jsx)("option",{value:e.id,children:e.name},e.id)}))]})]})]}),(0,n.jsxs)("div",{className:"mb-3 row",children:[(0,n.jsxs)("div",{className:"col-md-6",children:[(0,n.jsx)("label",{htmlFor:"unit",className:"form-label",children:"Unit"}),(0,n.jsxs)("select",{className:"form-control unit",required:!0,children:[(0,n.jsx)("option",{value:"",children:"Choose Unit"}),g&&g.map((function(e){return(0,n.jsx)("option",{value:e.id,children:e.name},e.id)}))]})]}),(0,n.jsxs)("div",{className:"col-md-6",children:[(0,n.jsx)("label",{htmlFor:"price",className:"form-label",children:"Selling Price"}),(0,n.jsx)("input",{type:"text",className:"form-control price",id:"price",required:!0})]})]}),(0,n.jsx)("div",{className:"row mb-3",children:(0,n.jsxs)("div",{className:"col-md-6",children:[(0,n.jsx)("label",{htmlFor:"purchasePrice",className:"form-label",children:"Purchase Price"}),(0,n.jsx)("input",{type:"text",className:"form-control purchasePrice",id:"purchasePrice",required:!0})]})}),(0,n.jsx)("button",{className:"btn btn-success",type:"submit",children:"Save"})]})})})})]})}}},function(e){e.O(0,[571,619,669,782,688,774,888,179],(function(){return r=4072,e(e.s=r);var r}));var r=e.O();_N_E=r}]);