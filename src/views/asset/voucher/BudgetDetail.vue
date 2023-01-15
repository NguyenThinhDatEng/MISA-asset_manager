<template>
  <Popup :title="getTitle()" @close-popup="close" @on-save="validate">
    <div class="popup__body__wrapper">
      <div class="row">
        <div class="row__left">
          <InputVue
            :style="['margin-bottom: 16px', 'width: 100%']"
            :label="Resource.InputLabel.department"
            :value="voucherAsset.department_name"
            :isRequired="false"
            :isDisabled="true"
            :field="'department'"
          />
        </div>
      </div>
      <div class="budgets">
        <div class="text--bold">Nguyên giá</div>
        <!-- row -->
        <div class="row">
          <div class="row__left">
            <div class="budgets__dropdown">Nguồn hình thành</div>
            <div>Giá trị</div>
          </div>
        </div>
        <!-- rows -->
        <div class="source_and_value">
          <div class="row" v-for="(obj, index) of data" :key="index">
            <div class="row__left">
              <!-- Fixed asset categories filter -->
              <DropdownTickVue
                :parent-class="'budgets__dropdown'"
                :field="'budget'"
                :hasIcon="false"
                :value="obj.budget_name"
                :dropdown-data="budgets"
                :index="index"
                :isError="obj.dropdownError"
                :errorMessage="obj.dropdownMessageError"
                ref="dropdown"
                @update-dropdown="updateDropdown"
              />
              <!-- Number Input -->
              <div class="value">
                <InputNumber
                  :type="Enum.DataType.Money"
                  :has-label="false"
                  :value="obj.value"
                  :index="index"
                  :isError="obj.inputError"
                  :errorMessage="errorMessage.isRequired"
                  @update-input="updateInput"
                />
              </div>
            </div>
            <!-- Icon -->
            <div class="row__right">
              <!-- add value -->
              <div class="icon-item_wrapper" @click="addNewSource">
                <div class="icon center icon--plus-in-square icon--18px"></div>
              </div>
              <!-- remove value -->
              <div
                v-show="isShowMinus()"
                class="icon-item_wrapper"
                @click="removeSource(index)"
              >
                <div class="icon center icon--minus-in-circle icon--18px"></div>
              </div>
            </div>
          </div>
        </div>
        <!-- row -->
        <div class="row">
          <div class="row__left">
            <InputVue
              :style="['margin-right: 8px', 'width: 60%']"
              :hasLabel="false"
              :isDisabled="true"
              :value="'Tổng'"
            />
            <!-- Number Input -->
            <div class="value">
              <InputNumber
                :type="Enum.DataType.Money"
                :has-label="false"
                :input-class="'input--disabled'"
                :value="total"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Popup>
</template>
    
    <script>
// Components
import Popup from "@/components/base/popup/VPopup.vue";
import DropdownTickVue from "@/components/base/dropdowns/DropdownTick.vue";
import InputNumber from "@/components/base/inputs/InputNumber.vue";
import InputVue from "@/components/base/inputs/Input.vue";
// Resources
import Resource from "@/js/resource/resource";
import TableResource from "@/js/resource/tableResource";
import Enum from "@/js/enum/enum";
import { getAllBudgets } from "@/apis/voucher/budget";

