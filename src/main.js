import Vue from 'vue'
import router from './routes'
import {CONFIG} from './config'
import store from './store'
import App from '@/App'
import Qs from 'qs'

Vue.config.productionTip = false

try {
    window.$ = window.jQuery = require('jquery');
    require('foundation-sites');
}catch(e){ 1 }

window.axios = require('axios');

// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.baseURL = CONFIG.API_URL;

// 请求拦截器
window.axios.interceptors.request.use( (config) => {
    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');

    if (config.method=="post"){
        // config.data = Qs.stringify(config.data);
        config.headers['Content-Type'] = 'application/json';
    }

    return config;
},  (error) => {
    return Promise.reject(error);
});

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
