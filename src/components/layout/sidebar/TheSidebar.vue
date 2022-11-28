<template>
  <!-- Sidebar -->
  <div :class="['sidebar', { 'sidebar--hidden': hidden }]">
    <!-- Header Sidebar  -->
    <div class="sidebar__header">
      <div class="icon icon--home" :title="Title.home"></div>
      <p class="sidebar__header--text item__content">
        {{ Resource.QLTS.logo }}
      </p>
    </div>
    <!-- Body sidebar -->
    <div class="sidebar__body">
      <Item
        v-for="item in items"
        v-bind:key="item.id"
        :iconName="setIconName(item.id)"
        :itemContent="item.content"
        :title="setTitle(item.id, item.content)"
        :active="item.active"
        @click="handleOnClickItem(item.id)"
      ></Item>
    </div>
    <!-- Footer sidebar -->
    <div class="sidebar__footer">
      <!-- Left  -->
      <div
        class="sidebar-extension icon-item_wrapper"
        hidden
        :title="Title.extension"
        @click="hidden = !hidden"
      >
        <div class="icon center icon--sidebar-extension"></div>
      </div>
      <!-- Right  -->
      <div
        class="sidebar-collapse icon-item_wrapper"
        :title="Title.collapse"
        @click="hidden = !hidden"
      >
        <div class="icon center icon--sidebar-collapse"></div>
      </div>
    </div>
  </div>
</template>


<script>
import Item from "./ItemSidebar.vue";
import Resource from "@/js/resource/resource";

export default {
  name: "TheSidebar",
  components: {
    Item,
  },
  created() {
    try {
      let isActive;
      // Thêm thuộc tính isActive cho từng đối tượng item
      for (const key in this.itemContents) {
        isActive = false;
        // Active: true tại mục tài sản
        if (key == "asset") isActive = true;
        this.items.push({
          id: key,
          active: isActive,
          content: this.itemContents[key],
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    // Trả về tên icon class
    setIconName(name) {
      try {
        return "icon--" + name;
      } catch (error) {
        console.log(error);
      }
    },
    // Trả về title cho icon
    setTitle(id, content) {
      try {
        if (id == "path") {
          return Resource.Abbreviations.path;
        }
        return content;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * inActive của những item còn lại khi 1 item menu được nhấn
     * @param {string} id định danh của item được nhấn
     */
    handleOnClickItem(id) {
      try {
        id == "asset" ? this.isShowLoader == true : this.isShowLoader == false;
        // Must use 'of' for obj
        for (const item of this.items) {
          if (item.id == id) item.active = true;
          else item.active = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      itemContents: Resource.ItemContents, // Nội dung danh mục
      Title: Resource.Title, // Tiêu đề danh mục
      hidden: false, // ẩn 1 phần item -> thu gọn sidebar
      items: [], // mảng các thuộc tính của từng danh mục
      Resource,
    };
  },
};
</script>

<style scoped>
@import url(@/css/layout/sidebar.css);
</style>