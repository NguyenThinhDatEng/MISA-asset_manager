import httpClient from "./httpClient";

const END_POINT = "/Departments";

/**
 * API lấy thông tin tất cả bộ phận sử dụng
 * @returns res is a promise
 * @author NVThinh (18-11-2022)
 */
const getAllDepartments = () => {
  try {
    console.log("Call API get all departments");
    const res = httpClient.get(END_POINT);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export { getAllDepartments };
