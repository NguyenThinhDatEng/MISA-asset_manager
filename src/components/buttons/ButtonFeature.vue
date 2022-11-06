<template>
  <div
    :class="[buttonType, { 'button--disable': isDisable }]"
    :title="title"
    @click="showDialog = true"
  >
    <div :class="['icon icon--18px center', iconName]"></div>
  </div>
  <DialogDelete v-if="showDialog"></DialogDelete>
</template>
  
  <script>
import DialogDelete from "@/components/dialogs/DialogDelete.vue";

export default {
  name: "ButtonFeature",
  components: { DialogDelete },
  props: {
    buttonType: String,
    title: String,
    iconName: String,
    isDisable: Boolean,
  },
  data() {
    return { showDialog: false };
  },
};
</script>
  
  <style scoped>
</style>