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
        <!-- Export button -->
        <ButtonFeature
          :buttonName="'button--' + Resource.Name.export"
          :iconName="'icon--' + Resource.Name.export"
          :title="Resource.Title.export"
          :isDisable="isDisabledButton"
        ></ButtonFeature>
        <!-- Delete button  -->
        <ButtonFeature
          :buttonName="'button--' + Resource.Name.delete"
          :iconName="'icon--' + Resource.Name.delete"
          :title="Resource.Title.delete"
          :isDisable="isDisabledButton"
          @click="HandleOnClickDeleteButton"
        ></ButtonFeature>
      </div>
    </div>
    <!-- Table  -->
    <TheTable
      :fixed-assets="fixedAssets"
      @update-rows="updateRows"
      @show-popup="showPopup"
      ref="theTable"
    ></TheTable>
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
  <!-- Dialog delete warning -->
  <DialogDeleteVue
    v-if="showDialogDelete"
    :info="info"
    :mode="mode"
    @close-dialog="showDialogDelete = false"
    @delete-records="deleteRecords"
  ></DialogDeleteVue>
  <!-- Toast -->
  <ToastVue
    v-if="isShowToast"
    :mode="mode"
    :is-error="isErrorToast"
    :number-of-deleted-records="numberOfDeletedRecords"
  ></ToastVue>
</template>

<script>
import DropdownTick from "@/components/base/dropdowns/DropdownTick.vue";
import TheTable from "@/components/base/table/Table.vue";
import Input from "@/components/base/inputs/SearchInput.vue";
import Button from "@/components/base/buttons/ButtonIcon.vue";
import ButtonFeature from "@/components/base/buttons/ButtonFeature.vue";
import Popup from "@/components/base/popups/PopupAsset.vue";
import DialogDeleteVue from "@/components/base/dialogs/DialogDelete.vue";
import Loader from "@/components/base/more/Loader.vue";
import Resource from "@/js/resource/resource";
import Enum from "@/js/enum/enum";
import Function from "@/js/common/function";
import CONSTANT from "@/js/common/constants";
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
        this.showErrorToast();
      });

    // Gọi API lấy tất cả bộ phận sử dụng
    getAllFixedAssetCategories()
      .then((res) => {
        this.fixedAssetCategories = res.data;
      })
      .catch(() => {
        this.showErrorToast();
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
        // if (field != Object.keys(this.conditions)[3])
        // {
        //       // Thực hiện updateLimit tại con để cập nhật tổng số bản ghi
        //   this.$ref.updateLimit(this.is)
        // }
      } catch (error) {
        console.log(error);
      }
    },

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
          this.showErrorToast();
        });
    },

    /**
     * Tải lại trang
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

    /**
     * Lấy thông tin các tài sản được chọn
     * @param {Array} selectedRows mảng các dòng được chọn
     * @author Nguyen Van Thinh 06/11/2022
     */
    updateRows: function (selectedRows) {
      try {
        // Cập nhật trạng thái disabled của các nút tính năng
        if (selectedRows.length == 0) this.isDisabledButton = true;
        else this.isDisabledButton = false;
        // Cập nhật mảng các dòng được chọn
        this.selectedRows = selectedRows;
      } catch (error) {
        console.log(error);
      }
    },

    // Sự kiện click vào nút xóa
    HandleOnClickDeleteButton: function () {
      try {
        if (this.isDisabledButton == false) {
          if (this.selectedRows.length == 1) {
            this.mode = Enum.Mode.Delete;
            // Cập nhật nội dung hiển thị của dialog
            this.info =
              this.selectedRows[0].fixed_asset_code +
              " - " +
              this.selectedRows[0].fixed_asset_name;
          } else {
            this.mode = Enum.Mode.DeleteMulti;
            this.info = Function.formatNumber(this.selectedRows.length);
          }

          this.showDialogDelete = true;
        }
      } catch (error) {
        console.log(error);
      }
    },

    // Xóa bản ghi
    deleteRecords: async function () {
      try {
        // Thực hiện xóa 1 bản ghi
        if (this.mode == Enum.Mode.Delete) {
          await deleteFixedAsset(this.selectedRows[0].fixed_asset_id)
            .then(() => {
              this.reloadContent();
            })
            .catch(() => {
              this.showErrorToast();
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
            })
            .catch(() => {
              this.showErrorToast();
            });
        }
        // Đóng dialog
        this.showDialogDelete = false;
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

    // Hiển thị toast thông báo lỗi
    showErrorToast: function () {
      // Đóng popup
      this.isShowPopup = false;
      // Cập nhật trạng thái của toast
      this.isErrorToast = true;
      // Hiển thị toast
      this.isShowToast = true;
    },
  },
  data() {
    return {
      totalOfRecords: 0, // Số lượng bản ghi lọc được
      info: "",
      mode: 0,
      popupObj: {},
      numberOfDeletedRecords: 1,
      isShowLoader: false, // trạng thái ẩn hiện của loader
      isDisabledButton: true,
      isShowPopup: false,
      showDialogDelete: false,
      isShowToast: false,
      isErrorToast: false, // trạng thái toast lỗi
      reload: false,
      selectedRows: [], // Mảng chứa các dòng trong bảng được chọn
      fixedAssets: [], // Mảng chứa các tài sản cố định sau khi gọi API
      departments: [], // Mảng chứa các bộ phận sử dụng sau khi gọi API
      fixedAssetCategories: [], // Mảng chứa các loại tài sản sau khi gọi API
      // Đối tượng chứa các điều kiện để gọi API
      conditions: {
        keyword: "",
        department_id: CONSTANT.GUID.EMPTY,
        fixed_asset_category_id: CONSTANT.GUID.EMPTY,
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
      Resource,
      Function,
      Enum,
    };
  },
};
</script>

<style scoped>
Button + ButtonFeature {
  margin-left: 11px;
}
</style>