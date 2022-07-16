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
      techdata: {
        role: "",
        permissions: "",
        app_id: "",
      }
    };
  },
  methods: {
    // Create New MetaData
    async saveMetaData() {
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
  },
};
</script>

<style>
</style>
