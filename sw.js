'use strict';
// Bei jeder veröffentlichten Änderung erhöhen, z. B. v3-3, v3-4 …
const CACHE_VERSION = 'v3-2';
// Getrennte Caches für verschiedene GitHub-Pages-Repositories auf demselben Host.
const CACHE_PREFIX = 'bzf-trainer:' + new URL(self.registration.scope).pathname + ':';
const CACHE_NAME = CACHE_PREFIX + CACHE_VERSION;
const ASSETS = ['./', './index.html', './manifest.webmanifest', './sw.js', './icon-192.png', './icon-512.png', './README.md'];
const URLS = ASSETS.map(path => new URL(path, self.registration.scope).href);
self.addEventListener('install', event => {
  // Neue App-Dateien dürfen beim Update nicht aus dem alten HTTP-Cache stammen.
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(URLS.map(url => new Request(url, {cache:'reload'})))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if(request.method !== 'GET') return;
  const url = new URL(request.url);
  if(url.origin !== self.location.origin || !url.href.startsWith(self.registration.scope)) return;
  // Nur App-Dateien, keine Sicherungen und keine personenbezogenen Inhalte cachen.
  const canonical = new URL(url.pathname, url.origin).href;
  if(request.mode !== 'navigate' && !URLS.includes(canonical)) return;
  event.respondWith(caches.open(CACHE_NAME).then(async cache => {
    const key = URLS.includes(canonical) ? canonical : new URL('./index.html', self.registration.scope).href;
    const hit = await cache.match(key);
    if(hit) return hit;
    try{
      const response = await fetch(request);
      if(response.ok) await cache.put(key, response.clone());
      return response;
    }catch(error){
      return new Response('Offline-Datei fehlt. Bitte die App einmal mit Internetverbindung vollständig öffnen.', {status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
    }
  }));
});
