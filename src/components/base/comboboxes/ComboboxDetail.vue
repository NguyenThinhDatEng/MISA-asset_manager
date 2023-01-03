<template>
  <div :class="['combobox combobox--detail', { 'combobox--error': isError }]">
    <!-- input -->
    <input
      type="text"
      class="input combobox__input"
      v-model="val"
      :placeholder="placeholder"
      :maxlength="maxLength"
      @click="toggle"
      @keydown.tab="close"
      @keydown.enter="toggle"
      @keydown.down="onDown"
    />
    <!-- button  -->
    <div class="combobox__button">
      <div class="icon center icon--down"></div>
    </div>
    <!-- data -->
    <div class="combobox__data" v-show="isShow">
      <!-- title -->
      <div id="combobox__data__title" class="title" tabindex="1">
        <div class="data">
          <div class="text__wrapper">
            <p>{{ Resource.ComboboxInfo.firstCol }}</p>
          </div>
          <p>{{ Resource.PopupLabel[fields.name] }}</p>
        </div>
      </div>
      <!-- options  -->
      <Data
        v-for="(obj, index) in data"
        :key="index"
        :id="'comboBox' + field + index"
        :obj="obj"
        :field="field"
        :class="{
          'data--selected': isSelected(index),
        }"
        tabindex="1"
        ref="Data"
        @click="handleSelectData(index)"
        @keydown.down="highlightNext"
        @keydown.up="highlightPrevious"
        @keydown.enter="handleSelectData(index)"
        @keydown.tab="handleSelectData(index)"
        @keydown.esc="close"
        @mouseover="highlightIndex = index"
        @mouseout="highlightIndex = -1"
      ></Data>
    </div>
  </div>
</template>

<script>
import Data from "./DataDetail.vue";
import Resource from "@/js/resource/resource";
import Function from "@/js/common/function";

export default {
  name: "ComboboxDetail",
  components: { Data },
  props: {
    value: {
      type: String,
      default: "",
    },
    isError: {
      type: Boolean,
      default: false,
    },
    placeholder: String,
    maxLength: Number,
    comboboxData: {
      type: Array,
      default: () => [],
    },
    field: String,
  },
  emits: ["update-combobox"],

  created() {
    // close the options if click out the component
    window.addEventListener("click", (e) => {
      if (!this.$el.contains(e.target)) {
        this.close();
      }
    });
  },

  mounted() {
    // set data
    this.comboboxData.forEach((obj) =>
      this.data.push({
        ...obj,
        isActive: false,
      })
    );
    // set value
    this.val = this.value;
  },

  beforeUnmount() {},

  watch: {
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
    onDown: function () {
      try {
        this.open();
        this.$nextTick(function () {
          this.focusFirstOption();
        });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Sự kiện chọn thông tin trong combobox
     * @param {String} id id của mã bộ phận sử dụng được chọn
     * @author Nguyen Van Thinh 07/11/2022
     */
    handleSelectData: function (index) {
      try {
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
        // refresh highlight index
        this.highlightIndex = -1;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * highlight vào dòng khi có sự kiện nhấn phím mũi tên xuống từ bàn phím
     * @author NVThinh (22/12/2022)
     */
    highlightNext: function (e) {
      if (e.target.nextElementSibling) {
        this.highlightIndex++;
        e.target.nextElementSibling.focus();
      }
    },

    /**
     * highlight vào dòng khi có sự kiện nhấn phím mũi tên lên từ bàn phím
     * @author NVThinh (22/12/2022)
     */
    highlightPrevious: function (e) {
      if (this.highlightIndex > 0) {
        this.highlightIndex--;
        e.target.previousElementSibling.focus();
      }
    },

    /**
     * @description display the options
     * @author NVT 26/12/2022
     */
    open: function () {
      this.isShow = true;
    },

    /**
     * @description hide the options
     * @author NVT 26/12/2022
     */
    close: function () {
      this.isShow = false;
    },

    /**
     * @description show/hide the options
     * @author NVT 26/12/2022
     */
    toggle: function () {
      this.isShow = !this.isShow;
    },

    /**
     * @description the state of option
     * @param {Number} index the index of option
     * @returns {Boolean} true if the option is focused
     * @author NVT 26/12/2022
     */
    isSelected: function (index) {
      return this.highlightIndex === index;
    },

    /**
     * @description Focus first option
     * @author NVThinh (26/12/2022)
     */
    focusFirstOption: function () {
      try {
        document.getElementById(`comboBox${this.field}0`).focus();
        if (this.isShow) this.highlightIndex++;
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      data: [], // the options
      val: "", // the value of input
      proxy: this, // chỉ định component này
      isShow: false, // Trạng thái ẩn hiện phần dữ liệu
      highlightIndex: -1, // Đánh chỉ mục cho các option được chọn
      // Các trường dữ liệu tương ứng trong Database
      fields: {
        id: this.field + "_id",
        code: this.field + "_code",
        name: this.field + "_name",
      },
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

.combobox__data .data:active,
.combobox__data .data:focus {
  background-color: var(--combobox__data);
}

.combobox--error {
  border-color: var(--input--error);
}
</style>