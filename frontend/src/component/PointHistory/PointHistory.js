import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PointHistory.css';
import { Link } from 'react-router-dom';

function PointHistory() {
  // 유저의 Point를 불러오는 API를 통해 현재 포인트와 포인트 사용내역을 받아옴
  const [currentPoint, setCurrentPoint] = useState(1000); // 현재 포인트 상태

  const pointHistory = [
    { date: '10.24', description: '글쓰기', amount: '+100P' },
    { date: '10.24', description: '아이템 구매', amount: '-1000P' },
  ];

  const navigate = useNavigate();

  const goToGiftShop = () => {
    navigate('/giftshop');
  };
  return (
    <div className="container" style={{width:'100%'}}>
    <div className='point_top'>
      {/* <h2 className="info"></h2> */}
      <h1 className="now_point">현재 포인트: <strong>{currentPoint}P</strong></h1> {/* 현재 포인트 출력 */}
      <div className='btn_div'> {/* btn div */}
      {/* 포인트 충전, 환전 버튼 */}
      {/* 충전 버튼 클릭 시 /charge 로 Link */}
      {/* 환전 버튼 클릭 시 /exchange 로 Link */}
      <Link to="/change"><button className='point_btn'>포인트 충전</button> {/* 포인트 충전 버튼 */}</Link>
      <button className='point_btn' onClick={goToGiftShop}>포인트 샵</button> {/* 포인트 환전 버튼 */}
      </div> 
      </div>
      

      <table className="point_table">
        <thead>
          <tr>
            <th className='point_th'>날짜</th>
            <th className='point_th'>설명</th>
            <th className='point_th'>금액</th>
          </tr>
        </thead>
        <tbody>
          {pointHistory.map((item, index) => (
            <tr key={index}>
              <td className='point_data'>{item.date}</td>
              <td className='point_data'>{item.description}</td>
              {/* 금액 부분은 span 태그로 감싸고 금액이 '-'로 시작하면 즉 출금이면 빨간색으로 그렇지 않으면 즉 입금이면 파란색으로 표시 */}
              <td style={{ color: item.amount.startsWith('-') ? 'red' : 'blue' }} className='point_data'>
                {item.amount}
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>

  );
}

export default PointHistory;
