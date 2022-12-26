<template>
  <div :class="['data', { 'data--selected': obj.isActive }]" v-focus>
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
  directives: {
    focus: {
      inserted: function (el) {
        console.log(el);
        el.focus();
      },
    },
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