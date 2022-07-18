<template lang="">
<div>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" @click="$router.push(`/`)">RegTech Test</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" v-for="(item, index) in menuItems" :key="index">
          <a class="nav-link" @click="$router.push(item.url)">{{ item.name }} </a>
        </li>
      </ul>
    </div>
  </nav>
</div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      menuItems: [
        {
          name: "Meta Data",
          url: "/metadata/list"
        },
        {
          name: "Add Meta Data",
          url: "/metadata/create"
        },
        {
          name: "Technical Data",
          url: "/techdata/list"
        },
        {
          name: "Add Technical Data",
          url: "/techdata/create"
        }
      ],
    };
  },
};
</script>

<style lang=""></style>
