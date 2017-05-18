/**
 * Created by Adrian on 5/18/2017.
 */
const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
    '',
    'service_worker.html',
    'building.png'
];


// Cache füllen
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('cache befüllt');
                return cache.addAll(urlsToCache);
            })
    );
});
// Anfragen bearbeiten
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    console.log('bild aus cache');
                    return response;
                } else {
                    console.log('bild vom server fetchen und zurückgeben');
                    return fetch(event.request);
                }
            })
    );
});