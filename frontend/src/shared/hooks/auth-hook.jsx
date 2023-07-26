import { useCallback, useEffect, useState } from "react";

let logoutTime;
export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpDate, setTokenExpDate] = useState();
  const [userId, setuserId] = useState(false);

  const login = useCallback((uid, token, expDate) => {
    setToken(token);
    setuserId(uid);
    const tokenExpDate =
      expDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpDate(tokenExpDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        exp: tokenExpDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpDate(null);
    setuserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpDate) {
      const remainingTime = tokenExpDate.getTime() - new Date().getTime();
      logoutTime = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTime);
    }
  }, [token, logout, tokenExpDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.exp) > new Date()
    ) {
      login(storedData.userId, storedData.token, new Date(storedData.exp));
    }
  }, [login]);

  return {token, login, logout, userId}
};
