<template>
  <!-- Table row  -->
  <tr
    :class="{ 'row--active': isActive }"
    @click="handleOnClickRow"
    @dblclick="carryOutFeature(Enum.Mode.Update)"
  >
    <TableData
      v-for="td in tds"
      :key="td.col"
      :config="td"
      :content="getTdContent(td.col)"
      :isActive="isActive"
      ref="td"
    />
  </tr>
</template>

<script>
// Resources
import Resource from "@/js/resource/resource";
import Enum from "@/js/enum/enum";
import Function from "@/js/common/function";
import TableResource from "@/js/resource/tableResource";
// Components
import TableData from "./TableData.vue";

export default {
  name: "TableRow",
  props: {
    tds: {
      type: Array,
      required: true,
    },
    tableRowObj: Object,
    numerical_order: Number,
    isCheckAll: Boolean,
    isRefreshTable: Boolean,
  },

  components: {
    TableData,
  },

  emits: [
    "update-row",
    "update-checked-header",
    "update-popup-object",
    "reload-content",
    "show-popup",
  ],

  created() {
    try {
      // Cập nhật mảng data
      this.data = Object.assign(this.tableRowObj);
      this.updateRow();
      this.updateData();
    } catch (error) {
      console.log(error);
    }
  },

  watch: {
    // Cập nhật trạng thái active của dòng
    isCheckAll: function () {
      this.isActive = this.isCheckAll;
    },

    // Cập nhật giá trị khi reload dữ liệu
    tableRowObj: function () {
      this.data = Object.assign(this.tableRowObj);
      this.updateRow();
      this.updateData();
    },

    // Làm mới bảng dữ liệu
    isRefreshTable: function () {
      this.isActive = false;
    },
  },

  methods: {
    /**
     * @description Lấy nội dung hiển thị của td
     * @param {String} col Tên cột
     * @author NVThinh 2/1/2023
     */
    getTdContent: function (col) {
      try {
        if (col === TableResource.TableRow.FixedAsset.numerical_order.ENG) {
          return this.numerical_order;
        }
        return this.tableRowObj[col];
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Sự kiện nhấn vào tính năng chỉnh sửa hoặc nhân bản
     * @author Nguyen Van Thinh 05/11/2022
     */
    carryOutFeature: function (mode) {
      try {
        // Bind dữ liệu vào đối tượng Popup
        for (const field in this.fields) {
          this.popupObj[field] = this.tableRowObj[field];
        }
        // Gửi dữ liệu lên table
        this.$emit("show-popup", mode, this.popupObj);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Sự kiện nhấn vào 1 dòng
     * @author Nguyen Van Thinh 05/11/2022
     */
    handleOnClickRow: function () {
      try {
        const isNew = true;
        // Thay đổi trạng thái của dòng
        this.isActive = !this.isActive;
        // Nếu dòng được active, bắn đối tượng đến Table
        if (this.isActive == isNew) this.$emit("update-row", isNew, this.data);
        else {
          if (this.isCheckAll == true) {
            this.$emit("update-checked-header", false);
          }
          this.$emit("update-row", !isNew, this.data); // isNew == false
        }
      } catch (error) {
        console.log(error);
      }
    },

    // Khởi tạo giá trị hao mòn lũy kế và giá trị còn lại
    updateRow: function () {
      try {
        // Cập nhật giá trị hao mòn năm
        const depreciation_value = Function.depreciationValue(
          this.tableRowObj.cost,
          this.tableRowObj.depreciation_rate
        );
        // Cập nhật giá trị hao mòn lũy kế
        this.accumulated_value = Function.accumulatedValue(
          depreciation_value,
          this.tableRowObj.production_date,
          this.tableRowObj.cost
        );
        // Cập nhật giá trị còn lại
        this.residual_value = this.tableRowObj.cost - this.accumulated_value;
      } catch (error) {
        console.log(error);
      }
    },

    // Cập nhật data
    updateData: function () {
      try {
        this.data.accumulated_value = this.accumulated_value;
        this.data.residual_value = this.residual_value;
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      data: {}, // Đối tượng table row chứa các dữ liệu hiển thị trong file excel
      popupMode: 0, // chế độ popup
      popupObj: {}, // đối tượng popup
      isShowPopup: false, // trạng thái ẩn hiện popup
      isShowToast: false, // trạng thái ẩn hiện toast
      isActive: false, // trạng thái của table row
      accumulated_value: 0, // tỉ lệ khấu hao
      residual_value: 0, // giá trị còn lại
      fields: Resource.PopupField, // các trường input trong popup
      // Resources
      Resource,
      Function,
      Enum,
      props: TableResource.TableRow.FixedAsset,
    };
  },
};
</script>

<style scoped>
</style>