<template>
  <div :class="parentClass ? parentClass : ''">
    <div id="combobox--checked" class="combobox">
      <div class="dropdown__icon">
        <div class="icon center icon--18px icon--filter"></div>
      </div>
      <input
        type="text"
        class="input dropdown__input"
        :placeholder="placeholder"
        v-model="selectedValue"
        @click="isShow = !isShow"
      />
      <div class="combobox__button">
        <div class="icon center icon--down"></div>
      </div>
      <div class="dropdown__data" v-show="isShow">
        <Data
          v-for="item in dropdownData"
          :key="item[field + '_id']"
          :field="field"
          :obj="item"
          @click="handleOnClickData(item[field + '_id'])"
        ></Data>
      </div>
    </div>
  </div>
</template>

<script>
import Data from "./DataTick.vue";

export default {
  name: "DropdownTick",
  props: {
    parentClass: String,
    placeholder: String,
    field: String,
    dropdownData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  components: { Data },
  created() {
    try {
      // Ẩn dropdown khi click ra ngoài
      window.addEventListener("click", (e) => {
        if (!this.$el.contains(e.target)) {
          this.isHidden = true;
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
  watch: {
    dropdownData: function () {
      try {
        // Thêm thuộc tính active cho từng dòng dữ liệu trong dropdown
        for (let item of this.dropdownData) {
          item["isActive"] = false;
        }
        console.log("dropdownData", this.dropdownData);
      } catch (error) {
        console.log(error);
      }
    },
  },
  methods: {
    /**
     * Sự kiện chọn thông tin trong dropdown filter
     * @param {String} id định danh của loại dữ liệu
     * @author Nguyen Van Thinh 22/11/2022
     */
    handleOnClickData: function (id) {
      try {
        const IDField = this.field + "_id"; // Ex: department_id
        const nameField = this.field + "_name"; // Ex: department_name
        for (let obj of this.dropdownData) {
          if (id == obj[IDField]) {
            // Thay đổi trạng thái Active
            obj.isActive = !obj.isActive;
            // Cập nhật giá trị được chọn
            this.selectedValue = obj.isActive ? obj[nameField] : "";
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
  },
  data() {
    return {
      isShow: false, // trạng thái ẩn hiện Dropdown data
      data: [], // mảng dữ liệu
      selectedValue: "", // giá trị được chọn
    };
  },
};
</script>

<style scoped>
@import url(@/css/components/combobox.css);
@import url(@/css/icon.css);

.combobox {
  background-color: #fff;
}

.combobox:hover,
.combobox:focus-within {
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

.dropdown__input.input::placeholder {
  font-family: MISA Regular;
  color: #000;
}

.dropdown__icon {
  position: absolute;
  left: 6px;
  width: 24px;
  height: 24px;
}
</style>