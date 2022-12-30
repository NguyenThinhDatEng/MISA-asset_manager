<template>
  <router-link :to="getRouter(item.router)">
    <div
      :id="id"
      :class="{ item: true, 'item--active': active }"
      :title="title ? title : ''"
    >
      <!-- left -->
      <div class="icon-item_wrapper">
        <div :class="['icon icon-item center', iconName]"></div>
      </div>
      <!-- right -->
      <div class="item__content">
        <p>{{ item.content }}</p>
        <div
          class="icon-item_wrapper"
          v-if="isShow(item.content)"
          @click="toggle"
        >
          <div class="icon icon-arrow center icon--down-arrow"></div>
        </div>
      </div>
    </div>
    <!-- list sub item -->
    <ul class="sub-item" v-show="isShowSubList">
      <router-link :to="getRouter('ghi-tang')">
        <li v-for="item in subList" :key="item.content">{{ item.content }}</li>
      </router-link>
    </ul>
  </router-link>
</template>

<script>
import Resource from "@/js/resource/resource";

export default {
  name: "ItemSidebar",
  props: {
    id: String, // id danh mục
    iconName: String, // tên icon
    // nội dung icon
    item: {
      type: Object,
      default: function () {
        return {
          content: Resource.ItemContents.asset.content,
          router: Resource.ItemContents.asset.router,
        };
      },
    },
    title: String, // Tiêu đề danh mục
    // highlight danh mục
    active: {
      type: Boolean,
      default: false,
    },
  },

  created() {
    // Cập nhật danh sách danh mục con
    this.subList = this.Items[this.id].sub_list;
  },

  methods: {
    /**
     * Bỏ icon mũi tên đi xuống của những item không có
     * @param {String} itemContent tên mục
     * @return {Boolean}
     * @author Nguyen Van Thinh 19/12/2022
     */
    isShow(itemContent) {
      try {
        if (
          itemContent == this.Items.general.content ||
          itemContent == this.Items.category.content
        )
          return false;
        return true;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Lấy router của trang
     * @return {String} đường dẫn
     * @author Nguyen Van Thinh 19/12/2022
     */
    getRouter: (router) => "/" + router,

    /**
     * @description Hiển thị danh sách danh mục con
     * @author NVThinh 30/12/2022
     */
    toggle: function () {
      this.isShowSubList = !this.isShowSubList;
    },
  },
  // data
  data() {
    return {
      hasArrowIcon: true, // true nếu danh mục có icon mũi tên
      Items: Resource.ItemContents, // Các danh mục của sidebar
      subList: null, // Các mục bên trong item tài sản
      isShowSubList: false, // Trạng thái hiển thị danh sách danh mục con
    };
  },
};
</script>

<style scoped>
.item {
  display: flex;
  align-items: center;
  opacity: 0.2;
  border-radius: 6px;
  width: 100%;
  height: 40px;
  overflow: hidden;
  color: #fff;
}

.item:hover,
.item:active {
  background-color: var(--menu-item);
  opacity: 1;
  cursor: pointer;
}

.item--active {
  background-color: var(--menu-item);
  opacity: 1;
}

.item p {
  flex: 1;
}

.item__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  color: white;
  background-color: #33455b;
}

.sub-item li {
  height: 40px;
  line-height: 40px;
  padding: 0 0 0 44px;
  opacity: 0.2;
}

.sub-item li:hover {
  background-color: #48586c;
  opacity: 1;
}

@media only screen and (max-width: 1500px) {
  .item__content {
    display: none;
  }

  .icon-item_wrapper .icon_sidebar-collapse {
    display: none;
  }
}
</style>