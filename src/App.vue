<template>
  <div class="layout">
    <TheSidebar></TheSidebar>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import TheSidebar from "./components/layout/sidebar/Sidebar.vue";

export default {
  name: "App",
  components: {
    TheSidebar,
  },
  methods: {},

  data() {
    return {};
  },
};
</script>

<style>
@import url(./css/base.css);
</style>
