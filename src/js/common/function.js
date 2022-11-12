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
};
