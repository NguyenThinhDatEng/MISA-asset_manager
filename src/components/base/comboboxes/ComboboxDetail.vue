<template>
  <div class="combobox combobox--detail">
    <input
      type="text"
      class="input combobox__input"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :value="val ? val : value"
      @click="isShow = !isShow"
    />
    <div class="combobox__button" @click="isShow = !isShow">
      <div class="icon center icon--down"></div>
    </div>
    <div class="combobox__data" v-show="isShow">
      <div class="first-data">
        <div class="data">
          <div class="text__wrapper">
            <p>{{ Resource.ComboboxInfo.firstCol }}</p>
          </div>
          <p>{{ Resource.PopupLabel[field + "_name"] }}</p>
        </div>
      </div>
      <Data
        v-for="(obj, index) in data"
        :key="index"
        :field="field"
        :obj="obj"
        @click="handleOnClickData(obj[field + '_id'])"
      ></Data>
    </div>
  </div>
</template>

<script>
import Resource from "@/js/resource/resource";
import Data from "./DataDetail.vue";

export default {
  name: "ComboboxDetail",
  components: { Data },
  props: {
    placeholder: String,
    maxlength: Number,
    comboboxData: Array,
    field: String,
    value: {
      type: String,
      default: "",
    },
  },
  created() {
    window.addEventListener("click", (e) => {
      if (!this.$el.contains(e.target)) {
        this.isShow = false;
      }
    });
  },
  emits: ["update-combobox"],
  watch: {
    comboboxData: function () {
      this.data = this.comboboxData;
      // Thêm trường dữ liệu isActive
      for (let obj of this.data) {
        obj["isActive"] = false;
      }
      // console.log("@!@", this.data);
    },
  },
  methods: {
    // Gửi nội dung dữ liệu được thay đổi lên class cha
    updateInput: function (e) {
      try {
        this.$emit("update-input", e.target.value, this.field);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Sự kiện chọn thông tin trong combobox
     * @param {String} id id của mã bộ phận sử dụng được chọn
     * @author Nguyen Van Thinh 07/11/2022
     */
    handleOnClickData: function (id) {
      try {
        let data = []; // dữ liệu phát lên lớp cha
        const IDField = this.field + "_id"; // Ex: department_id
        const codeField = this.field + "_code"; // Ex: department_code
        const nameField = this.field + "_name"; // Ex: department_name
        // Lọc ra obj được chọn
        for (let obj of this.data) {
          if (id == obj[IDField]) {
            // Cập nhật giá trị
            this.val = obj[codeField];
            // Cập nhật dữ liệu trong data
            data.push({ field: IDField, value: obj[IDField] });
            data.push({ field: codeField, value: this.val });
            data.push({ field: nameField, value: obj[nameField] });
            data.push({
              field: Resource.PopupField.life_time,
              value: obj.life_time,
            });
            data.push({
              field: Resource.PopupField.depreciation_rate,
              value: obj.depreciation_rate,
            });
            // Phát dữ liệu đến lớp cha
            this.$emit("update-combobox", data);
            // Thay đổi trạng thái
            obj.isActive = true;
          } else obj.isActive = false;
        }
        // Ẩn Data Combobox
        this.isShow = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return { isShow: false, Resource, val: "", indexOfData: 0, data: [] };
  },
};
</script>

<style scoped>
</style>