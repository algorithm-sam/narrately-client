<template>
  <div class="wrapper-content" style="background:transparent;">
  <!-- <div class="box" style="background-color:rgba(255, 255, 255, 0.05);"> -->
    <div class="columns is-desktop is-paddingless is-marginless">
      <div class="column columns column-group-top is-paddingless is-marginless" >
        <div class="column is-paddingless tile-wrapper">
          <div class="tile">
            <div class="tile is-vertical">
              <article class="tile is-child notification is-primary">
                <p style="opacity: 0.5;" >username</p>
                <h3 class="is-4 title is-clearfix columns is-mobile" style="margin-bottom: 0 !important"> 
                  <span class="column" style="padding-bottom: 0">{{ $store.state.user && $store.state.user.username }}</span>
                  <i class="fas fa-user is-pulled-right column is-1" style="opacity: 0.7; margin-top: auto; padding-bottom: 0"></i></h3>
              </article>
            </div>
          </div>
        </div>
        <div class="column is-paddingless tile-wrapper">
          <div class="tile">
            <div class="tile is-vertical">
              <article class="tile is-child notification is-success">
                <p style="opacity: 0.5">conversions</p>
                <h3 class="is-4 title is-clearfix "> {{ $store.state.user.Conversions && $store.state.user.Conversions.length }} <i class="fas fa-chart-bar is-pulled-right" style="opacity: 0.7"></i></h3>
              </article>
            </div>
          </div>
        </div>
      </div>
      <div class="column columns column-group-bottom is-paddingless is-marginless">
        <div class="column is-paddingless tile-wrapper">
          <div class="tile">
            <div class="tile is-vertical">
              <article class="tile is-child notification is-info">
                <p style="opacity: 0.5">available monthly characters</p>
                <h3 class="is-4 title is-clearfix" :class="{'has-text-danger': !$store.state.quota.characters}" style="margin-bottom: 0 !important"> 
                  {{ parseInt($store.state.quota.characters) }} <i class="fas fa-pen is-pulled-right" style="opacity: 0.7"></i>
                </h3>
              </article>
            </div>
          </div>
        </div>
        <div class="column is-paddingless tile-wrapper">
          <div class="tile">
            <div class="tile is-vertical">
              <article class="tile is-child notification is-info">
                <p style="opacity: 0.5">available weekly conversion</p>
                <h3 class="is-4 title is-clearfix" :class="{'has-text-danger': !$store.state.quota.characters}" style="margin-bottom: 0 !important"> 
                  {{ parseInt($store.state.quota.conversions) }}<i class="fas fa-download is-pulled-right" style="opacity: 0.7"></i>
                </h3>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  <!-- </div> -->
  </div>
</template>

<script>
  export default {
    name: 'name-card',
  }
</script>

<style scoped>
    .tile{
      height: 100%
    }

    .tile-wrapper{
      margin-right: 5px !important;
      margin-left: 5px !important;
      margin-bottom: 15px !important
    }

    .columns:last-child {
         margin-bottom: 0; 
    }

    @media screen and (max-width: 1087px){
      .column-group-top {
        padding-bottom: 0 !important; 
      } 

      .column-group-bottom {
        padding-top: 0 !important; 
      } 
    }
</style>

