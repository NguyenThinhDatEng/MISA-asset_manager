<template>
  <div class="content">
    <Loader :isShow="isShowLoader"></Loader>
    <!-- Function bar  -->
    <div class="function">
      <!-- Left function bar  -->
      <div class="function_left">
        <!-- Search  -->
        <Input></Input>
        <!-- Filter -->
        <Dropdown
          :id="filters[0].id"
          :parentClass="filters[0].className"
          :placeholder="Resource.Placeholder[filters[0].placeholder]"
          :field="filters[0].field"
          :data="this.categories"
          :title="Resource.Title['asset-category-filter']"
        ></Dropdown>
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
        <!-- Button: export excel and delete -->
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
  <Popup
    v-if="showPopup"
    :mode="Enum.Mode.Add"
    @close-popup="showPopup = false"
    @show-toast="isShowToast = true"
    @reload-content="reload = !reload"
  ></Popup>
  <DialogDeleteVue
    v-if="showDialogDelete"
    :info="info"
    :mode="this.mode"
    @close-dialog="showDialogDelete = false"
  ></DialogDeleteVue>
  <ToastVue v-show="isShowToast" :mode="Enum.Mode.Add" ></ToastVue>
</template>

<script>
import TheTable from "@/components/table/Table.vue";
import Loader from "@/components/more/Loader.vue";
import Input from "@/components/inputs/SearchInput.vue";
import Dropdown from "@/components/dropdowns/DropdownCheckbox.vue";
import Button from "@/components/buttons/ButtonIcon.vue";
import ButtonFeature from "@/components/buttons/ButtonFeature.vue";
import Popup from "@/components/popups/PopupAsset.vue";
import DialogDeleteVue from "@/components/dialogs/DialogDelete.vue";
import Resource from "@/js/resource/resource";
import Enum from "@/js/enum/enum";
import Function from "@/js/common/function";
import ToastVue from "@/components/toast/ToastVue.vue";

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
    isShowToast: function () {
      setTimeout(() => {
        this.isShowToast = false;
      }, 1500);
    },
  },
  /**
   * Call API
   * @author Nguyen Van Thinh 04/11/2022
   */
  mounted() {
    try {
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
      // Cập nhật trạng thái disabled của các nút tính năng
      if (selectedRows.length == 0) this.isDisabledButton = true;
      else this.isDisabledButton = false;
      // Cập nhật mảng các dòng được chọn
      this.selectedRows = selectedRows;
    },

    // Sự kiện click vào nút xóa
    HandleOnClickDeleteButton: function () {
      try {
        if (this.isDisabledButton == false) {
          if (this.selectedRows.length == 1) {
            this.mode = Enum.Mode.Delete;
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
  },
  data() {
    return {
      Resource,
      Function,
      Enum,
      isShowLoader: false,
      info: "",
      mode: 0,
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
    };
  },
};
</script>

<style scoped>
@import url(@/css/base.css);
Button + ButtonFeature {
  margin-left: 11px;
}
</style>