import { createApp , provide} from 'vue'
import './assets/tailwind.css';
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { createPinia } from 'pinia'
import 'material-icons/iconfont/material-icons.css';

const app = createApp(App)
.use(createPinia())
.use(router)

app.mount('#app')
