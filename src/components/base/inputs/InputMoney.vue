<template>
  <label> {{ labelContent }} <span style="color: red">*</span></label>

  <v-money-spinner
    :class="['input', 'input--money', { 'input--error': isError }]"
    v-bind="config"
    v-model="amount"
  ></v-money-spinner>

  <p
    v-show="isError"
    class="error-message"
    v-html="labelContent + ' ' + Resource.ErrorMessage.blank"
  ></p>
</template>
  
  <script>
import Enum from "@/js/enum/enum";
import Resource from "@/js/resource/resource";

export default {
  name: "InputMoney",
  props: {
    labelContent: String,
    field: String,
    mode: Number,
    isError: {
      type: Boolean,
      default: false,
    },
    value: { type: Number, default: 0 },
  },
  created() {
    if (this.mode != Enum.Mode.Add) this.amount = this.value;
  },
  emits: ["update-input"],
  watch: {
    amount: function () {
      this.$emit("update-input", Number(this.amount), this.field);
    },
    value: function () {
      this.amount = this.value;
    },
  },
  data() {
    return {
      amount: "0", // giá trị của input
      // Cấu hình input
      config: {
        spinner: false,
        min: 0,
        max: 1e19 - 1,
        precision: 0,
        // decimal: ".",
        thousands: ".",
        masked: false,
        disableNegative: false,
      },
      Resource, // Tài nguyển
    };
  },
};
</script>
  
  <style scoped>
</style>