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

// you can pass arguments to use as request parameters/data
const deleteFixedAsset = (fixed_asset_id) => {
  try {
    const res = httpClient.delete(END_POINT, { fixed_asset_id });
    return res;
  } catch (error) {
    console.log(error);
  }
};
// // maybe more than one..
// const createUser = (username, password) =>
//   httpClient.post(END_POINT, { username, password });
export { getAllFixedAssets, deleteFixedAsset };
