'use client';
import { useState, useEffect, createContext } from "react";
import Cookies from "js-cookie";

const UserContext = createContext();

const base64UrlDecode = (str) => {
  str = str.replace(/-/g, '+').replace(/_/g, '/');

  switch (str.length % 4) {
    case 2: str += '=='; break;
    case 3: str += '='; break;
  }
  return atob(str);
};

const UserProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState({
    user: {},
    token: "",
  });

  useEffect(() => {
    const initializeAuthentication = () => {
      const token = Cookies.get("tokenx");
      if (token) {
        try {
          const user = JSON.parse(base64UrlDecode(token.split('.')[1]));
          setAuthenticated({ user, token });
        } catch (error) {
          console.error("Failed to decode token:", error);
          Cookies.remove("tokenx");
        }
      }
    };

    const checkAuthentication = async () => {
      const token = Cookies.get("tokenx");
      if (token && token !== authenticated.token) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/v1/checklogin`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          Cookies.remove("tokenx");
          return;
        }
        const resData = await response.json();
        setAuthenticated({
          user: resData.user,
          token: resData.token,
        });
      }
    };

    initializeAuthentication();
    checkAuthentication();
  }, [authenticated.token]);

  return (
    <UserContext.Provider value={[authenticated, setAuthenticated]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
