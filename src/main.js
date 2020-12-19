import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

// import Vue from 'vue'
// import { rtdbPlugin } from 'vuefire'
// Vue.use(rtdbPlugin)

createApp(App).use(store).use(router).mount('#app')