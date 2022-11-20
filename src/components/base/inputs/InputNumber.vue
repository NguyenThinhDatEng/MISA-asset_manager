<template>
  <label>{{ labelContent }} <span style="color: red">*</span></label>

  <div class="input--number">
    <input type="text" class="input" :maxlength="maxLength" v-model="amount" />
    <div class="icon--up_down">
      <div
        class="icon icon--up"
        :title="Resource.Title.increase"
        @click="increase"
      ></div>
      <div
        class="icon icon--down"
        :title="Resource.Title.decrease"
        @click="amount > 0 ? amount-- : amount"
      ></div>
    </div>
  </div>
</template>

<script>
import Resource from "@/js/resource/resource";
import Function from "@/js/common/function";
import Enum from "@/js/enum/enum";

export default {
  name: "InputNumber",
  created() {
    this.amount = Function.formatNumber(Number(this.value));
  },
  props: {
    labelContent: String,
    type: {
      type: Number,
      default: Enum.DataType.Number,
    },
    field: String,
    value: {
      type: String,
      default: "0",
    },
    maxLength: {
      type: Number,
      default: 4,
    },
  },
  emits: ["update-input"],
  watch: {
    amount: function () {
      this.$emit("update-input", Number(this.amount), this.field);
    },
    value: function () {
      const val = Number(this.value);
      console.log("val", val);
      if (this.type == Enum.DataType.Rate && val > 100) this.amount = "100";
      else this.amount = Function.formatNumber(val);
    },
  },
  methods: {
    /**
     * Giảm giá trị trong ô input
     * @author Nguyen Van Thinh 07/11/2022
     */
    decrease: function () {
      if (this.val < 0)
        if (this.mode == Enum.Mode.Update) this.val = this.value;
        else this.val = 0;
      else if (this.val > 0) this.val--;
    },

    // Cập nhật giá trị input khi nhập dữ liệu
    updateInput: function (e) {
      try {
        this.val = Number(e.target.value);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Tăng giá trị trong ô input bằng icon
     * @author Nguyen Van Thinh 07/11/2022
     */
    increase: function () {
      if (this.type == Enum.DataType.Rate) {
        if (Number(this.amount) < 100) this.amount++;
      } else this.amount++;
    },
  },
  data() {
    return { amount: 0, Resource, Function };
  },
};
</script>

<style scoped>
</style>