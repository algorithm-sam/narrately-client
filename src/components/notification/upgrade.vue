<template>
	<div class="speech-bubble">
	<p class="is-size-6"><i class="fas fa-info"></i>&nbsp;&nbsp; Subscription upgrade will soon be avialable. &nbsp;<i class="fas fa-times is-pulled-right" @click="close"></i></p>
	</div>
</template>

<script>
	export default {
		name: 'upgrade-plan',
		methods: {
			close(){
				return this.$store.dispatch('SET_UPGRADE_PLAN_NOTIFICATION', false);
		    },
		}
	}
</script>

<style>
	.speech-bubble {
		position: fixed;
		background: #00d1b2;
		bottom: 1.5rem;
		left: 1.5rem;
		padding: 0.75rem;
		color: white;
		-webkit-box-shadow: 2px 2px 15px 3px rgba(0,0,0,0.3) !important;
        box-shadow: 2px 2px 15px 3px rgba(0,0,0,0.3) !important;
        margin-right: 1rem;
	}

	.speech-bubble:after {
		content: '';
		position: absolute;
		left: 0;
		top: 50%;
		width: 0;
		height: 0;
		border: 0.6em solid transparent;
		border-right-color: #00d1b2;
		border-left: 0;
		margin-top: -0.6em;
		margin-left: -0.6em;
	}

	
	@media screen and (min-width: 768px){
        .speech-bubble{
			bottom: 4rem;
			left: 3rem;
		}
    }
</style>