import httpClient from "@/apis/httpClient";

const END_POINT = "/Budgets";

/**
 * API lấy thông tin tất cả nguồn hình thành tài sản
 * @returns res is a promise
 * @author NVThinh (7-1-2023)
 */
const getAllBudgets = () => {
  try {
    console.log("Call API get all budgets");
    const res = httpClient.get(END_POINT);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export { getAllBudgets };
