import React, {useContext} from "react";
import AuthContext from '../AuthContext/AuthContext';


// 생성된 JWT 토큰값 지우기, 로그아웃 alert 띄우기

function Logout() {
    const { setIsLoggedIn } = useContext(AuthContext); // 로그인 여부 확인
    const token = sessionStorage.getItem("accessToken"); // JWT 토큰값 가져오기
    if (token) {
        setIsLoggedIn(false); // 로그인 여부 false로 변경
        sessionStorage.removeItem("accessToken"); // JWT 토큰값 지우기
        sessionStorage.removeItem("nickname"); // 세션에 저장된 닉네임 값 지우기
        sessionStorage.removeItem("profileImage"); // 세션에 저장된 프로필 이미지 값 지우기
        alert("로그아웃 되었습니다."); // 로그아웃 alert 띄우기
        window.location.href = "/"; // 메인페이지로 이동시키기
    } else {
        alert("잘못된 접근입니다.") // 잘못된 접근 alert 띄우기
    }
}

export default Logout;