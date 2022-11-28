<template>
  <div class="content">
    <!-- Loader  -->
    <Loader :isShow="isShowLoader"></Loader>
    <!-- Function bar  -->
    <div class="function">
      <!-- Left function bar  -->
      <div class="function_left">
        <!-- Search  -->
        <Input
          :field="Object.keys(this.conditions)[0]"
          @update-filter="updateFilter"
        ></Input>
        <!-- Fixed asset categories filter -->
        <DropdownTick
          :parentClass="filters[0].className"
          :placeholder="Resource.Placeholder[filters[0].placeholder]"
          :field="filters[0].field"
          :title="Resource.Title.fixed_asset_category_filter"
          :dropdown-data="this.fixedAssetCategories"
          @update-filter="updateFilter"
        ></DropdownTick>
        <!-- Department filter -->
        <DropdownTick
          :parentClass="filters[1].className"
          :placeholder="Resource.Placeholder[filters[1].placeholder]"
          :field="filters[1].field"
          :title="Resource.Title.department_filter"
          :dropdown-data="this.departments"
          @update-filter="updateFilter"
        ></DropdownTick>
      </div>
      <!-- Right function bar  -->
      <div class="function__right">
        <!-- Button: add a new asset  -->
        <Button
          :buttonType="'button--add'"
          :buttonName="'asset-add'"
          :iconName="'icon--add'"
          :title="Resource.Title.add"
          @click="handleOnclickAddButton"
        ></Button>
        <!-- Exporting excel library -->
        <export-excel
          class="btn btn-default"
          :data="isDisabledButton ? [] : json_data"
          :fields="json_fields"
          :before-generate="beforeGenerate"
          worksheet="Danh sách tài sản cố định"
          name="Danh sách tài sản cố định.xls"
        >
          <!-- Export button -->
          <ButtonFeature
            :buttonName="'button--' + Resource.Name.export"
            :iconName="'icon--' + Resource.Name.export"
            :title="Resource.Title.export"
            :isDisable="isDisabledButton"
          ></ButtonFeature>
        </export-excel>
        <!-- Delete button  -->
        <ButtonFeature
          :buttonName="'button--' + Resource.Name.delete"
          :iconName="'icon--' + Resource.Name.delete"
          :title="Resource.Title.delete"
          :isDisable="isDisabledButton"
          @click="isShowDialogDelete = true"
        ></ButtonFeature>
      </div>
    </div>
    <!-- Table  -->
    <TheTable
      :fixed-assets="fixedAssets"
      @update-row="updateRow"
      @show-popup="showPopup"
      ref="theTable"
    ></TheTable>
    <!-- Dialog delete warning -->
    <DialogDeleteVue
      v-if="isShowDialogDelete"
      :number-of-selected-rows="selectedRows.length"
      :fixed-asset="selectedRows[0]"
      @close-dialog="isShowDialogDelete = false"
      @delete-records="deleteRecords"
    ></DialogDeleteVue>
  </div>
  <!-- Popup -->
  <Popup
    v-if="isShowPopup"
    :mode="mode"
    :popup-obj="popupObj"
    :departments="departments"
    :fixed-categories="fixedAssetCategories"
    @close-popup="isShowPopup = false"
    @show-toast="isShowToast = true"
    @show-error-toast="showErrorToast"
    @reload-content="reloadContent"
  ></Popup>
  <!-- Toast -->
  <ToastVue
    v-if="isShowToast"
    :action-status="toastObj.actionStatus"
    :content="toastObj.content"
  ></ToastVue>
</template>

<script>
import Resource from "@/js/resource/resource";
import DropdownTick from "@/components/base/dropdowns/DropdownTick.vue";
import TheTable from "@/components/base/table/Table.vue";
import Input from "@/components/base/inputs/SearchInput.vue";
import Button from "@/components/base/buttons/ButtonIcon.vue";
import ButtonFeature from "@/components/base/buttons/ButtonFeature.vue";
import Popup from "@/components/base/popups/PopupAsset.vue";
import DialogDeleteVue from "@/components/base/dialogs/DialogDelete.vue";
import Loader from "@/components/base/more/Loader.vue";
import Enum from "@/js/enum/enum";
import Function from "@/js/common/function";
import Constants from "@/js/common/constants";
import TableResource from "@/js/resource/tableResource";
import ToastVue from "@/components/base/toast/ToastVue.vue";
import {
  getFixedAssetByFilterAndPaging,
  deleteFixedAsset,
  deleteMultipleFixedAssets,
} from "@/apis/fixedAsset";
import { getAllDepartments } from "@/apis/department";
import { getAllFixedAssetCategories } from "@/apis/fixedAssetCategory";

