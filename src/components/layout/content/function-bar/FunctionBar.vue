<template>
  <div class="function">
    <!-- Left function bar  -->
    <div class="function_left">
      <!-- Search  -->
      <Input></Input>
      <!-- Filter -->
      <Dropdown
        v-for="item in filters"
        :key="item.id"
        :id="item.id"
        :parentClass="item.className"
        :placeholder="resource.Placeholder[item.placeholder]"
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
import resource from "@/resource/resource";
export default {
  name: "FunctionBar",
  components: { Input, Dropdown, Button, ButtonFeature },
  props: {},
  emits: [],
  methods: {},
  data() {
    return {
      resource,
      filters: [
        {
          id: "dropdown--asset-type",
          className: "asset_type-filter",
          placeholder: "asset-type",
        },
        {
          id: "dropdown--department",
          className: "department-filter",
          placeholder: "department",
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