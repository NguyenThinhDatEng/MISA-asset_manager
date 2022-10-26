<template>
  <div :id="id ? id : ''" class="item">
    <div class="icon-item_wrapper">
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
  created() {},
  components: {},
  props: {
    id: String,
    iconName: String,
    iconContent: String,
  },
  emits: [],
  methods: {},
  data() {
    return {
      active: false,
    };
  },
};
</script>

<style scoped>
@import url(../../../css/layout/sidebar/item.css);
</style>