<template>
	<Layout :showSideBar="true">
		<div class="box">
			<h1 class="title is-4 is-light">
				<i class="fas fa-history"></i> 
				<span style="margin-left: 15px">All Activities</span>
			</h1>
		</div>

		<name-card></name-card>
		<div ref="contentContainer">
			<h1 class="title is-5 box"><i class="fas fa-download"></i> Conversions Graph</h1>
			<div class="center-boxes is-desktop">
				<div class="box center conversions">
					<activity-graph-wrapper :data="conversions" title="Conversions" @changedYear="conversionsOfYear"></activity-graph-wrapper>
				</div>	
			</div>
			<h1 class="title is-5 box"><i class="fas fa-users"></i> Users Graph</h1>
			<div class="center-boxes is-desktop">
				<div class="box center conversions">
					<activity-graph-wrapper :data="users" title="Users" @changedYear="usersOfYear"></activity-graph-wrapper>
				</div>	
			</div>
		</div>
	</Layout>
</template>

<script>

import Layout from '../components/layout/index.vue';
import NameCard from '../components/profile/NameCard.vue';
import ActivityGraphWrapper from '../components/dashboard/ActivityGraphWrapper.vue';
import { getUserOfYear, getConversionsOfYear, adminStats } from '../repository'

export default {
	name: 'user-activites',
	components: {
		Layout,
		NameCard,
		ActivityGraphWrapper
	},
	data() {
		return {
			conversions: [],
			users: [],
		}
	},
	mounted(){
		this.loadAll();
	},
	methods: {
		usersOfYear(year){
			let loader = this.$loading.show({
		        opacity: 0.95
		    });
			getUserOfYear(year)
				.then(({users}) => {
					this.users = users;
					loader.hide();
				})
				.catch(err => {
					this.$toasted.show((err.response && err.response.data.message || err.message), { 
	                    theme: "bubble", 
	                    position: "bottom-right", 
	                    duration : 2500,
	                    icon: "report_problem"
	                })
	                loader.hide();
				})
		},
		conversionsOfYear(year){
			let loader = this.$loading.show({
		        opacity: 0.95
		    });
			getConversionsOfYear(year)
				.then(({conversions}) => {
					this.conversions = conversions;
					loader.hide();
				})
				.catch(err => {
					this.$toasted.show((err.response && err.response.data.message || err.message), { 
	                    theme: "bubble", 
	                    position: "bottom-right", 
	                    duration : 2500,
	                    icon: "report_problem"
	                })
	                loader.hide();
				})
		},
		loadAll(){
			let loader = this.$loading.show({
		        opacity: 0.95
		    });
			adminStats()
				.then(({users, conversions}) => {
					this.users = users;
					this.conversions = conversions;
					loader.hide();
				}).catch(err => {
					this.$toasted.show((err.response && err.response.data.message || err.message), { 
	                    theme: "bubble", 
	                    position: "bottom-right", 
	                    duration : 2500,
	                    icon: "report_problem"
	                })
	                loader.hide();
				})
		}
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
