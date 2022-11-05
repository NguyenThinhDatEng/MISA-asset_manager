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
    <td class="col--cost">{{ obj.cost }}</td>
    <td class="col--depreciation">{{ obj.depreciation_rate }}</td>
    <td class="col--residual-value">100</td>
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
  ></Popup>
</template>

<script>
import resource from "@/resource/resource";
import Popup from "@/components/popups/PopupAsset.vue";

export default {
  name: "TableRow",
  components: { Popup },
  props: { obj: Object, i: Number },
  emits: [],
  methods: {
    // Thay đổi tiêu đề của popup theo các hành động
    setPopupTitle: function () {
      if (this.action == "edit") return resource.PopupTitle.edit;
      return resource.PopupTitle.add;
    },

    OnClickFeatureButton: function (action) {
      this.showPopup = true;
      this.action = action;
    },

    /**
     * Sự kiện nhấn vào 1 dòng
     * @author Nguyen Van Thinh 05/11/2022
     */
    handleOnClickRow: function () {
      // Bắn dữ liệu lên Table body
      if (this.isActive == false) this.$emit("update-row", true, this.obj);
      // isNew == true
      else {
        this.$emit("update-row", false, this.obj); // isNew == false
      }
      this.isActive = !this.isActive;
      console.log("Table Row", this.obj);
    },
  },
  data() {
    return {
      resource,
      title: resource.Title,
      showPopup: false,
      isActive: false,
      action: "",
    };
  },
};
</script>

<style scoped>
</style>