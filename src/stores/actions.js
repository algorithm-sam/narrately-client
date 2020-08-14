export default {
	UPDATE_USER({ commit }, user) {
		commit("UPDATE_USER_MUTATION", user);
	},

	UPDATE_AVATAR({ commit }, url) {
		commit("UPDATE_AVATAR_MUTATION", url);
	},

	ACTIVATE_USER({ commit }) {
		commit("ACTIVATE_USER_MUTATION");
	},

	UPDATE_QUOTA({ commit }, quota) {
		commit("UPDATE_QUOTA_MUTATION", quota);
	},

	ADD_CONVERSION({ commit }, conversion) {
		commit("ADD_CONVERSION_MUTATION", conversion);
	},

	ADD_LANGUAGES({ commit }, languages) {
		commit("ADD_LANGUAGES_MUTATION", languages);
	},

	ADD_VOICES({ commit }, voices) {
		commit("ADD_VOICES_MUTATION", voices);
	},

	SHOW_AUTH_FORM({ commit }, route) {
		commit("SHOW_AUTH_FORM_MUTATION", route);
	},
	
	HIDE_AUTH_FORM({ commit }) {
		commit("HIDE_AUTH_FORM_MUTATION");
	},

	LOGIN_USER({ commit }, data) {
		localStorage.setItem('x-access-token', data.token.token)
		localStorage.setItem('x-access-token-expiration', data.token.expiration)
		commit("LOGIN_USER_MUTATION", data);
	},

	SIGN_OUT({commit}) {
		localStorage.clear()
		commit("SIGN_OUT_MUTATION")
	},
	SET_UPGRADE_PLAN_NOTIFICATION({commit}, val) {
		commit("SET_UPGRADE_PLAN_NOTIFICATION_MUTATION", val)
	}
}