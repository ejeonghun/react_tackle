import React, {useContext, useEffect} from "react";
import './Mypage.css';
import { Link } from "react-router-dom";
import AuthContext from "../AuthContext/AuthContext";
import './Mypage.css';

function Mypage() {
    const { isLoggedIn } = useContext(AuthContext); // isLogin 상태 추가
    const { nickname, profileImage } = useContext(AuthContext); // nickname, profileImage 상태 추가
    if (!isLoggedIn) {
        alert("로그인이 필요한 서비스입니다.");
        window.location.href = "/login";
    } else {
    return (
        <div className="Mypage">
            <div className="Mypage_title">
                <div className="Mypage_title_img">
                    <img src={profileImage} alt="프로필 사진" className="profile_img"></img> {/* 프로필 이미지 추가 */} 
                </div>
                <h2 className="nickname">{nickname}님</h2>
                <div className="Mypage_title_point">
                    <h3 className="margin0">내 포인트</h3>
                    <Link to="/PointHistory" className="point_history">
                        <h4>100,000P ▶</h4>
                    </Link>
                </div>
            </div>
            <div className="Mypage_info">
                <h4 className="mypage_text">마이페이지</h4>
                <div className="icon_text">
                    <Link to="charge" className="icon_link">
                        <img src="./img/money.png" alt="충전" className="icon_img"></img>
                        <h2>충전하기</h2>
                    </Link>
                </div>
                <div className="icon_text">
                    <Link to="/giftshop" className="icon_link">
                        <img src="./img/shopping.png" alt="" className="icon_img"></img>
                        <h2>포인트 샵</h2>
                    </Link>
                </div>
                <div className="icon_text">
                    <Link to="wrote" className="icon_link">
                        <img src="./img/pencil.png" alt="" className="icon_img"></img>
                        <h2>작성한 글</h2>
                    </Link>
                </div>
                <div className="icon_text">
                    <Link to="comment" className="icon_link">
                        <img src="./img/comment.png" alt="" className="icon_img"></img>
                        <h2>작성한 댓글</h2>
                    </Link>
                </div>
                <div className="icon_text_border">
                    <Link to="myvote" className="icon_link">
                        <img src="./img/check-box.png" alt="" className="icon_img"></img>
                        <h2>참여한 투표</h2>
                    </Link>
                </div>
            </div>
        </div>
    );
};}

export default Mypage;  
           