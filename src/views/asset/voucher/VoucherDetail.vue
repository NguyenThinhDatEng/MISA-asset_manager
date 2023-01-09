<template>
  <Popup
    :isShow="isShow"
    :title="title"
    @close-popup="$parent.closePopup"
    @on-save="validate"
  >
    <div class="popup__body__wrapper">
      <div class="voucher-info">
        <div class="voucher-info__title">Thông tin chứng từ</div>
        <div class="voucher-info__content">
          <!-- Row -->
          <div class="row">
            <!-- Input: voucher code -->
            <InputVue
              class="bottomError"
              :label="Resource.InputLabel.voucher_code"
              :value="voucher.voucher_code"
              :is-error="isError"
              ref="voucherCode"
              @update-input="updateInput"
            />
            <!-- Inputs: voucher date -->
            <div class="input--date">
              <label
                >{{ Resource.InputLabel.voucher_date }}
                <span style="color: red">*</span></label
              >
              <InputCalendar
                :value="voucher.voucher_date"
                :mode="Enum.Mode.Update"
              />
            </div>
            <!-- Input: increment date -->
            <div class="input--date">
              <label
                >{{ Resource.InputLabel.increment_date }}
                <span style="color: red">*</span></label
              >
              <InputCalendar
                :value="voucher.increment_date"
                :mode="Enum.Mode.Update"
              />
            </div>
          </div>
          <!-- Row -->
          <div class="row">
            <InputVue
              :label="Resource.InputLabel.description"
              :isRequired="false"
            />
          </div>
        </div>
      </div>
      <!-- Detail information -->
      <div class="detail-info">
        <!-- Function bar -->
        <div class="function-bar">
          <!-- Left -->
          <div class="function__left">
            <!-- Search  -->
            <SearchInputVue
              :field="'keyword'"
              :placeholder="Resource.Placeholder.search_asset_code_name"
              :width="'270px'"
              @update-filter="updateFilter"
              @handle-empty-input="handleEmptyInput"
            />
          </div>
          <!-- right -->
          <div class="function__right">
            <Button
              id="asset-selection"
              :buttonContent="Resource.ButtonContent.select_asset"
              @click="showAssetList"
            />
          </div>
        </div>
        <!-- Master table  -->
        <TableVue
          :cols="TableResource.TableRow.FixedAssetDetail"
          :tds="tds_of_detail"
          :data="displayedAssetList"
          :page="TableResource.TableFoot.Page.fixedAssetDetail"
          :is-show-feature="true"
          :isShowCheckbox="false"
          :onlyOneRow="true"
          ref="theTable"
          @update-voucher="updateVoucher"
        />
      </div>
    </div>
  </Popup>
  <!-- Voucher fixed asset list -->
  <VoucherAssetList v-if="isShowAssetList" />
  <!-- Budget Detail -->
  <BudgetDetail
    v-if="isShowBudgetDetail"
    :fixed-asset-name="fixedAsset.name"
    :department="fixedAsset.department"
  />
  <!-- Dialog cancel -->
  <DialogCancelVue v-if="isShowDialog" />
</template>

<script>
// Resources
import Resource from "@/js/resource/resource";
import TableResource from "@/js/resource/tableResource";
import Enum from "@/js/enum/enum";
import Function from "@/js/common/function";
import { getNewCode } from "@/apis/voucher/voucher";
// Components
import Popup from "@/components/base/popup/VPopup.vue";
import InputVue from "@/components/base/inputs/Input.vue";
import InputCalendar from "@/components/base/datepicker/InputCalendar.vue";
import TableVue from "@/components/base/table/Table.vue";
import SearchInputVue from "@/components/base/inputs/SearchInput.vue";
import Button from "@/components/base/buttons/ButtonOutline.vue";
import DialogCancelVue from "@/components/base/dialogs/DialogCancel.vue";
// Views
import VoucherAssetList from "@/views/asset/voucher/VoucherAssetList.vue";
import BudgetDetail from "@/views/asset/voucher/BudgetDetail.vue";

