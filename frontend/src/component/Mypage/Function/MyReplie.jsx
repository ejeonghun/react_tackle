import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyReplie.css';

function CommentTable() {
    const idx = sessionStorage.getItem('KakaoId');

    const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`https://api1.lunaweb.dev/api/v1/replies/myinfo?idx=${idx}`);
      setComments(response.data);
    }
    fetchData();
  }, [idx]);
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
    <table className="comment-table">
      <thead>
        <tr>
          <th>Replies ID</th>
          <th>Post ID</th>
          <th>Comment</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {comments.map((comment) => (
          <tr key={comment.repliesId}>
            <td>{comment.repliesId}</td>
            <td>{comment.postId}</td>
            <td>{comment.comment}</td>
            <td>{formatDate(comment.createdAt)}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default CommentTable;