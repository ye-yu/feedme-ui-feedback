import '@/assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from '@/router/router'

import { uiPlugin } from '@feedmepos/ui-library'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(uiPlugin)
app.mount('#app')