export default {
  name: "TheContent",
  components: {
    Input,
    TheTable,
    Button,
    ButtonFeature,
    Popup,
    DialogDeleteVue,
    ToastVue,
    Loader,
    DropdownTick,
  },

  /**
   * Gọi API lấy tất cả bản ghi cho bộ phận phòng ban và loại tài sản
   * @author Nguyen Van Thinh 04/11/2022
   */
  created() {
    // Gọi API lấy danh sách tài sản cố định theo tìm kiếm, lọc và giới hạn bản ghi
    this.searchAndFilter();

    // Gọi API lấy tất cả bộ phận sử dụng
    getAllDepartments()
      .then((res) => {
        this.departments = res.data;
      })
      .catch(() => {
        this.showToast(Enum.ActionStatus.Error, Resource.ToastContent.Error);
      });

    // Gọi API lấy tất cả bộ phận sử dụng
    getAllFixedAssetCategories()
      .then((res) => {
        this.fixedAssetCategories = res.data;
      })
      .catch(() => {
        this.showToast(Enum.ActionStatus.Error, Resource.ToastContent.Error);
      });
  },

  watch: {
    // Thiết lập thời gian hiển thị cho toast
    isShowToast: function () {
      setTimeout(() => {
        this.isShowToast = false;
      }, 2000);
    },
    // Cập nhật Tổng số bản ghi
    totalOfRecords: function () {
      this.$refs.theTable.updateLimit(this.totalOfRecords);
    },
  },

  methods: {
    /**
     * Gọi API filter
     * @author NVThinh 22/11/2022
     */
    searchAndFilter: async function () {
      // Gọi API lấy danh sách tài sản cố định theo lọc và phân trang
      this.isShowLoader = true;
      await getFixedAssetByFilterAndPaging(
        this.conditions.keyword,
        this.conditions.department_id,
        this.conditions.fixed_asset_category_id,
        this.conditions.limit,
        this.conditions.offset
      )
        .then((res) => {
          this.fixedAssets = res.data.data;
          this.totalOfRecords = res.data.totalOfRecords;
          this.isShowLoader = false;
        })
        .catch(() => {
          this.showToast(Enum.ActionStatus.Error, Resource.ToastContent.Error);
        });
    },

    /**
     * Tải lại trang (đóng popup, hiển thị toast)
     * @author NVThinh (20/11/2022)
     */
    reloadContent: function () {
      try {
        this.searchAndFilter();
        // đóng popup
        this.isShowPopup = false;
        // hiển thị toast thông báo
        this.isShowToast = true;
      } catch (error) {
        console.log(error);
      }
    },

    // Xóa bản ghi
    deleteRecords: async function (mode) {
      try {
        // Cập nhật chế độ
        this.mode = mode;
        // Thực hiện xóa 1 bản ghi
        if (mode == Enum.Mode.Delete) {
          await deleteFixedAsset(this.selectedRows[0].fixed_asset_id)
            .then(() => {
              this.reloadContent();
              this.showToast(
                Enum.ActionStatus.Success,
                Resource.ToastContent.Delete.Success
              );
              // Bỏ đối tượng vừa xóa khỏi mảng selected rows
              this.$refs.theTable.updateRow(false, this.selectedRows[0]);
            })
            .catch(() => {
              this.showToast(
                Enum.ActionStatus.Error,
                Resource.ToastContent.Delete.Fail
              );
            });
        } else {
          // Thực hiện xóa nhiều bản ghi
          let listID = {};
          let fixedAssetIDs = [];
          for (const obj of this.selectedRows) {
            fixedAssetIDs.push(obj.fixed_asset_id);
          }
          listID["fixedAssetIDs"] = fixedAssetIDs;
          this.numberOfDeletedRecords = fixedAssetIDs.length;
          // Gọi API xóa nhiều bản ghi
          await deleteMultipleFixedAssets(listID)
            .then(() => {
              this.reloadContent();
              this.showToast(
                Enum.ActionStatus.Success,
                fixedAssetIDs.length + Resource.ToastContent.deleteMultiSuccess
              );
            })
            .catch(() => {
              this.showToast(
                Enum.ActionStatus.Error,
                Resource.ToastContent.deleteMulti.Fail
              );
            });
        }
        // Đóng dialog cảnh báo xóa
        this.isShowDialogDelete = false;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Cập nhật các điều kiện của filter
     * @param {string} field trường của dữ liệu
     * @param {string} value giá trị được cập nhật
     * @author NVThinh 22/11/2022
     */
    updateFilter: async function (field, value) {
      try {
        this.conditions[field] = value;
        this.searchAndFilter();
        // Nếu giới hạn bản ghi thay đổi không cần cập nhật "Tổng số bản ghi" trên table footer
        // if (field != Object.keys(this.conditions)[3]) {
        //   // Thực hiện updateLimit tại con để cập nhật tổng số bản ghi
        //   this.$ref.updateLimit(this.is);
        // }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Lấy thông tin các tài sản được chọn
     * @param {Array} selectedRows mảng các dòng được chọn
     * @author Nguyen Van Thinh 06/11/2022
     */
    updateRow: function (selectedRows) {
      try {
        // Cập nhật mảng các dòng được chọn
        this.selectedRows = selectedRows;
        console.log("selected rows", this.selectedRows);
        // Cập nhật trang thái disabled của các nút chức năng
        if (selectedRows.length == 0) {
          this.isDisabledButton = true;
        } else {
          this.isDisabledButton = false;
          this.json_data = [];
          // Cập nhật json_data
          for (const obj of this.selectedRows) {
            this.json_data.push(obj);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hiển thị popup với chế độ và dữ liệu được truyền vào
     * @param {Number} mode
     * @param {Object} popupObj
     * @author NVThinh 09/11/2022
     */
    showPopup: function (mode, popupObj) {
      try {
        // Cập nhật chế độ của popup
        this.mode = mode;
        // Cập nhật đối tượng được chọn
        this.popupObj = popupObj;
        // Hiển thị popup
        this.isShowPopup = true;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * xử lý sự kiện nhấn vào nút thêm mới
     * @author NVThinh 09/11/2022
     */
    handleOnclickAddButton: function () {
      try {
        // Cập nhật chế độ popup
        this.mode = Enum.Mode.Add;
        // Hiển thị popup
        this.isShowPopup = true;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Thực hiện trước khi tạo file excel
     * @author NVThinh 27/11/2022
     */
    beforeGenerate: function () {
      try {
        this.selectedRows.map((item, index) => {
          item.numerical_order = index + 1;
          return {
            item,
          };
        });
      } catch (error) {
        return console.log(error);
      }
    },

    /**
     * Hiển thị toast
     * @param {Number} actionStatus trạng thái toast
     * @param {String} content nội dung hiển thị
     * @author NVThinh 28-11-2022
     */
    showToast: function (actionStatus, content) {
      // Cập nhật đối tượng toast
      this.toastObj.actionStatus = actionStatus;
      this.toastObj.content = content;
      // Hiển thị toast
      this.isShowToast = true;
    },
  },

  data() {
    return {
      // Các thông tin yêu cầu từ toast component
      toastObj: {
        actionStatus: 0,
        content: "",
      },
      totalOfRecords: 0, // Số lượng bản ghi lọc được
      dialogInfo: "", // nội dung hiển thị dialog xác nhận xóa
      mode: 0, // Chế độ popup
      popupObj: {}, // Đối tượng popup
      numberOfDeletedRecords: 1, // sổ lượng bản ghi được chọn khi xóa
      isShowLoader: false, // trạng thái ẩn hiện của loader
      isDisabledButton: true, // Trạng thái disabled của các nút chức năng
      isShowPopup: false, // trạng thái hiển thị / ẩn popup
      isShowDialogDelete: false, // Trạng thái ẩn hiện dialog xác nhận xóa
      isShowToast: false, // Trạng thái hiển thị toast báo thành công
      toastMode: 0, // chế độ toast
      selectedRows: [], // Mảng chứa các dòng trong bảng được chọn
      fixedAssets: [], // Mảng chứa các tài sản cố định sau khi gọi API
      departments: [], // Mảng chứa các bộ phận sử dụng sau khi gọi API
      fixedAssetCategories: [], // Mảng chứa các loại tài sản sau khi gọi API
      // Đối tượng chứa các điều kiện để gọi API
      conditions: {
        keyword: "",
        department_id: Constants.GUID.EMPTY,
        fixed_asset_category_id: Constants.GUID.EMPTY,
        limit: 20,
        offset: 0,
      },
      filters: [
        {
          id: "dropdown--asset-type",
          className: "asset_type-filter",
          placeholder: "category",
          field: "fixed_asset_category",
        },
        {
          id: "dropdown--department",
          className: "department-filter",
          placeholder: "department",
          field: "department",
        },
      ],
      Resource, // resource
      Function, // Hàm dùng chung
      Enum, // enum
      json_fields: TableResource.TableHead.FixedAsset, // tên cột
      json_data: [], // Mảng chứa các json data dùng cho việc xuất dữ liệu
    };
  },
};
</script>

<style scoped>
.button--feature {
  margin-left: 11px;
}
</style>