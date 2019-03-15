import router from './router'
import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';

Vue.use(Vuex);
const state = {
   user:{},
   grades:[],
   logged:localStorage.getItem('access_token',null) !=null
}
const actions = {
    login({commit},credientials){
        Axios.post('auth/login',credientials).then((response)=>{
            localStorage.setItem("access_token",response.data.data.access_token);
            Axios.post('auth/me').then((response)=>{
                state.user = response.data.data;
                Axios.get('auth/grades').then((response)=>{
                   state.grades = response.data.data.grades;
                });
            });
            router.push({name:"Dashboard",params:{}});
          });
    },
    me({commit}){
        if(state.logged){
        Axios.post('auth/me').then((response)=>{
         state.user = response.data.data;
        });
        }
    },
    grades({commit}){
        if(state.logged){
        Axios.get('auth/grades').then((response)=>{
         state.grades = response.data.data.grades;
        });
        }
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