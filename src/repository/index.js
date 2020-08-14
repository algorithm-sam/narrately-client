import axios from 'axios';

export const BASE_URL = 'http://localhost:3000';
// export const BASE_URL = 'https://narrately-api.herokuapp.com';

axios.defaults.headers.common["x-access-token"] = localStorage.getItem('x-access-token');


export function isAuthenticated() {
	const token = localStorage.getItem('x-access-token');
  	const expiration = localStorage.getItem('x-access-token-expiration');
  	
  	if (token && (expiration > Date.now())) {
  		return true;
  	}
  	return false;
}

export function login({email, password}) {
	return axios.post(`${BASE_URL}/api/login`, {email, password})
		.then(response => {
			return response.data
		})
		.catch(err => Promise.reject(err));
}

export function register({name, username, email, password}) {
	return axios.post(`${BASE_URL}/api/register`, {name, username, email, password})
		.then(response => {
			return response.data
		})
		.catch(err => Promise.reject(err));
}

export function oauth(provider, token) {
	return axios.post(`${BASE_URL}/api/oauth`, { provider, token })
		.then(response => {
			return response.data
		})
		.catch(err => Promise.reject(err));
}

export function handlePasswordReset({ password }, token) {
	return axios.post(`${BASE_URL}/api/user/password/reset/${token}`, { password })
		.then(response => {
			return response.data
		})
		.catch(err => Promise.reject(err));
}

export function sendPasswordReset({ email }) {
	return axios.post(`${BASE_URL}/api/user/password/reset`, { email })
		.then(response => {
			return response.data
		})
		.catch(err => Promise.reject(err));
}

export function activateUser(token) {
	return axios.get(`${BASE_URL}/api/user/activate/${token}`)
		.then(response => {
			return response.data
		})
		.catch(err => Promise.reject(err));
}

export function resendActivationMail(email) {
	return axios.post(`${BASE_URL}/api/user/activation/resend`, {email})
		.then(response => {
			return response.data
		})
		.catch(err => Promise.reject(err));
}

export function getAuthUser() {
	return axios.get(`${BASE_URL}/api/auth/user`)
		.then(response => {
			return response.data
		})
		.catch(err => Promise.reject(err));
}

export function getUser(user_id) {
	return axios.get(`${BASE_URL}/api/users/${user_id}`)
		.then(response => {
			return response.data
		})
		.catch(err => Promise.reject(err));
}

export function getQuota() {
	return axios.get(`${BASE_URL}/api/auth/user/quota`)
		.then(response => {
			return response.data
		})
		.catch(err => Promise.reject(err.message));
}

export function changePassword({old_password, password}) {
	return axios.post(`${BASE_URL}/api/user/password/change`, {old_password, password})
		.then(response => {
			return response.data
		})
		.catch(err => Promise.reject(err));
}

export function updateProfile({name, username}) {
	return axios.post(`${BASE_URL}/api/user/update`, {name, username})
		.then(response => {
			return response.data
		})
		.catch(err => Promise.reject(err));
}


export function uploadAvatar(file, data) {
	let formData = new FormData();
	formData.append('image', file);
	return axios.post(`${BASE_URL}/api/user/avatar`, formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		onUploadProgress: function( progressEvent ) {
			data.uploadProgress = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) );
		}	
	}).then(response => {
		return response.data
	})
	.catch(err => Promise.reject(err));
}

export function convert({content, title, voiceType, language, gender, speed}) {
	const data = {
		content, title, gender, speed,
		voiceType: voiceType.name, 
		language: voiceType.languageCodes[0],
		locale: language
	}
	return axios.post(`${BASE_URL}/api/generate`, data)
		.then(response => {
			return response.data
		})
		.catch(err => Promise.reject(err));
}

export function getVoices() {
	return axios.get(`${BASE_URL}/api/dashboard`)
		.then(response => {
			return response.data
		})
		.catch(err => Promise.reject(err));
}

export function fetchUsers(page = 1) {
	return axios.get(`${BASE_URL}/api/users?page=${page}`)
		.then(response => response.data)
		.catch(err => Promise.reject(err));
}

export function fetchConversions(page = 1) {
	return axios.get(`${BASE_URL}/api/conversions?page=${page}`)
		.then(response => response.data)
		.catch(err => Promise.reject(err));
}

export function deleteConversion(id) {
	return axios.delete(`${BASE_URL}/api/conversions/${id}`)
		.then(response => response.data)
		.catch(err => Promise.reject(err));
}

export function deleteUser(id) {
	return axios.delete(`${BASE_URL}/api/users/${id}`)
		.then(response => response.data)
		.catch(err => Promise.reject(err));
}

export function banUser(id) {
	return axios.post(`${BASE_URL}/api/users/${id}`)
		.then(response => response.data)
		.catch(err => Promise.reject(err));
}

export function makeAdmin(id) {
	return axios.put(`${BASE_URL}/api/admin/add/${id}`)
		.then(response => response.data)
		.catch(err => Promise.reject(err));
}

export function removeAdmin(id) {
	return axios.put(`${BASE_URL}/api/admin/remove/${id}`)
		.then(response => response.data)
		.catch(err => Promise.reject(err));
}

export function getUserOfYear(year) {
	return axios.get(`${BASE_URL}/api/users/year/${year}`)
		.then(response => response.data)
		.catch(err => Promise.reject(err));
}

export function getConversionsOfYear(year) {
	return axios.get(`${BASE_URL}/api/conversions/year/${year}`)
		.then(response => response.data)
		.catch(err => Promise.reject(err));
}

export function adminStats() {
	return axios.get(`${BASE_URL}/api/dashboard/stats/`)
		.then(response => response.data)
		.catch(err => Promise.reject(err));
}