// import modules from libraries
import { createRouter, createWebHistory } from "vue-router";

// import components
import MainView from "@/views/main/MainView.vue";
import AssetList from "@/views/assetManagement/AssetList.vue";
import LoginScreen from "@/views/login/LoginView.vue";

// Define routers
const routes = [
  {
    path: "/",
    component: MainView,
    children: [{ path: "", name: "AssetList", component: AssetList }],
  },
  { path: "/login", name: "Login", component: LoginScreen },
];

// Create a router instance
const router = createRouter({
  // Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes,
});

export default router;
