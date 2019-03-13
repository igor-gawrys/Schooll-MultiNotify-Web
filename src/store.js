import router from './router'
import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';

Vue.use(Vuex);
const state = {
   user:{}
}
const actions = {
    login({commit},credientials){
        Axios.post('auth/login',credientials).then((response)=>{
            localStorage.setItem("access_token",response.data.data.access_token);
             router.push({name:"Dashboard",params:{}});
          });
    },
    me({commit}){
        Axios.post('auth/me').then((response)=>{
         state.user = response.data.data;
        });
    },
    logout({commit}){
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('access_token');
        axios.post('auth/logout');
        localStorage.removeItem('access_token');
        router.push({name:"Login",params:{}})
    }
}
export default new Vuex.Store({
    state,
    actions
})