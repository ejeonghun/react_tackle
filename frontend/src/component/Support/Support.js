import React, { useState } from 'react';
import { FaHeadset, FaTimes } from 'react-icons/fa';

const supportData = [
    {
        question: "투표 재충전은 어떻게 하나요?",
        answer: "로그인 후 금액을 입력하고 Kakao Pay를 사용하세요."
    },
    {
        question: "투표 웹 앱을 어떻게 사용하나요?",
        answer: "로그인 후 원하는 카테고리를 통해 자유롭게 사용할 수 있습니다."
    },
    {
        question: "투표를 어떻게 생성하고 관리하나요?",
        answer: "로그인 후 My Page에서 생성 및 관리할 수 있습니다."
    },
    {
        question: "투표 결과 및 통계를 어떻게 확인하나요?",
        answer: "실시간으로 투표 결과와 통계를 확인할 수 있습니다."
    },
    {
        question: "투표 관련 문제 또는 오류가 발생하면 어떻게 도움을 받을 수 있나요?",
        answer: "고객 센터 왼쪽 하단의 실시간 문의 아이콘을 사용해주세요."
    },
    {
        question: "현금 결제는 사용할 수 있나요?",
        answer: "Kakao Pay, Toss Pay 및 Payco Pay 세 가지 결제 방법을 제공합니다."
    },
    // 추가 질문 및 답변...
];

function Support() {
    const [activeIndex, setActiveIndex] = useState(null);
    const [showContactForm, setShowContactForm] = useState(false);

    const handleClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleContactClick = () => {
        setShowContactForm(!showContactForm);
    };

    const handleCloseClick = () => {
        setShowContactForm(false);
    };

    const handleContactSubmit = (event) => {
        event.preventDefault();
    
        // 여기서 이메일 전송 API를 호출합니다.
        // emailjs.sendForm('contact_service', 'contact_form', event.target)
        //   .then(function() {
        //       console.log('SUCCESS!');
        //   }, function(error) {
        //       console.log('FAILED...', error);
        //   });

        // 실제 API 호출을 위한 코드를 주석 처리했습니다.
        // 이 코드를 사용하려면 emailjs 라이브러리를 적절히 설정하고 API 키를 설정해야 합니다.

        // 전송 후 양식을 닫습니다.

        setShowContactForm(false);
    };
    

    return (
        <div style={styles.supportContainer}>
            <h2>자주 묻는 질문</h2>
            {supportData.map((support, index) => (
                <div style={styles.supportItem} key={index}>
                    <div style={styles.question} onClick={() => handleClick(index)}>
                        {support.question}
                        <span style={styles.arrow}>{activeIndex === index ? '▲' : '▼'}</span>
                    </div>
                    {activeIndex === index && <p style={styles.answer}>{support.answer}</p>}
                </div>
            ))}

            <div style={styles.contactButton}>
                <FaHeadset style={styles.headsetIcon} size={40} onClick={handleContactClick} />
            </div>

            {/* 문의 양식 */}
            {showContactForm && (
                <div style={styles.modalBackdrop}>
                    <div style={styles.modalWindow}>
                        <FaTimes style={styles.closeButton} size={20} onClick={handleCloseClick} />
                        <form id="contact-form" style={styles.contactForm}>
                            <input type="hidden" name="contact_number" />
                            <label>이름</label>
                            <input type="text" name="user_name" />
                            <label>이메일</label>
                            <input type="email" name="user_email" />
                            <label>문의 내용</label>
                            <textarea name="message"></textarea>
                            <input type="submit" value="전송" />
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

const styles = {
    modalBackdrop: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalWindow: {
        backgroundColor: '#fff',
        padding: '25px',
        borderRadius: '10px',
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        cursor: 'pointer',
    },

    supportContainer: {
        width: '80%',
        margin: 'auto',
        paddingTop: '30px',
    },
    supportItem: {
        borderBottom: '1px solid #ddd',
        padding: '10px',
        marginBottom: '40px',
        textAlign: 'left',
        paddingTop: '15px',
    },
    question: {
        fontSize: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        cursor: 'pointer',
    },
    arrow: {
        transitionDuration: '0.5s', /* 화살표 회전 속도 */
    },
    answer: {
        fontSize: '17px',
        marginTop: '40px',
        display: 'flex',
        marginBottom: '-5px',
    },
    contactButton: {
        width: '64px',
        height: '64px',
        backgroundColor: 'pink',
        color: 'white',
        borderRadius: '50%',
        position: 'absolute', // 절대 위치로 설정
        bottom: '20px',
        right: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.9)',
    },
    headsetIcon: {
        marginRight: '1px',
    },
      contactForm: {
        display: 'flex',
        flexDirection: 'column',
        padding : '20px'
      },
      label: {
        marginBottom: '8px',
      },
      input: {
        padding: '120px',
        marginBottom: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '14px',
      },
      textarea: {
        padding: '8px',
        marginBottom: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '14px',
        resize: 'vertical',
      },
      submitButton: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
      },
    
};

export default Support;