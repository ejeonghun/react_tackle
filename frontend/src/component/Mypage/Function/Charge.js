import React, { useContext, useState } from 'react';
import AuthContext from '../../AuthContext/AuthContext';
import './Charge.css';
import KakaoPayImg from '../../img/payment_icon_yellow_medium.png';

function ChargesPage() {
    const Img_URL = `${process.env.REACT_APP_IMG_URI}/payment_icon_yellow_medium.png`

    const { isLoggedIn, nickname } = useContext(AuthContext);
    const [chargeAmount, setChargeAmount] = useState(null); // 초기값을 null로 설정

    const KaKaoPayDemo = () => {
        window.location.href = "https://developers.kakao.com/demo/pay/index";
    }

    if (!isLoggedIn) {
        alert("이 서비스는 로그인이 필요합니다.");
        window.location.href = "/login";
    }

    const handleChargeClick = (amount) => {
        setChargeAmount(prevAmount => (prevAmount !== null ? prevAmount + amount : amount)); // 입력된 금액을 현재 누적된 금액에 추가
    };

    const clearInput = () => {
        setChargeAmount(null); // X 버튼을 누를 때 입력된 금액 초기화
    };

    const handleChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value)) {
            setChargeAmount(value);
        }
    };

    return (
        <div className="points-container">
            <h1 className="user-name">{nickname} 님의 포인트</h1>
            <div className="input-container">
                <input
                    type="number"
                    value={chargeAmount !== null ? chargeAmount : ''}
                    onChange={handleChange}
                    placeholder="충전할 금액을 입력해주세요"
                    className={`custom-input ${chargeAmount !== null ? 'input-filled' : ''}`}
                />
                {chargeAmount !== null && (
                    <button className="clear-button" onClick={clearInput}>
                        X
                    </button>
                )}
            </div>
            <div className="charge-button-container">
                <button className="charge-button" onClick={() => handleChargeClick(1000)}>₩ 1000</button>
                <button className="charge-button" onClick={() => handleChargeClick(5000)}>₩ 5000</button>
                <button className="charge-button" onClick={() => handleChargeClick(10000)}>₩ 10000</button>
            </div>
            <div className="charge-select">
                <img src={KakaoPayImg} alt="카카오페이" title="카카오페이" onClick={KaKaoPayDemo}/>
            </div>
        </div>
    );
}

export default ChargesPage;
