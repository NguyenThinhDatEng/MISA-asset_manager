<template>
  <!-- Sidebar -->
  <div :class="['sidebar', { 'sidebar--hidden': hidden }]">
    <!-- Header Sidebar  -->
    <div class="sidebar__header">
      <div class="icon icon--home" :title="Title.home"></div>
      <p class="sidebar__header--text item__content">
        {{ Resource.Logo.qlts }}
      </p>
    </div>
    <!-- Body sidebar  -->
    <div class="sidebar__body">
      <Item
        v-for="(value, key) in items"
        v-bind:key="key"
        :iconName="setIconName(key)"
        :iconContent="value"
        :title="setValue(value)"
      ></Item>
    </div>
    <!-- Footer sidebar -->
    <div class="sidebar__footer">
      <!-- Left  -->
      <div
        class="sidebar-extension icon-item_wrapper"
        hidden
        :title="Title.extension"
        @click="extendSidebar"
      >
        <div class="icon center icon--sidebar-extension"></div>
      </div>
      <!-- Right  -->
      <div
        class="sidebar-collapse icon-item_wrapper"
        :title="Title.collapse"
        @click="collapseSidebar"
      >
        <div class="icon center icon--sidebar-collapse"></div>
      </div>
    </div>
  </div>
</template>


<script>
import Item from "./ItemSidebar";
import Resource from "@/resource/resource";
import { ref } from "vue";

export default {
  name: "TheSidebar",
  components: {
    Item,
  },
  props: {},
  setup() {
    const items = ref(Resource.ItemContents);

    // expose to template and other options API hooks
    return {
      items,
    };
  },
  methods: {
    setIconName(name) {
      return "icon--" + name;
    },
    setValue(value) {
      if (value == "Tài sản HT-ĐB") {
        return "Tài sản Hệ thống - Đường bộ";
      }
      return value;
    },
    collapseSidebar() {
      this.hidden = true;
    },
    extendSidebar() {
      this.hidden = false;
    },
  },
  data() {
    return {
      Resource,
      Title: Resource.Title,
      hidden: false,
    };
  },
};
</script>
<style scoped>
@import url(../../../css/base.css);
</style>