<template>
  <Popup
    :title="Resource.PopupTitle.select_increment_asset"
    @close-popup="close"
    @on-save="onSave"
    @keydown.esc="close"
    @keyup.ctrl.q.stop="onSave"
  >
    <!-- Loader  -->
    <Loader :isShow="isShowLoader"></Loader>
    <!-- Function bar -->
    <div class="function-bar">
      <!-- Search  -->
      <SearchInputVue
        :field="'keyword'"
        :placeholder="Resource.Placeholder.search_asset_code_name"
        :width="'270px'"
        ref="search_input"
        @update-filter="updateFilter"
        @handle-empty-input="handleEmptyInput"
      />
    </div>
    <!-- Table -->
    <TableVue
      :cols="TableResource.TableRow.FixedAssetDetail"
      :tds="tds_of_detail"
      :data="fixedAssets"
      :is-show-footer="false"
      :offset="conditions.offset"
      @update-row="updateRow"
      ref="theTable"
    />
    <!-- Paging -->
    <TablePaging
      :number-of-records="totalOfRecords"
      @update-filter="updateFilter"
    />
  </Popup>
  <!-- Toast -->
  <ToastVue
    v-if="isShowToast"
    :action-status="toastObj.actionStatus"
    :content="toastObj.content"
  ></ToastVue>
</template>
  
  <script>
// Components
import Popup from "@/components/base/popup/VPopup.vue";
import TableVue from "@/components/base/table/Table.vue";
import SearchInputVue from "@/components/base/inputs/SearchInput.vue";
import Loader from "@/components/base/more/Loader.vue";
import ToastVue from "@/components/base/toast/ToastVue.vue";
import TablePaging from "@/components/base/table/TablePaging.vue";
// Resources
import Resource from "@/js/resource/resource";
import TableResource from "@/js/resource/tableResource";
import Enum from "@/js/enum/enum";
import Function from "@/js/common/function";
import { getFixedAssetByFilterAndPaging } from "@/apis/fixedAsset";

