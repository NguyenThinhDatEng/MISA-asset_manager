// import modules from libraries
import { createRouter, createWebHistory } from "vue-router";

// import components
import MainView from "@/views/main/MainView.vue";
import AssetList from "@/views/assetManagement/AssetList.vue";
import LoginScreen from "@/views/login/LoginView.vue";
// import resource
import API from "@/js/resource/api";

// Define routers
const routes = [
  {
    path: "",
    component: MainView,
    children: [
      { path: API.Path.asset, name: "AssetList", component: AssetList },
    ],
  },
  { path: "/login", name: "Login", component: LoginScreen },
];

// Create a router instance
const router = createRouter({
  // Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {
  console.log(to);
  console.log(from);
  console.log(document.cookie);
});

export default router;
