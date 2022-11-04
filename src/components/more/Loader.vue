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
      default: false,
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>