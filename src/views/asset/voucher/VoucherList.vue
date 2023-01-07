<template>
  <div id="write_increase">
    <!-- Function bar -->
    <div class="function-bar">
      <div class="function__left">Ghi tăng tài sản</div>
      <div class="function__right">
        <!-- Button: add a new voucher  -->
        <Button
          :buttonType="'button--add'"
          :buttonContent="Dictionary.action.add.VN"
          :hasIcon="false"
          :title="Resource.Title.add_voucher"
          @click="isShowPopup = true"
        ></Button>
        <!-- Button: toggle between horizontal page and vertical page -->
        <button class="button page--state">
          <div class="icon icon--horizontal-page"></div>
          <div class="icon icon--black-down-arrow"></div>
        </button>
      </div>
    </div>
    <!-- Table 01 -->
    <div class="master" v-show="!isZoomIn">
      <div class="function-bar">
        <div class="function__left">
          <!-- Search  -->
          <SearchInput
            :placeholder="Resource.Placeholder.search_voucher"
            :width="'270px'"
          />
        </div>
        <div class="function__right">
          <div class="icon-item_wrapper">
            <div class="icon icon--18px icon--print center"></div>
          </div>
          <div class="icon-item_wrapper">
            <div class="icon icon--option center"></div>
          </div>
        </div>
      </div>
      <!-- Master table  -->
      <TableVue
        :cols="TableResource.TableRow.Voucher"
        :tds="tds_of_master"
        :data="vouchers"
        :is-show-feature="true"
        :page="TableResource.TableFoot.Page.voucher"
        :only-one-row="true"
        @update-voucher="openAssetList"
      />
    </div>
    <!-- Table 02 -->
    <div class="detail">
      <div class="function-bar">
        <div class="function__left">Thông tin chi tiết</div>
        <div class="function__right">
          <div class="icon-item_wrapper">
            <div
              class="icon icon--14px icon--zoom-in center"
              @click="toggle"
            ></div>
          </div>
        </div>
      </div>
      <!-- Table  -->
      <TableVue
        :cols="TableResource.TableRow.FixedAssetDetail"
        :tds="tds_of_detail"
        :data="assetDetail"
        :isShowFooter="false"
        :isShowCheckbox="false"
      />
    </div>
  </div>
  <!-- Popup -->
  <VoucherDetail v-if="isShowPopup" />
</template>

<script>
// Components
import Button from "@/components/base/buttons/ButtonIcon.vue";
import SearchInput from "@/components/base/inputs/SearchInput.vue";
import TableVue from "@/components/base/table/Table.vue";
import VoucherDetail from "@/views/asset/voucher/VoucherDetail.vue";
// Resources
import Resource from "@/js/resource/resource";
import Dictionary from "@/js/resource/dictionary";
import TableResource from "@/js/resource/tableResource";
import Enum from "@/js/enum/enum";

export default {
  name: "VoucherList",
  components: { Button, SearchInput, TableVue, VoucherDetail },
  // =======================================
  methods: {
    /**
     * @description Mở popup "Thêm chứng từ ghi tăng"
     * @author NVThinh 6/1/2023
     */
    openAssetList: function () {
      this.isShowPopup = true;
    },
    /**
     * @description Phóng to/Thu nhỏ bảng chi tiết
     * @author NVT 3/1/2022
     */
    toggle: function () {
      this.isZoomIn = !this.isZoomIn;
    },

    /**
     * @description Đóng popup
     * @author NVThinh 5/1/2022
     */
    closePopup: function () {
      this.isShowPopup = false;
    },
  },
  // ========================================================================
  data() {
    return {
      // Variables
      isZoomIn: false, // Phóng to bảng chi tiết
      isShowPopup: false, // Hiển thị popup "Thêm chứng từ ghi tăng"
      // Resource
      Resource,
      Dictionary,
      TableResource,
      // Style
      tds_of_master: [
        {
          col: TableResource.TableRow.Voucher.checkbox?.ENG,
          type: Enum.TableData.type.checkbox,
          width: "50px",
          align: "center",
        },
        {
          col: TableResource.TableRow.Voucher.numerical_order.ENG,
          type: Enum.TableData.type.text,
          width: "50px",
          align: "center",
        },
        {
          col: TableResource.TableRow.Voucher.voucher_code.ENG,
          type: Enum.TableData.type.text,
          width: "150px",
          align: "left",
        },
        {
          col: TableResource.TableRow.Voucher.voucher_date.ENG,
          type: Enum.TableData.type.text,
          width: "150px",
          align: "center",
        },
        {
          col: TableResource.TableRow.Voucher.increment_date.ENG,
          type: Enum.TableData.type.text,
          width: "150px",
          align: "center",
        },
        {
          col: TableResource.TableRow.Voucher.total_of_cost.ENG,
          type: Enum.TableData.type.number,
          width: "200px",
          align: "right",
        },
        {
          col: TableResource.TableRow.Voucher.description.ENG,
          type: Enum.TableData.type.text,
          align: "left",
        },
      ],
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
          maxWidth: "110px",
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
          minWidth: "50px",
          maxWidth: "60px",
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
      // voucher
      vouchers: [
        {
          voucher_code: "GT00001",
          voucher_date: "03/01/2023",
          increment_date: "03/01/2023",
          total_of_cost: 234838248,
          description: "Chứng từ đã được chứng nhận ",
        },
        {
          voucher_code: "GT00001",
          voucher_date: "03/01/2023",
          increment_date: "03/01/2023",
          total_of_cost: 234838248,
          description: "Chứng từ đã được chứng nhận ",
        },
        {
          voucher_code: "GT00001",
          voucher_date: "03/01/2023",
          increment_date: "03/01/2023",
          total_of_cost: 234838248,
          description: "Chứng từ đã được chứng nhận ",
        },
        {
          voucher_code: "GT00001",
          voucher_date: "03/01/2023",
          increment_date: "03/01/2023",
          total_of_cost: 234838248,
          description: "Chứng từ đã được chứng nhận ",
        },
        {
          voucher_code: "GT00001",
          voucher_date: "03/01/2023",
          increment_date: "03/01/2023",
          total_of_cost: 234838248,
          description: "Chứng từ đã được chứng nhận ",
        },
        {
          voucher_code: "GT00001",
          voucher_date: "03/01/2023",
          increment_date: "03/01/2023",
          total_of_cost: 234838248,
          description: "Chứng từ đã được chứng nhận ",
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
@import url(@/css/icon.css);
@import url(@/css/font.css);

#write_increase {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.function-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 36px;
  padding-left: 18px;
}

.function__left {
  font-family: MISA Bold;
  font-size: 20px;
}

.function-bar__right {
  display: flex;
}

.page--state {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #fff;
  outline: none;
  border: none;
  border-radius: 4px;
  min-width: 66px;
}

.button + .button {
  margin-left: 11px;
}

.function-bar + .master {
  margin-top: 14px;
}

.master {
  max-height: 363px;
}

.detail,
.master {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 5;
  background-color: #fff;
}

.master .function-bar {
  height: 62px;
  margin-bottom: 0;
  align-items: center;
}

.icon-item_wrapper {
  width: 32px;
  cursor: pointer;
}

.master + .detail {
  margin-top: 8px;
}

.detail {
  max-height: 218px;
  flex: 3;
}

.detail .function__left {
  font-size: 15px;
}

.detail .icon-item_wrapper {
  width: 44px;
}

.detail .table {
  height: 158px;
}

/* Table */
.table {
  height: unset;
  border: none;
  box-shadow: none;
}

.master .table {
  flex: 1;
}
</style>