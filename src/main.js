import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// preciso separar o lib do fontawesome em outro arquivo
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faBars,
  faSearch,
  faUser,
  faPlay,
  faPause,
  faArrowRightLong,
  faHeart,
  faMessage,
  faShareNodes,
  faCopy,
} from '@fortawesome/free-solid-svg-icons'

import { faWhatsapp, faXTwitter } from '@fortawesome/free-brands-svg-icons'

library.add(
  faBars,
  faSearch,
  faUser,
  faPlay,
  faPause,
  faArrowRightLong,
  faHeart,
  faMessage,
  faShareNodes,
  faCopy,
  faWhatsapp,
  faXTwitter,
)

const app = createApp(App)
app.component('FontAwesomeIcon', FontAwesomeIcon)

app.use(router)

app.mount('#app')
