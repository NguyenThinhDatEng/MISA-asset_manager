<template>
  <div class="content">
    <Loader :isShow="isShowLoader"></Loader>
    <!-- Function bar  -->
    <FunctionBar :selectedRows="selectedRows"></FunctionBar>
    <!-- Table  -->
    <TheTable @update-tr="UpdateTr"></TheTable>
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
  methods: {
    /**
     * Lấy thông tin các tài sản được chọn
     * @param {Array} selectedRows mảng các dòng được chọn
     * @author Nguyen Van Thinh 06/11/2022
     */
    UpdateTr: function (selectedRows) {
      this.selectedRows = selectedRows;
    },
  },
  data() {
    return { selectedRows: [] };
  },
};
</script>

<style scoped>
@import url(@/css/base.css);
</style>