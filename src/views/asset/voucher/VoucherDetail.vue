<template>
  <Popup
    :isShow="isShow"
    :title="title"
    @close-popup="close"
    @on-save="validate"
    @keydown.esc="close"
    @keyup.ctrl.q.stop="validate"
    @keyup.ctrl.insert="showAssetList"
    @on-tab="$refs.firstInput.focus()"
  >
    <div class="popup__body__wrapper">
      <div class="voucher-info">
        <div class="voucher-info__title">Thông tin chứng từ</div>
        <div class="voucher-info__content">
          <!-- Row -->
          <div class="row">
            <!-- ignore input -->
            <input ref="firstInput" class="ignoreInput" readonly />
            <!-- Input: voucher code -->
            <InputVue
              class="bottomError"
              :label="Resource.InputLabel.voucher_code"
              :value="voucher?.voucher_code"
              :is-error="isError"
              :field="'voucher_code'"
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
                :value="voucher?.voucher_date"
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
                :value="voucher?.increment_date"
                :mode="Enum.Mode.Update"
              />
            </div>
          </div>
          <!-- Row -->
          <div class="row">
            <InputVue
              :label="Resource.InputLabel.description"
              :isRequired="false"
              :value="voucher?.description"
              :field="'description'"
              @update-input="updateInput"
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
              :tabindex="'none'"
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
        <!--  Detail Table  -->
        <TableVue
          :cols="TableResource.TableRow.FixedAssetDetail"
          :tds="tds_of_detail"
          :data="displayedAssetList"
          :page="TableResource.TableFoot.Page.voucher_detail"
          :is-show-feature="true"
          :isShowCheckbox="false"
          :onlyOneRow="true"
          :is-show-footer="isShowFooter()"
          :offset="conditions.offset"
          ref="theTable"
          @update-voucher="updateVoucher"
        />
        <!-- Paging -->
        <TablePaging
          :number-of-records="this.assetList.length"
          @update-filter="updateFilter"
        />
      </div>
    </div>
  </Popup>
  <!-- Voucher fixed asset list -->
  <VoucherAssetList
    v-if="isShowAssetList"
    :selectedIDs="selectedIDs"
    :deleted-asset-list="deletedAssetList"
  />
  <!-- Budget Detail -->
  <BudgetDetail
    v-if="isShowBudgetDetail"
    :voucherAsset="selectedFixedAsset"
    @update-budget="updateBudget"
  />
  <!-- Dialog warning -->
  <DialogWarning
    v-if="isShowDialog"
    :content="dialog.warningMessage"
    :has-sub-button="dialog.hasSubButton"
    :has-outline-button="hasOutlineButton"
    @confirm="confirm"
    @close-popup="$parent.closePopup()"
    @close-dialog="closeDialog"
  />
</template>

