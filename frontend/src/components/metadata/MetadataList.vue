<template lang="">
<div>
  <table class="table table-light">
    <thead class="thead-light">
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Owner</th>
        <th>Manager</th>
        <th>Created At</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in metadata" :key="item.id">

        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.owner }}</td>
        <td>{{ item.manager }}</td>
        <td>{{ item.created_at }}</td>
        <td><button class="btn btn-primary" @click="$router.push(`/metadata/edit/${item.id}`)" type="button">Edit</button></td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
// import axios
import axios from "axios";

export default {
  name: "AddMetaData",
  data() {
    return {
      metadata: []
    };
  },
  created() {
    this.getMedtadata();
  },
  methods: {
    // Create New MetaData
    async getMedtadata() {
      try {
        await axios.get("http://localhost:5000/get/all/metadata").then((response) => {
          this.metadata = response.data;
        })
      } catch (err) {
        console.log(err);
      }
    },

    // Approve the metadata to affect the main entity.
    async editMetadata(id){
      try {
        await axios.put(`http://localhost:5000/edit/metadata/${id}`).then((response) => {
          console.log(response.data);
          this.metadata = this.metadata.filter(x => x.id != id);
        })
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="">
  
</style>
