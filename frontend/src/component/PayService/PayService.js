import React from 'react';
import axios from 'axios';

function onClickPayment({pg_method, amount, nickname}) {
    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init('imp00168260');

    /* 2. 결제 데이터 정의하기 */
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

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback);

    /* 3. 콜백 함수 정의하기 */
    function callback(response) {
        const {
            success,
            imp_uid,
            error_msg,
        } = response;

        if (success) {
            // session storage에서 access token 가져오기
            const JWTToken = sessionStorage.getItem('accessToken');
            axios.post('https://api1.lunaweb.dev/api/v1/payment/valid/' + imp_uid, {}, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${JWTToken}`
              }
          })
            // API에 POST 요청 보내기
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });

            alert('결제 성공');
        } else {
            alert(`결제 실패: ${error_msg}`);
        }
    }
}

export default onClickPayment;
