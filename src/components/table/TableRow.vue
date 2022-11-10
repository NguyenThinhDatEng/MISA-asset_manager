<template>
  <tr
    :class="{ 'row--active': isActive }"
    @click="handleOnClickRow"
    @dblclick="OnClickFeatureButton('edit')"
  >
    <td class="checkbox__wrapper col--checkbox">
      <input type="checkbox" class="checkbox" :checked="isActive" />
    </td>
    <td class="col--stt">{{ i }}</td>
    <td class="col--asset-code">{{ obj.fixed_asset_code }}</td>
    <td class="col--asset-name">{{ obj.fixed_asset_name }}</td>
    <td class="col--asset-category">
      {{ obj.fixed_asset_category_name }}
    </td>
    <td class="col--department">{{ obj.department_name }}</td>
    <td class="col--quantity">{{ obj.quantity }}</td>
    <td class="col--cost">{{ Function.formatMoney(obj.cost) }}</td>
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
          @click="OnClickFeatureButton('edit')"
        ></div>
        <div
          class="icon icon--duplicate"
          :title="Title.duplicate"
          @click="OnClickFeatureButton('duplicate')"
        ></div>
      </div>
    </td>
  </tr>
  <Popup
    v-if="showPopup"
    :theTitle="setPopupTitle()"
    :obj="popupObject"
    :mode="Enum.Mode.Update"
    @close-popup="showPopup = false"
  ></Popup>
</template>

<script>
import Resource from "@/js/resource/resource";
import Enum from "@/js/enum/enum";
import Function from "@/js/common/function";
import Popup from "@/components/popups/PopupAsset.vue";

export default {
  name: "TableRow",
  components: { Popup },
  props: { obj: Object, i: Number, isCheckAll: Boolean },
  emits: ["update-row", "update-checked-header", "update-popup-object"],
  watch: {
    // Cập nhật trạng thái active của dòng
    isCheckAll: function () {
      this.isActive = this.isCheckAll;
    },
  },
  methods: {
    // Thay đổi tiêu đề của popup theo các hành động
    setPopupTitle: function () {
      try {
        if (this.action == "edit") return Resource.PopupTitle.edit;
        return Resource.PopupTitle.add;
      } catch (error) {
        console.log("Table Row", error);
      }
    },

    /**
     * Sự kiện nhấn vào tính năng chỉnh sửa hoặc nhân bản
     * @author Nguyen Van Thinh 05/11/2022
     */
    OnClickFeatureButton: function (action) {
      try {
        let controlObj = this.obj;
        controlObj.depreciation_value = this.depreciation_value;
        if (action == "edit") {
          // this.popupObj = controlObj;
          for (const field in this.fields) {
            this.popupObject[field] = controlObj[field];
          }
          console.log("@!@", this.popupObject);
        }
        this.showPopup = true;
        this.action = action;
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
        if (this.isActive == isNew) this.$emit("update-row", isNew, this.obj);
        else {
          if (this.isCheckAll == true)
            this.$emit("update-checked-header", false);
          this.$emit("update-row", !isNew, this.obj); // isNew == false
        }
        // console.log("Table Row", this.obj);
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
      isActive: false,
      action: "",
      depreciation_value: (this.obj.cost * this.obj.depreciation_rate) / 100,
      residual_value:
        this.obj.cost - (this.obj.cost * this.obj.depreciation_rate) / 100,
      popupObject: {},
    };
  },
};
</script>

<style scoped>
</style>