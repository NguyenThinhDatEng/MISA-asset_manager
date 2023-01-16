<template>
  <div class="input__wrapper">
    <input
      type="text"
      class="input input--search"
      :style="{ width: width }"
      :placeholder="placeholder"
      :maxlength="maxLength"
      :title="Resource.Title['search-input']"
      :tabindex="tabindex"
      v-model="value"
      ref="input"
      @keyup.enter="updateFilter"
      @keydown.tab="handleOnTab"
    />
    <div class="icon-function_wrapper">
      <div class="icon center icon--18px icon--search-input"></div>
    </div>
  </div>
</template>

<script>
import Resource from "@/js/resource/resource";
import Dictionary from "@/js/resource/dictionary";

export default {
  name: "SearchInput",
  props: {
    field: String, // bắn emit đến lớp cha
    placeholder: {
      type: String,
      default: Dictionary.action.search,
    }, // placeholder
    width: {
      type: String,
      default: "179px",
    }, // Độ dài input
    tabindex: {
      type: [Number, String],
      default: 1,
    }, // tabindex
  },
  emits: ["update-filter", "handle-empty-input", "handle-on-tab"],

  watch: {
    // Nếu giá trị input cập nhật
    value: function (newVal, oldVal) {
      if (!newVal && oldVal) {
        this.$emit("handle-empty-input");
      }
    },
  },

  methods: {
    // Gửi giá trị cập nhật đến cha
    updateFilter: function () {
      try {
        this.$emit("update-filter", this.field, this.value);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description focus vào ô input
     * @author NVThinh 16/1/2023
     */
    focusInput: function () {
      this.$refs.input.focus();
    },

    /**
     * @description bắn sự kiện bắt keydown tab lên cha
     * @author NVThinh 16/1/2023
     */
    handleOnTab: function () {
      this.$emit("handle-on-tab");
    },
  },

  data() {
    return { Resource, maxLength: 255, value: "" };
  },
};
</script>

<style scoped>
.input__wrapper {
  position: relative;
}
</style>