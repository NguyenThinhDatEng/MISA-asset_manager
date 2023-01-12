<template>
  <div id="write_increase">
    <!-- Function bar -->
    <div class="function-bar">
      <div class="function__left">Ghi tăng tài sản</div>
      <div class="function__right">
        <!-- Button: add a new voucher  -->
        <Button
          :buttonType="'button--add'"
          :buttonContent="Dictionary.action.add.VN"
          :hasIcon="false"
          :title="Resource.Title.add_voucher"
          @click="openPopup(Enum.Mode.Add)"
        ></Button>
        <!-- Button: toggle between horizontal page and vertical page -->
        <button class="button page--state">
          <div class="icon icon--horizontal-page"></div>
          <div class="icon icon--black-down-arrow"></div>
        </button>
      </div>
    </div>
    <!-- Table 01 -->
    <div class="master">
      <!-- Function bar -->
      <div class="function-bar">
        <div class="function__left">
          <!-- Search  -->
          <SearchInput
            :placeholder="Resource.Placeholder.search_voucher"
            :width="'270px'"
            :field="'keyword'"
            @update-filter="updateFilter"
            @handle-empty-input="handleEmptyInput"
          />
        </div>
        <div class="function__right">
          <!-- Delete icon -->
          <div
            class="icon-item_wrapper"
            v-show="isShowDeleteMultiIcon"
            @click="handleOnClickDeleteMany"
          >
            <div class="icon icon--18px icon--delete center"></div>
          </div>
          <!-- Print icon -->
          <div class="icon-item_wrapper">
            <div class="icon icon--18px icon--print center"></div>
          </div>
          <!-- Menu icon -->
          <div class="icon-item_wrapper">
            <div class="icon icon--option center"></div>
          </div>
        </div>
      </div>
      <!-- Master table  -->
      <TableVue
        :cols="TableResource.TableRow.Voucher"
        :tds="tds_of_master"
        :data="vouchers"
        :is-show-feature="true"
        :page="TableResource.TableFoot.Page.voucher"
        :only-one-row="true"
        ref="theTable"
        @update-voucher="updateVoucher"
        @update-row="updateRow"
      />
      <!-- Paging -->
      <TablePaging
        :number-of-records="totalOfRecords"
        @update-filter="updateFilter"
      />
    </div>
    <!-- Table 02 -->
    <div class="detail">
      <div class="function-bar">
        <div class="function__left">Thông tin chi tiết</div>
        <div class="function__right">
          <div class="icon-item_wrapper">
            <div
              class="icon icon--14px icon--zoom-in center"
              @click="toggle"
            ></div>
          </div>
        </div>
      </div>
      <!-- Table  -->
      <TableVue
        :cols="TableResource.TableRow.FixedAssetDetail"
        :tds="tds_of_detail"
        :data="voucherDetail"
        :isShowFooter="false"
        :isShowCheckbox="false"
      />
    </div>
  </div>
  <!-- Popup -->
  <VoucherDetail
    v-if="isShowPopup"
    :title="popupTitle"
    :mode="mode"
    :voucher-prop="selectedVoucher"
    :voucher-detail="voucherDetail"
  />
  <!-- Dialog warning -->
  <DialogWarning
    v-if="isShowDialog"
    :mode="mode"
    :content="warningMessage"
    :has-outline-button="true"
    :main-button-content="Dictionary.action.delete.VN"
    @close-dialog="closeDialog"
    @confirm="confirm"
  />
  <!-- Toast -->
  <ToastVue
    v-if="isShowToast"
    :action-status="toastObj.actionStatus"
    :content="toastObj.content"
  />
</template>

<script>
// Components
import Button from "@/components/base/buttons/ButtonIcon.vue";
import SearchInput from "@/components/base/inputs/SearchInput.vue";
import TableVue from "@/components/base/table/Table.vue";
import DialogWarning from "@/components/base/dialogs/DialogWarning.vue";
import TablePaging from "@/components/base/table/TablePaging.vue";
import ToastVue from "@/components/base/toast/ToastVue.vue";
// Views
import VoucherDetail from "@/views/asset/voucher/VoucherDetail.vue";
// Resources
import Resource from "@/js/resource/resource";
import Dictionary from "@/js/resource/dictionary";
import TableResource from "@/js/resource/tableResource";
import Enum from "@/js/enum/enum";
import {
  filterAndPaging,
  getVoucherDetail,
  deleteById,
  deleteMultipleRecords,
} from "@/apis/voucher/voucher";

