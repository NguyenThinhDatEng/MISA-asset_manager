<template>
  <label>{{ labelContent }} <span style="color: red">*</span></label>

  <div class="input--number">
    <input
      type="text"
      class="input"
      :value="
        val < 0 ? Function.formatNumber(value) : Function.formatNumber(val)
      "
      @change="updateInput"
    />
    <div class="icon--up_down">
      <div
        class="icon icon--up"
        :title="Resource.Title.increase"
        @click="increase"
      ></div>
      <div
        class="icon icon--down"
        :title="Resource.Title.decrease"
        @click="decrease"
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
    if (this.mode == Enum.Mode.Update) this.val = this.value;
    else {
      if (this.field.includes("rate"))
        this.$emit("update-input", 0, this.field);
      else this.$emit("update-input", 1, this.field);
    }
  },
  props: {
    labelContent: String,
    maxlength: Number,
    field: String,
    value: Number,
    mode: Number,
  },
  emits: ["update-input"],
  watch: {
    val: function () {
      // Phát dữ liệu khi cập nhật giá trị
      try {
        this.$emit("update-input", this.val, this.field);
      } catch (error) {
        console.log(error);
      }
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
      if (this.val < 0) this.val += 3;
      else if (this.field.includes("rate")) {
        if (this.val < 100) this.val++;
      } else this.val++;
    },
  },
  data() {
    return { Resource, val: -1, Function };
  },
};
</script>

<style scoped>
</style>