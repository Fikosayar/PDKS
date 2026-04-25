// PDKS PWA Service Worker - Push Notification Handler
// Bu dosya vite-plugin-pwa tarafından oluşturulan sw.js ile birlikte çalışır

self.addEventListener('push', function(event) {
  if (!event.data) return;

  let data;
  try {
    data = event.data.json();
  } catch (e) {
    data = { title: 'PDKS Bildirimi', body: event.data.text(), link: '/' };
  }

  const options = {
    body: data.body,
    icon: '/logo192.png',
    badge: '/logo192.png',
    data: { link: data.link || '/' },
    requireInteraction: false,
    vibrate: [200, 100, 200],
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const link = event.notification.data?.link || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      // Uygulama zaten açıksa, o sekmeye odaklan ve yönlendir
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.focus();
          client.postMessage({ type: 'NAVIGATE', link });
          return;
        }
      }
      // Uygulama kapalıysa yeni sekme aç
      if (clients.openWindow) {
        return clients.openWindow(self.location.origin + link);
      }
    })
  );
});

// Çevrimdışı kuyruğunu senkronize et (Background Sync API)
self.addEventListener('sync', function(event) {
  if (event.tag === 'sync-offline-queue') {
    event.waitUntil(syncOfflineQueue());
  }
});

async function syncOfflineQueue() {
  // Bu fonksiyon arka planda çevrimdışı kuyruğu Firebase'e gönderir
  // İstemci tarafından tetiklenir (App.tsx içindeki syncOfflineQueue fonksiyonu)
  const allClients = await clients.matchAll();
  allClients.forEach(client => {
    client.postMessage({ type: 'SYNC_OFFLINE_QUEUE' });
  });
}
