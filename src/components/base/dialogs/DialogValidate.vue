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
import ButtonMainVue from "@/components/base/buttons/ButtonMain.vue";
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
          "- " + Resource.WarningMessage.info + " <span> " + val + " </span>"
        );
      return "- " + val;
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
@import url(@/css/font.css);
li.list {
  list-style-type: none;
}

span {
  font-family: MISA Bold;
}

ul {
  padding-left: 0;
}

li + li {
  padding-top: 2px;
}
</style>