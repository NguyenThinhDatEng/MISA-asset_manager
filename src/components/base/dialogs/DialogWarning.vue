<template>
  <div class="dialog__wrapper">
    <div class="dialog">
      <!-- Body -->
      <div id="dialog--no-header" class="dialog__body">
        <!-- Icon wrapper -->
        <div class="icon-item_wrapper">
          <!-- Icon -->
          <div class="icon icon--warning center dialog__body__icon" />
        </div>
        <!-- Content -->
        <p class="dialog__body__text" v-html="content" />
      </div>
      <!-- Footer -->
      <div class="dialog__footer">
        <!-- Main Button -->
        <ButtonMainVue
          :button-content="!hasSubButton ? mainButtonContent : action.save.VN"
          :title="Resource.Title.cancel"
          :type="Enum.Type.Main"
          @click="this.$emit('confirm', mode)"
        ></ButtonMainVue>
        <!-- Sub Button -->
        <SubButton
          v-show="hasSubButton"
          :title="Resource.Title.noSave"
          @click="this.$emit('close-popup')"
        ></SubButton>
        <!-- Outline Button -->
        <ButtonOutlineVue
          v-show="hasOutlineButton || hasSubButton"
          :button-content="
            hasSubButton ? buttonContent.remove : buttonContent.no
          "
          :title="Resource.Title.cancel"
          @click="this.$emit('close-dialog')"
        ></ButtonOutlineVue>
      </div>
    </div>
  </div>
</template>

<script>
// Resources
import Enum from "@/js/enum/enum";
import Resource from "@/js/resource/resource";
import Dictionary from "@/js/resource/dictionary";
// Components
import ButtonMainVue from "@/components/base/buttons/ButtonMain.vue";
import ButtonOutlineVue from "@/components/base/buttons/ButtonOutline.vue";
import SubButton from "@/components/base/buttons/ButtonSub.vue";

export default {
  name: "DialogWarning",
  components: { ButtonMainVue, ButtonOutlineVue, SubButton },
  props: {
    hasOutlineButton: {
      type: Boolean,
      default: false,
    }, // Dialog có button kiểu outline
    hasSubButton: {
      type: Boolean,
      default: false,
    }, // Dialog có button kiểu sub
    mainButtonContent: {
      type: String,
      default: Dictionary.action.close.VN,
    }, // Nội dung nút chính
    content: {
      type: String,
      isRequired: true,
    }, // Nội dung hiển thị
    mode: {
      type: Number,
      default: 0,
    }, // Chế độ hiển thị của dialog
  },
  emits: ["close-dialog", "close-popup", "confirm"],

  data() {
    return {
      // Resources
      Enum,
      Resource,
      action: Dictionary.action,
      buttonContent: Resource.ButtonContent,
    };
  },
};
</script>

<style scoped>
.dialog {
  padding: 0;
}

.dialog__body {
  flex: none;
  margin: 24px 16px;
}

.dialog__body__text {
  padding: unset;
}

.dialog__footer {
  align-items: center;
  background-color: #f5f5f5;
  margin: 0;
  border-radius: 0 0 4px 4px;
  height: calc(36px + 16px);
  padding-right: 8px;
}

/* icon */
.icon--warning {
  background: url(@/assets/imgs/Icon-qlts-update.svg) no-repeat -372px -285px;
  width: 24px;
  height: 22px;
}

/* button */
.button {
  width: 100px;
}
</style>