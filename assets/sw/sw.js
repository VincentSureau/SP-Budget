// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(function (reg) {
//         // registration worked
//         console.log('Registration succeeded. Scope is ' + reg.scope);
//     }).catch(function (error) {
//         // registration failed
//         console.log('Registration failed with ' + error);
//     });
// };

self.addEventListener('install', evt => {
    caches.open('APP2').then(
        cache => {
            cache.addAll([
                'index.php',
                'sw.js'
            ]);
        }
    )
});
self.addEventListener('activate', evt => {
    console.log(evt);
});
self.addEventListener('fetch', evt => {
    /*
    if(!navigator.onLine){
        evt.respondWith(new Response('Pas de connexion internet, désolé'));
    }
    */

    evt.respondWith(
        caches.match(evt.request).then(rep => {
            if (rep) {
                return rep;
            }
            return fetch(evt.request).then(
                newResponse => {
                    caches.open('APP2').then(
                        cache => cache.put(evt.request, newResponse)
                    );
                    return newResponse.clone();
                });

        })
    )
});