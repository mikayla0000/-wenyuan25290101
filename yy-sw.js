/* 圓圓聊天室 App 的離線外殼（scope 只有 ./chat，所以安裝後是獨立 App）；聊天紀錄與網站共用同一份瀏覽器資料 */
const C='yy-app-v5';const F=['./chat.html','./yy-app.webmanifest','./yy-icon-192.png','./yy-icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C&&k.startsWith('yy-')).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);if(u.origin!==location.origin)return;e.respondWith(fetch(e.request).then(r=>{if(r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./chat.html'))))});
