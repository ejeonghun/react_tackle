import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyReplie.css';
import { Link } from 'react-router-dom';

function CommentTable() {
    const idx = sessionStorage.getItem('KakaoId');
    const JWTToken = sessionStorage.getItem("accessToken"); // JWT 토큰 가져오기
    const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios({ // POST 요청으로 처리한다.
        method: 'get',
        url: `https://api1.lunaweb.dev/api/v1/mypage/myReply`,
        headers: { 'Content-Type': 'application/json',
            'Authorization': `Bearer ${JWTToken}` }});
      setComments(response.data.data);
    }
    fetchData();
  }, [JWTToken]);
 // yyyy/mm/dd hh:mm:ss 형태로 변환하는 함수
  // yyyy/mm/dd hh:mm:ss 형태로 변환하는 함수
  function formatDate(date) {
    const d = new Date(date);
    return d.getFullYear() + '/' + (d.getMonth() + 1).toString().padStart(2, '0') + '/' + d.getDate().toString().padStart(2, '0') + ' ' 
        + d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0') + ':' + d.getSeconds().toString().padStart(2, '0');
  }

  return (
<div className='MyReplie'>
  <h1>내가 작성한 댓글</h1>
  <hr/>
  <table className="myReplyTable">
    <thead>
      <tr>
        <th>글 번호</th>
        <th>댓글 내용</th>
        <th>댓글 작성일</th>
        <th>게시글 이동</th>
      </tr>
    </thead>
    <tbody>
      {comments.map((comment) => (
        <tr key={comment.repliesId}>
          <td>{comment.postId}</td>
          <td>{comment.comment}</td>
          <td>{formatDate(comment.createdAt)}</td>
          <td><Link to={`/vote/${comment.postId}`}>게시글 이동</Link></td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
}

export default CommentTable;