<template>
  <Layout :showSideBar="true">
    <div class="box is-paddingle">
      <h1 class="title is-4 is-light">
        <i class="fas fa-pen-alt"></i> 
        <span style="margin-left: 15px">My Conversions</span>
      </h1>
    </div>

    <div ref="contentContainer">
      <div class="center"  v-if="conversions.length">
        <conversion-card v-for="covert in conversions" :conversion="covert" @deleted="onDeleted" :key="'conversion-card-' + covert.id" @view="showConversion"></conversion-card>
      </div>

      <div class="center box" v-if="!conversions.length">
        <h3 class="is-3" >Conversions not avaliable yet!</h3>
      </div>
    </div>

    <conversion-item-modal :conversion="conversion" :active="show" @close="toggleConversionItemCard"></conversion-item-modal>

    <div class="box" style="background-color:rgba(255, 255, 255, 0.05);">
      <paginator :current_page="page" :pages="pages" @getPage="getPage"></paginator>
    </div>
  </Layout>
</template>

<script>

import Layout from '../components/layout/index.vue';
import Paginator from '../components/users/Paginator.vue';
import ConversionCard from '../components/conversions/ConversionCard.vue';
import ConversionItemModal from '../components/dashboard/ConversionItemModal.vue';

export default {
  name: 'my-conversions-list',
  components: {
    Layout,
    Paginator,
    ConversionCard,
    ConversionItemModal
  },
  data() {
    return {
      page: 1,
      count: 1,
      show: false,
      conversion: {},
    }
  },
  mounted() {
    this.getPage();
  },
  methods: {
    showConversion(conversion){
      this.conversion = conversion;
      this.toggleConversionItemCard()
    },
    toggleConversionItemCard(){
      return this.show = !this.show;
    },
    getPage(page = this.$route.query.page ? this.$route.query.page: 1){
      this.page = page;
      window.scrollTo(0, 0);
    },
    onDeleted(id){
      this.conversions = this.conversions.filter((conversion) => conversion.id != id )
    }
  },
  computed: {
    conversions(){
      return (this.$store.state.user ? this.$store.state.user.Conversions : []).slice((this.page - 1) * 10, this.page * 10);
    },
    pages(){
      return Math.ceil(this.$store.state.user.Conversions && this.$store.state.user.Conversions.length/10);
    }
  }
}
</script>

<style scoped>
  .center {
    min-height: calc(100vh - 300px)
  }

  .divider{
    margin: 10px auto;
  }
  .m-b-15{
    margin-bottom: 15px;
  }
  .m-t-10{
    margin-top: 10px;
  }
  .e-calender {
    width: 100% !important; 
    padding: 20px 10px !important; 
    border: none !important;
    z-index: 500
  }
  .c-header{
    margin-bottom: 20px !important;
  }
</style>
