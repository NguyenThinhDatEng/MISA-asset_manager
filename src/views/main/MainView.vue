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
import TheContent from "@/components/layout/content/TheContent.vue";
import TheHeader from "@/components/layout/header/TheHeader.vue";

export default {
  name: "MainScreen",
  components: { TheSidebar, TheContent, TheHeader },
};
</script>

<style scoped>
</style>