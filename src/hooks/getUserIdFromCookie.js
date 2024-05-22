import Cookies from "js-cookie";

const getUserIdFromCookie = () => {
  return Cookies.get("userId");
};

export default getUserIdFromCookie;
