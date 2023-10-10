import React, { useState } from 'react';

// 로그인 상태 관리를 위한 Context API
const AuthContext = React.createContext();
const session = sessionStorage.getItem("id");

// session 값이 있으면 로그인 상태 유지
// session 값이 있으면 const isLoggedIn = true;
// session 값이 없으면 const isLoggedIn = false;
// const isLoggedIn = session ? true : false;

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(session ? true : false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
