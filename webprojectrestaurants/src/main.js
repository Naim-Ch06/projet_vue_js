import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";


import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';


import ListeRestaurants from './components/ListeRestaurants.vue'
import RestaurantDetail from './components/RestaurantDetail.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vuetify);


Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

//Définir les routes
const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: ListeRestaurants
    },
    {
      path: '/restaurant/:id',
      component: RestaurantDetail
    }
  ],
  mode: 'history'
});

new Vue({
  router,
  vuetify: new Vuetify(),
  render: h => h(App),
}).$mount('#app')
