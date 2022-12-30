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
        ></Button>
        <!-- Button: toggle between horizontal page and vertical page -->
        <button class="button page--state">
          <div class="icon icon--horizontal-page"></div>
          <div class="icon icon--black-down-arrow"></div>
        </button>
      </div>
    </div>
    <!-- Table 01 -->
    <div class="master">
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
      <div class="table"></div>
    </div>
    <!-- Table 02 -->
    <div class="detail">
      <div class="function-bar">
        <div class="function__left">Thông tin chi tiết</div>
        <div class="function__right">
          <div class="icon-item_wrapper">
            <div class="icon icon--14px icon--zoom-out center"></div>
          </div>
        </div>
      </div>
      <div class="table"></div>
    </div>
  </div>
</template>

<script>
// Components
import Button from "@/components/base/buttons/ButtonIcon.vue";
import SearchInput from "@/components/base/inputs/SearchInput.vue";
// Resources
import Resource from "@/js/resource/resource";
import Dictionary from "@/js/resource/dictionary";

export default {
  name: "VoucherList",
  components: { Button, SearchInput },
  created() {},
  props: {},
  emits: [],
  methods: {},
  data() {
    return {
      Resource,
      Dictionary,
    };
  },
};
</script>

<style scoped>
@import url(@/css/icon.css);
@import url(@/css/font.css);

.function-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 36px;
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

.detail,
.master {
  background-color: #fff;
}

.master .function-bar {
  height: 62px;
  margin-bottom: 0;
  align-items: center;
}

.icon-item_wrapper {
  width: 32px;
}

.master .table {
  height: 300px;
  box-shadow: none;
}

.master + .detail {
  margin-top: 8px;
}

.detail .function__left {
  font-size: 15px;
}

.detail .icon-item_wrapper {
  width: 44px;
}

.detail .table{
  height: 170px;
}

</style>