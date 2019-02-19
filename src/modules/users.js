/**
 * author: Hans
 * email: hans01@foxmail.com
 * date: 2019/2/15
 * time: 14:36
 */

import UserApi from '../api/user';

export const users = {
    state: {
        user: '',
        userLoadStatus: 0
    },
    actions: {
        loadUser({commit}){

            UserApi.getUser()
                .then(response => {
                    if(response.data.token){
                        localStorage.setItem('token', response.data.token);
                    }

                    commit('setUser', response.data)
                    commit('setUserLoadStatus', 2)
                })
                .catch(() => {
                    commit('setUser', '')
                    commit('setUserLoadStatus', 3)
                })


        },
        login({commit}, data){
            UserApi.login(data)
                .then(response => {
                    // 将token设置到localStorage
                    // console.log(response);
                    localStorage.setItem('token', response.data.token);
                })
                .catch(() => {
                    alert("登录失败")
                })
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