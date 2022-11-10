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
              :label-content="Label.fixed_asset_code"
              :maxlength="maxLength.fixed_asset_code"
              :value="obj.fixed_asset_code"
              :field="fields.fixed_asset_code"
              @update-input="updateInput"
            ></Input>
          </div>
          <div class="popup__body--right">
            <!-- input 02 -->
            <Input
              :label-content="Label.fixed_asset_name"
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
              >{{ Label.department_code }}
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
            <p class="error-message" v-show="isShowError">
              {{ Label.department_code + " " + Resource.ErrorMessage.blank }}
            </p>
          </div>
          <div class="popup__body--right">
            <!-- Input -->
            <label>{{ Label.department_name }}</label>
            <input
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
              >{{ Label.fixed_asset_category_code }}
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
            <p class="error-message" v-show="isShowError">
              {{ Label.department_code + " " + Resource.ErrorMessage.blank }}
            </p>
          </div>
          <!-- Input  -->
          <div class="popup__body--right">
            <label>{{ Label.fixed_asset_category_name }}</label>
            <input
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
              :label-content="Label.quantity"
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
                  :label-content="Label.cost"
                  :type="Enum.DataType.Money"
                  :value="obj.cost || popupObject.cost"
                  :field="fields.cost"
                  @update-input="updateInput"
                ></Input>
              </div>
              <div class="popup__body--right-child">
                <Input
                  :label-content="Label.life_time"
                  :type="Enum.DataType.Number"
                  :value="obj.life_time || popupObject.life_time"
                  :field="fields.life_time"
                  @update-input="updateInput"
                ></Input>
              </div>
            </div>
          </div>
        </div>
        <!-- Row 05: Ti le hao mon & Gia tri hao mon nam & Nam theo doi -->
        <div class="input-row">
          <div class="popup__body--left">
            <InputNumber
              :label-content="Label.depreciation_rate"
              :value="
                popupObject.depreciation_rate || obj.depreciation_rate || 0
              "
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
                  :label-content="Label.depreciation_value"
                  :type="Enum.DataType.Money"
                  :value="
                    obj.depreciation_value || popupObject.depreciation_value
                  "
                  :field="fields.depreciation_value"
                ></Input>
              </div>
              <div class="popup__body--right-child">
                <Input
                  :label-content="Label.tracked_year"
                  :type="Enum.DataType.Year"
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
              >{{ Label.purchase_date }}
              <span style="color: red">*</span></label
            >
            <div class="popup__date">
              <InputCalendar
                @update-input="updateInput"
                :field="fields.purchase_date"
              ></InputCalendar>
            </div>
            <p class="error-message"></p>
          </div>
          <div class="popup__body--right">
            <div class="input-row">
              <div class="popup__body--left">
                <label
                  >{{ Label.production_date }}
                  <span style="color: red">*</span></label
                >
                <div class="popup__date">
                  <InputCalendar
                    @update-input="updateInput"
                    :field="fields.production_date"
                  ></InputCalendar>
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
          @click="validateData"
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

  <DialogValidate
    v-if="showDialogValidate"
    :required-data="requiredData"
    :category="this.dlgValidateCategory"
    @close-dialog="showDialogValidate = false"
  ></DialogValidate>
</template>

<script>
import Resource from "@/js/resource/resource";
import Enum from "@/js/enum/enum";
import Function from "@/js/common/function";
import Input from "@/components/inputs/Input.vue";
import InputNumber from "@/components/inputs/NumberInput.vue";
import ComboboxDetail from "../comboboxes/ComboboxDetail.vue";
import ButtonMain from "@/components/buttons/ButtonMain.vue";
import InputCalendar from "@/components/datepicker/InputCalendar.vue";
import DialogValidate from "@/components/dialogs/DialogValidate.vue";

export default {
  name: "PopupAsset",
  components: {
    Input,
    ComboboxDetail,
    InputNumber,
    ButtonMain,
    InputCalendar,
    DialogValidate,
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
    mode: Number,
  },
  watch: {
    popupObject: function () {
      console.log("@!@", this.popupObject);
    },
    obj: function () {
      console.log("@!@", this.obj);
      this.popupObject = this.obj;
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
  emits: ["close-popup", "show-toast"],
  methods: {
    /**
     * Emit: Đóng popup
     * @author Nguyen Van Thinh 11/11/2022
     */
    closePopup: function () {
      try {
        this.$emit("close-popup");
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Emit: Hiển thị toast thông báo
     * @author Nguyen Van Thinh 11/11/2022
     */
    showToast: function () {
      try {
        this.$emit("show-toast");
        this.closePopup();
      } catch (error) {
        console.log(error);
      }
    },

    // Cập nhật dữ liệu nhận được từ component con (Input)
    updateInput: function (value, field) {
      try {
        this.popupObject[field] = value;
        if (field == this.fields.cost)
          this.popupObject[this.fields.depreciation_value] =
            (value * this.popupObject[this.fields.depreciation_rate]) / 100;
        console.log(this.popupObject);
      } catch (error) {
        console.log(error);
      }
    },

    updateCombobox: function (data) {
      try {
        for (let obj of data) {
          if (obj.value) {
            this.popupObject[obj.field] = obj.value;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Validate dữ liệu khi nhấn vào nút lưu
     * @author Nguyen Van Thinh 09/11/2022
     */
    validateData: function () {
      try {
        // Thiết lập lại giá trị
        this.requiredData = [];
        // Kiểm tra thông tin yêu cầu
        for (const field in this.fields) {
          // console.log("@!@", this.popupObject[field], this.Label[field]);
          if (Resource.RequiredData[field])
            if (
              this.popupObject[field] == undefined ||
              this.popupObject[field] == ""
            )
              this.requiredData.push(this.Label[field]);
        }
        // Kiểm tra sự phù hợp dữ liệu
        if (this.requiredData.length > 0) {
          // Hiển thị dialog
          this.showDialogValidate = true;
        } else {
          const depreciation_rate =
            (1 / this.popupObject[this.fields.life_time]) * 100;
          if (
            this.popupObject[this.fields.depreciation_rate].toFixed(2) !=
            depreciation_rate.toFixed(2)
          ) {
            this.dlgValidateCategory = "depreciation";
            this.requiredData.push(Resource.WarningMessage.depreciation);
            this.showDialogValidate = true;
          }
          // Hiển thị toast thông báo và đóng popup
          this.showToast();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      Resource,
      Title: Resource.Title,
      Label: Resource.PopupLabel,
      placeholder: Resource.Placeholder,
      maxLength: Resource.InputLength,
      Enum,
      Function,
      currentYear: Function.getCurrentYear(),
      showDialogValidate: false,
      isShowToast: false,
      dlgValidateCategory: "blank",
      isShowError: false,
      departments: [],
      categories: [],
      popupObject: {},
      requiredData: [],
      fields: Resource.PopupField,
    };
  },
};
</script>

<style scoped>
@import url(@/css/base.css);
</style>