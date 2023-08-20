import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import 'vant/lib/index.css';
import { router } from '@/router';
// 引入pinia仓库
import pinia from '@/store';
const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount('#app');
