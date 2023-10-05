import React from "react";
import './Main.css';
import { Link } from 'react-router-dom';
import Write_Btn from "../Write_btn/Write_btn"

function Main() {
    return (//메인 페이지 구성
    // 메인페이지의 구성으로는 실시간으로 Top 3을 보여주는 게시글 컴포넌트
    // Top3의 게시물의 내용과 주제에 대한 이야기 , 투표수, 선택지 내용을 보여준다.
    <div>
<div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100vh' , textAlign:'left'}}>
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width:'90%', height:'auto'}}>
    <h2 style={{borderBottom:'1px solid black'}}>최신글</h2>
    {/* <ProgressBar vote1={47} vote2={53} /> */}
    <div className='Main_Content' style={{width:'100%'}}>
      {/* 첫번째 최신글 */}
      <Link to="/게시글 라우팅1"> 
      <h4>[스포츠] 손흥민 VS 김민재</h4>
      <h5 style={{textAlign:'right', margin:'0', marginBlock:'0'}}>누적 금액 : 199999P</h5>
      <div style={{ display: 'flex', justifyContent: 'space-around', position: 'relative'}}>
        <div style={{width:'50%', textAlign:'center', backgroundColor:'rgba(246, 165, 165, 1)',boxShadow :'0px 4px 4px rgba(0, 0, 0, 0.25)' ,borderRadius: '25px',position: 'relative', left:'1%'}}>
        <h5>손흥민</h5>
        </div>
        <div style={{width:'50%', textAlign:'center', backgroundColor:'rgba(128, 165, 235, 1)',boxShadow :'0px 4px 4px rgba(0, 0, 0, 0.25)' ,borderRadius: '25px',position: 'relative', left:'-1%'}}>
        <h5>김민재</h5>
        </div>
      </div>
      <div className="writer" style={{display:'flex', justifyContent:'space-between'}}>
      <h5>Date : 23/09/26</h5>
      <h5>Total : 122,000명</h5>
      <h5>Writer : 이강인</h5>
      </div>
      </Link>
      <Link to="/게시글 라우팅1"> 
      <h4>[스포츠] 손흥민 VS 김민재</h4>
      <h5 style={{textAlign:'right', margin:'0', marginBlock:'0'}}>누적 금액 : 199999P</h5>
      <div style={{ display: 'flex', justifyContent: 'space-around', position: 'relative'}}>
        <div style={{width:'50%', textAlign:'center', backgroundColor:'rgba(246, 165, 165, 1)',boxShadow :'0px 4px 4px rgba(0, 0, 0, 0.25)' ,borderRadius: '25px',position: 'relative', left:'1%'}}>
        <h5>손흥민</h5>
        </div>
        <div style={{width:'50%', textAlign:'center', backgroundColor:'rgba(128, 165, 235, 1)',boxShadow :'0px 4px 4px rgba(0, 0, 0, 0.25)' ,borderRadius: '25px',position: 'relative', left:'-1%'}}>
        <h5>김민재</h5>
        </div>
      </div>
      <div className="writer" style={{display:'flex', justifyContent:'space-between'}}>
      <h5>Date : 23/09/26</h5>
      <h5>Total : 122,000명</h5>
      <h5>Writer : 이강인</h5>
      </div>
      </Link>
      <Link to="/게시글 라우팅1"> 
      <h4>[스포츠] 손흥민 VS 김민재</h4>
      <h5 style={{textAlign:'right', margin:'0', marginBlock:'0'}}>누적 금액 : 199999P</h5>
      <div style={{ display: 'flex', justifyContent: 'space-around', position: 'relative'}}>
        <div style={{width:'50%', textAlign:'center', backgroundColor:'rgba(246, 165, 165, 1)',boxShadow :'0px 4px 4px rgba(0, 0, 0, 0.25)' ,borderRadius: '25px',position: 'relative', left:'1%'}}>
        <h5>손흥민</h5>
        </div>
        <div style={{width:'50%', textAlign:'center', backgroundColor:'rgba(128, 165, 235, 1)',boxShadow :'0px 4px 4px rgba(0, 0, 0, 0.25)' ,borderRadius: '25px',position: 'relative', left:'-1%'}}>
        <h5>김민재</h5>
        </div>
      </div>
      <div className="writer" style={{display:'flex', justifyContent:'space-between'}}>
      <h5>Date : 23/09/26</h5>
      <h5>Total : 122,000명</h5>
      <h5>Writer : 이강인</h5>
      </div>
      </Link>
    </div>
  </div>
  <Write_Btn /> {/* 글쓰기 버튼 */}
  </div>
  
</div>

    );
  }

export default Main;