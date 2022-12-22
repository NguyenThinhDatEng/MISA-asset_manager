<template>
  <div :class="['data', { 'data--selected': obj.isActive }, 'data__first']">
    <div class="text__wrapper">
      <p>{{ obj[field + "_code"] }}</p>
    </div>
    <p>{{ obj[field + "_name"] }}</p>
  </div>
</template>

<script>
export default {
  name: "DataDetail",
  components: {},
  props: {
    obj: Object,
    field: String,
    highlightIndex: Number,
    index: Number,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.data {
  outline: none;
}
.data__first {
}
</style>