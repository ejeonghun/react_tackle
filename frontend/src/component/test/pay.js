import React from 'react';

function Payment() {
  function onClickPayment(pg_method) {
    /* 1. 가맹점 식별하기 */
    // 변수로 받음
    const { IMP } = window;
    IMP.init('imp00168260');

    /* 2. 결제 데이터 정의하기 */
    const data = {
      pg: `${pg_method}`,                           // PG사
      pay_method: 'card',                           // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`,   // 주문번호
      amount: 1000,                                 // 결제금액
      name: '태클 포인트 결제',                  // 주문명
      buyer_name: '홍길동',                           // 구매자 이름
      buyer_tel: '01012341234',                     // 구매자 전화번호
      buyer_email: 'example@example',               // 구매자 이메일
      buyer_addr: '신사동 661-16',                    // 구매자 주소
      buyer_postcode: '06018',                      // 구매자 우편번호
    };

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback);
  }

  /* 3. 콜백 함수 정의하기 */
  function callback(response) {
    const {
      success,
      merchant_uid,
      error_msg,
    } = response;

    if (success) {
      alert('결제 성공');
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  }

  return (
    <div>
    <button onClick={() => onClickPayment('kakaopay')}>카카오페이 결제하기</button>
    <button onClick={() => onClickPayment('tosspay')}>토스페이 결제하기</button>
    </div>
  );
}
export default Payment;
