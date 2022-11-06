<template>
  <label> {{ labelContent }} <span style="color: red">*</span></label>
  <input
    :type="type"
    :class="['input', { 'input--disabled': isDisabled }]"
    :maxlength="maxlength"
    :value="type == 'text' ? (value ? value : '') : value ? value : 0"
    :disabled="isDisabled"
    :style="{
      'text-align': type == 'text' ? 'left' : 'right',
    }"
  />
  <p class="error-message"></p>
</template>

<script>
export default {
  name: "NormalInput",
  props: {
    labelContent: String,
    maxlength: Number,
    value: Number,
    type: {
      type: String,
      default: "text",
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>