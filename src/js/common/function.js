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
};
