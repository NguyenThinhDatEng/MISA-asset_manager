<template>
  <!-- label -->
  <label v-if="hasLabel"
    >{{ labelContent }} <span style="color: red">*</span></label
  >
  <!-- input wrapper -->
  <div :class="[{ 'input--number': this.type != Enum.DataType.Year }]">
    <!-- input 01 -->
    <v-money-spinner
      v-if="type !== Enum.DataType.Rate"
      :inputClass="inputClass"
      :class="[
        'input',
        'spinner',
        { 'input--error': isError },
        { 'input--icon': isShowIcons() },
      ]"
      v-bind="config"
      v-model="amount"
      @keydown.down="decrease"
      @keydown.up="increase"
    />
    <!-- input 02 -->
    <input
      v-else
      type="text"
      :class="['input', { 'input--error': isError }]"
      :maxlength="maxLength"
      v-model="amount"
      @keydown="Function.onlyNumbers($event)"
      @keydown.down="decrease"
      @keydown.up="increase"
    />
    <!-- icon -->
    <div class="icon--up_down" v-show="isShowIcons()">
      <!-- icon up -->
      <div
        class="icon icon--up"
        :title="Resource.Title.increase"
        @click="increase"
      ></div>
      <!-- icon down -->
      <div
        class="icon icon--down"
        :title="Resource.Title.decrease"
        @click="decrease"
      ></div>
    </div>
  </div>

  <p
    v-show="isError"
    class="error-message"
    v-html="errorMessage || labelContent + ' ' + Resource.ErrorMessage.blank"
  />
</template>

<script>
// Tài nguyên
import Resource from "@/js/resource/resource";
import Function from "@/js/common/function";
import Enum from "@/js/enum/enum";

export default {
  name: "InputNumber",
  props: {
    // Kiểu dữ liệu của ô input
    type: {
      type: Number,
      default: Enum.DataType.Number,
    },
    // Giá trị đầu vào
    value: {
      type: [Number, String],
    },
    // Giá trị nhỏ nhất
    min: {
      type: Number,
      default: 0,
    },
    // là input bắt buộc nhập
    isRequired: {
      type: Boolean,
      default: true,
    },
    // input có nhãn
    hasLabel: {
      type: Boolean,
      default: true,
    },
    isDisable: {
      type: Boolean,
      default: false,
    }, // Input không được nhập
    inputClass: {
      type: String,
      default: "",
    }, // lớp dùng để css input
    index: {
      type: Number,
      default: 0,
    }, // Chỉ số ô input
    isError: {
      type: Boolean,
      default: false,
    }, // Có lỗi nếu ô input không được điền
    errorMessage: {
      type: String,
      default: "",
    }, // Nội dung lỗi
    field: String,
    maxLength: Number,
    labelContent: String,
  },

  emits: ["update-input"],

  created() {
    // Cập nhật giá trị nhỏ nhất
    this.config.min = this.min;
    // Cập nhật amount
    this.amount = Number(this.value);
    if (this.type == Enum.DataType.Rate) {
      this.amount = this.value.toString().replace(".", ",");
    }
  },

  watch: {
    amount: function () {
      const amountStr = this.amount.toString();
      if (this.type == Enum.DataType.Rate) {
        // Chuyển đổi thành string có thể ép kiểu sang Number
        if (this.type == Enum.DataType.Rate)
          this.amount = amountStr.replace(",", ".");
      }
      // Update dữ liệu cho control
      this.$emit("update-input", Number(this.amount), this.field, this.index);
      // Format cho giá trị hiển thị
      if (this.type == Enum.DataType.Rate) {
        if (amountStr.length > 5) this.amount = Number(this.amount).toFixed(2);
        this.amount = this.amount.toString().replace(".", ",");
      }
    },
    value: function () {
      this.amount = this.value;
    },
  },

  methods: {
    /**
     * @description Trạng thái ẩn hiện của icon
     * @author NVThinh 29/12/2022
     */
    isShowIcons: function () {
      try {
        return (
          this.type == Enum.DataType.Number || this.type == Enum.DataType.Rate
        );
      } catch (error) {
        console.log(error);
      }
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
      this.amount = this.toNumber(this.amount);
      if (this.type == Enum.DataType.Rate) {
        if (this.amount < 100) this.amount++;
      } else this.amount++;
    },

    /**
     * @description Decrease the value by down icon
     * @author NVThinh 27/12/2022
     */
    decrease: function () {
      if (this.toNumber(this.amount) !== this.min) {
        this.amount = this.toNumber(this.amount) - 1;
      }
    },

    /**
     * @description convert pattern string to number
     * @param {String || Number} amount Example: 8,4
     * @author NVThinh 27/12/2022
     */
    toNumber: function (amount) {
      try {
        amount = amount.toString().replace(",", ".");
        return Number(amount);
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      amount: 0, // giá trị ô input
      Resource, // Tài nguyên
      Function, // Các hàm dùng chung
      Enum, // enum
      // Cấu hình input
      config: {
        spinner: false,
        min: 0,
        max: 1e18, // cost: decimal(22,4) -> 18 integer numbers
        precision: 0,
        decimal: ",",
        thousands: ".",
        masked: false,
        disableNegative: false,
      },
    };
  },
};
</script>

<style scoped>
@import url(@/css/components/input.css);
.input--number {
  position: relative;
}

.input--number .input {
  text-align: right;
  padding-right: 36px;
}

.input--number .icon--up_down {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
}
</style>