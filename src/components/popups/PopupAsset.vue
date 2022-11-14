<template>
  <div id="popup--add" class="popup-wrapper" v-on:keyup.esc="closePopup">
    <div class="center popup">
      <!-- Popup Header -->
      <div class="popup__header">
        <span>{{ theTitle }}</span>
        <button
          class="icon icon-18px icon--close"
          :title="Title.close"
          @click="showDialogCancel"
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
              :value="popupObject[fields.fixed_asset_code]"
              :field="fields.fixed_asset_code"
              :isFocus="true"
              @update-input="updateInput"
            ></Input>
          </div>
          <div class="popup__body--right">
            <!-- input 02 -->
            <Input
              :label-content="Label.fixed_asset_name"
              :maxlength="maxLength.asset_name"
              :value="tableRowObj.fixed_asset_name"
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
              :value="tableRowObj.department_code"
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
              :value="
                tableRowObj.department_name || popupObject.department_name
              "
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
              :value="tableRowObj.fixed_asset_category_code"
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
                tableRowObj.fixed_asset_category_name ||
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
              :field="fields.quantity"
              :value="popupObject[fields.quantity].toString()"
              @update-input="updateInput"
            ></InputNumber>
          </div>
          <div class="popup__body--right">
            <div class="input-row">
              <div class="popup__body--left">
                <InputMoney
                  :labelContent="Label.cost"
                  :field="fields.cost"
                  :mode="mode"
                  :value="popupObject[fields.cost]"
                  @update-input="updateInput"
                ></InputMoney>
              </div>
              <div class="popup__body--right-child">
                <Input
                  :label-content="Label.life_time"
                  :type="Enum.DataType.Number"
                  :value="popupObject[fields.life_time]"
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
              :field="fields.depreciation_rate"
              :type="Enum.DataType.Rate"
              :maxlength="5"
              :value="popupObject[fields.depreciation_rate].toString()"
              @update-input="updateInput"
            ></InputNumber>
            <p class="error-message"></p>
          </div>
          <div class="popup__body--right">
            <div class="input-row">
              <div class="popup__body--left">
                <InputMoney
                  :labelContent="Label.depreciation_value"
                  :field="fields.depreciation_value"
                  :value="depreciation_value"
                  :mode="mode"
                  @update-input="updateInput"
                ></InputMoney>
              </div>
              <div class="popup__body--right-child">
                <Input
                  :label-content="Label.tracked_year"
                  :type="Enum.DataType.Year"
                  :value="popupObject[fields.tracked_year].toString()"
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
                :field="fields.purchase_date"
                :mode="mode"
                :value="tableRowObj[fields.purchase_date]"
                @update-input="updateInput"
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
                    :field="fields.production_date"
                    :mode="mode"
                    :value="tableRowObj[fields.production_date]"
                    @update-input="updateInput"
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
          @click="showDialogCancel"
        ></ButtonMain>
      </div>
    </div>
  </div>

  <DialogValidate
    v-if="showDialogValidate"
    :required-data="requiredData"
    :dlg-type="this.dlgType"
    @close-dialog="showDialogValidate = false"
  ></DialogValidate>

  <DialogCancelVue
    v-if="isShowDlgCancel"
    :mode="mode"
    @close-dialog="isShowDlgCancel = false"
    @close-popup="this.$emit('close-popup')"
    @save-and-close="saveAndClose"
  ></DialogCancelVue>
</template>

<script>
import DialogCancelVue from "../dialogs/DialogCancel.vue";
import Input from "@/components/inputs/Input.vue";
import InputNumber from "../inputs/InputNumber.vue";
import InputMoney from "../inputs/InputMoney.vue";
import InputCalendar from "@/components/datepicker/InputCalendar.vue";
import ComboboxDetail from "../comboboxes/ComboboxDetail.vue";
import ButtonMain from "@/components/buttons/ButtonMain.vue";
import DialogValidate from "@/components/dialogs/DialogValidate.vue";
import axios from "axios";
import Resource from "@/js/resource/resource";
import Enum from "@/js/enum/enum";
import Function from "@/js/common/function";

