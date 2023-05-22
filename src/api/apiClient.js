import axios from "axios";
import Cookies from "universal-cookie";
import { TOKEN } from "../constants/settingConstant";
const cookies = new Cookies();
const baseURL = process.env.NEXT_PUBLIC_API;
const axiosClient = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
// Request interceptor for API calls
axiosClient.interceptors.request.use(
  async (config) => {
    const token = cookies.get(TOKEN);
    if (token && config.headers) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default axiosClient;
