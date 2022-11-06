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
        <button class="button button--save">Xóa</button>
        <button class="button button--cancel">Không</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DialogDelete",
  created() {},
  components: {},
  props: {},
  emits: [],
  methods: {},
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>