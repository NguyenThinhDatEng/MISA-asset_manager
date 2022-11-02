<template>
  <tfoot class="table__footer">
    <tr>
      <td colspan="6">
        <div class="footer__left">
          <div class="total-of-records__wrapper">
            <p class="total-of-records" v-html="records()"></p>
          </div>
          <!-- Combobox: Limit of records  -->
          <Combobox></Combobox>
          <!-- Paging  -->
          <div class="paging">
            <div class="paging__icon--wrapper">
              <div class="icon center icon-footer icon--left-arrow"></div>
            </div>
            <div class="page-numbers">
              <button class="number" value="1">1</button>
              <button class="number" value="2">2</button>
              <span class="number" value="">...</span>
              <button class="number" value="10">10</button>
            </div>
            <div class="paging__icon--wrapper">
              <div class="icon center icon-footer icon--right-arrow"></div>
            </div>
          </div>
        </div>
      </td>
      <td style="font-family: MISA Bold" class="text-align_right">13</td>
      <td style="font-family: MISA Bold" class="text-align_right">249000000</td>
      <td style="font-family: MISA Bold" class="text-align_right">19716000</td>
      <td style="font-family: MISA Bold" class="text-align_right">229284000</td>
      <td></td>
    </tr>
  </tfoot>
</template>

<script>
import Combobox from "@/components/comboboxes/ComboboxLimit.vue";
export default {
  name: "TableFoot",
  created() {},
  components: { Combobox },
  props: {},
  emits: [],
  methods: {
    /**
     * trả về thông tin số bản ghi thu được
     * render bằng v-html
     * author: Nguyen Van Thinh 02/11/2022
     * @return String kiểu html
     */
    records() {
      return "Tổng số: " + "<b>" + this.quantity + "</b>" + " bản ghi";
    },
  },
  data() {
    return {
      quantity: 200,
    };
  },
};
</script>

<style scoped>
</style>