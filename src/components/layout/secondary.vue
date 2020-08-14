<template>
  <div>
    <SecondaryHeader/>
      <div class="wrapper columns is-paddingless is-marginless">
        <side-nav v-if="showSideBar"></side-nav>
        <div class="column is-paddingless is-marginless">
          <div>
            <slot></slot>
          </div>
        </div>
      </div>
      <main-footer/>
    <authenticate />
  </div>
</template>

<script>
  import MainFooter from '../footers/index';
  import SecondaryHeader from '../headers/secondary';
  import Authenticate from '../authenticate/index';
  export default {
    name: 'secondary-layout',
    props: [ 'showSideBar', 'unwrap' ],
    components: {
      SecondaryHeader,
      MainFooter,
      Authenticate
    }
  }
</script>

<style>

</style>

