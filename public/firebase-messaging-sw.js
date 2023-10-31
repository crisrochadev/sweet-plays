self.addEventListener("push", (event) => {
  const payload = event.data.json();
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/img/logo.svg",
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
