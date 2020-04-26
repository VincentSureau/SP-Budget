require('../scss/app.scss');
require('./chart-pie');

console.log('run with webpack encore');

// init materialize js components
M.AutoInit();

// install service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(swReg => {
                console.log('Service Worker is registered', swReg);
            })
            .catch(err => {
                console.error('Service Worker Error', err);
            });
    });
}