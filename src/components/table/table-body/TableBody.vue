<template>
  <tbody>
    <Row
      v-for="(asset, index) in assets"
      :key="index"
      :obj="asset"
      :i="index + 1"
      :is-check-all="checkAll"
      @update-row="UpdateRow"
    ></Row>
  </tbody>
</template>

<script>
import Row from "./TableRow.vue";
import resource from "@/resource/resource";

export default {
  name: "TableBody",
  components: { Row },
  props: { checkAll: Boolean },
  emits: ["disabled-button"],
  watch: {
    /**
     * Giám sát trạng thái chọn tất cả và cập nhật mảng dữ liệu
     * @author Nguyen Van Thinh 06/11/2022
     */
    checkAll: function () {
      if (this.checkAll == true) {
        this.selectedRows = this.assets;
        this.$emit("disabled-button", false);
      } else {
        this.selectedRows = [];
        this.$emit("disabled-button", true);
      }
      // console.log(this.selectedRows);
    },
  },
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
          console.log("Call API get all assets");
        })
        .catch((error) => {
          console.log("Call API get all assets", error);
        });
    } catch (error) {
      console.log("Call API get all assets", error);
    }
  },
  methods: {
    /**
     * Thêm hoặc xóa tài sản khỏi mảng chứa các dòng được chọn
     * @param {Boolean} isNewRow true - thêm dòng mới, false - xóa dòng cũ
     * @param {Object} obj là tài sản được chọn
     * @author Nguyen Van Thinh 05/11/2022
     */
    UpdateRow: function (isNewRow, obj) {
      try {
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
        // Bắn chiều dài mảng được chọn lên cha của nó (Table)
        this.$emit("disabled-button", this.selectedRows.length ? false : true);
        // Hiển thị mảng
        // console.log(this.selectedRows);
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      resource,
      assets: [],
      selectedRows: [],
      showPopup: false,
    };
  },
};
</script>

<style scoped>
</style>