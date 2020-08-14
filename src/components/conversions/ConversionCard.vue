<template>
  <div class="box">
    <article class="media">
      <div class="media-content">
        <div class="content">
          <h5 class="is-5 title" style="margin-bottom: 3px !important">{{ conversion.title }}</h5>
          <p>
            {{ conversion.content.substring(0,100) }}
            <span v-if="conversion.content.length > 100">...</span>
          </p>
          <p class="is-clearfix">
            <span class="is-pulled-left has-text-grey is-size-7"><strong>created at: </strong>{{ conversion.createdAt | moment }}</span>
          </p>
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
            <a class="level-item has-text-grey" aria-label="view" @click="$emit('view', conversion)">
              <span class="icon is-small">
                <i class="fas fa-eye has-text-primary" aria-hidden="true"></i>
              </span>
              <small class="is-hidden-mobile"> &nbsp;&nbsp;&nbsp;view</small>
            </a>
            <a class="level-item has-text-grey" aria-label="delete" @click="remove = true" v-if="$store.state.user.isAdmin">
              <span class="icon is-small">
                <i class="fas fa-trash has-text-danger" aria-hidden="true"></i>
              </span>
              <small class="is-hidden-mobile"> &nbsp;&nbsp;&nbsp;delete</small>
            </a>
            <confirm :activate="remove" :confirm="conversion.title" @canceled="remove=false" @proceed="onRemove" v-if="$store.state.user.isAdmin">
              Are your sure you want to <strong>delete</strong> this conversion
            </confirm>
          </div>
        </nav>
      </div>
    </article>
  </div>
</template>

<script>
  import { BASE_URL, deleteConversion } from '../../repository';
  import Confirm from '../Confirm';

  export default {
      name: 'conversion-card',
      props: ['conversion'],
      components: {
        Confirm
      },
      data(){
        return {
          remove: false,
        }
      },
      computed: {
        url(){
          return this.conversion && this.conversion.downloadUrl ? BASE_URL + '/' + this.conversion.downloadUrl: "";
        }
      },
      methods: {
        onRemove(){
          deleteConversion(this.conversion.id)
            .then(() => {
              this.$toasted.show("Conversion has been deleted!", { 
                theme: "outline", 
                position: "bottom-right", 
                duration : 2500,
                icon: "info"
              })
              this.$emit("deleted", this.conversion.id);
            }).catch(err => {
              this.$toasted.show((err.response && err.response.data.message || err.message), { 
                theme: "bubble", 
                position: "bottom-right", 
                duration : 2500,
                icon: "report_problem"
              })
            })
        }
      }
    }
</script>

<style>
  
</style>