<template>
  <thead>
    <tr>
      <th class="th--checkbox checkbox__wrapper">
        <input id="checkbox-header" type="checkbox" class="checkbox" />
      </th>
      <th
        v-for="(value, key) of ths"
        :key="key"
        :title="value"
        :class="'col--' + key"
      >
        {{ value }}
      </th>
    </tr>
  </thead>
</template>

<script>
import resource from "@/resource/resource";

export default {
  name: "TableHead",
  data() {
    return {
      ths: resource.Columns,
    };
  },
};
</script>

<style scoped>
</style>