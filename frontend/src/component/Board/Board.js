import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from 'react-router-dom';
import Write_Btn from "../Write_btn/Write_btn"
import axios from 'axios';
import Loading from '../Loading/Loading';
import './Board.css'
import { getCategoryId } from "../Category/CategoryList.jsx";

function Board({BoardName}) {
  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState(null); // 모든 데이터를 저장하는 스테이트
  const [visibleData, setVisibleData] = useState([]); // 렌더링에 사용되는 데이터를 저장하는 스테이트
  const [visibleCount, setVisibleCount] = useState(4); // 보여주는 데이터의 개수를 저장하는 스테이트
  const { categoryKey } = useParams(); // 카테고리 키 값을 가지고 옴

  const categories = {
    0: "인기글",
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

      useEffect(() => {
        setLoading(true); // api 호출 전에 true로 변경하여 로딩화면 띄우기
        if (window.location.pathname !== '/') { // 카테고리 이면 카테고리 값을 파라미터에 넣어서 API 호출
          if (window.location.pathname === '/category/Hotboard') { // 인기글은 정렬을 하지않음 -> 백앤드에서 총 투표수가 높은 순으로 순서대로 값을 반환해줌
            async function getData() {
              const response = await axios.get(`https://api1.lunaweb.dev/api/v1/board/list?categoryId=${getCategoryId(categoryKey)}`);
                setAllData(response.data); 
                setVisibleData(response.data.slice(0, visibleCount)); // 처음에는 4개만 보여줌
                if (response.data.length === 0) { // 데이터가 없으면 예외처리
                  setVisibleData('null data'); // 데이터가 없으면 null을 설정
                }
              }
                
                getData().then(() => setLoading(false)); // setLoading을 getData가 완료된 후에 호출합니다.
          } else {
          async function getData() { // 해당 카테고리의 전체 게시물을 가져옴
            const response = await axios.get(`https://api1.lunaweb.dev/api/v1/board/list?categoryId=${getCategoryId(categoryKey)}`);
            response.data.sort((a, b) => b.postId - a.postId); // 여기서 데이터를 정렬합니다.
              setAllData(response.data); 
              setVisibleData(response.data.slice(0, visibleCount)); // 처음에는 4개만 보여줌
              if (response.data.length === 0) { // 데이터가 없으면 예외처리
                setVisibleData('null data'); // 데이터가 없으면 null을 설정
              }
            }
              
              getData().then(() => setLoading(false)); // setLoading을 getData가 완료된 후에 호출합니다.
          } 
        }else {
            async function getData() { // 카테고리가 아닌 전체 게시글을 가져옵니다.
              const response = await axios.get('https://api1.lunaweb.dev/api/v1/board/list');
              response.data.sort((a, b) => b.postId - a.postId); // 여기서 데이터를 정렬합니다.
                setAllData(response.data); 
                setVisibleData(response.data.slice(0, visibleCount)); // 처음에는 4개만 보여줌
                }
                
                
                getData().then(() => setLoading(false)); // setLoading을 getData가 완료된 후에 호출합니다.
        }
        }, [categoryKey]); // categoryKey가 변경될 때마다 API를 다시 요청합니다.
      
          // "더보기" 버튼을 눌렀을 때 호출되는 함수
        const handleLoadMore = () => {
          setVisibleCount(prevCount => prevCount + 4); // 보여주는 데이터의 개수를 4개 증가
          setVisibleData(allData.slice(0, visibleCount + 4)); // 증가된 개수만큼 데이터를 보여줌
        };
      
        if (!visibleData) return <div><Loading/></div>; // 데이터가 없으면 로딩화면을 띄웁니다.
    return (
        <div>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', textAlign:'left'}}> {/* height: '100vh' */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width:'90%', height:'auto'}}>
            <h2 style={{borderBottom:'1px solid black'}}>{boardName}</h2> {/* 현재 path에 따라 게시판 이름을 변경합니다. */}
          {/* visibleData의 값이 'null data'일 경우 "게시물이 없습니다." 메시지를 렌더링 */}
          {visibleData === 'null data' ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width:'100%', height:'100%'}}>
            <h3>게시물이 없습니다.</h3>
          </div>
        ) : (
            {/* 각각의 게시글을 순회합니다. */}
            ,visibleData.map((post) => (
<div className='Main_Content' key={post.postId} style={{width:'100%'}}>
              <Link to={`/vote/${post.postId}`}> 
                <div className="category_title"><h5 className="category">[{categories[post.categoryId]}]</h5><h4 className="board_title">{post.title}</h4></div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h5 style={{textAlign:'left', margin:'0', marginBlock:'0', marginBottom: '5px', display:'inline-block', borderBottom:'1px solid #dbc1c1'}}>{post.status === 'END' ? '투표종료' : '투표중'}</h5>
                <h5 style={{textAlign:'right', margin:'0', marginBlock:'0', marginBottom: '5px', display:'inline-block'}}>누적 금액 : {post.bettingAmount}P</h5>
                </div>
              <div style={{ display: 'flex', justifyContent: 'space-around', position: 'relative', flexDirection: 'row', alignItems: 'center' }}>
                <div style={{ width: '50%', height: '30px', textAlign: 'center', backgroundColor: 'rgba(246, 165, 165, 1)', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '25px', position: 'relative', left: '1%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  {post.voteItemsContent[0]}
                </div>
                <div style={{ width: '50%', height: '30px', textAlign: 'center', backgroundColor: 'rgba(128, 165, 235, 1)', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '25px', position: 'relative', left: '-1%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  {post.voteItemsContent[1]}
                </div>
              </div>

              {/* 빨강 파랑 수평수직조절 */}
                <div className="writer" style={{display:'flex', justifyContent:'space-between'}}>
                  <h5>Date : {new Date(post.createdAt).toLocaleDateString()}</h5> {/* 작성일을 yy/mm/dd 형식으로 포맷팅 */}
                  <h5>Total : {post.votingAmount ? post.votingAmount : "0"}명</h5>
                  <h5>Writer : {post.nickname ? post.nickname : post.idx}</h5>  {/* 닉네임이 없는 경우 idx를 표시한다. */}
                </div>
              </Link>
            </div>
          )))
          }

          
          <button onClick={handleLoadMore} className="button-2" style={{marginBottom:'10px'}}><img src={require("./arrow_down.png")} alt="더보기" style={{width:'14px'}}></img></button> {/* "더보기" 버튼 */}
          </div>
          <Write_Btn/> {/* 글쓰기 버튼 */}
          </div>
        </div>
    )


};

export default Board;