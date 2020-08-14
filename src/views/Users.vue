<template>
	<Layout :showSideBar="true">
		<div class="box ">
			<h1 class="title is-4 is-light">
				<i class="fas fa-users"></i> 
				<span style="margin-left: 15px">All Users</span>
			</h1>
		</div>
		
		<div ref="contentContainer">
			<div class="center" v-if="users.length">
				<user-card v-for="user in users" :user="user" :key="'user-card-' + user.id" @deleted="onDeleted" @banned="onBanned"></user-card>
			</div>

			<div class="center box" v-if="!users.length">
				<h3 class="is-3" >Users not avaliable yet!</h3>
			</div>
		</div>

		<div class="box" style="background-color:rgba(255, 255, 255, 0.05);">
			<paginator :current_page="page" :pages="pages" @getPage="getPage"></paginator>
		</div>
	</Layout>
</template>

<script>

import Layout from '../components/layout/index.vue';
import Paginator from '../components/users/Paginator.vue';
import UserCard from '../components/users/UserCard.vue';
import { fetchUsers } from '../repository' 
export default {
	name: 'users-list',
	components: {
		Layout,
		Paginator,
		UserCard
	},
	data() {
		return {
			users: [],
			pages: 1,
			page: 1,
			count: 1
		}
	},
	mounted() {
		this.getPage();
	},
	methods: {
		showConversion(conversion){
			this.conversion = conversion;
			this.$store.dispatch('TOGGLE_CONVERSION_ITEM_CARD')
		},
		getPage(page = this.$route.query.page ? this.$route.query.page: 1){
			let loader = this.$loading.show({
		        opacity: 0.95
		    });
			fetchUsers(page)
				.then(data =>{
					this.users = data.users;
					this.pages = data.pages;
					this.page = data.current_page;
					this.count = data.count;
					window.scrollTo(0, 0);
					this.$rou
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
		onDeleted(id){
			this.users = this.users.filter((user) => user.id != id )
		},
		onBanned(bannedUser){
			this.users = this.users.map((user) => {
				if (user.id === bannedUser.id) {
					return bannedUser;
				} else {
					return user;
				}
			})
		}
	}
}
</script>

<style scoped>
	.center {
		min-height: calc(100vh - 300px);
		display: block;
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
