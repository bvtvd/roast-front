/**
 * author: Hans
 * email: hans01@foxmail.com
 * date: 2019/1/25
 * time: 14:44
 */

import Vue  from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'layout',
            component: resolve => {
                require(['@/pages/Layout.vue'], resolve)
            }, //Vue.component('Home', require('./pages/Layout.vue')),
            children: [
                {
                    path: '/home',
                    name: 'home',
                    // component: Vue.component('Home', require('./pages/Home.vue'))
                    component: resolve => {
                        require(['@/pages/Home.vue'], resolve)
                    }
                },
                {
                    path: '/cafes',
                    name: 'cafes',
                    // component: Vue.component('Cafes', require('./pages/Cafes.vue'))
                    component: resolve => {
                        require(['@/pages/Cafes.vue'], resolve)
                    }
                },
                {
                    path: '/cafes/new',
                    name: 'newcafe',
                    // component: Vue.component('NewCafe', require('./pages/NewCafe.vue'))
                    component: resolve => {
                        require(['@/pages/NewCafe.vue'], resolve)
                    }
                },
                {
                    path: '/cafes/:id',
                    name: 'cafe',
                    // component: Vue.component('Cafe', require('./pages/Cafe.vue'))
                    component: resolve => {
                        require(['@/pages/Cafe.vue'], resolve)
                    }
                },
            ]
        },
    ]
})