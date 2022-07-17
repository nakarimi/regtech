<template>
<div>
  <table class="table table-light">
    <thead class="thead-light">
      <tr>
        <th>Role</th>
        <th>Application</th>
        <th>Permissions</th>
        <th>Status</th>
        <th>Created At</th>
        <th>Approval Date</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(h, index) in histories" :key="index" :old_value="JSON.parse(h.old_values)" :new_value="JSON.parse(h.new_values)">
        <td>
          <history :prev="JSON.parse(h.old_values).role" :current="JSON.parse(h.new_values).role" />
        </td>
        <td>
          <history :prev="JSON.parse(h.old_values).app_id" :current="JSON.parse(h.new_values).app_id" />
        </td>
        <td>
          <history :prev="JSON.parse(h.old_values).permissions" :current="JSON.parse(h.new_values).permissions" />
        </td>
        <td>{{ h.status }}</td>
        <td>{{ dateFormat(h.created_at) }}</td>
        <td>{{ dateFormat(h.approval_date) }}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import {formatDate} from '@/global.js'
import History from "@/components/shared/History.vue";
import axios from "axios";

export default {
  name: "TechnicalDataHistory",
  props: {
    id: Number,
    item: Object
  },
  components: {
    history: History,
  },
  data() {
    return {
      histories: [],
    };
  },
  created() {
    this.getAuditsHistory();
    
  },
  methods: {
    dateFormat(date) {
      return formatDate(date);
    },

    // Get Audits History
    async getAuditsHistory() {
      if (this.item) {
        this.histories.push(this.item);
      } else {
        try {
          await axios
            .get(
              `${process.env.VUE_APP_API_URL}/get/audits/history/technical_data/${(this.id) ? this.id : this.$route.params.id}`
            )
            .then((response) => {
              this.histories = response.data;
            });
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
};
</script>
