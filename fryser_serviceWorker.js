let VERSION = 1.000; // Change version number to facilitate updates

let FP_CACHE = 'Fryser-cache';
let CACHED_URLS = [
  '/',
  'fryser.html',
  'fryser.css',
  'fryser.js',
  'index.html',
  'manifest.json',
  'images/icon192x192scalable.png',
  'images/icon192x192.png',
  'images/favicon.ico',
  'images/favicon2.ico',
  'images/burger.svg'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(FP_CACHE).then(function(cache) {
      return cache.addAll(CACHED_URLS);
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log('Fetch request for: ', event.request.url);
  event.respondWith( caches.match(event.request, {ignoreVary: true}).then( // ignoreVary should make the cache match ignore flags and stuff that can make a mathc fail unintentionally
    function(response) {
      if (response) {
        console.log('Yay, retrieved from cache!', response.url);
        return response
      } else {
        console.log('Strange, requested online request...', response.url);
        return fetch(event.request);
      }
    }).catch(function(error) {
      console.log('Fryserindhold serviceWorker responded with error', error);
    })
  );
})