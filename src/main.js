import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import store from './store/index'


library.add(faEnvelope, faLock, faEye, faEyeSlash)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(store)

app.use(router)

app.mount('#app')
