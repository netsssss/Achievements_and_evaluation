import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
    isLogin: false,
    role: '',
    user: ''
}

const getters = {
    getIsLogin: state => {
        return state.isLogin
    },
    getRole: state => {
      return state.role
    },
    getUser: state => {
      return state.user
    }
}

const mutations = {
    setIsLogin: (state, val) => {
        state.isLogin = val
    },
    setRole: (state, val) => {
        state.role = val
    },
    setUser: (state, val) => {
        state.role = val
    }
}

const actions = {

}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
