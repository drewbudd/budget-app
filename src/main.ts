import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import './assets/style.css'

const app = createApp(App)
  .use(router)

app.mount('#app')
