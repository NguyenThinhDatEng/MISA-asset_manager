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
  mounted() {
    setTimeout(() => (this.isShowLoader = false), 1500);
  },
  methods: {},

  data() {
    return { isShowLoader: true };
  },
};
</script>

<style>
</style>
