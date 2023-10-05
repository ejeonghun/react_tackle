import React from 'react';
import { Link } from 'react-router-dom';
import Write_btn from '../Write_btn/Write_btn';

// Login.js
// Hello, Component! 라는 문자열을 담은 div 요소 Login 만들기
// 컴포넌트의 첫글자는 무조건 대문자로 작성해야함!
const Hotboard = () => {
    return (
<div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100vh' , textAlign:'left'}}>
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width:'90%', height:'auto'}}>
    <h2 style={{borderBottom:'1px solid black'}}>HOT 게시글</h2>
    {/* <ProgressBar vote1={47} vote2={53} /> */}
    <div className='Main_Content' style={{width:'100%'}}>
      {/* 첫번째 최신글 */}
      <Link to="/게시글 라우팅1"> 
      <h4>[스포츠] 손흥민 VS 김민재</h4>
      <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' , borderBottom: '1px solid #706d6d'}}>
        <h5>손흥민</h5>
        <h4 style={{ position:'absolute', width:'100%', textAlign:'center' }}>VS</h4>
        <h5>김민재</h5>
      </div>
      <div className="writer" style={{display:'flex', justifyContent:'space-between'}}>
      <h5>Date : </h5>
      <h5>누적 금액 : </h5>
      <h5>Writer : </h5>
      </div>
      </Link>
      <Link to="/게시글 라우팅2">
      {/* 두번째 최신글 */}
      <h4>AI빅데이터인공지능 VS 정보보안학과</h4>
      <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' , borderBottom: '1px solid #706d6d'}}>
        <h5>AI빅데이터인공지능</h5>
        <h4 style={{ position:'absolute', width:'100%', textAlign:'center' }}>VS</h4>
        <h5>정보보안학과</h5>
      </div>
      <div className="writer" style={{display:'flex', justifyContent:'space-between'}}>
      <h5>Date : </h5>
      <h5>누적 금액 : </h5>
      <h5>Writer : </h5>
      </div>
      </Link>
    </div>
    <Write_btn /> {/* 글쓰기 버튼 */}
  </div>
</div>
    );
  };
  // 만든 컴포넌트 모듈로 사용하기 위해 내보내기
  export default Hotboard;