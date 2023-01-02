<template>
  <div id="popup--add" class="popup-wrapper" @keydown.esc="closePopup">
    <div class="center popup">
      <!-- Popup Header -->
      <div class="popup__header">
        <span>{{ title }}</span>
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
            <!-- ignore input -->
            <input ref="firstInput" class="ignoreInput" readonly />
            <!-- input 01 -->
            <Input
              :label-content="Label.fixed_asset_code"
              :max-length="maxLength.fixed_asset_code"
              :value="data[fields.fixed_asset_code]"
              :field="fields.fixed_asset_code"
              :is-error="errorMessages[fields.fixed_asset_code]"
              ref="secondInput"
              @update-input="updateInput"
              @keydown.tab="onShiftTab"
            ></Input>
          </div>
          <div class="popup__body--right">
            <!-- input 02 -->
            <Input
              :label-content="Label.fixed_asset_name"
              :is-error="errorMessages[fields.fixed_asset_name]"
              :max-length="maxLength.fixed_asset_name"
              :value="data.fixed_asset_name"
              :field="fields.fixed_asset_name"
              :placeholder="placeholder.fixed_asset_name"
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
              :label-content="Label.department_code"
              :placeholder="placeholder.department_code"
              :combobox-data="departments"
              :field="'department'"
              :max-length="maxLength.department"
              :value="data.department_code"
              :is-error="errorMessages[fields.department_code]"
              @update-combobox="updateCombobox"
            ></ComboboxDetail>
            <p
              v-show="errorMessages[fields.department_code]"
              class="error-message"
              v-html="Label.department_code + ' ' + Resource.ErrorMessage.blank"
            ></p>
          </div>
          <div class="popup__body--right">
            <!-- Input -->
            <label>{{ Label.department_name }}</label>
            <input
              class="input input--disabled"
              :value="data.department_name"
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
              :label-content="Label.fixed_asset_category_code"
              :is-error="errorMessages.fixed_asset_category_code"
              :placeholder="placeholder.asset_category_code"
              :combobox-data="fixedCategories"
              :field="'fixed_asset_category'"
              :max-length="maxLength.fixed_asset_category"
              :value="data.fixed_asset_category_code"
              @update-combobox="updateCombobox"
            ></ComboboxDetail>
            <p
              v-show="errorMessages[fields.fixed_asset_category_code]"
              class="error-message"
              v-html="
                Label.fixed_asset_category_code +
                ' ' +
                Resource.ErrorMessage.blank
              "
            ></p>
          </div>
          <!-- Input  -->
          <div class="popup__body--right">
            <label>{{ Label.fixed_asset_category_name }}</label>
            <input
              class="input input--disabled"
              :value="data[fields.fixed_asset_category_name]"
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
              :value="data.quantity"
              :min="1"
              @update-input="updateInput"
            />
          </div>
          <div class="popup__body--right">
            <div class="input-row">
              <div class="popup__body--left">
                <input-number
                  :labelContent="Label.cost"
                  :is-error="errorMessages[fields.cost]"
                  :field="fields.cost"
                  :mode="mode"
                  :value="data.cost"
                  :type="Enum.DataType.Money"
                  @update-input="updateInput"
                />
              </div>
              <div class="popup__body--right-child">
                <InputNumber
                  :label-content="Label.life_time"
                  :is-error="errorMessages.life_time"
                  :field="fields.life_time"
                  :type="Enum.DataType.Year"
                  :value="data.life_time"
                  @update-input="updateInput"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- Row 05: Ti le hao mon & Gia tri hao mon nam & Nam theo doi -->
        <div class="input-row">
          <div class="popup__body--left">
            <InputNumber
              :label-content="Label.depreciation_rate"
              :is-error="errorMessages.depreciation_rate"
              :field="fields.depreciation_rate"
              :type="Enum.DataType.Rate"
              :max-length="maxLength.depreciation_rate"
              :value="
                data.depreciation_rate ? data.depreciation_rate.toString() : '0'
              "
              @update-input="updateInput"
            ></InputNumber>
            <p class="error-message"></p>
          </div>
          <div class="popup__body--right">
            <div class="input-row">
              <div class="popup__body--left">
                <input-number
                  :labelContent="Label.depreciation_value"
                  :is-error="errorMessages[fields.depreciation_value]"
                  :field="fields.depreciation_value"
                  :value="depreciation_value"
                  :mode="mode"
                  :type="Enum.DataType.Money"
                  @update-input="updateInput"
                />
              </div>
              <div class="popup__body--right-child">
                <Input
                  :label-content="Label.tracked_year"
                  :type="Enum.DataType.Year"
                  :value="
                    data[fields.tracked_year]
                      ? data[fields.tracked_year].toString()
                      : '0'
                  "
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
                :value="data[fields.purchase_date]"
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
                    :value="data[fields.production_date]"
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
          ref="saveButton"
          @click="validateData"
          @keydown.enter="validateData"
        ></ButtonMain>
        <ButtonMain
          :title="Title.cancel"
          :button-content="Resource.ButtonContent.cancel"
          :type="Enum.Type.Secondary"
          @click="showDialogCancel"
          @keydown.enter="showDialogCancel"
          @keydown.tab="onTab"
        ></ButtonMain>
        <input ref="lastInput" class="ignoreInput" readonly />
      </div>
    </div>
  </div>
  <!-- Dialog validate dữ liệu -->
  <DialogValidate
    v-if="showDialogValidate"
    :required-data="requiredData"
    :dlg-type="this.dlgType"
    @close-dialog="showDialogValidate = false"
  ></DialogValidate>
  <!-- Dialog kiểm tra sự chắc chắn của việc đóng popup -->
  <DialogCancelVue
    v-if="isShowDlgCancel"
    :mode="mode"
    @close-dialog="isShowDlgCancel = false"
    @close-popup="this.$emit('close-popup')"
    @save-and-close="saveAndClose"
  ></DialogCancelVue>
