import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from 'firebase'

Vue.config.productionTip = false
const firebaseConfig = {
  apiKey: 'AIzaSyCSNrTLO_LFmGXif8UD6iTNc3_dx4EouLk',
  authDomain: 'develop-pj.firebaseapp.com',
  databaseURL: 'https://develop-pj-default-rtdb.firebaseio.com',
  projectId: 'develop-pj',
  storageBucket: 'develop-pj.appspot.com',
  messagingSenderId: '191378898784',
  appId: '1:191378898784:web:08c44713dbf3bc7867a805',
  measurementId: 'G-F15E338XJT'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
