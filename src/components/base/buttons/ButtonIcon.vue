<template>
  <button :class="['button', buttonType]">
    <div :class="['button__content-wrapper', { center: !hasIcon }]">
      <div :class="['icon', iconName]" v-show="hasIcon"></div>
      <p>{{ buttonContent }}</p>
    </div>
  </button>
</template>

<script>
export default {
  name: "ButtonIcon",
  props: {
    // true nếu button có icon
    hasIcon: {
      type: Boolean,
      default: true,
    },
    buttonContent: {
      type: String,
      required: true,
    },
    buttonType: String,
    iconName: String,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
button p {
  color: white;
}
</style>