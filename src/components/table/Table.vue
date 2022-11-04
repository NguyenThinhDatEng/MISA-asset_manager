<template>
  <div class="table" id="table">
    <table>
      <!-- Table columns -->
      <colgroup>
        <col v-for="obj in styleObject" :key="obj.col" :style="obj" />
      </colgroup>
      <!-- Table Header  -->
      <TableHead></TableHead>
      <!-- Table body  -->
      <TableBody @update-tr="updateTr"></TableBody>
      <!-- Table footer  -->
      <TableFoot></TableFoot>
    </table>
  </div>
</template>

<script>
import TableHead from "./TableHead.vue";
import TableBody from "./table-body/TableBody.vue";
import TableFoot from "./TableFoot.vue";
// import resource from "@/resource/resource";

export default {
  name: "TheTable",
  created() {},
  components: { TableHead, TableBody, TableFoot },
  props: {},
  emits: [],
  methods: {
    updateTr: function (selectedRows) {
      this.$emit("update-tr", selectedRows);
    },
  },
  data() {
    return {
      //   cols: resource.Columns,
      styleObject: [
        {
          col: "checkbox",
          "min-width": "40px",
          "text-align": "center",
        },
        {
          col: "stt",
          "min-width": "40px",
          "text-align": "left",
        },
        {
          col: "asset-code",
          "min-width": "70px",
          "text-align": "left",
        },
        {
          col: "asset-name",
          "min-width": "90px",
          "max-width": "160px",
          "text-align": "left",
        },
        {
          col: "asset-category",
          "min-width": "70px",
          "max-width": "120px",
          "text-align": "left",
        },
        {
          col: "department",
          "min-width": "100px",
          "max-width": "120px",
          "text-align": "left",
        },
        {
          col: "quantity",
          "min-width": "60px",
          "text-align": "right",
        },
        {
          col: "cost",
          "text-align": "right",
        },
        {
          col: "depreciation",
          "min-width": "90px",
          "text-align": "right",
        },
        {
          col: "residual-value",
          "min-width": "80px",
          "text-align": "right",
        },
        {
          col: "feature",
          "min-width": "60px",
          "max-width": "80px",
          "text-align": "center",
        },
      ],
    };
  },
};
</script>

<style scoped>
@import url(@/css/base.css);
</style>