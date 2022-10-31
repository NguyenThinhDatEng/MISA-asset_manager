<template>
  <div class="function">
    <!-- Left function bar  -->
    <div class="function_left">
      <!-- Search  -->
      <div class="asset-search">
        <div class="icon-function_wrapper">
          <div class="icon center icon-18px icon_search_input"></div>
        </div>
        <input
          type="text"
          class="input input--search"
          placeholder="Tìm kiếm tài sản"
        />
      </div>
      <!-- Filter 01  -->
      <div class="asset_type-filter">
        <div id="dropdown--asset-type" class="dropdown--checkbox dropdown">
          <div class="dropdown__icon">
            <div class="icon center icon-18px icon_filter"></div>
          </div>
          <input
            type="text"
            class="input dropdown__input"
            placeholder="Loại tài sản"
          />
          <div class="dropdown__button">
            <div class="icon center icon_down"></div>
          </div>
          <div id="dropdown__data--asset-type" class="dropdown__data" hidden>
            <div class="data">
              <div class="checkbox__wrapper">
                <input type="checkbox" class="center checkbox" />
              </div>
              <p>Máy vi tính xách tay</p>
            </div>
            <div class="data">
              <div class="checkbox__wrapper">
                <input type="checkbox" class="center checkbox" />
              </div>
              <p>Máy tính bàn</p>
            </div>
            <div class="data">
              <div class="checkbox__wrapper">
                <input type="checkbox" class="center checkbox" />
              </div>
              <p>Điện thoại di động</p>
            </div>
            <div class="data">
              <div class="checkbox__wrapper">
                <input type="checkbox" class="center checkbox" />
              </div>
              <p>Điện thoại bàn</p>
            </div>
            <div class="data">
              <div class="checkbox__wrapper">
                <input type="checkbox" class="center checkbox" />
              </div>
              <p>Đồ gia dụng</p>
            </div>
            <div class="data">
              <div class="checkbox__wrapper">
                <input type="checkbox" class="center checkbox" />
              </div>
              <p>1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Filter 02  -->
      <div class="department-filter">
        <div id="dropdown--department" class="dropdown--checkbox dropdown">
          <div class="dropdown__icon">
            <div class="icon center icon-18px icon_filter"></div>
          </div>
          <input
            type="text"
            class="input dropdown__input"
            placeholder="Bộ phận sử dụng"
          />
          <div class="dropdown__button">
            <div class="icon center icon_down"></div>
          </div>
          <div id="dropdown__data--department" class="dropdown__data" hidden>
            <div class="data">
              <div class="checkbox__wrapper">
                <input type="checkbox" class="center checkbox" />
              </div>
              <p>Phòng ngoại giao</p>
            </div>
            <div class="data">
              <div class="checkbox__wrapper">
                <input type="checkbox" class="center checkbox" />
              </div>
              <p>Phòng giám đốc</p>
            </div>
            <div class="data">
              <div class="checkbox__wrapper">
                <input type="checkbox" class="center checkbox" />
              </div>
              <p>Phòng bảo vệ</p>
            </div>
            <div class="data">
              <div class="checkbox__wrapper">
                <input type="checkbox" class="center checkbox" />
              </div>
              <p>Phòng hành chính kế toán</p>
            </div>
            <div class="data">
              <div class="checkbox__wrapper">
                <input type="checkbox" class="center checkbox" />
              </div>
              <p>Phòng tài chính kế toán</p>
            </div>
            <div class="data">
              <div class="checkbox__wrapper">
                <input type="checkbox" class="center checkbox" />
              </div>
              <p>Phòng họp</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Right function bar  -->
    <div class="function__right">
      <!-- Button: add a new asset  -->
      <button class="button button--add">
        <div class="button--add__content-wrapper">
          <div class="icon icon_add"></div>
          <p class="add-asset">Thêm tài sản</p>
        </div>
      </button>
      <!-- Button: export a excel file  -->
      <div class="button--export button--disable" title="Xuất dữ liệu">
        <div class="icon icon-18px center icon_export"></div>
      </div>
      <!-- Button: delete many assets  -->
      <div class="button--delete button--disable" title="Xóa bản ghi">
        <div class="icon icon-18px center icon_delete"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FunctionBar",
  created() {},
  components: {},
  props: {},
  emits: [],
  methods: {},
  data() {
    return {};
  },
};
</script>

<style scoped>
@import url(@/css/base.css);
</style>