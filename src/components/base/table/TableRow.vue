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
      @click-checkbox="onClickCheckBox = true"
      ref="td"
    />
    <div class="feature" v-show="isShowFeature">
      <!-- Edit button -->
      <div class="icon__wrapper" @click="updateVoucher(Enum.Mode.Update)">
        <div class="icon icon--edit center" :title="Resource.Title.edit" />
      </div>
      <!-- Delete button -->
      <div class="icon__wrapper" @click="updateVoucher(Enum.Mode.Delete)">
        <div
          class="icon icon--18px icon--delete center"
          :title="Resource.Title.delete"
        ></div>
      </div>
    </div>
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
    index: {
      type: Number,
      isRequired: true,
    }, // Chỉ số của dòng
    numerical_order: {
      type: Number,
      isRequired: true,
    }, // Số thứ tự
    tds: {
      type: Array,
      required: true,
    }, // Style các ô dữ liệu trong bảng
    isOnly: {
      type: Boolean,
      default: false,
    }, // Chỉ 1 dòng được active trong bảng
    isShowFeature: Boolean, // Ẩn/hiện các tính năng
    tableRowObj: Object, // Đối tượng chứa dữ liệu hiển thị
    isCheckAll: Boolean, // true nếu ô checkbox all được tick
    isRefreshTable: Boolean, // làm mới bảng => bỏ active tất cả các dòng
  },

  components: {
    TableData,
  },

  emits: [
    "update-row",
    "update-checked-header",
    "update-popup-object",
    "update-voucher",
    "reload-content",
    "show-popup",
    "click-checkbox",
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
      if (
        this.isOnly &&
        this.numerical_order == 1 &&
        this.isCheckAll == false
      ) {
        this.isActive = true;
        // Gửi dữ liệu đến table
        this.$emit("update-row", true, this.data, 1);
      }
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
     * @description Phát tín hiệu đến lớp cha khi click vào nút sửa
     * @author NVThinh 6/1/2023
     */
    updateVoucher: function (mode) {
      this.$emit(
        "update-voucher",
        mode,
        this.tableRowObj,
        this.numerical_order - 1
      );
    },

    /**
     * @description active dòng
     * @author NVThinh 5/1/2023
     */
    onActive: function () {
      this.$nextTick(() => {
        this.isActive = true;
      });
    },

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
        // Gửi dữ liệu lên table
        this.$emit("show-popup", mode, this.tableRowObj);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description Xử lý sự kiện click vào 1 dòng
     * @author Nguyen Van Thinh 05/11/2022
     */
    handleOnClickRow: function () {
      try {
        const isNew = true;
        // Thay đổi trạng thái của dòng
        this.isActive = !this.isActive;
        // Nếu dòng được active, bắn đối tượng đến Table
        if (this.isActive == isNew) {
          this.$emit(
            "update-row",
            isNew,
            this.data,
            this.index,
            this.onClickCheckBox
          );
        } else {
          if (this.isCheckAll == true) {
            this.$emit("update-checked-header", false);
          }
          this.$emit("update-row", !isNew, this.data, this.index); // isNew == false
        }
        // refresh trạng thái tick checkbox
        this.onClickCheckBox = false;
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
      isActive: false, // trạng thái của table row
      popupMode: 0, // chế độ popup
      isShowPopup: false, // trạng thái ẩn hiện popup
      isShowToast: false, // trạng thái ẩn hiện toast
      accumulated_value: 0, // tỉ lệ khấu hao
      residual_value: 0, // giá trị còn lại
      fields: Resource.PopupField, // các trường input trong popup
      onClickCheckBox: false, // true nếu click vào ô checkbox
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
tr {
  position: relative;
}
tr .feature {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0, -50%);
}

tr .feature .icon__wrapper {
  position: relative;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  background-color: #d1edf4;
}

tr .feature .icon__wrapper:hover {
  background-color: #fff;
}
</style>