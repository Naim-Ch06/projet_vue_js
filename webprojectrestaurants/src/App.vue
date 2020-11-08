<template>
  <v-app>
    <v-app-bar app dark>
      <router-link to="/" tag="button" style="color: red;font-weight: 800;"><v-btn style="border: 1px solid">Home</v-btn></router-link>
      <v-spacer></v-spacer>
      <h1 style="margin-right:505px">Web project restaurant</h1>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>



<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
