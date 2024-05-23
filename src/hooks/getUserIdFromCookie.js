import Cookies from "js-cookie";

const userId = Cookies.get("userId");
const token = Cookies.get("token");
console.log("userId:", userId); // Add this line
console.log("token:", token);

const getUserIdFromCookie = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; userId=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

export default getUserIdFromCookie;
