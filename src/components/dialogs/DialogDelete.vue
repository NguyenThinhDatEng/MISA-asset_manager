<template>
  <!-- Bạn có muốn xóa tài sản -->
  <div class="dialog__wrapper">
    <div class="dialog">
      <div class="dialog__header"></div>
      <div id="dialog--no-header" class="dialog__body">
        <div class="dialog__body__icon icon icon--warning"></div>
        <p class="dialog__body__text">
          Bạn có muốn xóa tài sản <b>&lt;&lt;</b><span>Mã - Tên tài sản</span
          ><b>&gt;&gt;</b> ?
        </p>
      </div>
      <div class="dialog__footer">
        <ButtonMainVue
          :button-content="Resource.ButtonContent.delete"
          :title="Resource.Title.delete"
          :type="Enum.Type.Main"
          :isDeleteDialog="true"
        ></ButtonMainVue>
        <ButtonOutlineVue
          :button-content="Resource.ButtonContent.no"
          :title="Resource.Title.cancel"
        ></ButtonOutlineVue>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonMainVue from "../buttons/ButtonMain.vue";
import ButtonOutlineVue from "../buttons/ButtonOutline.vue";
import Resource from "@/js/resource/resource";
import Enum from "@/js/enum/enum";

export default {
  name: "DialogDelete",
  created() {},
  components: { ButtonMainVue, ButtonOutlineVue },
  props: {},
  emits: [],
  methods: {},
  data() {
    return { Resource, Enum };
  },
};
</script>

<style scoped>
</style>