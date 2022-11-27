<template>
  <div :class="['combobox combobox--detail', { 'combobox--error': isError }]">
    <!-- input -->
    <input
      type="text"
      class="input combobox__input"
      :placeholder="placeholder"
      :maxlength="maxLength"
      v-model="val"
      @click="isShow = !isShow"
      @keyup="keyUp"
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
      <!-- Dữ liệu hiển thị  -->
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
import Data from "./DataDetail.vue";
import Resource from "@/js/resource/resource";
import Enum from "@/js/enum/enum";
import Function from "@/js/common/function";

export default {
  name: "ComboboxDetail",
  components: { Data },
  props: {
    labelContent: String,
    isError: {
      type: Boolean,
      default: false,
    },
    placeholder: String,
    maxLength: Number,
    comboboxData: Array,
    field: String,
    value: {
      type: String,
      default: "",
    },
  },
  created() {
    try {
      window.addEventListener("click", (e) => {
        if (!this.$el.contains(e.target)) {
          this.isShow = false;
        }
      });
      // Cập nhật biến data khi bind mảng dữ liệu từ ngoài vào
      this.data = this.comboboxData;
      // Thêm trường dữ liệu isActive
      for (let obj of this.data) {
        obj["isActive"] = false;
      }
      // Bind dữ liệu vào input khi nhận dữ liệu từ ngoài vào
      this.val = this.value;
    } catch (error) {
      console.log(error);
    }
  },
  emits: ["update-combobox"],
  watch: {
    // Cập nhật biến data khi bind mảng dữ liệu từ ngoài vào
    comboboxData: function () {
      this.data = this.comboboxData;
      // Thêm trường dữ liệu isActive
      for (let obj of this.data) {
        obj["isActive"] = false;
      }
    },

    val: function () {
      try {
        this.data = Function.autoComplete(
          this.val,
          this.comboboxData,
          this.fields.name,
          this.fields.code
        );
      } catch (error) {
        console.log(error);
      }
    },

    isShow: function () {
      console.log("isShow is changed", this.isShow);
    },
  },
  methods: {
    /**
     * Sự kiện chọn thông tin trong combobox
     * @param {String} id id của mã bộ phận sử dụng được chọn
     * @author Nguyen Van Thinh 07/11/2022
     */
    handleOnClickData: function (id) {
      try {
        let comboData = []; // dữ liệu phát lên lớp cha
        const IDField = this.field + "_id"; // Ex: department_id
        const codeField = this.field + "_code"; // Ex: department_code
        const nameField = this.field + "_name"; // Ex: department_name
        // Lọc ra obj được chọn
        for (let obj of this.comboboxData) {
          if (id == obj[IDField]) {
            // Cập nhật giá trị
            this.val = obj[codeField];
            // Cập nhật dữ liệu trong data
            comboData.push({ field: IDField, value: obj[IDField] }); // id
            comboData.push({ field: codeField, value: this.val }); // code
            comboData.push({ field: nameField, value: obj[nameField] }); // name
            comboData.push({
              // life time
              field: Resource.PopupField.life_time,
              value: obj.life_time,
            });
            comboData.push({
              // depreciation rate
              field: Resource.PopupField.depreciation_rate,
              value: obj.depreciation_rate,
            });
            console.log(comboData);
            // Phát dữ liệu đến lớp cha
            this.$emit("update-combobox", comboData, this.field + "_code");
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

    keyUp: function (e) {
      try {
        // console.log("keyup", e);
        if (e.keyCode == Enum.KeyCode.TAB) {
          this.isShow = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      val: "", // giá trị ô input
      isShow: false, // Trạng thái ẩn hiện phần dữ liệu
      fields: {
        id: this.field + "_id",
        code: this.field + "_code",
        name: this.field + "_name",
      },
      data: [], // mảng dữ liệu được cập nhật
      Resource, // tài nguyen
      Function, // Hàm dùng chung
    };
  },
};
</script>

<style scoped>
@import url(@/css/components/combobox.css);

:root {
  --input--error: #ea3636;
}

.combobox--error {
  border-color: var(--input--error);
}
</style>