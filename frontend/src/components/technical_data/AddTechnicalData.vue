<template>
<div>
  <div class="field">
    <label class="label">Role</label>
    <div class="control">
      <input class="input" type="text" placeholder="Role" v-model="techdata.role" />
    </div>
  </div>

  <div class="field">
    <label class="label">Permissions</label>
    <div class="control">
      <input class="input" type="text" placeholder="Permissions" v-model="techdata.permissions" />
    </div>
  </div>

  <div class="form-group">
    <label for="my-select">Application</label>
    <select id="my-select" class="form-control" v-model="techdata.app_id">
      <option selected="selected" value="">Select Application</option>
      <option v-for="(item, index) in metadata" :key="index" :value="item.id">{{ item.name  }}</option>
    </select>
  </div>

  <div class="control">
    <br>
    <button class="button is-success" @click="saveTechnicalData">SAVE</button>
  </div>
</div>
</template>

<script>
// import axios
import axios from "axios";

export default {
  name: "AddTechnicalData",
  data() {
    return {
      techdata: {
        role: "",
        permissions: "",
        app_id: "",
      },
      metadata: []
    };
  },
  created() {
    this.getMedtadata();
  },
  methods: {
    // Create New TechnicalData
    async saveTechnicalData() {
      try {
        await axios.post(`${process.env.VUE_APP_API_URL}/techdata`, {
          role: this.techdata.role,
          permissions: this.techdata.permissions,
          app_id: this.techdata.app_id,
        });
        this.techdata.role = "";
        this.techdata.permissions = "";
        this.techdata.app_id = "";
        this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
    getMedtadata() {
      try {
        axios.get(`${process.env.VUE_APP_API_URL}/get/all/metadata`).then((response) => {
          console.log(response.data);
          this.metadata = response.data;
        })
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
</style>
