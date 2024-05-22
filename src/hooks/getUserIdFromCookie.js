function getUserIdFromCookie() {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; userId=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export default getUserIdFromCookie;
