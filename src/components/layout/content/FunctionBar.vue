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
      ></Dropdown>
      <Dropdown
        :id="filters[1].id"
        :parentClass="filters[1].className"
        :placeholder="resource.Placeholder[filters[1].placeholder]"
        :field="filters[1].field"
        :data="this.departments"
      ></Dropdown>
    </div>
    <!-- Right function bar  -->
    <div class="function__right">
      <!-- Button: add a new asset  -->
      <Button
        :buttonType="'button--add'"
        :buttonName="'asset-add'"
        :iconName="'icon--add'"
      ></Button>
      <Popup></Popup>
      <!-- Button: export a excel file  -->
      <ButtonFeature
        v-for="item in features"
        :key="item.buttonType"
        :buttonType="item.buttonType"
        :iconName="item.iconName"
        :title="item.title"
      ></ButtonFeature>
    </div>
  </div>
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
  mounted() {
    try {
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

      fetch(resource.URLs["asset-type"], {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
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
  props: {},
  emits: [],
  methods: {},
  data() {
    return {
      resource,
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
</style>