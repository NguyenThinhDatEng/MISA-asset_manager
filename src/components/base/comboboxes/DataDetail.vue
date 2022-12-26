<template>
  <div :class="['data', { 'data--selected': obj.isActive }]">
    <div class="text__wrapper">
      <p>{{ obj[field + "_code"] }}</p>
    </div>
    <p>{{ obj[field + "_name"] }}</p>
  </div>
</template>

<script>
export default {
  name: "DataDetail",
  props: {
    obj: Object,
    field: String,
    highlightIndex: Number,
    index: Number,
  },
};
</script>

<style scoped>
.data {
  outline: none;
}
</style>