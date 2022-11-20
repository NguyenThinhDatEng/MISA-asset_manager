import httpClient from "./httpClient";

const END_POINT = "/FixedAssets";

/**
 * API lấy thông tin tất cả tài sản cố định
 * @returns res is a promise
 * @author NVThinh (18-11-2022)
 */
const getAllFixedAssets = () => {
  try {
    console.log("Call API get all fixed assets");
    const res = httpClient.get(END_POINT);
    return res;
  } catch (error) {
    console.log(error);
  }
};

/**
 * API lấy thông tin 01 tài sản cố định theo ID
 * @returns res is a promise
 * @author NVThinh (18-11-2022)
 */
const getFixedAssetByID = (fixedAssetID) => {
  try {
    console.log("Call API a fixed asset by ID");
    const res = httpClient.get(END_POINT + `/${fixedAssetID}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

/**
 * API thêm mới tài sản cố định
 * @param {Object} fixedAsset tài sản cố định
 * @returns res is a promise
 * @author NVThinh 20-11-2022
 */
const createFixedAsset = (fixedAsset) => {
  try {
    console.log("Create a new fixed asset");
    const res = httpClient.post(END_POINT, fixedAsset);
    return res;
  } catch (error) {
    console.log(error);
  }
};

/**
 * API cập nhật tài sản cố định
 * @param {String} fixedAssetID ID tài sản cố định
 * @param {Object} fixedAsset tài sản cố định
 * @returns res is a promise
 * @author NVThinh 20-11-2022
 */
const editFixedAsset = (fixedAssetID, fixedAsset) => {
  try {
    console.log("Edit a new fixed asset");
    const res = httpClient.put(END_POINT + `/${fixedAssetID}`, fixedAsset);
    return res;
  } catch (error) {
    console.log(error);
  }
};

/**
 * API xóa 1 tài sản
 * @param {string} fixedAssetID id của bản ghi cần xóa
 * @author Nguyen Van Thinh (12-11-2022)
 */
const deleteFixedAsset = (fixedAssetID) => {
  try {
    console.log("Call API Delete a fixed asset");
    const res = httpClient.delete(END_POINT + `/${fixedAssetID}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

/**
 * API xóa nhiều bản ghi tài sản
 * @param {Array} listID mảng các ID của tài sản muốn xóa
 * @author NVThinh 14-11-2022
 */
const deleteMultipleFixedAssets = (listID) => {
  try {
    console.log("Call API Delete multiple assets");
    const res = httpClient.post(END_POINT + "/DeleteBatch", listID);
    return res;
  } catch (error) {
    console.log(error);
  }
};
// // maybe more than one..
// const createUser = (username, password) =>
//   httpClient.post(END_POINT, { username, password });
export {
  getAllFixedAssets,
  getFixedAssetByID,
  createFixedAsset,
  editFixedAsset,
  deleteFixedAsset,
  deleteMultipleFixedAssets,
};
