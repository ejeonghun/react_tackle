import React, { useContext, useState } from 'react';
import AuthContext from '../../AuthContext/AuthContext';
import './Charge.css';

function ChargesPage() {
    const { isLoggedIn, nickname } = useContext(AuthContext);
    const [chargeAmount, setChargeAmount] = useState(''); // 초기값을 빈 문자열로 설정

    if (!isLoggedIn) {
        alert("이 서비스는 로그인이 필요합니다.");
        window.location.href = "/login";
    }

    const handleChargeClick = (amount) => {
        setChargeAmount(amount); // 충전 버튼을 누를 때 입력값을 설정
    };

    const clearInput = () => {
        setChargeAmount(''); // X 버튼을 누를 때 입력값을 초기화
    };

    return (
        <div className="points-container">
            <h1 className="user-name">{nickname} 님의 포인트</h1>

            <div className="input-container">
                <input
                    type="number"
                    value={chargeAmount}
                    onChange={(e) => setChargeAmount(e.target.value)}
                    placeholder="충전할 금액을 입력해주세요"
                    className={`custom-input ${chargeAmount ? 'input-filled' : ''}`} // input-filled 클래스 추가
                />
                {chargeAmount && ( // 금액이 입력되면 X 버튼 표시
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
