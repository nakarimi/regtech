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
        <td>{{ dateFormat(item.created_at) }}</td>
        <td>
          <!-- <button class="btn btn-primary" @click="approveAudit(item.id)" type="button">Approve</button> -->
          <!-- Button trigger modal -->
          <button @click="history_item=item" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">History</button>

        </td>
      </tr>
    </tbody>
  </table>
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" v-if="history_item">
          <meta_data_distory :item="history_item" :key="history_item.auditable_id" v-if="history_item.auditable_type == 'metadata'" />
          <technical_data_distory :item="history_item" :key="history_item.auditable_id" v-if="history_item.auditable_type != 'metadata'" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="approveAudit(history_item.id)">Approve</button>
          <button type="button" class="btn btn-danger">Reject</button>
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
// import axios
import axios from "axios";
import MetaDataHistory from "./metadata/MetaDataHistory.vue";
import TechnicalDataHistory from "./technical_data/TechnicalDataHistory.vue";
import {
  formatDate
} from "@/global.js";

export default {
  name: "AddMetaData",
  data() {
    return {
      audits: [],
      history_item: null,
    };
  },
  components: {
    meta_data_distory: MetaDataHistory,
    technical_data_distory: TechnicalDataHistory
  },
  created() {
    this.getAudits();
    console.log(process.env.VUE_APP_API_URL);
  },
  methods: {
    // Create New MetaData
    async getAudits() {
      try {
        await axios.get(`${process.env.VUE_APP_API_URL}/get/all/pending/audits`).then((response) => {
          this.audits = response.data;
        })
      } catch (err) {
        console.log(err);
      }
    },

    // Approve the audits to affect the main entity.
    async approveAudit(id) {
      try {
        await axios.put(`${process.env.VUE_APP_API_URL}/approve/audit/${id}`).then(() => {
          this.audits = this.audits.filter(x => x.id != id);
          
        })
      } catch (err) {
        console.log(err);
      }
    },
    dateFormat(date) {
      return formatDate(date);
    },
  },
};
</script>

<style lang="">
  
</style>
