import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueDiff from "vue-diff";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "vue-diff/dist/index.css";
import "./assets/css/main.css";

createApp(App).use(router).use(VueDiff).mount("#app");
