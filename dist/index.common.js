/*!
 * ERP Layout Plugin v0.0.1
 * Uloc Framework
 * (c) 2020-present Tiago Felipe
 * Released under the MIT License.
 */
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var ulocVue=require("uloc-vue");function assign(t,e){var n=arguments;if(void 0===t||null===t)throw new TypeError("Cannot convert first argument to object");for(var o=Object(t),s=1;s<arguments.length;s++){var r=n[s];if(void 0!==r&&null!==r)for(var u=Object.keys(Object(r)),i=0,a=u.length;i<a;i++){var l=u[i],c=Object.getOwnPropertyDescriptor(r,l);void 0!==c&&c.enumerable&&(o[l]=r[l])}}return o}Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:assign}),Number.isInteger||(Number.isInteger=function(t){return"number"==typeof t&&isFinite(t)&&Math.floor(t)===t}),Array.prototype.includes||(Array.prototype.includes=function(t,e){var n=Object(this),o=parseInt(n.length,10)||0;if(0===o)return!1;var s,r,u=parseInt(e,10)||0;for(u>=0?s=u:(s=o+u)<0&&(s=0);s<o;){if(t===(r=n[s])||t!=t&&r!=r)return!0;s++}return!1}),String.prototype.startsWith||(String.prototype.startsWith=function(t,e){return e=e||0,this.substr(e,t.length)===t}),String.prototype.endsWith||(String.prototype.endsWith=function(t,e){var n=this.toString();("number"!=typeof e||!isFinite(e)||Math.floor(e)!==e||e>n.length)&&(e=n.length),e-=t.length;var o=n.indexOf(t,e);return-1!==o&&o===e}),Array.prototype.find||Object.defineProperty(Array.prototype,"find",{value:function(t){if(null==this)throw new TypeError("Array.prototype.find called on null or undefined");if("function"!=typeof t)throw new TypeError("predicate must be a function");for(var e,n=Object(this),o=n.length>>>0,s=arguments[1],r=0;r<o;r++)if(e=n[r],t.call(s,e,r,n))return e}});var version="0.0.1",globals={logged:!1,version:version},Plugin=globals;function install(t,e){if(void 0===e&&(e={}),!this.installed){this.installed=!0;var n=e.config||{};for(var o in n)void 0!==Plugin.config[o]&&(Plugin.config[o]=n[o]);if(e.components&&Object.keys(e.components).forEach(function(n){var o=e.components[n];void 0===o.name||void 0===o.render&&void 0===o.mixins||t.component(o.name,o)}),e.directives&&Object.keys(e.directives).forEach(function(n){var o=e.directives[n];void 0!==o.name&&void 0!==o.unbind&&t.directive(o.name,o)}),e.plugins){var s={Plugin:Plugin,Vue:t,cfg:n};Object.keys(e.plugins).forEach(function(t){var n=e.plugins[t];"function"==typeof n.install&&n.install(s)})}t.prototype.$uloc?t.prototype.$uloc.erp=Plugin:t.prototype.$erp=Plugin}}var ErpLayout={name:"ErpLayout",props:{},provide:function(){return{layout:this.layout,erplayout:this}},data:function(){return{erpheader:null,erpcontainer:null}},computed:{computedClass:function(){return{}},computedStyle:function(){return{}}},created:function(){},beforeDestroy:function(){},watch:{},methods:{},render:function(t){return t("div",{staticClass:"u-erp-layout",class:this.computedClass,style:this.computedStyle},this.$slots.default)}},ErpHeader={name:"ErpHeader",inject:{layout:{default:function(){console.error("ErpHeader needs to be child of ULayout")}},erplayout:{default:function(){console.error("ErpHeader needs to be child of ErpLayout")}}},provide:function(){return{layout:this.layout,erplayout:this.erplayout,erpheader:this}},props:{},data:function(){return{menu:null,modulemenu:null}},computed:{computedClass:function(){return{}},computedStyle:function(){return{}}},created:function(){this.erplayout&&(this.erplayout.erpheader=this)},beforeDestroy:function(){},watch:{},methods:{getActualMenu:function(){return this.menu.getActiveMenu()},setMenuModuleToggle:function(t){this.modulemenu&&this.modulemenu.__toggleMenuModule(t)}},render:function(t){return t("div",{staticClass:"u-erp-header",class:this.computedClass,style:this.computedStyle},this.$slots.default)}},ErpMenu={name:"ErpMenu",inject:{erpheader:{default:function(){console.error("ModuleMenu needs to be child of ModuleHeader")}}},provide:function(){return{erpheader:this.erpheader,menu:this}},props:{},data:function(){return{activeMenu:null}},computed:{computedClass:function(){return{}},computedStyle:function(){return{}}},created:function(){this.erpheader&&(this.erpheader.menu=this)},beforeDestroy:function(){},watch:{},methods:{setActiveMenu:function(t){this.activeMenu=t,this.$emit("setActiveMenu",t)}},render:function(t){return t("div",{staticClass:"u-erp-menu",class:this.computedClass,style:this.computedStyle},[this.$slots.default])}},ErpMenuItem={name:"ErpMenuItem",props:{id:{type:String,required:!0},active:{type:Boolean,default:!1}},data:function(){return{}},computed:{computedClass:function(){return{selected:this.active}},computedStyle:function(){return{}}},created:function(){},beforeDestroy:function(){},watch:{},methods:{__onClick:function(t){this.$parent.menu.setActiveMenu(this.id),this.$emit("click",{event:t,id:this.id})}},render:function(t){return t("li",{staticClass:"",class:this.computedClass,style:this.computedStyle},[t("a",{on:{click:this.__onClick}},this.$slots.default)])}},ErpMenuItems={name:"ErpMenuItems",inject:{menu:{default:function(){console.error("MenuItem needs to be child of Menu")}}},props:{},data:function(){return{}},computed:{computedClass:function(){return{}},computedStyle:function(){return{}}},created:function(){},beforeDestroy:function(){},watch:{},methods:{},render:function(t){return t("ul",{staticClass:"u-erp-menu-items",class:this.computedClass,style:this.computedStyle},this.$slots.default)}},MenuAlerts={name:"MenuAlerts",props:{alerts:{type:Array,default:function(){return[]}}},data:function(){return{}},computed:{computedClass:function(){return{}},computedStyle:function(){return{}}},created:function(){},beforeDestroy:function(){},watch:{},methods:{},render:function(t){return t("div",{staticClass:"u-erp-menu-alerts",class:this.computedClass,style:this.computedStyle},[t("i",this.alerts.length),t("span","Avisos importantes")])}},MenuAccountInfo={name:"MenuAccountInfo",props:{user:{type:Object,required:!0}},data:function(){return{}},computed:{computedClass:function(){return{}},computedStyle:function(){return{}}},created:function(){},beforeDestroy:function(){},watch:{},methods:{},render:function(t){return t("div",{staticClass:"u-erp-account-info",class:this.computedClass,style:this.computedStyle},[t("div",{staticClass:"u-erp-account-img"},[t("a",[t("img",{attrs:{src:this.user.image}})])]),t("div",{staticClass:"u-erp-account-logout"},[t("a",{attrs:{href:"/#/logout"}},"Sair")])])}},MenuModule={name:"MenuModule",inject:{erpheader:{default:function(){console.error("ModuleMenu needs to be child of ModuleHeader")}}},props:{toggled:{type:Boolean,default:!1}},data:function(){return{toggledMenuModule:!1}},computed:{computedClass:function(){return{toggled:this.toggledMenuModule}},computedStyle:function(){return{}}},created:function(){this.erpheader&&(this.erpheader.modulemenu=this)},beforeDestroy:function(){},watch:{toggled:function(t){this.toggledMenuModule=t},toggledMenuModule:function(t){var e=this.$refs.toggleIcon;t?document.body.append(e):this.$el.append(e)}},methods:{__toggleMenuModule:function(t){"boolean"!=typeof t&&(t=!this.toggledMenuModule),document.body.classList.remove("u-erp-layout-menu-toggled"),this.toggledMenuModule=t,this.toggledMenuModule&&document.body.classList.add("u-erp-layout-menu-toggled")}},render:function(t){return t("div",{staticClass:"u-erp-module-menu",class:this.computedClass,style:this.computedStyle},[this.$slots.default,t("div",{ref:"toggleIcon",staticClass:"u-erp-module-toggle",class:{toggled:this.toggledMenuModule},on:{click:this.__toggleMenuModule}},[t("a",[t("img",{attrs:{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAMAAAAhxq8pAAAAb1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABeXl4AAAAAAAAWFhYrKyshISFlZWVmZmZgYGBhYWFeXl5XV1dZWVlNTU1cXFwrKysAAABjY2NaWlpdXV1QUFBSUlIyMjI0NDQkJCQdHR0AAACVUHsGAAAAJXRSTlMABQMPCSAcEw0rui8nN0c+8uzRx8Kbdm9uJBawl5SGglI7MSwaIpgUUgAAAIdJREFUGNOVj8cOgzAQBbPFZV1wQie9/f83BgUsmSNzedJoDruH3SDM4NYBj6Mhhk1mL7er08YWMdjTK0g6qrOFwr0lJh8Li9x8pKrrysdGGcYl7Ht5Oi+u8veHJljk1HazC8F1bVJmlTQNEtRXqyGGXCIbrbQh+g9jvpzIMgBbIobyR8yzix/UGwXDeqV2eAAAAABJRU5ErkJggg=="}})])])])}},MenuModuleComponent={name:"MenuModuleComponent",props:{label:{type:String},items:{type:Array},right:{type:Boolean,default:!1},hideLabel:{type:Boolean,default:!1}},data:function(){return{}},computed:{computedClass:function(){return{"u-erp-menu-right":this.right}},computedStyle:function(){return{}}},created:function(){},beforeDestroy:function(){},watch:{},methods:{},render:function(t){var e=[];return Array.isArray(this.items)&&this.items.length>0&&this.items.forEach(function(n){var o={};n.href&&(o.href=n.href),e.push(t("li",[t("a",{attrs:o},[t("i",{staticClass:"erp-icon "+n.icon},[n.tip?t("div",{staticClass:"erp-module-item-tip"},n.tip):null]),t("span",n.name)])]))}),t("div",{staticClass:"u-erp-module-menu-component",class:this.computedClass,style:this.computedStyle},[this.label&&!this.hideLabel?t("div",{staticClass:"lbl"},this.label):null,t("div",{staticClass:"u-erp-module-menu-items"},e)])}},ErpLayoutContainer={name:"ErpLayoutContainer",inject:{layout:{default:function(){console.error("ErpLayoutContainer needs to be child of ULayout")}},erplayout:{default:function(){console.error("ErpLayoutContainer needs to be child of ErpLayout")}}},provide:function(){return{layout:this.layout,erplayout:this.erplayout,erpcontainer:this}},props:{},data:function(){return{}},computed:{computedClass:function(){return{}},computedStyle:function(){return{}}},created:function(){console.log(this.erplayout.erpheader)},beforeDestroy:function(){},watch:{},methods:{},render:function(t){return t("div",{staticClass:"u-erp-layout-container",class:this.computedClass,style:this.computedStyle},this.$slots.default)}},ErpLayoutBase={name:"ErpLayoutBase",props:{menuData:{type:Array,required:!0},defaultActiveMenu:{type:String,default:null},alerts:{type:Array,default:function(){return[]}},user:{type:Object,required:!0,validator:function(t){return t.image&&t.name}}},components:{ErpLayoutContainer:ErpLayoutContainer,MenuModuleComponent:MenuModuleComponent,MenuModule:MenuModule,MenuAccountInfo:MenuAccountInfo,MenuAlerts:MenuAlerts,ErpMenuItems:ErpMenuItems,ErpMenuItem:ErpMenuItem,ErpMenu:ErpMenu,ErpHeader:ErpHeader,ErpLayout:ErpLayout},data:function(){var t=this,e=this.menuData.filter(function(e){return e.id===t.defaultActiveMenu});return{activeMenu:e?e[0]:null}},computed:{menuComponents:function(){return this.menuData}},mounted:function(){this.$refs.menu.activeMenu=this.activeMenu.id},methods:{clickMenu:function(t,e){this.activeMenu=e,this.$emit("menuMoveCursor",e.id)},__selectMenuById:function(t){var e=this.menuData.filter(function(e){return e.id===t});Array.isArray(e)&&e.length>0&&(this.activeMenu=e[0])}},render:function(t){var e=this;return t(ErpLayout,[t(ErpHeader,[t(ErpMenu,{ref:"menu",on:{setActiveMenu:this.__selectMenuById}},[t(ErpMenuItems,this.menuComponents.map(function(n){return t(ErpMenuItem,{props:{id:n.id,active:e.activeMenu===n},on:{click:function(t){return e.clickMenu(t,n)}}},n.menuName)})),t(MenuAlerts,{props:{alerts:e.alerts}}),t(MenuAccountInfo,{props:{user:e.user}})]),t(MenuModule,this.activeMenu.components.map(function(e){return t(MenuModuleComponent,{props:{right:e.right,hideLabel:e.hideLabel,label:e.component,items:e.features}})}))]),t(ErpLayoutContainer,this.$slots.default)])}},EBtn={name:"EBtn",mixins:[ulocVue.UBtn],props:{noCaps:{type:Boolean,default:!0},md:{type:Boolean,default:!0}},components:{UBtn:ulocVue.UBtn,USpinner:ulocVue.USpinner,UIcon:ulocVue.UIcon},computed:{aditionalClasses:function(){var t=[];return this.md&&t.push("erp-btn-size-md")," "+t.join(" ")}},render:function(t){return t(this.isLink?"a":"button",{staticClass:"erp-btn u-btn inline relative-position u-btn-item no-select"+this.aditionalClasses,class:this.classes,style:this.style,attrs:this.attrs,on:this.events},[this.$uloc.platform.is.desktop?t("div",{staticClass:"u-focus-helper"}):null,this.loading&&this.hasPercentage?t("div",{staticClass:"u-btn-progress absolute-full",class:{"u-btn-dark-progress":this.darkPercentage},style:{width:this.width}}):null,t("div",{staticClass:"u-btn-inner row col items-center",class:this.innerClasses},this.loading?[this.$slots.loading||t(ulocVue.USpinner)]:[this.icon?t(ulocVue.UIcon,{class:{"on-left":this.label&&this.isRectangle},props:{name:this.icon,color:this.iconColor,type:this.iconType,iconStyle:this.iconStyle}}):null,this.label&&this.isRectangle?t("div",[this.label]):null,this.$slots.default,this.iconRight&&this.isRectangle?t(ulocVue.UIcon,{staticClass:"on-right",props:{name:this.iconRight,color:this.iconRightColor,type:this.iconRightType,iconStyle:this.iconRightStyle}}):null])])}},EBtnCircleStatus={name:"EBtnCircleStatus",props:{status:String},components:{},computed:{computedClass:function(){return{}}},render:function(t){var e=this.$props;return e.noCaps=!0,t("span",{staticClass:"erp-btn-circle-status "+this.status,class:this.computedClass,props:e})}},EBtnTableOption={name:"EBtnTableOptions",props:{status:String},components:{},computed:{computedClass:function(){return{}}},render:function(t){return this.$props.noCaps=!0,t("a",{staticClass:"erp-btn-table-options",class:this.computedClass},[t(ulocVue.UIcon,{props:{name:"chevron-down",type:"fa",iconStyle:"regular"}}),this.$slots.default])}},ETableFooter={name:"ETableFooter",props:{height:{type:Number,default:32}},components:{},mounted:function(){this.$parent.$el.append(this.$el)},computed:{computedClass:function(){return{}},computedStyle:function(){return{height:this.height+"px"}}},render:function(t){return t("div",{staticClass:"e-w-table-footer",class:this.computedClass,style:this.computedStyle},this.$slots.default)}},ETableFooterResult={name:"ETableFooterResult",props:{},components:{},mounted:function(){},computed:{computedClass:function(){return{}}},render:function(t){return t("div",{staticClass:"e-w-table-footer-result",class:this.computedClass},this.$slots.default)}},ETr={name:"ETr",props:{columns:Array},components:{},computed:{computedClass:function(){return{}}},render:function(t){return t("tr",{staticClass:"",class:this.computedClass},this.$slots.default)}},ETd={name:"ETd",props:{columns:Array},components:{},computed:{computedClass:function(){return{}}},render:function(t){return t("td",{staticClass:"erp-w-table-td",class:this.computedClass},this.$slots.default)}},EWindowTable={name:"EWindowTable",props:{columns:Array},components:{},computed:{computedClass:function(){return{}}},render:function(t){return t("div",{staticClass:"erp-w-table",class:this.computedClass},[t("table",[t("thead",[this.columns.map(function(e){return t("th",e)})]),t("tbody",this.$slots.default)])])}},Tabs={name:"ErpTabs",props:{tabs:Array,active:String},components:{},mounted:function(){this.updateActive(),this.$on("tabClick",this.change)},computed:{computedClass:function(){return{}}},methods:{updateActive:function(){var t=this;this.meActive=this.active,this.$children.forEach(function(e){e.disable(),e.name===t.active&&e.enable()})},change:function(t){var e=t.event,n=t.tab;this.$emit("change",{event:e,tab:n})}},watch:{active:function(){this.updateActive()}},render:function(t){return t("div",{staticClass:"erp-tabs",class:this.computedClass},this.$slots.default)}},TabItem={name:"ErpTabItem",props:{name:{type:String,required:!0},active:Boolean},data:function(){return{meActive:this.active}},components:{},computed:{computedClass:function(){return{active:this.meActive}}},methods:{enable:function(){this.meActive=!0},disable:function(){this.meActive=!1},click:function(t){this.$parent.$emit("tabClick",{event:t,tab:this.name})}},render:function(t){return t("a",{staticClass:"erp-tabs-item u-hoverable",class:this.computedClass,on:{click:this.click}},[t("div",{class:{"u-focus-helper":!this.meActive}}),this.$slots.default])}},Body={name:"WindowContentBody",props:{tabs:Boolean},components:{},computed:{computedClass:function(){return{"with-tabs":this.tabs}}},render:function(t){return t("div",{staticClass:"erp-w-content-body",class:this.computedClass},this.$slots.default)}},Content={name:"WindowContent",props:{},components:{},computed:{computedClass:function(){return{}}},render:function(t){return t("div",{staticClass:"erp-w-content",class:this.computedClass},this.$slots.default)}},Header={name:"WindowContentHeader",props:{},components:{},computed:{computedClass:function(){return{}}},render:function(t){return t("div",{staticClass:"erp-w-content-header",class:this.computedClass},this.$slots.default)}},Footer={name:"WindowContentFooter",props:{},components:{},computed:{computedClass:function(){return{}}},render:function(t){return t("div",{staticClass:"erp-w-content-footer",class:this.computedClass},this.$slots.default)}},index={version:version,install:install,Plugin:Plugin};exports.EBtn=EBtn,exports.EBtnCircleStatus=EBtnCircleStatus,exports.EBtnTableOptions=EBtnTableOption,exports.ETableFooter=ETableFooter,exports.ETableFooterResult=ETableFooterResult,exports.ETd=ETd,exports.ETr=ETr,exports.EWindowTable=EWindowTable,exports.ErpLayout=ErpLayout,exports.ErpLayoutBase=ErpLayoutBase,exports.ErpTabItem=TabItem,exports.ErpTabs=Tabs,exports.Header=ErpHeader,exports.LayoutContainer=ErpLayoutContainer,exports.Menu=ErpMenu,exports.MenuAccountInfo=MenuAccountInfo,exports.MenuAlerts=MenuAlerts,exports.MenuItem=ErpMenuItem,exports.MenuItems=ErpMenuItems,exports.MenuModule=MenuModule,exports.MenuModuleComponent=MenuModuleComponent,exports.WindowBody=Body,exports.WindowContent=Content,exports.WindowFooter=Footer,exports.WindowHeader=Header,exports.default=index;