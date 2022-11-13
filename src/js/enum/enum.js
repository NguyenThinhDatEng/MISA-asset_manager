export default {
  Mode: {
    Add: 0, // Thêm mới
    Update: 1, // Chỉnh sửa
    Delete: 2, // Xóa 1 bản ghi
    DeleteMulti: 3, // Xóa nhiều bản ghi
    Duplicate: 4, // Nhân bản
  },
  Type: {
    Main: 1, // Button chính
    Secondary: 2, // Button phụ
  },
  DlgType: {
    RequiredInfo: 0, // Thông tin bắt buộc
    Describe: 1, // Miêu tả thông tin có tính nghiệp vụ
  },
  // Phím tắt
  KeyCode: {
    // Phím Enter
    ENTER: 13,
    // Phím ESC
    ESC: 27,
    // Phím Ctrl
    Ctrl: 17,
    // Phím F3
    F3: 114,
    // Phím F8
    F8: 119,
    // Phím F9
    F9: 120,
    // Phím `
    SelectTable: 115,
  },
  DataType: {
    Text: 0, // Kiểu chuỗi
    Number: 1, // Kiểu số
    Money: 2, // Kiểu tiền
    Year: 3, // Kiểu năm (thời gian)
    Rate: 4, // Kiểu tỉ lệ
  },
};
