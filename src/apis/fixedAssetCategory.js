import httpClient from "./httpClient";

const END_POINT = "/FixedAssetCategories";

/**
 * API lấy thông tin tất cả loại tài sản
 * @returns res is a promise
 * @author NVThinh (18-11-2022)
 */
const getAllFixedAssetCategories = () => {
  try {
    console.log("Call API get all fixed asset categories");
    const res = httpClient.get(END_POINT);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export { getAllFixedAssetCategories };
