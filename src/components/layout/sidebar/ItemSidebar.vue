<template>
  <div :id="id ? id : ''" :class="['item', active ? 'item--active' : '']">
    <div class="icon-item_wrapper" :title="title ? title : ''">
      <div :class="['icon icon-item center', iconName]"></div>
    </div>
    <div class="item__content">
      <p>{{ iconContent }}</p>
      <div class="icon-item_wrapper">
        <div class="icon icon-arrow center icon--down-arrow"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemSidebar",
  components: {},
  props: {
    id: String,
    iconName: String,
    iconContent: String,
    title: String,
    active: Boolean,
  },
  emits: [],
  methods: {},
  data() {
    return {
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