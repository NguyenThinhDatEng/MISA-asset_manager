<template>
  <div id="popup--add" class="popup-wrapper">
    <div class="center popup">
      <!-- Popup Header -->
      <div class="popup__header">
        <span>{{ theTitle }}</span>
        <button
          class="icon icon-18px icon--close"
          :title="Title.close"
          @click="hidePopup"
        ></button>
      </div>
      <!-- Popup body  -->
      <div class="popup__body">
        <!-- Row 01: Ma tai san & Ten tai san -->
        <div class="input-row">
          <div class="popup__body--left">
            <!-- input 01 -->
            <Input
              :label-content="label.asset_code"
              :maxlength="maxLength.asset_code"
              :value="obj.fixed_asset_code"
            ></Input>
          </div>
          <div class="popup__body--right">
            <!-- input 02 -->
            <Input
              :label-content="label.asset_name"
              :maxlength="maxLength.asset_name"
              :value="obj.fixed_asset_name"
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
            <!-- Combobox -->
            <ComboboxDetail
              :placeholder="placeholder.department_code"
              :data="departments"
              :field="'department'"
              :value="obj.department_code"
            ></ComboboxDetail>
            <p class="error-message"></p>
          </div>
          <div class="popup__body--right">
            <!-- Input -->
            <label>{{ label.department_name }}</label>
            <input
              type="text"
              class="input input--disabled"
              :value="obj.department_name"
              disabled
            />
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
              :value="obj.fixed_asset_category_code"
            ></ComboboxDetail>
            <p class="error-message"></p>
          </div>
          <!-- Input  -->
          <div class="popup__body--right">
            <label>{{ label.fixed_asset_category_name }}</label>
            <input
              type="text"
              class="input input--disabled"
              :value="obj.fixed_asset_category_name"
              disabled
            />
          </div>
        </div>
        <!-- Row 04: So luong & Nguyen gia & So nam su dung -->
        <div class="input-row">
          <div class="popup__body--left">
            <InputNumber
              :label-content="label.quantity"
              :value="obj.quantity"
            ></InputNumber>
          </div>
          <div class="popup__body--right">
            <div class="input-row">
              <div class="popup__body--left">
                <Input
                  :label-content="label.cost"
                  :type="'number'"
                  :value="formatMoney(obj.cost)"
                ></Input>
              </div>
              <div class="popup__body--right-child">
                <Input
                  :label-content="label.life_time"
                  :type="'number'"
                  :value="obj.life_time"
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
              :value="obj.depreciation_rate"
            ></InputNumber>
            <p class="error-message"></p>
          </div>
          <div class="popup__body--right">
            <div class="input-row">
              <div class="popup__body--left">
                <Input
                  :label-content="label.depreciation_value"
                  :type="'number'"
                  :value="formatMoney(obj.depreciation_value)"
                ></Input>
              </div>
              <div class="popup__body--right-child">
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
            <label
              >{{ label.purchase_date }}
              <span style="color: red">*</span></label
            >
            <el-date-picker />
            <p class="error-message"></p>
          </div>
          <div class="popup__body--right">
            <div class="input-row">
              <div class="popup__body--left">
                <label
                  >{{ label.production_date }}
                  <span style="color: red">*</span></label
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
        <ButtonMain
          :title="Title.save"
          :button-content="Resource.ButtonContent.save"
          :type="Enum.Type.Main"
        ></ButtonMain>
        <ButtonMain
          :title="Title.cancel"
          :button-content="Resource.ButtonContent.cancel"
          :type="Enum.Type.Secondary"
        ></ButtonMain>
      </div>
    </div>
  </div>
</template>

<script>
import Resource from "@/js/resource/resource";
import Enum from "@/js/enum/enum";
import Input from "@/components/inputs/Input.vue";
import InputNumber from "@/components/inputs/NumberInput.vue";
import ComboboxDetail from "../comboboxes/ComboboxDetail.vue";
import ButtonMain from "@/components/buttons/ButtonMain.vue";
// import { DatePicker } from "element-plus";

export default {
  name: "PopupAsset",
  components: { Input, ComboboxDetail, InputNumber, ButtonMain },
  /**
   * Call API
   * @author Nguyen Van Thinh 05/11/2022
   */
  mounted() {
    try {
      // Lay tat ca bo phan su dung
      fetch(Resource.URLs.department, {
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
      fetch(Resource.URLs["asset-type"], {
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
      default: Resource.PopupTitle.add,
    },
    obj: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  emits: [],
  methods: {
    // Định dạng cho dữ liệu kiểu tiền
    formatMoney: function (money) {
      var formatter = new Intl.NumberFormat("de-DE");
      return formatter.format(Math.round(money));
    },

    // Đóng popup bằng cách bắn dữ liệu lên class cha
    hidePopup() {
      this.$emit("close-popup");
    },

    // Lấy năm hiện tại
    getCurrentYear: function () {
      return new Date().getFullYear();
    },
  },
  data() {
    return {
      Resource,
      Enum,
      Title: Resource.Title,
      label: Resource.PopupLabel,
      placeholder: Resource.Placeholder,
      maxLength: Resource.InputLength,
      departments: [],
      categories: [],
    };
  },
};
</script>

<style scoped>
@import url(@/css/base.css);
</style>