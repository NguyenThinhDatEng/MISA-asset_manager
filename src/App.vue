<template>
  <div class="layout">
    <TheSidebar></TheSidebar>
    <div class="header-content">
      <TheHeader></TheHeader>
      <TheContent></TheContent>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import TheSidebar from "@/components/layout/sidebar/TheSidebar.vue";
import TheHeader from "@/components/layout/header/TheHeader.vue";
import TheContent from "@/components/layout/content/TheContent.vue";

export default {
  name: "App",
  components: {
    TheSidebar,
    TheHeader,
    TheContent,
  },

  data() {
    return {};
  },
};
</script>

<style>
</style>
