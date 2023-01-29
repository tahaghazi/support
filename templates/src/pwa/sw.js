try{self["workbox:core:6.5.3"]&&_()}catch{}const V=(s,...e)=>{let t=s;return e.length>0&&(t+=` :: ${JSON.stringify(e)}`),t},G=V;class l extends Error{constructor(e,t){const n=G(e,t);super(n),this.name=e,this.details=t}}const Q=new Set,f={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:typeof registration<"u"?registration.scope:""},k=s=>[f.prefix,s,f.suffix].filter(e=>e&&e.length>0).join("-"),z=s=>{for(const e of Object.keys(f))s(e)},C={updateDetails:s=>{z(e=>{typeof s[e]=="string"&&(f[e]=s[e])})},getGoogleAnalyticsName:s=>s||k(f.googleAnalytics),getPrecacheName:s=>s||k(f.precache),getPrefix:()=>f.prefix,getRuntimeName:s=>s||k(f.runtime),getSuffix:()=>f.suffix};function O(s,e){const t=new URL(s);for(const n of e)t.searchParams.delete(n);return t.href}async function J(s,e,t,n){const a=O(e.url,t);if(e.url===a)return s.match(e,n);const r=Object.assign(Object.assign({},n),{ignoreSearch:!0}),c=await s.keys(e,r);for(const i of c){const o=O(i.url,t);if(a===o)return s.match(i,n)}}let g;function X(){if(g===void 0){const s=new Response("");if("body"in s)try{new Response(s.body),g=!0}catch{g=!1}g=!1}return g}class Y{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}async function Z(){for(const s of Q)await s()}const ee=s=>new URL(String(s),location.href).href.replace(new RegExp(`^${location.origin}`),"");function j(s){return new Promise(e=>setTimeout(e,s))}function S(s,e){const t=e();return s.waitUntil(t),t}async function te(s,e){let t=null;if(s.url&&(t=new URL(s.url).origin),t!==self.location.origin)throw new l("cross-origin-copy-response",{origin:t});const n=s.clone(),a={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},r=e?e(a):a,c=X()?n.body:await n.blob();return new Response(c,r)}function se(){self.addEventListener("activate",()=>self.clients.claim())}try{self["workbox:routing:6.5.3"]&&_()}catch{}const B="GET",b=s=>s&&typeof s=="object"?s:{handle:s};class w{constructor(e,t,n=B){this.handler=b(t),this.match=e,this.method=n}setCatchHandler(e){this.catchHandler=b(e)}}class ne extends w{constructor(e,t,n){const a=({url:r})=>{const c=e.exec(r.href);if(!!c&&!(r.origin!==location.origin&&c.index!==0))return c.slice(1)};super(a,t,n)}}class ae{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,n=this.handleRequest({request:t,event:e});n&&e.respondWith(n)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&e.data.type==="CACHE_URLS"){const{payload:t}=e.data,n=Promise.all(t.urlsToCache.map(a=>{typeof a=="string"&&(a=[a]);const r=new Request(...a);return this.handleRequest({request:r,event:e})}));e.waitUntil(n),e.ports&&e.ports[0]&&n.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const n=new URL(e.url,location.href);if(!n.protocol.startsWith("http"))return;const a=n.origin===location.origin,{params:r,route:c}=this.findMatchingRoute({event:t,request:e,sameOrigin:a,url:n});let i=c&&c.handler;const o=e.method;if(!i&&this._defaultHandlerMap.has(o)&&(i=this._defaultHandlerMap.get(o)),!i)return;let h;try{h=i.handle({url:n,request:e,event:t,params:r})}catch(u){h=Promise.reject(u)}const p=c&&c.catchHandler;return h instanceof Promise&&(this._catchHandler||p)&&(h=h.catch(async u=>{if(p)try{return await p.handle({url:n,request:e,event:t,params:r})}catch(v){v instanceof Error&&(u=v)}if(this._catchHandler)return this._catchHandler.handle({url:n,request:e,event:t});throw u})),h}findMatchingRoute({url:e,sameOrigin:t,request:n,event:a}){const r=this._routes.get(n.method)||[];for(const c of r){let i;const o=c.match({url:e,sameOrigin:t,request:n,event:a});if(o)return i=o,(Array.isArray(i)&&i.length===0||o.constructor===Object&&Object.keys(o).length===0||typeof o=="boolean")&&(i=void 0),{route:c,params:i}}return{}}setDefaultHandler(e,t=B){this._defaultHandlerMap.set(t,b(e))}setCatchHandler(e){this._catchHandler=b(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new l("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(t>-1)this._routes.get(e.method).splice(t,1);else throw new l("unregister-route-route-not-registered")}}let y;const D=()=>(y||(y=new ae,y.addFetchListener(),y.addCacheListener()),y);function H(s,e,t){let n;if(typeof s=="string"){const r=new URL(s,location.href),c=({url:i})=>i.href===r.href;n=new w(c,e,t)}else if(s instanceof RegExp)n=new ne(s,e,t);else if(typeof s=="function")n=new w(s,e,t);else if(s instanceof w)n=s;else throw new l("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});return D().registerRoute(n),n}try{self["workbox:strategies:6.5.3"]&&_()}catch{}const re={cacheWillUpdate:async({response:s})=>s.status===200||s.status===0?s:null};function R(s){return typeof s=="string"?new Request(s):s}class ce{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new Y,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const n of this._plugins)this._pluginStateMap.set(n,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:t}=this;let n=R(e);if(n.mode==="navigate"&&t instanceof FetchEvent&&t.preloadResponse){const c=await t.preloadResponse;if(c)return c}const a=this.hasCallback("fetchDidFail")?n.clone():null;try{for(const c of this.iterateCallbacks("requestWillFetch"))n=await c({request:n.clone(),event:t})}catch(c){if(c instanceof Error)throw new l("plugin-error-request-will-fetch",{thrownErrorMessage:c.message})}const r=n.clone();try{let c;c=await fetch(n,n.mode==="navigate"?void 0:this._strategy.fetchOptions);for(const i of this.iterateCallbacks("fetchDidSucceed"))c=await i({event:t,request:r,response:c});return c}catch(c){throw a&&await this.runCallbacks("fetchDidFail",{error:c,event:t,originalRequest:a.clone(),request:r.clone()}),c}}async fetchAndCachePut(e){const t=await this.fetch(e),n=t.clone();return this.waitUntil(this.cachePut(e,n)),t}async cacheMatch(e){const t=R(e);let n;const{cacheName:a,matchOptions:r}=this._strategy,c=await this.getCacheKey(t,"read"),i=Object.assign(Object.assign({},r),{cacheName:a});n=await caches.match(c,i);for(const o of this.iterateCallbacks("cachedResponseWillBeUsed"))n=await o({cacheName:a,matchOptions:r,cachedResponse:n,request:c,event:this.event})||void 0;return n}async cachePut(e,t){const n=R(e);await j(0);const a=await this.getCacheKey(n,"write");if(!t)throw new l("cache-put-with-no-response",{url:ee(a.url)});const r=await this._ensureResponseSafeToCache(t);if(!r)return!1;const{cacheName:c,matchOptions:i}=this._strategy,o=await self.caches.open(c),h=this.hasCallback("cacheDidUpdate"),p=h?await J(o,a.clone(),["__WB_REVISION__"],i):null;try{await o.put(a,h?r.clone():r)}catch(u){if(u instanceof Error)throw u.name==="QuotaExceededError"&&await Z(),u}for(const u of this.iterateCallbacks("cacheDidUpdate"))await u({cacheName:c,oldResponse:p,newResponse:r.clone(),request:a,event:this.event});return!0}async getCacheKey(e,t){const n=`${e.url} | ${t}`;if(!this._cacheKeys[n]){let a=e;for(const r of this.iterateCallbacks("cacheKeyWillBeUsed"))a=R(await r({mode:t,request:a,event:this.event,params:this.params}));this._cacheKeys[n]=a}return this._cacheKeys[n]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const n of this.iterateCallbacks(e))await n(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if(typeof t[e]=="function"){const n=this._pluginStateMap.get(t);yield r=>{const c=Object.assign(Object.assign({},r),{state:n});return t[e](c)}}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,n=!1;for(const a of this.iterateCallbacks("cacheWillUpdate"))if(t=await a({request:this.request,response:t,event:this.event})||void 0,n=!0,!t)break;return n||t&&t.status!==200&&(t=void 0),t}}class x{constructor(e={}){this.cacheName=C.getRuntimeName(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,n=typeof e.request=="string"?new Request(e.request):e.request,a="params"in e?e.params:void 0,r=new ce(this,{event:t,request:n,params:a}),c=this._getResponse(r,n,t),i=this._awaitComplete(c,r,n,t);return[c,i]}async _getResponse(e,t,n){await e.runCallbacks("handlerWillStart",{event:n,request:t});let a;try{if(a=await this._handle(t,e),!a||a.type==="error")throw new l("no-response",{url:t.url})}catch(r){if(r instanceof Error){for(const c of e.iterateCallbacks("handlerDidError"))if(a=await c({error:r,event:n,request:t}),a)break}if(!a)throw r}for(const r of e.iterateCallbacks("handlerWillRespond"))a=await r({event:n,request:t,response:a});return a}async _awaitComplete(e,t,n,a){let r,c;try{r=await e}catch{}try{await t.runCallbacks("handlerDidRespond",{event:a,request:n,response:r}),await t.doneWaiting()}catch(i){i instanceof Error&&(c=i)}if(await t.runCallbacks("handlerDidComplete",{event:a,request:n,response:r,error:c}),t.destroy(),c)throw c}}class ie extends x{constructor(e={}){super(e),this.plugins.some(t=>"cacheWillUpdate"in t)||this.plugins.unshift(re)}async _handle(e,t){const n=t.fetchAndCachePut(e).catch(()=>{});t.waitUntil(n);let a=await t.cacheMatch(e),r;if(!a)try{a=await n}catch(c){c instanceof Error&&(r=c)}if(!a)throw new l("no-response",{url:e.url,error:r});return a}}try{self["workbox:cacheable-response:6.5.3"]&&_()}catch{}class oe{constructor(e={}){this._statuses=e.statuses,this._headers=e.headers}isResponseCacheable(e){let t=!0;return this._statuses&&(t=this._statuses.includes(e.status)),this._headers&&t&&(t=Object.keys(this._headers).some(n=>e.headers.get(n)===this._headers[n])),t}}class le{constructor(e){this.cacheWillUpdate=async({response:t})=>this._cacheableResponse.isResponseCacheable(t)?t:null,this._cacheableResponse=new oe(e)}}const he=(s,e)=>e.some(t=>s instanceof t);let A,W;function ue(){return A||(A=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function fe(){return W||(W=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const q=new WeakMap,K=new WeakMap,$=new WeakMap,U=new WeakMap,M=new WeakMap;function de(s){const e=new Promise((t,n)=>{const a=()=>{s.removeEventListener("success",r),s.removeEventListener("error",c)},r=()=>{t(m(s.result)),a()},c=()=>{n(s.error),a()};s.addEventListener("success",r),s.addEventListener("error",c)});return e.then(t=>{t instanceof IDBCursor&&q.set(t,s)}).catch(()=>{}),M.set(e,s),e}function pe(s){if(K.has(s))return;const e=new Promise((t,n)=>{const a=()=>{s.removeEventListener("complete",r),s.removeEventListener("error",c),s.removeEventListener("abort",c)},r=()=>{t(),a()},c=()=>{n(s.error||new DOMException("AbortError","AbortError")),a()};s.addEventListener("complete",r),s.addEventListener("error",c),s.addEventListener("abort",c)});K.set(s,e)}let E={get(s,e,t){if(s instanceof IDBTransaction){if(e==="done")return K.get(s);if(e==="objectStoreNames")return s.objectStoreNames||$.get(s);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return m(s[e])},set(s,e,t){return s[e]=t,!0},has(s,e){return s instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in s}};function ge(s){E=s(E)}function ye(s){return s===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const n=s.call(L(this),e,...t);return $.set(n,e.sort?e.sort():[e]),m(n)}:fe().includes(s)?function(...e){return s.apply(L(this),e),m(q.get(this))}:function(...e){return m(s.apply(L(this),e))}}function we(s){return typeof s=="function"?ye(s):(s instanceof IDBTransaction&&pe(s),he(s,ue())?new Proxy(s,E):s)}function m(s){if(s instanceof IDBRequest)return de(s);if(U.has(s))return U.get(s);const e=we(s);return e!==s&&(U.set(s,e),M.set(e,s)),e}const L=s=>M.get(s),me=["get","getKey","getAll","getAllKeys","count"],Re=["put","add","delete","clear"],P=new Map;function F(s,e){if(!(s instanceof IDBDatabase&&!(e in s)&&typeof e=="string"))return;if(P.get(e))return P.get(e);const t=e.replace(/FromIndex$/,""),n=e!==t,a=Re.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(a||me.includes(t)))return;const r=async function(c,...i){const o=this.transaction(c,a?"readwrite":"readonly");let h=o.store;return n&&(h=h.index(i.shift())),(await Promise.all([h[t](...i),a&&o.done]))[0]};return P.set(e,r),r}ge(s=>({...s,get:(e,t,n)=>F(e,t)||s.get(e,t,n),has:(e,t)=>!!F(e,t)||s.has(e,t)}));try{self["workbox:expiration:6.5.3"]&&_()}catch{}try{self["workbox:recipes:6.5.3"]&&_()}catch{}function be(s){self.addEventListener("install",e=>{const t=s.urls.map(n=>s.strategy.handleAll({event:e,request:new Request(n)})[1]);e.waitUntil(Promise.all(t))})}function Ce(s={}){const e=({request:c})=>c.destination==="style"||c.destination==="script"||c.destination==="worker",t=s.cacheName||"static-resources",n=s.matchCallback||e,a=s.plugins||[];a.push(new le({statuses:[0,200]}));const r=new ie({cacheName:t,plugins:a});H(n,r),s.warmCache&&be({urls:s.warmCache,strategy:r})}function _e(s){D().setCatchHandler(s)}try{self["workbox:precaching:6.5.3"]&&_()}catch{}const ke="__WB_REVISION__";function Ue(s){if(!s)throw new l("add-to-cache-list-unexpected-type",{entry:s});if(typeof s=="string"){const r=new URL(s,location.href);return{cacheKey:r.href,url:r.href}}const{revision:e,url:t}=s;if(!t)throw new l("add-to-cache-list-unexpected-type",{entry:s});if(!e){const r=new URL(t,location.href);return{cacheKey:r.href,url:r.href}}const n=new URL(t,location.href),a=new URL(t,location.href);return n.searchParams.set(ke,e),{cacheKey:n.href,url:a.href}}class Le{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:n})=>{if(e.type==="install"&&t&&t.originalRequest&&t.originalRequest instanceof Request){const a=t.originalRequest.url;n?this.notUpdatedURLs.push(a):this.updatedURLs.push(a)}return n}}}class Pe{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:t,params:n})=>{const a=(n==null?void 0:n.cacheKey)||this._precacheController.getCacheKeyForURL(t.url);return a?new Request(a,{headers:t.headers}):t},this._precacheController=e}}class d extends x{constructor(e={}){e.cacheName=C.getPrecacheName(e.cacheName),super(e),this._fallbackToNetwork=e.fallbackToNetwork!==!1,this.plugins.push(d.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const n=await t.cacheMatch(e);return n||(t.event&&t.event.type==="install"?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,t){let n;const a=t.params||{};if(this._fallbackToNetwork){const r=a.integrity,c=e.integrity,i=!c||c===r;n=await t.fetch(new Request(e,{integrity:e.mode!=="no-cors"?c||r:void 0})),r&&i&&e.mode!=="no-cors"&&(this._useDefaultCacheabilityPluginIfNeeded(),await t.cachePut(e,n.clone()))}else throw new l("missing-precache-entry",{cacheName:this.cacheName,url:e.url});return n}async _handleInstall(e,t){this._useDefaultCacheabilityPluginIfNeeded();const n=await t.fetch(e);if(!await t.cachePut(e,n.clone()))throw new l("bad-precaching-response",{url:e.url,status:n.status});return n}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[n,a]of this.plugins.entries())a!==d.copyRedirectedCacheableResponsesPlugin&&(a===d.defaultPrecacheCacheabilityPlugin&&(e=n),a.cacheWillUpdate&&t++);t===0?this.plugins.push(d.defaultPrecacheCacheabilityPlugin):t>1&&e!==null&&this.plugins.splice(e,1)}}d.defaultPrecacheCacheabilityPlugin={async cacheWillUpdate({response:s}){return!s||s.status>=400?null:s}};d.copyRedirectedCacheableResponsesPlugin={async cacheWillUpdate({response:s}){return s.redirected?await te(s):s}};class Te{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:n=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new d({cacheName:C.getPrecacheName(e),plugins:[...t,new Pe({precacheController:this})],fallbackToNetwork:n}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const t=[];for(const n of e){typeof n=="string"?t.push(n):n&&n.revision===void 0&&t.push(n.url);const{cacheKey:a,url:r}=Ue(n),c=typeof n!="string"&&n.revision?"reload":"default";if(this._urlsToCacheKeys.has(r)&&this._urlsToCacheKeys.get(r)!==a)throw new l("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(r),secondEntry:a});if(typeof n!="string"&&n.integrity){if(this._cacheKeysToIntegrities.has(a)&&this._cacheKeysToIntegrities.get(a)!==n.integrity)throw new l("add-to-cache-list-conflicting-integrities",{url:r});this._cacheKeysToIntegrities.set(a,n.integrity)}if(this._urlsToCacheKeys.set(r,a),this._urlsToCacheModes.set(r,c),t.length>0){const i=`Workbox is precaching URLs without revision info: ${t.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(i)}}}install(e){return S(e,async()=>{const t=new Le;this.strategy.plugins.push(t);for(const[r,c]of this._urlsToCacheKeys){const i=this._cacheKeysToIntegrities.get(c),o=this._urlsToCacheModes.get(r),h=new Request(r,{integrity:i,cache:o,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:c},request:h,event:e}))}const{updatedURLs:n,notUpdatedURLs:a}=t;return{updatedURLs:n,notUpdatedURLs:a}})}activate(e){return S(e,async()=>{const t=await self.caches.open(this.strategy.cacheName),n=await t.keys(),a=new Set(this._urlsToCacheKeys.values()),r=[];for(const c of n)a.has(c.url)||(await t.delete(c),r.push(c.url));return{deletedURLs:r}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,n=this.getCacheKeyForURL(t);if(n)return(await self.caches.open(this.strategy.cacheName)).match(n)}createHandlerBoundToURL(e){const t=this.getCacheKeyForURL(e);if(!t)throw new l("non-precached-url",{url:e});return n=>(n.request=new Request(e),n.params=Object.assign({cacheKey:t},n.params),this.strategy.handle(n))}}let T;const N=()=>(T||(T=new Te),T);function I(s){return N().matchPrecache(s)}function Ie(s={}){const e=s.pageFallback||"offline.html",t=s.imageFallback||!1,n=s.fontFallback||!1;self.addEventListener("install",r=>{const c=[e];t&&c.push(t),n&&c.push(n),r.waitUntil(self.caches.open("workbox-offline-fallbacks").then(i=>i.addAll(c)))}),_e(async r=>{const c=r.request.destination,i=await self.caches.open("workbox-offline-fallbacks");return c==="document"?await I(e)||await i.match(e)||Response.error():c==="image"&&t!==!1?await I(t)||await i.match(t)||Response.error():c==="font"&&n!==!1&&(await I(n)||await i.match(n))||Response.error()})}function Ke(s,e=[]){for(const t of[...s.searchParams.keys()])e.some(n=>n.test(t))&&s.searchParams.delete(t);return s}function*Ee(s,{ignoreURLParametersMatching:e=[/^utm_/,/^fbclid$/],directoryIndex:t="index.html",cleanURLs:n=!0,urlManipulation:a}={}){const r=new URL(s,location.href);r.hash="",yield r.href;const c=Ke(r,e);if(yield c.href,t&&c.pathname.endsWith("/")){const i=new URL(c.href);i.pathname+=t,yield i.href}if(n){const i=new URL(c.href);i.pathname+=".html",yield i.href}if(a){const i=a({url:r});for(const o of i)yield o.href}}class De extends w{constructor(e,t){const n=({request:a})=>{const r=e.getURLsToCacheKeys();for(const c of Ee(a.url,t)){const i=r.get(c);if(i){const o=e.getIntegrityForCacheKey(i);return{cacheKey:i,integrity:o}}}};super(n,e.strategy)}}function xe(s){const e=N(),t=new De(e,s);H(t)}const Me="-precache-",Ne=async(s,e=Me)=>{const n=(await self.caches.keys()).filter(a=>a.includes(e)&&a.includes(self.registration.scope)&&a!==s);return await Promise.all(n.map(a=>self.caches.delete(a))),n};function ve(){self.addEventListener("activate",s=>{const e=C.getPrecacheName();s.waitUntil(Ne(e).then(t=>{}))})}function Oe(s){N().precache(s)}function Se(s,e){Oe(s),xe(e)}function Ae(s){D().setDefaultHandler(s)}class We extends x{constructor(e={}){super(e),this._networkTimeoutSeconds=e.networkTimeoutSeconds||0}async _handle(e,t){let n,a;try{const r=[t.fetch(e)];if(this._networkTimeoutSeconds){const c=j(this._networkTimeoutSeconds*1e3);r.push(c)}if(a=await Promise.race(r),!a)throw new Error(`Timed out the network response after ${this._networkTimeoutSeconds} seconds.`)}catch(r){r instanceof Error&&(n=r)}if(!a)throw new l("no-response",{url:e.url,error:n});return a}}const Fe="abber-v92";console.log(Fe);self.skipWaiting();se();ve();Se([{"revision":"0d4f64f1d9fcb68e18bb2b20ff450934","url":"static/flatpickr/ar.js"},{"revision":"43d11ddec3bd474d3aab86dc1935f842","url":"static/flatpickr/flatpickr.js"},{"revision":"750b5ec064ce15512855fcd09105fc93","url":"static/fullcalendar/main.min.js"},{"revision":"8f1950538c6051b90dae76087bc65424","url":"static/jquery-3.6.0.min.js"},{"revision":"244b064872afbc773e37c369fc2e95f3","url":"static/src/animate.min.css"},{"revision":"78bda18b40d5be5cbdb24fd3ef59d239","url":"static/src/fonts.css"},{"revision":"23c490b7db430b804819f9da417fd84d","url":"static/src/fonts/Cereal-Arabic-Bold.woff2"},{"revision":"93cb5fcaee6705378978ac71b8738452","url":"static/src/fonts/Cereal-Arabic-Book.woff2"},{"revision":"bf1b1a5c2e6c6c7aa0767efce4dfde09","url":"static/src/fonts/Cereal-Arabic-Medium.woff2"},{"revision":"b422e783c9b85cdee883ec8923ac12e3","url":"static/src/fonts/Cereal-Bold.woff2"},{"revision":"e849748a22ab45f0052876d59d0b3300","url":"static/src/fonts/Cereal-Book.woff2"},{"revision":"aa2d47eb2546474277f786c491deb100","url":"static/src/fonts/Cereal-Medium.woff2"},{"revision":"8cc6ea60d826c6c57a5e63aa72c9de30","url":"static/src/img/android-chrome-192x192.png"},{"revision":"0c61ac5aa582cce17a424ece25378e2b","url":"static/src/img/android-chrome-512x512.png"},{"revision":"e21a66ef575fcd88147c135a3f5e77b4","url":"static/src/img/apple-touch-icon.png"},{"revision":"e3b52338eb950c3d41109886e2184151","url":"static/src/img/apple.svg"},{"revision":"2baa1a2d1021c87f5a3cd9c4db03cc1a","url":"static/src/img/browserconfig.xml"},{"revision":"b37b898f6f23cba1a5d3187c87bb0d38","url":"static/src/img/empty.svg"},{"revision":"3b7db4dd2838c928bdd66a59ddb2dc8e","url":"static/src/img/favicon-16x16.png"},{"revision":"37f1c40ddbaa4ec0870e139801de3cc7","url":"static/src/img/favicon-32x32.png"},{"revision":"f8e1c856cf288c4daa0e652d1c9f6000","url":"static/src/img/favicon.ico"},{"revision":"b356fe5f073d9fc02401cf984b902991","url":"static/src/img/favicon.png"},{"revision":"3f2a61090de3cfa8a7547876234c9b77","url":"static/src/img/flags.png"},{"revision":"8f463ef51214771b3efa84f73252570b","url":"static/src/img/flags@2x.png"},{"revision":"08ea438ed3b14e63dd54516d3768e3d3","url":"static/src/img/google.svg"},{"revision":"3f4fe8849a736f5c44289f73205e9ae2","url":"static/src/img/mstile-150x150.png"},{"revision":"1b09a49d6e8428f48d683d2cafdefc86","url":"static/src/img/payments/apple_pay.webp"},{"revision":"6268b8617874e1405f48b1984fa05d23","url":"static/src/img/payments/mada.png"},{"revision":"099736291e02159ad518c3db5ca0f9eb","url":"static/src/img/payments/mastercard.webp"},{"revision":"39c35f9cb2da694b842fa0d96827603e","url":"static/src/img/payments/paypal.webp"},{"revision":"32a628bd5b1df51a21626fb0f7b4145c","url":"static/src/img/payments/stc_pay.webp"},{"revision":"617e26ac399ca90de0bed61e5b642162","url":"static/src/img/payments/visa.webp"},{"revision":"c7cd4477f679374f87cdc93d71c7aed2","url":"static/src/img/payments/wallet.webp"},{"revision":"ccd1914d01408af1f4309b7776126a6e","url":"static/src/img/safari-pinned-tab.svg"},{"revision":"2912139dd229b9c6f6056054a0de1005","url":"static/src/img/whatsapp-icon.svg"}]);Ae(new We);Ce();Ie();