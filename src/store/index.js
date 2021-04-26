import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		userInfo: {},
	},
	mutations: {
		saveUserInfo(state, userInfo) {
			state.userInfo = userInfo
		},
		clearUserInfo(state) {
			state.userInfo = {}
		},
	},
	actions: {},
	modules: {},
})
