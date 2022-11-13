<template>
  <label>{{ labelContent }} <span style="color: red">*</span></label>
  <div class="input--number">
    <v-money-spinner
      v-model="amount"
      v-bind="config"
      class="input"
    ></v-money-spinner>
    <div class="icon--up_down">
      <div
        class="icon icon--up"
        :title="Resource.Title.increase"
        @click="amount++"
      ></div>
      <div
        :title="Resource.Title.decrease"
        class="icon icon--down"
        @click="amount > 0 ? amount-- : amount"
      ></div>
    </div>
  </div>
</template>
  
  <script>
import Enum from "@/js/enum/enum";
import Resource from "@/js/resource/resource";

export default {
  name: "InputNumber",
  props: {
    labelContent: String,
    field: String,
    value: { type: Number, default: 0 },
    type: { type: Number, default: Enum.DataType.Number },
  },
  created() {
    this.amount = this.value;
    if (this.type == Enum.DataType.Rate) {
      this.config.max = 100;
    }
  },
  emits: ["update-input"],
  watch: {
    amount: function () {
      if (this.amount > 0) {
        this.config.minCharacters = 2;
        if (this.type == Enum.DataType.Rate) {
          if (this.amount < 100) this.config.precision = 2;
          else this.config.precision = 0;
        }
      } else {
        this.config.precision = 0;
        this.config.minCharacters = 0;
      }
      this.$emit("update-input", Number(this.amount), this.field);
    },
    value: function () {
      this.amount = this.value;
    },
  },
  methods: {},
  data() {
    return {
      amount: 1,
      Resource,
      config: {
        spinner: false,
        min: 0,
        max: 10000,
        precision: 0,
        decimal: ".",
        thousands: "",
        masked: false,
        disableNegative: false,
        minCharacters: 1,
      },
    };
  },
};
</script>
  
  <style scoped>
</style>