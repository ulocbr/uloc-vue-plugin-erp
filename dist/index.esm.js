/*!
 * ERP Layout Plugin v0.0.1
 * Uloc Framework
 * (c) 2020-present Tiago Felipe
 * Released under the MIT License.
 */
function assign(e,t){var n=arguments;if(void 0===e||null===e)throw new TypeError("Cannot convert first argument to object");for(var o=Object(e),r=1;r<arguments.length;r++){var u=n[r];if(void 0!==u&&null!==u)for(var i=Object.keys(Object(u)),s=0,a=i.length;s<a;s++){var l=i[s],c=Object.getOwnPropertyDescriptor(u,l);void 0!==c&&c.enumerable&&(o[l]=u[l])}}return o}Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:assign}),Number.isInteger||(Number.isInteger=function(e){return"number"==typeof e&&isFinite(e)&&Math.floor(e)===e}),Array.prototype.includes||(Array.prototype.includes=function(e,t){var n=Object(this),o=parseInt(n.length,10)||0;if(0===o)return!1;var r,u,i=parseInt(t,10)||0;for(i>=0?r=i:(r=o+i)<0&&(r=0);r<o;){if(e===(u=n[r])||e!=e&&u!=u)return!0;r++}return!1}),String.prototype.startsWith||(String.prototype.startsWith=function(e,t){return t=t||0,this.substr(t,e.length)===e}),String.prototype.endsWith||(String.prototype.endsWith=function(e,t){var n=this.toString();("number"!=typeof t||!isFinite(t)||Math.floor(t)!==t||t>n.length)&&(t=n.length),t-=e.length;var o=n.indexOf(e,t);return-1!==o&&o===t}),Array.prototype.find||Object.defineProperty(Array.prototype,"find",{value:function(e){if(null==this)throw new TypeError("Array.prototype.find called on null or undefined");if("function"!=typeof e)throw new TypeError("predicate must be a function");for(var t,n=Object(this),o=n.length>>>0,r=arguments[1],u=0;u<o;u++)if(t=n[u],e.call(r,t,u,n))return t}});var Plugin,version="0.0.1",globals={logged:!1,version:version};function install(e,t){if(void 0===t&&(t={}),!this.installed){this.installed=!0;var n=t.config||{};for(var o in n)void 0!==Plugin.config[o]&&(Plugin.config[o]=n[o]);if(t.components&&Object.keys(t.components).forEach(function(n){var o=t.components[n];void 0===o.name||void 0===o.render&&void 0===o.mixins||e.component(o.name,o)}),t.directives&&Object.keys(t.directives).forEach(function(n){var o=t.directives[n];void 0!==o.name&&void 0!==o.unbind&&e.directive(o.name,o)}),t.plugins){var r={Plugin:Plugin,Vue:e,cfg:n};Object.keys(t.plugins).forEach(function(e){var n=t.plugins[e];"function"==typeof n.install&&n.install(r)})}e.prototype.$uloc?e.prototype.$uloc.erp=Plugin:e.prototype.$erp=Plugin}}var ErpLayout={name:"ErpLayout",props:{},provide:function(){return{layout:this.layout,erplayout:this}},data:function(){return{erpheader:null,erpcontainer:null}},computed:{computedClass:function(){return{}},computedStyle:function(){return{}}},created:function(){},beforeDestroy:function(){},watch:{},methods:{},render:function(e){return e("div",{staticClass:"u-erp-layout",class:this.computedClass,style:this.computedStyle},this.$slots.default)}},ErpHeader={name:"ErpHeader",inject:{layout:{default:function(){console.error("ErpHeader needs to be child of ULayout")}},erplayout:{default:function(){console.error("ErpHeader needs to be child of ErpLayout")}}},provide:function(){return{layout:this.layout,erplayout:this.erplayout,erpheader:this}},props:{},data:function(){return{menu:null,modulemenu:null}},computed:{computedClass:function(){return{}},computedStyle:function(){return{}}},created:function(){this.erplayout&&(this.erplayout.erpheader=this)},beforeDestroy:function(){},watch:{},methods:{getActualMenu:function(){return this.menu.getActiveMenu()},setMenuModuleToggle:function(e){this.modulemenu&&this.modulemenu.__toggleMenuModule(e)}},render:function(e){return e("div",{staticClass:"u-erp-header",class:this.computedClass,style:this.computedStyle},this.$slots.default)}},ErpMenu={name:"ErpMenu",inject:{erpheader:{default:function(){console.error("ModuleMenu needs to be child of ModuleHeader")}}},provide:function(){return{erpheader:this.erpheader,menu:this}},props:{},data:function(){return{activeMenu:null}},computed:{computedClass:function(){return{}},computedStyle:function(){return{}}},created:function(){this.erpheader&&(this.erpheader.menu=this)},beforeDestroy:function(){},watch:{},methods:{setActiveMenu:function(e){this.activeMenu=e,this.$emit("setActiveMenu",e)}},render:function(e){return e("div",{staticClass:"u-erp-menu",class:this.computedClass,style:this.computedStyle},[this.$slots.default])}},ErpMenuItem={name:"ErpMenuItem",props:{id:{type:String,required:!0},active:{type:Boolean,default:!1}},data:function(){return{}},computed:{computedClass:function(){return{selected:this.active}},computedStyle:function(){return{}}},created:function(){},beforeDestroy:function(){},watch:{},methods:{__onClick:function(e){this.$parent.menu.setActiveMenu(this.id),this.$emit("click",{event:e,id:this.id})}},render:function(e){return e("li",{staticClass:"",class:this.computedClass,style:this.computedStyle},[e("a",{on:{click:this.__onClick}},this.$slots.default)])}},ErpMenuItems={name:"ErpMenuItems",inject:{menu:{default:function(){console.error("MenuItem needs to be child of Menu")}}},props:{},data:function(){return{}},computed:{computedClass:function(){return{}},computedStyle:function(){return{}}},created:function(){},beforeDestroy:function(){},watch:{},methods:{},render:function(e){return e("ul",{staticClass:"u-erp-menu-items",class:this.computedClass,style:this.computedStyle},this.$slots.default)}},MenuAlerts={name:"MenuAlerts",props:{alerts:{type:Array,default:function(){return[]}}},data:function(){return{}},computed:{computedClass:function(){return{}},computedStyle:function(){return{}}},created:function(){},beforeDestroy:function(){},watch:{},methods:{},render:function(e){return e("div",{staticClass:"u-erp-menu-alerts",class:this.computedClass,style:this.computedStyle},[e("i",this.alerts.length),e("span","Avisos importantes")])}},MenuAccountInfo={name:"MenuAccountInfo",props:{user:{type:Object,required:!0}},data:function(){return{}},computed:{computedClass:function(){return{}},computedStyle:function(){return{}}},created:function(){},beforeDestroy:function(){},watch:{},methods:{},render:function(e){return e("div",{staticClass:"u-erp-account-info",class:this.computedClass,style:this.computedStyle},[e("div",{staticClass:"u-erp-account-img"},[e("a",[e("img",{attrs:{src:this.user.image}})])]),e("div",{staticClass:"u-erp-account-logout"},[e("a",{attrs:{href:"/#/logout"}},"Sair")])])}},MenuModule={name:"MenuModule",inject:{erpheader:{default:function(){console.error("ModuleMenu needs to be child of ModuleHeader")}}},props:{toggled:{type:Boolean,default:!1}},data:function(){return{toggledMenuModule:!1}},computed:{computedClass:function(){return{toggled:this.toggledMenuModule}},computedStyle:function(){return{}}},created:function(){this.erpheader&&(this.erpheader.modulemenu=this)},beforeDestroy:function(){},watch:{toggled:function(e){this.toggledMenuModule=e},toggledMenuModule:function(e){var t=this.$refs.toggleIcon;e?document.body.append(t):this.$el.append(t)}},methods:{__toggleMenuModule:function(e){"boolean"!=typeof e&&(e=!this.toggledMenuModule),document.body.classList.remove("u-erp-layout-menu-toggled"),this.toggledMenuModule=e,this.toggledMenuModule&&document.body.classList.add("u-erp-layout-menu-toggled")}},render:function(e){return e("div",{staticClass:"u-erp-module-menu",class:this.computedClass,style:this.computedStyle},[this.$slots.default,e("div",{ref:"toggleIcon",staticClass:"u-erp-module-toggle",class:{toggled:this.toggledMenuModule},on:{click:this.__toggleMenuModule}},[e("a",[e("img",{attrs:{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAMAAAAhxq8pAAAAb1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABeXl4AAAAAAAAWFhYrKyshISFlZWVmZmZgYGBhYWFeXl5XV1dZWVlNTU1cXFwrKysAAABjY2NaWlpdXV1QUFBSUlIyMjI0NDQkJCQdHR0AAACVUHsGAAAAJXRSTlMABQMPCSAcEw0rui8nN0c+8uzRx8Kbdm9uJBawl5SGglI7MSwaIpgUUgAAAIdJREFUGNOVj8cOgzAQBbPFZV1wQie9/f83BgUsmSNzedJoDruH3SDM4NYBj6Mhhk1mL7er08YWMdjTK0g6qrOFwr0lJh8Li9x8pKrrysdGGcYl7Ht5Oi+u8veHJljk1HazC8F1bVJmlTQNEtRXqyGGXCIbrbQh+g9jvpzIMgBbIobyR8yzix/UGwXDeqV2eAAAAABJRU5ErkJggg=="}})])])])}},MenuModuleComponent={name:"MenuModuleComponent",props:{label:{type:String},items:{type:Array},right:{type:Boolean,default:!1},hideLabel:{type:Boolean,default:!1}},data:function(){return{}},computed:{computedClass:function(){return{"u-erp-menu-right":this.right}},computedStyle:function(){return{}}},created:function(){},beforeDestroy:function(){},watch:{},methods:{},render:function(e){var t=[];return Array.isArray(this.items)&&this.items.length>0&&this.items.forEach(function(n){t.push(e("li",[e("a",[e("i",{staticClass:"erp-icon "+n.icon},[n.tip?e("div",{staticClass:"erp-module-item-tip"},n.tip):null]),e("span",n.name)])]))}),e("div",{staticClass:"u-erp-module-menu-component",class:this.computedClass,style:this.computedStyle},[this.label&&!this.hideLabel?e("div",{staticClass:"lbl"},this.label):null,e("div",{staticClass:"u-erp-module-menu-items"},t)])}},ErpLayoutContainer={name:"ErpLayoutContainer",inject:{layout:{default:function(){console.error("ErpLayoutContainer needs to be child of ULayout")}},erplayout:{default:function(){console.error("ErpLayoutContainer needs to be child of ErpLayout")}}},provide:function(){return{layout:this.layout,erplayout:this.erplayout,erpcontainer:this}},props:{},data:function(){return{}},computed:{computedClass:function(){return{}},computedStyle:function(){return{}}},created:function(){console.log(this.erplayout.erpheader)},beforeDestroy:function(){},watch:{},methods:{},render:function(e){return e("div",{staticClass:"u-erp-layout-container",class:this.computedClass,style:this.computedStyle},this.$slots.default)}},ErpLayoutBase={name:"ErpLayoutBase",props:{menuData:{type:Array,required:!0},defaultActiveMenu:{type:String,default:null},alerts:{type:Array,default:function(){return[]}},user:{type:Object,required:!0,validator:function(e){return e.image&&e.name}}},components:{ErpLayoutContainer:ErpLayoutContainer,MenuModuleComponent:MenuModuleComponent,MenuModule:MenuModule,MenuAccountInfo:MenuAccountInfo,MenuAlerts:MenuAlerts,ErpMenuItems:ErpMenuItems,ErpMenuItem:ErpMenuItem,ErpMenu:ErpMenu,ErpHeader:ErpHeader,ErpLayout:ErpLayout},data:function(){var e=this,t=this.menuData.filter(function(t){return t.id===e.defaultActiveMenu});return{activeMenu:t?t[0]:null}},computed:{menuComponents:function(){return this.menuData}},mounted:function(){this.$refs.menu.activeMenu=this.activeMenu.id},methods:{clickMenu:function(e,t){this.activeMenu=t,this.$emit("menuMoveCursor",t.id)},__selectMenuById:function(e){var t=this.menuData.filter(function(t){return t.id===e});Array.isArray(t)&&t.length>0&&(this.activeMenu=t[0])}},render:function(e){var t=this;return e(ErpLayout,[e(ErpHeader,[e(ErpMenu,{ref:"menu",on:{setActiveMenu:this.__selectMenuById}},[e(ErpMenuItems,this.menuComponents.map(function(n){return e(ErpMenuItem,{props:{id:n.id,active:t.activeMenu===n},on:{click:function(e){return t.clickMenu(e,n)}}},n.menuName)})),e(MenuAlerts,{props:{alerts:t.alerts}}),e(MenuAccountInfo,{props:{user:t.user}})]),e(MenuModule,this.activeMenu.components.map(function(t){return e(MenuModuleComponent,{props:{right:t.right,hideLabel:t.hideLabel,label:t.component,items:t.features}})}))]),e(ErpLayoutContainer,this.$slots.default)])}},index_esm={version:version,install:install,Plugin:globals};export default index_esm;export{ErpLayout,ErpLayoutBase,ErpHeader as Header,ErpLayoutContainer as LayoutContainer,ErpMenu as Menu,MenuAccountInfo,MenuAlerts,ErpMenuItem as MenuItem,ErpMenuItems as MenuItems,MenuModule,MenuModuleComponent,globals as Plugin};