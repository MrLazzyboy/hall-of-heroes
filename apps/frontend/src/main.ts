import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@/assets/styles/main.scss'
import '@/assets/css/all.min.css'

import vuetify from './plugins/vuetify';


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify);

app.mount('#app')
