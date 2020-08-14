<template>
	<div class="box">
		<h2 class="title is-3 has-text-centered">{{ routeTitle }}</h2>
		<div class="buttons">
			<button class="button is-fullwidth is-link is-outlined is-medium" :class="{'is-loading': loading }" @click="oauth('facebook')">
		    	<span class="icon">
		    		<i class="fab fa-facebook-square"></i>
		    	</span>
		    	<span>Continue with Facebook</span>
			</button>
			<button class="button is-fullwidth is-light is-medium" :class="{'is-loading': loading }" @click="oauth('google')">
			    <span class="icon">
				    <i class="fab fa-google"></i>
			    </span>
			    <span>Continue with Google</span>
			</button>
		</div>
	    <p class="is-4 has-text-centered title">Or</p>
		<RegistrationForm v-if="route === 'register'"/>
		<LoginForm v-if="route === 'login'"/>
		<SendPasswordReset v-if="route === 'send-password-reset'"/>
		<HandlePasswordReset v-if="route === 'handle-password-reset'"/>
	</div>
</template>

<script>
	import RegistrationForm from './RegistrationForm.vue';
	import LoginForm from './LoginForm.vue';
	import SendPasswordReset from './SendPasswordReset.vue';
	import HandlePasswordReset from './HandlePasswordReset.vue';
	import * as hello from 'hellojs';
	import { oauth, getQuota } from '../../repository/index'; 
	import { FB_KEY, GOOGLE_KEY } from '../../../config';
	import axios from 'axios';

	export default {
		name: 'auth-card',
		components: {
			LoginForm, RegistrationForm, SendPasswordReset, HandlePasswordReset
		},
		mounted(){
			hello.init({
		    	facebook: FB_KEY,
		    	google: GOOGLE_KEY,
		    }, {
				redirect_uri: 'redirect.html'
			});
		},
		data(){
		    return {
				loading: false
		    }
		},
		methods: {
			oauth(provider){
				hello(provider).login({scope: "email"})
		    		.then(({ network, authResponse }) => {
		    			this.toggleLoading()
		    			oauth(network, authResponse.access_token)
		    				.then(data => {
		    					this.$store.dispatch("LOGIN_USER", data)
		    					this.$toasted.show("Welcome Back!", { 
					               theme: "outline", 
					               position: "bottom-right", 
					               duration : 2500,
					               icon: "check_circle"
					            })
		    					this.toggleLoading()
		    					let loader = this.$loading.show({
						            opacity: 0.95
						        });
		    					axios.defaults.headers.common["x-access-token"] = localStorage.getItem('x-access-token');
		    					getQuota()
							        .then(data => {
							        	this.$store.dispatch("UPDATE_QUOTA", data.quota)
							        	loader.hide();
							        })
							        .catch(err => loader.hide())
		    					if(data.user.is_admin === 1){
	                                return this.$router.push('/admin')
	                            }
	                            else {
	                                return this.$router.push('/dashboard')
	                            }
		    				}).catch(err => {
			    				this.$toasted.show((err.response && err.response.data.message || err.message), { 
			                     	theme: "bubble", 
			                     	position: "bottom-right", 
			                     	duration : 2500,
			                     	icon: "report_problem"
			                  	});
		    					this.toggleLoading()
		    				})
		    		})
		    },
		    toggleLoading(){ return this.loading = !this.loading },
		},
		computed: {
	        route() {
	        	return this.$route.meta.authType ? this.$route.meta.authType : this.$store.state.auth_route;
	        },
	        routeTitle(){
	        	if (this.route === "login") {
	        		return "Log in";
	        	}
	        	if (this.route === "register") {
	        		return "Register";
	        	}
	        	if (this.route === "send-password-reset") {
	        		return "Password Reset";
	        	}
	        	if (this.route === "handle-password-reset") {
	        		return "Password Reset";
	        	}
	        	return "Authentication"
	        }
	    }
	}
</script>

