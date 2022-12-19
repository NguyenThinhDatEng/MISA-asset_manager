<template>
  <div class="layout">
    <TheSidebar />
    <div class="header-content">
      <TheHeader />
      <TheContent />
    </div>
  </div>
</template>

<script>
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
