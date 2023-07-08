import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import JsonViewer from 'vue-json-viewer'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.use(JsonViewer)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
