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
  // Lấy năm hiện tại
  getCurrentYear: function () {
    return new Date().getFullYear();
  },
  // Format dữ liệu số
  formatNumber: function (value) {
    try {
      if (value < 10 && value > 0) return "0" + value;
      return value;
    } catch (error) {
      console.log(error);
    }
  },
};
