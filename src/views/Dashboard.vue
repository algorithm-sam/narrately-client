<template>
	<Layout :showSideBar="true">
		<div class="box">
			<h1 class="title is-4 is-light">
				<i class="fas fa-home"></i> 
				<span style="margin-left: 15px">Dashboard</span>
			</h1>
		</div>

		<name-card></name-card>

		<div class="columns center-boxes is-desktop is-paddingless is-marginless">
			<div class="column is-paddingless is-marginless">
				<div class="columns ">
					<div class="column " >
						<text-to-speech @converted="showConversion"></text-to-speech>					
					</div>
					<div class="column is-one-third is-">
						<div class="box center conversions">
							<h3 class="is-4 title">My Conversions</h3>
							<div v-for="conversion in conversions.slice(0, 5)"  :key="'conversion-' + conversion.id">
								<hr class="divider">
								<h5 class="is-5 title" style="margin-bottom: 3px !important">{{ conversion.title }}</h5>
								<p>
									{{ conversion.content.substring(0,100) }}
									<span v-if="conversion.content.length > 100">...</span>
								</p>
								<p class="is-clearfix">
									<a class="is-pulled-left has-text-grey is-size-7">{{ conversion.createdAt | moment }}</a>
									<a class="is-pulled-right has-text-grey is-size-7" @click="showConversion(conversion)"><i class="fas fa-eye"></i> view</a>
								</p>
							</div>
							<hr class="divider"  v-if="conversions.length > 5">
							<p class="is-clearfix" v-if="conversions.length > 5">
								<router-link to="/user/conversions" tag="a" class="has-text-grey is-pulled-right">view all</router-link>
							</p>
							<div v-if="conversions && !conversions.length">
								<hr class="divider">
								<h3 class="is-4 subtitle has-text-grey-lighter">No conversions yet!</h3>
								<hr class="divider"><hr class="divider"><hr class="divider"><hr class="divider"><hr class="divider"><hr class="divider"><hr class="divider"><hr class="divider"><hr class="divider"><hr class="divider"><hr class="divider"><hr class="divider"><hr class="divider"><hr class="divider"><hr class="divider"><hr class="divider"><hr class="divider"><hr class="divider"><hr class="divider"><hr class="divider">
							</div>
							<conversion-item-modal :conversion="conversion" :active="conversionModalActive" @close="toggleConversionItemCard"></conversion-item-modal>
						</div>
					</div>
				</div>					
			</div>
		</div>
	</Layout>
</template>

<script>

import Layout from '../components/layout/index.vue';
import NameCard from '../components/profile/NameCard.vue';
import TextToSpeech from '../components/dashboard/TextToSpeech.vue';
// import ConvertsCalender from '../components/dashboard/ConvertsCalender.vue';
import ConversionItemModal from '../components/dashboard/ConversionItemModal.vue';

export default {
	name: 'dashboard',
	components: {
		Layout,
		NameCard,
		TextToSpeech,
		// ConvertsCalender,
		ConversionItemModal
	},
	mounted(){
		if (this.$route.params.msg) {
			this.$toasted.show(this.$route.params.msg, { 
                theme: "bubble", 
                position: "bottom-right", 
                duration : 2500,
                icon: "report_problem"
            })
		}
	},
	data() {
		return {
			conversion: {},
			conversionModalActive: false,
		}
	},
	methods: {
		showConversion(conversion){
			this.conversion = conversion;
			this.toggleConversionItemCard()
		},
		toggleConversionItemCard(){
			return this.conversionModalActive = !this.conversionModalActive;
		}
	}, 
	computed: {
		conversions(){
			return this.$store.state.user.Conversions || [];
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
