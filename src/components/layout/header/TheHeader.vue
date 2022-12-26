<template>
  <div class="header">
    <!-- Left header -->
    <p class="header--left">{{ Resource.PageTitle.assetList }}</p>
    <!-- Right header -->
    <div class="header--right">
      <!-- Title -->
      <div class="icon icon--down" :title="Title.more"></div>
      <!-- Icons -->
      <Icon
        v-for="(value, key) in Resource.HeaderTitle"
        :key="key"
        :iconName="setIconName(key)"
        :title="value"
      ></Icon>
      <!-- Year input -->
      <div class="header_year">
        <p>{{ Title.year }}</p>
        <input type="text" class="input year" v-model.number="year" />
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
import Icon from "./IconHeader.vue";
import Resource from "@/js/resource/resource";
import Function from "@/js/common/function";

export default {
  name: "TheHeader",
  components: {
    Icon,
  },
  methods: {
    // Thiết lập tên icon
    setIconName(key) {
      try {
        return "icon--" + key;
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      Title: Resource.Title, // Tiêu đề
      year: Function.getCurrentYear(), // năm hiện tại
      Resource, // tài nguyên
    };
  },
};
</script>
<style scoped>
@import url(@/css/base.css);
@import url(@/css/layout/header.css);
@import url(@/css/components/input.css);
</style>