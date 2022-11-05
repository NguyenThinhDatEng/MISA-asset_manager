<template>
  <div id="popup--add" class="popup-wrapper">
    <div class="center popup">
      <!-- Popup Header -->
      <div class="popup__header">
        <span>{{ theTitle }}</span>
        <button
          class="icon icon-18px icon--close"
          :title="title.close"
          @click="hidePopup"
        ></button>
      </div>
      <!-- Popup body  -->
      <div class="popup__body">
        <!-- Row 01: Ma tai san & Ten tai san -->
        <div class="input-row">
          <div class="popup__body--left">
            <Input
              :label-content="label.asset_code"
              :maxlength="maxLength.asset_code"
            ></Input>
          </div>
          <div class="popup__body--right">
            <Input
              :label-content="label.asset_name"
              :maxlength="maxLength.asset_name"
            ></Input>
          </div>
        </div>
        <!-- Row 02: Ma bo phan su dung & Ten bo phan su dung -->
        <div class="input-row">
          <div class="popup__body--left">
            <label
              >{{ label.department_code }}
              <span style="color: red">*</span></label
            >
            <!-- Combobox  -->
            <ComboboxDetail
              :placeholder="placeholder.department_code"
              :data="departments"
              :field="'department'"
            ></ComboboxDetail>
            <p class="error-message"></p>
          </div>
          <div class="popup__body--right">
            <label>{{ label.department_name }}</label>
            <input type="text" class="input input--disabled" disabled />
          </div>
        </div>
        <!-- Row 03: Ma loai tai san & Ten loai tai san-->
        <div class="input-row">
          <div class="popup__body--left">
            <label
              >{{ label.fixed_asset_category_code }}
              <span style="color: red">*</span></label
            >
            <!-- Combobox  -->
            <ComboboxDetail
              :placeholder="placeholder.asset_category_code"
              :data="categories"
              :field="'fixed_asset_category'"
            ></ComboboxDetail>
            <p class="error-message"></p>
          </div>
          <!-- Disable input  -->
          <div class="popup__body--right">
            <label>{{ label.fixed_asset_category_name }}</label>
            <input type="text" class="input input--disabled" disabled />
          </div>
        </div>
        <!-- Row 04: So luong & Nguyen gia & So nam su dung -->
        <div class="input-row">
          <div class="popup__body--left">
            <InputNumber
              :label-content="label.quantity"
              :value="1"
            ></InputNumber>
          </div>
          <div class="popup__body--right">
            <div class="input-row">
              <div class="popup__body--left">
                <Input :label-content="label.cost" :type="'number'"></Input>
              </div>
              <div class="popup__body--right-child">
                <Input
                  :label-content="label.life_time"
                  :type="'number'"
                ></Input>
              </div>
            </div>
          </div>
        </div>
        <!-- Row 05: Ti le hao mon & Gia tri hao mon nam & Nam theo doi -->
        <div class="input-row">
          <div class="popup__body--left">
            <InputNumber
              :label-content="label.depreciation_rate"
              :value="0"
            ></InputNumber>
            <p class="error-message"></p>
          </div>
          <div class="popup__body--right">
            <div class="input-row">
              <div class="popup__body--left">
                <Input
                  :label-content="label.depreciation_value"
                  :type="'number'"
                ></Input>
              </div>
              <div id="year-tracking" class="popup__body--right-child">
                <Input
                  :label-content="label.tracked_year"
                  :type="'number'"
                  :value="getCurrentYear()"
                  :isDisabled="true"
                ></Input>
              </div>
            </div>
          </div>
        </div>
        <!-- Row 06: Ngay mua & Ngay bat dau su dung -->
        <div class="input-row">
          <div class="popup__body--left">
            <DatePickerVue></DatePickerVue>
            <p class="error-message"></p>
          </div>
          <div class="popup__body--right">
            <div class="input-row">
              <div class="popup__body--left">
                <span mandatory
                  >Ngày bắt đầu sử dụng <span style="color: red">*</span></span
                >
                <div class="popup-date">
                  <input type="date" class="input" value="2022-10-12" />
                  <button class="button--icon__wrapper">
                    <div class="icon icon-item center icon_calendar"></div>
                  </button>
                </div>
                <p class="error-message"></p>
              </div>
              <div class="popup__body--right-child"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- Popup footer  -->
      <div class="popup__footer">
        <button class="button button--save" :title="title.save">Lưu</button>
        <button
          class="button button--cancel"
          :title="title.cancel"
          @click="hidePopup"
        >
          Hủy
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import resource from "@/resource/resource";
import Input from "@/components/inputs/Input.vue";
import InputNumber from "@/components/inputs/NumberInput.vue";
import ComboboxDetail from "../comboboxes/ComboboxDetail.vue";
import DatePickerVue from "../inputs/DatePicker.vue";

export default {
  name: "PopupAsset",
  components: { Input, ComboboxDetail, InputNumber, DatePickerVue },
  /**
   * Call API
   * @author Nguyen Van Thinh 05/11/2022
   */
  mounted() {
    try {
      // Lay tat ca bo phan su dung
      fetch(resource.URLs.department, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.departments = data;
        })
        .catch((error) => {
          console.log("Call get all departments API", error);
        });

      // Lay tat ca loai tai san
      fetch(resource.URLs["asset-type"], {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // Gan data thu duoc vao du lieu cua component
          this.categories = data;
        })
        .catch((error) => {
          console.log("Call get all asset categories API", error);
        });
    } catch (error) {
      console.log(error);
    }
  },
  props: {
    theTitle: {
      type: String,
      default: resource.PopupTitle.add,
    },
  },
  emits: [],
  methods: {
    // Đóng popup bằng cách bắn dữ liệu lên parent
    hidePopup() {
      this.$emit("close-popup");
    },

    getCurrentYear: function () {
      return new Date().getFullYear();
    },
  },
  data() {
    return {
      title: resource.Title,
      label: resource.PopupLabel,
      placeholder: resource.Placeholder,
      maxLength: resource.InputLength,
      departments: [],
      categories: [],
    };
  },
};
</script>

<style scoped>
@import url(@/css/base.css);
</style>