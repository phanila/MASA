import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { createVuetify } from 'vuetify'
import { components, directives } from 'vuetify/dist/vuetify'

const app = createApp(App)
const vuetify = createVuetify({
  components, directives
})

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
