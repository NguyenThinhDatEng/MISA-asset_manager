<template>
  <div class="table" id="table">
    <table>
      <!-- Table columns -->
      <colgroup>
        <col v-for="obj in styleObject" :key="obj.col" :style="obj" />
      </colgroup>
      <!-- Table Header  -->
      <thead>
        <tr>
          <th class="th--checkbox checkbox__wrapper">
            <input
              id="checkbox-header"
              type="checkbox"
              class="checkbox"
              :checked="checkedHeader"
              v-model="isCheckAll"
            />
          </th>
          <th
            v-for="(value, key) of ths"
            :key="key"
            :title="setTitle(value)"
            :class="'col--' + key"
          >
            {{ value }}
          </th>
        </tr>
      </thead>
      <!-- Table body  -->
      <tbody>
        <Row
          v-for="(asset, index) in assets"
          :key="index"
          :obj="asset"
          :i="index + 1"
          :is-check-all="isCheckAll"
          @update-row="updateRow"
          @update-checked-header="updateCheckedHeader"
        ></Row>
      </tbody>
      <!-- Table footer  -->
      <TableFoot></TableFoot>
    </table>
  </div>
</template>

<script>
import Row from "./TableRow.vue";
import TableFoot from "./TableFoot.vue";
import Resource from "@/js/resource/resource";

export default {
  name: "TheTable",
  components: { Row, TableFoot },
  emits: ["disabled-button"],
  watch: {
    isCheckAll: function () {
      if (this.isCheckAll == true) {
        this.selectedRows = [];
        for (const asset in this.assets) {
          this.selectedRows.push(asset);
        }
      } else {
        this.selectedRows = [];
      }
      if (this.selectedRows.length == 0) this.$emit("disabled-button", true);
      else this.$emit("disabled-button", false);
      this.checkedHeader = this.isCheckAll;
    },
  },
  mounted() {
    /**
     * Call API lấy tất cả bản ghi tài sản
     * Author: Nguyen Van Thinh 2/11/2022
     */
    try {
      fetch(Resource.URLs.getAllAsset, {
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
    updateRow: function (isNewRow, obj) {
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
        // console.log(this.selectedRows);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Emit: lấy dữ liệu từ Row
     * @param {Boolean} checkedHeader trạng thái checked của checkbox header
     * @author Nguyen Van Thinh 06/11/2022
     */
    updateCheckedHeader: function (checkedHeader) {
      this.checkedHeader = checkedHeader;
    },

    // Thiếp lập title cho từ viết tắt (table header)
    setTitle: function (value) {
      try {
        if (value == "STT") return Resource.Abbreviations.STT;
        else if (value == "HM/KH lũy kế")
          return Resource.Abbreviations.depreciation;
        else return "";
      } catch (error) {
        console.log("Table Header", error);
      }
    },
    /**
     * Phát dữ liệu đến class cha (Content)
     * @param {Array} selectedRows Các row được chọn trong grid
     * @author Nguyen Van Thinh 06/11/2022
     */
    disabledButton: function (disabled) {
      try {
        this.$emit("disabled-button", disabled);
      } catch (error) {
        console.log(error);
      }
    },

    // Cập nhật biến chọn tất cả các dòng
    checkAll: function (checked) {
      try {
        this.isCheckAll = checked;
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      Resource,
      ths: Resource.Columns,
      isCheckAll: false,
      checkedHeader: false,
      assets: [],
      selectedRows: [],
      showPopup: false,
      //   cols: resource.Columns,
      styleObject: [
        {
          col: "checkbox",
          "min-width": "40px",
          "text-align": "center",
        },
        {
          col: "stt",
          "min-width": "40px",
          "text-align": "left",
        },
        {
          col: "asset-code",
          "min-width": "70px",
          "text-align": "left",
        },
        {
          col: "asset-name",
          "min-width": "90px",
          "max-width": "160px",
          "text-align": "left",
        },
        {
          col: "asset-category",
          "min-width": "70px",
          "max-width": "120px",
          "text-align": "left",
        },
        {
          col: "department",
          "min-width": "100px",
          "max-width": "120px",
          "text-align": "left",
        },
        {
          col: "quantity",
          "min-width": "60px",
          "text-align": "right",
        },
        {
          col: "cost",
          "text-align": "right",
        },
        {
          col: "depreciation",
          "min-width": "90px",
          "text-align": "right",
        },
        {
          col: "residual_value",
          "min-width": "80px",
          "text-align": "right",
        },
        {
          col: "feature",
          "min-width": "60px",
          "max-width": "80px",
          "text-align": "center",
        },
      ],
    };
  },
};
</script>

<style scoped>
@import url(@/css/base.css);
</style>