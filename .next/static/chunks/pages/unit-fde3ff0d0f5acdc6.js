(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[698],{3629:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/unit",function(){return n(8891)}])},4689:function(e,t,n){"use strict";n.d(t,{Z:function(){return s}});var r=n(5893),a=n(4849);function s(e){for(var t=e.td,n=e.tr,s=[],i=0;i<n;i++)s.push(i);for(var c=[],o=0;o<t;o++)c.push(o);return s.map((function(e,t){return(0,r.jsx)("tr",{children:c.map((function(e,t){return(0,r.jsx)("td",{children:(0,r.jsx)(a.y,{baseColor:"rgba(249, 58, 11, 0.1)",highlightColor:"#212130",children:(0,r.jsx)("p",{children:(0,r.jsx)(a.Z,{width:"100%",height:30})})})},t)}))},t)}))}},8891:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSP:function(){return j},default:function(){return b}});var r=n(4051),a=n.n(r),s=n(5893),i=n(5688),c=n(9008),o=n(1664),l=n(7294),d=n(9669),u=n.n(d),h=n(4689),f=n(9755),m=n.n(f),p=n(782);function x(e,t,n,r,a,s,i){try{var c=e[s](i),o=c.value}catch(l){return void n(l)}c.done?t(o):Promise.resolve(o).then(r,a)}function v(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var s=e.apply(t,n);function i(e){x(s,r,a,i,c,"next",e)}function c(e){x(s,r,a,i,c,"throw",e)}i(void 0)}))}}var j=!0;function b(e){var t=e.user,n={headers:{Authorization:"Bearer ".concat(t.token)}},r=(0,l.useState)(),d=r[0],f=r[1],x=(0,l.useState)([]),j=x[0],b=x[1],g=(0,l.useState)(!0),y=g[0],N=g[1],w=(0,l.useState)(null),k=w[0],C=w[1];(0,l.useEffect)((function(){u().get("".concat("//pos-backend.webxcode.xyz/api","/unit"),n).then((function(e){!0===e.data.status&&(f(e.data.units.data),b(e.data.units.links),N(!1))})).catch((function(e){console.log(e)}))}),[]);var _=function(){var e=v(a().mark((function e(){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:k&&(clearTimeout(k),C(null)),C(setTimeout((function(){N(!0);var e=m()(".terms").val();u().get("".concat("//pos-backend.webxcode.xyz/api","/unit?name=").concat(e),n).then((function(e){!0===e.data.status&&(f(e.data.units.data),b(e.data.units.links),N(!1))})).catch((function(e){console.log(e)}))}),2e3));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),A=function(){var e=v(a().mark((function e(t){var r;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return N(!0),e.prev=1,e.next=4,u().get(t,n);case 4:!0===(r=e.sent).data.status&&(f(r.data.units.data),b(r.data.units.links),N(!1)),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}(),E=function(){var e=v(a().mark((function e(t){var r;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return p.Am.loading("Deleting",{position:"bottom-right",theme:"dark"}),e.prev=1,e.next=4,u().post("".concat("//pos-backend.webxcode.xyz/api","/unit/delete"),{id:t},n);case 4:r=e.sent,console.log(r.data),!0===r.data.status?(p.Am.dismiss(),p.Am.success("Successfully Deleted",{position:"bottom-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,theme:"dark"}),m()(".row-id-".concat(t)).fadeOut()):(p.Am.dismiss(),p.Am.error(r.data.error,{position:"bottom-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,theme:"dark"})),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(1),p.Am.dismiss(),p.Am.error(e.t0.response.data.errors,{position:"bottom-right",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,theme:"dark"});case 13:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}();return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(c.default,{children:(0,s.jsx)("title",{children:"Units"})}),(0,s.jsx)(p.Ix,{}),(0,s.jsx)(i.Z,{user:t,title:"Units",children:(0,s.jsx)("div",{className:"content",children:(0,s.jsxs)("div",{className:"custom-card",children:[(0,s.jsxs)("div",{className:"row",children:[(0,s.jsx)("div",{className:"col-md-9",children:(0,s.jsx)(o.default,{href:"/unit/create",children:(0,s.jsxs)("a",{className:"btn btn-success",children:[(0,s.jsx)("i",{className:"fa-solid fa-plus"})," Add New Unit"]})})}),(0,s.jsx)("div",{className:"col-md-3",children:(0,s.jsx)("form",{children:(0,s.jsx)("div",{className:"row",children:(0,s.jsx)("div",{className:"col",children:(0,s.jsx)("input",{type:"text",className:"form-control terms",placeholder:"Search unit",name:"email",onKeyUp:_,onKeyDown:_,onChange:_})})})})})]}),(0,s.jsxs)("table",{className:"table mt-4",children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{width:"10%",children:"Sl"}),(0,s.jsx)("th",{width:"80%",children:"Name"}),(0,s.jsx)("th",{width:"10%",children:"Action"})]})}),(0,s.jsxs)("tbody",{children:[d&&d.length<=0&&(0,s.jsx)("tr",{children:(0,s.jsx)("td",{colSpan:3,className:"text-center",children:"No Unit Found"})}),d&&!y&&d.map((function(e,t){return(0,s.jsxs)("tr",{valign:"middle",className:"row-id-".concat(e.id),children:[(0,s.jsx)("td",{children:t+1}),(0,s.jsx)("td",{children:e.name}),(0,s.jsxs)("td",{children:[(0,s.jsx)(o.default,{href:"/unit/".concat(e.id),children:(0,s.jsx)("a",{className:"btn btn-warning btn-sm me-2",children:(0,s.jsx)("i",{className:"fa-solid fa-pen-to-square"})})}),(0,s.jsx)("a",{className:"btn btn-danger btn-sm",onClick:function(t){t.preventDefault(),confirm("Want to delete?")&&E(e.id)},children:(0,s.jsx)("i",{className:"fa-solid fa-trash-can"})})]})]},e.id)}))||(0,s.jsx)(h.Z,{tr:3,td:3})]}),(0,s.jsx)("tfoot",{children:(0,s.jsx)("tr",{children:(0,s.jsx)("td",{colSpan:3,children:(0,s.jsx)("nav",{className:"float-end",children:(0,s.jsx)("ul",{className:"pagination mt-3",children:j.map((function(e){return(0,s.jsx)("li",{className:"page-item ".concat(!0===e.active?"active":""),children:(0,s.jsx)("a",{className:"page-link",onClick:function(){return A(e.url)},dangerouslySetInnerHTML:{__html:e.label}})},e.label)}))})})})})})]})]})})})]})}},4849:function(e,t,n){"use strict";n.d(t,{y:function(){return c},Z:function(){return i}});var r=n(7294);const a=r.createContext({});function s({baseColor:e,highlightColor:t,width:n,height:r,borderRadius:a,circle:s,direction:i,duration:c,enableAnimation:o=true}){const l={};return"rtl"===i&&(l["--animation-direction"]="reverse"),"number"===typeof c&&(l["--animation-duration"]=`${c}s`),o||(l["--pseudo-element-display"]="none"),"string"!==typeof n&&"number"!==typeof n||(l.width=n),"string"!==typeof r&&"number"!==typeof r||(l.height=r),"string"!==typeof a&&"number"!==typeof a||(l.borderRadius=a),s&&(l.borderRadius="50%"),"undefined"!==typeof e&&(l["--base-color"]=e),"undefined"!==typeof t&&(l["--highlight-color"]=t),l}function i({count:e=1,wrapper:t,className:n,containerClassName:i,containerTestId:c,circle:o=!1,style:l,...d}){var u,h,f;const m=r.useContext(a),p={...d};for(const[r,a]of Object.entries(d))"undefined"===typeof a&&delete p[r];const x={...m,...p,circle:o},v={...l,...s(x)};let j="react-loading-skeleton";n&&(j+=` ${n}`);const b=null!==(u=x.inline)&&void 0!==u&&u,g=[],y=Math.ceil(e);for(let a=0;a<y;a++){let t=v;if(y>e&&a===y-1){const n=null!==(h=t.width)&&void 0!==h?h:"100%",r=e%1,a="number"===typeof n?n*r:`calc(${n} * ${r})`;t={...t,width:a}}const n=r.createElement("span",{className:j,style:t,key:a},"\u200c");b?g.push(n):g.push(r.createElement(r.Fragment,{key:a},n,r.createElement("br",null)))}return r.createElement("span",{className:i,"data-testid":c,"aria-live":"polite","aria-busy":null===(f=x.enableAnimation)||void 0===f||f},t?g.map(((e,n)=>r.createElement(t,{key:n},e))):g)}function c({children:e,...t}){return r.createElement(a.Provider,{value:t},e)}}},function(e){e.O(0,[571,619,669,782,688,774,888,179],(function(){return t=3629,e(e.s=t);var t}));var t=e.O();_N_E=t}]);