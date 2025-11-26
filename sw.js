const CACHE_NAME = "estore-cache-v1";

const ASSETS_TO_CACHE = [
  "/Estore/",
  "/Estore/index.html",
  "/Estore/styles.css",
  "/Estore/script.js",
  "/Estore/manifest.json",
  "/Estore/icons/icon-72.png",
  "/Estore/icons/icon-96.png",
  "/Estore/icons/icon-128.png",
  "/Estore/icons/icon-144.png",
  "/Estore/icons/icon-152.png",
  "/Estore/icons/icon-192.png",
  "/Estore/icons/icon-384.png",
  "/Estore/icons/icon-512.png"
];

// Install SW
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
});

// Activate SW
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
});

// Fetch logic
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return (
        cached ||
        fetch(event.request).catch(() => caches.match("/Estore/index.html"))
      );
    })
  );
});
