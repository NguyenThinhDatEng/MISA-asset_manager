<template>
  <tr
    :class="{ 'row--active': isActive }"
    @click="handleOnClickRow"
    @dblclick="carryOutFeature('edit')"
  >
    <td class="checkbox__wrapper col--checkbox">
      <input type="checkbox" class="checkbox" :checked="isActive" />
    </td>
    <td class="col--stt">{{ index }}</td>
    <td class="col--asset-code">{{ tableRowObj.fixed_asset_code }}</td>
    <td class="col--asset-name">{{ tableRowObj.fixed_asset_name }}</td>
    <td class="col--asset-category">
      {{ tableRowObj.fixed_asset_category_name }}
    </td>
    <td class="col--department">{{ tableRowObj.department_name }}</td>
    <td class="col--quantity">{{ tableRowObj.quantity }}</td>
    <td class="col--cost">{{ Function.formatMoney(tableRowObj.cost) }}</td>
    <td class="col--depreciation">
      {{ Function.formatMoney(accumulated_depreciation) }}
    </td>
    <td class="col--residual_value">
      {{ Function.formatMoney(residual_value) }}
    </td>
    <td class="col--feature">
      <div class="feature">
        <div
          class="icon icon--edit"
          :title="Title.edit"
          @click="carryOutFeature('edit')"
        ></div>
        <div
          class="icon icon--duplicate"
          :title="Title.duplicate"
          @click="carryOutFeature('duplicate')"
        ></div>
      </div>
    </td>
  </tr>
  <Popup
    v-if="showPopup"
    :mode="popupMode"
    :tableRowObj="popupObject"
    :fixedAssetID="tableRowObj.fixed_asset_id"
    @close-popup="showPopup = false"
    @show-toast="isShowToast = true"
    @reload-content="this.$emit('reload-content')"
    @update-table-row="updateTableRow"
  ></Popup>
  <ToastVue v-if="isShowToast" :mode="Enum.Mode.Update"></ToastVue>
</template>

<script>
import Resource from "@/js/resource/resource";
import Enum from "@/js/enum/enum";
import Function from "@/js/common/function";
import Popup from "@/components/popups/PopupAsset.vue";
import ToastVue from "@/components/toast/ToastVue.vue";

export default {
  name: "TableRow",
  components: { Popup, ToastVue },
  props: { tableRowObj: Object, index: Number, isCheckAll: Boolean },
  created() {
    // Cập nhật giá trị hao mòn năm
    const depreciation_value = Function.depreciationValue(
      this.tableRowObj.cost,
      this.tableRowObj.depreciation_rate
    );

    // Cập nhật giá trị hao mòn lũy kế
    this.accumulated_depreciation = Function.accumulatedDepreciation(
      depreciation_value,
      this.tableRowObj.production_date
    );

    // Cập nhật giá trị còn lại
    this.residual_value = this.tableRowObj.cost - this.accumulated_depreciation;
  },
  emits: [
    "update-row",
    "update-checked-header",
    "update-popup-object",
    "reload-content",
  ],
  watch: {
    // Cập nhật trạng thái active của dòng
    isCheckAll: function () {
      this.isActive = this.isCheckAll;
    },
    isShowToast: function () {
      setTimeout(() => {
        this.isShowToast = false;
      }, 1500);
    },
  },
  methods: {
    /**
     * Sự kiện nhấn vào tính năng chỉnh sửa hoặc nhân bản
     * @author Nguyen Van Thinh 05/11/2022
     */
    carryOutFeature: function (action) {
      try {
        // Bind dữ liệu vào đối tượng Popup
        for (const field in this.fields) {
          this.popupObject[field] = this.tableRowObj[field];
        }
        // Thiết lập kiểu popup hiển thị
        if (action == "edit") this.popupMode = Enum.Mode.Update;
        else {
          this.popupMode = Enum.Mode.Duplicate;
        }
        // Hiển thị Popup
        this.showPopup = true;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Sự kiện nhấn vào 1 dòng
     * @author Nguyen Van Thinh 05/11/2022
     */
    handleOnClickRow: function () {
      try {
        const isNew = true;
        // Thay đổi trạng thái của dòng
        this.isActive = !this.isActive;
        // Nếu dòng được active, bắn đối tượng đến Table
        if (this.isActive == isNew)
          this.$emit("update-row", isNew, this.tableRowObj);
        else {
          if (this.isCheckAll == true)
            this.$emit("update-checked-header", false);
          this.$emit("update-row", !isNew, this.tableRowObj); // isNew == false
        }
        // console.log("Table Row", this.tableRowObj);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Cập nhật hao mòn lũy kế và giá trị còn lại khi nguyên giá thay đổi
     * @param {double} depreciation_value giá trị hao mòn năm
     */
    updateTableRow: function (cost, depreciation_value) {
      try {
        // Cập nhật hao mòn lũy kế
        this.accumulated_depreciation = Function.accumulatedDepreciation(
          depreciation_value,
          this.tableRowObj.production_date
        );
        // Cập nhật giá trị còn lại
        this.residual_value = cost - this.accumulated_depreciation;
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      Resource,
      fields: Resource.PopupField,
      Function,
      Enum,
      Title: Resource.Title,
      showPopup: false,
      isShowToast: false,
      isActive: false,
      popupMode: 0,
      accumulated_depreciation: 0,
      residual_value: 0,
      popupObject: {},
    };
  },
};
</script>

<style scoped>
</style>