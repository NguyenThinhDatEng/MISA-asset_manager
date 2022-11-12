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
        this.theInfo = Resource.ToastInfo.addSuccess;
        break;
      case Enum.Mode.Update:
        this.theInfo = Resource.ToastInfo.updateSuccess;
        break;
      default:
        console.log("Default!!!!!!!!!");
        break;
    }
  },
  data() {
    return { Resource, Enum, theInfo: "" };
  },
};
</script>

<style scoped>
@import url(@/css/components/toast.css);
@import url(@/css/icon.css);
</style>