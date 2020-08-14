import Vue from 'vue'
import App from './App.vue'
import Plugin from './Plugin';

Vue.config.productionTip = false

Vue.use(Plugin)

new Vue({
  render: h => h(App),
}).$mount('#app')
