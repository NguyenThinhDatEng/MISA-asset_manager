import axios from "axios";

// tạo 1 axios instances
const httpClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 3000, // Nếu kết nối có vấn đề -> tránh treo kết nối mãi mãi
  headers: {
    "Content-Type": "application/json",
    // anything you want to add to the headers
  },
});

export default httpClient;
