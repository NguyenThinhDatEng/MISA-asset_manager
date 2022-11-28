<template>
  <div class="toast__wrapper">
    <div :class="['toast', { 'toast--error': isError }]">
      <div class="toast__icon--background">
        <div class="toast__icon--wrapper center">
          <div class="icon icon--center icon--tick"></div>
        </div>
      </div>
      <div class="toast__info">{{ theInfo }}</div>
    </div>
  </div>
</template>

<script>
import Resource from "@/js/resource/resource";
import Enum from "@/js/enum/enum";
import Function from "@/js/common/function";

export default {
  name: "ToastVue",
  props: {
    mode: Number,
    numberOfDeletedRecords: Number,
    isError: Boolean,
  },
  // Cập nhật thông tin hiển thị của toast
  created() {
    if (this.isError == false)
      // Nếu không có lỗi
      switch (this.mode) {
        case Enum.Mode.Add:
          this.theInfo = this.toastInfo.addSuccess;
          break;
        case Enum.Mode.Update:
          this.theInfo = this.toastInfo.updateSuccess;
          break;
        case Enum.Mode.Delete:
          this.theInfo = this.toastInfo.deleteSuccess;
          break;
        case Enum.Mode.DeleteMulti:
          this.theInfo =
            Function.formatNumber(this.numberOfDeletedRecords) +
            " " +
            this.toastInfo.deleteMultiSuccess;
          break;
        case Enum.Mode.Duplicate:
          this.theInfo = this.toastInfo.duplicateSuccess;
          break;
        default:
          console.log("Default!!!!!!!!!");
          break;
      }
    // Nếu có lỗi
    else {
      switch (this.mode) {
        case Enum.Mode.DeleteMulti:
          this.theInfo = this.toastInfo.deleteMultiFail;
          break;
        default:
          this.theInfo = this.toastInfo.error;
          break;
      }
    }
  },
  data() {
    return { theInfo: "", toastInfo: Resource.ToastInfo, Enum };
  },
};
</script>

<style scoped>
@import url(@/css/components/toast.css);
@import url(@/css/icon.css);
</style>