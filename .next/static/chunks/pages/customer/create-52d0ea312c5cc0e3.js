(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[88],{4200:function(e,s,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/customer/create",function(){return r(5436)}])},9270:function(e,s,r){"use strict";r.d(s,{Z:function(){return n}});var t=r(5893);function n(){return(0,t.jsx)("div",{className:"loader"})}},5436:function(e,s,r){"use strict";r.r(s),r.d(s,{__N_SSP:function(){return p},default:function(){return v}});var t=r(4051),n=r.n(t),a=r(5893),o=r(5688),i=r(9008),l=r(782),c=r(9669),u=r.n(c),m=r(9755),d=r.n(m),h=r(9270),b=r(7294);function f(e,s,r,t,n,a,o){try{var i=e[a](o),l=i.value}catch(c){return void r(c)}i.done?s(l):Promise.resolve(l).then(t,n)}var p=!0;function v(e){var s=e.user,r=(0,b.useState)(!1),t=r[0],c=r[1],m={headers:{Authorization:"Bearer ".concat(s.token)}},p=function(){var e,s=(e=n().mark((function e(s){var r,t,a,o;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(s.preventDefault(),l.Am.loading("Submitting",{position:"bottom-right",theme:"dark"}),c(!0),r=d()(".name").val(),t=d()(".mobile").val(),a=d()(".address").val(),o=d()(".due").val(),""!==r){e.next=12;break}return l.Am.dismiss(),l.Am.error("Name is required",{position:"bottom-left",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,theme:"dark"}),c(!1),e.abrupt("return");case 12:return e.prev=12,e.next=15,u().post("".concat("//pos-backend.webxcode.xyz/api","/customer/store"),{name:r,mobile:t,address:a,due:o},m);case 15:!0===e.sent.data.status?(l.Am.dismiss(),l.Am.success("Successfully Saved",{position:"bottom-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,theme:"dark"}),d()("form").trigger("reset"),c(!1)):(l.Am.dismiss(),l.Am.success("Something went wrong",{position:"bottom-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,theme:"dark"}),d()("form").trigger("reset"),c(!1)),e.next=24;break;case 19:e.prev=19,e.t0=e.catch(12),l.Am.dismiss(),l.Am.error(e.t0.response.statusText,{position:"bottom-right",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,theme:"dark"}),c(!1);case 24:case"end":return e.stop()}}),e,null,[[12,19]])})),function(){var s=this,r=arguments;return new Promise((function(t,n){var a=e.apply(s,r);function o(e){f(a,t,n,o,i,"next",e)}function i(e){f(a,t,n,o,i,"throw",e)}o(void 0)}))});return function(e){return s.apply(this,arguments)}}();return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(i.default,{children:(0,a.jsx)("title",{children:"Add New Customer"})}),t&&!0===t&&(0,a.jsx)(h.Z,{}),(0,a.jsx)(l.Ix,{}),(0,a.jsx)(o.Z,{user:s,title:"Add New Customer",children:(0,a.jsx)("div",{className:"content",children:(0,a.jsx)("div",{className:"custom-card",children:(0,a.jsxs)("form",{onSubmit:p,children:[(0,a.jsxs)("div",{className:"mb-3",children:[(0,a.jsx)("label",{htmlFor:"name",className:"form-label",children:"Customer Name"}),(0,a.jsx)("input",{type:"text",className:"form-control name",id:"name",required:!0})]}),(0,a.jsxs)("div",{className:"mb-3",children:[(0,a.jsx)("label",{htmlFor:"mobile",className:"form-label",children:"Customer Mobile Number"}),(0,a.jsx)("input",{type:"text",className:"form-control mobile",id:"mobile"})]}),(0,a.jsxs)("div",{className:"mb-3",children:[(0,a.jsx)("label",{htmlFor:"address",className:"form-label",children:"Customer Address"}),(0,a.jsx)("input",{type:"text",className:"form-control address",id:"address"})]}),(0,a.jsxs)("div",{className:"mb-3",children:[(0,a.jsx)("label",{htmlFor:"due",className:"form-label",children:"Previous Due"}),(0,a.jsx)("input",{type:"text",className:"form-control due",id:"due"})]}),(0,a.jsx)("button",{className:"btn btn-success",type:"submit",children:"Save"})]})})})})]})}}},function(e){e.O(0,[571,619,669,782,688,774,888,179],(function(){return s=4200,e(e.s=s);var s}));var s=e.O();_N_E=s}]);