import { createApp, provide } from "vue";
import "./assets/tailwind.css";
import "./assets/style.css";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { createPinia } from "pinia";
import "material-icons/iconfont/material-icons.css";


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registrado com sucesso:', registration);
    })
    .catch((error) => {
      console.error('Erro ao registrar Service Worker:', error);
    });
}

const app = createApp(App);

app
  .use(createPinia())
  .use(router);

app.mount("#app");
