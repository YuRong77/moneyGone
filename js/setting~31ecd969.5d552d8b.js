(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["setting~31ecd969"],{"0a2c":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"setting"},[a("div",{staticClass:"header"},[a("h3",{staticClass:"font-18"},[t._v(t._s(t.$t("LC_MY_SETTING")))])]),a("div",{staticClass:"content"},[a("div",{staticClass:"setup boxShadow"},[a("div",{staticClass:"setItem",on:{click:function(e){return t.editName()}}},[t._m(0),a("div",{staticClass:"text"},[t._v(t._s(t.$t("LC_NICKNAME")))]),a("div",{staticClass:"control"},[a("span",[t._v(t._s(t.memberInfo.name)+" ")]),t._m(1)])]),a("div",{staticClass:"setItem",on:{click:function(e){return t.editLang()}}},[t._m(2),a("div",{staticClass:"text"},[t._v(t._s(t.$t("LC_LANG")))]),a("div",{staticClass:"control"},[a("span",[t._v(t._s(t.getLang())+" ")]),t._m(3)])]),a("div",{staticClass:"setItem"},[t._m(4),a("div",{staticClass:"text"},[t._v(t._s(t.$t("LC_THEME")))]),a("div",{staticClass:"control"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.isLightMode,expression:"isLightMode"}],attrs:{type:"checkbox",id:"theme"},domProps:{checked:Array.isArray(t.isLightMode)?t._i(t.isLightMode,null)>-1:t.isLightMode},on:{change:function(e){var a=t.isLightMode,n=e.target,s=!!n.checked;if(Array.isArray(a)){var i=null,c=t._i(a,i);n.checked?c<0&&(t.isLightMode=a.concat([i])):c>-1&&(t.isLightMode=a.slice(0,c).concat(a.slice(c+1)))}else t.isLightMode=s}}}),t._m(5)])]),a("div",{staticClass:"setItem"},[t._m(6),a("div",{staticClass:"text"},[t._v(t._s(t.$t("LC_LOGOUT")))]),a("div",{staticClass:"control"},[a("div",{staticClass:"logoutBtn cancelBtn btn",on:{click:function(e){return t.logout()}}},[t._v(" "+t._s(t.$t("LC_LOGOUT"))+" ")])])])])]),t.editNamePopup?a("EditNamePopup",{attrs:{editNamePopup:t.editNamePopup,name:t.memberInfo.name},on:{"update:editNamePopup":function(e){t.editNamePopup=e},"update:edit-name-popup":function(e){t.editNamePopup=e}}}):t._e(),t.editLangPopup?a("EditLangPopup",{attrs:{editLangPopup:t.editLangPopup,lang:t.lang},on:{"update:editLangPopup":function(e){t.editLangPopup=e},"update:edit-lang-popup":function(e){t.editLangPopup=e},"update:lang":function(e){t.lang=e}}}):t._e()],1)},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"icon"},[a("i",{staticClass:"fas fa-user-circle"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",[a("i",{staticClass:"fas fa-angle-right"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"icon"},[a("i",{staticClass:"fas fa-globe"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",[a("i",{staticClass:"fas fa-angle-right"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"icon"},[a("i",{staticClass:"fas fa-adjust"})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",{attrs:{for:"theme"}},[n("img",{attrs:{src:a("3559"),alt:""}}),n("img",{attrs:{src:a("cde8"),alt:""}}),n("div",{staticClass:"switchBall"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"icon"},[a("i",{staticClass:"fas fa-sign-out-alt"})])}],i=a("5530"),c=a("2f62"),o=a("3640"),u=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"editNamePopup popupMask"},[a("div",{staticClass:"editNameCard p-card-s boxShadow"},[a("h2",{staticClass:"font-18"},[t._v(t._s(t.$t("LC_EDIT_NICKNAME")))]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.newName,expression:"newName"}],attrs:{type:"text"},domProps:{value:t.newName},on:{input:function(e){e.target.composing||(t.newName=e.target.value)}}}),a("div",{staticClass:"formBtn"},[a("div",{staticClass:"cancelBtn btn font-16",on:{click:function(e){return t.$emit("update:editNamePopup",!1)}}},[t._v(" "+t._s(t.$t("LC_CANCEL"))+" ")]),a("div",{staticClass:"confirmBtn btn font-16",on:{click:function(e){return t.editName()}}},[t._v(" "+t._s(t.$t("LC_CONFIRM"))+" ")])])])])},r=[],l=(a("b0c0"),{props:["editNamePopup","name"],data:function(){return{newName:null}},methods:{editName:function(){var t=this,e={name:this.newName};this.$store.dispatch("setting/updateMemberName",e).then((function(e){return t.$bus.$emit("sendMessage",e.message,e.state)})).catch((function(e){return t.$bus.$emit("sendMessage",e.message,e.state)})),this.$emit("update:editNamePopup",!1)}},created:function(){this.newName=this.name}}),d=l,m=(a("c6db"),a("2877")),g=Object(m["a"])(d,u,r,!1,null,"6d5a5223",null),p=g.exports,h=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"editLangPopup popupMask"},[a("div",{staticClass:"editLangCard p-card-s boxShadow"},[a("h2",{staticClass:"font-18"},[t._v(t._s(t.$t("LC_SELECT_LANG")))]),a("div",{staticClass:"langList"},t._l(t.langList,(function(e){return a("div",{key:e.value,staticClass:"langItem",class:{active:e.value===t.newLang},on:{click:function(a){t.newLang=e.value}}},[t._v(" "+t._s(e.name)+" ")])})),0),a("div",{staticClass:"formBtn"},[a("div",{staticClass:"confirmBtn btn font-16",on:{click:function(e){return t.editLang()}}},[t._v(" "+t._s(t.$t("LC_CONFIRM"))+" ")])])])])},f=[],v={props:["editLangPopup","lang"],data:function(){return{newLang:null,langList:[{name:"繁體中文",value:"zh-TW"},{name:"简体中文",value:"zh-CN"},{name:"English",value:"en-US"},{name:"日本語",value:"ja-JP"}]}},methods:{editLang:function(){var t=this;if(this.lang===this.newLang)return this.$emit("update:editLangPopup",!1);var e={lang:this.newLang};this.$store.dispatch("setting/changeLang",e).then((function(e){return t.$bus.$emit("sendMessage",e.message,e.state)})).catch((function(e){return t.$bus.$emit("sendMessage",e.message,e.state)})),this.$store.commit("setting/SET_LANG",this.newLang),this.$i18n.locale=this.newLang,sessionStorage.setItem("lang",this.newLang),this.$emit("update:lang",this.newLang),this.$emit("update:editLangPopup",!1)}},created:function(){this.newLang=this.lang}},_=v,L=(a("8031"),Object(m["a"])(_,h,f,!1,null,"75f616c8",null)),C=L.exports,b={components:{EditNamePopup:p,EditLangPopup:C},data:function(){return{lang:sessionStorage.getItem("lang"),editNamePopup:!1,editLangPopup:!1,isLightMode:null}},watch:{isLightMode:function(t,e){if(null!==e)return t?this.setTheme("lightMode"):this.setTheme("darkMode")}},computed:Object(i["a"])(Object(i["a"])({},Object(c["b"])("setting",["theme"])),Object(c["b"])("memberInfo",["memberInfo"])),methods:{editName:function(){this.editNamePopup=!0},editLang:function(){this.editLangPopup=!0},setTheme:function(t){var e=this,a={theme:t};this.$store.commit("setting/SET_THEME",t),this.$store.dispatch("setting/changeTheme",a).catch((function(t){return e.$bus.$emit("sendMessage",t.message,t.state)}));var n="lightMode"===t?"#ffffff":"#4d6072",s=document.querySelector("meta[name=theme-color]");s.setAttribute("content",n)},logout:function(){var t=this;Object(o["a"])("".concat("https://moneygone-api.vercel.app","/api/index/logout")).then((function(){sessionStorage.removeItem("Authorization"),localStorage.removeItem("a"),localStorage.removeItem("p"),location.reload()})).catch((function(e){return t.$bus.$emit("sendMessage",e.message,e.state)}))},getLang:function(){return"zh-TW"===this.lang?"繁體中文":"zh-CN"===this.lang?"简体中文":"en-US"===this.lang?"English":"ja-JP"===this.lang?"日本語":void 0}},created:function(){"lightMode"===this.theme?this.isLightMode=!0:this.isLightMode=!1}},$=b,N=(a("0d4b"),Object(m["a"])($,n,s,!1,null,"645acb66",null));e["default"]=N.exports},"0d4b":function(t,e,a){"use strict";a("bf69")},3559:function(t,e,a){t.exports=a.p+"img/sun.5319a102.svg"},"451b":function(t,e,a){},8031:function(t,e,a){"use strict";a("451b")},a589:function(t,e,a){},b0c0:function(t,e,a){var n=a("83ab"),s=a("5e77").EXISTS,i=a("e330"),c=a("9bf2").f,o=Function.prototype,u=i(o.toString),r=/^\s*function ([^ (]*)/,l=i(r.exec),d="name";n&&!s&&c(o,d,{configurable:!0,get:function(){try{return l(r,u(this))[1]}catch(t){return""}}})},bf69:function(t,e,a){},c6db:function(t,e,a){"use strict";a("a589")},cde8:function(t,e,a){t.exports=a.p+"img/moon.34d7d46c.svg"}}]);