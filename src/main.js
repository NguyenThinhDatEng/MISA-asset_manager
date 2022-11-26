import { createApp } from "vue";
import App from "./App.vue";
// import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";
import VueAxios from "vue-axios";
import MoneySpinner from "v-money-spinner";
import Excel from "vue-excel-export";
// import TheContentVue from "./components/layout/content/TheContent.vue";

const app = createApp(App);

app.provide("axios", app.config.globalProperties.axios);
app.use(VueAxios, axios);
app.use(MoneySpinner);
app.use(Excel);
app.mount("#app");

// const routers = [
//   {
//     path: "/assets",
//     name: "AssetList",
//     component: TheContentVue,
//   },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes: routers,
// });

// app.use(router);
