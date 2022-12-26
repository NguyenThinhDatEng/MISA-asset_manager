<template>
  <div class="table" id="table">
    <table>
      <!-- Table columns -->
      <colgroup>
        <col v-for="obj in styleObject" :key="obj.col" :style="obj" />
      </colgroup>
      <!-- Table Header  -->
      <thead>
        <tr>
          <th class="th--checkbox checkbox__wrapper">
            <input
              id="checkbox-header"
              type="checkbox"
              class="checkbox"
              :checked="checkedHeader"
              v-model="isCheckAll"
            />
          </th>
          <th
            v-for="(value, key) of ths"
            :key="key"
            :title="setTitle(value)"
            :class="'col--' + key"
          >
            {{ value }}
          </th>
        </tr>
      </thead>
      <!-- Table body  -->
      <tbody>
        <Row
          v-for="(asset, index) in fixedAssets"
          :key="index"
          :tableRowObj="asset"
          :numerical_order="index + startIndex + 1"
          :is-check-all="isCheckAll"
          :is-refresh-table="isRefreshTable"
          @update-row="updateRow"
          @update-checked-header="updateCheckedHeader"
          @show-popup="showPopup"
          ref="Row"
        ></Row>
        <tr class="ignoreRow">
          <td v-show="fixedAssets.length == 0" colspan="100">
            Không có dữ liệu trên grid
          </td>
        </tr>
      </tbody>
      <!-- Table footer  -->
      <TableFoot
        :footerData="footerData"
        :number-of-records="numberOfRecords"
        :totalOfQuantities="totalOfQuantities"
        ref="tableFoot"
      ></TableFoot>
    </table>
  </div>
</template>

<script>
import Function from "@/js/common/function";
import Row from "./TableRow.vue";
import TableFoot from "./TableFoot.vue";
import Resource from "@/js/resource/resource";

