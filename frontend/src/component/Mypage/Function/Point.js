import React, {useContext} from 'react';
import AuthContext from '../../AuthContext/AuthContext';
import './Point.css';

function PointsPage() {
  const { isLoggedIn } = useContext(AuthContext); // isLogin 상태 추가
  const { nickname } = useContext(AuthContext); // nickname 상태 추가
  if (!isLoggedIn) {
      alert("로그인이 필요한 서비스입니다.");
      window.location.href = "/login";
  } else {
  return (
    <div className="points-container">
      <h1 className="title">회원 포인트</h1>
      <hr/>
      <div className="user-info">
        <p className="user-name">{nickname} 님의 포인트</p>
        <p className="user-points">10000 points</p>
      </div>
    </div>
  );
  }
}

export default PointsPage;
