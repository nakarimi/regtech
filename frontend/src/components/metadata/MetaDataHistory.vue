<template>
<div>
  <table class="table table-light">
    <thead class="thead-light">
      <tr>
        <th>Name</th>
        <th>Owner</th>
        <th>Manager</th>
        <th>Status</th>
        <th>Created At</th>
        <th>Approval Date</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(h, index) in histories" :key="index" :old_value="JSON.parse(h.old_values)" :new_value="JSON.parse(h.new_values)">
        <td>
          <history :prev="JSON.parse(h.old_values).name" :current="JSON.parse(h.new_values).name" />
        </td>
        <td>
          <history :prev="JSON.parse(h.old_values).owner" :current="JSON.parse(h.new_values).owner" />
        </td>
        <td>
          <history :prev="JSON.parse(h.old_values).manager" :current="JSON.parse(h.new_values).manager" />
        </td>
        <td>{{ h.status }}</td>
        <td>{{ formatDate(h.created_at) }}</td>
        <td>{{ formatDate(h.approval_date) }}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import History from "../shared/History.vue";
import axios from "axios";
import moment from "moment";

export default {
  name: "MetaDataHistory",
  props: {id: Number, item: Object},
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
    // get Audits History
    async getAuditsHistory() {
      if(this.item){
        this.histories.push(this.item);
      }else{
        try {
          await axios
            .get(
              `${process.env.VUE_APP_API_URL}/get/audits/history/metadata/${(this.id) ? this.id : this.$route.params.id}`
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
  computed: {
    formatDate() {
      return (value) => {
        if (value) {
          return moment(String(value)).format("MM/DD/YYYY hh:mm");
        } else {
          return "-"
        }
      };
    },
  },
};
</script>
