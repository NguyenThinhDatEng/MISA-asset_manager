<template>
  <div class="dialog__wrapper">
    <div class="dialog">
      <div class="dialog__header"></div>
      <div id="dialog--no-header" class="dialog__body">
        <div class="icon icon--warning dialog__body__icon"></div>
        <p class="dialog__body__text">{{ content }}</p>
      </div>
      <div class="dialog__footer">
        <ButtonMainVue
          :button-content="Resource.ButtonContent.cancel"
          :title="Resource.Title.cancel"
          :type="Enum.Type.Main"
          @click="this.$emit('close-popup')"
        ></ButtonMainVue>
        <ButtonOutlineVue
          :button-content="Resource.ButtonContent.no"
          :title="Resource.Title.cancel"
          @click="this.$emit('close-dialog')"
        ></ButtonOutlineVue>
      </div>
    </div>
  </div>
</template>

<script>
import Enum from "@/js/enum/enum";
import Resource from "@/js/resource/resource";
import ButtonMainVue from "../buttons/ButtonMain.vue";
import ButtonOutlineVue from "../buttons/ButtonOutline.vue";

export default {
  name: "DialogCancel",
  created() {
    if (this.mode == Enum.Mode.Add) {
      this.content = this.text.add;
    } else this.content = this.text.edit;
  },
  components: { ButtonMainVue, ButtonOutlineVue },
  props: { mode: String },
  emits: ["close-dialog", "close-popup"],
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