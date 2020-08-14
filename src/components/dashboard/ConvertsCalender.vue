<template>
	<div >
		<v-calendar class="e-calender" :attributes="attributes"></v-calendar>
	</div>
</template>

<script>
	
	export default {
	    name: 'converts-calender',
	    data(){
	    	return {
	    		content: '',
	    		title: '',
	    		audio: null
	    	}
	    },
	    computed: {
	    	attributes(){
	    		let dates = this.$store.state.user.Conversions ? this.$store.state.user.Conversions.map(conversion => ({
					dates: new Date(conversion.createdAt),
					dot: {
						backgroundColor: "#009805",
						opacity: 0.5,
					},
					popover: {
						label: conversion.title.substring(0, 20) + (conversion.title.length > 20 ? "...": ""),
					},
		        })): [];
		        dates.push(
		        	{
			        	contentStyle: {
			        		fontWeight: '700',
			            	fontSize: '.9rem',
			          	},
			        	dates: new Date(),
			        }
		       	)
		       	return dates;
	    	}
	    }
	}
</script>

<style scoped>
	.e-calender {
		width: 100% !important; 
		padding: 20px 10px !important; 
		border: none !important;
		z-index: 500
	}
	.c-header{
		margin-bottom: 20px !important;
	}
</style>
