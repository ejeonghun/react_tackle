import React, { useContext, useState } from 'react';
import AuthContext from '../../AuthContext/AuthContext';
import './Charge.css';

function ChargesPage() {
    const { isLoggedIn, nickname } = useContext(AuthContext);
    const [chargeAmount, setChargeAmount] = useState(0); // 초기값을 0으로 설정

    if (!isLoggedIn) {
        alert("이 서비스는 로그인이 필요합니다.");
        window.location.href = "/login";
    }

    const handleChargeClick = (amount) => {
        setChargeAmount(chargeAmount + amount); // 입력된 금액을 현재 누적된 금액에 추가
    };

    const clearInput = () => {
        setChargeAmount(0); // X 버튼을 누를 때 누적된 금액 초기화
    };

    return (
        <div className="points-container">
            <h1 className="user-name">{nickname} 님의 포인트</h1>

            <div className="input-container">
                <input
                    type="number"
                    value={chargeAmount}
                    onChange={(e) => setChargeAmount(parseInt(e.target.value, 10))}
                    placeholder="충전할 금액을 입력해주세요"
                    className={`custom-input ${chargeAmount ? 'input-filled' : ''}`}
                />
                {chargeAmount && (
                    <button className="clear-button" onClick={clearInput}>
                        X
                    </button>
                )}
            </div>

            <button className="charge-button" onClick={() => handleChargeClick(1000)}>+천원</button>
            <button className="charge-button" onClick={() => handleChargeClick(5000)}>+오천원</button>
            <button className="charge-button" onClick={() => handleChargeClick(10000)}>+만원</button>

            <button className="charge-button large-button bottom-button" onClick={() => alert(`충전 금액: ${chargeAmount}`)}>
                충전하기
            </button>
        </div>
    );
}

export default ChargesPage;
