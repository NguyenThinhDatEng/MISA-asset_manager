<template>
  <div :class="parentClass ? parentClass : ''">
    <div class="dropdown" :style="[{ 'padding-left: 14px': !hasIcon }]">
      <!-- Icon -->
      <div v-if="hasIcon" class="dropdown__icon">
        <div class="icon center icon--18px icon--filter"></div>
      </div>
      <!-- input  -->
      <input
        type="text"
        :class="[
          'input',
          { dropdown__input: hasIcon },
          { 'dropdown__input--no-icon': !hasIcon },
        ]"
        :placeholder="placeholder"
        v-model="selectedValue"
        @click="toggle"
      />
      <!-- button  -->
      <div class="dropdown__button" @click="toggle">
        <!-- icon -->
        <div class="icon center icon--down"></div>
      </div>
      <!-- The options of dropdown -->
      <div class="dropdown__data" v-show="isShow">
        <Data
          v-for="item in data"
          :key="item[fields.id]"
          :field="field"
          :obj="item"
          @click="handleOnClickData(item[fields.id])"
        ></Data>
      </div>
    </div>
  </div>
</template>

<script>
import Data from "./DataTick.vue";
import Constants from "@/js/common/constants";
import Function from "@/js/common/function";

export default {
  // =========================== Declaration =========================
  name: "DropdownTick",
  props: {
    dropdownData: {
      type: Array,
      default: () => {
        return [];
      },
    }, // Các options của dropdown
    hasIcon: {
      type: Boolean,
      default: true,
    }, // Có icon
    value: {
      type: String,
      default: "",
    }, // Giá trị đầu vào
    index: {
      type: Number,
      default: 0,
    },
    parentClass: String,
    placeholder: String,
    field: String,
  },
  components: { Data },
  emits: ["update-filter", "update-dropdown"],
  // ================================ Methods ==========================
  created() {
    // Ẩn dropdown khi click ra ngoài
    window.addEventListener("click", (e) => {
      if (!this.$el.contains(e.target)) {
        this.isShow = false;
      }
    });
    // Cập nhật giá trị đầu vào
    this.selectedValue = this.value;
    // Cập nhật mảng dữ liệu
    this.data = this.dropdownData;
  },

  watch: {
    // Nếu prop dropdownData được cập nhật
    dropdownData: function () {
      try {
        // Cập nhật mảng dữ liệu
        this.data = this.dropdownData;
        // Thêm thuộc tính active cho từng dòng dữ liệu trong dropdown
        for (let item of this.data) {
          item["isActive"] = false;
        }
      } catch (error) {
        console.log(error);
      }
    },

    // Nếu giá trị input cập nhật
    selectedValue: function (newVal, oldVal) {
      try {
        this.data = Function.autoComplete(
          this.selectedValue,
          this.dropdownData,
          this.fields.name
        );
        // Nếu ô input không còn giá trị => reload lại trang
        if (!newVal && oldVal && this.active) {
          this.clear();
        }
      } catch (error) {
        console.log(error);
      }
    },

    // Cập nhật giá trị hiển thị khi giá trị đầu vào thay đổi
    value: function () {
      this.selectedValue = this.value;
    },
  },
  methods: {
    /**
     * @description Ẩn/hiện data options
     * @author NVThinh 6/1/2023
     */
    toggle: function () {
      this.isShow = !this.isShow;
    },

    /**
     * Sự kiện chọn thông tin trong dropdown filter
     * @param {String} id định danh của loại dữ liệu
     * @author Nguyen Van Thinh 22/11/2022
     */
    handleOnClickData: function (id) {
      try {
        const idField = this.fields.id; // Ex: department_id
        const nameField = this.fields.name; // Ex: department_name
        for (let obj of this.dropdownData) {
          if (id == obj[idField]) {
            // Thay đổi trạng thái Active
            obj.isActive = !obj.isActive;
            this.active = obj.isActive;
            // Cập nhật giá trị được chọn và gửi giá trị cập nhật lên Content
            if (obj.isActive) {
              this.selectedValue = obj[nameField];
              this.$emit("update-filter", idField, obj[idField]);
            } else {
              this.selectedValue = "";
              this.$emit("update-filter", idField, Constants.GUID.EMPTY);
            }
            this.$emit("update-dropdown", this.selectedValue, this.index);
            // Gửi giá trị cập nhật đến cha
          } else {
            obj.isActive = false;
          }
        }
        // Ẩn Data Combobox
        this.isShow = false;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description làm mới dropdown (xóa tất cả các dòng được tick)
     * @author NVThinh 6/1/2023
     */
    clear: function () {
      try {
        // reload
        this.$emit("update-filter", this.fields.id, Constants.GUID.EMPTY);
        for (let obj of this.dropdownData) {
          obj.isActive = false;
        }
        this.active = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      isShow: false, // trạng thái ẩn hiện Dropdown data
      selectedValue: "", // giá trị được chọn
      data: [], // mảng dữ liệu
      active: false, // true nếu có 1 option được chọn
      // Các trường dữ liệu
      fields: {
        id: this.field + "_id",
        name: this.field + "_name",
      },
    };
  },
};
</script>

<style scoped>
@import url(@/css/components/dropdown.css);

.dropdown {
  position: relative;
  display: flex;
  align-items: center;
  outline: none;
  height: 36px;
  border: 1px solid #afafaf;
  border-radius: 2.5px;
}

.dropdown:hover,
.dropdown:focus-within {
  border: 1px solid var(--input--hover);
}

.dropdown__data {
  position: absolute;
  top: calc(100% + 1px);
  width: 100%;
  max-height: 200px;
  border-radius: 2.5px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
  line-height: 36px;
  background-color: #fff;
  overflow: auto;
  z-index: 2;
}

.dropdown__input {
  position: absolute;
  flex: 1;
  left: 39px;
}

.dropdown__input--no-icon {
  position: absolute;
  flex: 1;
  padding-left: 14px;
  height: 100%;
  width: calc(100% - 36px);
}

.dropdown__input--no-icon.input::placeholder,
.dropdown__input.input::placeholder {
  font-family: MISA Regular;
  color: #000;
}

.dropdown__button {
  position: absolute;
  right: 0;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 2.5px;
  background-color: transparent;
}

.dropdown__icon {
  position: absolute;
  left: 6px;
  width: 24px;
  height: 24px;
}

.input {
  border: none;
}
</style>