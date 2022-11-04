<template>
  <tbody>
    <Row
      v-for="(asset, index) in assets"
      :key="index"
      :obj="asset"
      :i="index + 1"
      @click="handleOnClickRow(asset)"
      @dblclick="handleOnDblClickRow(asset)"
    ></Row>
  </tbody>
  <Popup
    v-if="showPopup"
    :title="resource.PopupTitle.edit"
    @close-popup="showPopup = false"
  ></Popup>
</template>

<script>
import Row from "./TableRow.vue";
import resource from "@/resource/resource";
import Popup from "@/components/popups/PopupAsset.vue";

export default {
  name: "TableBody",
  mounted() {
    /**
     * Call API lấy tất cả bản ghi tài sản
     * Author: Nguyen Van Thinh 2/11/2022
     */
    try {
      fetch(resource.URLs.getAllAsset, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // Thêm thuộc tính active cho từng dòng dữ liệu trong dropdown
          for (let item of data) {
            item["isActive"] = false;
          }
          this.assets = data;
          //   console.log(this.assets);
        })
        .catch((error) => {
          console.log("Call get all assets API", error);
        });
    } catch (error) {
      console.log("Call get all assets API", error);
    }
  },
  components: { Row, Popup },
  methods: {
    /**
     * Thêm hoặc xóa tài sản khỏi mảng chứa các dòng được chọn
     * @param {Object} asset đối tượng tài sản được click
     */
    handleOnClickRow: function (asset) {
      // Thêm tài sản vào mảng khi nhấn vào dòng chưa được chọn
      if (asset.isActive == false) this.selectedRows.push(asset);
      else {
        // Xóa tài sản khỏi mảng khi nhấn vào dòng đang được chọn
        const length = this.selectedRows.length;
        for (let i = 0; i < length; i++) {
          if (this.selectedRows[i].fixed_asset_id == asset.fixed_asset_id) {
            this.selectedRows.splice(i, 1);
            break;
          }
        }
      }
      // Bắn mảng các dòng được chọn lên thanh công cụ (sidebar)
      this.$emit("update-tr", this.selectedRows);
      console.log("Table body", this.selectedRows);
      // Thay đổi trạng thái active của dòng
      asset.isActive = !asset.isActive;
    },

    handleOnDblClickRow: function (asset) {
      this.showPopup = true;
      // Thay đổi trạng thái active của dòng
      asset.isActive = !asset.isActive;
    },
  },
  data() {
    return { resource, assets: [], selectedRows: [], showPopup: false };
  },
};
</script>

<style scoped>
</style>