export default {
  name: "VoucherDetail",
  components: {
    Popup,
    TableVue,
    SearchInputVue,
    Loader,
    ToastVue,
    TablePaging,
  },
  props: {
    selectedIDs: {
      type: Array,
      default: () => [],
    }, // Danh sách các IDs đã được chọn
    deletedAssetList: Array, // Mảng chứa các tài sản xóa tạm thời
  },

  created() {
    console.log(this.deletedAssetList);
    // Gọi API lấy danh sách tài sản cố định theo tìm kiếm, lọc và giới hạn bản ghi
    this.searchAndFilter();
  },

  mounted() {
    // focus vào ô tìm kiếm
    this.$refs.search_input.focusInput();
  },

  methods: {
    /**
     * @description xử lý sự kiện khi ô tìm kiếm trống
     * @author NVThinh 7/1/2023
     */
    handleEmptyInput: function () {
      this.conditions.keyword = "";
      this.searchAndFilter();
    },

    /**
     * @description Đóng popup
     * @author NVThinh 7/1/2023
     */
    close: function () {
      this.$parent.closePopup();
    },

    /**
     * @description xử lý sự kiện ấn nút lưu
     * @author NVThinh 7/1/2023
     */
    onSave: function () {
      try {
        // Chỉ gửi dữ liệu khi có tài sản được chọn
        if (this.selectedRows.length > 0)
          this.$parent.updateRow(this.selectedRows);
        this.close();
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Gọi API filter
     * @author NVThinh 7/1/2023
     */
    searchAndFilter: async function () {
      // Hiển thị loader
      this.isShowLoader = true;
      // Gọi API lấy danh sách tài sản cố định theo lọc và phân trang
      await getFixedAssetByFilterAndPaging(
        this.conditions.keyword,
        null,
        null,
        this.conditions.limit,
        this.conditions.offset,
        true,
        this.selectedIDs
      )
        .then((res) => {
          // Lấy tổng số bản ghi thu được
          const records = res.data.totalOfRecords;
          // Lọc mảng các tài sản xóa tạm thời
          const tmpArr = Function.autoComplete(
            this.conditions.keyword,
            this.deletedAssetList,
            "fixed_asset_code",
            "fixed_asset_name"
          );
          // Cập nhật mảng dữ liệu
          this.fixedAssets = res.data.data;
          let i = records;
          while (i < this.conditions.limit && i - records < tmpArr.length) {
            this.fixedAssets.push(tmpArr[i - records]);
            i++;
          }
          // Cập nhật tổng số bản ghi thu được
          this.totalOfRecords = records + tmpArr.length;
          this.isShowLoader = false;
        })
        .catch(() => {
          this.showToast(Enum.ActionStatus.Error, Resource.ToastContent.Error);
        });
    },

    /**
     * Hiển thị toast
     * @param {Number} actionStatus trạng thái toast
     * @param {String} content nội dung hiển thị
     * @author NVThinh 7-1-2023
     */
    showToast: function (actionStatus, content) {
      // Cập nhật đối tượng toast
      this.toastObj.actionStatus = actionStatus;
      this.toastObj.content = content;
      // Hiển thị toast
      this.isShowToast = true;
    },

    /**
     * Lấy thông tin các tài sản được chọn
     * @param {Array} selectedRows mảng các dòng được chọn
     * @author Nguyen Van Thinh 7/1/2023
     */
    updateRow: function (selectedRows) {
      try {
        // Cập nhật mảng các dòng được chọn
        this.selectedRows = selectedRows;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Cập nhật các điều kiện của filter
     * @param {string} field trường của dữ liệu
     * @param {string} value giá trị được cập nhật
     * @author NVThinh 11/1/2023
     */
    updateFilter: function (field, value) {
      try {
        // Cập nhật các diều kiện lọc và phân trang
        this.conditions[field] = value;
        // Call lại API
        this.searchAndFilter();
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description focus vào dòng đầu tiên của bảng
     * @author NVThinh 16/1/2023
     */
    focusFirstRow: function () {
      try {
        this.$refs.theTable.focusFirstRow();
      } catch (error) {
        console.log(error);
      }
    },
  },

  data() {
    return {
      selectedRows: [], // Mảng chứa các dòng trong bảng được chọn
      isShowToast: false, // Hiển thị toast
      toastObj: {
        actionStatus: 0,
        content: "",
      }, // Các thông tin yêu cầu từ toast component
      isShowLoader: false, // Hiển thị loading
      fixedAssets: [], //Mảng chứa các tài sản cố định
      conditions: {
        keyword: "",
        limit: 20,
        offset: 0,
      }, // Đối tượng chứa các điều kiện để gọi API
      totalOfRecords: 0, // Số lượng bản ghi lọc được
      // Resources
      Resource,
      TableResource,
      Enum,
      Function,
      // Style cho detail table
      tds_of_detail: [
        {
          col: TableResource.TableRow.FixedAsset.checkbox?.ENG,
          type: Enum.TableData.type.checkbox,
          width: "50px",
          align: "center",
        },
        {
          col: TableResource.TableRow.FixedAsset.numerical_order.ENG,
          type: Enum.TableData.type.text,
          width: "50px",
          align: "center",
        },
        {
          col: TableResource.TableRow.FixedAsset.fixed_asset_code.ENG,
          type: Enum.TableData.type.text,
          width: "80px",
          align: "left",
        },
        {
          col: TableResource.TableRow.FixedAsset.fixed_asset_name.ENG,
          type: Enum.TableData.type.text,
          width: "200px",
          maxWidth: "200px",
          align: "left",
        },
        {
          col: TableResource.TableRow.FixedAsset.department_name.ENG,
          type: Enum.TableData.type.text,
          width: "130px",
          maxWidth: "130px",
          align: "left",
        },
        {
          col: TableResource.TableRow.FixedAsset.cost.ENG,
          type: Enum.TableData.type.number,
          width: "120px",
          maxWidth: "120px",
          align: "right",
        },
        {
          col: TableResource.TableRow.FixedAsset.accumulated_value.ENG,
          type: Enum.TableData.type.number,
          width: "120px",
          maxWidth: "120px",
          align: "right",
        },
        {
          col: TableResource.TableRow.FixedAsset.residual_value.ENG,
          type: Enum.TableData.type.number,
          minWidth: "80px",
          align: "right",
        },
      ],
    };
  },
};
</script>
  
  <style scoped>
@import url(@/css/views/voucher_detail.css);

.function-bar {
  padding: 16px;
  border-top: 1px solid #d4d2d2;
}

.table {
  height: 450px;
  box-shadow: none;
  border: none;
}

/* Track */
::-webkit-scrollbar-track {
  margin-bottom: unset;
}
</style>