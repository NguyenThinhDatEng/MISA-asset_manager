import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import MoneySpinner from "v-money-spinner";
import Excel from "vue-excel-export";
import routers from "./routers";

const app = createApp(App);

app.provide("axios", app.config.globalProperties.axios);
app.use(VueAxios, axios);
app.use(MoneySpinner);
app.use(Excel);
app.use(routers);
app.mount("#app");
