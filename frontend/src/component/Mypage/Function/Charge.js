import React, { useContext, useState } from 'react';
import AuthContext from '../../AuthContext/AuthContext';
import './Charge.css';
import KakaoPayImg from '../../img/payment_icon_yellow_medium.png';

function ChargesPage() {
    const Img_URL = `${process.env.REACT_APP_IMG_URI}/payment_icon_yellow_medium.png`

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
            <div className="charge-button-container"> {/* 포인트 량 선택 Div */}
            <button className="charge-button" onClick={() => handleChargeClick(1000)}>+천원</button>
            <button className="charge-button" onClick={() => handleChargeClick(5000)}>+오천원</button>
            <button className="charge-button" onClick={() => handleChargeClick(10000)}>+만원</button>
            </div>
            {/* <button className="charge-button large-button bottom-button" onClick={() => alert(`충전 금액: ${chargeAmount}`)}> */}
                <div className='charge-select'> {/* 결제 플랫폼 선택 Div*/}
                <img src={KakaoPayImg} alt="카카오페이" title="카카오페이"></img>
                </div>
            {/* </button> */}
        </div>
    );
}

export default ChargesPage;
