<template>
  <div class="foot">
    <!-- Tổng số bản ghi -->
    <div class="total-of-records__wrapper">
      <p class="total-of-records" v-html="recordsText"></p>
    </div>
    <!-- Combobox: Limit of records  -->
    <ComboboxPaging :title="Resource.Title.limit" />
    <!-- Paging  -->
    <div class="paging">
      <!-- Icon < -->
      <div class="paging__icon--wrapper" @click="backPreviousPage()">
        <div
          :class="[
            'icon center icon-footer icon--left-arrow',
            { 'icon--disable': selectedNumber == 1 },
          ]"
          :title="Resource.PageNumber.prePage"
        ></div>
      </div>
      <div class="page-numbers">
        <!-- Trang thứ nhất  -->
        <button
          :class="['number', { 'number--selected': numberState[0] }]"
          @click="handleOnClickPageNumber(1)"
        >
          1
        </button>
        <!-- ... -->
        <span class="number" v-show="isShowFirstThreeDots()">...</span>

        <!-- Trang trước -->
        <button
          :title="Resource.PageNumber.prePage"
          :class="[
            'number',
            {
              'number--selected':
                numberState[prePageNumber() - 1] && selectedNumber <= 2,
            },
          ]"
          v-show="isShowPrePage()"
          @click="handleOnClickPageNumber(prePageNumber())"
        >
          {{ prePageNumber() }}
        </button>

        <!-- Trang giữa -->
        <button
          :title="Resource.PageNumber.currentPage"
          :class="[
            'number',
            {
              'number--selected': numberState[pageNumber() - 1],
            },
          ]"
          v-show="isShowCurrentPage()"
          @click="handleOnClickPageNumber(pageNumber())"
        >
          {{ pageNumber() }}
        </button>

        <!-- Trang sau -->
        <button
          :title="Resource.PageNumber.nextPage"
          :class="[
            'number',
            {
              'number--selected':
                numberState[nextPageNumber() - 1] &&
                selectedNumber >= numberOfPages - 1,
            },
          ]"
          v-show="isShowNextPage()"
          @click="handleOnClickPageNumber(nextPageNumber())"
        >
          {{ nextPageNumber() }}
        </button>

        <!-- ...  -->
        <span class="number" v-show="isShowSecondThreeDots()">...</span>

        <!-- Trang cuối cùng  -->
        <button
          :class="[
            'number',
            {
              'number--selected': numberState[numberOfPages - 1],
            },
          ]"
          v-show="numberOfPages > 1"
          @click="handleOnClickPageNumber(numberOfPages)"
        >
          {{ numberOfPages }}
        </button>
      </div>
      <!-- Icon > -->
      <div class="paging__icon--wrapper" @click="goNextPage()">
        <div
          :class="[
            'icon center icon-footer icon--right-arrow',
            { 'icon--disable': selectedNumber == numberOfPages },
          ]"
          :title="Resource.PageNumber.nextPage"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
// Resources
import Resource from "@/js/resource/resource";
import Function from "@/js/common/function";
// Components
import ComboboxPaging from "../comboboxes/ComboboxPaging.vue";

