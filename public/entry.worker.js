var d=(e,t={})=>{let a=typeof t=="number"?{status:t}:t,s=new Headers(a.headers);return s.has("Content-Type")||s.set("Content-Type","application/json; charset=utf-8"),new Response(JSON.stringify(e),{...a,headers:s})};var E=["/build/","/icons/","/"],l="asset-cache",p="data-cache",m="document-cache";function n(...e){}async function x(e){n("Service worker installed")}async function C(e){n("Service worker activated")}async function b(e){let t=new Map;if(e.data.type==="REMIX_NAVIGATION"){let{isMount:a,location:s,matches:h,manifest:g}=e.data,r=s.pathname+s.search+s.hash,[w,y,S]=await Promise.all([caches.open(p),caches.open(m),caches.match(r)]);if((!S||!a)&&(n("Caching document for",r),t.set(r,y.add(r).catch(c=>{n(`Failed to cache document for ${r}:`,c)}))),a){for(let c of h)if(g.routes[c.id].hasLoader){let f=new URLSearchParams(s.search);f.set("_data",c.id);let i=f.toString();i=i?`?${i}`:"";let o=s.pathname+i+s.hash;t.has(o)||(n("Caching data for",o),t.set(o,w.add(o).catch(R=>{n(`Failed to cache data for ${o}:`,R)})))}}}await Promise.all(t.values())}async function k(e){let t=new URL(e.request.url);if(A(e.request)){let a=await caches.match(e.request,{cacheName:l,ignoreVary:!0,ignoreSearch:!0});if(a)return n("Serving asset from cache",t.pathname),a;n("Serving asset from network",t.pathname);let s=await fetch(e.request);return s.status===200&&await(await caches.open(l)).put(e.request,s.clone()),s}if(L(e.request))try{n("Serving data from network",t.pathname+t.search);let a=await fetch(e.request.clone());return await(await caches.open(p)).put(e.request,a.clone()),a}catch{n("Serving data from network failed, falling back to cache",t.pathname+t.search);let s=await caches.match(e.request);return s?(s.headers.set("X-Remix-Worker","yes"),s):d({message:"Network Error"},{status:500,headers:{"X-Remix-Catch":"yes","X-Remix-Worker":"yes"}})}if(N(e.request))try{n("Serving document from network",t.pathname);let a=await fetch(e.request);return await(await caches.open(m)).put(e.request,a.clone()),a}catch(a){n("Serving document from network failed, falling back to cache",t.pathname);let s=await caches.match(e.request);if(s)return s;throw a}return fetch(e.request.clone())}var q=e=>{let t=JSON.parse(e==null?void 0:e.data.text()),a=t.title?t.title:"Remix PWA",s={body:t.body?t.body:"Notification Body Text",icon:t.icon?t.icon:"/icons/android-icon-192x192.png",badge:t.badge?t.badge:"/icons/android-icon-48x48.png",dir:t.dir?t.dir:"auto",image:t.image?t.image:void 0,silent:t.silent?t.silent:!1};self.registration.showNotification(a,{...s})};function u(e,t){return t.includes(e.method.toLowerCase())}function A(e){return u(e,["get"])&&E.some(t=>e.url.startsWith(t))}function L(e){let t=new URL(e.url);return u(e,["get"])&&t.searchParams.get("_data")}function N(e){return u(e,["get"])&&e.mode==="navigate"}self.addEventListener("install",e=>{e.waitUntil(x(e).then(()=>self.skipWaiting()))});self.addEventListener("activate",e=>{e.waitUntil(C(e).then(()=>self.clients.claim()))});self.addEventListener("message",e=>{e.waitUntil(b(e))});self.addEventListener("push",e=>{e.waitUntil(q(e))});self.addEventListener("fetch",e=>{e.respondWith((async()=>{let t={};try{t.response=await k(e)}catch(a){t.error=a}return P(e,t)})())});async function P(e,{error:t,response:a}){return a}
/**
 * @remix-run/server-runtime v1.4.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
