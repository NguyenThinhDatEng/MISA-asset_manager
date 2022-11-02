<template>
  <div class="header">
    <!-- Left header -->
    <p class="header--left">{{ Resource.PageTitle.assetList }}</p>
    <!-- Right header -->
    <div class="header--right">
      <div class="icon icon--down" :title="Title.more"></div>
      <Icon
        v-for="(value, key) in Resource.HeaderTitle"
        :key="key"
        :iconName="setIconName(key)"
        :title="value"
      ></Icon>
      <div class="header_year">
        <p>{{ Title.year }}</p>
        <input class="input year" v-model.number="year" />
        <div class="icon--up_down">
          <div
            id="year-up"
            class="icon icon--up"
            @click="year++"
            :title="Title.increase"
          ></div>
          <div
            id="year-down"
            class="icon icon--down"
            @click="year--"
            :title="Title.decrease"
          ></div>
        </div>
      </div>
      <p>{{ Title["financial-department"] }}</p>
    </div>
  </div>
</template>

<script>
import Resource from "@/resource/resource";
import Icon from "@/components/layout/header/IconHeader.vue";

export default {
  name: "TheHeader",
  components: {
    Icon,
  },
  props: {},
  emits: [],
  methods: {
    setIconName(key) {
      return "icon--" + key;
    },
    /**
     * Lấy năm hiện tại
     * author: Nguyen Van Thinh 02/11/2022
     */
    getYear() {
      return new Date().getFullYear();
    },
  },
  data() {
    return {
      Resource,
      Title: Resource.Title,
      year: this.getYear(),
    };
  },
};
</script>
<style scoped>
@import url(@/css/base.css);
</style>