export default {
  name: "TablePaging",
  components: { ComboboxPaging },
  props: {
    numberOfRecords: {
      type: Number,
      default: 0,
    }, // Số lượng bản ghi
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

  watch: {
    // Cập nhật số trang khi tổng số bản ghi thay đổi
    numberOfRecords: function () {
      this.setNumberOfPages();
      // Cập nhật giá trị và style trang được chọn
      this.updatePageNumberState();
    },

    // Gửi dữ liệu để call API filter khi trang được chọn thay đổi
    selectedNumber: function () {
      try {
        this.$parent.updateFilter(
          Resource.Filter.offset,
          (this.selectedNumber - 1) * this.pageSize
        );
      } catch (error) {
        console.log();
      }
    },
  },

  computed: {
    recordsText: function () {
      return (
        "Tổng số: " +
        "<b>" +
        Function.formatMoney(this.numberOfRecords) +
        "</b>" +
        " bản ghi"
      );
    },
  },

  methods: {
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

    /**
     * Kiểm tra trạng thái ẩn hiện dấu 3 chấm đầu tiên
     * @author NVThinh 25/11/2022
     */
    isShowFirstThreeDots: function () {
      try {
        if (this.numberOfPages == 4 && this.selectedNumber >= 3) {
          return true;
        }
        if (this.numberOfPages > 4 && this.selectedNumber > 3) {
          return true;
        }
        return false;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description Kiểm tra trạng thái ẩn hiện số của trang trước
     * @author NVThinh 25/11/2022
     */
    isShowPrePage: function () {
      try {
        if (this.numberOfPages == 3) return true;
        if (this.numberOfPages == 4 && this.selectedNumber <= 2) return true;
        if (
          this.numberOfRecords > 4 &&
          this.selectedNumber <= this.numberOfPages - 2
        )
          return true;
        return false;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description Kiểm tra trạng thái ẩn hiện số của trang giữa
     * @author NVThinh 25/11/2022
     */
    isShowCurrentPage: function () {
      try {
        if (
          this.numberOfPages > 4 &&
          this.selectedNumber > 2 &&
          this.selectedNumber <= this.numberOfPages
        )
          return true;
        return false;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description Kiểm tra trạng thái ẩn hiện số của trang sau
     * @author NVThinh 25/11/2022
     */
    isShowNextPage: function () {
      try {
        if (this.numberOfPages >= 4 && this.selectedNumber > 2) return true;
        return false;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description Kiểm tra trạng thái ẩn hiện dấu 3 chấm thứ 2
     * @author NVThinh 25/11/2022
     */
    isShowSecondThreeDots: function () {
      try {
        if (
          this.numberOfPages > 4 &&
          this.selectedNumber < this.numberOfPages - 2
        )
          return true;
        if (this.numberOfPages == 4 && this.selectedNumber < 3) return true;
        return false;
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

    /**
     * @description Sự kiện click vào số trang (ex: 1, 2, 3, ...)
     * @author NVThinh 10/1/2023
     */
    handleOnClickPageNumber: function (pageNumber) {
      try {
        // Bỏ trạng thái focus của ô hiện tại
        this.numberState[this.selectedNumber - 1] = false;
        // Cập nhật giá trị và trạng thái ô phân trang
        this.selectedNumber = pageNumber;
        this.numberState[pageNumber - 1] = true;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description Thực hiện updateLimit tại cha để gửi giá trị vừa được cập nhật
     * @param {string} value giới hạn số lượng bản ghi
     * @author NVThinh 10/1/2023
     */
    updateFilter(value) {
      try {
        // Cập nhật số lượng bản ghi / trang
        this.pageSize = value;
        // Cập nhật số trang
        this.setNumberOfPages();
        // Cập nhật giá trị và style trang được chọn
        this.updatePageNumberState();
        // Thực hiện hàm updateFilter tại lớp cha
        this.$parent.updateFilter(Resource.Filter.limit, value);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description Cập nhật số trang
     * @author NVThinh 10/1/2023
     */
    setNumberOfPages: function () {
      const roundedValue = Math.floor(this.numberOfRecords / this.pageSize);
      // Nếu chia dư -> số trang sẽ + 1
      if (this.numberOfRecords % this.pageSize > 0)
        this.numberOfPages = roundedValue + 1;
      else {
        this.numberOfPages = roundedValue;
      }
    },

    /**
     * @description Bỏ focus vào ô page number hiện tại, focus vào page number đầu tiên
     * @author NVThinh 10/1/2023
     */
    updatePageNumberState: function () {
      try {
        this.numberState[this.selectedNumber - 1] = false;
        this.selectedNumber = 1;
        this.numberState[0] = true;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description sự kiện click vào icon mũi tên bên phải
     * @author NVThinh 10/1/2023
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
  },

  data() {
    return {
      numberOfPages: 1, // số lượng trang
      selectedNumber: 1, // trang được chọn
      numberState: [], // Mảng quản lý số trang đang được chọn
      pageSize: 20, // Số lượng bản ghi / trang
      // Resources
      Resource,
    };
  },
};
</script>

<style scoped>
.foot {
  display: flex;
  align-items: center;
  height: 40px;
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

/* Icon */
.icon-footer {
  width: 8px;
  height: 13px;
  cursor: pointer;
}

/* Combobox */
.combobox {
  justify-content: space-between;
  width: 59px;
  height: 25px;
  border-radius: 2.625px;
  margin-right: 20px;
}
</style>