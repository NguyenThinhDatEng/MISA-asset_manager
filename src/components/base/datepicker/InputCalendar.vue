<template>
  <Datepicker
    name="abc"
    class="datepicker"
    v-model="date"
    placeholder="dd/mm/yyyy"
    :format="format"
    monthNameFormat="long"
    locale="vi"
    selectText="Chọn"
    cancelText="Đóng"
    showNowButton
    nowButtonLabel="Ngày hiện tại"
    :previewFormat="format"
    :dayNames="['H', 'B', 'B', 'N', 'S', 'B', 'CN']"
    :clearable="false"
    :enableTimePicker="false"
    hideInputIcon
    modeHeight="true"
  ></Datepicker>
  <div class="input--date__icon__wrapper">
    <div class="icon icon-item center icon--calendar"></div>
  </div>
</template>
  
  <script>
import { ref } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import Function from "@/js/common/function";
import Enum from "@/js/enum/enum";

export default {
  name: "InputCalendar",
  components: { Datepicker },
  props: {
    field: String,
    mode: Number,
    value: String,
  },
  emits: ["update-input"],
  watch: {
    date: function () {
      try {
        this.$emit("update-input", this.date.toISOString(), this.field); // "2020-05-25T07:01:14",
      } catch (error) {
        console.log(error);
      }
    },
  },
  setup() {
    const date = ref(new Date());
    const format = (date) => {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${Function.formatNumber(day)}/${Function.formatNumber(
        month
      )}/${year}`;
    };
    return {
      date,
      format,
      Function,
    };
  },
  mounted() {
    if (this.mode == Enum.Mode.Update) this.date = new Date(this.value);
  },
};
</script>
  
  <style scoped>
@import url(@/css/components/date_picker.css);
</style>
  