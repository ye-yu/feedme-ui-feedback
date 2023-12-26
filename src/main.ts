import '@/assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from '@/router/router'

import { uiPlugin } from '@feedmepos/ui-library'

import 'highlight.js/styles/stackoverflow-light.css'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import hljsVuePlugin from '@highlightjs/vue-plugin'

hljs.registerLanguage('javascript', javascript)
const app = createApp(App)
app.use(hljsVuePlugin)
app.use(createPinia())
app.use(router)
app.use(uiPlugin)
app.mount('#app')
