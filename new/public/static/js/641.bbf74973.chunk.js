(self.webpackChunkclient=self.webpackChunkclient||[]).push([[641],{66630:t=>{t.exports={"prodpage-control-buttons__container":"controlbuttons-module__prodpage-control-buttons__container___jAEUr","prodpage-control-buttons__add-to-cart-container":"controlbuttons-module__prodpage-control-buttons__add-to-cart-container___UXZsW","prodpage-control-buttons__add-to-cart-container--fierst":"controlbuttons-module__prodpage-control-buttons__add-to-cart-container--fierst___7A1sp","prodpage-control-buttons__descrement-button":"controlbuttons-module__prodpage-control-buttons__descrement-button___GetSn","prodpage-control-buttons__increment-button":"controlbuttons-module__prodpage-control-buttons__increment-button___bb58O","prodpage-control-buttons__info-in-cart":"controlbuttons-module__prodpage-control-buttons__info-in-cart___VtWNi","prodpage-control-buttons__fierst-add-to-cart":"controlbuttons-module__prodpage-control-buttons__fierst-add-to-cart___3-RRI","prodpage-control-buttons__inner-button":"controlbuttons-module__prodpage-control-buttons__inner-button___-FKNg","prodpage-control-buttons__text-button":"controlbuttons-module__prodpage-control-buttons__text-button___mTXmU","prodpage-control-buttons__indicator":"controlbuttons-module__prodpage-control-buttons__indicator___KuetK","prodpage-control-buttons__indicator--color__red":"controlbuttons-module__prodpage-control-buttons__indicator--color__red___7PQNg",slidertimer:"controlbuttons-module__slidertimer___-0asc"}},47641:(t,o,n)=>{"use strict";n.r(o),n.d(o,{default:()=>h});var e=n(67294),r=n(9480),c=n(94184),a=n.n(c),_=n(12350),l=n(18080),d=n(11068),s=n(6472),i=n(66630),u=n.n(i),p=e.createElement;const b=({stateInStockeBtn:t,colorBtnClick:o,in_cart_count:n,is_collection:e,countInBtn:c,cloneCart:i,productId:b,modalView:g,role:m,url:f,linkToProductPage:h,addToCartProduct:k})=>p("div",{className:u()["prodpage-control-buttons__container"]},n?p("div",{className:u()["prodpage-control-buttons__add-to-cart-container"]},p(r.Z,{disabled:!(n>1)&&(1===n||t),onClick:t=>{i(t),k(-1,g,b)},className:u()["prodpage-control-buttons__descrement-button"]},"-"),p("p",{className:a()({[u()["prodpage-control-buttons__inner-button"]]:!0,[u()[o]]:!!o})},p(d.Z,{slot:"icon-left",src:l.UB,width:25,height:25}),p("span",{className:u()["prodpage-control-buttons__info-in-cart"]}," \u0432 \u043a\u043e\u0440\u0437\u0438\u043d\u0435: ",n," ",e&&m===_.ROLE.WHOLESALE?"\u0440\u044f\u0434(\u0430)":"\u0448\u0442.")),p(r.Z,{disabled:t,onClick:t=>{i(t),k(1,g,b)},className:u()["prodpage-control-buttons__increment-button"]},"+")):p("div",{className:u()["prodpage-control-buttons__add-to-cart-container--fierst"]},p(r.Z,{disabled:t,onClick:t=>{i(t),k(1,g,b)},className:u()["prodpage-control-buttons__fierst-add-to-cart"]},p(d.Z,{slot:"icon-left",src:l.UB,pointerEvents:"none",width:25,height:25}),p("div",{className:u()["prodpage-control-buttons__text-button"]},(0,s.Z)({text:"add-to-cart"})))),h(f,g));var g=n(73793),m=n(96974),f=e.createElement;const h=({in_stock_count:t,is_collection:o,in_cart_count:n,is_in_stock:c,productId:_,modalView:l,role:d,url:s})=>{const{dispatch:i}=(0,g.bI)(),{0:p,1:h}=(0,e.useState)(n),{0:k,1:C}=(0,e.useState)(!1),x=(0,m.s0)(),{0:I,1:N}=(0,e.useState)({red:!1,green:!1});(0,e.useEffect)(()=>{c?(C(t<1),C(!(t>n))):C(!1)},[c,t,n]);const T=()=>{i("setModalState",{show:!1})};(0,e.useEffect)(()=>{n!==p&&h(n)},[n]);const{0:B,1:w}=(0,e.useState)("prodpage-control-buttons__indicator");(0,e.useEffect)(()=>{let t=a()({[u()["prodpage-control-buttons__indicator--color__red"]]:I.red,[u()["prodpage-control-buttons__indicator--color__green"]]:I.green});w(t)},[I.red,I.green]);return f(b,{linkToProductPage:(t,o)=>o?f(r.Z,{href:"/"+t,full:!0,variant:"catalog-link-transparent__modal",onClick:T},"\u043f\u0435\u0440\u0435\u0439\u0442\u0438 \u043d\u0430 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443 \u0442\u043e\u0432\u0430\u0440\u0430"):null,stateInStockeBtn:k,addToCartProduct:(t,o,n)=>{i("addToCart",{productId:n,count:t,modalView:o,redirectTo:t=>{const o=setTimeout(()=>(x(t),()=>clearTimeout(o)),100)}})},in_cart_count:n,colorBtnClick:B,is_collection:o,countInBtn:p,modalView:l,productId:_,cloneCart:t=>{let o;o=t.target.children[0]?t.target.children[0]:t.target.offsetParent.children[0].children[1].firstChild;const n=o.cloneNode(!0),e=o.style.backgroundImage,r=o.offsetWidth,c=o.offsetHeight,a=o.getBoundingClientRect().top,_=o.getBoundingClientRect().left;n.classList.add("_flyImage"),n.style.cssText=`\n        left: ${_}px;\n        top:  ${a}px;\n        width: ${r}px;\n        height: ${c}px;\n      `,document.body.append(n);const l=document.querySelector("#cart-id"),d=l.getBoundingClientRect().top,s=l.getBoundingClientRect().left;console.log("data button = ",{cloneIcon:n},{getCartId:l}),n.style.cssText=`\n        left: ${s}px;\n        top:  ${d}px;\n        background-image: ${e};\n        width: 0px;\n        height: 0px;\n        opacity: 0;\n        transform: scale(.5)\n      `;const i=setTimeout(()=>(n.remove(),()=>clearTimeout(i)),4e3)},role:d,url:s})}}}]);
//# sourceMappingURL=641.bbf74973.chunk.js.map