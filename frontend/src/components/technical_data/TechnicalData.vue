<template lang="">
<div>
  <div v-if="!Object.keys(techdata).length" class="alert alert-warning" role="alert">
    Data not found! Add new Technical Data.
  </div>
  <table v-if="Object.keys(techdata).length" class="table table-light">
    <thead class="thead-light">
      <tr>
        <th>#</th>
        <th>Role</th>
        <th>Permissions</th>
        <th>Application</th>
        <th>Created At</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in techdata" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.role }}</td>
        <td>{{ item.permissions }}</td>
        <td>{{ item.name }}</td>
        <td>{{ dateFormat(item.created_at) }}</td>
        <td>
          <button class="btn btn-primary" @click="$router.push(`/techdata/edit/${item.id}`)" type="button">
            Edit
          </button>
          <button class="btn btn-warning mx-2" @click="$router.push(`/techdata/history/${item.id}`)" type="button">
            View History
          </button>
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
} from "@/global.js";

export default {
  name: "ListTechnicalData",
  data() {
    return {
      techdata: [],
    };
  },
  created() {
    this.getTechData();
  },
  methods: {
    dateFormat(date) {
      return formatDate(date);
    },
    // Create New MetaData
    async getTechData() {
      try {
        await axios
          .get(`${process.env.VUE_APP_API_URL}/get/all/techdata`)
          .then((response) => {
            this.techdata = response.data;
          });
      } catch (err) {
        console.log(err);

      }
    },
  },
};
</script>

<style lang=""></style>
