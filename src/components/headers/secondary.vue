<template>
  <nav class="navbar has-shadow is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand " style="margin-left: 1rem">
        <router-link tag="a" to="/" class="navbar-item">
          <strong style="font-size: 25px" class="has-text-primary">Narrately</strong>
        </router-link>

        <div style="margin-left: auto; margin-right: 1rem">
          <a role="button" class="navbar-burger burger is-pulled-right" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
          <div v-if="$store.state.user" class="is-hidden-desktop is-pulled-right">
              <router-link tag="a" to="/dashboard" >
                  <figure class="image is-32x32" style="margin-top: 12px">
                  <img :src="avatar" alt="Image" class="image img is-rounded is-32x32">
                </figure>
              </router-link>
          </div>
        </div>
        
      </div>

      <div id="navbarBasicExample" class="navbar-menu ">
        <div class="navbar-start">
          <!-- <router-link tag="a" to="/" class="navbar-item is-4">
            Home
          </router-link>

          <router-link tag="a" to="/about" class="navbar-item is-4">
            About
          </router-link> -->
        </div>

        <div class="navbar-end">

          <div class="navbar-item" v-if="!$store.state.user">
            <div class="buttons">
              <a class="button is-primary" @click="register">
                <strong>Sign up</strong>
              </a>
              <a class="button is-light" @click="login">
                <strong>Log in</strong>
              </a>
            </div>
          </div>
          
          <div v-if="$store.state.user" class="desktop-avatar">
            <router-link tag="a" to="/dashboard" >
              <figure class="image is-48x48 avatar" style="margin-top: 7px;">
                <img :src="avatar" alt="Image" class="image img is-rounded is-48x48" >
              </figure>
            </router-link>
          </div>

          <div class="navbar-item has-dropdown is-hoverable"  v-if="$store.state.user">
            <a class="navbar-link is-hidden-mobile is-hidden-tablet-only"></a>
            <div class="navbar-dropdown">
              <router-link tag="a" to="/dashboard" class="navbar-item">
                <strong><i class="fas fa-cog"></i>&nbsp;&nbsp;Dashboard</strong>
              </router-link>
              <router-link tag="a" to="/profile" class="navbar-item">
                <strong><i class="fas fa-user"></i>&nbsp;&nbsp;Profile</strong>
              </router-link>
              <router-link tag="a" to="/user/conversions" class="navbar-item">
                <strong class="text-has-info"><i class="fas fa-pen-alt"></i>&nbsp;&nbsp;My Conversions</strong>
              </router-link>
              <router-link tag="a" to="/activities" class="navbar-item">
                <strong><i class="fas fa-history"></i>&nbsp;&nbsp;My Activities</strong>
              </router-link>
              <router-link tag="a" to="/admin/users" class="navbar-item" v-if="$store.state.user.isAdmin">
                <strong class="text-has-info"><i class="fas fa-users"></i>&nbsp;&nbsp;All Users</strong>
              </router-link>
              <router-link tag="a" to="/admin/conversions" class="navbar-item" v-if="$store.state.user.isAdmin">
                <strong class="text-has-info"><i class="fas fa-pen"></i>&nbsp;&nbsp;All Conversions</strong>
              </router-link>
              <router-link tag="a" to="/admin/activities" class="navbar-item" v-if="$store.state.user.isAdmin">
                <strong class="text-has-info"><i class="fas fa-chart-line"></i>&nbsp;&nbsp;All Activities</strong>
              </router-link>
              <a class="navbar-item" @click="signOut" >
                <i class="fas fa-power-off"></i>&nbsp;&nbsp;Sign Out
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import { BASE_URL } from '../../repository';
  export default {
    name: 'secondary-header',
    methods: {
      login(){
        this.$store.dispatch('SHOW_AUTH_FORM', "login")
      },
      register(){
        this.$store.dispatch('SHOW_AUTH_FORM', "register")
      },
      signOut(){
        this.$store.dispatch('SIGN_OUT');
        return this.$router.push('/');
      }
    },
    mounted(){
      const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
        if ($navbarBurgers.length > 0) {
            $navbarBurgers.forEach( el => {
            el.addEventListener('click', () => {

              // Get the target from the "data-target" attribute
              const target = el.dataset.target;
              const $target = document.getElementById(target);

              // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
              el.classList.toggle('is-active');
              $target.classList.toggle('is-active');

            });
          });
        }
    },
    computed: {
      avatar(){
        return this.$store.state.user && this.$store.state.user.avatar ? BASE_URL + '/' + this.$store.state.user.avatar: "/avatar-icon-default.jpg";
      }
    }
  }
</script>

<style scoped>
  .navbar-burger {
     margin-left: 0 ; 
  }

  .desktop-avatar{
    display: block;
  }

  .image {
    margin-bottom: 7px;
  }

  @media screen and (max-width: 1087px){
    .desktop-avatar {
      display: none; 
    } 
  }
</style>