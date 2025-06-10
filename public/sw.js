// This service worker will unregister itself and clear any caches
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      // Clear all caches
      caches.keys().then(keys => Promise.all(
        keys.map(key => caches.delete(key))
      )),
      // Unregister this service worker
      self.registration.unregister(),
      // Take control of all clients
      self.clients.claim()
    ])
  );
}); 