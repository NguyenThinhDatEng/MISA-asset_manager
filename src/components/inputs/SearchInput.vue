<template>
  <div>
    <input
      type="text"
      class="input input--search"
      :placeholder="Resource.Placeholder['asset-search']"
      :maxlength="maxLength"
      :title="Resource.Title['search-input']"
    />
    <div class="icon-function_wrapper">
      <div class="icon center icon--18px icon--search-input"></div>
    </div>
  </div>
</template>

<script>
import Resource from "@/resource/resource";
export default {
  name: "SearchInput",
  components: {},
  props: {},
  emits: [],
  methods: {},
  data() {
    return { Resource, maxLength: 255 };
  },
};
</script>

<style scoped>
</style>