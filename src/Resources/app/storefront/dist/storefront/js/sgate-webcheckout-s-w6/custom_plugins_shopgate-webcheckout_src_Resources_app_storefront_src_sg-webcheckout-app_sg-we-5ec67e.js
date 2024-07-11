"use strict";(self.webpackChunk=self.webpackChunk||[]).push([["custom_plugins_shopgate-webcheckout_src_Resources_app_storefront_src_sg-webcheckout-app_sg-we-5ec67e"],{193:(e,t,n)=>{n.r(t),n.d(t,{default:()=>p});class s{supports(e,t,n){return console.warn("[".concat(this.pluginName,"] Method 'supports' was not overridden by \"")+this.constructor.name+'". Default return set to false.'),!1}execute(){console.warn("[".concat(this.pluginName,"] Method 'execute' was not overridden by \"")+this.constructor.name+'".')}disable(){this.active=!1}log(e){this.isDev&&console.warn(this.pluginName+": "+e)}constructor(e){this.active=!0,this.pluginName="Shopgate Webcheckout Plugin",this.isDev=!1,this.isDev=e}}class i extends s{supports(e,t,n){return"sgwebcheckout"===e&&"login"===t||"checkout"===e&&"cartpage"===t}execute(e){window.SGAppConnector.sendAppCommand({c:"broadcastEvent",p:{event:"closeInAppBrowser",parameters:[{redirectTo:"/"}]}})}}class o extends s{supports(e,t,n){return"sgwebcheckout"===e&&"registered"===t||!n.guest&&"checkout"===e&&"confirmpage"===t&&n.referer.includes("checkout/register")}execute(e){e||this.log("Login success, but no context token is passed from twig template"),window.SGAppConnector.sendPipelineRequest("shopgate.user.loginUser.v1",!0,{strategy:"auth_code",parameters:{code:e.token}},function(){window.SGAppConnector.sendAppCommands([{c:"broadcastEvent",p:{event:"userLoggedIn"}}])},[])}}class r extends s{supports(e,t,n){return"checkout"===e&&"finishpage"===t}execute(e){e||this.log("Checkout success, but order parameters are empty"),window.SGAppConnector.sendAppCommands([{c:"broadcastEvent",p:{event:"checkoutSuccess",parameters:[e]}},{c:"setNavigationBarParams",p:{navigationBarParams:{leftButton:!1,rightButton:!0,rightButtonType:"close",rightButtonCallback:"SGAction.broadcastEvent({event: 'closeInAppBrowser','parameters': [{'redirectTo': '/'}]});"}}}])}}class a extends o{supports(e,t,n){let s=super.supports(e,t,n);return n&&n.syncToken&&n.token&&!s}execute(e){window.SGAppConnector.sendPipelineRequest("apite.user.setContextToken.v1",!0,{contextToken:e.token},function(){},[])}}class c{registerDefaultEvents(){this.registerEvent(i),this.registerEvent(o),this.registerEvent(r),this.registerEvent(a)}registerEvent(e){this.events.push(new e(this.isDev))}executeEvents(){this.events.forEach(e=>{e.supports(this.controllerName,this.actionName,this.properties)&&e.active&&(e.log("Executing event > "+e.constructor.name),e.execute(this.properties))})}disableEvents(){this.events.forEach(e=>{e.disable()})}constructor(e,t,n,s){this.controllerName=e,this.actionName=t,this.properties=n,this.isDev="dev"===s,this.events=[]}}class p extends window.PluginBaseClass{init(){let{controllerName:e,actionName:t,properties:n,env:s,isSgWebView:i}=this.options;this.eventManager=new c(e,t,n,s),this.devMode=i,this.enableShopgateAppEvents(),this.initSGBridge(this.devMode),this.executeWithRetry(40,3e3,this.initShopgateApp.bind(this))}enableShopgateAppEvents(){let e="libshopgate";if(document.getElementById(e))return;let t=document.createElement("meta");t.setAttribute("id",e),t.src=e,document.getElementsByTagName("head").item(0).appendChild(t)}executeWithRetry(e,t,n){let s=Date.now();if(n())return;let i=setInterval(function(){if(s+t<=Date.now()){clearInterval(i);return}n()&&clearInterval(i)},e)}initShopgateApp(){return(!!window.SGJavascriptBridge||!!this.devMode)&&(this.eventManager.registerDefaultEvents(),this.eventManager.executeEvents(),setTimeout(function(){window.SGAppConnector.closeLoadingSpinner()},3e3),!0)}initSGBridge(e){window.SGAppConnector={pipelineResponseHandler:{},functionExists:function(e){return"function"==typeof e},sendAppCommands:function(e){this.mockDev(e);let t="12.0";"dispatchCommandsForVersion"in window.SGJavascriptBridge?window.SGJavascriptBridge.dispatchCommandsForVersion(e,t):window.SGJavascriptBridge.dispatchCommandsStringForVersion(JSON.stringify(e),t)},sendAppCommand:function(e){this.sendAppCommands([e])},closeLoadingSpinner:function(){this.sendAppCommand({c:"onload"})},sendPipelineRequest:function(e,t,n,s,i){n||(n={}),i||(i=null);let o={c:"sendPipelineRequest",p:{serial:e,name:e,input:n}};t&&(o.p.type="trusted"),this.pipelineResponseHandler[e]={callbackParams:i,__call:function(t,n,i){if(!window.SGAppConnector.functionExists(s)){console.log("## no callback registered for pipeline call: "+e);return}return console.log("## running response callback for pipeline call: "+e),s(t,n,i)}},this.sendAppCommand(o)},mockDev:function(t){let n=e=>console.log(JSON.stringify(e));e&&(window.SGJavascriptBridge?n(t):window.SGJavascriptBridge={dispatchCommandsForVersion:n})}},window.SGEvent={__call:function(e,t){console.log("# Received event "+e),t&&Array.isArray(t)||(t=[]),SGEvent[e]&&SGEvent[e].apply(SGEvent,t)},pipelineResponse:function(e,t,n){if(e&&console.error("Called pipeline '"+t+"' resulted in an error: "+JSON.stringify(e)),window.SGAppConnector.pipelineResponseHandler[t]){let s=window.SGAppConnector.pipelineResponseHandler[t];return s.__call(e,n,s.callbackParams)}},isDocumentReady:function(){return!0}}}constructor(...e){super(...e),this.options={controllerName:null,actionName:null,properties:null,env:null,isSgWebView:!1,referer:""}}}}}]);