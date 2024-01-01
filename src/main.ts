import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import './assets/style.css'
import { createPinia } from 'pinia'

const pinia = createPinia()

const app = createApp(App).use(router).use(pinia)

app.mount('#app')
