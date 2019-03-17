// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import Loading from 'vue-loading-overlay';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-loading-overlay/dist/vue-loading.css';
import App from './App'
import store from './store'
import router from './router'
window.axios = axios;
axios.defaults.baseURL = "https://api.school.multinotify.pl/api";
if(localStorage.getItem("access_token",null) !=null){
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('access_token');
}
Vue.use(BootstrapVue)
Vue.use(Loading,{
  height:128,
  width:128,
  color:"#08b274",
  loader:"dots"
},{  })
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

