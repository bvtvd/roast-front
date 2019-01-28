import Vue from 'vue'
import router from './routes'
import {CONFIG} from './config'
import store from './store'
import App from '@/App'

Vue.config.productionTip = false

try {
    window.$ = window.jQuery = require('jquery');
    require('foundation-sites');
}catch(e){ 1 }

window.axios = require('axios');

// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.baseURL = CONFIG.API_URL;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
