<template>
  <Layout :showSideBar="true">
    <div class="box is-paddingle">
      <h1 class="title is-4 is-light">
        <i class="fas" :class="{'fa-user': !user.isAdmin, 'fa-user-shield': user.isAdmin }"> </i> 
        <span style="margin-left: 15px">@{{ user.username }}</span>
      </h1>
    </div>
    <div>
      <div class="box center">
        <article class="columns is-tablet">
          <div class="column is-one-quarter-tablet">
            <figure class="image is-128x128">
              <img :src="avatar" alt="Image">
            </figure>
          </div>
          <div class="column is-three-quarters-tablet">
            <div class="content">
              <p>
                <strong>{{ user.name }}</strong> <small> @{{ user.username }}</small> &nbsp;<span class="tag is-primary" v-if="user.isAdmin">admin</span>
                <br>
                <strong>joined: </strong> {{ user.createdAt | moment }}<br>
                <strong>email: </strong> {{ user.email }}
                <br>
                <strong>no. of Coversions: </strong> {{ user.Conversions && user.Conversions.length }}
              </p>
            </div>
            <nav class="level is-mobile">
              <div class="level-left">
                <a v-if="!user.isBanned && $store.state.user.isAdmin" class="level-item has-text-grey" aria-label="ban" @click="ban = true" :disabled="loading">
                  <span class="icon is-small">
                    <i class="fas fa-ban has-text-warning" aria-hidden="true" v-if="!banloading"></i>
                    <i class="fas fa-circle-notch fa-spin has-text-grey" aria-hidden="true" v-if="banloading"></i>
                  </span>
                  <small class="is-hidden-mobile"> &nbsp;&nbsp;&nbsp;ban</small>
                </a>
                <confirm  v-if="!user.isBanned && $store.state.user.isAdmin" :activate="ban" :confirm="user.username" @canceled="ban = false" @proceed="onBan">
                  Are you sure you want to <strong>ban</strong> this user
                </confirm>

                <a v-if="user.isBanned && $store.state.user.isAdmin" class="level-item has-text-grey" aria-label="ban" @click="ban = true" :disabled="loading">
                  <span class="icon is-small">
                    <i class="fas fa-sync has-text-warning" aria-hidden="true" v-if="!banloading"></i>
                    <i class="fas fa-circle-notch fa-spin has-text-grey" aria-hidden="true" v-if="banloading"></i>
                  </span>
                  <small class="is-hidden-mobile"> &nbsp;&nbsp;&nbsp;unban</small>
                </a>
                <confirm v-if="user.isBanned && $store.state.user.isAdmin" :activate="ban" :confirm="user.username" @canceled="ban = false" @proceed="onBan">
                  Are you sure you want to <strong>unban</strong> this user
                </confirm>
                <a class="level-item has-text-grey" aria-label="delete" @click="remove = true" :disabled="loading">
                  <span class="icon is-small">
                    <i class="fas fa-trash has-text-danger" aria-hidden="true" v-if="!deleteloading"></i>
                    <i class="fas fa-circle-notch fa-spin has-text-grey" aria-hidden="true" v-if="deleteloading"></i>
                  </span>
                  <small class="is-hidden-mobile"> &nbsp;&nbsp;&nbsp;delete</small>
                </a>
                <confirm :activate="remove" :confirm="user.username" @canceled="remove = false" @proceed="onRemove">
                  Are you sure you want to <strong>delete</strong> this user
                </confirm>

                <a v-if="!user.isAdmin && $store.state.user.isSuperAdmin" class="level-item has-text-grey" aria-label="ban" @click="ban = true" :disabled="loading">
                  <span class="icon is-small">
                    <i class="fas fa-user-shield has-text-warning" aria-hidden="true" v-if="!adminloading"></i>
                    <i class="fas fa-circle-notch fa-spin has-text-grey" aria-hidden="true" v-if="adminloading"></i>
                  </span>
                  <small class="is-hidden-mobile"> &nbsp;&nbsp;&nbsp;make admin</small>
                </a>
                <confirm  v-if="!user.isAdmin && $store.state.user.isSuperAdmin" :activate="ban" :confirm="user.username" @canceled="ban = false" @proceed="makeAdmin">
                  Are you sure you want to <strong>make</strong> this user an <strong>admin?</strong>
                </confirm>

                <a v-if="user.isAdmin && $store.state.user.isSuperAdmin" class="level-item has-text-grey" aria-label="ban" @click="ban = true" :disabled="loading">
                  <span class="icon is-small">
                    <i class="fas fa-user has-text-warning" aria-hidden="true" v-if="!adminloading"></i>
                    <i class="fas fa-circle-notch fa-spin has-text-grey" aria-hidden="true" v-if="adminloading"></i>
                  </span>
                  <small class="is-hidden-mobile"> &nbsp;&nbsp;&nbsp;remove admin</small>
                </a>
                <confirm v-if="user.isAdmin && $store.state.user.isSuperAdmin" :activate="ban" :confirm="user.username" @canceled="ban = false" @proceed="removeAdmin">
                  Are you sure you want to <strong>remove</strong> this user <strong>adminstrative privileges</strong>?
                </confirm>
              </div>
            </nav>
          </div>
        </article>
        <hr>
        <div>
          <h3 class="is-4 title" style="margin-bottom: 0.75rem">Conversions</h3>
          <div v-for="conversion in user.Conversions"  :key="'conversion-' + conversion.id">
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

          <conversion-item-modal :conversion="conversion" :active="show" @close="toggleConversionItemCard"></conversion-item-modal>

          <div v-if="!user.Conversions || !user.Conversions.length">
            <h3 class="is-5 subtitle has-text-grey-light">No conversions yet!</h3>
          </div>
        </div>
      </div>
    </div>

    </Layout>
