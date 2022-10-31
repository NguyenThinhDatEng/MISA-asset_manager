<template>
  <div class="icon-item_wrapper">
    <div :class="['icon icon-header center', iconName]" :title="title"></div>
  </div>
</template>

<script>
export default {
  name: "IconHeader",
  components: {},
  props: { iconName: String, title: String },
  emits: [],
  methods: {},
  data() {
    return {};
  },
};
</script>

<style scoped>
@import url(@/css/layout/header.css);
</style>