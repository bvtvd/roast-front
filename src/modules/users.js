/**
 * author: Hans
 * email: hans01@foxmail.com
 * date: 2019/2/15
 * time: 14:36
 */

import CafeApi from '../api/cafe';

export const users = {
    state: {
        user: '',
        userLoadStatus: 0
    },
    actions: {
        loadUser({commit}){
            console.log('load user -==============================')
            commit('setUser', '')
            commit('setUserLoadStatus', 2)
        }
    },
    mutations: {
        setUser(state, user){
            state.user = user
        },
        setUserLoadStatus(state, status){
            state.userLoadStatus = status
        }
    },
    getters: {
        getUser(state){
            return state.user
        },
        getUserLoadStatus(state){
            return state.userLoadStatus;
        }
    }
}