<template>
  <label> {{ labelContent }} <span style="color: red">*</span></label>

  <input
    :class="[
      'input',
      { 'input--disabled': isDisabled },
      { 'input--error': isError },
    ]"
    :maxlength="maxlength"
    :style="{
      'text-align': type == 'text' ? 'left' : 'right',
    }"
    :value="
      type == 'text'
        ? value
          ? value
          : ''
        : value
        ? isDisabled
          ? value
          : Function.formatMoney(value)
        : 0
    "
    :field="field"
    :disabled="isDisabled"
    @change="updateInput($event)"
  />

  <p
    class="error-message"
    v-html="labelContent + ' ' + Resource.ErrorMessage.blank"
    v-show="isError"
  ></p>
</template>

<script>
import Function from "@/js/common/function";
import Resource from "@/js/resource/resource";

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
    field: String,
    isError: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["update-input"],
  methods: {
    // Gửi nội dung dữ liệu được thay đổi lên class cha
    updateInput: function (e) {
      try {
        this.$emit("update-input", e.target.value, this.field);
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      newValue: "",
      Function,
      Resource,
    };
  },
};
</script>

<style scoped>
</style>