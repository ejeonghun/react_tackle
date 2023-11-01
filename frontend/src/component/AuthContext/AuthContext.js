import React, { useState, useEffect } from 'react';

// 로그인 상태 관리를 위한 Context API
const AuthContext = React.createContext();
const session = sessionStorage.getItem("id");

// session 값이 있으면 로그인 상태 유지
// session 값이 있으면 const isLoggedIn = true;
// session 값이 없으면 const isLoggedIn = false;
// const isLoggedIn = session ? true : false;

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(session ? true : false);
    const [nickname, setNickname] = useState(null); // nickname 상태 추가
    const [profileImage, setProfileImage] = useState(null); // profileImage 상태 추가
    useEffect(() => { // 렌더링이 완료될 때 마다 실행
        const nickname_session = sessionStorage.getItem('nickname');
        const profileImage_session = sessionStorage.getItem('profileImage');

        if (nickname_session != null && profileImage_session != null) { // 새로고침 시 세션스토리지에는 값이 있는데 로그인 상태가 풀리는걸 확인
            setIsLoggedIn(true);
            setProfileImage(sessionStorage.getItem('profileImage'));
            setNickname(sessionStorage.getItem('nickname'));
        }
    }, []); 
    // 최초 렌더링 시에만 실행
    //  
    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, nickname, setNickname, profileImage, setProfileImage }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
