<template>
<div>
  <div class="field">
    <label class="label">Name</label>
    <div class="control">
      <input class="input" type="text" placeholder="Name" v-model="name" />
    </div>
  </div>

  <div class="field">
    <label class="label">Owner</label>
    <div class="control">
      <input class="input" type="text" placeholder="Owner" v-model="owner" />
    </div>
  </div>

  <div class="field">
    <label class="label">Manager</label>
    <div class="control">
      <input class="input" type="text" placeholder="Manager" v-model="manager" />
    </div>
  </div>

  <div class="control">
    <button class="button is-success" @click="saveMetaData">SAVE</button>
  </div>
</div>
</template>

<script>
// import axios
import axios from "axios";

export default {
  name: "AddMetaData",
  data() {
    return {
      name: "",
      owner: "",
      manager: "",
    };
  },
  methods: {
    // Create New MetaData
    async saveMetaData() {
      try {
        await axios.post("http://localhost:5000/metadata", {
          name: this.name,
          owner: this.owner,
          manager: this.manager,
        });
        this.name = "";
        this.owner = "";
        this.manager = "";
        this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
</style>
