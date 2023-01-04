<template>
  <div class="input__wrapper">
    <!-- label of input-->
    <label v-if="hasLabel">
      {{ labelContent }} <span style="color: red">*</span></label
    >
    <!-- password input -->
    <div v-if="isPassword" class="password-login">
      <input
        id="iptPassword"
        class="input-login"
        :type="onEye ? 'password' : 'text'"
        :placeholder="Resource.Placeholder.password"
        v-model="val"
      />
      <div
        :class="['eye', { 'on-eye': onEye }, { 'off-eye': !onEye }]"
        @click="toggle"
      ></div>
    </div>
    <!-- input -->
    <input
      v-else
      :class="[
        'input',
        { 'input--disabled': isDisabled },
        { 'input--error': isError },
        { 'input-login': !hasLabel },
      ]"
      :maxlength="maxLength"
      :style="{
        'text-align': type === Enum.DataType.Text ? 'left' : 'right',
      }"
      :field="field"
      :disabled="isDisabled"
      :placeholder="getPlaceholder()"
      v-model="val"
      ref="input"
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
    // Ẩn hiện label của input
    hasLabel: {
      type: Boolean,
      default: true,
    },
    // input dùng để nhập mật khẩu
    isPassword: {
      type: Boolean,
      default: false,
    },
    // Trường dữ liệu
    field: {
      type: String,
      required: "true",
    },
    // Giá trị đầu vào
    value: String,
    maxLength: Number,
    type: {
      type: [Number, String],
      default: 0,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
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

  created() {
    // Cập nhật giá trị ban đầu
    this.val = this.setValue();
  },

  watch: {
    val: function () {
      // Nếu ô input không là kiểu
      if (this.type != Enum.DataType.Text) this.val = Number(this.val);
      this.$emit("update-input", this.val, this.field);
    },
  },

  methods: {
    // Focus input
    focusInput() {
      this.$refs.input.focus();
    },
    // Thiếp lập giá trị ban đầu
    setValue: function () {
      try {
        if (this.value) {
          this.val = this.value;
        } else {
          if (this.type == Enum.DataType.Year) {
            this.val = Function.getCurrentYear();
          }
        }
        return this.val;
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
    /**
     * @description Ẩn/hiện mật khẩu
     * @author NVThinh 28/12/2022
     */
    toggle: function () {
      this.onEye = !this.onEye;
    },
  },
  data() {
    return {
      // Variables
      val: "", // giá trị ô input
      onEye: true, // Trạng thái ẩn/hiện mật khẩu
      // Resources
      Function,
      Resource,
      Enum,
    };
  },
};
</script>

<style scoped>
/* input */
.input-login {
  width: 100%;
  height: 44px;
  padding: 0px 20px;
  margin-top: 16px;
  border-radius: 4px;
  outline: none;
  border: 1px solid #dadce0;
  font-size: 13px;
  box-sizing: border-box;
  background-color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.input-login::placeholder {
  font-family: MISA Regular;
}

/* Icons */
.eye {
  width: 24px;
  height: 24px;
  position: absolute;
  right: 10px;
  top: 28px;
  background-repeat: no-repeat;
  cursor: pointer;
}

.on-eye {
  background-image: url(@/assets/imgs/Icon-qlts-update.svg);
  background-position: -64px -328px;
}

.off-eye {
  background-image: url(@/assets/imgs/Icon-qlts-update.svg);
  background-position: -19px -329px;
}

/* other */
.password-login {
  position: relative;
}
</style>