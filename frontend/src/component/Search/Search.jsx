import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import Write_Btn from "../Write_btn/Write_btn"
import axios from 'axios';
import Loading from '../Loading/Loading';
import { getCategoryId } from "../Category/CategoryList.jsx";

function Search() {
  const { SearchParam } = useParams(); // 검색 키 값을 가지고 옴
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [visibleData, setVisibleData] = useState(null); // 보여주는 데이터를 저장하는 스테이트
  const [visibleCount, setVisibleCount] = useState(4); // 보여주는 데이터의 개수를 저장하는 스테이트
  const { categoryKey } = useParams(); // 카테고리 키 값을 가지고 옴

  const categories = {
    1: "일상/연애",
    2: "게임",
    3: "스포츠",
    4: "사회/과학",
    5: "정치/경제",
    6: "문화/예술"
  };

  let boardName = '검색';
  

  console.log(SearchParam);
  useEffect(() => {
    setLoading(true); // api 호출 전에 true로 변경하여 로딩화면 띄우기
    if (SearchParam) {
        axios.get(`https://api1.lunaweb.dev/api/v1/board/search?keyword=${SearchParam}`)
            .then(response => {
                response.data.sort((a, b) => b.postId - a.postId); // 여기서 데이터를 정렬합니다.
                setSearchResults(response.data); 
                setVisibleData(response.data.slice(0, visibleCount)); // 처음에는 4개만 보여줌
                setLoading(false)
            })
            .catch(error => {
                console.error('Failed to fetch data', error);
            });
    } else {
        setSearchResults([]);
    }
    
}, [SearchParam]);

      
          // "더보기" 버튼을 눌렀을 때 호출되는 함수
        const handleLoadMore = () => {
          setVisibleCount(prevCount => prevCount + 4); // 보여주는 데이터의 개수를 4개 증가
          setVisibleData(searchResults.slice(0, visibleCount + 4)); // 증가된 개수만큼 데이터를 보여줌
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
                <h5 style={{textAlign:'right', margin:'0', marginBlock:'0', marginBottom: '5px', display:'inline-block'}}>누적 금액 : {post.bettingAmount ? post.bettingAmount : "0"}P</h5>
                </div>
                <hr/>
                <div className="writer" style={{display:'flex', justifyContent:'space-between'}}>
                  <h5>Date : {new Date(post.createdAt).toLocaleDateString()}</h5> {/* 작성일을 yy/mm/dd 형식으로 포맷팅 */}
                  <h5>Total : {post.votingAmount}명</h5>
                  <h5>Writer : {post.nickname ? post.nickname : post.idx}</h5>  {/* 닉네임이 없는 경우 idx를 표시한다. */}
                </div>
              </Link>
            </div>
          )))
          }
          
          <button onClick={handleLoadMore} className="button-2" style={{marginBottom:'10px'}}><img src={require("../Board/arrow_down.png")} alt="더보기" style={{width:'28px'}}></img></button> {/* "더보기" 버튼 */}
          </div>
          <Write_Btn/> {/* 글쓰기 버튼 */}
          </div>
        </div>
    )


};

export default Search;