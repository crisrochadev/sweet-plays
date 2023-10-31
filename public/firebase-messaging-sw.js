self.addEventListener('push', (event) => {
  const payload = event.data.json();
  const notificationTitle = "É porque entrou aqui";
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/img/logo.svg',
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});