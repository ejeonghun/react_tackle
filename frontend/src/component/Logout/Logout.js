import React, {useContext} from "react";
import { Link } from "react-router-dom";
import AuthContext from '../AuthContext/AuthContext';


// 생성된 JWT 토큰값 지우기, 로그아웃 alert 띄우기

function Logout() {
    const { setIsLoggedIn } = useContext(AuthContext);
    const token = sessionStorage.getItem("id");
    if (token) {
        setIsLoggedIn(false);
        sessionStorage.removeItem("id");
        alert("로그아웃 되었습니다.");
    }
    <Link to="/" />;
}

export default Logout;