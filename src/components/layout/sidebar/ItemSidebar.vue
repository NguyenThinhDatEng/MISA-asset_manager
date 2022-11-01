<template>
  <div
    :id="id ? id : ''"
    :class="['item', { 'item--active': active }]"
    @click="changeActive"
  >
    <div class="icon-item_wrapper" :title="title ? title : ''">
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
  components: {},
  props: {
    id: String,
    iconName: String,
    itemContent: String,
    title: String,
  },
  watch: {
    active: {
      showActive() {
        console.log(this.active);
      },
    },
  },
  emits: [],
  methods: {
    changeActive() {
      this.active = !this.active;
      this.$emit("activeState", this.active);
    },
    isShow(itemContent) {
      if (
        itemContent == this.content.general ||
        itemContent == this.content.category
      )
        return false;
      return true;
    },
  },
  data() {
    return {
      content: resource.ItemContents,
      active: false,
      hasArrowIcon: true,
      // itemClass: {
      //   item: true,
      //   "item--active": this.active,
      // },
    };
  },
};
</script>

<style scoped>
@import url(@/css/layout/sidebar.css);
</style>