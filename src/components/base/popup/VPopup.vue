<template>
  <div v-if="isShow" class="popup-wrapper" @keydown.esc="close">
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
        ></ButtonMain>
        <ButtonMain
          :title="Title.cancel"
          :button-content="Resource.ButtonContent.cancel"
          :type="Enum.Type.Secondary"
          @click="close()"
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
    // Ẩn/hiện popup
    isShow: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    ButtonMain,
  },

  emits: ["close-popup"],

  created() {},

  mounted() {},

  methods: {
    /**
     * @description Đóng popup
     * @author NVThinh 5/1/2023
     */
    close: function () {
      this.$emit("close-popup");
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