import Cookies from "universal-cookie";
import { listCookies } from "../constants/settingConstant";
const cookies = new Cookies();
export const addCookie = (name, value) => {
  cookies.set(name, value, { path: "/" });
};
export const getCookie = (name) => {
  return cookies.get(name);
};
export const removeCookie = () => {
  listCookies.forEach((name) => {
    cookies.remove(name, { path: "/" });
  });
};
