<template>
  <div class="loader__background" v-show="isShow">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  name: "TheLoader",
  props: {
    isShow: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>