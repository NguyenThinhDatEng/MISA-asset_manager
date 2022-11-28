<template>
  <div class="dialog__wrapper">
    <!-- Delete -->
    <div class="dialog" v-if="mode == Enum.Mode.Delete">
      <div class="dialog__header"></div>
      <div id="dialog--no-header" class="dialog__body">
        <div class="dialog__body__icon icon icon--warning"></div>
        <p class="dialog__body__text" v-html="warningContent"></p>
      </div>
      <div class="dialog__footer">
        <ButtonMainVue
          :button-content="Resource.ButtonContent.delete"
          :title="Resource.Title.delete"
          :type="Enum.Type.Main"
          :isDeleteDialog="true"
          @click="$emit('delete-records', mode)"
        ></ButtonMainVue>
        <ButtonOutlineVue
          :button-content="Resource.ButtonContent.no"
          :title="Resource.Title.cancel"
          @click="this.$emit('close-dialog')"
        ></ButtonOutlineVue>
      </div>
    </div>
    <!-- Dialog Delete Multi  -->
    <div class="dialog" v-else>
      <div class="dialog__header"></div>
      <div id="dialog--no-header" class="dialog__body">
        <div class="dialog__body__icon icon icon--warning"></div>
        <p class="dialog__body__text" v-html="warningContent"></p>
      </div>
      <div class="dialog__footer">
        <ButtonMainVue
          :button-content="Resource.ButtonContent.delete"
          :title="Resource.Title.delete"
          :type="Enum.Type.Main"
          :isDeleteDialog="true"
          @click="$emit('delete-records', mode)"
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
import ButtonMainVue from "@/components/base/buttons/ButtonMain.vue";
import ButtonOutlineVue from "@/components/base/buttons/ButtonOutline.vue";
import Resource from "@/js/resource/resource";
import Enum from "@/js/enum/enum";
import Function from "@/js/common/function";

export default {
  name: "DialogDelete",
  props: {
    numberOfSelectedRows: Number, // số lượng bản ghi được chọn
    fixedAsset: Object, // Đối tượng tài sản cố định được chọn
  },
  components: { ButtonMainVue, ButtonOutlineVue },
  created() {
    this.updateContent();
  },
  emits: ["close-dialog", "delete-records"],
  computed: {
    warningContent: function () {
      if (this.mode == Enum.Mode.Delete)
        return "Bạn có muốn xóa tài sản <span>" + this.content + "</span>?";
      // Nếu không
      return (
        "<span>" +
        this.content +
        "</span> tài sản đã được chọn. Bạn có muốn xóa các tài sản này khỏi danh sách?"
      );
    },
  },
  methods: {
    /**
     * Thiết lập chế độ và nội dung hiển thị của dialog
     * @param {Number} numberOfSelectedRows số lượng bản ghi được chọn
     * @param {Object} fixedAsset đối tượng tài sản cố định được chọn
     * @author NVThinh 26/11/2022
     */
    updateContent: function () {
      try {
        if (this.numberOfSelectedRows == 1) {
          this.mode = Enum.Mode.Delete;
          this.content =
            this.fixedAsset.fixed_asset_code +
            " - " +
            this.fixedAsset.fixed_asset_name;
          return;
        }
        this.mode = Enum.Mode.DeleteMulti;
        this.content = Function.formatNumber(this.numberOfSelectedRows);
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      content: "", // nội dung dialog
      mode: 0, // chế độ xóa (1 hay nhiều)
      Enum, // enum
      Resource, // Tài nguyên
    };
  },
};
</script>

<style scoped>
@import url(@/css/components/dialog.css);
</style>