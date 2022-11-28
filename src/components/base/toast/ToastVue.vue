<template>
  <div class="toast__wrapper">
    <div
      :class="[
        'toast',
        { 'toast--error': actionStatus == Enum.ActionStatus.Error },
      ]"
    >
      <div class="toast__icon--background">
        <div class="toast__icon--wrapper center">
          <div class="icon icon--center icon--tick"></div>
        </div>
      </div>
      <div class="toast__info">{{ content }}</div>
    </div>
  </div>
</template>

<script>
import Enum from "@/js/enum/enum";

export default {
  name: "ToastVue",
  props: {
    actionStatus: {
      type: Number,
      default: 0,
    },
    content: {
      type: String,
      default: "Chưa có nội dung để hiển thị",
    },
  },
  data() {
    return {
      Enum, // enum
    };
  },
};
</script>

<style scoped>
@import url(@/css/components/toast.css);
@import url(@/css/icon.css);
</style>