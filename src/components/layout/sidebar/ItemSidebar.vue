<template>
  <div
    :id="id ? id : ''"
    :class="{ item: true, 'item--active': active }"
    :title="title ? title : ''"
  >
    <!-- left -->
    <div class="icon-item_wrapper">
      <div :class="['icon icon-item center', iconName]"></div>
    </div>
    <!-- right -->
    <div class="item__content">
      <p>{{ itemContent }}</p>
      <div class="icon-item_wrapper" v-if="isShow(itemContent)">
        <div class="icon icon-arrow center icon--down-arrow"></div>
      </div>
    </div>
  </div>
</template>

<script>
import resource from "@/js/resource/resource";

export default {
  name: "ItemSidebar",
  props: {
    id: String, // id danh mục
    iconName: String, // tên icon
    itemContent: String, // nội dung icon
    title: String, // Tiêu đề danh mục
    // highlight danh mục
    active: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    /**
     * Bỏ icon mũi tên đi xuống của những item không có
     * @param {String} itemContent tên mục
     * @return {Boolean}
     */
    isShow(itemContent) {
      try {
        if (
          itemContent == this.content.general ||
          itemContent == this.content.category
        )
          return false;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
  // data
  data() {
    return {
      hasArrowIcon: true, // true nếu danh mục có icon mũi tên
      content: resource.ItemContents, // nội dung danh mục
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

@media only screen and (max-width: 1500px) {
  .item__content {
    display: none;
  }

  .icon-item_wrapper .icon_sidebar-collapse {
    display: none;
  }
}
</style>