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
  props: {
    buttonType: String,
    iconName: String,
    buttonName: String,
  },
  data() {
    return {
      resource,
    };
  },
};
</script>

<style scoped>
</style>