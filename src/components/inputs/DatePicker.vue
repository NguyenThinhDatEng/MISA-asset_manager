<template>
  <div class="block">
    <el-date-picker v-model="value" type="date" placeholder="Pick a day" />
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  name: "DatePicker",
  setup() {
    const value = ref("");
    return value;
  },
  methods: {
    disabledDate: function (time) {
      return time.getTime() > Date.now();
    },
  },
};
</script>
<style scoped>
.block {
  flex: 1;
  text-align: center;
  padding: 30px 0;
}
</style>