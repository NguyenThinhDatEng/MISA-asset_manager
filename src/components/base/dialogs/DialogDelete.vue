<template>
  <div class="dialog__wrapper">
    <!-- Delete -->
    <div class="dialog" v-if="mode == Enum.Mode.Delete">
      <div class="dialog__header"></div>
      <div id="dialog--no-header" class="dialog__body">
        <div class="dialog__body__icon icon icon--warning"></div>
        <p class="dialog__body__text" v-html="text.delete"></p>
      </div>
      <div class="dialog__footer">
        <ButtonMainVue
          :button-content="Resource.ButtonContent.delete"
          :title="Resource.Title.delete"
          :type="Enum.Type.Main"
          :isDeleteDialog="true"
          @click="$emit('delete-records')"
        ></ButtonMainVue>
        <ButtonOutlineVue
          :button-content="Resource.ButtonContent.no"
          :title="Resource.Title.cancel"
          @click="closeDialog"
        ></ButtonOutlineVue>
      </div>
    </div>
    <!-- Dialog Delete Multi  -->
    <div class="dialog" v-else>
      <div class="dialog__header"></div>
      <div id="dialog--no-header" class="dialog__body">
        <div class="dialog__body__icon icon icon--warning"></div>
        <p class="dialog__body__text" v-html="text.deleteMulti"></p>
      </div>
      <div class="dialog__footer">
        <ButtonMainVue
          :button-content="Resource.ButtonContent.delete"
          :title="Resource.Title.delete"
          :type="Enum.Type.Main"
          :isDeleteDialog="true"
          @click="$emit('delete-records')"
        ></ButtonMainVue>
        <ButtonOutlineVue
          :button-content="Resource.ButtonContent.no"
          :title="Resource.Title.cancel"
          @click="closeDialog"
        ></ButtonOutlineVue>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonMainVue from "@/components/base/buttons/ButtonMain.vue";
import ButtonOutlineVue from "@/components/base/buttons/ButtonOutline.vue";
import Resource from "@/js/resource/resource";
import Enum from "@/js/enum/enum";

export default {
  name: "DialogDelete",
  created() {},
  components: { ButtonMainVue, ButtonOutlineVue },
  props: { info: String, mode: Number },
  emits: ["close-dialog", "delete-records"],
  methods: {
    closeDialog: function () {
      try {
        this.$emit("close-dialog");
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      Resource,
      Enum,
      text: {
        delete: "Bạn có muốn xóa tài sản <span>" + this.info + "</span> ?",
        deleteMulti:
          "<span>" +
          this.info +
          "</span> tài sản đã được chọn. Bạn có muốn xóa các tài sản này khỏi danh sách?",
      },
    };
  },
};
</script>

<style scoped>
</style>