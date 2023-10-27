import React, { useState } from 'react';

function PointHistory() {
  const [currentPoint, setCurrentPoint] = useState(1000); // 현재 포인트 상태

  const history = [
    { date: '10.24', description: '글쓰기', amount: '+100P' },
    { date: '10.24', description: '아이템 구매', amount: '-1000P' },
  ];

  return (
    <div className="container">
      <h2 className="my-3">포인트 입출금 내역</h2>
      <p className="mb-4">현재 포인트: <strong>{currentPoint}P</strong></p> {/* 현재 포인트 출력 */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>날짜</th>
            <th>설명</th>
            <th>금액</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.description}</td>
              {/* 금액 부분은 span 태그로 감싸고 금액이 '-'로 시작하면 즉 출금이면 빨간색으로 그렇지 않으면 즉 입금이면 파란색으로 표시 */}
              <td style={{ color: item.amount.startsWith('-') ? 'red' : 'blue' }}>
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
