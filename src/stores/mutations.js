export default {
	UPDATE_USER_MUTATION(state, user) {
		return state.user = user;
	},

	UPDATE_AVATAR_MUTATION(state, url) {
		return state.user.avatar = url;
	},
	
	ACTIVATE_USER_MUTATION(state) {
		return state.user.isActive = true;
	},

	UPDATE_QUOTA_MUTATION(state, quota) {
		return state.quota = quota;
	},

	ADD_CONVERSION_MUTATION(state, conversion) {
		return state.user.Conversions = [conversion, ...state.user.Conversions];
	},

	ADD_VOICES_MUTATION(state, voices) {
		return state.voices = voices;
	},

	ADD_LANGUAGES_MUTATION(state, languages) {
		return state.languages = languages;
	},

	SHOW_AUTH_FORM_MUTATION(state, route){
		state.auth_route = route;
		state.show_auth_modal = true;
		return true;
	},

	HIDE_AUTH_FORM_MUTATION(state){
		return state.show_auth_modal = false
	},
	LOGIN_USER_MUTATION(state, data){
		state.token = data.token;
		state.user = data.user;
		state.show_auth_modal = false;
		return true;
	},
	SIGN_OUT_MUTATION(state){
		state.token = null;
		state.user = false
		return true;
	},

	SET_UPGRADE_PLAN_NOTIFICATION_MUTATION(state, val){
		return state.upgradePlanNotify = val;
	},
}