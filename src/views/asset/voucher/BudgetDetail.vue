<template>
  <Popup
    :title="Resource.PopupTitle.edit + ' Xe Toyota'"
    @close-popup="$parent.closePopup"
  >
    <div class="popup__body__wrapper">
      <div class="row">
        <div class="row__left">
          <InputVue
            :style="['margin-bottom: 16px', 'width: 100%']"
            :label="Resource.InputLabel.department"
            :isRequired="false"
            :isDisabled="true"
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
                :hasIcon="false"
                :parent-class="'budgets__dropdown'"
                :value="obj.source"
                :dropdown-data="budgets"
                :field="'budget'"
              />
              <!-- Number Input -->
              <div class="value">
                <InputNumber
                  :type="Enum.DataType.Money"
                  :has-label="false"
                  :value="obj.value"
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
                :value="123654848"
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
  created() {},
  components: {
    Popup,
    InputNumber,
    InputVue,
    DropdownTickVue,
  },
  props: {},

  mounted() {
    getAllBudgets()
      .then((res) => (this.budgets = res.data))
      .catch((error) => console.log(error));
  },

  methods: {
    /**
     * @description xử lý sự kiện nhấn vào icon thêm mới nguồn hình thành
     * @author NVThinh 6/1/2023
     */
    addNewSource: function () {
      this.data.push({ source: "", value: "" });
    },

    /**
     * @description xử lý sự kiện nhấn vào icon xóa nguồn hình thành
     * @param index là chỉ số nguồn bị xóa
     * @author NVThinh 6/1/2023
     */
    removeSource: function (index) {
      console.log(index);
      // xóa tại vị trí index, 1 phần tử
      this.data.splice(index, 1);
    },

    isShowMinus: function () {
      return this.data.length > 1;
    },
  },
  data() {
    return {
      data: [
        { source: "Ngân sách tỉnh", value: "165115156" },
        { source: "Ngân sách huyện", value: "1515" },
        { source: "Ngân sách xã", value: "115155" },
      ], // Mảng chứa thông tin các nguồn và giá trị
      budgets: [], // Mảng chứa các nguồn hình thành
      // Resources
      Resource,
      TableResource,
      Enum,
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

.row + .source_and_value,
.row + .row {
  margin-top: 16px;
}

.row__left {
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