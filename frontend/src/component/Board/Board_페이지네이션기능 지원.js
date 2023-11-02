import React, { useState, useEffect, useRef  } from "react";
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

  const location = useLocation(); // 현재 path 위치를 가져옵니다.
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const loader = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 1 });
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);

      useEffect(() => {
        const getData = async () => {
          const response = await axios.get(`https://api1.lunaweb.dev/api/v1/board/list?page=${page}&limit=3`);
          setData(prevData => [...prevData, ...response.data]);
        };
        getData();
      }, [page]);
      

        const handleObserver = (entities) => {
          const target = entities[0];
          if (target.isIntersecting) {
            setPage((prevPage) => prevPage + 1);
          }
        };

  if (!data) return <div>Loading...</div>; 

    return (
        <div>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', textAlign:'left'}}> {/* height: '100vh' */}
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
                <div className="loading" ref={loader}>
        <h2>더보기</h2>
      </div>
          </div>
          <Write_Btn/> {/* 글쓰기 버튼 */}
          </div>
          
        </div>
    )
};

export default Board;