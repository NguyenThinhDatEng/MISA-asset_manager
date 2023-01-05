<template>
  <div v-if="isShow" class="popup-wrapper" @keydown.esc="close">
    <div class="center popup">
      <!-- Popup Header -->
      <div class="popup__header">
        <span>{{ title }}</span>
        <button
          class="icon icon-18px icon--close"
          :title="Title.close"
          @click="close()"
        ></button>
      </div>
      <!-- Popup body  -->
      <div class="popup__body">
        <slot />
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
</template>
    
    <script>
// Resources
import Resource from "@/js/resource/resource";
import Enum from "@/js/enum/enum";
import Function from "@/js/common/function";
//Components
import ButtonMain from "@/components/base/buttons/ButtonMain.vue";

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
    // Ẩn/hiện popup
    isShow: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    ButtonMain,
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

    /**
     * @description Đóng popup
     * @author NVThinh 5/1/2023
     */
    close: function () {
      this.$emit("close-popup");
    },
  },
  data() {
    return {
      data: {}, // the data of popup which contain pair field:key
      originalData: {}, // Được sinh ra để so sánh với data khi nhấn phím hủy => kiểm tra xem người dùng có tương tác với popup không
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
      Title: Resource.Title, // tooltip
      Label: Resource.PopupLabel, // the label of inputs
      Placeholder: Resource.Placeholder, // placeholder of inputs
      MaxLength: Resource.InputLength, // the maxlength of inputs
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