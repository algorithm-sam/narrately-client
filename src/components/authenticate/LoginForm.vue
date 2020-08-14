<template>
	<form @submit.prevent="submit">
		<div class="field">
		  <div class="control">
		  	<input class="input" type="email" placeholder="Username or email" v-model="email">
		  	<p v-if="emailError"><strong><small class="has-text-danger">{{ emailError }}</small></strong></p>
		  </div>
		</div>

		<div class="field">
		  <div class="control">
		  	<input class="input" type="password" placeholder="Password" v-model="password">
		  	<p v-if="passwordError"><strong><small class="has-text-danger">{{ passwordError }}</small></strong></p>
		  </div>
		</div>

		<label class="checkbox">
		  <input type="checkbox">
		  Remember me
		</label>
		<a @click="passwordReset" class="is-pulled-right">forgot password</a>
		<br>
		<br>

		<button class="button is-fullwidth is-primary is-medium" :class="{'is-loading': loading }" type="submit">
	    	Submit
		</button>

		<hr>
		<p>Dont Have an account? <a @click="register">Register</a> </p>
	</form>
</template>

<script>
	import { login, getQuota } from '../../repository';
	import axios from 'axios';

	export default {
		name: 'login-form',
		data(){
		    return {
				email: '',
				emailError: '',
				passwordError: '',
				password: '',
				loading: false
		    }
		},
		methods:{
			register(){
				if (this.$route.name === "login") return this.$router.push("register");
		    	this.$store.dispatch('SHOW_AUTH_FORM', 'register')
		    },
		    passwordReset(){
				if (this.$route.name === "login") return this.$router.push("/password/reset");
		    	this.$store.dispatch('SHOW_AUTH_FORM', 'send-password-reset')
		    },
		    validate(){
		    	!this.email || !(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.email)) ? 
		    		this.emailError = "Please enter a valid email": this.emailError = null;
		    	!this.password  ? 
		    		this.passwordError = "Please enter password": this.passwordError = null;
		    	if (this.emailError || this.passwordError ) return false;
		    	return true
		    },
		    submit() {
		    	if (!this.validate()) return;
		    	this.toggleLoading();
		    	login(this)
			    	.then(data => {
			    		this.email = '';
			    		this.password = '';
			    		this.error = '';
			    		this.$store.dispatch('LOGIN_USER', data);
			    		this.$toasted.show("Welcome Back!", { 
		                    theme: "outline", 
		                    position: "bottom-right", 
		                    duration : 2500,
		                    icon: "check_circle"
		                  })
			    		this.toggleLoading();
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
			    		if(this.$route.query && this.$route.query.nextUrl){
                            return this.$router.push(this.$route.query.nextUrl)
                        }
                        else {
                            if(data.user.is_admin === 1){
                                return this.$router.push('/admin')
                            }
                            else {
                                return this.$router.push('/dashboard')
                            }
                        }
			    	}).catch(err => {
			    		this.$toasted.show((err.response && err.response.data.message || err.message), { 
		                     theme: "bubble", 
		                     position: "bottom-right", 
		                     duration : 2500,
		                     icon: "report_problem"
		                })
			    		this.toggleLoading();
			    	})
		    },
		    toggleLoading(){ return this.loading = !this.loading }
		}
	}
</script>
