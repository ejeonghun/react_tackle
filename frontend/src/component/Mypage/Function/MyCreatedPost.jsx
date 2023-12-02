import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyCreatedPost.css';
import { Link } from 'react-router-dom';

function MyCreatedPostTable() {
    const idx = sessionStorage.getItem('KakaoId');
    const JWTToken = sessionStorage.getItem("accessToken"); // JWT 토큰 가져오기
    const [Posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios({ // POST 요청으로 처리한다.
        method: 'get',
        url: `https://api1.lunaweb.dev/api/v1/mypage/myBoard`,
        headers: { 'Content-Type': 'application/json',
            'Authorization': `Bearer ${JWTToken}` }});
      setPosts(response.data.data);
    }
    fetchData();
  }, [JWTToken]);

  // yyyy/mm/dd hh:mm:ss 형태로 변환하는 함수
  function formatDate(date) {
    const d = new Date(date);
    return d.getFullYear() + '/' + (d.getMonth() + 1).toString().padStart(2, '0') + '/' + d.getDate().toString().padStart(2, '0') + ' ' 
        + d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0') + ':' + d.getSeconds().toString().padStart(2, '0');
  }

  return (
<div className='MyPost'>
  <h1>내가 작성한 투표 게시물</h1>
  <hr/>
  <table className="myPostTable">
    <thead>
      <tr>
        <th>제목</th>
        <th>내용</th>
        <th>상태</th>
        <th>총 배팅금액</th>
        <th>게시글 작성일</th>
        <th>종료 일시</th>
        <th>게시글 이동</th>
      </tr>
    </thead>
    <tbody>
      {Posts.map((Posts) => (
        <tr key={Posts.postId}>
          <td>{Posts.title}</td>
          <td>{Posts.content}</td>
          <td>{Posts.status === 'ING' ? "진행중":"종료됨"}</td>
          <td>{Posts.bettingAmount}p</td>
          <td>{formatDate(Posts.createdAt)}</td>
          <td>{formatDate(Posts.endDate)}</td>
          <td><Link to={`/vote/${Posts.postId}`}>게시글 이동</Link></td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
}

export default MyCreatedPostTable;