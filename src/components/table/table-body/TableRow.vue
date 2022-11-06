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
    <td class="col--cost">{{ formatMoney(obj.cost) }}</td>
    <td class="col--depreciation">{{ formatMoney(depreciation_value) }}</td>
    <td class="col--residual_value">{{ formatMoney(residual_value) }}</td>
    <td class="col--feature">
      <div class="feature">
        <div
          class="icon icon--edit"
          :title="title.edit"
          @click="OnClickFeatureButton('edit')"
        ></div>
        <div
          class="icon icon--duplicate"
          :title="title.duplicate"
          @click="OnClickFeatureButton('duplicate')"
        ></div>
      </div>
    </td>
  </tr>
  <Popup
    v-if="showPopup"
    :theTitle="setPopupTitle()"
    @close-popup="showPopup = false"
    :obj="popupObj"
  ></Popup>
</template>

<script>
import resource from "@/resource/resource";
import Popup from "@/components/popups/PopupAsset.vue";

export default {
  name: "TableRow",
  components: { Popup },
  props: { obj: Object, i: Number },
  methods: {
    // Thay đổi tiêu đề của popup theo các hành động
    setPopupTitle: function () {
      try {
        if (this.action == "edit") return resource.PopupTitle.edit;
        return resource.PopupTitle.add;
      } catch (error) {
        console.log("Table Row", error);
      }
    },

    // Định dạng cho dữ liệu kiểu tiền
    formatMoney: function (money) {
      try {
        var formatter = new Intl.NumberFormat("de-DE");
        return formatter.format(Math.round(money));
      } catch (error) {
        console.log("Tham số truyền vào không đúng định dạng");
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
          this.popupObj = controlObj;
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
        // Bắn dữ liệu lên Table body
        if (this.isActive == false) this.$emit("update-row", true, this.obj);
        // isNew == true
        else {
          this.$emit("update-row", false, this.obj); // isNew == false
        }
        this.isActive = !this.isActive;
        console.log("Table Row", this.obj);
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      resource,
      title: resource.Title,
      showPopup: false,
      isActive: false,
      action: "",
      depreciation_value: (this.obj.cost * this.obj.depreciation_rate) / 100,
      residual_value:
        this.obj.cost - (this.obj.cost * this.obj.depreciation_rate) / 100,
      popupObj: {},
    };
  },
};
</script>

<style scoped>
</style>