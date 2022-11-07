<template>
  <tfoot class="table__footer">
    <tr>
      <td colspan="6">
        <div class="footer__left">
          <div class="total-of-records__wrapper">
            <p class="total-of-records" v-html="numberOfRecords()"></p>
          </div>
          <!-- Combobox: Limit of records  -->
          <ComboboxPagingVue :title="Resource.Title.limit"></ComboboxPagingVue>
          <!-- Paging  -->
          <div class="paging">
            <div class="paging__icon--wrapper">
              <div
                class="icon center icon-footer icon--left-arrow"
                :title="Resource.Title.pre"
              ></div>
            </div>
            <div class="page-numbers">
              <button class="number" value="1">1</button>
              <button class="number" value="2">2</button>
              <span class="number" value="">...</span>
              <button class="number" value="10">10</button>
            </div>
            <div class="paging__icon--wrapper">
              <div
                class="icon center icon-footer icon--right-arrow"
                :title="Resource.Title.next"
              ></div>
            </div>
          </div>
        </div>
      </td>
      <td class="value">13</td>
      <td class="value">249000000</td>
      <td class="value">19716000</td>
      <td class="value">229284000</td>
      <td></td>
    </tr>
  </tfoot>
</template>

<script>
import Resource from "@/js/resource/resource";
import ComboboxPagingVue from "../comboboxes/ComboboxPaging.vue";

export default {
  name: "TableFoot",
  components: { ComboboxPagingVue },
  props: {
    records: Array,
  },
  methods: {
    /**
     * trả về thông tin số bản ghi thu được
     * render bằng v-html
     * author: Nguyen Van Thinh 02/11/2022
     * @return String kiểu html
     */
    numberOfRecords() {
      return "Tổng số: " + "<b>" + this.records.length + "</b>" + " bản ghi";
    },
  },
  data() {
    return {
      Resource,
    };
  },
};
</script>

<style scoped>
</style>