<template>
  <label>{{ labelContent }} <span style="color: red">*</span></label>
  <div class="input--number">
    <input type="number" class="input" min="0" :value="value" />
    <div class="icon--up_down">
      <div class="icon icon--up" :title="resource.Title.increase"></div>
      <div class="icon icon--down" :title="resource.Title.decrease"></div>
    </div>
  </div>
</template>

<script>
import resource from "@/resource/resource";

export default {
  name: "InputNumber",
  props: {
    labelContent: String,
    maxlength: Number,
    value: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return { resource };
  },
};
</script>

<style scoped>
</style>