<template>
  <div class="header">
    <!-- Left header -->
    <p class="header--left">{{ Resource.PageTitle.assetList }}</p>
    <!-- Right header -->
    <div class="header--right">
      <!-- User info -->
      <div
        class="user-options"
        v-show="isShowOptions"
        @blur="isShowOptions = false"
      >
        <div class="option">Thông tin tài khoản</div>
        <div class="option">Đăng xuất</div>
      </div>
      <!-- Title -->
      <div class="icon icon--down" :title="Title.more" @click="toggle"></div>
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
    toggle: function () {
      this.isShowOptions = !this.isShowOptions;
    },
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
      // Variables
      isShowOptions: false,
      // Resources
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

/* Header */
.header--right {
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}

/* others */
.icon {
  cursor: pointer;
}

.user-options {
  position: absolute;
  top: 110%;
  line-height: 25px;
  text-align: center;
  background: #fff;
  z-index: 1;
  border: 1px solid #afafaf;
  border-radius: 3px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
}

.option {
  padding: 0 4px;
  cursor: pointer;
}

.option:hover {
  background-color: #d1edf4;
}

.option + .option {
  border-top: 1px solid #afafaf;
}
</style>