<template>
<div class="w-25 m-auto">
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
    <button class="button is-success mb-3" @click="updateMetaData">UPDATE</button>
  </div>
</div>
</template>

<script>
// import axios
import axios from "axios";

export default {
  name: "EditMetaData",
  data() {
    return {
      metadata: {
        id: null,
        name: "",
        owner: "",
        manager: "",
        old_name: "",
        old_owner: "",
        old_manager: "",
      },
    };
  },
  created() {
    this.getMetadata();
  },
  methods: {
    // get MetaData
    async getMetadata() {
      try {
        await axios
          .get(`${process.env.VUE_APP_API_URL}/get/metadata/${this.$route.params.id}`)
          .then((response) => {
            this.metadata.id = response.data[0].id;
            this.metadata.name = response.data[0].name;
            this.metadata.owner = response.data[0].owner;
            this.metadata.manager = response.data[0].manager;
            this.metadata.old_name = response.data[0].name;
            this.metadata.old_owner = response.data[0].owner;
            this.metadata.old_manager = response.data[0].manager;
          });
      } catch (err) {
        console.log(err);
      }
    },
    // update MetaData
    async updateMetaData() {
      try {
        await axios.post(`${process.env.VUE_APP_API_URL}/metadata`, this.metadata);
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

<style></style>
