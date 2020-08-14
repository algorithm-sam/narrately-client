export default {
    activeUser: (state) => {
		return state.users.filter((user) => !user.isActive);
    },
    user: (state) => {
    	return state.user; 
    }
}