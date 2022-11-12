<template>
  <div class="toast__wrapper">
    <div class="toast">
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

export default {
  name: "ToastVue",
  props: {
    mode: Number,
  },
  created() {
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
      default:
        console.log("Default!!!!!!!!!");
        break;
    }
  },
  data() {
    return { toastInfo: Resource.ToastInfo, Enum, theInfo: "" };
  },
};
</script>

<style scoped>
@import url(@/css/components/toast.css);
@import url(@/css/icon.css);
</style>