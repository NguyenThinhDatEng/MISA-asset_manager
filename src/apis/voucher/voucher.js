import httpClient from "@/apis/httpClient";

const END_POINT = "/Vouchers";

/**
 * API lấy mã chứng từ mới
 * @returns res là 1 promise
 * @author NVThinh (9-1-2023)
 */
const getNewCode = () => {
  try {
    console.log("Call API get new voucher code");
    const res = httpClient.get(END_POINT + `/newCode`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

/**
 * API lọc và phân trang danh sách chứng từ
 * @returns res là 1 promise
 * @author NVThinh (9-1-2023)
 */
const filterAndPaging = (keyword, limit, offset) => {
  try {
    console.log("Call API get vouchers by filter and paging");
    // Tạo chỗi truy vấn
    let queryParams = "";
    queryParams +=
      "keyword=" + keyword + "&limit=" + limit + "&offset=" + offset;
    const res = httpClient.get(END_POINT + `/filter?${queryParams}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

/**
 * API lấy thông tin chi tiết của voucher (danh sách tài sản được chứng từ)
 * @returns res là 1 promise
 * @author NVThinh (10-1-2023)
 */
const getVoucherDetail = (voucher_id) => {
  try {
    console.log("Call API get voucher detail");
    const res = httpClient.get(END_POINT + `/${voucher_id}/detail`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

/**
 * API thêm mới voucher
 * @returns res là 1 promise
 * @author NVThinh (13-1-2023)
 */
const createVoucher = (voucherAndVoucherDetail) => {
  try {
    console.log("Call API create voucher");
    const res = httpClient.post(END_POINT, voucherAndVoucherDetail);
    return res;
  } catch (error) {
    console.log(error);
  }
};

/**
 * API xóa 1 voucher
 * @returns res là 1 promise
 * @author NVThinh (10-1-2023)
 */
const deleteById = (voucher_id) => {
  try {
    console.log("Call API delete voucher");
    const res = httpClient.delete(END_POINT + `/${voucher_id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

/**
 * API xóa nhiều bản ghi
 * @param {Array} listID mảng các ID của tài sản muốn xóa
 * @author NVThinh 10-1-2023
 */
const deleteMultipleRecords = (listID) => {
  try {
    console.log("Call API Delete multiple records");
    const res = httpClient.post(END_POINT + "/DeleteBatch", listID);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export {
  getNewCode,
  filterAndPaging,
  getVoucherDetail,
  createVoucher,
  deleteById,
  deleteMultipleRecords,
};
