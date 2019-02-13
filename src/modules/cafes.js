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

        cafeLikeActionStatus: 0,
        cafeUnlikeActionStatus: 0,

        cafeLiked: false
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

                if(response.data.user_like){
                    commit('setCafeLoadStatus', 2)
                }

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
        },
        likeCafe({commit, state}, data){
            commit('setCafeLikeActionStatus', 1);

            CafeApi.postLikeCafe(data.id)
                .then(response => {
                    commit('setCafeLikedStatus', true)
                    commit('setCafeLikeActionStatus', 2)
                })
                .catch(() => {
                    commit('setCafeLikeActionStatus', 3)
                })
        },
        unlikeCafe({commit, state}, data) {
            commit('setCafeUnlikeActionStatus', 1);

            CafeApi.deleteLikeCafe(data.id)
                .then(response => {
                    commit('setCafeLikedStatus', false);
                    commit('setCafeUnlikeActionStatus', 2);
                })
                .catch(() => {
                    commit('setCafeUnlikeActionStatus', 3);
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
        setCafeLikedStatus(state, status){
            state.cafeLiked = status;
        },
        setCafeLikeActionStatus(state, status) {
            state.cafeLikeActionStatus = status;
        },
        setCafeUnlikeActionStatus(state, status) {
            state.cafeUnlikeActionStatus = status;
        }
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
        },
        getCafeLikedStatus(state) {
            return state.cafeLiked;
        },
        getCafeLikeActionStatus(state) {
            return state.cafeLikeActionStatus;
        },
        getCafeUnlikeActionStatus(state) {
            return state.cafeUnlikeActionStatus;
        }
    }
}