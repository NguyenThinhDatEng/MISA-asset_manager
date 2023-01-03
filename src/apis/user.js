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
    const res = httpClient.post(END_POINT + "login", user, {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export { login };
