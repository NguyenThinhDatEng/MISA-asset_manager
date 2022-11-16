<template>
  <div class="content">
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
    <TheTable @update-rows="updateRows" :isReload="reload"></TheTable>
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
import Loader from "@/components/base/more/Loader.vue";
import Input from "@/components/base/inputs/SearchInput.vue";
import Dropdown from "@/components/base/dropdowns/DropdownCheckbox.vue";
import Button from "@/components/base/buttons/ButtonIcon.vue";
import ButtonFeature from "@/components/base/buttons/ButtonFeature.vue";
import Popup from "@/components/base/popups/PopupAsset.vue";
import DialogDeleteVue from "@/components/base/dialogs/DialogDelete.vue";
import Resource from "@/js/resource/resource";
import Enum from "@/js/enum/enum";
import Function from "@/js/common/function";
import ToastVue from "@/components/base/toast/ToastVue.vue";
import axios from "axios";

export default {
  name: "TheContent",
  components: {
    Input,
    TheTable,
    Loader,
    Dropdown,
    Button,
    ButtonFeature,
    Popup,
    DialogDeleteVue,
    ToastVue,
  },
  watch: {
    // Thiết lập thời gian hiển thị cho toast
    isShowToast: function () {
      setTimeout(() => {
        this.isShowToast = false;
      }, 1500);
    },
  },

  /**
   * Gọi API lấy tất cả bản ghi
   * @author Nguyen Van Thinh 04/11/2022
   */
  mounted() {
    try {
      console.log(process.env.VUE_APP_BASE_URL);
      this.isShowLoader = true;
      // Lay tat ca bo phan su dung
      fetch(Resource.URLs.department, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.isShowLoader = false;
          this.departments = data;
        })
        .catch((error) => {
          console.log("Call get all departments API", error);
        });

      // Lay tat ca loai tai san
      fetch(Resource.URLs["asset-type"], {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // Gan data thu duoc vao du lieu cua component
          this.categories = data;
        })
        .catch((error) => {
          console.log("Call get all asset categories API", error);
        });
    } catch (error) {
      console.log(error);
    }
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
        // Thực hiện
        if (this.mode == Enum.Mode.Delete)
          this.deleteAsset(this.selectedRows[0].fixed_asset_id);
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
        // Tải lại trang
        this.reload = !this.reload;
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
      isShowLoader: false,
      isDisabledButton: true,
      showPopup: false,
      showLoader: false,
      showDialogDelete: false,
      isShowToast: false,
      reload: false,
      selectedRows: [],
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