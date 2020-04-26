const staticCacheName = "vincent_sureau_app_budget";

const filesToCache = [
    './',
    './404.html',
    './offline.html',
    './assets/app.css',
    './assets/runtime.js',
    './assets/app.js',
    './images/logo-b.svg',
    './images/logo-banking.svg'
];

// on installe le service worker
self.addEventListener('install', event => {
    console.log('Attempting to install service worker and cache static assets');
    event.waitUntil(
        // on ajoute les fichier static au cache
        caches.open(staticCacheName)
            .then(cache => {
                return cache.addAll(filesToCache);
            })
    );
});

// on active le service worker
self.addEventListener('activate', event => {
    console.log('Activating new service worker...');

    const cacheWhitelist = [staticCacheName];

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                // on retire du cache tous les fichiers qui ne sont plus utilisés
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});


// on intercepte toutes les requêtes du site
self.addEventListener('fetch', event => {
    console.log('Fetch event for ', event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // si une page correspondante est disponnible en cache, je la retourne
                if (response) {
                    console.log('Found ', event.request.url, ' in cache');
                    return response;
                }
                // si rien dans le cache, je fais une requête au serveur
                console.log('Network request for ', event.request.url);
                return fetch(event.request)
                    .then(response => {
                        // si la page demandée n'existe pas, je renvoie une page d'erreur personnalisée
                        if (response.status === 404) {
                            return caches.match('pages/404.html');
                        }
                        // si la réponse est ok, je la mets dans le cache puis je la retourne
                        return caches.open(staticCacheName)
                            .then(cache => {
                                cache.put(event.request.url, response.clone());
                                return response;
                            });
                    });
            }).catch(error => {
                // si pas de connexion, je renvoie une page offline par défaut
                console.log('Error, ', error);
                return caches.match('pages/offline.html');
            })
    );
});
