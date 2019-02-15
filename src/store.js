/**
 * author: Hans
 * email: hans01@foxmail.com
 * date: 2019/1/25
 * time: 14:45
 */

require('es6-promise').polyfill()

import Vue from 'vue'
import Vuex from 'vuex'
import {cafes} from './modules/cafes'
import {brewMethods} from './modules/brewMethods'
import {users} from './modules/users'

Vue.use(Vuex)

/**
 * export the data source
 */
export default new Vuex.Store({
    modules: {
        cafes,
        brewMethods,
        users
    }
})