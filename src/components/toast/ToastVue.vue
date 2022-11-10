<template>
  <div class="toast__wrapper">
    <div class="toast">
      <div class="toast__icon--background">
        <div class="toast__icon--wrapper center">
          <div class="icon icon--center icon--tick"></div>
        </div>
      </div>
      <div class="toast__info">{{ Resource.ToastInfo.save }}</div>
    </div>
  </div>
</template>

<script>
import Resource from "@/js/resource/resource";
export default {
  name: "ToastVue",
  data() {
    return { Resource };
  },
};
</script>

<style scoped>
@import url(@/css/components/toast.css);
@import url(@/css/icon.css);
</style>