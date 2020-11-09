<template>
  <div v-if="restaurant">
    <h1>Nom du restaurant : {{ restaurant.name }}</h1>
    
        <p>Cuisine : {{ restaurant.cuisine }}</p>
      
        <p>Ville : {{ restaurant.borough }}</p>
    
        <p>Adresse : {{ restaurant.address.street }}, {{ restaurant.address.zipcode }}</p>
    

    <div style="height: 500px; width: 100%">
      <l-map
        v-if="showMap"
        :zoom="zoom"
        :center="center"
        :options="mapOptions"
        style="height: 80%"
        @update:center="centerUpdate"
        @update:zoom="zoomUpdate"
      >
        <l-tile-layer :url="url" :attribution="attribution" />
        <l-marker :lat-lng="withPopup">
          <l-popup>
            <div @click="innerClick">
              I am a restaurant.
            </div>
          </l-popup>
        </l-marker>
      </l-map>
    </div>
  </div>
</template>


<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";

export default {
  name: "Restaurant",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
  },
  props: {},
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  data: function () {
    return {
      restaurant: null,
      zoom: 13,
      center: latLng(47.41322, -1.219482),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: latLng(47.41322, -1.219482),
      currentZoom: 11.5,
      currentCenter: latLng(47.41322, -1.219482),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5,
      },
      showMap: true,
    };
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {
      alert("Click!");
    },
  },
  mounted() {
    let url = "http://localhost:8080/api/restaurants/" + this.id;
    fetch(url)
      .then((reponse) => {
        return reponse.json();
      })
      .then((data) => {
        console.log(data.restaurant.name);
        this.restaurant = data.restaurant;
        this.center = latLng(data.restaurant.address.coord[1],data.restaurant.address.coord[0]);
        this.withPopup = latLng(data.restaurant.address.coord[1],data.restaurant.address.coord[0]);
      });
  },
};
</script>

<style scoped>
</style>
