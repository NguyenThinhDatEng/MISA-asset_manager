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
    // Trạng thái: Lỗi, Thành công, ...
    actionStatus: {
      type: Number,
      default: 0,
    },
    // Nội dung hiển thị
    content: {
      type: String,
      default: "Chưa có nội dung để hiển thị",
    },
  },

  mounted() {
    setTimeout(() => {
      this.$parent.closeToast();
    }, 2000);
  },

  data() {
    return {
      // Resources
      Enum, // enum
    };
  },
};
</script>

<style scoped>
@import url(@/css/components/toast.css);
@import url(@/css/icon.css);
</style>