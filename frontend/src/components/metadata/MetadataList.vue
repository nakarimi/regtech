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
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in metadata" :key="item.id">

        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.owner }}</td>
        <td>{{ item.manager }}</td>
        <td>{{ dateFormat(item.created_at) }}</td>
        <td>
          <button class="btn btn-primary mx-2" @click="$router.push(`/metadata/edit/${item.id}`)" type="button">Edit</button>
          <button class="btn btn-warning mx-2" @click="$router.push(`/metadata/history/${item.id}`)" type="button">View History</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
// import axios
import axios from "axios";
import {
  formatDate
} from '@/global.js'

export default {
  name: "ListMetaData",
  data() {
    return {
      metadata: []
    };
  },
  created() {
    this.getMedtadata();
  },
  methods: {
    dateFormat(date) {
      return formatDate(date);
    },
    // Create New MetaData
    async getMedtadata() {
      try {
        await axios.get(`${process.env.VUE_APP_API_URL}/get/all/metadata`).then((response) => {
          this.metadata = response.data;
        })
      } catch (err) {
        console.log(err);
      }
    },

    // Approve the metadata to affect the main entity.
    async editMetadata(id) {
      try {
        await axios.put(`${process.env.VUE_APP_API_URL}/edit/metadata/${id}`).then((response) => {
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
