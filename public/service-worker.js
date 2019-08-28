'use strict';

const CACHE_NAME = 'static-cache-v8';
const FILES_TO_CACHE = [
    '/index.html',
    '/favicon.png',
    '/global.css',
    '/bundle.css',
    '/bundle.js',
    // '/sounds/*.*',
    '/sounds/PK-M1.8.wav',
    '/sounds/SN_L-6.1.wav',
    '/sounds/Low Seiko SQ50.wav',
    // 'https://cdnjs.cloudflare.com/ajax/libs/tone/13.0.1/Tone.min.js',
];

self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
    evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
        console.log('[ServiceWorker] Pre-caching offline page');
        return cache.addAll(FILES_TO_CACHE);
    })
);

  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
);  

  self.clients.claim();
});

// self.addEventListener('fetch', (evt) => {
//   console.log('[ServiceWorker] Fetch', evt.request.url);
//   if (evt.request.mode !== 'navigate') {
//     // Not a page navigation, bail.
//     return;
//   }
//   evt.respondWith(
//       fetch(evt.request)
//           .catch(() => {
//             return caches.open(CACHE_NAME)
//                 .then((cache) => {
//                   return cache.match('index.html');
//                 });
//           })
//   );
// });

self.addEventListener('fetch', event => {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      console.log('Network request for ', event.request.url);
      return fetch(event.request)

      // TODO 4 - Add fetched files to the cache

    }).catch(error => {

      // TODO 6 - Respond with custom offline page

    })
  );
});