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
import { useLocation } from 'react-router-dom';

Modal.setAppElement('#root');

function ChargesPage() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const { isLoggedIn, nickname } = useContext(AuthContext);
    const [chargeAmount, setChargeAmount] = useState(null); // 초기값을 null로 설정


    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const imp_uid = urlParams.get('imp_uid');
    const success_status = urlParams.get('imp_success');
    const now_weburl = window.location.origin; // 현재 웹 주소를 가져옴 -> 테스트 서버, 실제 서버 구분
    const [apiRequestMade, setApiRequestMade] = useState(false);


    // 만약 모바일에서 결제를 진행하면 새로운 창에서 결제를 진행하게 되는데 결제가 완료, 취소되면 
    // 내가 설정한 콜백 URL로 쿼리스트링을 달고 이동하게 되는걸 처리하는 구문
    useEffect(() => { // 만약 리다이렉션으로 처리 되었을 경우의 처리 구문
        if (imp_uid && !apiRequestMade) {
          setApiRequestMade(true);
          const JWTToken = sessionStorage.getItem('accessToken');
          axios.post('https://api1.lunaweb.dev/api/v1/payment/valid/' + imp_uid, {}, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${JWTToken}`
            }
          })
          .then((response) => {
            console.log(response);
            setChargeAmount(response.data.data.response.amount);
            setModalIsOpen(true);
          })
          .catch((error) => {
            console.error(error);
          });
        }
      
        if (modalIsOpen) { // 결제 완료 창을 뛰움
          const timerId = setTimeout(() => {
            setModalIsOpen(false);
            window.history.replaceState({}, document.title, window.location.pathname);
          }, 3000);
          return () => clearTimeout(timerId);
        }
      }, [modalIsOpen, imp_uid, apiRequestMade]);

    // const KaKaoPayDemo = () => {
    //     window.location.href = "https://developers.kakao.com/demo/pay/index";
    // }
    if (!isLoggedIn) {
        alert("이 서비스는 로그인이 필요합니다.");
        window.location.href = "/login";
    }

    const onClickPayment = ({pg_method, amount, nickname}) => { // 결제 버튼을 눌렀을 때 실행되는 함수
        if (amount === 0 || amount === null) {
            alert('충전할 금액을 입력해주세요.');
            return;
        }
        const { IMP } = window;
        IMP.init('imp00168260'); // 가맹점 번호 지정

            IMP.request_pay({
                pg : `${pg_method}`, // 결제 방식 지정
                pay_method : 'card',
                merchant_uid: `mid_${new Date().getTime()}`, // 현재 시간
                name : '태클 포인트 충전',
                amount : `${amount}`, // 충전할 금액
                buyer_email : 'Iamport@chai.finance',
                buyer_name : `${nickname}`, // 충전 요청한 유저의 닉네임
                buyer_tel : '010-1234-5678',
                buyer_addr : '서울특별시 강남구 삼성동',
                buyer_postcode : '123-456',
                m_redirect_url: `${now_weburl}/mypage/charge/` // 만약 새창에서 열린다면 결제 완료 후 리다이렉션할 주소
            }, function (rsp) { // callback
                if (rsp.success) { // 만약 결제가 성공적으로 이루어졌다면
                    const JWTToken = sessionStorage.getItem('accessToken'); // 세션스토리지에서 JWT토큰을 가져옴
                axios.post('https://api1.lunaweb.dev/api/v1/payment/valid/' + rsp.imp_uid, {}, { // API 서버에 결제가 완료되었는지 확인하는 요청을 보냄
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${JWTToken}` // 헤더에 JWT 토큰 포함
                    }
                })
                .then((response) => {
                    console.log(response);
                    setModalIsOpen(true); // 백엔드 API 서버에서 결제가 완료되었다고 응답이 오면 결제 완료 창을 띄움
                })
                .catch((error) => {
                    console.error(error);
                });
            }
            });
        }

    const closeModal = () => {
        setModalIsOpen(false);
        window.history.replaceState({}, document.title, window.location.pathname);
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
            {/* 결제 완료 모달창 */}
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
                {/* 결제 수단 선택 */}
                <img src={KakaoPayImg} alt="카카오페이" title="카카오페이" className='pay_img' onClick={() => onClickPayment({pg_method: 'kakaopay', amount: chargeAmount, nickname: nickname})}/>
                <img src={TossPayImg} alt="토스" title="토스페이" className='pay_img' onClick={() => onClickPayment({pg_method: 'tosspay', amount: chargeAmount, nickname: nickname})}/>
                <img src={PaycoPayImg} alt="페이코" title="페이코" className='pay_img' onClick={() => onClickPayment({pg_method: 'payco', amount: chargeAmount, nickname: nickname})}/>
            </div>
            </div>
        </div>
    );
}

export default ChargesPage;
