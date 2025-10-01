const CACHE = 'tourney-cache-zip2'; // bumped
const ASSETS = ['.', './index.html', './manifest.webmanifest', './icon-180.png', './pics/placeholder.png', './pics/index.json'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))); });
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.origin === location.origin) { e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))); }
});