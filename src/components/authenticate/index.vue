<template>
	<div class="modal" :class="{'is-active': active}">
		<div class="modal-background"></div>
		<div class="modal-content">
			<a @click="close" class="is-pulled-right has-text-grey is-hidden-tablet is-size-5"  style="padding-right: 1rem; padding-top: 1rem"><i class="fas fa-times"></i></a>
			<auth-card></auth-card>
		</div>
		<button @click="close" class="modal-close is-large is-hidden-mobile" aria-label="close"></button>
	</div>
</template>

<script>
	import AuthCard from './AuthCard.vue';

	export default {
		name: 'authenticate',
		components: {
			AuthCard
		},
		methods: {
			close(){
				return this.$store.dispatch('HIDE_AUTH_FORM', "login")
		    }
		},
		computed: {
	        active() {
	        	return this.$store.state.show_auth_modal;
	        }
	    }
	}
</script>


<style scoped>
	.modal-content, .modal-card {
	    max-width: 400px;
	}
</style>
