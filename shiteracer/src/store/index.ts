import Vue from 'vue'
import Vuex from 'vuex'
import FirestoreModule from './modules/FirebaseModule';
import UserModule from './modules/UserModule';
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    FirestoreModule,
    user: UserModule
  }
})
