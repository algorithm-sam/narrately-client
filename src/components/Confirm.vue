<template>
	<div class="modal" :class="{'is-active': activate}">
		<div class="modal-background"></div>
		<div class="modal-content">
			<div class="box has-text-centered">
				<p><slot></slot></p>
				<form @submit="proceed">
					<div v-if="confirm" class="field control has-text-centered">
						<p>If yes, enter <code >{{ confirm }}</code> in the input field to continue</p>
						<br>
						<input type="text" v-model="confirmed" class="input">
						<p v-if="error"><strong><small class="has-text-danger">{{ error }}</small></strong></p>
					</div>
					<div>
						<button class="button is-outlined" @click="close">cancel</button>&nbsp;&nbsp;&nbsp;
						<button class="button is-danger" type="">proceed</button>
					</div>
				</form>
			</div>
		</div>
		<button @click="close" class="modal-close is-large" aria-label="close"></button>
	</div>
</template>

<script>
	
	export default {
		name: 'confirm',
		props: ['activate', 'confirm'],
		data(){
			return {
				confirmed: '',
				open: false,
				error: ''
			}
		},
		methods: {
			close(){
				return this.$emit('canceled');
		    },
		    proceed(event){
		    	event.preventDefault();
		    	if(this.confirm  && !(this.confirm.trim() === this.confirmed.trim())){
		    		return this.error = "Text does not match"
		    	} else  {
		    		this.error = '';
		    	}
		    	this.confirmed = '';
		    	this.close();
		    	return this.$emit('proceed')
		    }
		}
	}
</script>


<style scoped>
	.modal-content, .modal-card {
	    max-width: 400px;
	}
</style>
