(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[423],{623:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/unit/[id]",function(){return n(9506)}])},9270:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var r=n(5893);function i(){return(0,r.jsx)("div",{className:"loader"})}},9506:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSP:function(){return v},default:function(){return g}});var r=n(4051),i=n.n(r),a=n(5893),o=n(5688),s=n(9008),c=n(5538),u=n(9669),l=n.n(u),d=n(9755),m=n.n(d),h=n(7294),f=n(4849),p=n(9270);function b(e,t,n,r,i,a,o){try{var s=e[a](o),c=s.value}catch(u){return void n(u)}s.done?t(c):Promise.resolve(c).then(r,i)}var v=!0;function g(e){var t=e.user,n=e.id,r=(0,h.useState)(!1),u=r[0],d=r[1],v=(0,h.useState)(),g=v[0],x=v[1],y=(0,h.useState)(!0),k=y[0],N=y[1],w={headers:{Authorization:"Bearer ".concat(t.token)}};(0,h.useEffect)((function(){l().get("".concat("//pos-backend.webxcode.xyz/api","/unit/").concat(n),w).then((function(e){!0===e.data.status&&(x(e.data.unit),N(!1))})).catch((function(e){console.log(e)}))}),[]);var j=function(){var e,t=(e=i().mark((function e(t){var r,a;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),c.Am.loading("Submitting",{position:"bottom-right",theme:"dark"}),d(!0),""!==(r=m()(".name").val())){e.next=9;break}return c.Am.dismiss(),c.Am.error("Name is required",{position:"bottom-left",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,theme:"dark"}),d(!1),e.abrupt("return");case 9:return e.prev=9,e.next=12,l().post("".concat("//pos-backend.webxcode.xyz/api","/unit/update"),{name:r,id:n},w);case 12:!0===(a=e.sent).data.status?(c.Am.dismiss(),c.Am.success("Successfully Updated",{position:"bottom-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,theme:"dark"}),d(!1)):(c.Am.dismiss(),c.Am.error(a.data.errors,{position:"bottom-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,theme:"dark"}),d(!1)),e.next=21;break;case 16:e.prev=16,e.t0=e.catch(9),c.Am.dismiss(),c.Am.error(e.t0.response.data.errors,{position:"bottom-right",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,theme:"dark"}),d(!1);case 21:case"end":return e.stop()}}),e,null,[[9,16]])})),function(){var t=this,n=arguments;return new Promise((function(r,i){var a=e.apply(t,n);function o(e){b(a,r,i,o,s,"next",e)}function s(e){b(a,r,i,o,s,"throw",e)}o(void 0)}))});return function(e){return t.apply(this,arguments)}}();return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(s.default,{children:(0,a.jsx)("title",{children:"Edit Unit"})}),u&&!0===u&&(0,a.jsx)(p.Z,{}),(0,a.jsx)(c.Ix,{}),(0,a.jsx)(o.Z,{user:t,title:"Edit Unit",children:(0,a.jsx)("div",{className:"content",children:(0,a.jsx)("div",{className:"custom-card",children:(0,a.jsxs)("form",{onSubmit:j,children:[(0,a.jsxs)("div",{className:"mb-3",children:[(0,a.jsx)("label",{htmlFor:"name",className:"form-label",children:"Unit Name"}),g&&!1===k&&(0,a.jsx)("input",{type:"text",className:"form-control name",id:"name",required:!0,defaultValue:g.name})||(0,a.jsx)(f.y,{baseColor:"rgba(249, 58, 11, 0.1)",highlightColor:"#212130",children:(0,a.jsx)(f.Z,{width:"100%",height:40})})]}),(0,a.jsx)("button",{className:"btn btn-success",type:"submit",children:"Update"})]})})})})]})}},4849:function(e,t,n){"use strict";n.d(t,{y:function(){return s},Z:function(){return o}});var r=n(7294);const i=r.createContext({});function a({baseColor:e,highlightColor:t,width:n,height:r,borderRadius:i,circle:a,direction:o,duration:s,enableAnimation:c=true}){const u={};return"rtl"===o&&(u["--animation-direction"]="reverse"),"number"===typeof s&&(u["--animation-duration"]=`${s}s`),c||(u["--pseudo-element-display"]="none"),"string"!==typeof n&&"number"!==typeof n||(u.width=n),"string"!==typeof r&&"number"!==typeof r||(u.height=r),"string"!==typeof i&&"number"!==typeof i||(u.borderRadius=i),a&&(u.borderRadius="50%"),"undefined"!==typeof e&&(u["--base-color"]=e),"undefined"!==typeof t&&(u["--highlight-color"]=t),u}function o({count:e=1,wrapper:t,className:n,containerClassName:o,containerTestId:s,circle:c=!1,style:u,...l}){var d,m,h;const f=r.useContext(i),p={...l};for(const[r,i]of Object.entries(l))"undefined"===typeof i&&delete p[r];const b={...f,...p,circle:c},v={...u,...a(b)};let g="react-loading-skeleton";n&&(g+=` ${n}`);const x=null!==(d=b.inline)&&void 0!==d&&d,y=[],k=Math.ceil(e);for(let i=0;i<k;i++){let t=v;if(k>e&&i===k-1){const n=null!==(m=t.width)&&void 0!==m?m:"100%",r=e%1,i="number"===typeof n?n*r:`calc(${n} * ${r})`;t={...t,width:i}}const n=r.createElement("span",{className:g,style:t,key:i},"\u200c");x?y.push(n):y.push(r.createElement(r.Fragment,{key:i},n,r.createElement("br",null)))}return r.createElement("span",{className:o,"data-testid":s,"aria-live":"polite","aria-busy":null===(h=b.enableAnimation)||void 0===h||h},t?y.map(((e,n)=>r.createElement(t,{key:n},e))):y)}function s({children:e,...t}){return r.createElement(i.Provider,{value:t},e)}}},function(e){e.O(0,[571,619,669,782,688,774,888,179],(function(){return t=623,e(e.s=t);var t}));var t=e.O();_N_E=t}]);