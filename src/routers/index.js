// import modules from libraries
import { createRouter, createWebHistory } from "vue-router";

// import components
import AssetListVue from "@/views/assetManagement/AssetList.vue";

// Define routers
const routes = [{ path: "/", name: "AssetList", component: AssetListVue }];

// Create a router instance
const router = createRouter({
  // Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes,
});

export default router;
