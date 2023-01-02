<template>
  <div class="table" id="table">
    <table>
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
            :title="getTooltip(value.ENG)"
            :style="[
              { 'min-width': value.style.minWidth },
              { 'max-width': value.style.maxWidth },
              { 'text-align': value.style.align },
            ]"
          >
            {{ value.VN }}
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
          :tds="tds"
          @update-row="updateRow"
          @update-checked-header="updateCheckedHeader"
          @show-popup="showPopup"
          ref="Row"
        ></Row>
        <tr class="ignoreRow">
          <td v-show="fixedAssets.length === 0" colspan="100">
            {{ TableResource.Status.noContent }}
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
// Components
import Row from "./TableRow.vue";
import TableFoot from "./TableFoot.vue";
// Resources
import Function from "@/js/common/function";
import Resource from "@/js/resource/resource";
import TableResource from "@/js/resource/tableResource";
import Enum from "@/js/enum/enum";

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

  mounted() {
    // Cập nhật table head
    this.ths = Object.assign(this.cols);
    let index = 0;
    for (const key in this.ths) {
      this.ths[key].style = this.tds[index];
      index++;
    }
    delete this.ths.checkbox;
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
    getTooltip: function (value) {
      try {
        if (value === this.cols.numerical_order.ENG)
          return Resource.Abbreviations.STT;
        if (value === this.cols.accumulated_value.ENG)
          return Resource.Abbreviations.depreciation;
        return "";
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
      // Variables
      ths: [], // object chứa tên cột
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
      // Resource
      Resource,
      TableResource,
      cols: TableResource.TableRow.FixedAsset, // Các cột có trong bảng
      tds: [
        {
          col: TableResource.TableRow.FixedAsset.checkbox.ENG,
          type: Enum.TableData.type.checkbox,
          minWidth: "40px",
          maxWidth: "50px",
          align: "center",
        },
        {
          col: TableResource.TableRow.FixedAsset.numerical_order.ENG,
          type: Enum.TableData.type.text,
          minWidth: "40px",
          align: "left",
        },
        {
          col: TableResource.TableRow.FixedAsset.fixed_asset_code.ENG,
          type: Enum.TableData.type.text,
          minWidth: "70px",
          align: "left",
        },
        {
          col: TableResource.TableRow.FixedAsset.fixed_asset_name.ENG,
          type: Enum.TableData.type.text,
          minWidth: "90px",
          maxWidth: "160px",
          align: "left",
        },
        {
          col: TableResource.TableRow.FixedAsset.fixed_asset_category_name.ENG,
          type: Enum.TableData.type.text,
          minWidth: "70px",
          maxWidth: "120px",
          align: "left",
        },
        {
          col: TableResource.TableRow.FixedAsset.department_name.ENG,
          type: Enum.TableData.type.text,
          minWidth: "100px",
          maxWidth: "120px",
          align: "left",
        },
        {
          col: TableResource.TableRow.FixedAsset.quantity.ENG,
          type: Enum.TableData.type.number,
          minWidth: "60px",
          align: "right",
        },
        {
          col: TableResource.TableRow.FixedAsset.cost.ENG,
          type: Enum.TableData.type.number,
          align: "right",
        },
        {
          col: TableResource.TableRow.FixedAsset.accumulated_value.ENG,
          type: Enum.TableData.type.number,
          minWidth: "90px",
          align: "right",
        },
        {
          col: TableResource.TableRow.FixedAsset.residual_value.ENG,
          type: Enum.TableData.type.number,
          minWidth: "80px",
          align: "right",
        },
        {
          col: TableResource.TableRow.FixedAsset.feature.ENG,
          minWidth: "60px",
          maxWidth: "80px",
          align: "center",
        },
      ],
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

.checkbox__wrapper {
  position: relative;
  width: 50px;
}
</style>