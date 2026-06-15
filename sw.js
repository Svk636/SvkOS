/* SVK Life OS — Service Worker */
const CACHE_NAME = 'svk-os-v1';
const STATIC_ASSETS = [
  './',
  './svk.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

/* ── Install: cache shell ── */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

/* ── Activate: clean old caches ── */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

/* ── Fetch: stale-while-revalidate for shell, cache-first for assets ── */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  /* Only handle GET requests */
  if (request.method !== 'GET') return;

  /* Same-origin shell files → stale-while-revalidate */
  if (url.origin === self.location.origin) {
    const isShell = STATIC_ASSETS.some((p) => {
      const path = url.pathname;
      return path === p || path === p.replace(/^\.\//, '/');
    });

    if (isShell) {
      event.respondWith(
        caches.match(request).then((cached) => {
          const fetchPromise = fetch(request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                const clone = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(request, clone);
                });
                /* Notify clients that shell cache was refreshed */
                self.clients.matchAll({ type: 'window' }).then((clients) => {
                  clients.forEach((client) =>
                    client.postMessage({ type: 'CACHE_UPDATED' })
                  );
                });
              }
              return networkResponse;
            })
            .catch(() => cached);

          return cached || fetchPromise;
        })
      );
      return;
    }

    /* Other same-origin assets → network with cache fallback */
    event.respondWith(
      fetch(request)
        .catch(() => caches.match(request))
    );
    return;
  }

  /* Cross-origin (fonts, CDN) → network only */
});

/* ── Message: skip waiting from client ── */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
