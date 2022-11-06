<template>
  <thead>
    <tr>
      <th class="th--checkbox checkbox__wrapper">
        <input id="checkbox-header" type="checkbox" class="checkbox" />
      </th>
      <th
        v-for="(value, key) of ths"
        :key="key"
        :title="setTitle(value)"
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
  methods: {
    // Thiếp lập title cho từ viết tắt
    setTitle: function (value) {
      try {
        if (value == "STT") return resource.Abbreviations.STT;
        else if (value == "HM/KH lũy kế")
          return resource.Abbreviations.depreciation;
        else return "";
      } catch (error) {
        console.log("Table Header", error);
      }
    },
  },
  data() {
    return {
      ths: resource.Columns,
    };
  },
};
</script>

<style scoped>
</style>