<template>
  <div class="dialog__wrapper">
    <div class="dialog">
      <div class="dialog__header"></div>
      <div id="dialog--no-header" class="dialog__body">
        <ul>
          <li
            class="list"
            v-for="(val, index) in requiredData"
            :key="index"
            v-html="setVueHtml(val)"
          ></li>
        </ul>
      </div>
      <div class="dialog__footer">
        <ButtonMainVue
          :button-content="Resource.ButtonContent.close"
          :title="Resource.Title.close"
          :type="Enum.Type.Main"
          :isDeleteDialog="true"
          @click="closeDialog"
        ></ButtonMainVue>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonMainVue from "../buttons/ButtonMain.vue";
import Resource from "@/js/resource/resource";
import Enum from "@/js/enum/enum";

export default {
  name: "DialogValidate",
  components: { ButtonMainVue },
  props: {
    requiredData: {
      type: Array,
      default: () => {
        return [1, 2, 3, 4, 5];
      },
    },
    dlgType: {
      type: Number,
      default: Enum.DlgType.RequiredInfo,
    },
  },
  emits: ["close-dialog"],
  methods: {
    // Phát sự kiện đóng popup đến class cha
    closeDialog: function () {
      try {
        this.$emit("close-dialog");
      } catch (error) {
        console.log(error);
      }
    },

    // Thiết lập nội dung hiển thị
    setVueHtml: function (val) {
      if (this.dlgType == Enum.DlgType.RequiredInfo)
        return (
          Resource.WarningMessage.info +
          " <b>&lt;&lt;<b><span> " +
          val +
          " </span><b>&gt;&gt;</b>"
        );
      return val;
    },
  },
  data() {
    return {
      Resource,
      Enum,
    };
  },
};
</script>

<style scoped>
li.list {
  list-style-type: circle;
}
</style>