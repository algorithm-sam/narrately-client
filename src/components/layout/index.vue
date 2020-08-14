<template>
  <div>
    <MainHeader/>
      <div class="wrapper is-paddingless is-marginless">
        <div v-if="$store.state.user && !$store.state.user.isActive" class="has-background-danger inactive-user">
          <p class="has-text-centered"><strong class="has-text-light">Please use link sent to your mail, to activate your account. Did not recieve it? 
            <a @click.prevent="resendActivationMail" class="has-text-grey-lighter">resend activation link</a></strong>
          </p>
        </div>
        <div class="columns is-desktop is-paddingless is-marginless">
          <side-nav v-if="showSideBar"></side-nav>
          <div class="column is-paddingless is-marginless" >
          <div :class="{'content-wrapper': !unwrap}">
            <slot></slot>
          </div>
          <main-footer/>
        </div>
      </div>
      </div>
    <authenticate />
  </div>
</template>

<script>
  import MainFooter from '../footers/index';
  import MainHeader from '../headers/index';
  import SideNav from '../sidenav/index';
  import Authenticate from '../authenticate/index';
  import { resendActivationMail } from '../../repository/index';

  export default {
    name: 'layout',
    props: [ 'showSideBar', 'unwrap' ],
    components: {
      MainHeader,
      MainFooter,
      Authenticate,
      SideNav
    },
    methods: {
      resendActivationMail(){
        resendActivationMail(this.$store.state.user && this.$store.state.user.email)
          .then(() => {
            this.$toasted.show("Activation mail has been resent", { 
              theme: "outline", 
              position: "bottom-right", 
              duration : 2500,
              icon: "check_circle"
            })
          })
          .catch(err => {
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
  .wrapper {
    margin-top: 50px !important; background-color: #f6f6f6
  }

  .content-wrapper{
    padding: 2.5em 1.75em; 
    padding-bottom: 3em;
    min-height: calc(100vh - 220px);
  }

  .inactive-user{
    margin-top: 70px;
    margin-bottom: -20px;
    position: relative;
  }

  @media screen and (max-width: 1087px){
    .content-wrapper{
      padding: 2.5em 0.75em; 
    }
    .wrapper {
      padding-top: 0
    } 
    .inactive-user{
      margin-top: 60px;
      margin-bottom: -20px
    }
  }
</style>

