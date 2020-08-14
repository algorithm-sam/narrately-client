<template>
  <div class="box center">
	<form  @submit.prevent="convert">
		<h3 class="title is-4" style="margin-bottom: 0">Convert Text to Audio</h3>
		<hr>
		<div class="columns is-tablet">
			<div class="column" style="padding-bottom: 0; padding-top: 5px">
				<div class="field">
				  <div class="control">
				     <div class="select">
					    <select required v-model="language">
					      <option disabled selected value="">Select Language</option>
					      <option v-for="language in languages" :value="language" :key="'language-' + language">{{ language }}</option>
					    </select>
					  </div>
				  </div>
				</div>
			</div>	
			<div class="column" style="padding-bottom: 0; padding-top: 5px">
				<div class="field">
				  <div class="control">
				     <div class="select" >
					    <select required v-model="gender" :disabled="!language">
					      <option disabled selected value="" >Select Gender</option>
					      <option value="Male">Male</option>
					      <option value="Female">Female</option>
					    </select>
					  </div>
				  </div>
				</div>
			</div>
		</div>
		<div class="columns is-tablet">
			<div class="column" style="padding-bottom: 0; padding-top: 5px">
				<div class="field">
				  <div class="control">
				    <div class="select">
					    <select required v-model="voiceType" :disabled="!gender">
					      <option disabled selected value="">Select Voice Type</option>
					      <option v-for="voiceType in voiceTypes" :value="voiceType" :key="'voice-' + voiceType.name">{{ voiceType.name.substring(6,50) }}</option>
					    </select>
					  </div>
				  </div>
				</div>
			</div>
			<div class="column" style="padding-bottom: 0; padding-top: 5px">
				<div class="field">
				  <div class="control">
				    <div class="select">
					    <select required :disabled="!voiceType" v-model="speed">
					      <option disabled selected value="">Select Speed</option>
					      <option value="0.25">0.25</option>
					      <option value="0.50">0.50</option>
					      <option value="0.75">0.75</option>
					      <option value="1.00">1</option>
					      <option value="2.00">2</option>
					      <option value="3.00">3</option>
					      <option value="4.00">4</option>
					    </select>
					  </div>
				  </div>
				</div>
			</div>
		</div>
		<div class="field">
		  <div class="control">
		    <input class="input" v-model="title" @keyup="limitTitle" placeholder="Please audio title" :disabled="disabled" />
		  </div>
		</div>
		<div class="field">
		  <div class="control">
		    <textarea class="textarea" v-model="content" @keyup="limitContent" rows="3" placeholder="Enter text to be converted" required :disabled="disabled"></textarea>
		    <small style="margin: 0; font-size: 9px; padding-left: 20px">{{ charOf }}</small>
		  </div>
		</div>
		<div class="control is-clearfix" style="margin-top: -15px">
			<p v-if="!$store.state.user.isActive" class="has-text-warning is-pulled-left">Please activate your account to statrt converting</p>
		    <button class="button is-success is-small is-pulled-right" :class="{'is-loading': loading }" :disabled="!$store.state.user.isActive" type="submit">Convert</button>
		</div>
	</form>
</div>
</template>

<script>
  import { convert } from '../../repository';

  export default {
    name: 'text-to-speech',
    data(){
    	return {
    		content: '',
    		title: '',
    		speed: '1.00',
    		voiceType: '',
    		language: '',
    		gender: '',
    		audio: null,
    		loading: false
    	}
    },
    methods: {
    	limitContent(){
    		return this.content = this.content.substring(0, this.$store.state.quota.characters)
    	},

    	limitTitle(){
    		return this.title = this.title.substring(0, 30)
    	},
    	convert(){
    		if(!this.title) { this.title = this.content.substring(0,25) }
    		this.loading = true;
    		convert(this.$data)
    			.then(data => {
    				this.$store.dispatch("ADD_CONVERSION", data.conversion);
    				this.$store.dispatch("UPDATE_QUOTA", data.quota);
    				if (!data.quota.conversions || !data.quota.characters) {
		            	this.$store.dispatch('SET_UPGRADE_PLAN_NOTIFICATION', true);
		            }
    				this.audio = data.conversion.downloadUrl;
    				this.$toasted.show("Text to speech conversion successful!", { 
		               theme: "outline", 
		               position: "bottom-right", 
		               duration : 2500,
		               icon: "check_circle"
		            });
		            this.title = '';
		            this.content = '';
		            this.loading = false;
		            this.$emit("converted", data.conversion);
    			})
    			.catch(err => {
    				this.$toasted.show((err.response && err.response.data.message || err.message), { 
		               theme: "bubble", 
		               position: "bottom-right", 
		               duration : 2500,
		               icon: "report_problem"
		            });
		            this.loading = false;		            
    			})
    	}
    },
    computed: {
    	charOf(){
    		if(this.content.length) return this.content.length + '/' + this.$store.state.quota.characters;
    		else return '';
    	},
    	disabled(){
    		return (!this.$store.state.quota.characters || !this.$store.state.quota.conversions)
    	},
    	languages(){
       		return this.$store.state.languages;
    	},
    	voiceTypes(){
    		return this.$store.state.voices.filter(voice => {
    			return (voice.language === this.language && this.gender.toLowerCase() === voice.ssmlGender.toLowerCase());
    		})
    	},
    }
  }
</script>

<style>

</style>

