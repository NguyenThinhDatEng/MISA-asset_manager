<template>
  <label> {{ labelContent }} <span style="color: red">*</span></label>
  <input
    :type="type"
    :class="['input', { 'input--disabled': isDisabled }]"
    :maxlength="maxlength"
    :value="type == 'text' ? '' : value ? value : 0"
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
  created() {},
  components: {},
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
  emits: [],
  methods: {},
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>