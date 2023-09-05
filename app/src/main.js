import { createApp } from 'vue'

import App from './App.vue'
import Coordy from '../../dist/coordy-vue.esm.js'
import  '../../dist/coordy-vue.css'

createApp(App)
    .use(Coordy).mount('#app')
