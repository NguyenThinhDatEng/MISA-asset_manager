<template>
  <div :class="[buttonType, { 'button--disable': isDisable }]" :title="title">
    <div :class="['icon icon--18px center', iconName]"></div>
  </div>
</template>

<script>
export default {
  name: "ButtonFeature",
  components: {},
  props: { buttonType: String, title: String, iconName: String },
  emits: [],
  methods: {},
  data() {
    return { isDisable: true };
  },
};
</script>

<style scoped>
</style>