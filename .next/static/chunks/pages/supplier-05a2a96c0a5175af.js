(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[428],{9466:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/supplier",function(){return n(7145)}])},4689:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var r=n(5893),s=n(4849);function a(e){for(var t=e.td,n=e.tr,a=[],i=0;i<n;i++)a.push(i);for(var c=[],o=0;o<t;o++)c.push(o);return a.map((function(e,t){return(0,r.jsx)("tr",{children:c.map((function(e,t){return(0,r.jsx)("td",{children:(0,r.jsx)(s.y,{baseColor:"rgba(249, 58, 11, 0.1)",highlightColor:"#212130",children:(0,r.jsx)("p",{children:(0,r.jsx)(s.Z,{width:"100%",height:30})})})},t)}))},t)}))}},7145:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSP:function(){return v},default:function(){return b}});var r=n(4051),s=n.n(r),a=n(5893),i=n(5688),c=n(9008),o=n(1664),l=n(7294),d=n(9669),u=n.n(d),h=n(4689),p=n(9755),m=n.n(p),f=n(5538);function x(e,t,n,r,s,a,i){try{var c=e[a](i),o=c.value}catch(l){return void n(l)}c.done?t(o):Promise.resolve(o).then(r,s)}function j(e){return function(){var t=this,n=arguments;return new Promise((function(r,s){var a=e.apply(t,n);function i(e){x(a,r,s,i,c,"next",e)}function c(e){x(a,r,s,i,c,"throw",e)}i(void 0)}))}}var v=!0;function b(e){var t=e.user,n={headers:{Authorization:"Bearer ".concat(t.token)}},r=(0,l.useState)(),d=r[0],p=r[1],x=(0,l.useState)([]),v=x[0],b=x[1],g=(0,l.useState)(!0),w=g[0],y=g[1],N=(0,l.useState)(null),k=N[0],C=N[1];(0,l.useEffect)((function(){u().get("".concat("//pos-backend.webxcode.xyz/api","/supplier"),n).then((function(e){!0===e.data.status&&(p(e.data.suppliers.data),b(e.data.suppliers.links),y(!1))})).catch((function(e){console.log(e)}))}),[]);var _=function(){var e=j(s().mark((function e(){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:k&&(clearTimeout(k),C(null)),C(setTimeout((function(){y(!0);var e=m()(".terms").val();u().get("".concat("//pos-backend.webxcode.xyz/api","/supplier?name=").concat(e),n).then((function(e){!0===e.data.status&&(p(e.data.suppliers.data),b(e.data.suppliers.links),y(!1))})).catch((function(e){console.log(e)}))}),2e3));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),S=function(){var e=j(s().mark((function e(t){var r;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return y(!0),e.prev=1,e.next=4,u().get(t,n);case 4:!0===(r=e.sent).data.status&&(p(r.data.suppliers.data),b(r.data.suppliers.links),y(!1)),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}(),A=function(){var e=j(s().mark((function e(t){var r;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return f.Am.loading("Deleting",{position:"bottom-right",theme:"dark"}),e.prev=1,e.next=4,u().post("".concat("//pos-backend.webxcode.xyz/api","/supplier/delete"),{id:t},n);case 4:!0===(r=e.sent).data.status?(f.Am.dismiss(),f.Am.success("Successfully Deleted",{position:"bottom-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,theme:"dark"}),m()(".row-id-".concat(t)).fadeOut()):(f.Am.dismiss(),f.Am.error(r.data.error,{position:"bottom-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,theme:"dark"})),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(1),f.Am.dismiss(),f.Am.error(e.t0.response.data.errors,{position:"bottom-right",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,theme:"dark"});case 12:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}();return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(c.default,{children:(0,a.jsx)("title",{children:"Suppliers"})}),(0,a.jsx)(f.Ix,{}),(0,a.jsx)(i.Z,{user:t,title:"Suppliers",children:(0,a.jsx)("div",{className:"content",children:(0,a.jsxs)("div",{className:"custom-card",children:[(0,a.jsxs)("div",{className:"row",children:[(0,a.jsx)("div",{className:"col-md-9",children:(0,a.jsx)(o.default,{href:"/supplier/create",children:(0,a.jsxs)("a",{className:"btn btn-success",children:[(0,a.jsx)("i",{className:"fa-solid fa-plus"})," Add New Supplier"]})})}),(0,a.jsx)("div",{className:"col-md-3",children:(0,a.jsx)("form",{children:(0,a.jsx)("div",{className:"row",children:(0,a.jsx)("div",{className:"col",children:(0,a.jsx)("input",{type:"text",className:"form-control terms",placeholder:"Search supplier",name:"email",onKeyUp:_,onKeyDown:_,onChange:_})})})})})]}),(0,a.jsxs)("table",{className:"table mt-4",children:[(0,a.jsx)("thead",{children:(0,a.jsxs)("tr",{children:[(0,a.jsx)("th",{width:"5%",children:"Sl"}),(0,a.jsx)("th",{width:"30%",children:"Name"}),(0,a.jsx)("th",{width:"15%",children:"Mobile"}),(0,a.jsx)("th",{width:"20%",children:"Address"}),(0,a.jsx)("th",{width:"20%",children:"Balance"}),(0,a.jsx)("th",{width:"10%",children:"Action"})]})}),(0,a.jsxs)("tbody",{children:[d&&d.length<=0&&(0,a.jsx)("tr",{children:(0,a.jsx)("td",{colSpan:6,className:"text-center",children:"No Supplier Found"})}),d&&!w&&d.map((function(e,t){return(0,a.jsxs)("tr",{valign:"middle",className:"row-id-".concat(e.id),children:[(0,a.jsx)("td",{children:t+1}),(0,a.jsx)("td",{children:e.name}),(0,a.jsx)("td",{children:e.mobile}),(0,a.jsx)("td",{children:e.address}),(0,a.jsxs)("td",{children:[e.balance?e.balance:0," Tk."]}),(0,a.jsxs)("td",{children:[(0,a.jsx)(o.default,{href:"/supplier/".concat(e.id),children:(0,a.jsx)("a",{className:"btn btn-warning btn-sm me-2",children:(0,a.jsx)("i",{className:"fa-solid fa-pen-to-square"})})}),(0,a.jsx)("a",{className:"btn btn-danger btn-sm",onClick:function(t){t.preventDefault(),confirm("Want to delete?")&&A(e.id)},children:(0,a.jsx)("i",{className:"fa-solid fa-trash-can"})})]})]},e.id)}))||(0,a.jsx)(h.Z,{tr:3,td:6})]}),(0,a.jsx)("tfoot",{children:(0,a.jsx)("tr",{children:(0,a.jsx)("td",{colSpan:6,children:(0,a.jsx)("nav",{className:"float-end",children:(0,a.jsx)("ul",{className:"pagination mt-3",children:v.map((function(e){return(0,a.jsx)("li",{className:"page-item ".concat(!0===e.active?"active":""),children:(0,a.jsx)("a",{className:"page-link",onClick:function(){return S(e.url)},dangerouslySetInnerHTML:{__html:e.label}})},e.label)}))})})})})})]})]})})})]})}},4849:function(e,t,n){"use strict";n.d(t,{y:function(){return c},Z:function(){return i}});var r=n(7294);const s=r.createContext({});function a({baseColor:e,highlightColor:t,width:n,height:r,borderRadius:s,circle:a,direction:i,duration:c,enableAnimation:o=true}){const l={};return"rtl"===i&&(l["--animation-direction"]="reverse"),"number"===typeof c&&(l["--animation-duration"]=`${c}s`),o||(l["--pseudo-element-display"]="none"),"string"!==typeof n&&"number"!==typeof n||(l.width=n),"string"!==typeof r&&"number"!==typeof r||(l.height=r),"string"!==typeof s&&"number"!==typeof s||(l.borderRadius=s),a&&(l.borderRadius="50%"),"undefined"!==typeof e&&(l["--base-color"]=e),"undefined"!==typeof t&&(l["--highlight-color"]=t),l}function i({count:e=1,wrapper:t,className:n,containerClassName:i,containerTestId:c,circle:o=!1,style:l,...d}){var u,h,p;const m=r.useContext(s),f={...d};for(const[r,s]of Object.entries(d))"undefined"===typeof s&&delete f[r];const x={...m,...f,circle:o},j={...l,...a(x)};let v="react-loading-skeleton";n&&(v+=` ${n}`);const b=null!==(u=x.inline)&&void 0!==u&&u,g=[],w=Math.ceil(e);for(let s=0;s<w;s++){let t=j;if(w>e&&s===w-1){const n=null!==(h=t.width)&&void 0!==h?h:"100%",r=e%1,s="number"===typeof n?n*r:`calc(${n} * ${r})`;t={...t,width:s}}const n=r.createElement("span",{className:v,style:t,key:s},"\u200c");b?g.push(n):g.push(r.createElement(r.Fragment,{key:s},n,r.createElement("br",null)))}return r.createElement("span",{className:i,"data-testid":c,"aria-live":"polite","aria-busy":null===(p=x.enableAnimation)||void 0===p||p},t?g.map(((e,n)=>r.createElement(t,{key:n},e))):g)}function c({children:e,...t}){return r.createElement(s.Provider,{value:t},e)}}},function(e){e.O(0,[571,619,669,782,688,774,888,179],(function(){return t=9466,e(e.s=t);var t}));var t=e.O();_N_E=t}]);