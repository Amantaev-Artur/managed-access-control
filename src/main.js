import 'mdb-vue-ui-kit/css/mdb.min.css'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import store from './store';
import router from './router'
import i18n from './locales';

createApp(App).use(i18n).use(router).use(store).mount('#app');
