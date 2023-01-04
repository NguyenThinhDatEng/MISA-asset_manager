import httpClient from "./httpClient";

const END_POINT = "/Users/";

/**
 * API đăng nhập
 * @params user is an object, include
 * @returns res is a promise
 * @author NVThinh (29-12-2022)
 */
const login = (user) => {
  try {
    console.log("login...");
    const res = httpClient.post(END_POINT + "login", user);
    return res;
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description API đăng xuất
 * @author NVThinh (4-1-2023)
 * @returns a promise
 */
const logout = () => {
  try {
    console.log("logout...");
    const res = httpClient.get(END_POINT + "logout");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export { login, logout };
