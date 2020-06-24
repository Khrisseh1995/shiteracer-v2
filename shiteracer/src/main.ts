import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../src/assets/global.css';
import VueRx from 'vue-rx'
import Rx from 'rxjs/Rx';
import { Observable, from} from 'rxjs';



Vue.use(VueRx, Rx);
Vue.config.productionTip = false


new Vue({
  router,
  store,  
  render: h => h(App)
}).$mount('#app')
