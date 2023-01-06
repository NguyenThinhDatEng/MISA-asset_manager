<template>
  <Popup
    :isShow="isShow"
    :title="Resource.PopupTitle.add_voucher"
    @close-popup="$parent.closePopup"
  >
    <div class="popup__body__wrapper">
      <div class="voucher-info">
        <div class="voucher-info__title">Thông tin chứng từ</div>
        <div class="voucher-info__content">
          <div class="row">
            <InputVue :label="Resource.InputLabel.voucher_code" />
            <div class="input--date">
              <label
                >{{ Resource.InputLabel.voucher_date }}
                <span style="color: red">*</span></label
              >
              <InputCalendar />
            </div>
            <div class="input--date">
              <label
                >{{ Resource.InputLabel.increment_date }}
                <span style="color: red">*</span></label
              >
              <InputCalendar />
            </div>
          </div>
          <div class="row">
            <InputVue :label="Resource.InputLabel.description" />
          </div>
        </div>
      </div>
      <!-- Detail information -->
      <div class="detail-info">
        <!-- Function bar -->
        <div class="function-bar">
          <!-- Left -->
          <div class="function__left">
            <!-- Search  -->
            <SearchInputVue
              :placeholder="Resource.Placeholder.search_asset_code_name"
              :width="'270px'"
            />
          </div>
          <!-- right -->
          <div class="function__right">
            <Button
              id="asset-selection"
              :buttonContent="Resource.ButtonContent.select_asset"
              @click="showAssetList"
            />
          </div>
        </div>
        <!-- Master table  -->
        <TableVue
          :cols="TableResource.TableRow.FixedAssetDetail"
          :tds="tds_of_detail"
          :data="assetDetail"
          :page="TableResource.TableFoot.Page.fixedAssetDetail"
          :isShowCheckbox="false"
        />
      </div>
    </div>
  </Popup>
  <VoucherAssetList :isShow="isShowAssetList" />
</template>

<script>
// Resources
import Resource from "@/js/resource/resource";
import TableResource from "@/js/resource/tableResource";
import Enum from "@/js/enum/enum";
// Components
import Popup from "@/components/base/popup/VPopup.vue";
import InputVue from "@/components/base/inputs/Input.vue";
import InputCalendar from "@/components/base/datepicker/InputCalendar.vue";
import TableVue from "@/components/base/table/Table.vue";
import SearchInputVue from "@/components/base/inputs/SearchInput.vue";
import Button from "@/components/base/buttons/ButtonOutline.vue";
// Views
import VoucherAssetList from "@/views/asset/voucher/VoucherAssetList.vue";

export default {
  name: "VoucherDetail",
  created() {},
  components: {
    Popup,
    InputVue,
    InputCalendar,
    TableVue,
    SearchInputVue,
    Button,
    VoucherAssetList,
  },
  props: {
    // Hiển thị popup
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  emits: [],
  methods: {
    /**
     * @description Hiển thị popup "chọn tài sản ghi tăng"
     * @author NVThinh 6/1/2023
     */
    showAssetList: function () {
      this.isShowAssetList = true;
    },
    /**
     * @description Đóng popup
     * @author NVThinh 6/1/2022
     */
    closePopup: function () {
      this.isShowAssetList = false;
    },
  },
  data() {
    return {
      isShowAssetList: false, // Hiển thị popup chọn tài sản ghi tăng
      // Resources
      Resource,
      TableResource,
      Enum,
      // Style cho detail table
      tds_of_detail: [
        {
          col: TableResource.TableRow.FixedAsset.numerical_order.ENG,
          type: Enum.TableData.type.text,
          minWidth: "40px",
          align: "center",
        },
        {
          col: TableResource.TableRow.FixedAsset.fixed_asset_code.ENG,
          type: Enum.TableData.type.text,
          minWidth: "70px",
          maxWidth: "80px",
          align: "left",
        },
        {
          col: TableResource.TableRow.FixedAsset.fixed_asset_name.ENG,
          type: Enum.TableData.type.text,
          minWidth: "90px",
          maxWidth: "180px",
          align: "left",
        },
        {
          col: TableResource.TableRow.FixedAsset.department_name.ENG,
          type: Enum.TableData.type.text,
          minWidth: "100px",
          maxWidth: "120px",
          align: "left",
        },
        {
          col: TableResource.TableRow.FixedAsset.cost.ENG,
          type: Enum.TableData.type.number,
          width: "70px",
          align: "right",
        },
        {
          col: TableResource.TableRow.FixedAsset.accumulated_value.ENG,
          type: Enum.TableData.type.number,
          minWidth: "90px",
          align: "right",
        },
        {
          col: TableResource.TableRow.FixedAsset.residual_value.ENG,
          type: Enum.TableData.type.number,
          minWidth: "80px",
          align: "right",
        },
      ],
      // detail
      assetDetail: [
        {
          fixed_asset_code: "TTTTTT124TT00000000001",
          fixed_asset_name: "Máy chiếu Panasonic PT-LB386 3800 Ansi (XGA)",
          department_name: "Phòng kỹ thuật",
          cost: 15516810,
          accumulated_value: 100000,
          residual_value: 156515615,
        },
        {
          fixed_asset_code: "TTTT000000001",
          fixed_asset_name: "Máy bay Ansi (XGA)",
          department_name: "Phòng kỹ thuật",
          cost: 155,
          accumulated_value: 10000,
          residual_value: 1562225615,
        },
        {
          fixed_asset_code: "TTTTTT124TT00000000001",
          fixed_asset_name: "Máy chiếu Panasonic PT-LB386 3800 Ansi (XGA)",
          department_name: "Phòng kỹ thuật",
          cost: 15516810,
          accumulated_value: 100000,
          residual_value: 156515615,
        },
        {
          fixed_asset_code: "TTTTTT124TT00000000001",
          fixed_asset_name: "Máy chiếu Panasonic PT-LB386 3800 Ansi (XGA)",
          department_name: "Phòng kỹ thuật",
          cost: 15516810,
          accumulated_value: 100000,
          residual_value: 156515615,
        },
      ],
    };
  },
};
</script>

<style scoped>
@import url(@/css/views/voucher_detail.css);

.popup__body__wrapper {
  background-color: #f4f7ff;
  padding: 16px;
}

.voucher-info__title {
  font-family: MISA Bold;
  font-size: 15px;
  padding-bottom: 16px;
}

.voucher-info__content {
  padding: 16px;
}

.voucher-info__content,
.detail-info {
  background-color: #fff;
}

.row {
  display: flex;
  justify-content: space-between;
}

.row + .row {
  padding-top: 16px;
}

.voucher-info + .detail-info {
  margin-top: 16px;
}

.function-bar {
  display: flex;
  justify-content: space-between;
  padding: 16px;
}

#asset-selection {
  padding-left: 24px;
  padding-right: 24px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 16%);
}

.table {
  height: 202px;
  border: none;
  box-shadow: none;
}

/* input */
.input__wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.input__wrapper + div {
  margin-left: 16px;
}
</style>