<script>
// Resources
import Resource from "@/js/resource/resource";
import TableResource from "@/js/resource/tableResource";
import Enum from "@/js/enum/enum";
import Function from "@/js/common/function";
import {
  getNewCode,
  createVoucher,
  updateVoucher,
} from "@/apis/voucher/voucher";
import { editFixedAsset } from "@/apis/fixedAsset";
// Components
import Popup from "@/components/base/popup/VPopup.vue";
import InputVue from "@/components/base/inputs/Input.vue";
import InputCalendar from "@/components/base/datepicker/InputCalendar.vue";
import TableVue from "@/components/base/table/Table.vue";
import SearchInputVue from "@/components/base/inputs/SearchInput.vue";
import Button from "@/components/base/buttons/ButtonOutline.vue";
import DialogWarning from "@/components/base/dialogs/DialogWarning.vue";
import TablePaging from "@/components/base/table/TablePaging.vue";
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
    DialogWarning,
    TablePaging,
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
    voucherDetail: Array, // Mảng danh sách các tài sản trong chứng từ
  },
  emits: ["reload-content"],

  created() {
    try {
      // Chế độ thêm
      if (this.mode == Enum.Mode.Add) {
        // Lấy mã mới
        this.getNewCode();
      } else {
        // Cập nhật dữ liệu
        this.voucher = this.voucherProp;
        this.assetList = this.voucherDetail;
      }
    } catch (error) {
      console.log(error);
    }
  },

  computed: {
    selectedIDs: function () {
      return this.assetList.map((obj) => {
        return obj.fixed_asset_id;
      });
    },
  },

  mounted() {
    // focus vào ô input đầu tiên
    this.focusFirstInput();
    // Khởi tạo originalData (sau khi DOM được updated)
    this.$nextTick(function () {
      this.originalVoucher = Object.assign({}, this.voucher);
    });
    // Phân trang
    this.paging();
  },

  methods: {
    /**
     * @description xử lý sự kiện khi ấn vào nút confirm của dialog
     * @author NVThinh 17/1/2023
     */
    confirm: function () {
      try {
        this.isShowDialog = false;
        if (this.dialog.hasSubButton == true) {
          this.validate();
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * @description focus vào ô mã chứng từ
     * @author NVThinh 16/1/2023
     */
    focusFirstInput: function () {
      try {
        this.$refs.voucherCode.focusInput();
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description xử lý sự kiện khi ô tìm kiếm trống
     * @author NVThinh 7/1/2023
     */
    handleEmptyInput: function () {
      try {
        this.displayedAssetList = this.assetList;
        // Cập nhật tổng số bản ghi thu được
        this.$refs.theTable.updateLimit(this.assetList.length);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description Mở popup "Sửa tài sản"
     * @author NVThinh 6/1/2023
     */
    updateVoucher: function (mode, fixedAsset, indexOfArray) {
      if (mode == Enum.Mode.Delete) {
        // Thêm tài sản vào mảng bị xóa
        if (this.mode == Enum.Mode.Update) {
          this.deletedAssetList.push(fixedAsset);
        }
        console.log(this.deletedAssetList);
        // Bỏ tài sản bị xóa khỏi danh sách hiển thị
        this.assetList.splice(indexOfArray, 1);
        // Phân trang
        this.paging();
        return;
      }
      console.log(this.deletedAssetList);
      // Cập nhật thông tin tài sản
      this.selectedFixedAsset = this.assetList[indexOfArray];
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
      // focus vào ô input đầu tiên
      this.focusFirstInput();
    },

    /**
     * @description đóng component này
     * @author NVThinh 13/1/2023
     */
    close: function () {
      try {
        if (Function.isObjectEqual(this.originalVoucher, this.voucher)) {
          if (this.changed) {
            this.dialog.hasOutlineButton = false;
            this.dialog.hasSubButton = true;
            this.showDialog(this.dialogMessage.confirm.add);
          } else {
            this.$parent.closePopup();
          }
        } else {
          if (this.changed) {
            // Nếu dữ liệu được thay đổi
            if (this.mode == Enum.Mode.Update) {
              this.dialog.hasSubButton = true;
              this.showDialog(this.dialogMessage.confirm.update);
            }
          } else {
            this.$parent.closePopup();
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Lấy thông tin các tài sản được chọn
     * @param {Array} selectedRows mảng các dòng được chọn
     * @author Nguyen Van Thinh 7/1/2023
     */
    updateRow: function (selectedRows) {
      try {
        // Cập nhật mảng danh sách bị xóa
        this.deletedAssetList = this.deletedAssetList.filter((obj) => {
          let result = selectedRows.find((newObj) => {
            return newObj.fixed_asset_id == obj.fixed_asset_id;
          });
          return result == undefined ? true : false;
        });
        // Cập nhật mảng các dòng được chọn
        if (this.assetList.length == 0) {
          this.assetList = selectedRows;
        } else {
          this.assetList.push(...selectedRows);
        }
        if (selectedRows.length > 0) {
          // Phân trang
          this.paging();
        }
        // focus vào ô input đầu tiên
        this.focusFirstInput();
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Cập nhật các điều kiện của filter và paging
     * @param {string} field trường của dữ liệu
     * @param {string} value giá trị được cập nhật
     * @author NVThinh 12/1/2023
     */
    updateFilter: function (field, value) {
      // Cập nhật các điều kiện filter và paging
      this.conditions[field] = value;
      // Cập nhật mảng các tài sản hiển thị
      if (field !== "keyword") {
        this.displayedAssetList = this.assetList.slice(
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
          this.assetList,
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
      this.displayedAssetList = this.assetList.slice(
        this.conditions.offset,
        this.conditions.limit
      );
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
          this.originalVoucher.voucher_code = res.data;
        });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description Gọi API tạo mới hoặc cập nhật chứng từ
     * @author NVThinh 13/1/2023
     */
    handleVoucher: async function () {
      try {
        // Dữ liệu đầu vào của API thêm mới
        let input = { voucher: {}, voucherDetailList: [], costList: [] };

        // Khởi tạo danh sách voucher detail
        this.assetList.forEach((obj) => {
          // Khởi tạo mảng các voucher detail
          input.voucherDetailList.push({
            ...this.baseFields,
            fixed_asset_id: obj.fixed_asset_id,
            budgets: obj.budgets,
          });
        });

        // Khởi tạo chứng từ
        this.voucher.total_of_cost = this.updateTotalOfCost();
        this.voucher.modified_date = new Date();
        input.voucher = this.voucher;

        // Khởi tạo danh sách nguyên giá cần cập nhật
        input.costList = this.costList.filter((obj) => {
          const isExisted = this.assetList.find((assetObj) => {
            return assetObj.fixed_asset_id == obj.fixed_asset_id;
          });
          return isExisted == undefined ? false : true;
        });

        // Gọi API
        if (this.mode == Enum.Mode.Add) {
          await createVoucher(input)
            .then(() => {
              this.handleSuccessAPI();
              // Đóng popup
              this.$parent.closePopup();
            })
            .catch((res) => {
              this.handleErrorAPI(res);
            });
        } else {
          await updateVoucher(input)
            .then(() => {
              this.handleSuccessAPI();
              // Đóng popup
              this.$parent.closePopup();
            })
            .catch((res) => {
              this.handleErrorAPI(res);
            });
        }
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
        if (this.assetList.length === 0) {
          this.dialog.hasSubButton = false;
          this.showDialog(this.dialogMessage.isRequired);
          return;
        }
        // Gọi API
        this.handleVoucher();
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description Cập nhật dữ liệu khi giá trị ô input thay đổi
     * @author NVThinh 9/1/2023
     */
    updateInput: function (value, field) {
      try {
        if (this.mode == Enum.Mode.Update && this.changed == false) {
          if (value == this.voucherProp[field]) {
            this.changed = false;
          } else {
            this.changed = true;
          }
        }
        this.voucher[field] = value;
        // Cập nhật hiển thị lỗi
        if (value) this.isError = false;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description Đóng dialog
     * @author NVThinh 10/1/2023
     */
    closeDialog: function () {
      this.isShowDialog = false;
    },

    /**
     * @description Hiển thị footer chứa các tổng tiền của các cột
     * @author NVThinh 13/1/2023
     */
    isShowFooter: function () {
      return this.assetList.length > 0;
    },

    /**
     * @description Xử lý sự kiện khi gọi API thành công
     * @author NVThinh 13/1/2023
     */
    handleSuccessAPI: function () {
      try {
        // reload lại trang
        this.$emit("reload-content");
        // Thiết lập toast thông báo
        let toastContent = "";
        switch (this.mode) {
          case Enum.Mode.Add:
            toastContent = Resource.ToastContent.Add.Success;
            break;
          case Enum.Mode.Update:
            toastContent = Resource.ToastContent.Update.Success;
            break;
          default:
            // Mặc định là nhân bản thông tin
            toastContent = "No Add no update";
            break;
        }
        // Gọi đến hàm hiển thị toast tại parent component (Content)
        this.$parent.showToast(Enum.ActionStatus.Success, toastContent);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description Xử lý khi có lỗi gửi về từ serve
     * @param {Object} res là res là response trả về từ client
     * @author NVThinh 13/1/2023
     */
    handleErrorAPI: function (res) {
      if (res.response.data.errorCode == Enum.ErrorCode.BadRequest) {
        // Hiển thị dialog cảnh báo
        this.showDialog(res.response.data.moreInfo);
      } else {
        this.$parent.showToast(
          Enum.ActionStatus.Error,
          res.response.data.moreInfo
        );
      }
    },

    /**
     * @description Cập nhật tổng nguyên giá và ngân sách sau khi chỉnh sửa tài sản
     * @author NVThinh 13/1/2023
     */
    updateBudget: function (assetID, totalOfCost, budgets, isChanged) {
      try {
        // Nếu tài sản được sửa ngân sách
        if (isChanged) {
          this.costList.push({ fixed_asset_id: assetID, cost: totalOfCost });
          this.changed = true;
        }
        // Cập nhật tổng nguyên giá
        for (let obj of this.assetList) {
          if (obj.fixed_asset_id == assetID) {
            obj.cost = totalOfCost;
            obj.budgets = budgets;
            break;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description Gọi API cập nhật tài sản cố định
     * @author NVThinh 13/1/2023
     */
    updateFixedAsset: async function (fixedAssetID, fixedAsset) {
      try {
        await editFixedAsset(fixedAssetID, fixedAsset);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description Cập nhật đối tượng dialog và hiển thị dialog
     * @param {String} message Thông tin hiển thị trong popup
     * @author NVThinh 13/1/2023
     */
    showDialog: function (message) {
      this.dialog.warningMessage = message;
      this.isShowDialog = true;
    },

    /**
     * @description Cập nhật tổng của tất cả các nguyên giá
     * @author NVThinh 13/1/2023
     */
    updateTotalOfCost: function () {
      // Cập nhật tổng
      return this.assetList.reduce((accumulator, obj) => {
        return accumulator + obj.cost;
      }, 0);
    },
  },

  data() {
    return {
      changed: false, // Nếu dữ liệu bị thay đổi
      isError: false, // Lỗi thiếu thông tin trường bắt buộc
      isShowDialog: false, // Hiển thị dialog cảnh báo
      isShowAssetList: false, // Hiển thị popup "chọn tài sản ghi tăng"
      isShowBudgetDetail: false, // Hiển thị popup "Sửa tài sản"
      displayedAssetList: [], // Mảng chứa các tài sản đã được lọc
      assetList: [], // Mảng chứa các tài sản được chọn
      costList: [], // Mảng chứa các tài sản được chỉnh sửa
      deletedAssetList: [], // Mảng chứa các tài sản bị xóa
      dialog: {
        warningMessage: "", // Thông tin cảnh báo
        hasSubButton: false, // Dialog có button kiểu sub
        hasOutlineButton: false, // Dialog có button kiểu outline
      }, // Đối tượng dialog
      conditions: {
        keyword: "",
        limit: 20,
        offset: 0,
      }, // Đối tượng chứa các điều kiện để gọi API
      voucher: {
        voucher_code: "",
        voucher_date: Function.getCurrentDate(),
        increment_date: Function.getCurrentDate(),
        description: "",
        total_of_cost: 0,
        created_date: new Date(),
        created_by: "Nguyen Van Thinh",
        modified_date: new Date(),
        modified_by: "",
      }, // Đối tượng chứng từ
      originalVoucher: {}, // Đối tượng chứng từ khởi tạo ban đầu
      selectedFixedAsset: {}, // Đối tượng tài sản được chọn để chỉnh sửa
      dialogMessage: {
        isRequired: "Chọn ít nhất 1 tài sản",
        confirm: {
          add: "Bạn có muốn hủy khai báo tài sản này?",
          update:
            "Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có muốn lưu các thay đổi này?",
        },
      },
      // Resources
      Resource,
      TableResource,
      Enum,
      baseFields: {
        created_date: new Date(),
        created_by: "Nguyen Van Thinh",
        modified_date: new Date(),
        modified_by: "",
      },
      // Style cho detail table
      tds_of_detail: [
        {
          col: TableResource.TableRow.FixedAsset.numerical_order.ENG,
          type: Enum.TableData.type.text,
          width: "40px",
          align: "center",
        },
        {
          col: TableResource.TableRow.FixedAsset.fixed_asset_code.ENG,
          type: Enum.TableData.type.text,
          width: "80px",
          maxWidth: "80px",
          align: "left",
        },
        {
          col: TableResource.TableRow.FixedAsset.fixed_asset_name.ENG,
          type: Enum.TableData.type.text,
          width: "190px",
          maxWidth: "190px",
          align: "left",
        },
        {
          col: TableResource.TableRow.FixedAsset.department_name.ENG,
          type: Enum.TableData.type.text,
          width: "160px",
          maxWidth: "160px",
          align: "left",
        },
        {
          col: TableResource.TableRow.FixedAsset.cost.ENG,
          type: Enum.TableData.type.number,
          width: "120px",
          align: "right",
        },
        {
          col: TableResource.TableRow.FixedAsset.accumulated_value.ENG,
          type: Enum.TableData.type.number,
          width: "120px",
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

.ignoreInput {
  width: 0;
  height: 0;
  border: none;
}
</style>