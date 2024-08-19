"use strict";(self.webpackChunk=self.webpackChunk||[]).push([["sgate-webcheckout-s-w6"],{6379:(e,t,n)=>{var i=n(6285);function r(e,t,n){return(t=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,t||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}class s{constructor(e){r(this,"active",!0),r(this,"pluginName","Shopgate Webcheckout Plugin"),r(this,"isDev",!1),this.isDev=e}supports(e,t,n){return console.warn(`[${this.pluginName}] Method 'supports' was not overridden by "`+this.constructor.name+'". Default return set to false.'),!1}execute(){console.warn(`[${this.pluginName}] Method 'execute' was not overridden by "`+this.constructor.name+'".')}disable(){this.active=!1}log(e){this.isDev&&console.warn(this.pluginName+": "+e)}}class o extends s{supports(e,t,n){return"sgwebcheckout"===e&&"login"===t||"checkout"===e&&"cartpage"===t}execute(e){window.SGAppConnector.sendAppCommand({c:"broadcastEvent",p:{event:"closeInAppBrowser",parameters:[{redirectTo:"/"}]}})}}class a extends s{supports(e,t,n){const i="checkout"===e&&"confirmpage"===t;return"sgwebcheckout"===e&&"registered"===t||!n.guest&&i&&n.referer.includes("checkout/register")}execute(e){e?window.SGAppConnector.sendPipelineRequest("shopgate.user.loginUser.v1",!0,{strategy:"auth_code",parameters:{code:e.token}},(function(){window.SGAppConnector.sendAppCommands([{c:"broadcastEvent",p:{event:"userLoggedIn"}}])}),[]):this.log("Login success, but no context token is passed from twig template")}}class c extends s{supports(e,t,n){return"checkout"===e&&"finishpage"===t}execute(e){e||this.log("Checkout success, but order parameters are empty"),window.SGAppConnector.sendAppCommands([{c:"broadcastEvent",p:{event:"checkoutSuccess",parameters:[e]}},{c:"setNavigationBarParams",p:{navigationBarParams:{leftButton:!1,rightButton:!0,rightButtonType:"close",rightButtonCallback:"SGAction.broadcastEvent({event: 'closeInAppBrowser','parameters': [{'redirectTo': '/'}]});"}}}])}}class p extends a{supports(e,t,n){const i=super.supports(e,t,n);return n&&n.syncToken&&n.token&&!i}execute(e){window.SGAppConnector.sendPipelineRequest("apite.user.setContextToken.v1",!0,{contextToken:e.token},(function(){}),[])}}class u{constructor(e,t,n,i){this.controllerName=e,this.actionName=t,this.properties=n,this.isDev="dev"===i,this.events=[]}registerDefaultEvents(){this.registerEvent(o),this.registerEvent(a),this.registerEvent(c),this.registerEvent(p)}registerEvent(e){this.events.push(new e(this.isDev))}executeEvents(){this.events.forEach((e=>{e.supports(this.controllerName,this.actionName,this.properties)&&e.active&&(e.log("Executing event > "+e.constructor.name),e.execute(this.properties))}))}disableEvents(){this.events.forEach((e=>{e.disable()}))}}function l(e,t,n){return(t=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,t||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}class d extends i.Z{constructor(...e){super(...e),l(this,"options",{controllerName:null,actionName:null,properties:null,env:null,isSgWebView:!1,referer:""})}init(){const{controllerName:e,actionName:t,properties:n,env:i,isSgWebView:r}=this.options;this.eventManager=new u(e,t,n,i),this.devMode=r,this.enableShopgateAppEvents(),this.initSGBridge(this.devMode),this.executeWithRetry(40,3e3,this.initShopgateApp.bind(this))}enableShopgateAppEvents(){const e="libshopgate";if(document.getElementById(e))return;const t=document.createElement("meta");t.setAttribute("id",e),t.src=e,document.getElementsByTagName("head").item(0).appendChild(t)}executeWithRetry(e,t,n){const i=Date.now();if(n())return;const r=setInterval((function(){(i+t<=Date.now()||n())&&clearInterval(r)}),e)}initShopgateApp(){return!(!window.SGJavascriptBridge&&!this.devMode)&&(this.eventManager.registerDefaultEvents(),this.eventManager.executeEvents(),setTimeout((function(){window.SGAppConnector.closeLoadingSpinner()}),3e3),!0)}initSGBridge(e){window.SGAppConnector={pipelineResponseHandler:{},functionExists:function(e){return"function"==typeof e},sendAppCommands:function(e){this.mockDev(e);const t="12.0";"dispatchCommandsForVersion"in window.SGJavascriptBridge?window.SGJavascriptBridge.dispatchCommandsForVersion(e,t):window.SGJavascriptBridge.dispatchCommandsStringForVersion(JSON.stringify(e),t)},sendAppCommand:function(e){this.sendAppCommands([e])},closeLoadingSpinner:function(){this.sendAppCommand({c:"onload"})},sendPipelineRequest:function(e,t,n,i,r){n||(n={}),r||(r=null);const s={c:"sendPipelineRequest",p:{serial:e,name:e,input:n}};t&&(s.p.type="trusted"),this.pipelineResponseHandler[e]={callbackParams:r,__call:function(t,n,r){if(window.SGAppConnector.functionExists(i))return console.log("## running response callback for pipeline call: "+e),i(t,n,r);console.log("## no callback registered for pipeline call: "+e)}},this.sendAppCommand(s)},mockDev:function(t){const n=e=>console.log(JSON.stringify(e));e&&(window.SGJavascriptBridge?n(t):window.SGJavascriptBridge={dispatchCommandsForVersion:n})}},window.SGEvent={__call:function(e,t){console.log("# Received event "+e),t&&Array.isArray(t)||(t=[]),SGEvent[e]&&SGEvent[e].apply(SGEvent,t)},pipelineResponse:function(e,t,n){if(e&&console.error("Called pipeline '"+t+"' resulted in an error: "+JSON.stringify(e)),window.SGAppConnector.pipelineResponseHandler[t]){const i=window.SGAppConnector.pipelineResponseHandler[t];return i.__call(e,n,i.callbackParams)}},isDocumentReady:function(){return!0}}}}window.PluginManager.register("SgWebcheckoutAppPlugin",d,"[data-sg-webcheckout-app-plugin]")}},e=>{e.O(0,["vendor-node","vendor-shared"],(()=>{return t=6379,e(e.s=t);var t}));e.O()}]);