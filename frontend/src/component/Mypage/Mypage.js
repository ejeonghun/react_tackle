import React from "react";
import './Mypage.css';
import { Link } from "react-router-dom";

function Mypage() {
    return (
        <div>
        <div className="Mypage" style={{width:'100%', display:'flex', justifyContent:'center', textAlign:'left', marginTop:'2vh'}}>
            <div className="Mypage_title" style={{width:'90%', justifyContent:'center', border:'1px solid black', height: '110px', flexDirection:'row' , display:'flex', justifyContent:'space-between', backgroundColor:'aliceblue'}}>
                <div className="Mypage_title_img" style={{width:'10vh', height:'10vh' ,borderRadius: '60%', overflow: 'hidden', 
                border:'1px solid black' ,marginLeft:'1vh', marginTop:'0.5vh'}}>
                <img src="./logo192.png" style={{width:'10vh', height:'10vh', textAlign:'left'}}></img>
                </div>
                <h2 style={{display:'flex', margin:'0', alignItems:'center', marginBlock:'0', marginInline:'0'}}>이문철</h2>
                <div className="Mypage_title_point" style={{flexDirection:'column', display:'flex', justifyContent:'center'}}>
                    <h3>내 포인트</h3>
                    <h4>100,000P</h4>
                </div>
                </div>
                <div>

                </div>
        </div>
        {/* </div> flex 닫기 */}
        <div className="Mypage_info" style={{display:'flex', justifyContent:'left', flexDirection:'column', textAlign:'left'}}>
        <h4 style={{borderBottom:'1px solid black', marginBlock:'0', margin:'10px'}}>마이페이지</h4>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <Link to="/charge" style={{display: 'flex', alignItems: 'center'}}>
                <img src="./img/money.png" style={{width:'35px', height:'auto', margin:'10px'}}></img>
                <h2>충전하기</h2>
            </Link>
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <Link to="/charge" style={{display: 'flex', alignItems: 'center'}}>
                <img src="./img/shopping.png" style={{width:'32px', height:'auto', margin:'10px'}}></img>
                <h2>포인트 샵</h2>
            </Link>
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
        <Link to="/charge" style={{display: 'flex', alignItems: 'center'}}>
            <img src="./img/pencil.png" style={{width:'32px', height:'auto', margin:'10px'}}></img>
            <h2>작성한 글</h2>
        </Link>
    </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <Link to="/charge" style={{display: 'flex', alignItems: 'center'}}>
                <img src="./img/comment.png" style={{width:'32px', height:'auto', margin:'10px'}}></img>
                <h2>작성한 댓글</h2>
            </Link>
        </div>
        <div style={{display: 'flex', alignItems: 'center', borderBottom:'1px solid black'}}>
            <Link to="/charge" style={{display: 'flex', alignItems: 'center'}}>
                <img src="./img/check-box.png" style={{width:'32px', height:'auto', margin:'10px'}}></img>
                <h2>참여한 투표</h2>
            </Link>
        </div>
    </div>

    </div>
    );
};

export default Mypage;            