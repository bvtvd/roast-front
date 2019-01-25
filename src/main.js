import Vue from 'vue'
import router from './routes'

Vue.config.productionTip = false

try {
    window.$ = window.jQuery = require('jquery');
    require('foundation-sites');
}catch(e){ 1 }

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

new Vue({
    router
}).$mount('#app')
