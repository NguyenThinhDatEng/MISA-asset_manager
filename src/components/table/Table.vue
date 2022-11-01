<template>
  <div class="table">
    <table>
      <!-- Table columns -->
      <colgroup>
        <col
          :style="col.width ? 'min-width: ' + col.width + 'px' : ''"
          v-for="col in cols"
          :key="col.id"
        />
      </colgroup>
      <!-- Table Header  -->
      <TableHead></TableHead>
      <!-- Table body  -->
      <TableBody></TableBody>
      <TableFoot></TableFoot>
    </table>
  </div>
</template>

<script>
import TableHead from "./TableHead.vue";
import TableBody from "./table-body/TableBody.vue";
import TableFoot from "./TableFoot.vue";

export default {
  name: "TheTable",
  created() {},
  components: { TableHead, TableBody, TableFoot },
  props: {},
  emits: [],
  methods: {},
  data() {
    return {
      cols: [
        { id: 1, width: 40 },
        { id: 2, width: 40 },
        { id: 3 },
        { id: 4, width: 90 },
        { id: 5, width: 70 },
        { id: 6, width: 100 },
        { id: 7, width: 60 },
        { id: 8 },
        { id: 9, width: 90 },
        { id: 10, width: 80 },
        { id: 11, width: 80 },
      ],
    };
  },
};
</script>

<style scoped>
@import url(@/css/base.css);
</style>