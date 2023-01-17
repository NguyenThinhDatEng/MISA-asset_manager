<template>
  <div class="popup-wrapper" @keydown.esc="close">
    <div class="center popup">
      <!-- Popup Header -->
      <div class="popup__header">
        <span>{{ title }}</span>
        <button
          class="icon icon-18px icon--close"
          :title="Title.close"
          @click="close()"
        ></button>
      </div>
      <!-- Popup body  -->
      <div class="popup__body">
        <slot />
      </div>
      <!-- Popup footer  -->
      <div class="popup__footer">
        <ButtonMain
          :title="Title.save"
          :button-content="Resource.ButtonContent.save"
          :type="Enum.Type.Main"
          @click="$emit('on-save')"
        ></ButtonMain>
        <ButtonMain
          :title="Title.cancel"
          :button-content="Resource.ButtonContent.cancel"
          :type="Enum.Type.Secondary"
          @click="close()"
          @keydown.tab="$emit('on-tab')"
        ></ButtonMain>
      </div>
    </div>
  </div>
</template>
    
    <script>
// Resources
import Resource from "@/js/resource/resource";
import Enum from "@/js/enum/enum";
//Components
import ButtonMain from "@/components/base/buttons/ButtonMain.vue";

export default {
  name: "AssetDetail",
  components: {
    ButtonMain,
  },
  props: {
    // Tiêu đề của popup
    title: {
      type: String,
      required: true,
    },
    // Chế độ của popup
    mode: {
      type: Number,
      default: 0,
    },
    // Đối tượng popup
    popupObj: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },

  emits: ["close-popup", "on-save", "on-tab"],

  methods: {
    onCtrl: function (e) {
      console.log(e);
    },
    /**
     * @description Đóng popup
     * @author NVThinh 5/1/2023
     */
    close: function () {
      this.$emit("close-popup");
    },

    /**
     * Thực hiện hàm updateFilter của component cha
     * @param {string} field trường của dữ liệu
     * @param {string} value giá trị được cập nhật
     * @author NVThinh 7/1/2023
     */
    updateFilter: function (field, value) {
      try {
        this.$parent.updateFilter(field, value);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Lấy thông tin các tài sản được chọn
     * @param {Array} selectedRows mảng các dòng được chọn
     * @author Nguyen Van Thinh 7/1/2023
     */
    updateRow: function (selectedRows) {
      try {
        // Truyền mảng các dòng được chọn lên component cha
        this.$parent.updateRow(selectedRows);
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      // Resources
      Resource,
      Enum,
      Title: Resource.Title,
    };
  },
};
</script>
    
    <style scoped>
@import url(@/css/components/popup.css);
</style>