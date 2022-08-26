import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import pinia from './store/index';

import { registerSW } from 'virtual:pwa-register';

const intervalMS = 60 * 60 * 1000;

// eslint-disable-next-line
const updateSW = registerSW({
  onRegistered(r) {
    r &&
      setInterval(() => {
        r.update();
      }, intervalMS);
  },
  onNeedRefresh() {
    alert('Cierra y vuelve abrir la aplicación');
  },
  workbox: {
    cleanupOutdatedCaches: false,
    sourcemap: true,
  },
});

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

createApp(App).use(pinia).use(router).mount('#app');
