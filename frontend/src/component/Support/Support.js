import React, { useState } from 'react';
import { FaHeadset } from 'react-icons/fa';

const supportData = [
    {
        question: "투표 충전은 어떻게 하나요?",
        answer: "니 알아 하세요"
    },
    {
        question: "이우석",
        answer: "존잘"
    },
    {
        question: "이정훈",
        answer: "해줘"
    },
    {
        question: "정성윤",
        answer: "담배 끊어라"
    },
    {
        question: "이승열",
        answer: "API 만듫어줘"
    },
    {
        question: "이시영",
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

    return (
        <div style={styles.supportContainer}>
            <h2>자주 묻는 질문</h2>
            {renderedSupports}
            <div style={styles.contactButton}>
                <FaHeadset style={styles.headsetIcon} size={40} />
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
       textAlign: 'left'
   },
   question:{
       fontSize:'20px',
       display:'flex',
       justifyContent:'space-between',
       cursor:'pointer'
   },
   arrow:{
      transitionDuration:'0.3s' /* 화살표 회전 속도 */
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
    },
    headsetIcon:{
        marginRight:'1px',
    },
}

export default Support;
