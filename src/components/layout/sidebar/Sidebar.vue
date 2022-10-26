<template>
  <!-- Sidebar -->
  <div class="sidebar">
    <!-- Header Sidebar  -->
    <div class="sidebar__header">
      <div class="icon icon--home"></div>
      <p class="sidebar__header--text item__content">MISA QLTS</p>
    </div>
    <!-- Body sidebar  -->
    <div class="sidebar__body">
      <Item
        v-for="(item, index) in contents"
        :key="index"
        :iconName="'icon--' + index"
        :iconContent="item[index]"
      ></Item>
      <!-- general item  -->
      <Item iconName="icon--general" iconContent="Tổng quan"></Item>
      <!-- asset item  -->
      <Item iconName="icon--asset" iconContent="Tài sản"></Item>
      <!-- HTDB item  -->
      <Item iconName="icon--path" iconContent="Tài sản HT-ĐB"></Item>
      <!-- tool item  -->
      <div class="item">
        <div class="icon-item_wrapper">
          <div class="icon icon-item center icon--paint"></div>
        </div>
        <div class="item__content">
          <p>Công cụ dụng cụ</p>
          <div class="icon-item_wrapper">
            <div class="icon icon-arrow center icon--down-arrow"></div>
          </div>
        </div>
      </div>
      <!-- menu item  -->
      <div class="item">
        <div class="icon-item_wrapper">
          <div class="icon icon-item center icon--storage"></div>
        </div>
        <p class="item__content">Danh mục</p>
      </div>
      <!-- search item  -->
      <div class="item">
        <div class="icon-item_wrapper">
          <div class="icon icon-item center icon--search"></div>
        </div>
        <div class="item__content">
          <p>Tra cứu</p>
          <div class="icon-item_wrapper">
            <div class="icon icon-arrow center icon--down-arrow"></div>
          </div>
        </div>
      </div>
      <!-- report item  -->
      <div class="item">
        <div class="icon-item_wrapper">
          <div class="icon icon-item center icon--statistics"></div>
        </div>
        <div class="item__content">
          <p>Báo cáo</p>
          <div class="icon-item_wrapper">
            <div class="icon icon-arrow center icon--down-arrow"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- Footer sidebar -->
    <div class="sidebar__footer">
      <!-- Left  -->
      <div
        class="sidebar-extension icon-item_wrapper"
        hidden
        title="mở rộng sidebar"
      >
        <div class="icon center icon--sidebar-extension"></div>
      </div>
      <!-- Right  -->
      <div class="sidebar-collapse icon-item_wrapper" title="thu gọn sidebar">
        <div class="icon center icon--sidebar-collapse"></div>
      </div>
    </div>
  </div>
</template>


<script>
import Item from "./ItemSidebar.vue";

export default {
  name: "TheSidebar",
  created() {},
  components: {
    Item,
  },
  props: {
    contents: {
      general: "Tổng quan",
      asset: "Tài sản",
      path: "Tài sản HT-ĐB",
      tool: "Công cụ dụng cụ",
      category: "Danh mục",
      search: "Tra cứu",
      report: "Báo cáo",
    },
  },
  emits: [],
  methods: {},
  data() {
    return {};
  },
};
</script>
<style scoped>
@import url(../../../css/base.css);
</style>