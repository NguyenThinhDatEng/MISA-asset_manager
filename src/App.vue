<template>
  <div class="layout">
    <TheSidebar></TheSidebar>
    <div class="header-content">
      <TheHeader></TheHeader>
      <TheContent :isShowLoader="isShowLoader"></TheContent>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import TheSidebar from "@/components/layout/sidebar/Sidebar.vue";
import TheHeader from "@/components/layout/header/Header.vue";
import TheContent from "@/components/layout/content/Content.vue";

export default {
  name: "App",
  components: {
    TheSidebar,
    TheHeader,
    TheContent,
  },
  mounted() {
    setTimeout(() => (this.isShowLoader = false), 2000);
  },
  methods: {},

  data() {
    return { isShowLoader: true };
  },
};
</script>

<style>
@import url(./css/base.css);
</style>
