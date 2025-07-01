import { createApp } from 'vue'
import '@fortawesome/fontawesome-free/css/all.css'
import './style.css'
import App from './App.vue'
import { createI18n } from 'vue-i18n'

import en from './locales/en.json'
import uk from './locales/uk.json'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    uk
  }
})

createApp(App).use(i18n).mount('#app')
