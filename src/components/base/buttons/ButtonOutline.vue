<template>
  <button class="button button--outline" :title="title">
    {{ buttonContent }}
  </button>
</template>
  
  <script>
import Resource from "@/js/resource/resource";
export default {
  name: "ButtonOutline",
  props: {
    title: String, // Tiêu đề popup
    buttonContent: {
      type: String,
      default: Resource.ButtonContent.no,
    }, // Nội dung button
    tabindex: {
      type: [Number, String],
      default: 1,
    }, // tabindex
  },
  data() {
    return { Resource };
  },
};
</script>
  
  <style scoped>
.button--outline {
  background-color: #fff;
  border: 1px solid var(--outline-button__border);
}

.button--outline:hover,
.button--outline:active,
.button--outline:focus {
  background-color: var(--default);
  color: #fff;
}

.button--outline:disabled {
  color: #000;
  background-color: var(--outline-button--disabled);
}
</style>