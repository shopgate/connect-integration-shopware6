(()=>{"use strict";var e={857:e=>{var t=function(e){var t;return!!e&&"object"==typeof e&&"[object RegExp]"!==(t=Object.prototype.toString.call(e))&&"[object Date]"!==t&&e.$$typeof!==r},r="function"==typeof Symbol&&Symbol.for?Symbol.for("react.element"):60103;function n(e,t){return!1!==t.clone&&t.isMergeableObject(e)?a(Array.isArray(e)?[]:{},e,t):e}function i(e,t,r){return e.concat(t).map(function(e){return n(e,r)})}function s(e){return Object.keys(e).concat(Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e).filter(function(t){return Object.propertyIsEnumerable.call(e,t)}):[])}function o(e,t){try{return t in e}catch(e){return!1}}function a(e,r,c){(c=c||{}).arrayMerge=c.arrayMerge||i,c.isMergeableObject=c.isMergeableObject||t,c.cloneUnlessOtherwiseSpecified=n;var l,u,p=Array.isArray(r);return p!==Array.isArray(e)?n(r,c):p?c.arrayMerge(e,r,c):(u={},(l=c).isMergeableObject(e)&&s(e).forEach(function(t){u[t]=n(e[t],l)}),s(r).forEach(function(t){(!o(e,t)||Object.hasOwnProperty.call(e,t)&&Object.propertyIsEnumerable.call(e,t))&&(o(e,t)&&l.isMergeableObject(r[t])?u[t]=(function(e,t){if(!t.customMerge)return a;var r=t.customMerge(e);return"function"==typeof r?r:a})(t,l)(e[t],r[t],l):u[t]=n(r[t],l))}),u)}a.all=function(e,t){if(!Array.isArray(e))throw Error("first argument should be an array");return e.reduce(function(e,r){return a(e,r,t)},{})},e.exports=a}},t={};function r(n){var i=t[n];if(void 0!==i)return i.exports;var s=t[n]={exports:{}};return e[n](s,s.exports,r),s.exports}(()=>{r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t}})(),(()=>{r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}})(),(()=>{r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})(),(()=>{var e=r(857),t=r.n(e);class n{static ucFirst(e){return e.charAt(0).toUpperCase()+e.slice(1)}static lcFirst(e){return e.charAt(0).toLowerCase()+e.slice(1)}static toDashCase(e){return e.replace(/([A-Z])/g,"-$1").replace(/^-/,"").toLowerCase()}static toLowerCamelCase(e,t){let r=n.toUpperCamelCase(e,t);return n.lcFirst(r)}static toUpperCamelCase(e,t){return t?e.split(t).map(e=>n.ucFirst(e.toLowerCase())).join(""):n.ucFirst(e.toLowerCase())}static parsePrimitive(e){try{return/^\d+(.|,)\d+$/.test(e)&&(e=e.replace(",",".")),JSON.parse(e)}catch(t){return e.toString()}}}class i{static isNode(e){return"object"==typeof e&&null!==e&&(e===document||e===window||e instanceof Node)}static hasAttribute(e,t){if(!i.isNode(e))throw Error("The element must be a valid HTML Node!");return"function"==typeof e.hasAttribute&&e.hasAttribute(t)}static getAttribute(e,t){let r=!(arguments.length>2)||void 0===arguments[2]||arguments[2];if(r&&!1===i.hasAttribute(e,t))throw Error('The required property "'.concat(t,'" does not exist!'));if("function"!=typeof e.getAttribute){if(r)throw Error("This node doesn't support the getAttribute function!");return}return e.getAttribute(t)}static getDataAttribute(e,t){let r=!(arguments.length>2)||void 0===arguments[2]||arguments[2],s=t.replace(/^data(|-)/,""),o=n.toLowerCamelCase(s,"-");if(!i.isNode(e)){if(r)throw Error("The passed node is not a valid HTML Node!");return}if(void 0===e.dataset){if(r)throw Error("This node doesn't support the dataset attribute!");return}let a=e.dataset[o];if(void 0===a){if(r)throw Error('The required data attribute "'.concat(t,'" does not exist on ').concat(e,"!"));return a}return n.parsePrimitive(a)}static querySelector(e,t){let r=!(arguments.length>2)||void 0===arguments[2]||arguments[2];if(r&&!i.isNode(e))throw Error("The parent node is not a valid HTML Node!");let n=e.querySelector(t)||!1;if(r&&!1===n)throw Error('The required element "'.concat(t,'" does not exist in parent node!'));return n}static querySelectorAll(e,t){let r=!(arguments.length>2)||void 0===arguments[2]||arguments[2];if(r&&!i.isNode(e))throw Error("The parent node is not a valid HTML Node!");let n=e.querySelectorAll(t);if(0===n.length&&(n=!1),r&&!1===n)throw Error('At least one item of "'.concat(t,'" must exist in parent node!'));return n}}class s{publish(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=new CustomEvent(e,{detail:t,cancelable:r});return this.el.dispatchEvent(n),n}subscribe(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=this,i=e.split("."),s=r.scope?t.bind(r.scope):t;if(r.once&&!0===r.once){let t=s;s=function(r){n.unsubscribe(e),t(r)}}return this.el.addEventListener(i[0],s),this.listeners.push({splitEventName:i,opts:r,cb:s}),!0}unsubscribe(e){let t=e.split(".");return this.listeners=this.listeners.reduce((e,r)=>([...r.splitEventName].sort().toString()===t.sort().toString()?this.el.removeEventListener(r.splitEventName[0],r.cb):e.push(r),e),[]),!0}reset(){return this.listeners.forEach(e=>{this.el.removeEventListener(e.splitEventName[0],e.cb)}),this.listeners=[],!0}get el(){return this._el}set el(e){this._el=e}get listeners(){return this._listeners}set listeners(e){this._listeners=e}constructor(e=document){this._el=e,e.$emitter=this,this._listeners=[]}}class o{init(){throw Error('The "init" method for the plugin "'.concat(this._pluginName,'" is not defined.'))}update(){}_init(){this._initialized||(this.init(),this._initialized=!0)}_update(){this._initialized&&this.update()}_mergeOptions(e){let r=n.toDashCase(this._pluginName),s=i.getDataAttribute(this.el,"data-".concat(r,"-config"),!1),o=i.getAttribute(this.el,"data-".concat(r,"-options"),!1),a=[this.constructor.options,this.options,e];s&&a.push(window.PluginConfigManager.get(this._pluginName,s));try{o&&a.push(JSON.parse(o))}catch(e){throw console.error(this.el),Error('The data attribute "data-'.concat(r,'-options" could not be parsed to json: ').concat(e.message))}return t().all(a.filter(e=>e instanceof Object&&!(e instanceof Array)).map(e=>e||{}))}_registerInstance(){window.PluginManager.getPluginInstancesFromElement(this.el).set(this._pluginName,this),window.PluginManager.getPlugin(this._pluginName,!1).get("instances").push(this)}_getPluginName(e){return e||(e=this.constructor.name),e}constructor(e,t={},r=!1){if(!i.isNode(e))throw Error("There is no valid element given.");this.el=e,this.$emitter=new s(this.el),this._pluginName=this._getPluginName(r),this.options=this._mergeOptions(t),this._initialized=!1,this._registerInstance(),this._init()}}class a{supports(e,t,r){return console.warn("[".concat(this.pluginName,"] Method 'supports' was not overridden by \"")+this.constructor.name+'". Default return set to false.'),!1}execute(){console.warn("[".concat(this.pluginName,"] Method 'execute' was not overridden by \"")+this.constructor.name+'".')}disable(){this.active=!1}log(e){this.isDev&&console.warn(this.pluginName+": "+e)}constructor(e){this.active=!0,this.pluginName="Shopgate Webcheckout Plugin",this.isDev=!1,this.isDev=e}}class c extends a{supports(e,t,r){return"sgwebcheckout"===e&&"login"===t||"checkout"===e&&"cartpage"===t}execute(e){window.SGAppConnector.sendAppCommand({c:"broadcastEvent",p:{event:"closeInAppBrowser",parameters:[{redirectTo:"/"}]}})}}class l extends a{supports(e,t,r){return"sgwebcheckout"===e&&"registered"===t||!r.guest&&"checkout"===e&&"confirmpage"===t&&r.referer.includes("checkout/register")}execute(e){e||this.log("Login success, but no context token is passed from twig template"),window.SGAppConnector.sendPipelineRequest("shopgate.user.loginUser.v1",!0,{strategy:"auth_code",parameters:{code:e.token}},function(){window.SGAppConnector.sendAppCommands([{c:"broadcastEvent",p:{event:"userLoggedIn"}}])},[])}}class u extends a{supports(e,t,r){return"checkout"===e&&"finishpage"===t}execute(e){e||this.log("Checkout success, but order parameters are empty"),window.SGAppConnector.sendAppCommands([{c:"broadcastEvent",p:{event:"checkoutSuccess",parameters:[e]}},{c:"setNavigationBarParams",p:{navigationBarParams:{leftButton:!1,rightButton:!0,rightButtonType:"close",rightButtonCallback:"SGAction.broadcastEvent({event: 'closeInAppBrowser','parameters': [{'redirectTo': '/'}]});"}}}])}}class p{registerDefaultEvents(){this.registerEvent(c),this.registerEvent(l),this.registerEvent(u)}registerEvent(e){this.events.push(new e(this.isDev))}executeEvents(){this.events.forEach(e=>{e.supports(this.controllerName,this.actionName,this.properties)&&e.active&&(e.log("Executing event > "+e.constructor.name),e.execute(this.properties))})}disableEvents(){this.events.forEach(e=>{e.disable()})}constructor(e,t,r,n){this.controllerName=e,this.actionName=t,this.properties=r,this.isDev="dev"===n,this.events=[]}}window.PluginManager.register("SgWebcheckoutAppPlugin",class extends o{init(){let{controllerName:e,actionName:t,properties:r,env:n,isSgWebView:i}=this.options;this.eventManager=new p(e,t,r,n),this.devMode=i,this.enableShopgateAppEvents(),this.initSGBridge(this.devMode),this.executeWithRetry(40,3e3,this.initShopgateApp.bind(this))}enableShopgateAppEvents(){let e="libshopgate";if(document.getElementById(e))return;let t=document.createElement("meta");t.setAttribute("id",e),t.src=e,document.getElementsByTagName("head").item(0).appendChild(t)}executeWithRetry(e,t,r){let n=Date.now();if(r())return;let i=setInterval(function(){if(n+t<=Date.now()){clearInterval(i);return}r()&&clearInterval(i)},e)}initShopgateApp(){return(!!window.SGJavascriptBridge||!!this.devMode)&&(this.eventManager.registerDefaultEvents(),this.eventManager.executeEvents(),setTimeout(function(){window.SGAppConnector.closeLoadingSpinner()},3e3),!0)}initSGBridge(e){window.SGAppConnector={pipelineResponseHandler:{},functionExists:function(e){return"function"==typeof e},sendAppCommands:function(e){this.mockDev(e);let t="12.0";"dispatchCommandsForVersion"in window.SGJavascriptBridge?window.SGJavascriptBridge.dispatchCommandsForVersion(e,t):window.SGJavascriptBridge.dispatchCommandsStringForVersion(JSON.stringify(e),t)},sendAppCommand:function(e){this.sendAppCommands([e])},closeLoadingSpinner:function(){this.sendAppCommand({c:"onload"})},sendPipelineRequest:function(e,t,r,n,i){r||(r={}),i||(i=null);let s={c:"sendPipelineRequest",p:{serial:e,name:e,input:r}};t&&(s.p.type="trusted"),this.pipelineResponseHandler[e]={callbackParams:i,__call:function(t,r,i){if(!window.SGAppConnector.functionExists(n)){console.log("## no callback registered for pipeline call: "+e);return}return console.log("## running response callback for pipeline call: "+e),n(t,r,i)}},this.sendAppCommand(s)},mockDev:function(t){let r=e=>console.log(JSON.stringify(e));e&&(window.SGJavascriptBridge?r(t):window.SGJavascriptBridge={dispatchCommandsForVersion:r})}},window.SGEvent={__call:function(e,t){console.log("# Received event "+e),t&&Array.isArray(t)||(t=[]),SGEvent[e]&&SGEvent[e].apply(SGEvent,t)},pipelineResponse:function(e,t,r){if(e&&console.error("Called pipeline '"+t+"' resulted in an error: "+JSON.stringify(e)),window.SGAppConnector.pipelineResponseHandler[t]){let n=window.SGAppConnector.pipelineResponseHandler[t];return n.__call(e,r,n.callbackParams)}},isDocumentReady:function(){return!0}}}constructor(...e){super(...e),this.options={controllerName:null,actionName:null,properties:null,env:null,isSgWebView:!1,referer:""}}},"[data-sg-webcheckout-app-plugin]")})()})();