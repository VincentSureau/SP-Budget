// install service worker
if ('serviceWorker' in navigator) {
    console.log("request notification permission")
    Notification.requestPermission(permission => {
        if (!('permission' in Notification)) {
            Notification.permission = permission;
        }
        return permission;
    })
    .then(() => {
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
