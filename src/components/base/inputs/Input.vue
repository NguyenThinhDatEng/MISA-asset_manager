<template>
  <div class="input__wrapper">
    <!-- label of input-->
    <label> {{ labelContent }} <span style="color: red">*</span></label>
    <!-- input -->
    <input
      :class="[
        'input',
        { 'input--disabled': isDisabled },
        { 'input--error': isError },
      ]"
      :maxlength="maxLength"
      :style="{
        'text-align': type == Enum.DataType.Text ? 'left' : 'right',
      }"
      :value="setValue()"
      :field="field"
      :disabled="isDisabled"
      :placeholder="getPlaceholder()"
      ref="input"
      @keyup="updateInput($event)"
    />
    <!-- error message -->
    <p
      v-show="isError"
      class="error-message"
      v-html="labelContent + ' ' + Resource.ErrorMessage.blank"
    ></p>
  </div>
</template>

<script>
import Function from "@/js/common/function";
import Resource from "@/js/resource/resource";
import Enum from "@/js/enum/enum";

export default {
  name: "NormalInput",
  props: {
    maxLength: Number,
    value: String,
    type: {
      type: Number,
      default: 0,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    field: String,
    labelContent: String,
    isError: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  emits: ["update-input"],
  methods: {
    // Focus input
    focusInput() {
      this.$refs.input.focus();
    },
    // Gửi nội dung dữ liệu được thay đổi lên class cha
    updateInput: function (e) {
      try {
        const value = e.target.value;
        let val = null;
        if (this.type != Enum.DataType.Text) val = Number(value);
        else val = value;
        this.$emit("update-input", val, this.field);
      } catch (error) {
        console.log(error);
      }
    },
    // Thiếp lập giá trị ban đầu
    setValue: function () {
      try {
        let val = "";
        if (this.value) {
          val = this.value;
        } else {
          if (this.type == Enum.DataType.Year) {
            val = Function.getCurrentYear();
          }
        }
        return val;
      } catch (error) {
        console.log(error);
      }
    },
    // Lấy placeholder
    getPlaceholder: function () {
      try {
        if (this.placeholder) return this.placeholder;
        if (
          this.type == Enum.DataType.Number ||
          this.type == Enum.DataType.Money
        )
          return 0;
        return "";
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
      Enum,
    };
  },
};
</script>

<style scoped>
</style>