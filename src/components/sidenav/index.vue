<template>
  <aside class="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile is-hidden-tablet-only box is-marginless" style="background: rgba(255,255,255,0.4);">
    <ul class="menu-list is-fullwidth" style="position: fixed; width: 15%">
      <li>
        <router-link tag="a" to="/dashboard" :class="{'is-active': $route.name === 'dashboard'}">
          <span class="icon">
            <i class="fa fa-cog"></i>
          </span> Dashboard
        </router-link>
      </li>
      <li>
        <router-link tag="a" to="/profile" :class="{'is-active': $route.name === 'profile'}">
          <span class="icon">
            <i class="fas fa-user"></i>
          </span> Profile
        </router-link>
      </li>
      <li>
        <router-link tag="a" to="/user/conversions" :class="{'is-active': $route.name === 'my-conversions'}">
          <span class="icon">
            <i class="fas fa-pen-alt"></i>
          </span> My Conversions
        </router-link>
      </li>
      <li>
        <router-link tag="a" to="/activities" :class="{'is-active': $route.name === 'my-activities'}">
          <span class="icon">
            <i class="fas fa-history"></i>
          </span> My Activities
        </router-link>
      </li>
      <li v-if="$store.state.user.isAdmin">
        <router-link tag="a" to="/admin/users" :class="{'is-active': $route.name === 'users' || $route.name === 'user' }">
          <span class="icon">
            <i class="fas fa-users"></i>
          </span> All Users
        </router-link>
      </li>
      <li v-if="$store.state.user.isAdmin">
        <router-link tag="a" to="/admin/conversions" :class="{'is-active': $route.name === 'conversions'}">
          <span class="icon">
            <i class="fas fa-pen"></i>
          </span> All Conversions
        </router-link>
      </li>
      <li v-if="$store.state.user.isAdmin">
        <router-link tag="a" to="/admin/activities" :class="{'is-active': $route.name === 'all-activities'}">
          <span class="icon">
            <i class="fas fa-chart-line"></i>
          </span> All Activities
        </router-link>
      </li>
      <li>
        <a @click="signOut">
          <span class="icon">
            <i class="fas fa-power-off"></i>
          </span> Logout
        </a>
      </li>

    </ul>
  </aside>
</template>

<script>
  export default {
    name: 'side-nav',
    methods: {
      signOut(){
        this.$store.dispatch('SIGN_OUT');
        return this.$router.push('/');
      }
    }
  }
</script>


<style scoped>
  .menu-list a.is-active {
    background-color: #363636;
    color: #fff;
    -webkit-box-shadow: 2px 2px 5px 3px rgba(0,0,0,0.1) !important;
    box-shadow: 2px 2px 5px 3px rgba(0,0,0,0.1) !important;
  }
  .section {
    padding: 2.25rem 0.75rem;
  }
  @media screen and (max-width: 1366px){
    .section {
      padding: 2.0rem 0.5rem;
    }
  }
</style>