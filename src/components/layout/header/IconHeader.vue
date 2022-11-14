<template>
  <div class="icon-item_wrapper">
    <div :class="['icon icon-header center', iconName]" :title="title"></div>
  </div>
</template>

<script>
export default {
  name: "IconHeader",
  props: { iconName: String, title: String },
  data() {
    return {};
  },
};
</script>

<style scoped>
@import url(@/css/icon.css);
</style>