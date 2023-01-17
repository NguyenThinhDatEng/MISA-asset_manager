<template>
  <div class="sub-button__wrapper">
    <button class="button button--sub" :title="title">
      {{ buttonContent }}
    </button>
  </div>
</template>
    
    <script>
import Resource from "@/js/resource/resource";
export default {
  name: "ButtonOutline",
  props: {
    title: String,
    buttonContent: {
      type: String,
      default: Resource.ButtonContent.noSave,
    },
  },
  data() {
    return { Resource };
  },
};
</script>
    
    <style scoped>
.sub-button__wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 36px;
  border-radius: 4px;
  background-color: var(--sub-button--hover);
  margin-left: 8px;
}

.sub-button__wrapper .button {
  min-width: 76px;
}

.button--sub,
.button--sub:active {
  border: 1px solid var(--default);
  color: var(--default);
  background-color: var(--sub-button__background);
  width: 100%;
  height: 100%;
}

.button--sub:hover {
  background-color: var(--sub-button--hover);
}

.button--sub:focus {
  width: calc(100% - 4px);
  height: calc(100% - 4px);
}
</style>