</template>

<script>
  import { BASE_URL, getUser, banUser, deleteUser, makeAdmin, removeAdmin } from '../repository';
  import Confirm from '../components/Confirm';
  import Layout from '../components/layout/index.vue';
  import ConversionItemModal from '../components/dashboard/ConversionItemModal.vue';

  export default {
      name: 'user-view',
      components: {
        Confirm, Layout, ConversionItemModal
      },
      data(){
        return {
          remove: false,
          ban: false,
          user: {},
          show: false,
          conversion: {},
          banloading: false,
          deleteloading: false,
          adminloading: false,
        }
      },
      computed: {
        avatar(){
          return this.user && this.user.avatar ? BASE_URL + '/' + this.user.avatar: "/avatar-icon-default.jpg";
        },
        loading(){
          return this.banloading || this.deleteloading;
        }
      },
      mounted(){
        let loader = this.$loading.show({
            opacity: 0.95
        });
        getUser(this.$route.params.user_id).then(({user}) => {
          this.user = user;
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
            this.$router.push('/admin/users');
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
              this.$toasted.show("User has been banned!", { 
                theme: "outline", 
                position: "bottom-right", 
                duration : 2500,
                icon: "info"
              })
              this.user.isBanned = user.isBanned;
              this.banloading = false;
            }).catch(err => {
              this.$toasted.show((err.response && err.response.data.message || err.message), { 
                theme: "bubble", 
                position: "bottom-right", 
                duration : 2500,
                icon: "report_problem"
              })
              this.banloading = false;
            })
        },
        makeAdmin(){
          this.adminloading = true;
          makeAdmin(this.user.id)
           .then(({user}) => {
              this.$toasted.show("Adminstrator successfully created!", { 
                theme: "outline", 
                position: "bottom-right", 
                duration : 2500,
                icon: "info"
              })
              this.user.isAdmin = user.isAdmin;
              this.adminloading = false;
            }).catch(err => {
              this.$toasted.show((err.response && err.response.data.message || err.message), { 
                theme: "bubble", 
                position: "bottom-right", 
                duration : 2500,
                icon: "report_problem"
              })
              this.adminloading = false;
            })
        },
        removeAdmin(){
          this.adminloading = true;
          removeAdmin(this.user.id)
           .then(({user}) => {
              this.$toasted.show("Adminstrator successfully removed!", { 
                theme: "outline", 
                position: "bottom-right", 
                duration : 2500,
                icon: "info"
              })
              this.user.isAdmin = user.isAdmin;
              this.adminloading = false;
            }).catch(err => {
              this.$toasted.show((err.response && err.response.data.message || err.message), { 
                theme: "bubble", 
                position: "bottom-right", 
                duration : 2500,
                icon: "report_problem"
              })
              this.adminloading = false;
            })
        },
        showConversion(conversion){
          this.conversion = conversion;
          this.toggleConversionItemCard()
        },
        toggleConversionItemCard(){
          return this.show = !this.show;
        },
      }
    }
</script>

<style scoped>
  .center {
    min-height: calc(100vh - 300px)
  }
</style>