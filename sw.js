const C = 'bait-v11';
const FILES = ['./', 'index.html', 'style.css', 'game.js', 'manifest.json', 'icon-192.png', 'icon-512.png', 'icon-180.png', 'art/maos_vara.webp', 'art/ui/mapa.webp', 'art/ui/missoes.webp', 'art/ui/mochila.webp', 'art/ui/vara.webp', 'art/npc/tiao1.webp', 'art/npc/tiao2.webp', 'art/npc/tiao3.webp', 'art/npc/tiao_icone.webp', 'art/npc/tiao_icone_n.webp', 'art/ui/mapa_n.webp', 'art/ui/missoes_n.webp', 'art/ui/mochila_n.webp', 'art/ui/vara_n.webp', 'art/rio.webp', 'art/rio_pedras.webp', 'art/plantas/galho.webp', 'art/plantas/arbusto1.webp', 'art/plantas/arbusto2.webp', 'art/plantas/flores1.webp', 'art/plantas/flores2.webp', 'art/plantas/capim1.webp', 'art/plantas/capim2.webp', 'art/plantas/capim3.webp', 'art/plantas/moita.webp', 'art/plantas/folhas.webp', 'sfx/splash.mp3', 'sfx/ambiente.mp3', 'sfx/vara_loop.mp3', 'sfx/vara_lanca.mp3', 'fonts/fredoka.woff2', 'art/pesca/faixa.webp', 'art/pesca/vender.webp', 'art/pesca/guardar.webp', 'art/pesca/info.webp', 'art/pesca/splash.webp', 'art/pesca/rar0.webp', 'art/pesca/rar1.webp', 'art/pesca/rar2.webp', 'art/pesca/rar3.webp'];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(C).then(c => c.addAll(FILES))); });
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim())));
// rede primeiro, sempre conferindo com o servidor (sem usar o cache do navegador); cache só offline.
// vídeo fica de fora (o navegador pede em pedaços e o service worker atrapalha no iPhone)
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || r.headers.has('range') || r.url.endsWith('.mp4') || new URL(r.url).origin !== location.origin) return;
  e.respondWith(fetch(r.url, { cache: 'no-cache' }).then(res => {
    if (res.ok && res.status === 200) { const cp = res.clone(); caches.open(C).then(c => c.put(r, cp)); }
    return res;
  }).catch(() => caches.match(r, { ignoreSearch: true })));
});