export default {
  name: "VoucherList",
  components: {
    Button,
    SearchInput,
    TableVue,
    VoucherDetail,
    DialogWarning,
    TablePaging,
    ToastVue,
  },

  data() {
    return {
      // Variables
      mode: 0, // Chế độ hiển thị popup
      totalOfRecords: 0, // Tổng số bản ghi thu được
      isShowToast: false, // Hiển thị toast thông báo
      isShowDialog: false, // Hiển thị dialog cảnh báo
      isShowDeleteMultiIcon: false, // Hiển thị icon delete nhiều chứng từ
      isShowPopup: false, // Hiển thị popup "Thêm chứng từ ghi tăng"
      popupTitle: "", // Tiêu đề popup
      selectedVoucher: {}, // Đối tượng chứa thông tin chứng từ cần sửa
      conditions: {
        keyword: "",
        limit: 20,
        offset: 0,
      }, // Đối tượng chứa các điều kiện để gọi API
      toastObj: {
        actionStatus: 0,
        content: "",
      }, // Các thông tin yêu cầu từ toast component
      vouchers: [], // Mảng chứa các chứng từ
      voucherDetail: [], // Mảng chứa các tài sản đăng ký chứng từ được chọn
      selectedRows: [], // Mảng chứa các tài sản được chọn
      // Resource
      Resource,
      Dictionary,
      TableResource,
      Enum,
      // Style cho master table
      tds_of_master: [
        {
          col: TableResource.TableRow.Voucher.checkbox?.ENG,
          type: Enum.TableData.type.checkbox,
          width: "50px",
          align: "center",
        },
        {
          col: TableResource.TableRow.Voucher.numerical_order.ENG,
          type: Enum.TableData.type.text,
          width: "50px",
          align: "center",
        },
        {
          col: TableResource.TableRow.Voucher.voucher_code.ENG,
          type: Enum.TableData.type.text,
          width: "150px",
          align: "left",
          color: "#0993EA",
        },
        {
          col: TableResource.TableRow.Voucher.voucher_date.ENG,
          type: Enum.TableData.type.date,
          width: "150px",
          align: "center",
        },
        {
          col: TableResource.TableRow.Voucher.increment_date.ENG,
          type: Enum.TableData.type.date,
          width: "150px",
          align: "center",
        },
        {
          col: TableResource.TableRow.Voucher.total_of_cost.ENG,
          type: Enum.TableData.type.number,
          width: "200px",
          align: "right",
        },
        {
          col: TableResource.TableRow.Voucher.description.ENG,
          type: Enum.TableData.type.text,
          align: "left",
        },
      ],
      // Style cho detail table
      tds_of_detail: [
        {
          col: TableResource.TableRow.FixedAsset.numerical_order.ENG,
          type: Enum.TableData.type.text,
          width: "60px",
          align: "center",
        },
        {
          col: TableResource.TableRow.FixedAsset.fixed_asset_code.ENG,
          type: Enum.TableData.type.text,
          width: "100px",
          maxWidth: "100px",
          align: "left",
        },
        {
          col: TableResource.TableRow.FixedAsset.fixed_asset_name.ENG,
          type: Enum.TableData.type.text,
          width: "250px",
          maxWidth: "250px",
          align: "left",
        },
        {
          col: TableResource.TableRow.FixedAsset.department_name.ENG,
          type: Enum.TableData.type.text,
          width: "250px",
          maxWidth: "250px",
          align: "left",
        },
        {
          col: TableResource.TableRow.FixedAsset.cost.ENG,
          type: Enum.TableData.type.number,
          minWidth: "50px",
          width: "150px",
          align: "right",
        },
        {
          col: TableResource.TableRow.FixedAsset.accumulated_value.ENG,
          type: Enum.TableData.type.number,
          minWidth: "90px",
          width: "150px",
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

  created() {
    this.filterAndPaging();
  },

  watch: {
    // Thực hiện cập nhật giới hạn bản ghi khi tổng số bản ghi thay đổi
    totalOfRecords: function () {
      this.$refs.theTable.updateLimit(this.totalOfRecords);
    },
  },

  computed: {
    // Nội dung dialog
    warningMessage: function () {
      let output = "";
      if (this.mode === Enum.Mode.Delete) {
        output = `Bạn có muốn xóa chứng từ có mã <b>${this.selectedVoucher.voucher_code}</b>?`;
      } else {
        output = `<b>${this.selectedRows.length}</b> chứng từ đã được chọn. Bạn có muốn xóa các chứng từ này khỏi danh sách?`;
      }
      return output;
    },
  },

  methods: {
    /**
     * @description Ẩn toast
     * @author NVThinh 10/1/2023
     */
    closeToast: function () {
      this.isShowToast = false;
    },

    /**
     * @description Đóng dialog
     * @author NVThinh 10/1/2023
     */
    closeDialog: function () {
      this.isShowDialog = false;
    },

    /**
     * @description Mở popup "Thêm chứng từ ghi tăng"
     * @author NVThinh 6/1/2023
     */
    updateVoucher: function (mode, voucher) {
      try {
        // Cập nhật đối tượng voucher được chọn
        this.selectedVoucher = voucher;
        // Mở popup voucher detail
        this.openPopup(mode);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description Phóng to/Thu nhỏ bảng chi tiết
     * @author NVT 3/1/2022
     */
    toggle: function () {
      this.isZoomIn = !this.isZoomIn;
    },

    /**
     * @description Đóng popup
     * @author NVThinh 5/1/2022
     */
    closePopup: function () {
      this.isShowPopup = false;
    },

    /**
     * @description Mở popup
     * @author NVThinh 9/1/2023
     */
    openPopup: function (mode) {
      // Cập nhật chế độ hiển thị popup
      this.mode = mode;
      // Cập nhật tiêu đề popup
      if (mode == Enum.Mode.Add) {
        this.popupTitle = Resource.PopupTitle.add_voucher;
      }
      if (mode == Enum.Mode.Update) {
        this.popupTitle = Resource.PopupTitle.edit_increment_asset;
      }
      if (mode != Enum.Mode.Delete) {
        // Hiển thị popup
        this.isShowPopup = true;
      } else {
        // Hiển thị dialog
        this.isShowDialog = true;
      }
    },

    /**
     * @description lọc và phân trang
     * @author NVThinh 9/1/2023
     */
    filterAndPaging: async function () {
      await filterAndPaging(
        this.conditions.keyword,
        this.conditions.limit,
        this.conditions.offset
      )
        .then((res) => {
          this.vouchers = res.data.data;
          // Cập nhật tổng số bản ghi thu được
          this.totalOfRecords = res.data.totalOfRecords;
        })
        .catch((error) => console.log(error));
    },

    /**
     * @description API lấy chi tiết chứng từ (danh sách tài sản)
     * @param {string} voucher_id là id của chứng từ
     * @author NVThinh 10/1/2023
     */
    getVoucherDetail: async function (voucher_id) {
      try {
        await getVoucherDetail(voucher_id).then((res) => {
          this.voucherDetail = res.data;
        });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Cập nhật các điều kiện của filter
     * @param {string} field trường của dữ liệu
     * @param {string} value giá trị được cập nhật
     * @author NVThinh 10/1/2023
     */
    updateFilter: function (field, value) {
      try {
        // Cập nhật các diều kiện lọc và phân trang
        this.conditions[field] = value;
        // Call lại API
        this.filterAndPaging();
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description xử lý sự kiện khi ô tìm kiếm trống
     * @author NVThinh 7/1/2023
     */
    handleEmptyInput: function () {
      this.conditions.keyword = "";
      this.filterAndPaging();
      this.voucherDetail = [];
    },

    /**
     * @description Cập nhật mảng các dòng được chọn
     * @author NVThinh 10/1/2023
     */
    updateRow: function (selectedRows) {
      if (selectedRows.length > 1) {
        // Cập nhật mảng các dòng được chọn
        this.selectedRows = selectedRows;
        // Hiển thị nút xóa nhiều
        this.isShowDeleteMultiIcon = true;
      } else {
        // Cập nhật mảng chi tiết chứng từ
        this.getVoucherDetail(selectedRows[0]?.voucher_id);
        // Không hiển thị icon xóa nhiều
        this.isShowDeleteMultiIcon = false;
      }
    },

    /**
     * @description xử lý sự kiện khi ấn nút chính trong dialog
     * @param {Number} mode chế độ hiển thị của dialog
     * @author NVThinh 10/1/2023
     */
    confirm: async function (mode) {
      if (mode === Enum.Mode.Delete) {
        // Call API xóa 1
        await deleteById(this.selectedVoucher.voucher_id)
          .then(() => {
            // Hiển thị thông báo
            this.showToast(
              Enum.ActionStatus.Success,
              Resource.ToastContent.Delete.Success
            );
          })
          .catch(() => {
            // Hiển thị thông báo
            this.showToast(
              Enum.ActionStatus.Error,
              Resource.ToastContent.Delete.Fail
            );
          });
      } else {
        // Tạo mảng các ids
        let recordIDs = this.selectedRows.map((obj) => {
          return obj.voucher_id;
        });
        // Call API xóa nhiều
        await deleteMultipleRecords(recordIDs)
          .then(() => {
            // Hiển thị thông báo thành công
            this.showToast(
              Enum.ActionStatus.Success,
              this.selectedRows.length +
                Resource.ToastContent.DeleteMultiSuccess
            );
          })
          .catch(() => {
            // Hiển thị thông báo thất bại
            this.showToast(
              Enum.ActionStatus.Error,
              Resource.ToastContent.DeleteMulti.Fail
            );
          });
      }
      // Đóng dialog
      this.closeDialog();
    },

    /**
     * Hiển thị toast
     * @param {Number} actionStatus trạng thái toast
     * @param {String} content nội dung hiển thị
     * @author NVThinh 10/1/2023
     */
    showToast: function (actionStatus, content) {
      // Cập nhật đối tượng toast
      this.toastObj.actionStatus = actionStatus;
      this.toastObj.content = content;
      // Hiển thị toast
      this.isShowToast = true;
      // refresh table
      this.filterAndPaging();
    },

    /**
     * @description xử lý sự kiện khi ấn vào nút xóa nhiều
     * @author NVThinh 10/1/2023
     */
    handleOnClickDeleteMany: async function () {
      try {
        // Cập nhật chế độ
        this.mode = Enum.Mode.DeleteMulti;
        // Mở dialog
        this.isShowDialog = true;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
@import url(@/css/icon.css);
@import url(@/css/font.css);

#write_increase {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.function-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 36px;
  padding-left: 18px;
}

.function__left {
  font-family: MISA Bold;
  font-size: 20px;
}

.function-bar__right {
  display: flex;
}

.page--state {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #fff;
  outline: none;
  border: none;
  border-radius: 4px;
  min-width: 66px;
}

.button + .button {
  margin-left: 11px;
}

.function-bar + .master {
  margin-top: 14px;
}

.master {
  max-height: 363px;
}

.detail,
.master {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 5;
  background-color: #fff;
}

.master .function-bar {
  height: 62px;
  margin-bottom: 0;
  align-items: center;
}

.icon-item_wrapper {
  width: 32px;
  cursor: pointer;
}

.master + .detail {
  margin-top: 8px;
}

.detail {
  max-height: 218px;
  flex: 3;
}

.detail .function__left {
  font-size: 15px;
}

.detail .icon-item_wrapper {
  width: 44px;
}

.detail .table {
  height: 158px;
}

/* Table */
.table {
  height: unset;
  border: none;
  box-shadow: none;
}

.master .table {
  flex: 1;
}
</style>