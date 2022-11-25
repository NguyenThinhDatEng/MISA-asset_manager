<template>
  <tfoot class="table__footer">
    <tr>
      <td colspan="6">
        <div class="footer__left">
          <div class="total-of-records__wrapper">
            <p class="total-of-records" v-html="records()"></p>
          </div>
          <!-- Combobox: Limit of records  -->
          <ComboboxPagingVue :title="Resource.Title.limit"></ComboboxPagingVue>
          <!-- Paging  -->
          <div class="paging">
            <div class="paging__icon--wrapper">
              <div
                :class="[
                  'icon center icon-footer icon--left-arrow',
                  { 'icon--disable': selectedNumber == 1 },
                ]"
                :title="Resource.Title.pre"
                @click="backPreviousPage()"
              ></div>
            </div>
            <div class="page-numbers">
              <!-- Trang thứ nhất  -->
              <button
                :class="['number', { 'number--selected': numberState[0] }]"
              >
                1
              </button>
              <!-- ... -->
              <span class="number" v-show="selectedNumber > 2">...</span>

              <!-- Trang trước -->
              <button
                title="Trang trước"
                :class="[
                  'number',
                  {
                    'number--selected':
                      numberState[prePageNumber() - 1] && selectedNumber <= 2,
                  },
                ]"
                v-show="selectedNumber < numberOfPages - 2"
              >
                {{ prePageNumber() }}
              </button>

              <!-- Trang giữa -->
              <button
                title="Trang giữa"
                :class="[
                  'number',
                  {
                    'number--selected': numberState[pageNumber() - 1],
                  },
                ]"
                v-show="selectedNumber > 2 && selectedNumber <= numberOfPages"
              >
                {{ pageNumber() }}
              </button>

              <!-- Trang sau -->
              <button
                title="Trang sau"
                :class="[
                  'number',
                  {
                    'number--selected':
                      numberState[nextPageNumber() - 1] &&
                      selectedNumber >= numberOfPages - 1,
                  },
                ]"
                v-show="selectedNumber > 2"
              >
                {{ nextPageNumber() }}
              </button>

              <!-- ...  -->
              <span class="number" v-show="selectedNumber < numberOfPages - 2"
                >...</span
              >

              <!-- Trang cuối cùng  -->
              <button
                :class="[
                  'number',
                  {
                    'number--selected': numberState[numberOfPages - 1],
                  },
                ]"
              >
                {{ numberOfPages }}
              </button>
            </div>
            <div class="paging__icon--wrapper">
              <div
                :class="[
                  'icon center icon-footer icon--right-arrow',
                  { 'icon--disable': selectedNumber == numberOfPages },
                ]"
                :title="Resource.Title.next"
                @click="goNextPage()"
              ></div>
            </div>
          </div>
        </div>
      </td>
      <td class="value">{{ totalOfQuantities }}</td>
      <td class="value" v-for="(val, key) of footerData" :key="key">
        {{ Function.formatMoney(val) }}
      </td>
      <td></td>
    </tr>
  </tfoot>
</template>

<script>
import Resource from "@/js/resource/resource";
import ComboboxPagingVue from "../comboboxes/ComboboxPaging.vue";
import Function from "@/js/common/function";