export default {
  name: "PopupAsset",
  components: {
    Input,
    InputMoney,
    InputNumber,
    InputCalendar,
    ButtonMain,
    ComboboxDetail,
    DialogValidate,
    DialogCancelVue,
  },
  props: {
    tableRowObj: {
      type: Object,
      default: () => {
        return {};
      },
    },
    mode: Number,
    fixedAssetID: String,
  },
  created() {
    try {
      switch (this.mode) {
        // Chế dộ chỉnh sửa và nhân bản
        case Enum.Mode.Duplicate:
        case Enum.Mode.Update:
          this.theTitle = Resource.PopupTitle.edit;
          // Bind dữ liệu của table row được chọn vào popup object
          for (let prop in this.tableRowObj) {
            this.popupObject[prop] = this.tableRowObj[prop];
          }
          // Cập nhật giá trị hao mòn năm
          this.depreciation_value = Function.depreciationValue(
            this.popupObject[this.fields.cost],
            this.popupObject[this.fields.depreciation_rate]
          );
          // Cập nhật đối tượng popup
          this.popupObject[this.fields.depreciation_value] =
            this.depreciation_value;
          // Khởi tạo đối tượng ban đầu
          this.initObj = Object.assign({}, this.popupObject);
          // Làm tròn Hao mòn năm
          this.initObj[this.fields.depreciation_value] = Math.round(
            this.depreciation_value
          );
          // Chuyển đổi cùng kiểu dữ liệu ngày tháng năm
          this.initObj[this.fields.purchase_date] = new Date(
            this.initObj[this.fields.purchase_date]
          ).toISOString();
          this.initObj[this.fields.production_date] = new Date(
            this.initObj[this.fields.production_date]
          ).toISOString();
          if (this.mode == Enum.Mode.Duplicate) {
            // Thiết lập title popup
            this.theTitle = Resource.PopupTitle.duplicate;
            // Gọi API lấy mã mới tài sản
            this.getNewCode();
          }
          break;
        // Thêm mới nhân viên
        default:
          // Thiết lập title popup
          this.theTitle = Resource.PopupTitle.add;
          // Gọi API lấy mã mới tài sản
          this.getNewCode();
          // Khởi tạo giá trị mặc định cho popup Object
          for (let prop in this.defaultValue) {
            this.popupObject[prop] = this.defaultValue[prop];
          }
          // Khởi tạo đối tượng ban đầu
          this.initObj = Object.assign({}, this.popupObject);
          break;
      }
      // console.log("popupObject in created", this.popupObject);
      // console.log("initObj in created", this.initObj);
    } catch (error) {
      console.log(error);
    }
  },
  emits: ["close-popup", "show-toast", "reload-content", "update-table-row"],
  watch: {},
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

  methods: {
    /**
     * Emit: Đóng popup
     * @author Nguyen Van Thinh 11/11/2022
     */
    showDialogCancel: function () {
      try {
        if (Function.isObjectEqual(this.initObj, this.popupObject))
          this.$emit("close-popup");
        else this.isShowDlgCancel = true;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Emit: Cập nhật thông tin và đóng dialog
     * @author Nguyen Van Thinh 11/11/2022
     */
    saveAndClose: function () {
      try {
        this.isShowDlgCancel = false;
        this.validateData();
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
        this.$emit("close-popup");
      } catch (error) {
        console.log(error);
      }
    },

    // Cập nhật dữ liệu nhận được từ component con (Input)
    updateInput: function (value, field) {
      try {
        this.popupObject[field] = value;
        // Cập nhật các giá trị tương ứng khi nguyên giá thay đổi
        switch (field) {
          case this.fields.cost:
          case this.fields.depreciation_rate:
            // Hao mòn năm
            this.depreciation_value = Function.depreciationValue(
              this.popupObject[this.fields.cost],
              this.popupObject[this.fields.depreciation_rate]
            );
            this.popupObject[this.fields.depreciation_value] =
              this.depreciation_value;
            break;
          default:
            console.log(field, "is updated!");
            break;
        }
        console.log("Popup Object", this.popupObject);
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
        // Validate nghiệp vụ (Thông tin hao mòn/Khấu hao)
        if (this.requiredData.length > 0) {
          this.dlgType = Enum.DlgType.RequiredInfo;
          // Hiển thị dialog
          this.showDialogValidate = true;
          console.log("!!!");
        } else {
          // Tỉ lệ hao mòn <> 1/Số năm sử dụng
          const depreciation_rate =
            (1 / this.popupObject[this.fields.life_time]) * 100;
          if (
            this.popupObject[this.fields.depreciation_rate].toFixed(2) !=
            depreciation_rate.toFixed(2)
          ) {
            this.dlgType = Enum.DlgType.Describe;
            this.requiredData.push(Resource.WarningMessage.depreciation);
            this.showDialogValidate = true;
            console.log("!!!!!");
          } else {
            // Hao mòn năm > Nguyên giá
            if (
              this.popupObject[this.fields.depreciation_value] >
              this.popupObject[this.fields.cost]
            ) {
              this.dlgType = Enum.DlgType.Describe;
              this.requiredData.push(
                Resource.WarningMessage.costAndDepreciationValue
              );
              this.showDialogValidate = true;
              console.log("!!!!!!!");
            } else {
              switch (this.mode) {
                case Enum.Mode.Add:
                case Enum.Mode.Duplicate:
                  // Call API tạo mới tài sản
                  this.insertAsset();
                  break;
                case Enum.Mode.Update:
                  // Gọi API cập nhật tài sản
                  this.updateAsset(this.fixedAssetID);
                  // Gửi giá trị hao mòn năm lên table row để cập nhật hao mòn lũy kế và giá trị còn lại
                  this.$emit(
                    "update-table-row",
                    this.popupObject[this.fields.cost], // Nguyên giá mới
                    this.depreciation_value
                  );
                  break;
                default:
                  console.log("Default!!!!!!");
                  break;
                // }
              }
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * API tạo mới tài sản
     * @author Nguyen Van Thinh 11/11/2022
     */
    insertAsset: async function () {
      try {
        const res = await axios.post(
          "http://localhost:11799/api/v1/FixedAssets",
          this.popupObject
        );
        console.log("result of get all assets", res);
        // Hiển thị toast thông báo và đóng popup
        this.showToast();
        // Gửi thông báo load lại trang
        this.$emit("reload-content");
        // Đóng popup
        this.$emit("close-popup");
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * API cập nhật tài sản
     * @author Nguyen Van Thinh 12/11/2022
     */
    updateAsset: async function (fixedAssetID) {
      try {
        const res = await axios.put(
          "http://localhost:11799/api/v1/FixedAssets/" + fixedAssetID,
          this.popupObject
        );
        console.log("result of update an asset", res);
        // Hiển thị toast thông báo và đóng popup
        this.showToast();
        // Gửi thông báo load lại trang
        this.$emit("reload-content");
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * API lấy mã mới tài sản
     * @author Nguyen Van Thinh 12/11/2022
     */
    getNewCode: async function () {
      try {
        const res = await axios.get(
          "http://localhost:11799/api/v1/FixedAssets/newAssetCode"
        );
        console.log("Result of Get new asset code", res);
        // Gán vào đối tượng
        this.popupObject[this.fields.fixed_asset_code] = res.data;
        this.initObj[this.fields.fixed_asset_code] = res.data;
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
      Label: Resource.PopupLabel,
      placeholder: Resource.Placeholder,
      maxLength: Resource.InputLength,
      fields: Resource.PopupField,
      theTitle: "",
      currentYear: Function.getCurrentYear(),
      showDialogValidate: false,
      isShowDlgCancel: false,
      isShowToast: false,
      dlgType: "blank",
      isShowError: false,
      depreciation_value: 0,
      departments: [],
      categories: [],
      popupObject: {
        created_by: "Nguyễn Văn Thịnh",
        modified_by: "Nguyễn Văn Thịnh",
      },
      initObj: {},
      requiredData: [],
      defaultValue: {
        quantity: 1,
        depreciation_rate: 0,
        depreciation_value: 0,
        tracked_year: Function.getCurrentYear(),
        purchase_date: Function.getCurrentDate(),
        production_date: Function.getCurrentDate(),
      },
    };
  },
};
</script>

<style scoped>
@import url(@/css/base.css);
</style>