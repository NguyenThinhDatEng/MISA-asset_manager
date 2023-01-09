<template>
  <!-- Wrapper -->
  <div class="dialog__wrapper">
    <div class="dialog" v-if="this.mode == Enum.Mode.Add">
      <!-- Header -->
      <div class="dialog__header"></div>
      <!-- Body -->
      <div id="dialog--no-header" class="dialog__body">
        <div class="icon icon--warning dialog__body__icon"></div>
        <p class="dialog__body__text">{{ content }}</p>
      </div>
      <!-- Footer -->
      <div class="dialog__footer">
        <ButtonMainVue
          :button-content="Resource.ButtonContent.remove"
          :title="Resource.Title.cancel"
          :type="Enum.Type.Main"
          @click="this.$emit('close-popup')"
        ></ButtonMainVue>
        <ButtonOutlineVue
          v-show="hasNoButton"
          :button-content="Resource.ButtonContent.no"
          :title="Resource.Title.cancel"
          @click="this.$emit('close-dialog')"
        ></ButtonOutlineVue>
      </div>
    </div>

    <div class="dialog" v-else>
      <div class="dialog__header"></div>
      <div id="dialog--no-header" class="dialog__body">
        <div class="icon icon--warning dialog__body__icon"></div>
        <p class="dialog__body__text">{{ content }}</p>
      </div>
      <div class="dialog__footer">
        <ButtonMainVue
          :button-content="Resource.ButtonContent.save"
          :title="Resource.Title.update"
          :type="Enum.Type.Main"
          @click="this.$emit('save-and-close')"
          @keydown.enter="this.$emit('save-and-close')"
        ></ButtonMainVue>

        <SubButton
          :title="Resource.Title.noSave"
          @click="this.$emit('close-popup')"
        ></SubButton>

        <ButtonOutlineVue
          :button-content="Resource.ButtonContent.remove"
          :title="Resource.Title.cancel"
          @click="this.$emit('close-dialog')"
          @keydown.enter="this.$emit('close-dialog')"
        ></ButtonOutlineVue>
      </div>
    </div>
  </div>
</template>

<script>
import Enum from "@/js/enum/enum";
import Resource from "@/js/resource/resource";
import ButtonMainVue from "@/components/base/buttons/ButtonMain.vue";
import ButtonOutlineVue from "@/components/base/buttons/ButtonOutline.vue";
import SubButton from "@/components/base/buttons/ButtonSub.vue";

export default {
  name: "DialogCancel",
  components: { ButtonMainVue, ButtonOutlineVue, SubButton },
  props: {
    mode: Number,
    hasNoButton: {
      type: Boolean,
      default: true,
    }, // Dialog có button "Không"
  },
  emits: ["close-dialog", "close-popup", "save-and-close"],

  created() {
    if (this.mode == Enum.Mode.Add) {
      this.content = this.text.add;
    } else this.content = this.text.edit;
  },

  methods: {},

  data() {
    return {
      content: "",
      text: {
        add: "Bạn có muốn hủy khai báo tài sản này?",
        edit: "Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có muốn lưu các thay đổi này?",
      },
      Resource,
      Enum,
    };
  },
};
</script>

<style scoped>
</style>