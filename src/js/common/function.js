export default {
  // Định dạng cho dữ liệu kiểu tiền
  formatMoney: function (money) {
    try {
      var formatter = new Intl.NumberFormat("de-DE");
      return formatter.format(Math.round(money));
    } catch (error) {
      console.log(error);
    }
  },
  // Lấy ngày tháng năm hiện tại
  getCurrentDate: function () {
    const date = new Date();
    return date.toISOString();
  },
  // Lấy năm hiện tại
  getCurrentYear: function () {
    let date = new Date();
    return date.getFullYear();
  },
  // Format dữ liệu số
  formatNumber: function (num) {
    try {
      // Kiểm tra là số nguyên
      if (Number.isInteger(num) && num < 10 && num > 0) return "0" + num;
      return num;
    } catch (error) {
      console.log(error);
    }
  },

  // Tính hao mòn lũy kế
  accumulatedDepreciation: function (depreciation_value, production_date) {
    try {
      if (!production_date) return 0;
      const production_year = Number(production_date.slice(0, 4));
      const numberOfUsedYear = Math.abs(
        this.getCurrentYear() - production_year
      );
      return numberOfUsedYear * depreciation_value;
    } catch (error) {
      console.log(error);
    }
  },

  // Tính hao mòn năm
  depreciationValue: function (cost, depreciation_rate) {
    return (cost * depreciation_rate) / 100;
  },

  // So sánh 2 đối tượng
  isObjectEqual: function (object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }

    return true;
  },
};
