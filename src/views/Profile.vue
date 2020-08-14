<template>
	<Layout :showSideBar="true">
		<div class="box">
			<h1 class="title is-4 is-light">
				<i class="fas fa-user-cog"></i> 
				<span style="margin-left: 15px">Profile</span>
			</h1>
		</div>

		<!-- <name-card></name-card> -->

		<div class="columns" style="background-color:rgba(255, 255, 255, 0.05);">
			<div class="column ">
				<div class="columns">
					<div class="column is-one-quarter" style="padding-bottom: 0">
						<avatar-card></avatar-card>
					</div>
					<div class="column" >
						<general-information></general-information>
						<change-password></change-password>				
					</div>
				</div>					
			</div>
		</div>
	</Layout>
</template>

<script>

import Layout from '../components/layout/index.vue';
import ChangePassword from '../components/profile/ChangePassword.vue';
import GeneralInformation from '../components/profile/GeneralInformation.vue';
// import NameCard from '../components/profile/NameCard.vue';
import AvatarCard from '../components/profile/AvatarCard.vue';

export default {
	name: 'profile',
	components: {
		Layout,
		ChangePassword,
		GeneralInformation,
		// NameCard,
		AvatarCard
	}	
}
</script>

<style >
	.divider{
		margin: 10px auto;
	}
	.m-b-15{
		margin-bottom: 15px;
	}
	.image{
		height: auto;
		width: 100%;
		margin-bottom: 15px;
	}
</style>
