<template>
  <div class="content">
    <Loader :isShow="isShowLoader"></Loader>
    <!-- Function bar  -->
    <FunctionBar></FunctionBar>
    <!-- Table  -->
    <TheTable></TheTable>
  </div>
</template>

<script>
import FunctionBar from "./FunctionBar.vue";
import TheTable from "@/components/table/Table.vue";
import Loader from "@/components/more/Loader.vue";

export default {
  name: "TheContent",
  components: { FunctionBar, TheTable, Loader },
  props: {
    isShowLoader: Boolean,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
@import url(@/css/base.css);
</style>