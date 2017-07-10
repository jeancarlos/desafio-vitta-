// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'vue-material/dist/vue-material.css'
import Vue from 'vue'
import router from './router'
import VueMask from 'v-mask'
import VueMaterial from 'vue-material'
import VueFire from 'vuefire'
import App from './App'

Vue.config.productionTip = false

Vue.use(VueMask)
Vue.use(VueMaterial)
Vue.use(VueFire)

Vue.material.registerTheme({
  'default': {
    primary: 'white',
    accent: 'red',
    warn: 'red'
  },
  'red': {
    background: 'white',
    primary: 'red',
    accent: 'red',
    warn: 'red'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
