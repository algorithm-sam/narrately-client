<template>
	<form @submit="submit">
		<div class="field">
		  <div class="control">
		  	<input class="input" type="password" placeholder="Password" v-model="password">
		  	<p v-if="passwordError"><strong><small class="has-text-danger">{{ passwordError }}</small></strong></p>
		  </div>
		</div>

		<div class="field">
		  <div class="control">
		  	<input class="input" type="password" placeholder="Confirm Password" v-model="password_confirm">
		  </div>
		</div>

		<button class="button is-fullwidth is-primary is-medium" :class="{'is-loading': loading }" type="submit">
	    	Submit
		</button>

		<hr>
		<p>Already have an account? <a @click="login">Sign in</a></p>
		<p>Dont Have an account? <a @click="register">Register</a></p>
	</form>
</template>

<script>
	import { handlePasswordReset } from '../../repository';

	export default {
		name: 'handle-password-reset',
		data(){
		    return {
				password: '',
				password_confirm: '',
				passwordError: '',
				loading: false
		    }
		},
		methods:{
			login(){
				if (this.$route.name === "handle-password-reset") return this.$router.push("/login");
		    	this.$store.dispatch('SHOW_AUTH_FORM', 'login')
		    },
		    register(){
				if (this.$route.name === "handle-password-reset") return this.$router.push("/register");
		    	this.$store.dispatch('SHOW_AUTH_FORM', 'register')
		    },
		    validate(){
				!this.password  ? 
		    		this.passwordError = "Please enter password": (this.password === this.password_confirm) ?
		    			this.passwordError = null: this.passwordError = "Password does not match";
		    	return this.passwordError
		    },
		    submit(event) {
		    	event.preventDefault();
		    	if (this.validate()) return;
		    	this.toggleLoading();
		    	handlePasswordReset(this, this.$route.params.token)
			    	.then(() => {
			    		this.password = '';
			    		this.$toasted.show("Password Changed succesfully", { 
		                    theme: "outline", 
		                    position: "bottom-right", 
		                    duration : 2500,
		                    icon: "check_circle"
		                  })
			    		this.toggleLoading();
						this.login();
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
