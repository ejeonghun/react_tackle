import React, { useContext, useState } from 'react';
import AuthContext from '../../AuthContext/AuthContext';
import './Charge.css';
import KakaoPayImg from '../../img/payment_icon_yellow_medium.png';
import TossPayImg from '../../img/logo-toss-pay-blue.png'
import PaycoPayImg from '../../img/PAYCO_Red.png';
import onClickPayment from '../../PayService/PayService.js';


function ChargesPage() {
    const name = sessionStorage.getItem('nickname');
    const Img_URL = `${process.env.REACT_APP_IMG_URI}/payment_icon_yellow_medium.png`

    const { isLoggedIn, nickname } = useContext(AuthContext);
    const [chargeAmount, setChargeAmount] = useState(null); // 초기값을 null로 설정

    // const KaKaoPayDemo = () => {
    //     window.location.href = "https://developers.kakao.com/demo/pay/index";
    // }

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
            <div className='pay-button-container'>
            <h3>결제 수단</h3>
            <div className="charge-select">
                {/* h3태그는 해당 flex div의 제일 상단에 위치하게 한다. */}
                <img src={KakaoPayImg} alt="카카오페이" title="카카오페이" className='pay_img' onClick={() => onClickPayment({pg_method: 'kakaopay', amount: chargeAmount, nickname: nickname})}/>
                <img src={TossPayImg} alt="토스" title="토스페이" className='pay_img' onClick={() => onClickPayment({pg_method: 'tosspay', amount: chargeAmount, nickname: nickname})}/>
                <img src={PaycoPayImg} alt="페이코" title="페이코" className='pay_img' onClick={() => onClickPayment({pg_method: 'payco', amount: chargeAmount, nickname: nickname})}/>
            </div>
            </div>
        </div>
    );
}

export default ChargesPage;
