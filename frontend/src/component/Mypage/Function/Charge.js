import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../AuthContext/AuthContext';
import './Charge.css';
import Modal from 'react-modal';
import KakaoPayImg from '../../img/payment_icon_yellow_medium.png';
import TossPayImg from '../../img/logo-toss-pay-blue.png'
import PaycoPayImg from '../../img/PAYCO_Red.png';
// import onClickPayment from '../../PayService/PayService.js'; // 결제 서비스 내부에서 정의함.
import coinGif from '../../img/coincharge.gif';
import axios from 'axios';

Modal.setAppElement('#root');

function ChargesPage() {
    const name = sessionStorage.getItem('nickname');
    const Img_URL = `${process.env.REACT_APP_IMG_URI}/payment_icon_yellow_medium.png`
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const { isLoggedIn, nickname } = useContext(AuthContext);
    const [chargeAmount, setChargeAmount] = useState(null); // 초기값을 null로 설정


    useEffect(() => {
        if (modalIsOpen) {
            const timerId = setTimeout(() => setModalIsOpen(false), 3000);
            return () => clearTimeout(timerId);
        }
    }, [modalIsOpen]);

    // const KaKaoPayDemo = () => {
    //     window.location.href = "https://developers.kakao.com/demo/pay/index";
    // }
    if (!isLoggedIn) {
        alert("이 서비스는 로그인이 필요합니다.");
        window.location.href = "/login";
    }

    const onClickPayment = ({pg_method, amount, nickname}) => {
        if (amount === 0 || amount === null) {
            alert('충전할 금액을 입력해주세요.');
            return;
        }
        const { IMP } = window;
        IMP.init('imp00168260');

        const data = {
            pg: `${pg_method}`,
            pay_method: 'card',
            merchant_uid: `mid_${new Date().getTime()}`,
            amount: `${amount}`,
            name: '태클 포인트 충전',
            buyer_name: `${nickname}`,
            buyer_tel: '01012341234',
            buyer_email: 'example@example',
            buyer_addr: '신사동 661-16',
            buyer_postcode: '06018',
        };
        IMP.request_pay(data, callback); // 결제 모듈 호출 

        function callback(response) {
            const {
                success,
                imp_uid,
                error_msg,
            } = response;

            if (success) {
                const JWTToken = sessionStorage.getItem('accessToken');
                axios.post('https://api1.lunaweb.dev/api/v1/payment/valid/' + imp_uid, {}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${JWTToken}`
                    }
                })
                .then((response) => {
                    console.log(response);
                    setModalIsOpen(true);
                })
                .catch((error) => {
                    console.error(error);
                });
            } else {
                alert(`결제 실패: ${error_msg}`);
            }
        }
    }

    const closeModal = () => {
        setModalIsOpen(false);
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
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => {}}
                className="Modal"
                overlayClassName="Overlay"
            >
                <img src={coinGif} alt="Coin" />
                <h2>{chargeAmount}포인트 충전 완료</h2>
            </Modal>
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
