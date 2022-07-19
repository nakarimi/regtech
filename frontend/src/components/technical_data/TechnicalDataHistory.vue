<template>
<div>
  <h2 v-if="!histories">History Not Found!</h2>
  <table v-if="histories" class="table table-light">
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
          <history :prev="findAppName(JSON.parse(h.old_values).app_id)" :current="findAppName(JSON.parse(h.new_values).app_id)" />
        </td>
        <td>
          <history :prev="JSON.parse(h.old_values).permissions" :current="JSON.parse(h.new_values).permissions" />
        </td>
        <td class="text-capitalize">{{ h.status }}</td>
        <td>{{ dateFormat(h.created_at) }}</td>
        <td>{{ dateFormat(h.review_date) }}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import {
  formatDate
} from "@/global.js";
import History from "@/components/shared/History.vue";
import axios from "axios";

export default {
  name: "TechnicalDataHistory",
  props: {
    id: Number,
    item: Object,
  },
  components: {
    history: History,
  },
  data() {
    return {
      histories: [],
      metadata: [],
    };
  },
  created() {
    this.getMedtadata();
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
              `${
                process.env.VUE_APP_API_URL
              }/get/audits/history/technical_data/${
                this.id ? this.id : this.$route.params.id
              }`
            )
            .then((response) => {
              this.histories = response.data;
            });
        } catch (err) {
          console.log(err);

        }
      }
    },

    // Getting meta data to use them on the history to show proper name.
    async getMedtadata() {
      try {
        await axios
          .get(`${process.env.VUE_APP_API_URL}/get/all/metadata`, {
            params: {
              fields: "id, name",
            },
          })
          .then((response) => {
            this.metadata = response.data;
          });
      } catch (err) {
        console.log(err);

      }
    },

    // Find the application name by id, to show the differences.
    findAppName(id) {
      if (id) {
        let application = this.metadata.find(x => x.id == id)
        return (application) ? application.name : '';
      } else {
        return '';
      }
    },
  },
};
</script>
