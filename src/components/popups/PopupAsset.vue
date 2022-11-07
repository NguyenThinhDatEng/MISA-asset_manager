<template>
  <div id="popup--add" class="popup-wrapper">
    <div class="center popup">
      <!-- Popup Header -->
      <div class="popup__header">
        <span>{{ theTitle }}</span>
        <button
          class="icon icon-18px icon--close"
          :title="Title.close"
          @click="closePopup"
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
              :field="fields.fixed_asset_code"
              @update-input="updateInput"
            ></Input>
          </div>
          <div class="popup__body--right">
            <!-- input 02 -->
            <Input
              :label-content="label.asset_name"
              :maxlength="maxLength.asset_name"
              :value="obj.fixed_asset_name"
              :field="fields.fixed_asset_name"
              @update-input="updateInput"
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
              @update-combobox="updateCombobox"
            ></ComboboxDetail>
            <p class="error-message"></p>
          </div>
          <div class="popup__body--right">
            <!-- Input -->
            <label>{{ label.department_name }}</label>
            <input
              type="text"
              class="input input--disabled"
              :value="obj.department_name || popupObject.department_name"
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
              @update-combobox="updateCombobox"
            ></ComboboxDetail>
            <p class="error-message"></p>
          </div>
          <!-- Input  -->
          <div class="popup__body--right">
            <label>{{ label.fixed_asset_category_name }}</label>
            <input
              type="text"
              class="input input--disabled"
              :value="
                obj.fixed_asset_category_name ||
                popupObject.fixed_asset_category_name
              "
              disabled
            />
          </div>
        </div>
        <!-- Row 04: So luong & Nguyen gia & So nam su dung -->
        <div class="input-row">
          <div class="popup__body--left">
            <InputNumber
              :label-content="label.quantity"
              :value="obj.quantity || 1"
              :field="fields.quantity"
              :mode="mode"
              @update-input="updateInput"
            ></InputNumber>
          </div>
          <div class="popup__body--right">
            <div class="input-row">
              <div class="popup__body--left">
                <Input
                  :label-content="label.cost"
                  :type="'number'"
                  :value="Function.formatMoney(obj.cost)"
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
              :value="obj.depreciation_rate || 0"
              :field="fields.depreciation_rate"
              :mode="mode"
              @update-input="updateInput"
            ></InputNumber>
            <p class="error-message"></p>
          </div>
          <div class="popup__body--right">
            <div class="input-row">
              <div class="popup__body--left">
                <Input
                  :label-content="label.depreciation_value"
                  :type="'number'"
                  :value="Function.formatMoney(obj.depreciation_value)"
                ></Input>
              </div>
              <div class="popup__body--right-child">
                <Input
                  :label-content="label.tracked_year"
                  :type="'number'"
                  :value="obj.tracked_year"
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
            <div class="popup__date">
              <input type="date" class="input" value="2022-10-12" />
              <button class="button--icon__wrapper">
                <div class="icon icon-item center icon--calendar"></div>
              </button>
            </div>
            <p class="error-message"></p>
          </div>
          <div class="popup__body--right">
            <div class="input-row">
              <div class="popup__body--left">
                <label
                  >{{ label.production_date }}
                  <span style="color: red">*</span></label
                >
                <div class="popup__date">
                  <input type="date" class="input" value="2022-10-12" />
                  <button class="button--icon__wrapper">
                    <div class="icon icon-item center icon--calendar"></div>
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
          @click="closePopup"
        ></ButtonMain>
      </div>
    </div>
  </div>
</template>

<script>
import Resource from "@/js/resource/resource";
import Enum from "@/js/enum/enum";
import Function from "@/js/common/function";
import Input from "@/components/inputs/Input.vue";
import InputNumber from "@/components/inputs/NumberInput.vue";
import ComboboxDetail from "../comboboxes/ComboboxDetail.vue";
import ButtonMain from "@/components/buttons/ButtonMain.vue";

export default {
  name: "PopupAsset",
  components: { Input, ComboboxDetail, InputNumber, ButtonMain },
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
    mode: Number,
  },
  watch: {
    popupObject: function () {
      console.log(this.popupObject);
    },
  },
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
          // console.log("@!@", this.departments);
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
  emits: ["close-popup"],
  methods: {
    // Đóng popup bằng cách phát tín hiệu lên class cha
    closePopup: function () {
      try {
        this.$emit("close-popup");
      } catch (error) {
        console.log(error);
      }
    },

    updateInput: function (value, field) {
      try {
        this.popupObject[field] = value;
        console.log(this.popupObject);
      } catch (error) {
        console.log(error);
      }
    },

    updateCombobox: function (val1, field1, val2, field2) {
      try {
        this.popupObject[field1] = val1;
        this.popupObject[field2] = val2;
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      Resource,
      Enum,
      Function,
      Title: Resource.Title,
      label: Resource.PopupLabel,
      placeholder: Resource.Placeholder,
      maxLength: Resource.InputLength,
      departments: [],
      categories: [],
      popupObject: {},
      fields: {
        fixed_asset_code: "fixed_asset_code",
        fixed_asset_name: "fixed_asset_name",
        department_code: "department_code",
        department_name: "department_name",
        fixed_asset_category_code: "fixed_asset_category_code",
        fixed_asset_category_name: "fixed_asset_category_name",
        quantity: "quantity",
        cost: "cost",
        life_time: "life_time",
        depreciation_rate: "depreciation_rate",
        depreciation_value: "depreciation_value",
        tracked_year: "tracked_year",
        purchase_date: "purchase_date",
        production_date: "production_date",
      },
    };
  },
};
</script>

<style scoped>
@import url(@/css/base.css);
</style>