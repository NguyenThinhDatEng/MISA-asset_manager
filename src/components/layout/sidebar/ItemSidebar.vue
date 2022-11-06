<template>
  <div
    :id="id ? id : ''"
    :class="{ item: true, 'item--active': active }"
    :title="title ? title : ''"
  >
    <div class="icon-item_wrapper">
      <div :class="['icon icon-item center', iconName]"></div>
    </div>
    <div class="item__content">
      <p>{{ itemContent }}</p>
      <div class="icon-item_wrapper" v-if="isShow(itemContent)">
        <div class="icon icon-arrow center icon--down-arrow"></div>
      </div>
    </div>
  </div>
</template>

<script>
import resource from "@/resource/resource";

export default {
  name: "ItemSidebar",
  props: {
    id: String,
    iconName: String,
    itemContent: String,
    title: String,
    active: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    /**
     * Bỏ icon mũi tên đi xuống của những item không cần thiết
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
  data() {
    return {
      content: resource.ItemContents,
      hasArrowIcon: true,
    };
  },
};
</script>

<style scoped>
@import url(@/css/layout/sidebar.css);
</style>