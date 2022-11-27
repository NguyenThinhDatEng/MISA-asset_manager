<template>
  <label>{{ labelContent }} <span style="color: red">*</span></label>

  <div :class="[{ 'input--number': this.type != Enum.DataType.Year }]">
    <input
      type="text"
      :class="['input', { 'input--error': isError }]"
      :maxlength="maxLength"
      v-model="amount"
      @keydown="Function.onlyNumbers($event, type)"
    />
    <div class="icon--up_down" v-show="this.type != Enum.DataType.Year">
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

  <p
    v-show="isError"
    class="error-message"
    v-html="labelContent + ' ' + Resource.ErrorMessage.blank"
  ></p>
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
    labelContent: String,
    isError: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update-input"],
  watch: {
    amount: function () {
      // Gửi giá trị thay đổi đến cha
      this.$emit("update-input", Number(this.amount), this.field);
    },
    value: function () {
      // Cập nhật giá trị input khi có giá trị từ ngoài truyền vào
      const val = Number(this.value);
      if (this.type == Enum.DataType.Rate && val > 100) {
        // Giới hạn giá trị lớn nhất khi ô input có kiểu là tỉ lệ
        this.amount = "100";
      } else {
        this.amount = Function.formatNumber(val);
      }
    },
  },
  methods: {
    /**
     * Giảm giá trị trong ô input bằng icon
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
    return {
      amount: 0, // giá trị ô input
      Resource, // Tài nguyên
      Function, // Các hàm dùng chung
      Enum, // enum
    };
  },
};
</script>

<style scoped>
.input--number {
  position: relative;
  height: 36px;
}

.input--number .input {
  position: absolute;
  padding-right: 36px !important;
}

.input--number .icon--up_down {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
}

.input {
  text-align: right;
}
</style>