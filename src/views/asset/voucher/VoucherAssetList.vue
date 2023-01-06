<template>
  <Popup
    :isShow="isShow"
    :title="Resource.PopupTitle.select_increment_asset"
    @close-popup="$parent.closePopup"
  >
    <!-- Function bar -->
    <div class="function-bar">
      <!-- Search  -->
      <SearchInputVue
        :placeholder="Resource.Placeholder.search_asset_code_name"
        :width="'270px'"
      />
    </div>
    <TableVue
      :cols="TableResource.TableRow.FixedAssetDetail"
      :tds="tds_of_detail"
      :data="assetDetail"
      :page="TableResource.TableFoot.Page.assetList"
      :isShowCheckbox="false"
    />
  </Popup>
</template>
  
  <script>
// Components
import Popup from "@/components/base/popup/VPopup.vue";
import TableVue from "@/components/base/table/Table.vue";
import SearchInputVue from "@/components/base/inputs/SearchInput.vue";
// Resources
import Resource from "@/js/resource/resource";
import TableResource from "@/js/resource/tableResource";
import Enum from "@/js/enum/enum";

export default {
  name: "VoucherDetail",
  created() {},
  components: {
    Popup,
    TableVue,
    SearchInputVue,
  },
  props: {
    // Hiển thị popup
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  methods: {},
  data() {
    return {
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

.function-bar {
  padding: 16px;
  border-top: 1px solid #d4d2d2;
}

.table {
  height: 450px;
  box-shadow: none;
  border: none;
}
</style>