export default {
  name: "TheTable",
  props: {
    fixedAssets: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  components: { Row, TableFoot },
  emits: ["update-row", "reload-content", "show-popup"],
  watch: {
    // Trạng thái chọn tất cả thay đổi
    isCheckAll: function () {
      try {
        // Tick chọn tất cả
        if (this.isCheckAll == true) {
          // Thêm tất cả các dòng vào mảng
          this.selectedRows = [];
          for (const asset of this.fixedAssets) {
            this.selectedRows.push(asset);
          }
        } else {
          // Bỏ chọn tất cả
          this.selectedRows = [];
        }
        // Gửi dữ liệu lên Content
        this.$emit("update-row", this.selectedRows);
        // Trạng thái checkbox input ở table header
        this.checkedHeader = this.isCheckAll;
      } catch (error) {
        console.log(error);
      }
    },
    // Mảng dữ liệu thay đổi
    fixedAssets: function () {
      // Cập nhật tổng các cột ở table footer
      this.updateFooterData();
      // Làm mới bảng dữ liệu
      this.isRefreshTable = !this.isRefreshTable;
      // Đưa ô check ở Header về mặc định
      this.isCheckAll = false;
      // Làm mới mảng được chọn
      this.selectedRows = [];
    },
  },

  methods: {
    /**
     * Hiển thị popup khi thực hiện chức năng
     * @param {Number} mode chế độ popup
     * @param {Object} popupObj đối tượng tài sản trong popup
     * @author NVThinh 19/11/2022
     */
    showPopup: function (mode, popupObj) {
      try {
        this.$emit("show-popup", mode, popupObj);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Thêm hoặc xóa tài sản khỏi mảng chứa các dòng được chọn
     * @param {Boolean} isNewRow true - thêm dòng mới, false - xóa dòng cũ
     * @param {Object} obj là tài sản được chọn
     * @author Nguyen Van Thinh 05/11/2022
     */
    updateRow: function (isNewRow, obj) {
      try {
        // Thêm dòng mới vào mảng
        if (isNewRow) {
          this.selectedRows.push(obj);
        } else {
          // Xóa tài sản khỏi mảng
          const length = this.selectedRows.length;
          for (let i = 0; i < length; i++) {
            if (this.selectedRows[i].fixed_asset_id == obj.fixed_asset_id) {
              this.selectedRows.splice(i, 1);
              break;
            }
          }
        }
        // Bắn chiều dài mảng được chọn lên cha của nó (Table)
        this.$emit("update-row", this.selectedRows);
        // console.log(this.selectedRows);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Emit: lấy dữ liệu từ Row
     * @param {Boolean} checkedHeader trạng thái checked của checkbox header
     * @author Nguyen Van Thinh 06/11/2022
     */
    updateCheckedHeader: function (checkedHeader) {
      this.checkedHeader = checkedHeader;
    },

    // Thiếp lập title cho từ viết tắt (table header)
    setTitle: function (value) {
      try {
        if (value == "STT") return Resource.Abbreviations.STT;
        else if (value == "HM/KH lũy kế")
          return Resource.Abbreviations.depreciation;
        else return "";
      } catch (error) {
        console.log("Table Header", error);
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

    /**
     * Cập nhật dữ liệu tại table footer
     * @author Nguyen Van Thinh 11/11/2022
     */
    updateFooterData: function () {
      // Hiển thị Loader
      this.isShowLoader = true;
      // Khởi tạo lại các giá trị trên footer table
      this.totalOfQuantities = 0;
      for (const key in this.footerData) this.footerData[key] = 0;
      // Cập nhật các dữ liệu trên table footer
      for (const obj of this.fixedAssets) {
        this.totalOfQuantities += obj.quantity;
        this.footerData.totalOfCost += obj.cost;
        this.footerData.totalDepreciationValue += Function.accumulatedValue(
          (obj.depreciation_rate * obj.cost) / 100,
          obj.production_date,
          obj.cost
        );
      }
      this.footerData.totalResidualValue =
        this.footerData.totalOfCost - this.footerData.totalDepreciationValue;
      // Ẩn Loader
      this.isShowLoader = false;
    },

    // Thực hiện updateFilter tại cha để tải lại danh sách
    updateFilter: function (field, value) {
      try {
        // Cập nhật startIndex
        if (field == Resource.Filter.offset) this.startIndex = value;
        // Thực hiện hàm updateFilter tại Vue cha
        this.$parent.updateFilter(field, value);
      } catch (error) {
        console.log(error);
      }
    },

    // Cập nhật Tổng số bản ghi
    updateLimit: function (totalOfRecords) {
      try {
        this.numberOfRecords = totalOfRecords;
      } catch (error) {
        console.log(error);
      }
    },

    // Cập nhật trang số được chọn
    updatePageNumber: function () {
      try {
        this.$parent.updateFilter;
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      startIndex: 0, // chỉ số bắt đầu của số thứ tự
      numberOfRecords: 0, // Tổng số bản ghi
      isCheckAll: false, // Trạng thái check tất cả
      isRefreshTable: false, // Trạng thái làm mới bảng khi tải lại trang
      checkedHeader: false, // Trạng thái check ô checkbox tại header table
      selectedRows: [], // Mảng chứa các dòng được chọn
      totalOfQuantities: 0, // Tổng số lượng
      // Các dữ liệu tổng tại chân bảng
      footerData: {
        totalOfCost: 0, // Tổng nguyên giá
        totalDepreciationValue: 0, // Tổng giá trị hao mòn
        totalResidualValue: 0, // Tổng giá trị còn lại
      },
      // Style cho từng cột
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
      ths: Resource.Columns, // object chứa tên cột
      Resource, // tài nguyên
    };
  },
};
</script>

<style scoped>
@import url(@/css/components/table.css);
.ignoreRow {
  height: 100%;
  text-align: center;
}

.ignoreRow:hover {
  background-color: #fff;
}
</style>