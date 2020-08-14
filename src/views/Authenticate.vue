<template>
	<div class="modal is-active">
		<div class="modal-background"></div>
		<div class="modal-content">
			<auth-card></auth-card>
		</div>
	</div>
</template>

<script>
	import AuthCard from '../components/authenticate/AuthCard.vue';

	export default {
		name: 'authenticate',
		components: {
			AuthCard
		}
	}
</script>


<style scoped>
	.modal-content, .modal-card {
	    max-width: 400px;
	}
	.modal-background {
	    background-color: rgba(236, 236, 236, 0.86);
	}
	.modal-content {
		max-height: 100vh !important;
		padding: 0;
	}
	.box {
		margin-bottom: 0 !important
	}
</style>