export default {
  name: "TableFoot",
  components: { ComboboxPagingVue },
  props: {
    footerData: Object, // Đối tượng chứa tổng của các cột tiền
    numberOfRecords: Number, // tổng số lượng bản ghi
    totalOfQuantities: Number, // tổng của cột số lượng
  },
  watch: {
    // Cập nhật số trang khi tổng số bản ghi thay đổi
    numberOfRecords: function () {
      this.setNumberOfPages();
    },
    // Gửi dữ liệu để call API filter khi trang được chọn thay đổi
    selectedNumber: function () {
      try {
        this.$parent.updateFilter(Resource.Filter.offset, this.selectedNumber);
      } catch (error) {
        console.log();
      }
    },
  },
  created() {
    try {
      // Thêm thuộc tính isSelected vào mảng
      for (let i = 0; i < 100; i++) this.numberState.push(false);
      // Trang đầu tiên auto được lựa chọn
      this.numberState[0] = true;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    /**
     * trả về thông tin số bản ghi thu được render bằng v-html
     * @return String kiểu html
     * @author Nguyen Van Thinh 02/11/2022
     */
    records() {
      return "Tổng số: " + "<b>" + this.numberOfRecords + "</b>" + " bản ghi";
    },

    // Thực hiện updateLimit tại cha để gửi giá trị vừa được cập nhật
    updateFilter(value) {
      try {
        // Cập nhật số lượng bản ghi / trang
        this.pageSize = value;
        // Cập nhật số trang
        this.setNumberOfPages();
        // Cập nhật giá trị và style trang được chọn
        this.selectedNumber = 1;
        this.numberState[0] = true;
        // Thực hiện hàm updateFilter tại lớp cha
        this.$parent.updateFilter(Resource.Filter.limit, value);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * sự kiện click vào icon mũi tên bên phải
     * @author NVThinh 25/11/2022
     */
    goNextPage: function () {
      try {
        if (this.selectedNumber < this.numberOfPages) {
          // Thay đổi trạng thái focus của các trang
          this.numberState[this.selectedNumber - 1] = false;
          this.numberState[this.selectedNumber] = true;
          this.selectedNumber++;
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * sự kiện click vào icon mũi tên bên trái
     * @author NVThinh 25/11/2022
     */
    backPreviousPage: function () {
      try {
        if (this.selectedNumber > 1) {
          // Thay đổi trạng thái focus của các trang
          this.numberState[this.selectedNumber - 1] = false;
          this.numberState[this.selectedNumber - 2] = true;
          this.selectedNumber--;
        }
      } catch (error) {
        console.log(error);
      }
    },

    // Thiết lập giá trị hiển thị ở ô phân trang trước
    prePageNumber: function () {
      try {
        if (this.selectedNumber < 3) {
          return 2;
        } else {
          return this.selectedNumber - 1;
        }
      } catch (error) {
        console.log(error);
      }
    },

    // Thiết lập giá trị hiển thị ở ô phân trang giữa
    pageNumber: function () {
      try {
        if (this.selectedNumber < this.numberOfPages - 1) {
          return this.prePageNumber() + 1;
        } else {
          return this.numberOfPages - 2;
        }
      } catch (error) {
        console.log(error);
      }
    },

    // Thiết lập giá trị hiển thị ở ô phân trang sau
    nextPageNumber: function () {
      try {
        if (this.selectedNumber < this.numberOfPages) {
          if (this.selectedNumber < this.numberOfPages - 1) {
            return this.pageNumber() + 1;
          } else {
            return this.selectedNumber;
          }
        } else {
          return this.numberOfPages - 1;
        }
      } catch (error) {
        console.log(error);
      }
    },

    // Cập nhật số trang
    setNumberOfPages: function () {
      const roundedValue = Math.round(this.numberOfRecords / this.pageSize);
      // Nếu chia dư -> số trang sẽ + 1
      if (this.numberOfRecords % this.pageSize > 0)
        this.numberOfPages = roundedValue + 1;
      else {
        this.numberOfPages = roundedValue;
      }
    },
  },
  data() {
    return {
      numberOfPages: 1, // số lượng trang
      selectedNumber: 1, // trang được chọn
      numberState: [], // Mảng quản lý số trang đang được chọn
      pageSize: 20, // Số lượng bản ghi / trang
      Resource, // Tài nguyên
      Function, // Hàm dùng chung
    };
  },
};
</script>

<style scoped>
@import url(@/css/font.css);

tfoot {
  position: sticky;
}

.icon-footer {
  width: 8px;
  height: 13px;
}

.paging__icon--wrapper + .page-numbers {
  margin-left: 10px;
}

.page-numbers + .paging__icon--wrapper {
  margin-left: 10px;
}

.number + .number {
  margin-left: 7px;
}

.number--selected {
  font-family: MISA Bold;
  background-color: #f5f5f5 !important;
}

.paging__icon--wrapper:hover {
  cursor: pointer;
}

.icon--disable {
  opacity: 0.5;
  cursor: context-menu;
}
</style>