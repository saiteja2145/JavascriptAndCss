import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = props => {
  const [isLoggedIn, setLoginStatus] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setLoginStatus
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
