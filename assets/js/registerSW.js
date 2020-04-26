// install service worker
if ('serviceWorker' in navigator) {
    // ask permission to send notification to the navigator
    Notification.requestPermission(permission => {
        if (!('permission' in Notification)) {
            Notification.permission = permission;
        }
        return permission;
    })
    .then(() => {
        // register service worker
        navigator.serviceWorker.register('sw.js')
            .then(swReg => {
                console.log('Service Worker is registered', swReg);
            })
            .catch(err => {
                console.error('Service Worker Error', err);
            });
    });
} else {
    console.warn('serviceworker not supported by navigator');
}
