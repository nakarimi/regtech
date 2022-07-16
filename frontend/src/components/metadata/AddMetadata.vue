<template>
<div>
  <div class="field">
    <label class="label">Name</label>
    <div class="control">
      <input class="input" type="text" placeholder="Name" v-model="metadata.name" />
    </div>
  </div>

  <div class="field">
    <label class="label">Owner</label>
    <div class="control">
      <input class="input" type="text" placeholder="Owner" v-model="metadata.owner" />
    </div>
  </div>

  <div class="field">
    <label class="label">Manager</label>
    <div class="control">
      <input class="input" type="text" placeholder="Manager" v-model="metadata.manager" />
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
      metadata: {
        name: "",
        owner: "",
        manager: "",
      }
    };
  },
  methods: {
    // Create New MetaData
    async saveMetaData() {
      try {
        await axios.post(`${process.env.VUE_APP_API_URL}/metadata`, {
          name: this.metadata.name,
          owner: this.metadata.owner,
          manager: this.metadata.manager,
        });
        this.metadata.name = "";
        this.metadata.owner = "";
        this.metadata.manager = "";
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
