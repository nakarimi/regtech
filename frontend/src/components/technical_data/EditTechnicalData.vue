<template>
<div class="w-25 m-auto">
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
    <button class="button is-success mb-3" @click="updateTechnicalData">UPDATE</button>
  </div>
</div>
</template>

<script>
// import axios
import axios from "axios";

export default {
  name: "EditTechnicalData",
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
      metadata: []
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

            this.getMedtadata();
          });
      } catch (err) {
        this.$swal('Operation failed, please try again!');
        console.log(err);

      }
    },
    // update TechnicalData
    async updateTechnicalData() {
      if (this.techdata.role == '' || this.techdata.permissions == '', this.techdata.app_id == '') {
        // norify user to fill all fields.
        this.$swal('All fields are required!');
      } else {

        try {
          await axios.post(`${process.env.VUE_APP_API_URL}/techdata`, this.techdata);
          this.role = "";
          this.permissions = "";
          this.app_id = "";
          this.$router.push("/");
        } catch (err) {
          this.$swal('Operation failed, please try again!');
          console.log(err);

        }
      }
    },
    getMedtadata() {
      try {
        axios.get(`${process.env.VUE_APP_API_URL}/get/all/metadata`, {
          params: {
            fields: "id, name"
          }
        }).then((response) => {
          this.metadata = response.data;
        })
      } catch (err) {
        console.log(err);

      }
    },
  },
};
</script>

<style></style>
