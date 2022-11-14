<template>
  <label> {{ labelContent }} <span style="color: red">*</span></label>
  <v-money-spinner
    :class="['input', 'input--money', { 'input--error': isError }]"
    v-bind="config"
    v-model="amount"
  ></v-money-spinner>
</template>
  
  <script>
import Enum from "@/js/enum/enum";

export default {
  name: "InputMoney",
  props: {
    labelContent: String,
    value: { type: Number, default: 0 },
    field: String,
    mode: Number,
    isError: {
      type: Boolean,
      default: false,
    },
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
      amount: "0",
      config: {
        spinner: false,
        min: 0,
        max: 10000000000, // 10^8
        precision: 0,
        // decimal: ".",
        thousands: ".",
        masked: false,
        disableNegative: false,
      },
    };
  },
};
</script>
  
  <style scoped>
</style>