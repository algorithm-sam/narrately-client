<template>
	<form @submit.prevent="submit">
		<div class="field">
		  <div class="control">
		  	<input class="input" :class="{ 'is-danger': nameError}" type="text" placeholder="Full Name" v-model="name">
		  	<p v-if="nameError"><strong><small class="has-text-danger">{{ nameError }}</small></strong></p>
		  </div>
		</div>
		<div class="field">
		  <div class="control has-icons-left">
		  	<input class="input" :class="{ 'is-danger': emailError}" type="email" placeholder="email" v-model="email">
		  	<span class="icon is-medium is-left">
	          <i class="fas fa-user"></i>
	        </span>
		  	<p v-if="emailError"><strong><small class="has-text-danger">{{ emailError }}</small></strong></p>
		  </div>
		</div>
		<div class="field">
		  <div class="control">
		  	<input class="input" :class="{ 'is-danger': usernameError}" type="text" placeholder="Username" v-model="username">
		  	<p v-if="usernameError"><strong><small class="has-text-danger">{{ usernameError }}</small></strong></p>
		  </div>
		</div>
		<div class="field">
		  <div class="control">
		  	<input class="input" :class="{ 'is-danger': passwordError}" type="password" placeholder="Password" v-model="password">
		  	<p v-if="passwordError"><strong><small class="has-text-danger">{{ passwordError }}</small></strong></p>
		  </div>
		</div>
		<div class="field">
		  <div class="control">
		  	<input class="input" :class="{ 'is-danger': passwordError}" type="password" placeholder="Re-enter password" v-model="password_confirm">
		  </div>
		</div>

		<button class="button is-fullwidth is-primary is-medium" :class="{'is-loading': loading }" type="submit">
	    	Submit
		</button>

		<hr>
		<p>Already have an account? <a @click="login">Sign in</a> </p>
	</form>
</template>

<script>
	import { register, getQuota } from '../../repository';
	import axios from 'axios';

	export default {
		name: 'registration-form',
		data(){
		    return {
				name: '',
				nameError: null,
				username: '',
				usernameError: null,
				email: '',
				emailError: null,
				password: '',
				password_confirm: '',
				passwordError: null,
				loading: false
		    }
		},
		methods:{
			login(){
				if (this.$route.name === "register") return this.$router.push("login");
		    	this.$store.dispatch('SHOW_AUTH_FORM', "login")
		    },
		    validate(){
		    	!this.name ? this.nameError = "Please enter your full name": this.nameError = null;
		    	!this.username ? this.usernameError = "Please enter a username": this.usernameError = null;
		    	!this.email || !(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.email)) ? 
		    		this.emailError = "Please enter a valid email": this.emailError = null;
		    	!this.password  ? 
		    		this.passwordError = "Please enter password": (this.password === this.password_confirm) ?
		    			this.passwordError = null: this.passwordError = "Password does not match";
		    	if (this.nameError || this.emailError || this.passwordError || this.usernameError ) return false;
		    	return true
		    },
		    resetInput() {
		    	this.name= '';
				this.nameError= null;
				this.username= '';
				this.usernameError= null;
				this.email= '';
				this.emailError= null;
				this.password= '';
				this.password_confirm= '';
				this.passwordError= null;
		    },
		    submit(){
		    	if (!this.validate()) return;
		    	this.toggleLoading()
		    	register(this)
		    		.then(data => {
		    			this.resetInput();
		    			this.$store.dispatch('LOGIN_USER', data)
		    			this.toggleLoading()
			            axios.defaults.headers.common["x-access-token"] = localStorage.getItem('x-access-token');
			            let loader = this.$loading.show({
				            opacity: 0.95
				        });
                    	getQuota()
					        .then(data => {
					        	this.$store.dispatch("UPDATE_QUOTA", data.quota);
					        	loader.hide();
					        })
					        .catch(err => loader.hide())
                    	this.$toasted.show("welcome to Narrately!", { 
			               theme: "outline", 
			               position: "bottom-right", 
			               duration : 2500,
			               icon: "check_circle"
			            });
			            if(data.user.is_admin === 1){
                            return this.$router.push('/admin')
                        }
                        else {
                            return this.$router.push('/dashboard')
                        }
		    		})
		    		.catch(err => {
		    			if (!err.response) {
		    				return this.$toasted.show( err.message, { 
				               theme: "bubble", 
				               position: "bottom-right", 
				               duration : 2500,
				               icon: "report_problem"
					        });
		    			}
		    			let { errors } = err.response.data.errors;
		    			for (var i = 0; i < errors.length; i++) {
		    				this[errors[i].path + "Error"] = errors[i].message;
		    			}
		    			this.$toasted.show(err.response && err.response.data.message || err.message, { 
			               theme: "bubble", 
			               position: "bottom-right", 
			               duration : 2500,
			               icon: "report_problem"
			            })
		    			this.toggleLoading()
		    		})
		    },
		    toggleLoading(){ return this.loading = !this.loading }
		}
	}
</script>
