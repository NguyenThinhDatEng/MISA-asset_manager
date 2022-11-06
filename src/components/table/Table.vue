<template>
  <div class="table" id="table">
    <table>
      <!-- Table columns -->
      <colgroup>
        <col v-for="obj in styleObject" :key="obj.col" :style="obj" />
      </colgroup>
      <!-- Table Header  -->
      <TableHead @check-all="checkAll"></TableHead>
      <!-- Table body  -->
      <TableBody
        @disabled-button="disabledButton"
        :check-all="isCheckAll"
      ></TableBody>
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
  components: { TableHead, TableBody, TableFoot },
  emits: ["disabled-button"],
  methods: {
    /**
     * Phát dữ liệu đến class cha (Content)
     * @param {Array} selectedRows Các row được chọn trong grid
     * @author Nguyen Van Thinh 06/11/2022
     */
    disabledButton: function (disabled) {
      try {
        this.$emit("disabled-button", disabled);
      } catch (error) {
        console.log(error);
      }
    },

    // Cập nhật biến chọn tất cả các dòng
    checkAll: function (checked) {
      try {
        this.isCheckAll = checked;
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      isCheckAll: false,
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
          col: "residual_value",
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