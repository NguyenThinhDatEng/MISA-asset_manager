import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";
import VueAxios from "vue-axios";
import TheContentVue from "./components/layout/content/TheContent.vue";

const app = createApp(App);

const routers = [
  {
    path: "/assets",
    name: "AssetList",
    component: TheContentVue,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routers,
});

app.use(VueAxios, axios);
app.use(router);
app.provide("axios", app.config.globalProperties.axios);
app.mount("#app");
