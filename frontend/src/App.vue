<template>
  <div id="app" class="container is-max-desktop bg-light">
    <div class="row">
      <navbar></navbar>
    </div>
    <hr />
    <div class="row">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from "./components/shared/NavBar.vue";

export default {
  name: "App",
  components: {
    navbar: NavBar,
  },
};
</script>

<style>
/* import style bulma */
@import "~bulma/css/bulma.css";
</style>
