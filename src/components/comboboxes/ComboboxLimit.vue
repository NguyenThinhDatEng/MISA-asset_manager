<template>
  <div id="combobox--limit" class="combobox" :title="resource.Title.limit">
    <input type="text" class="input combobox__input" :value="value" readonly />
    <div class="combobox__button">
      <div class="icon center icon--down"></div>
    </div>
    <div id="combobox__data--limit" class="combobox__data" hidden>
      <div class="data" v-for="val in data" :key="val">{{ val }}</div>
    </div>
  </div>
</template>

<script>
import resource from "@/resource/resource";
export default {
  name: "SimpleCombobox",
  data() {
    return { resource, value: 20, data: [10, 20, 50, 100] };
  },
};
</script>

<style scoped>
</style>