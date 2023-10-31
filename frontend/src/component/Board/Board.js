import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import Write_Btn from "../Write_btn/Write_btn"
import axios from 'axios';

function Board({BoardName}) {
  let boardName = '';
  if (BoardName) {
    boardName = BoardName;
  } else {
    boardName = '';
  }
  const [data, setData] = useState(null); // data라는 상태를 만듭니다.
  const location = useLocation(); // 현재 path 위치를 가져옵니다.

      useEffect(() => {
        async function getData() {
          // const response = await fetch('http://localhost:3000/sample.json'); 개발 시 사용
          const response = await axios.get('https://api1.lunaweb.dev/api/v1/board/list');
            setData(response.data); // 데이터가 로드되면 상태를 업데이트합니다.
            }
      
            getData();
        }, []); 
      
  // switch (location.pathname) {
  //   case "/Hotboard":
  //     boardName = "인기글";
  //     break;
  //   case "/VSboard": 
  //     boardName = "찬반글";
  //     break;
  //   case "/participationboard":
  //     boardName = "참여글";
  //     break;
  //   default:
  //     boardName = "최신글";
  //     break;
  // }
  if (!data) return <div>Loading...</div>; 

    return (
        <div>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100vh' , textAlign:'left'}}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width:'90%', height:'auto'}}>
            <h2 style={{borderBottom:'1px solid black'}}>{boardName}</h2> {/* 현재 path에 따라 게시판 이름을 변경합니다. */}
            {/* 각각의 게시글을 순회합니다. */}
            {data.map((post) => (
            <div className='Main_Content' key={post.postId} style={{width:'100%'}}>
              <Link to={`/vote/${post.postId}`}> 
                <h4>{post.title}</h4>
                <h5 style={{textAlign:'right', margin:'0', marginBlock:'0'}}>누적 금액 : ${post.bettingAmount}</h5>
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