export default {
  name: "BudgetDetail",
  components: {
    Popup,
    InputNumber,
    InputVue,
    DropdownTickVue,
  },
  props: {
    voucherAsset: {
      type: Object,
      isRequired: true,
    },
  },
  emits: ["update-budget"],

  created() {
    try {
      console.log(this.voucherAsset);
      // Khởi tạo mảng dữ liệu
      if (this.voucherAsset.budgets == null) {
        this.data = [
          {
            ...this.defaultBudget,
            value: this.voucherAsset.cost,
            dropdownMessageError: this.errorMessage.isRequired,
          },
        ];
        return;
      }
      // Khởi tạo dữ liệu ngân sách
      const budgetList = JSON.parse(this.voucherAsset.budgets);
      // Cập nhật mảng các dòng dữ liệu
      this.data = budgetList.map((obj) => {
        return {
          budget_name: obj.budget_name,
          value: obj.value,
          inputError: false,
          dropdownError: false,
          dropdownMessageError: this.errorMessage.isRequired,
        };
      });
    } catch (error) {
      console.log(error);
    }
  },

  mounted() {
    getAllBudgets()
      .then((res) => (this.budgets = res.data))
      .catch((error) => console.log(error));
  },

  watch: {
    isChanged: function () {
      // console.log(this.isChanged);
    },
  },

  methods: {
    /**
     * @description Lấy tiêu để của popup
     * @return {String} tên tiêu đề popup
     * @author NVThinh 8/1/2023
     */
    getTitle: function () {
      return (
        Resource.PopupTitle.edit + " " + this.voucherAsset.fixed_asset_name
      );
    },

    /**
     * @description xử lý sự kiện nhấn vào icon thêm mới nguồn hình thành
     * @author NVThinh 6/1/2023
     */
    addNewSource: function () {
      // Thêm dữ liệu mặc định
      this.data.push({
        budget_name: "",
        value: 0,
        inputError: false,
        dropdownError: false,
        dropdownMessageError: this.errorMessage.isRequired,
      });
      // refresh dropdown
      this.refreshDropdown();
    },

    /**
     * @description xử lý sự kiện nhấn vào icon xóa nguồn hình thành
     * @param index là chỉ số nguồn bị xóa
     * @author NVThinh 6/1/2023
     */
    removeSource: function (index) {
      // Tính lại tổng giá trị
      this.total -= this.data[index].value;
      // xóa tại vị trí index, 1 phần tử
      this.data.splice(index, 1);
    },

    /**
     * @description Hiển thị nút xóa nguồn hình thành
     * @author NVThinh 11/1/2023
     */
    isShowMinus: function () {
      return this.data.length > 1;
    },

    /**
     * @description (emit) cập nhật dữ liệu khi dữ liệu trong input thay đổi
     * @param {Number} value giá trị của ô input
     * @param {String} field trường dữ liệu
     * @param {Number} index chỉ số input trong mảng
     * @author NVThinh 11/1/2023
     */
    updateInput: function (value, field, index) {
      // Đánh dấu dữ liệu đã được cập nhật
      this.isChanged = true;
      // Cập nhật dữ liệu
      if (value != 0) {
        this.data[index].inputError = false;
      }
      this.data[index].value = value;
      this.updateTotal();
    },

    /**
     * @description Cập nhật giá trị khi dropdown nhận giá trị mới
     * @param {String} value Giá trị được chọn
     * @param {Number} index Chỉ số của dropdown
     * @author NVThinh 11/1/2023
     */
    updateDropdown: function (value, index) {
      try {
        // Cập nhật dữ liệu
        this.data[index].budget_name = value;
        this.data[index].dropdownError = false;
        // Làm mới các options được chọn của dropdown
        this.refreshDropdown();
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description validate các trường còn thiếu
     * @author NVThinh 11/1/2023
     */
    validate: function () {
      try {
        if (!this.hasError()) {
          // Cập nhật ngân sách
          let tmpArr = this.data.map((obj) => {
            return { budget_name: obj.budget_name, value: obj.value };
          });
          this.newBudgets = JSON.stringify(tmpArr);
          // Gửi dữ liệu đến component cha (id tài sản, tổng nguyên giá, ngân sách)
          this.$emit(
            "update-budget",
            this.voucherAsset.fixed_asset_id,
            this.total,
            this.newBudgets,
            this.isChanged
          );
          // Đóng component này
          this.close();
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description Kiểm tra xem nguồn hình thành có bị trùng không
     * @author NVThinh 13/1/2023
     */
    checkDuplicate: function (budgetName, index) {
      for (let i = 0; i < index; i++) {
        const budget_name = this.data[i].budget_name;
        if (
          budget_name != "" &&
          budgetName.toLowerCase().includes(budget_name.toLowerCase())
        ) {
          return true;
        }
      }
      return false;
    },

    /**
     * @description Cập nhật lỗi
     * @return {Boolean} true nếu có lỗi trên giao diện
     * @author NVThinh 13/1/2023
     */
    hasError: function () {
      try {
        // Cập nhật lỗi
        for (let i = 0; i < this.data.length; i++) {
          this.data[i].inputError = this.data[i].value ? false : true;
          if (this.data[i].budget_name == "") {
            this.data[i].dropdownError = true;
            this.data[i].dropdownMessageError = this.errorMessage.isRequired;
          } else {
            // Kiểm tra trùng nguồn hình thành
            if (this.checkDuplicate(this.data[i].budget_name, i)) {
              this.data[i].dropdownError = true;
              this.data[i].dropdownMessageError =
                this.errorMessage.isDuplicated;
            } else {
              this.data[i].dropdownError = false;
            }
          }
        }
        // Trả về
        for (const obj of this.data) {
          if (obj.inputError == true || obj.dropdownError == true) {
            return true;
          }
        }
        return false;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description Bỏ tất cả active trong dropdown data
     * @author NVThinh 13/1/2023
     */
    refreshDropdown: function () {
      try {
        // refresh dropdown
        for (const obj of this.$refs.dropdown) {
          if (!obj.selectedValue) obj.clear();
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description đóng popup hiện tại
     * @author NVThinh 13/1/2023
     */
    close: function () {
      try {
        this.$parent.closePopup();
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description Cập nhật tổng của tất cả các nguồn hình thành
     * @author NVThinh 13/1/2023
     */
    updateTotal: function () {
      // Cập nhật tổng
      this.total = this.data.reduce((accumulator, obj) => {
        return accumulator + Number(obj.value);
      }, 0);
    },
  },

  data() {
    return {
      data: [], // Mảng chứa thông tin các nguồn và giá trị
      budgets: [], // Mảng chứa các nguồn hình thành
      total: 0, // Tổng nguyên giá
      newBudgets: "", // Ngân sách của tài sản
      isChanged: false, // true nếu người dùng có tương tác với dữ liệu
      // Resources
      Resource,
      TableResource,
      Enum,
      defaultBudget: {
        budget_name: "",
        value: 0,
        inputError: false,
        dropdownError: false,
      }, // đối tượng ngân sách mặc định
      errorMessage: {
        isRequired: "Không được bỏ trống ô này!",
        isDuplicated: "Nguồn chi phí đã tồn tại",
      }, // Các thông báo lỗi có thể hiển thị
    };
  },
};
</script>
    
    <style scoped>
.popup__body__wrapper {
  padding: 0 16px 16px;
}

.text--bold {
  font-family: MISA Bold;
  padding-bottom: 16px;
}

.row {
  display: flex;
}

.row + .source_and_value {
  margin-top: 16px;
}

.row + .row {
  margin-top: 20px;
}

.row__left {
  position: relative;
  display: flex;
  width: 70%;
}

.budgets__dropdown {
  position: relative;
  width: 60%;
  margin-right: 8px;
}

.value {
  flex: 1;
}

.icon-item_wrapper {
  width: 36px;
  height: 36px;
  cursor: pointer;
}

.row__right {
  display: flex;
  flex: 1;
}

.row__left + .row__right {
  margin-left: 9px;
}

.source_and_value {
  height: 250px;
  margin-bottom: 16px;
  overflow-y: auto;
}
</style>