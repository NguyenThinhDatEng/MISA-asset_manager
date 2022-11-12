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
      {{ Function.formatMoney(depreciation_value) }}
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
  ></Popup>
  <ToastVue v-show="isShowToast" :mode="Enum.Mode.Update"></ToastVue>
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
        // Thiết lập kiểu popup hiển thị
        if (action == "edit") this.popupMode = Enum.Mode.Update;
        else this.popupMode = Enum.Mode.Duplicate;
        // Bind dữ liệu vào đối tượng Popup
        for (const field in this.fields) {
          this.popupObject[field] = this.tableRowObj[field];
        }
        // Cập nhật giá trị hao mòn năm
        this.popupObject[this.fields.depreciation_value] =
          (this.popupObject[this.fields.depreciation_rate] *
            this.popupObject[this.fields.cost]) /
          100;
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
      depreciation_value:
        (this.tableRowObj.cost * this.tableRowObj.depreciation_rate) / 100,
      residual_value:
        this.tableRowObj.cost -
        (this.tableRowObj.cost * this.tableRowObj.depreciation_rate) / 100,
      popupObject: {},
    };
  },
};
</script>

<style scoped>
</style>