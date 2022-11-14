<template>
  <div :class="[buttonName, { 'button--disable': isDisable }]" :title="title">
    <div :class="['icon icon--18px center', iconName]"></div>
  </div>
</template>
  
  <script>
export default {
  name: "ButtonFeature",
  components: {},
  props: {
    buttonName: String,
    title: String,
    iconName: String,
    isDisable: Boolean,
  },
  data() {
    return {};
  },
};
</script>
  
  <style scoped>
</style>