import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import './PointHistory.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PointHistory() {
  // 유저의 Point를 불러오는 API를 통해 현재 포인트와 포인트 사용내역을 받아옴
  const [currentPoint, setCurrentPoint] = useState(1000); // 현재 포인트 상태
  const JWTToken = sessionStorage.getItem("accessToken");
  const [Pointdata, setPointData] = useState(null); // data라는 상태를 만듭니다.
  const [PointHistory, setPointHistory] = useState([]); // data라는 상태를 만듭니다.

  useEffect(() => {
    const getMyPointData = async () => {
        try {
            const response = await axios.get('https://api1.lunaweb.dev/api/v1/member/info', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JWTToken}`
                }
            });
            setPointData(response.data);
        } catch (error) {
            console.log("Failed to fetch data", error);
            alert("세션이 만료되었습니다, 다시 로그인해주세요.")
            window.location.href = "/logout";
        }
    };
    getMyPointData();
    
    const getMyPointHistoryData = async () => {
      try {
          const response2 = await axios.get('https://api1.lunaweb.dev/api/v1/mypage/myPoint', {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${JWTToken}`
              }
          });
          setPointHistory(response2.data.data);
      } catch (error) {
          console.log("Failed to fetch data", error);
          alert("세션이 만료되었습니다, 다시 로그인해주세요.")
          window.location.href = "/logout";
      }
  };
  getMyPointHistoryData();
}, [JWTToken]);

  const navigate = useNavigate();
  const goToGiftShop = () => {
    navigate('/giftshop');
  };

  const formattedPoint = Pointdata && Pointdata.point ? Pointdata.point.toLocaleString() : ''; // 포인트 ", " 추가

  function ReasonMean(num) {
    if (num === 0) { return "투표 게시글 작성"; }
    else if (num === 1) { return "투표 승리"; }
    else if (num === 2) { return "투표 패배"; }
    else if (num === 3) { return "환불?"; }
  }

  return (
    <div className="container" style={{width:'100%'}}>
    <div className='point_top'>
      {/* <h2 className="info"></h2> */}
      <h1 className="now_point">현재 포인트: <strong>{formattedPoint}P</strong></h1> {/* 현재 포인트 출력 */}
      <div className='btn_div'> {/* btn div */}
      {/* 포인트 충전, 환전 버튼 */}
      {/* 충전 버튼 클릭 시 /charge 로 Link */}
      {/* 환전 버튼 클릭 시 /exchange 로 Link */}
      <Link to="/Mypage/Charge"><button className='point_btn'>포인트 충전</button> {/* 포인트 충전 버튼 */}</Link>
      <button className='point_btn' onClick={goToGiftShop}>포인트 샵</button> {/* 포인트 환전 버튼 */}
      </div> 
      </div>
      <div className='point_tableDiv'>
      <table className="point_table">
        <thead>
          <tr>
            <th className='point_th'>날짜</th>
            <th className='point_th'>설명</th>
            <th className='point_th'>금액</th>
          </tr>
        </thead>
        <tbody>
          {PointHistory.map((PointHistory) => (
            <tr key={PointHistory.pointId}>
              <td className='point_data'>{new Date(PointHistory.pointUsingDate).toLocaleDateString()}</td>
              <td className='point_data'>{ReasonMean(PointHistory.pointAccumulationReason)}</td>
              {/* 금액 부분은 span 태그로 감싸고 금액이 '-'로 시작하면 즉 출금이면 빨간색으로 그렇지 않으면 즉 입금이면 파란색으로 표시 */}
              <td style={{ color: String(PointHistory.pointChangeAmount).startsWith('-') ? 'red' : 'blue' }} className='point_data'>
              {PointHistory.pointChangeAmount > 0 ? `+${PointHistory.pointChangeAmount}` : PointHistory.pointChangeAmount}
            </td>
            </tr>
          ))}
        </tbody>

      </table>
      </div>
    </div>

  );
}

export default PointHistory;
