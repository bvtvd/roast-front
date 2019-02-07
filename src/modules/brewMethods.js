/**
 * Created by Hans on 2019/2/7.
 */

import BrewMethodApi from '../api/brewMethod'

export const brewMethods = {
    state: {
        brewMethods: [],
        brewMethodsLoadStatus: 0,
    },
    actions: {
        loadBrewMethods({commit}){
            commit('setBrewMethodsLoadStatus', 1);

            BrewMethodApi.getBrewMethod()
                .then(response => {
                    commit('setBrewMethods', response.data);
                    commit('setBrewMethodsLoadStatus', 2);
                })
                .catch(() => {
                    commit('setBrewMethods', [])
                    commit('setBrewMethodsLoadStatus', 3)
                })
        }
    },
    mutations: {
        setBrewMethods(state, brewMethods){
            state.brewMethods = brewMethods;
        },
        setBrewMethodsLoadStatus(state, status){
            state.brewMethodsLoadStatus = status;
        }
    },
    getters: {
        getBrewMethods(state) {
            return state.brewMethods;
        },
        getBrewMethodsLoadStatus(state){
            return state.brewMethodsLoadStatus;
        }
    }
}