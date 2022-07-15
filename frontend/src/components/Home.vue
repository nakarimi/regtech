<template lang="">
<div>
  <table class="table table-light">
    <thead class="thead-light">
      <tr>
        <th>#</th>
        <th>Type</th>
        <th>Event</th>
        <th>Status</th>
        <th>Created At</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in audits" :key="item.id">

        <td>{{ item.id }}</td>
        <td>{{ item.auditable_type }}</td>
        <td>{{ item.event }}</td>
        <td>{{ item.status }}</td>
        <td>{{ item.created_at }}</td>
        <td><button class="btn btn-primary" @click="approveAudit(item.id)" type="button">Approve</button></td>
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
      audits: []
    };
  },
  created() {
    this.getAudits();
  },
  methods: {
    // Create New MetaData
    async getAudits() {
      try {
        await axios.get("http://localhost:5000/get/all/pending/audits").then((response) => {
          this.audits = response.data;
        })
      } catch (err) {
        console.log(err);
      }
    },

    // Approve the audits to affect the main entity.
    async approveAudit(id){
      try {
        await axios.put(`http://localhost:5000/approve/audit/${id}`).then((response) => {
          console.log(response.data);
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
