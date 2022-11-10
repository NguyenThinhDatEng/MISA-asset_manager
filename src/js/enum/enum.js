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
    Text: 0,
    Number: 1,
    Money: 2,
    Year: 3,
  },
};
