import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Moment from 'moment'

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import VCalendar from 'v-calendar';
import 'v-calendar/lib/v-calendar.min.css';
import 'material-icons/iconfont/material-icons.css';

import Toasted from 'vue-toasted';
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
  id: 'UA-XXX-X'
})
 
Vue.use(Toasted, { iconPack : 'material' })

Vue.filter('moment', function (date) {
  return Moment(date).fromNow();
});

Vue.use(VCalendar, {
  firstDayOfWeek: 1
});

Vue.use(Loading);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')


