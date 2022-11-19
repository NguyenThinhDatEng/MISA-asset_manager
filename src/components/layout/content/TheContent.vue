<template>
  <div class="content">
    <!-- Loader  -->
    <Loader :isShow="isShowLoader"></Loader>
    <!-- Function bar  -->
    <div class="function">
      <!-- Left function bar  -->
      <div class="function_left">
        <!-- Search  -->
        <Input></Input>
        <!-- Fixed asset categories filter -->
        <Dropdown
          :id="filters[0].id"
          :parentClass="filters[0].className"
          :placeholder="Resource.Placeholder[filters[0].placeholder]"
          :field="filters[0].field"
          :data="this.categories"
          :title="Resource.Title['asset-category-filter']"
        ></Dropdown>
        <!-- Department filter -->
        <Dropdown
          :id="filters[1].id"
          :parentClass="filters[1].className"
          :placeholder="Resource.Placeholder[filters[1].placeholder]"
          :field="filters[1].field"
          :data="this.departments"
          :title="Resource.Title['department-filter']"
        ></Dropdown>
      </div>
      <!-- Right function bar  -->
      <div class="function__right">
        <!-- Button: add a new asset  -->
        <Button
          :buttonType="'button--add'"
          :buttonName="'asset-add'"
          :iconName="'icon--add'"
          :title="Resource.Title.add"
          @click="showPopup = true"
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
    <TheTable :fixed-assets="fixedAssets" @update-rows="updateRows"></TheTable>
  </div>
  <!-- Popup -->
  <Popup
    v-if="showPopup"
    :mode="Enum.Mode.Add"
    @close-popup="showPopup = false"
    @show-toast="isShowToast = true"
    @reload-content="reload = !reload"
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
    :number-of-deleted-records="numberOfDeletedRecords"
  ></ToastVue>
</template>

<script>
import TheTable from "@/components/base/table/Table.vue";
import Input from "@/components/base/inputs/SearchInput.vue";
import Dropdown from "@/components/base/dropdowns/DropdownCheckbox.vue";
import Button from "@/components/base/buttons/ButtonIcon.vue";
import ButtonFeature from "@/components/base/buttons/ButtonFeature.vue";
import Popup from "@/components/base/popups/PopupAsset.vue";
import DialogDeleteVue from "@/components/base/dialogs/DialogDelete.vue";
import Loader from "@/components/base/more/Loader.vue";
import Resource from "@/js/resource/resource";
import Enum from "@/js/enum/enum";
import Function from "@/js/common/function";
import ToastVue from "@/components/base/toast/ToastVue.vue";
import { getAllFixedAssets, deleteFixedAsset } from "@/apis/fixed_asset";
import { getAllDepartments } from "@/apis/department";
import { getAllFixedAssetCategories } from "@/apis/fixed_asset_category";
import axios from "axios";

export default {
  name: "TheContent",
  components: {
    Input,
    TheTable,
    Dropdown,
    Button,
    ButtonFeature,
    Popup,
    DialogDeleteVue,
    ToastVue,
    Loader,
  },

  /**
   * Gọi API lấy tất cả bản ghi cho bộ phận phòng ban và loại tài sản
   * @author Nguyen Van Thinh 04/11/2022
   */
  created() {
    // Gọi API lấy thông tin tất cả tài sản cố định
    this.isShowLoader = true;
    getAllFixedAssets().then((res) => {
      this.fixedAssets = res.data;
      this.isShowLoader = false;
    });

    // Gọi API lấy tất cả bộ phận sử dụng
    getAllDepartments().then((res) => {
      this.departments = res.data;
    });

    // Gọi API lấy tất cả bộ phận sử dụng
    getAllFixedAssetCategories().then((res) => {
      this.categories = res.data;
    });
  },

  watch: {
    // Thiết lập thời gian hiển thị cho toast
    isShowToast: function () {
      setTimeout(() => {
        this.isShowToast = false;
      }, 1500);
    },
  },

  methods: {
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
    deleteRecords: function () {
      try {
        // Thực hiện xóa
        if (this.mode == Enum.Mode.Delete)
          deleteFixedAsset(this.selectedRows[0].fixed_asset_id).then((res) => {
            console.log(res.data);
          });
        else {
          let listID = {};
          let fixedAssetIDs = [];
          for (const obj of this.selectedRows) {
            fixedAssetIDs.push(obj.fixed_asset_id);
          }
          listID["fixedAssetIDs"] = fixedAssetIDs;
          this.numberOfDeletedRecords = fixedAssetIDs.length;
          this.deleteMultipleAssets(listID);
        }
        // Đóng dialog
        this.showDialogDelete = false;
        // Hiển thị toast
        this.isShowToast = true;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * API xóa 1 tài sản
     * @param {string} fixedAssetID id của bản ghi cần xóa
     * @author Nguyen Van Thinh 12/11/2022
     */
    deleteAsset: async function (fixedAssetID) {
      try {
        const res = await axios.delete(
          "http://localhost:11799/api/v1/FixedAssets/" + fixedAssetID
        );
        console.log("Result of Delete an asset", res);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * API xóa nhiều bản ghi tài sản
     * @param {Array} listID mảng các ID của tài sản muốn xóa
     * @author 14/11/2022
     */
    deleteMultipleAssets: async function (listID) {
      try {
        await axios.post(
          "http://localhost:11799/api/v1/FixedAssets/DeleteBatch",
          listID
        );
        console.log("Call API Delete multiple assets");
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      info: "",
      mode: 0,
      numberOfDeletedRecords: 1,
      isShowLoader: false, // trạng thái ẩn hiện của loader
      isDisabledButton: true,
      showPopup: false,
      showDialogDelete: false,
      isShowToast: false,
      reload: false,
      selectedRows: [],
      fixedAssets: [],
      departments: [],
      categories: [],
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