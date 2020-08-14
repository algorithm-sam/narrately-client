<template>
	<Layout :showSideBar="true">
		<div class="box">
			<h1 class="title is-4 is-light">
				<i class="fas fa-history"></i> 
				<span style="margin-left: 15px">My Activities</span>
			</h1>
		</div>

		<name-card></name-card>

		<div class="columns center-boxes is-desktop">
			<div class="column" >
				<h1 class="title is-5 box"><i class="fas fa-chart-line"></i> Conversions Graph</h1>
				<div class="box center conversions">
					<activity-graph-wrapper :data="$store.state.user.Conversions" title="Conversion"></activity-graph-wrapper>
				</div>				
			</div>
			<div class="column is-one-third ">
				<h1 class="title is-5 box"><i class="fas fa-calendar-alt"></i> Conversions Calender</h1>
				<div class="box center conversions">
					<converts-calender></converts-calender>
				</div>
			</div>
		</div>
	</Layout>
</template>

<script>

import Layout from '../components/layout/index.vue';
import NameCard from '../components/profile/NameCard.vue';
import ActivityGraphWrapper from '../components/dashboard/ActivityGraphWrapper.vue';
import ConvertsCalender from '../components/dashboard/ConvertsCalender.vue';

export default {
	name: 'user-activites',
	components: {
		Layout,
		NameCard,
		ConvertsCalender,
		ActivityGraphWrapper
	}
}
</script>

<style scoped>
	@media screen and (max-width: 768px){
        .conversions{
			height: 400px;
		}

		.center-boxes .column {
			padding-bottom: 0;
		}
    }

    @media screen and (min-width: 768px){
        .center{
			height: 420px;
		}
    }

    .box {
    	margin-bottom: 0.4em;
    }
    .center{
		overflow-y: auto;
	}
	
	.center::-webkit-scrollbar {
	  width: 3px;
	}

	.center::-webkit-scrollbar-track {
	  background: #f5f5f5; 
	}
	 
	.center::-webkit-scrollbar-thumb {
	  background: #ddd; 
	  border-radius: 6px
	}

	.center::-webkit-scrollbar-thumb:hover {
	  background: #999; 
	}
	.divider{
		margin: 10px auto;
	}
	.m-b-15{
		margin-bottom: 15px;
	}
	.m-t-10{
		margin-top: 10px;
	}
</style>
