/* eslint-disable */ 
import Vue from 'vue';
import App from './App.vue';
import ObviousVue from 'obvious-vue'

Vue.config.productionTip = false;
const $bus = window.__Bus__.host;
const $socket = $bus.createSocket();

Vue.use(ObviousVue)

let app = null

$bus.createApp('vue-app')
  .bootstrap(async (config) => {
    app = new Vue({
      render: h => h(App),
      $bus,
      $socket
    }).$mount(config.mountPoint)
  })
  .destroy(async (config) => {
    app.$destroy()
  });
