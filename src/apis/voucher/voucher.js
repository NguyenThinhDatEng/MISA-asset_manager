import httpClient from "@/apis/httpClient";

const END_POINT = "/Vouchers";

/**
 * API mã chứng từ mới
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

export { getNewCode };
