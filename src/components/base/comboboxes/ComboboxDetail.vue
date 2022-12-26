<template>
  <div
    :class="['combobox combobox--detail', { 'combobox--error': isError }]"
    @keydown.up.prevent="highlightPrevious"
    @keydown.enter="handleOnClickData(highlightIndex)"
    @keydown.down.prevent="highlightNext"
  >
    <!-- input -->
    <input
      type="text"
      class="input combobox__input"
      :placeholder="placeholder"
      :maxlength="maxLength"
      v-model="val"
      @focus="isShow = true"
      @keydown.enter="isShow = !isShow"
    />
    <div class="combobox__button" @click="isShow = !isShow">
      <div class="icon center icon--down"></div>
    </div>
    <div class="combobox__data" v-show="isShow" ref="scrollContainer">
      <div class="title">
        <div class="data">
          <div class="text__wrapper">
            <p>{{ Resource.ComboboxInfo.firstCol }}</p>
          </div>
          <p>{{ Resource.PopupLabel[fields.name] }}</p>
        </div>
      </div>
      <!-- Dữ liệu hiển thị  -->
      <Data
        v-for="(obj, index) in data"
        :key="index"
        :field="field"
        :obj="obj"
        :class="{ 'data--selected': index === highlightIndex }"
        tabindex="0"
        ref="Data"
        @click="handleOnClickData(index)"
        @mouseover="highlightIndex = index"
        @mouseout="highlightIndex = -1"
        @keydown.tab="highlightIndex = index + 1"
      ></Data>
    </div>
  </div>
</template>

<script>
import Data from "./DataDetail.vue";
import Resource from "@/js/resource/resource";
// import Enum from "@/js/enum/enum";
import Function from "@/js/common/function";

export default {
  name: "ComboboxDetail",
  components: { Data },
  props: {
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
  },
  methods: {
    /**
     * Sự kiện chọn thông tin trong combobox
     * @param {String} id id của mã bộ phận sử dụng được chọn
     * @author Nguyen Van Thinh 07/11/2022
     */
    handleOnClickData: function (index) {
      try {
        if (index === -1) return;
        // get the ID of object
        const id = this.data[index][this.fields.id];
        // dữ liệu phát lên lớp cha
        let comboData = [];
        // Lọc ra obj được chọn
        for (let obj of this.comboboxData) {
          if (id == obj[this.fields.id]) {
            // Cập nhật giá trị
            this.val = obj[this.fields.code];
            // Cập nhật dữ liệu trong data
            comboData.push({
              field: this.fields.id,
              value: obj[this.fields.id],
            });
            // id
            comboData.push({ field: this.fields.code, value: this.val }); // code
            // name
            comboData.push({
              field: this.fields.name,
              value: obj[this.fields.name],
            });
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
            // Phát dữ liệu đến lớp cha
            this.$emit("update-combobox", comboData, this.fields.code);
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

    /**
     * highlight vào dòng khi có sự kiện nhấn phím mũi tên xuống từ bàn phím
     * @author NVThinh (22/12/2022)
     */
    highlightNext: function () {
      if (this.highlightIndex < this.data.length - 1) {
        this.highlightIndex++;
      }
    },

    /**
     * highlight vào dòng khi có sự kiện nhấn phím mũi tên lên từ bàn phím
     * @author NVThinh (22/12/2022)
     */
    highlightPrevious: function () {
      if (this.highlightIndex > 0) {
        this.highlightIndex--;
      }
    },
  },
  data() {
    return {
      proxy: null, // chỉ định component này
      val: "", // giá trị ô input
      isShow: false, // Trạng thái ẩn hiện phần dữ liệu
      highlightIndex: -1, // Đánh chỉ mục cho các option được chọn
      // Các trường dữ liệu tương ứng trong Database
      fields: {
        id: this.field + "_id",
        code: this.field + "_code",
        name: this.field + "_name",
      },
      data: [], // mảng dữ liệu được cập nhật
      Resource, // tài nguyên
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