<template>
  <div class="input__wrapper">
    <input
      type="text"
      class="input input--search"
      :style="{ width: width }"
      :placeholder="placeholder"
      :maxlength="maxLength"
      :title="Resource.Title['search-input']"
      v-model="value"
      @keyup.enter="updateFilter"
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
    },
    width: {
      type: String,
      default: "179px",
    },
  },
  emits: ["update-filter"],
  watch: {},
  methods: {
    // Gửi giá trị cập nhật đến cha
    updateFilter: function () {
      try {
        this.$emit("update-filter", this.field, this.value);
        console.log("enter");
      } catch (error) {
        console.log(error);
      }
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