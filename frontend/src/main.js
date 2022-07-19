import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueDiff from "vue-diff";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "vue-diff/dist/index.css";
import "./assets/css/main.css";

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App);
app.use(router);
app.use(VueDiff);
app.use(VueSweetalert2);
app.mount("#app");
