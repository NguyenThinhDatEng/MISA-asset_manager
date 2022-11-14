<template>
  <div
    :class="['data', { 'data--selected': obj.isActive }]"
    @click="handleOnClick"
  >
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
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>