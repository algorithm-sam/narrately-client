<template>
    <div class="modal" :class="{'is-active': active}">
        <div class="modal-background" @click="close"></div>
        <div class="modal-content">
            <a @click="close" class="is-pulled-right has-text-grey is-hidden-tablet is-size-5"  style="padding-right: 1rem; padding-top: 1rem"><i class="fas fa-times"></i></a>
            <div class="box">
                
            	<h2 class="is-3 title">{{ conversion.title }} <p class="is-size-7 has-text-grey-light">{{ conversion.createdAt | moment }}</p></h2>
                <p>{{ conversion.content }}</p><br>
                <p><strong>file url: </strong><a :href="url">{{ url }}</a></p><br>
            	<div class="m-t-10" v-if="conversion.downloadUrl">
            		<audio autoplay="" controls="controls" ref="player" style="width: 100%">
            			<source :src="url" type="audio/mpeg">
            			Your browser does not support the audio element.
            		</audio>
            	</div>
            </div>
        </div>
        <button @click="close" class="modal-close is-large is-hidden-mobile" aria-label="close"></button>
    </div>
</template>

<script>
  import { BASE_URL } from '../../repository';

  export default {
    name: 'conversion-item-modal',
    props: ['conversion', "active"],
    methods: {
        close(){
            return this.$emit('close') 
        }
    },
    mounted: function () {
        this.$watch('url', function() {
            this.$refs.player.load()
        });
    },
    computed: {
        url(){
            return BASE_URL + this.conversion.downloadUrl;
        }
    }
  }
</script>

<style>

</style>

