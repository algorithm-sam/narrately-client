<template>
  <div class="box">
    <article class="media">
      <div class="media-left">
        <figure class="image is-64x64">
          <img :src="avatar" alt="Image" class="image is-64x64 is-rounded">
        </figure>
      </div>
      <div class="media-content">
        <div class="content">
          <p><strong>{{ user.name }}</strong> <small> @{{ user.username }}</small></p>
          <p><strong>email: </strong> {{ user.email }}</p>
          <p style="margin-bottom: 15px !important"><strong>no. of Coversions: </strong> {{ user.Conversions.length }}</p>
          <p class="has-text-grey is-size-7"><strong >joined: </strong> {{ user.createdAt | moment }}</p>
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
            <router-link tag="a" :to="'/admin/users/' + user.id" class="level-item has-text-grey" aria-label="view">
              <span class="icon is-small">
                <i class="fas fa-eye has-text-primary" aria-hidden="true"></i>
              </span>
              <small class="is-hidden-mobile"> &nbsp;&nbsp;&nbsp;view</small>
            </router-link>

            <a v-if="!user.isBanned && isAdmin" class="level-item has-text-grey" aria-label="ban" @click="ban = true" :disabled="loading">
              <span class="icon is-small">
                <i class="fas fa-ban has-text-warning" aria-hidden="true" v-if="!banloading"></i>
                <i class="fas fa-circle-notch fa-spin has-text-grey" aria-hidden="true" v-if="banloading"></i>
              </span>
              <small class="is-hidden-mobile"> &nbsp;&nbsp;&nbsp;ban</small>
            </a>
            <confirm  v-if="!user.isBanned && isAdmin" :activate="ban" :confirm="user.username" @canceled="ban = false" @proceed="onBan">
              Are your sure you want to <strong>ban</strong> this user
            </confirm>

            <a v-if="user.isBanned && isAdmin" class="level-item has-text-grey" aria-label="ban" @click="ban = true" :disabled="loading">
              <span class="icon is-small">
                <i class="fas fa-sync has-text-warning" aria-hidden="true" v-if="!banloading"></i>
                <i class="fas fa-circle-notch fa-spin has-text-grey" aria-hidden="true" v-if="banloading"></i>
              </span>
              <small class="is-hidden-mobile"> &nbsp;&nbsp;&nbsp;unban</small>
            </a>
            <confirm v-if="user.isBanned && isAdmin" :activate="ban" :confirm="user.username" @canceled="ban = false" @proceed="onBan">
              Are your sure you want to <strong>unban</strong> this user
            </confirm>

            <a class="level-item has-text-grey" aria-label="delete" @click="remove = true" v-if="isAdmin" :disabled="loading">
              <span class="icon is-small">
                <i class="fas fa-trash has-text-danger" aria-hidden="true" v-if="!deleteloading"></i>
                <i class="fas fa-circle-notch fa-spin has-text-grey" aria-hidden="true" v-if="deleteloading"></i>
              </span>
              <small class="is-hidden-mobile"> &nbsp;&nbsp;&nbsp;delete</small>
            </a>
            <confirm :activate="remove" :confirm="user.username" @canceled="remove = false" @proceed="onRemove" v-if="isAdmin">
              Are your sure you want to <strong>delete</strong> this user
            </confirm>
          </div>
        </nav>
      </div>
    </article>
  </div>
</template>

<script>
  import { BASE_URL, deleteUser, banUser } from '../../repository';
  import Confirm from '../Confirm';

  export default {
      name: 'user-card',
      props: ['user'],
      components: {
        Confirm
      },
      data(){
        return {
          remove: false,
          ban: false,
          banloading: false,
          deleteloading: false,
        }
      },
      computed: {
        avatar(){
          return this.user && this.user.avatar ? BASE_URL + '/' + this.user.avatar: "/avatar-icon-default.jpg";
        },
        isAdmin(){
          return this.$store.state.user.isAdmin
        },
        loading(){
          return this.banloading || this.deleteloading;
        }
      },
      methods: {
        onRemove(){
          this.deleteloading = true;
          deleteUser(this.user.id)
            .then(() => {
              this.deleteloading = false;
              this.$toasted.show("User has been deleted!", { 
                theme: "outline", 
                position: "bottom-right", 
                duration : 2500,
                icon: "info"
              })
              this.$emit("deleted", this.user.id);
            }).catch(err => {
              this.deleteloading = false;
              this.$toasted.show((err.response && err.response.data.message || err.message), { 
                theme: "bubble", 
                position: "bottom-right", 
                duration : 2500,
                icon: "report_problem"
              })
            })
        },
        onBan(){
          this.banloading = true;
          banUser(this.user.id)
           .then(({user}) => {
              this.banloading = false;
              this.$toasted.show("User has been banned!", { 
                theme: "outline", 
                position: "bottom-right", 
                duration : 2500,
                icon: "info"
              })
              this.$emit("banned", user);
            }).catch(err => {
              this.banloading = false;
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

<style scoped>
  p {
    margin-bottom: 3px !important
  }
</style>