</template>
  
  <script>
import DialogCancelVue from "@/components/base/dialogs/DialogCancel.vue";
import Input from "@/components/base/inputs/Input.vue";
import InputNumber from "@/components/base/inputs/InputNumber.vue";
import InputCalendar from "@/components/base/datepicker/InputCalendar.vue";
import ComboboxDetail from "@/components/base/comboboxes/ComboboxDetail.vue";
import ButtonMain from "@/components/base/buttons/ButtonMain.vue";
import DialogValidate from "@/components/base/dialogs/DialogValidate.vue";
import Resource from "@/js/resource/resource";
import Enum from "@/js/enum/enum";
import Function from "@/js/common/function";
import {
  createFixedAsset,
  editFixedAsset,
  getNewCode,
} from "@/apis/fixedAsset";

export default {
  name: "AssetDetail",

  props: {
    // Chế độ của popup
    mode: {
      type: Number,
      default: 0,
    },
    // Tiêu đề của popup
    title: {
      type: String,
      required: true,
    },
    // Đối tượng popup
    popupObj: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // Mảng bộ phận sử dụng
    departments: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // Mảng loại tài sản cố định
    fixedCategories: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },

  components: {
    Input,
    InputNumber,
    InputCalendar,
    ButtonMain,
    ComboboxDetail,
    DialogValidate,
    DialogCancelVue,
  },

  emits: [
    "close-popup",
    "show-toast",
    "show-error-toast",
    "reload-content",
    "update-table-row",
  ],

  created() {
    try {
      // Gán giá trị mặc định cho các trường cần thiết
      this.setDefaultValue();
      // Tự động lấy mã tài sản
      if (this.mode !== Enum.Mode.Update) this.getNewCode();
      if (this.mode != Enum.Mode.Add) {
        // Bind dữ liệu của table row được chọn vào popup object
        this.data = Object.assign(this.popupObj);
        // Khởi tạo giá trị hao mòn năm
        this.depreciation_value = Function.depreciationValue(
          this.data[this.fields.cost],
          this.data[this.fields.depreciation_rate]
        );
        // Cập nhật đối tượng popup
        this.data[this.fields.depreciation_value] = this.depreciation_value;
      }
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * Call API
   * @author Nguyen Van Thinh 05/11/2022
   */
  mounted() {
    try {
      // focus vào input đầu tiên
      this.focusFirstInput();
      // Khởi tạo đối tượng errorMessage
      for (const field in this.fields) {
        if (Resource.RequiredData[field])
          if (this.data[field] == undefined || this.data[field] == "")
            this.errorMessages[field] = false;
      }
      // Khởi tạo originalData (sau khi DOM được updated)
      this.$nextTick(function () {
        this.originalData = Object.assign({}, this.data);
      });
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    /**
     * @description press shift + tab when placed at the first input => focus the last button
     * @author NVT 26/12/2022
     */
    onShiftTab: function (e) {
      if (e.shiftKey) this.$refs.lastInput.focus();
    },

    /**
     * @description press tab when placed at the last button => focus the first input
     * @author NVT 26/12/2022
     */
    onTab: function (e) {
      if (!e.shiftKey) this.$refs.firstInput.focus();
    },

    /**
     * @description thực hiện hàm focusInput() của component có ref là "secondInput"
     * @author NVThinh 28/12/2022
     */
    focusFirstInput() {
      this.$refs.secondInput.focusInput();
    },

    /**
     * @description pass default values to new control
     * @author NVThinh 27/12/2022
     */
    setDefaultValue: function () {
      try {
        // init default value
        const defaultValue = {
          quantity: 1,
          depreciation_rate: 0,
          depreciation_value: 0,
          life_time: 0,
          tracked_year: Function.getCurrentYear(),
          purchase_date: Function.getCurrentDate(),
          production_date: Function.getCurrentDate(),
        };
        // Assign
        for (const property in defaultValue) {
          this.data[property] = defaultValue[property];
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description So sánh data và original data => Nếu khác nhau => Hiển thị dialog cảnh báo
     * @author Nguyen Van Thinh 11/11/2022
     */
    showDialogCancel: function () {
      try {
        if (Function.isObjectEqual(this.originalData, this.data))
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

    // Cập nhật dữ liệu nhận được từ component con (Input)
    updateInput: function (value, field) {
      try {
        // Cập nhật đối tượng popup
        this.data[field] = value;
        // Bỏ hiển thị lỗi
        this.errorMessages ? (this.errorMessages[field] = false) : "";
        // Cập nhật các giá trị tương ứng khi nguyên giá thay đổi
        switch (field) {
          case this.fields.cost:
          case this.fields.depreciation_rate:
            // Hao mòn năm
            this.depreciation_value = Function.depreciationValue(
              this.data[this.fields.cost],
              this.data[this.fields.depreciation_rate]
            );
            this.data[this.fields.depreciation_value] = this.depreciation_value;
            break;
          default:
            console.log(field, "is updated!");
            break;
        }
      } catch (error) {
        console.log(error);
      }
    },

    updateCombobox: function (data, field) {
      try {
        this.errorMessages[field] = false;
        if (field == this.fields.fixed_asset_category_code) {
          this.errorMessages[this.fields.life_time] = false;
        }
        for (let obj of data) {
          if (obj.value) {
            this.data[obj.field] = obj.value;
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
    validateData: async function () {
      try {
        // Thiết lập lại giá trị
        this.requiredData = [];
        // Kiểm tra thông tin yêu cầu
        for (const field in this.fields) {
          if (Resource.RequiredData[field])
            if (this.data[field] == undefined || this.data[field] == "") {
              this.requiredData.push(this.Label[field]);
              this.errorMessages[field] = true;
            }
        }
        // Validate nghiệp vụ (Thông tin hao mòn/Khấu hao)
        if (this.requiredData.length > 0) {
          this.dlgType = Enum.DlgType.RequiredInfo;
          // Hiển thị dialog
          this.showDialogValidate = true;
        } else {
          // Tỉ lệ hao mòn <> 1/Số năm sử dụng
          const depreciation_rate =
            (1 / this.data[this.fields.life_time]) * 100;
          if (
            this.data[this.fields.depreciation_rate].toFixed(2) !=
            depreciation_rate.toFixed(2)
          ) {
            this.showDlgValidate(Resource.WarningMessage.depreciation);
          } else {
            // Hao mòn năm > Nguyên giá
            if (
              this.data[this.fields.depreciation_value] >
              this.data[this.fields.cost]
            ) {
              this.showDlgValidate(
                Resource.WarningMessage.costAndDepreciationValue
              );
            } else {
              switch (this.mode) {
                case Enum.Mode.Add:
                case Enum.Mode.Duplicate:
                  // Call API tạo mới tài sản
                  await createFixedAsset(this.data)
                    .then(() => {
                      this.handleSuccessAPI();
                    })
                    .catch((res) => {
                      this.handleErrorAPI(res);
                    });
                  break;
                case Enum.Mode.Update:
                  // Gọi API cập nhật tài sản
                  await editFixedAsset(this.data.fixed_asset_id, this.data)
                    .then(() => {
                      this.handleSuccessAPI();
                    })
                    .catch((res) => {
                      this.handleErrorAPI(res);
                    });
                  // Gửi giá trị hao mòn năm lên table row để cập nhật hao mòn lũy kế và giá trị còn lại
                  this.$emit(
                    "update-table-row",
                    this.data[this.fields.cost], // Nguyên giá mới
                    this.depreciation_value
                  );
                  break;
                default:
                  console.log("Default!!!!!!");
                  break;
              }
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hiển thị Dialog cảnh báo
     * @param content nội dung cảnh báo
     * @author NVThinh 21-11-2022
     */
    showDlgValidate: function (content) {
      try {
        this.dlgType = Enum.DlgType.Describe;
        this.requiredData.push(content);
        this.showDialogValidate = true;
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
        getNewCode().then((res) => {
          // Gán vào đối tượng
          this.data[this.fields.fixed_asset_code] = res.data;
          this.originalData[this.fields.fixed_asset_code] = res.data;
        });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Xử lý khi có lỗi gửi về từ serve
     * @param {Object} res là res là response trả về từ client
     * @author NVThinh 27/11/2022
     */
    handleErrorAPI: function (res) {
      if (res.response.data.errorCode == Enum.ErrorCode.BadRequest) {
        for (const error of res.response.data.moreInfo) {
          this.requiredData.push(error);
        }
        this.showDialogValidate = true;
      } else {
        this.$emit("show-error-toast");
      }
    },

    handleSuccessAPI: function () {
      try {
        // reload lại trang
        this.$emit("reload-content");
        // Thiết lập toast thông báo
        let toastContent = "";
        switch (this.mode) {
          case Enum.Mode.Add:
            toastContent = Resource.ToastContent.Add.Success;
            break;
          case Enum.Mode.Update:
            toastContent = Resource.ToastContent.Update.Success;
            break;
          default:
            // Mặc định là nhân bản thông tin
            toastContent = Resource.ToastContent.Duplicate.Success;
            break;
        }
        // Gọi đến hàm hiển thị toast tại parent component (Content)
        this.$parent.showToast(Enum.ActionStatus.Success, toastContent);
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      Title: Resource.Title, // tooltip
      Label: Resource.PopupLabel, // the label of inputs
      data: {}, // the data of popup which contain pair field:key
      originalData: {}, // Được sinh ra để so sánh với data khi nhấn phím hủy => kiểm tra xem người dùng có tương tác với popup không
      placeholder: Resource.Placeholder, // placeholder of inputs
      maxLength: Resource.InputLength, // the maxlength of inputs
      fields: Resource.PopupField, // Các trường trong popup
      currentYear: Function.getCurrentYear(), // Năm hiện tại
      showDialogValidate: false, /// Hiển thị validate dialog
      isShowDlgCancel: false, // Trạng thái ẩn hiện Cancel dialog
      isShowToast: false, // Trạng thái ẩn hiện của toast
      dlgType: "blank", // Kiểu của dialog
      errorMessages: {}, // Đối tượng chứa các trường bắt buộc nhập
      depreciation_value: 0, // Giá trị hao mòn
      requiredData: [], // Mảng chứa những dữ liệu yêu cầu
      // Resources
      Resource,
      Enum,
      Function, // Các hàm chung
    };
  },
};
</script>
  
  <style scoped>
@import url(@/css/components/popup.css);
.ignoreInput {
  width: 0;
  height: 0;
  border: none;
}
</style>