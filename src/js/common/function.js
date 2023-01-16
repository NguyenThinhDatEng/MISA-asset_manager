import KeyCode from "@/js/common/keycode";
import Enum from "@/js/enum/enum";

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
  accumulatedValue: function (depreciation_value, production_date, cost) {
    try {
      if (!production_date) return 0;
      const production_year = Number(production_date.slice(0, 4));
      const numberOfUsedYear = Math.abs(
        this.getCurrentYear() - production_year
      );
      let result = numberOfUsedYear * depreciation_value;
      // Nếu hao mòn lũy kế lớn hơn nguyên giá
      if (result > cost) return cost;
      return result;
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

  /**
   * Tìm kiếm những item thỏa mãn điều kiện lọc
   * @param {Array} data mảng dữ liệu cần lọc
   * @param {String} field01 trường thuộc tính cần xét thứ 1
   * @param {String} field02 trường thuộc tính cần xét thứ 2
   * @returns {Array} Mảng giá trị sau khi lọc
   * @author NVThinh 25-11-2022
   */
  autoComplete: function (value, data, field01, field02 = field01) {
    try {
      let filter;
      let resultArr = data.filter((obj) => {
        filter =
          obj[field01].toLowerCase()?.includes(value.toLowerCase()) ||
          obj[field02].toLowerCase()?.includes(value.toLowerCase());
        return filter;
      });
      return resultArr;
    } catch (error) {
      console.log(error);
    }
  },

  // Kiểm tra input đầu vào chỉ có ký tự số
  onlyNumbers: function (e) {
    try {
      // Mã key
      const keyCode = e.keyCode;
      // Lấy mảng các chức năng cơ bản
      let excludedKeys = KeyCode.BasicFeature;
      excludedKeys.push(Enum.KeyCode.Comma);
      // Kiểm tra điều kiện
      if (
        !(
          (keyCode >= 48 && keyCode <= 57) ||
          (keyCode >= 96 && keyCode <= 105) ||
          excludedKeys.includes(keyCode)
        )
      ) {
        e.preventDefault();
      }
    } catch (error) {
      console.log(error);
    }
  },
};
