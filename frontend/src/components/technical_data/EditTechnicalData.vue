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

  <div class="field">
    <label class="label">Application</label>
    <div class="control">
      <input class="input" type="text" placeholder="Application" v-model="techdata.app_id" />
    </div>
  </div>

  <div class="control">
    <button class="button is-success" @click="updateTechnicalData">UPDATE</button>
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
        id: null,
        role: "",
        permissions: "",
        app_id: "",
        old_role: "",
        old_permissions: "",
        old_app_id: "",
      },
    };
  },
  created() {
    this.getTechnicalData();
  },
  methods: {
    // get TechnicalData
    async getTechnicalData() {
      try {
        await axios
          .get(`${process.env.VUE_APP_API_URL}/get/techdata/${this.$route.params.id}`)
          .then((response) => {
            this.techdata.id = response.data[0].id;
            this.techdata.role = response.data[0].role;
            this.techdata.permissions = response.data[0].permissions;
            this.techdata.app_id = response.data[0].app_id;
            this.techdata.old_role = response.data[0].role;
            this.techdata.old_permissions = response.data[0].permissions;
            this.techdata.old_app_id = response.data[0].app_id;
          });
      } catch (err) {
        console.log(err);
      }
    },
    // update TechnicalData
    async updateTechnicalData() {
      try {
        await axios.post(`${process.env.VUE_APP_API_URL}/techdata`, this.techdata);
        this.role = "";
        this.permissions = "";
        this.app_id = "";
        this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style></style>
