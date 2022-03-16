import { createApp } from 'vue';
import Dev from './serve.vue';
import './css/main.css';
const app = createApp(Dev);
app.mount('#app');
