<template>
  <!-- Table row  -->
  <tr
    :class="{ 'row--active': isActive }"
    @click="handleOnClickRow"
    @dblclick="carryOutFeature(Enum.Mode.Update)"
  >
    <!-- Cột checkbox -->
    <td class="checkbox__wrapper col--checkbox">
      <input type="checkbox" class="checkbox" :checked="isActive" />
    </td>
    <!-- Cột số thứ tự -->
    <td class="col--stt">{{ index }}</td>
    <!-- Cột mã tài sản -->
    <td class="col--asset-code">{{ tableRowObj.fixed_asset_code }}</td>
    <!-- Cột tên tài sản -->
    <td class="col--asset-name" :title="tableRowObj.fixed_asset_name">
      {{ tableRowObj.fixed_asset_name }}
    </td>
    <!-- Cột loại tài sản -->
    <td
      class="col--asset-category"
      :title="tableRowObj.fixed_asset_category_name"
    >
      {{ tableRowObj.fixed_asset_category_name }}
    </td>
    <!-- Cột bộ phận sử dụng -->
    <td class="col--department" :title="tableRowObj.department_name">
      {{ tableRowObj.department_name }}
    </td>
    <!-- Cột số lượng -->
    <td class="col--quantity">{{ tableRowObj.quantity }}</td>
    <!-- Cột nguyên giá -->
    <td class="col--cost">{{ Function.formatMoney(tableRowObj.cost) }}</td>
    <!-- Cột hao mòn lũy kế -->
    <td class="col--depreciation">
      {{ Function.formatMoney(accumulated_depreciation) }}
    </td>
    <!-- Cột giá trị còn lại -->
    <td class="col--residual_value">
      {{ Function.formatMoney(residual_value) }}
    </td>
    <!-- Cột chức năng -->
    <td class="col--feature">
      <div class="feature">
        <div
          class="icon icon--edit"
          :title="Title.edit"
          @click="carryOutFeature(Enum.Mode.Update)"
        ></div>
        <div
          class="icon icon--duplicate"
          :title="Title.duplicate"
          @click="carryOutFeature(Enum.Mode.Duplicate)"
        ></div>
      </div>
    </td>
  </tr>
</template>

<script>
import Resource from "@/js/resource/resource";
import Enum from "@/js/enum/enum";
import Function from "@/js/common/function";

export default {
  name: "TableRow",
  props: {
    tableRowObj: Object,
    index: Number,
    isCheckAll: Boolean,
    isRefreshTable: Boolean,
  },

  created() {
    // Cập nhật giá trị hao mòn năm
    const depreciation_value = Function.depreciationValue(
      this.tableRowObj.cost,
      this.tableRowObj.depreciation_rate
    );
    // Cập nhật giá trị hao mòn lũy kế
    this.accumulated_depreciation = Function.accumulatedDepreciation(
      depreciation_value,
      this.tableRowObj.production_date
    );
    if (this.accumulated_depreciation > this.tableRowObj.cost)
      this.accumulated_depreciation = this.tableRowObj.cost;
    // Cập nhật giá trị còn lại
    this.residual_value = this.tableRowObj.cost - this.accumulated_depreciation;
  },

  emits: [
    "update-row",
    "update-checked-header",
    "update-popup-object",
    "reload-content",
    "show-popup",
  ],
  watch: {
    // Cập nhật trạng thái active của dòng
    isCheckAll: function () {
      this.isActive = this.isCheckAll;
    },

    // Cập nhật giá trị khi reload dữ liệu
    tableRowObj: function () {
      // Cập nhật giá trị hao mòn năm
      const depreciation_value = Function.depreciationValue(
        this.tableRowObj.cost,
        this.tableRowObj.depreciation_rate
      );
      // Cập nhật giá trị hao mòn lũy kế
      this.accumulated_depreciation = Function.accumulatedDepreciation(
        depreciation_value,
        this.tableRowObj.production_date
      );
      if (this.accumulated_depreciation > this.tableRowObj.cost)
        this.accumulated_depreciation = this.tableRowObj.cost;
      // Cập nhật giá trị còn lại
      this.residual_value =
        this.tableRowObj.cost - this.accumulated_depreciation;
    },

    // Làm mới bảng dữ liệu
    isRefreshTable: function () {
      this.isActive = false;
    },
  },
  methods: {
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
        if (this.isActive == isNew)
          this.$emit("update-row", isNew, this.tableRowObj);
        else {
          if (this.isCheckAll == true)
            this.$emit("update-checked-header", false);
          this.$emit("update-row", !isNew, this.tableRowObj); // isNew == false
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Cập nhật hao mòn lũy kế và giá trị còn lại khi nguyên giá thay đổi
     * @param {double} depreciation_value giá trị hao mòn năm
     */
    updateTableRow: function (cost, depreciation_value) {
      try {
        // Cập nhật hao mòn lũy kế
        this.accumulated_depreciation = Function.accumulatedDepreciation(
          depreciation_value,
          this.tableRowObj.production_date
        );
        if (this.accumulated_depreciation > cost)
          this.accumulated_depreciation = cost;
        // Cập nhật giá trị còn lại
        this.residual_value = cost - this.accumulated_depreciation;
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      isShowPopup: false, // trạng thái ẩn hiện popup
      isShowToast: false, // trạng thái ẩn hiện toast
      isActive: false, // trạng thái của table row
      popupMode: 0, // chế độ popup
      accumulated_depreciation: 0, // tỉ lệ khấu hao
      residual_value: 0, // giá trị còn lại
      popupObj: {}, // đối tượng popup
      Resource, // tài nguyên
      fields: Resource.PopupField, // các trường input trong popup
      Title: Resource.Title, // tooltip
      Function, // Hàm dùng chung
      Enum, // enum
    };
  },
};
</script>

<style scoped>
</style>