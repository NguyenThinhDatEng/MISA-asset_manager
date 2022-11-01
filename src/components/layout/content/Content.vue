<template>
  <div class="content">
    <!-- Function bar  -->
    <FunctionBar></FunctionBar>
    <!-- Table  -->
    <TheTable></TheTable>
  </div>
</template>

<script>
import FunctionBar from "./FunctionBar.vue";
import TheTable from "@/components/table/Table.vue";
export default {
  name: "TheContent",
  created() {},
  components: { FunctionBar, TheTable },
  props: {},
  emits: [],
  methods: {},
  data() {
    return {};
  },
};
</script>

<style scoped>
@import url(@/css/base.css);
</style>