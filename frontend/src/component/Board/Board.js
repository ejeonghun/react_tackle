import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import Write_Btn from "../Write_btn/Write_btn"
import axios from 'axios';
import Loading from '../Loading/Loading';
import './Board.css'

function Board({BoardName}) {
  const [loading, setLoading] = useState(true);

  const categories = {
    1: "일상/연애",
    2: "게임",
    3: "스포츠",
    4: "사회/과학",
    5: "정치/경제",
    6: "문화/예술"
  };

  let boardName = '';
  if (BoardName) {
    boardName = BoardName;
  } else {
    boardName = '';
  }
  const [data, setData] = useState(null); // data라는 상태를 만듭니다.
  const location = useLocation(); // 현재 path 위치를 가져옵니다.

      useEffect(() => {
        setLoading(true); // api 호출 전에 true로 변경하여 로딩화면 띄우기
        async function getData() {
          // const response = await fetch('http://localhost:3000/sample.json'); 개발 시 사용
          const response = await axios.get('https://api1.lunaweb.dev/api/v1/board/list');
            setData(response.data); // 데이터가 로드되면 상태를 업데이트합니다.
            }
            
            getData();
            setLoading(false); // api 호출 완료 됐을 때 false로 변경하려 로딩화면 숨김처리
        }, []); 
      
  if (!data) return <div><Loading/></div>; 

    return (
        <div>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', textAlign:'left'}}> {/* height: '100vh' */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width:'90%', height:'auto'}}>
            <h2 style={{borderBottom:'1px solid black'}}>{boardName}</h2> {/* 현재 path에 따라 게시판 이름을 변경합니다. */}
            {/* 각각의 게시글을 순회합니다. */}
            {data.map((post) => (
            <div className='Main_Content' key={post.postId} style={{width:'100%'}}>
              <Link to={`/vote/${post.postId}`}> 
                <div className="category_title"><h5 className="category">[{categories[post.categoryId]}]</h5><h4 className="board_title">{post.title}</h4></div>
                <h5 style={{textAlign:'right', margin:'0', marginBlock:'0'}}>누적 금액 : {post.bettingAmount}P</h5>
                <div style={{ display: 'flex', justifyContent: 'space-around', position: 'relative'}}>
                  <div style={{width:'50%', textAlign:'center', backgroundColor:'rgba(246, 165, 165, 1)',boxShadow :'0px 4px 4px rgba(0, 0, 0, 0.25)' ,borderRadius: '25px',position: 'relative', left:'1%'}}>
                    <h5>{post.voteItemsContent}</h5>
                  </div>
                  <div style={{width:'50%', textAlign:'center', backgroundColor:'rgba(128, 165, 235, 1)',boxShadow :'0px 4px 4px rgba(0, 0, 0, 0.25)' ,borderRadius: '25px',position: 'relative', left:'-1%'}}>
                    <h5>{post.voteItemsContent}</h5>
                  </div>
                </div>
                <div className="writer" style={{display:'flex', justifyContent:'space-between'}}>
                  <h5>Date : {new Date(post.createdAt).toLocaleDateString()}</h5> {/* 작성일을 yy/mm/dd 형식으로 포맷팅 */}
                  <h5>Total : {post.votingDeadLine}명</h5>
                  <h5>Writer : {post.idx}</h5>
                </div>
              </Link>
            </div>
          ))}
          </div>
          <Write_Btn/> {/* 글쓰기 버튼 */}
          </div>
          
        </div>
    )
};

export default Board;