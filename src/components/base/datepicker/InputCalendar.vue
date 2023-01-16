<template>
  <Datepicker
    v-model="date"
    text-input
    showNowButton
    hideInputIcon
    vertical
    auto-apply
    name="myDate"
    class="datepicker"
    placeholder="dd/mm/yyyy"
    monthNameFormat="long"
    locale="vi"
    nowButtonLabel="Ngày hiện tại"
    :format="format"
    :previewFormat="format"
    :text-input-options="textInputOptions"
    :dayNames="dayNames"
    :clearable="false"
    :enableTimePicker="false"
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
    value: String, // Giá trị đầu vào của ô input
    tabindex: {
      type: [Number, String],
      default: 1,
    }, // tabindex
  },
  emits: ["update-input"],
  watch: {
    date: function () {
      try {
        if (!this.date) {
          this.date = new Date();
        }
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
    const textInputOptions = ref({
      format: "dd/MM/yyyy",
    });
    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return {
      date,
      format,
      Function,
      textInputOptions,
      dayNames,
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
  