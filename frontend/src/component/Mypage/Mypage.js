import React, { useContext, useEffect, useState } from "react";
import './Mypage.css';
import { Link } from "react-router-dom";
import AuthContext from "../AuthContext/AuthContext";
import './Mypage.css';
import axios from 'axios';
import Loading from "../Loading/Loading";

function Mypage() {
    const JWTToken = sessionStorage.getItem("accessToken");
    const [data, setData] = useState(null); // data라는 상태를 만듭니다.
    const { isLoggedIn } = useContext(AuthContext); // isLogin 상태 추가
    const { profileImage } = useContext(AuthContext); // nickname, profileImage 상태 추가
    //닉네임 변경
    const handleNicknameClick = async () => {
        const newNickname = window.prompt("새 닉네임을 입력하세요", data.nickname);
        if (newNickname) {
            try {
                const response = await axios.put(
                    'https://api1.lunaweb.dev/api/v1/member/update-nickname',
                    { nickname: newNickname },
                    { headers: { 'Authorization': `Bearer ${JWTToken}` } }
                );
                setData({ ...data, nickname: response.data.nickname });
            } catch (error) {
                console.log("Failed to update nickname", error);
            }
        }
    };
    useEffect(() => {
        const getMyPageData = async () => {
            try {
                const response = await axios.get('https://api1.lunaweb.dev/api/v1/member/info', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${JWTToken}`
                    }
                });
                setData(response.data);
            } catch (error) {
                console.log("Failed to fetch data", error);
                alert("세션이 만료되었습니다, 다시 로그인해주세요.")
                window.location.href = "/logout";
            }
        };
        getMyPageData();
    }, [JWTToken]);

    const formattedPoint = data && data.point ? data.point.toLocaleString() : '';
    const registeredDate = data && data.regAt ? new Date(data.regAt) : null;
    const formattedDate = registeredDate ? registeredDate.toLocaleDateString('ko-KR', {
        year: '2-digit', month: '2-digit', day: '2-digit'
    }) : '';

    if (!data) {
        return <div>Loading...</div> // 데이터가 아직 로딩 중일 때
    }


    if (!isLoggedIn) {
        alert("로그인이 필요한 서비스입니다.");
        window.location.href = "/login";
    } else {
        return (
            <div className="Mypage">
                <div className="Mypage_title">
                    <div className="Mypage_title_text">
                        <h2 className="nickname" onClick={handleNicknameClick}>
                            {data.nickname}님
                        </h2>                    
                        <div className="Mypage_title_point" style={{ display: 'flex' }}>
                            <Link to="pointhistory" className="point_history">
                                <h4>{formattedPoint}P ▶</h4>
                            </Link>
                        </div>
                    </div>
                    <div className="Mypage_title_img">
                        <img src={profileImage} alt="프로필 사진" className="profile_img"></img>
                        <h4 className="registered_date">Join:{formattedDate}</h4>
                    </div>
                </div>
                <div className="Mypage_info">
                    <h4 className="mypage_text">마이페이지</h4>
                    <Link to="charge" className="icon_group">
                        <img src="./img/money.png" alt="충전" className="icon_img" />
                        <span>충전하기</span>
                    </Link>
                    <Link to="/giftshop" className="icon_group">
                        <img src="./img/shopping.png" alt="" className="icon_img" />
                        <span>포인트 샵</span>
                    </Link>
                    <Link to="wrote" className="icon_group">
                        <img src="./img/pencil.png" alt="" className="icon_img" />
                        <span>작성한 글</span>
                    </Link>
                    <Link to="mycomment" className="icon_group">
                        <img src="./img/comment.png" alt="" className="icon_img" />
                        <span>작성한 댓글</span>
                    </Link>
                    <Link to="myvote" className="icon_group">
                        <img src="./img/check-box.png" alt="" className="icon_img" />
                        <span>참여한 투표</span>
                    </Link>
                </div>
            </div>
        );
    };
}

export default Mypage;  
