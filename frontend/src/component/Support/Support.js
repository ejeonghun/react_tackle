import React, { useState } from 'react';
import { FaHeadset } from 'react-icons/fa';

const supportData = [
    {
        question: "투표 충전은 어떻게 하나요?",
        answer: "로그인 후 금액을 입력하고 카카오 페이를 이용하시면 됩니다."
    },
    {
        question: "투표 웹앱을 사용하는 방법은 무엇인가요?",
        answer: "존잘"
    },
    {
        question: "투표 생성 및 관리를 어떻게 할 수 있나요?",
        answer: "해줘"
    },
    {
        question: "투표 결과와 통계를 어떻게 확인하나요?",
        answer: "담배 끊어라"
    },
    {
        question: "투표 관련 문제 또는 오류가 발생했을 때 어떻게 도움을 받을 수 있나요?",
        answer: "API 만듫어줘"
    },
    {
        question: "투표 웹앱에 대한 개인정보 보호 및 보안 조치는 어떻게 되나요?",
        answer: "해주세요"
    },
    // 추가적인 질문과 답변들...
];

function Support() {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const renderedSupports = supportData.map((support, index) => (
        <div style={styles.supportItem} key={index}>
            <div style={styles.question} onClick={() => handleClick(index)}>
                {support.question} 
                <span style={styles.arrow}>▼</span>
            </div>
            {activeIndex === index && <p style={styles.answer}>{support.answer}</p>}
        </div>
    ));

    const handleContactClick = () => {
        // 고객센터 모달창을 띄워줍니다.
    };



    return (
        <div style={styles.supportContainer}>
            <h2>자주 묻는 질문</h2>
            {renderedSupports}
            <div style={styles.contactButton}>
                <FaHeadset style={styles.headsetIcon} size={40} onClick={handleContactClick} />
            </div>
        </div>
    );
}

const styles = {
   supportContainer: {
       width: '60%',
       margin: 'auto',
       paddingTop: '30px'
   },
   supportItem: {
       borderBottom: '1px solid #ddd',
       padding: '10px',
       marginBottom: '10px',
       textAlign: 'left',
       paddingTop: '15px'

   },
   question:{
       fontSize:'20px',
       display:'flex',
       justifyContent:'space-between',
       cursor:'pointer'
   },
   arrow:{
      transitionDuration:'0.5s' /* 화살표 회전 속도 */
   }, 
   answer:{
      fontSize:'17px',
      marginTop:'15px', 
      display : 'flex',
      marginBottom:'-5px'
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
        boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.9)'
    },
    headsetIcon:{
        marginRight:'1px',
    },
}

export default Support;
