const C = 'bait-v8';
const FILES = ['./', 'index.html', 'style.css', 'game.js', 'manifest.json', 'icon-192.png', 'icon-512.png', 'icon-180.png', 'art/maos_vara.webp', 'art/ui/mapa.webp', 'art/ui/missoes.webp', 'art/ui/mochila.webp', 'art/ui/vara.webp', 'art/npc/tiao1.webp', 'art/npc/tiao2.webp', 'art/npc/tiao3.webp', 'art/npc/tiao_icone.webp', 'art/npc/tiao_icone_n.webp', 'art/ui/mapa_n.webp', 'art/ui/missoes_n.webp', 'art/ui/mochila_n.webp', 'art/ui/vara_n.webp', 'art/rio.webp', 'art/rio.mp4', 'art/rio_pedras.webp', 'art/plantas/galho.webp', 'art/plantas/arbusto1.webp', 'art/plantas/arbusto2.webp', 'art/plantas/flores1.webp', 'art/plantas/flores2.webp', 'art/plantas/capim1.webp', 'art/plantas/capim2.webp', 'art/plantas/capim3.webp', 'art/plantas/moita.webp', 'art/plantas/folhas.webp', 'sfx/splash.mp3', 'sfx/ambiente.mp3', 'sfx/vara_loop.mp3', 'sfx/vara_lanca.mp3'];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(C).then(c => c.addAll(FILES))); });
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim())));
// rede primeiro (pega versão nova), cache se estiver offline
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).then(r => { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); return r; }).catch(() => caches.match(e.request)));
});