export default {
  name: "VoucherDetail",
  components: {
    Popup,
    InputVue,
    InputCalendar,
    TableVue,
    SearchInputVue,
    Button,
    DialogCancelVue,
    // views
    VoucherAssetList,
    BudgetDetail,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    }, // Hiển thị popup
    title: {
      type: String,
      isRequired: true,
    }, // Tiêu đề popup
    mode: {
      type: Number,
      default: 0,
    }, // Chế độ hiển thị popup
    voucherProp: Object, // Thông tin chứng từ được chọn
  },

  created() {
    // Chế độ thêm
    if (this.mode == Enum.Mode.Add) this.getNewCode();
    else {
      // Chế độ sửa
      this.voucher = this.voucherProp;
    }
  },

  watch: {
    // Cập nhật Tổng số bản ghi
    selectedAssetList: function () {
      this.paging();
    },
  },

  mounted() {
    // focus vào ô input đầu tiên
    this.$refs.voucherCode.focusInput();
    console.log(this.voucher);
  },

  methods: {
    /**
     * @description xử lý sự kiện khi ô tìm kiếm trống
     * @author NVThinh 7/1/2023
     */
    handleEmptyInput: function () {
      try {
        this.displayedAssetList = this.selectedAssetList;
        // Cập nhật tổng số bản ghi thu được
        this.$refs.theTable.updateLimit(this.selectedAssetList.length);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description Mở popup "Sửa tài sản"
     * @author NVThinh 6/1/2023
     */
    updateVoucher: function (mode, fixedAsset, index) {
      if (mode == Enum.Mode.Delete) {
        this.selectedAssetList.splice(index, 1);
        this.paging();
        return;
      }
      // Cập nhật thông tin tài sản
      this.fixedAsset.name = fixedAsset.fixed_asset_name;
      this.fixedAsset.department = fixedAsset.department_name;
      // Mở popup
      this.isShowBudgetDetail = true;
    },

    /**
     * @description Hiển thị popup "chọn tài sản ghi tăng"
     * @author NVThinh 6/1/2023
     */
    showAssetList: function () {
      this.isShowAssetList = true;
    },

    /**
     * @description Đóng popup
     * @author NVThinh 6/1/2022
     */
    closePopup: function () {
      this.isShowAssetList = false;
      this.isShowBudgetDetail = false;
    },

    /**
     * Lấy thông tin các tài sản được chọn
     * @param {Array} selectedRows mảng các dòng được chọn
     * @author Nguyen Van Thinh 7/1/2023
     */
    updateRow: function (selectedRows) {
      try {
        // Cập nhật mảng các dòng được chọn
        this.selectedAssetList = selectedRows;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Cập nhật các điều kiện của filter và paging
     * @param {string} field trường của dữ liệu
     * @param {string} value giá trị được cập nhật
     * @author NVThinh 8/1/2023
     */
    updateFilter: function (field, value) {
      // Cập nhật các điều kiện filter và paging
      this.conditions[field] = value;
      // Cập nhật mảng các tài sản hiển thị
      if (field !== "keyword") {
        this.displayedAssetList = this.selectedAssetList.slice(
          this.conditions.offset,
          this.conditions.offset + this.conditions.limit
        );
      } else {
        this.filter(value);
      }
    },

    /**
     * @description lọc dữ liệu theo mã và tên tài sản
     * @param {String} keyword
     * @author NVThinh 8/1/2023
     */
    filter: function (keyword) {
      if (keyword) {
        // Cập nhật dữ liệu hiển thị
        this.displayedAssetList = Function.autoComplete(
          keyword,
          this.selectedAssetList,
          "fixed_asset_code",
          "fixed_asset_name"
        );
        // Cập nhật tổng số bản ghi thu được
        this.$refs.theTable.updateLimit(this.displayedAssetList.length);
      }
    },

    /**
     * @description phân trang
     * @author NVThinh 9/1/2023
     */
    paging: function () {
      // Thiết lập các điều kiện filter và paging về mặc định
      this.conditions = {
        keyword: "",
        limit: 20,
        offset: 0,
      };
      // Cập nhật mảng các dòng được hiển thị
      this.displayedAssetList = this.selectedAssetList.slice(
        this.conditions.offset,
        this.conditions.limit
      );
      // Cập nhật tổng số bản ghi
      this.updateTotalOfRecords();
    },

    /**
     * @description Cập nhật tổng số bản ghi
     * @author NVThinh 9/1/2023
     */
    updateTotalOfRecords: function () {
      try {
        this.$refs.theTable.updateLimit(this.selectedAssetList.length);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description API lấy mã mới
     * @author Nguyen Van Thinh 9/1/2023
     */
    getNewCode: async function () {
      try {
        await getNewCode().then((res) => {
          // Gán vào đối tượng
          this.voucher.voucher_code = res.data;
        });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description Kiểm tra tính hợp lệ của dữ liệu đầu vào
     * @author NVThinh 9/1/2023
     */
    validate: function () {
      try {
        // Kiểm tra trường bắt buộc nhập
        if (this.voucher.voucher_code === "") {
          this.isError = true;
          return;
        }
        // Kiểm tra bảng detail có ít nhất 1 tài sản
        if (this.selectedAssetList.length === 0) {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description Cập nhật dữ liệu khi giá trị ô input thay đổi
     * @author NVThinh 9/1/2023
     */
    updateInput: function (value) {
      try {
        this.voucher.voucher_code = value;
        // Cập nhật hiển thị lỗi
        if (value) this.isError = false;
      } catch (error) {
        console.log(error);
      }
    },
  },

  data() {
    return {
      isError: false, // Lỗi thiếu thông tin trường bắt buộc
      isShowDialog: false, // Hiển thị dialog cảnh báo
      isShowAssetList: false, // Hiển thị popup "chọn tài sản ghi tăng"
      isShowBudgetDetail: false, // Hiển thị popup "Sửa tài sản"
      displayedAssetList: [], // Mảng chứa các tài sản đã được lọc
      selectedAssetList: [], // Mảng chứa các tài sản được chọn
      conditions: {
        keyword: "",
        limit: 20,
        offset: 0,
      }, // Đối tượng chứa các điều kiện để gọi API
      fixedAsset: {
        name: "",
        department: "",
      }, // Đối tượng tài sản được chọn trong bảng detail
      voucher: {
        voucher_code: "",
        voucher_date: Function.getCurrentDate(),
        increment_date: Function.getCurrentDate(),
        description: "",
      }, // Đối tượng chứng từ
      // Resources
      Resource,
      TableResource,
      Enum,
      // Style cho detail table
      tds_of_detail: [
        {
          col: TableResource.TableRow.FixedAsset.numerical_order.ENG,
          type: Enum.TableData.type.text,
          minWidth: "40px",
          align: "center",
        },
        {
          col: TableResource.TableRow.FixedAsset.fixed_asset_code.ENG,
          type: Enum.TableData.type.text,
          minWidth: "70px",
          maxWidth: "80px",
          align: "left",
        },
        {
          col: TableResource.TableRow.FixedAsset.fixed_asset_name.ENG,
          type: Enum.TableData.type.text,
          minWidth: "90px",
          maxWidth: "180px",
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
          col: TableResource.TableRow.FixedAsset.cost.ENG,
          type: Enum.TableData.type.number,
          width: "70px",
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
      ],
    };
  },
};
</script>

<style scoped>
@import url(@/css/views/voucher_detail.css);

.popup__body__wrapper {
  background-color: #f4f7ff;
  padding: 16px;
}

.voucher-info__title {
  font-family: MISA Bold;
  font-size: 15px;
  padding-bottom: 16px;
}

.voucher-info__content {
  padding: 16px 16px 0;
}

.voucher-info__content,
.detail-info {
  background-color: #fff;
}

.row {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;
}

.voucher-info + .detail-info {
  margin-top: 16px;
}

.function-bar {
  display: flex;
  justify-content: space-between;
  padding: 16px;
}

#asset-selection {
  padding-left: 24px;
  padding-right: 24px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 16%);
}

.table {
  /* height: 202px; */
  height: 221px;
  border: none;
  box-shadow: none;
}

/* input */
.input__wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.input__wrapper + div {
  margin-left: 16px;
}
</style>