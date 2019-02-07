/**
 * author: Hans
 * email: hans01@foxmail.com
 * date: 2019/1/28
 * time: 11:39
 */

import CafeApi from '../api/cafe'


export const cafes = {
    state: {
        cafes: [],
        cafesLoadStatus: 0,

        cafe: {},
        cafeLoadStatus: 0,

        cafeAddStatus: 0,
    },
    actions: {
        loadCafes({commit}){
            commit('setCafesLoadStatus', 1)

            CafeApi.getCafes().then(response => {
                commit('setCafes', response.data);
                commit('setCafesLoadStatus', 2);
            }).catch(() => {
                commit('setCafes', []);
                commit('setCafesLoadStatus', 3);
            });
        },
        loadCafe({commit}, data){
            commit('setCafeLoadStatus', 1);

            CafeApi.getCafe(data.id).then(response => {
                commit('setCafe', response.data);
                commit('setCafeLoadStatus', 2);
            }).catch(() => {
                commit('setCafe', {})
                commit('setCafeLoadStatus', 3)
            })
        },
        addCafe({commit, state, dispatch}, data){
            commit('setCafeAddStatus', 1);

            CafeApi.postAddNewCafe(data.name, data.locations, data.website, data.description, data.roaster)
                .then(response => {
                    commit('setCafeAddStatus', 2)
                    dispatch('loadCafes');
                })
                .catch(() => {
                    commit('setCafeAddStatus', 3)
                })
        }
    },
    mutations: {
        setCafesLoadStatus(state, status){
            state.cafesLoadStatus = status;
        },
        setCafes(state, cafes){
            state.cafes = cafes;
        },
        setCafeLoadStatus(state, status) {
            state.cafeLoadStatus = status;
        },
        setCafe(state, cafes){
            state.cafe = cafes;
        },
        setCafeAddStatus(state, status){
            state.cafeAddStatus = status;
        },
    },
    getters: {
        getCafesLoadStatus(state) {
            return state.cafesLoadStatus;
        },
        getCafes(state) {
            return state.cafes;
        },
        getCafeLoadStatus(state) {
            return state.cafeLoadStatus;
        },
        getCafe(state){
            return state.cafe;
        },
        getCafeAddStatus(state){
            return state.cafeAddStatus;
        }
    }
}