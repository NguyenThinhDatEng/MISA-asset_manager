<template>
  <button :class="['button', buttonType]">
    <div class="button__content-wrapper">
      <div :class="['icon', iconName]"></div>
      <p :class="buttonName">{{ resource.ButtonName[buttonName] }}</p>
    </div>
  </button>
</template>

<script>
import resource from "@/resource/resource";
export default {
  name: "ButtonIcon",
  components: {},
  props: {
    buttonType: String,
    iconName: String,
    buttonName: String,
  },
  emits: [],
  methods: {},
  data() {
    return {
      resource,
    };
  },
};
</script>

<style scoped>
</style>