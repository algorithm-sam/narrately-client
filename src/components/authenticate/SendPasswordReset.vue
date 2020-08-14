<template>
	<form @submit="submit">
		<div class="field">
		  <div class="control">
		  	<input class="input" type="text" placeholder="Username or email" v-model="email">
		  </div>
		</div>

		<button class="button is-fullwidth is-primary is-medium" :class="{'is-loading': loading }" type="submit">
	    	Send Password Reset Link
		</button>

		<hr>
		<p>Already have an account? <a @click="login">Sign in</a></p>
		<p>Dont Have an account? <a @click="register">Register</a></p>
	</form>
</template>

<script>
	import { sendPasswordReset } from '../../repository';

	export default {
		name: 'send-password-reset',
		data(){
		    return {
				email: '',
				loading: false
		    }
		},
		methods:{
			login(){
				if (this.$route.name === "send-password-reset") return this.$router.push("/login");
		    	this.$store.dispatch('SHOW_AUTH_FORM', 'login')
		    },
		    register(){
				if (this.$route.name === "send-password-reset") return this.$router.push("/register");
		    	this.$store.dispatch('SHOW_AUTH_FORM', 'register')
		    },
		    submit(event) {
		    	event.preventDefault();
		    	this.toggleLoading()
		    	sendPasswordReset(this)
			    	.then(() => {
			    		this.email = '';
			    		this.$toasted.show("Password reset mail has been sent", { 
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
			    		this.toggleLoading()
			    	})
		    },
		    toggleLoading(){ return this.loading = !this.loading }
		}
	}
</script>
