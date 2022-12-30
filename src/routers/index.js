// import modules from libraries
import { createRouter, createWebHistory } from "vue-router";

// import components
import MainView from "@/views/main/MainView.vue";
import AssetList from "@/views/asset/AssetList.vue";
import LoginScreen from "@/views/login/LoginView.vue";
import VoucherList from "@/views/asset/voucher/VoucherList.vue";
// import resource
import Resource from "@/js/resource/resource";

const items = Resource.ItemContents;

// Define routers
const routes = [
  {
    path: "/",
    component: MainView,
    children: [
      {
        path: items.asset.router,
        name: "AssetList",
        component: AssetList,
      },
      {
        path: `/${items.asset.sub_list.write_increase.router}`,
        component: VoucherList,
      },
    ],
  },
  { path: `/${items.general.router}`, component: MainView },
  { path: `/${items.category.router}`, component: MainView },
  { path: `/${items.path.router}`, component: MainView },
  { path: `/${items.report.router}`, component: MainView },
  { path: `/${items.search.router}`, component: MainView },
  { path: `/${items.tool.router}`, component: MainView },

  { path: "/login", name: "Login", component: LoginScreen },
];

// Create a router instance
const router = createRouter({
  // Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  if (to.path === "/") {
    return { name: "Login" };
  }
});

export default router;
