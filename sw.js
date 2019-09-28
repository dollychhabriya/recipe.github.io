const staticCacheName = 'site-static';
const assets = [
  '/recipe.github.io/',
  '/recipe.github.io/index.html',
   '/recipe.github.io/js/ui.js',
    '/recipe.github.io/js/materialize.min.js',
    '/recipe.github.io/css/styles.css',
   '/recipe.github.io/css/materialize.min.css',
   '/recipe.github.io/img/dish.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
];

// install event
self.addEventListener('install', evt => {
  console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
    .then(() => self.skipWaiting())
  );
});

// activate event
self.addEventListener('activate', evt => {
    console.log('service worker activated');
    evt.waitUntil(
      caches.keys().then(keys => {
        //console.log(keys);
        return Promise.all(keys
          .filter(key => key !== staticCacheName)
          .map(key => caches.delete(key))
        );
      })
    );
  });
// fetch event
self.addEventListener('fetch', evt => {
  console.log('fetch event', evt);
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});
