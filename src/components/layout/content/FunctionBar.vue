<template>
  <div class="function">
    <!-- Left function bar  -->
    <div class="function_left">
      <!-- Search  -->
      <Input></Input>
      <!-- Filter -->
      <Dropdown
        :id="filters[0].id"
        :parentClass="filters[0].className"
        :placeholder="resource.Placeholder[filters[0].placeholder]"
        :field="filters[0].field"
        :data="this.categories"
        :title="resource.Title['asset-category-filter']"
      ></Dropdown>
      <Dropdown
        :id="filters[1].id"
        :parentClass="filters[1].className"
        :placeholder="resource.Placeholder[filters[1].placeholder]"
        :field="filters[1].field"
        :data="this.departments"
        :title="resource.Title['department-filter']"
      ></Dropdown>
    </div>
    <!-- Right function bar  -->
    <div class="function__right">
      <!-- Button: add a new asset  -->
      <Button
        :buttonType="'button--add'"
        :buttonName="'asset-add'"
        :iconName="'icon--add'"
        :title="resource.Title.add"
        @click="showPopup = true"
      ></Button>
      <!-- Button: export excel and delete -->
      <ButtonFeature
        v-for="item in features"
        :key="item.buttonType"
        :buttonType="item.buttonType"
        :iconName="item.iconName"
        :title="item.title"
        :isDisable="disableButton"
      ></ButtonFeature>
    </div>
  </div>
  <Popup
    v-if="showPopup"
    :theTitle="resource.PopupTitle.add"
    @close-popup="showPopup = false"
  ></Popup>
</template>

<script>
import Input from "@/components/inputs/SearchInput.vue";
import Dropdown from "@/components/dropdowns/DropdownCheckbox.vue";
import Button from "@/components/buttons/ButtonIcon.vue";
import ButtonFeature from "@/components/buttons/ButtonFeature.vue";
import Popup from "@/components/popups/PopupAsset.vue";
import resource from "@/resource/resource";

export default {
  name: "FunctionBar",
  /**
   * Call API
   * @author Nguyen Van Thinh 04/11/2022
   */
  mounted() {
    try {
      // Lay tat ca bo phan su dung
      fetch(resource.URLs.department, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.departments = data;
        })
        .catch((error) => {
          console.log("Call get all departments API", error);
        });

      // Lay tat ca loai tai san
      fetch(resource.URLs["asset-type"], {
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
  components: { Input, Dropdown, Button, ButtonFeature, Popup },
  props: { selectedRows: Array },
  computed: {
    disableButton: function () {
      if (this.selectedRows.length > 0) return false;
      return true;
    },
  },
  emits: [],
  methods: {},
  data() {
    return {
      resource,
      showPopup: false,
      showLoader: false,
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
      features: [
        {
          buttonType: "button--export",
          title: resource.Title.export,
          iconName: "icon--export",
        },
        {
          buttonType: "button--delete",
          title: resource.Title.delete,
          iconName: "icon--delete",
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