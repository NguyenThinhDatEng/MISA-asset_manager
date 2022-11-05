<template>
  <tbody>
    <Row
      v-for="(asset, index) in assets"
      :key="index"
      :obj="asset"
      :i="index + 1"
      @update-row="UpdateRow"
    ></Row>
  </tbody>
</template>

<script>
import Row from "./TableRow.vue";
import resource from "@/resource/resource";

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
          this.assets = data;
        })
        .catch((error) => {
          console.log("Call get all assets API", error);
        });
    } catch (error) {
      console.log("Call get all assets API", error);
    }
  },
  components: { Row },
  methods: {
    /**
     * Thêm hoặc xóa tài sản khỏi mảng chứa các dòng được chọn
     * @param {Boolean} isNewRow true - thêm dòng mới, false - xóa dòng cũ
     * @param {Object} obj là tài sản được chọn
     * @author Nguyen Van Thinh 05/11/2022
     */
    UpdateRow: function (isNewRow, obj) {
      // Thêm dòng mới vào mảng
      if (isNewRow) this.selectedRows.push(obj);
      else {
        // Xóa tài sản khỏi mảng
        const length = this.selectedRows.length;
        for (let i = 0; i < length; i++) {
          if (this.selectedRows[i].fixed_asset_id == obj.fixed_asset_id) {
            this.selectedRows.splice(i, 1);
            break;
          }
        }
      }
      console.log("Table Body", this.selectedRows);
      // Bắn mảng các dòng được chọn lên cha của nó (Table)
      this.$emit("update-tr", this.selectedRows);
    },
  },
  data() {
    return { resource, assets: [], selectedRows: [], showPopup: false };
  },
};
</script>

<style scoped>
</style>