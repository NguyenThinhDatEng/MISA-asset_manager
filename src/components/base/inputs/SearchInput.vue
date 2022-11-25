<template>
  <div>
    <input
      type="text"
      class="input input--search"
      :placeholder="Resource.Placeholder['asset-search']"
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

export default {
  name: "SearchInput",
  props: {
    field: String,
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
</style>