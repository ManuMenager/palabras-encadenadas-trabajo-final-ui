import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://word-api-hmlg.vercel.app/api",
  timeout: 5000,
});

export default apiClient;