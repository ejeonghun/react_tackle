import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyVote.css';
import { Link } from 'react-router-dom';

function MyVotePage() {
  const [voteResults, setVoteResults] = useState([]);
  const [isListView, setIsListView] = useState(true);
  const KakaoId = sessionStorage.getItem('KakaoId');
  const JWTToken = sessionStorage.getItem("accessToken"); // JWT 토큰 가져오기

  useEffect(() => {
    async function fetchData() {
      const response = await axios({ // POST 요청으로 처리한다.
        method: 'get',
        url: `https://api1.lunaweb.dev/api/v1/mypage/myVote`,
        headers: { 'Content-Type': 'application/json',
            'Authorization': `Bearer ${JWTToken}` }});
      setVoteResults(response.data.data);
    }
    fetchData();
  }, [JWTToken]);

  const toggleView = () => {
    setIsListView(!isListView);
  };

  // Render
  return (
    <div className="myVotePage">
      <h1>내가 참여한 투표</h1>
      <hr/>
      <button onClick={toggleView} className='list_btn'>{isListView ? "Change Grid View" : "Change List View"}</button>
      {isListView ? (
        <table className="myVoteTable">
          <thead>
            <tr>
              <th>투표 글</th>
              <th>선택 항목 ID</th>
              <th>상태</th>
              <th>배팅 포인트</th>
              <th>참여일</th>
              <th>게시글 이동</th>
            </tr>
          </thead>
          <tbody>
            {voteResults.map(result => (
              <tr key={result.resultId}>
                <td>{result.postId}</td>
                <td>{result.itemId}</td>
                <td>{result.status === "ING" ? "진행중.." : "투표종료"}</td>
                <td>{result.bettingPoint || '없음'}</td>
                <td>{new Date(result.createdAt).toLocaleDateString()}</td>
                <td><Link to={"/vote/"+ result.postId}>GO!</Link></td>
              </tr>
              
            ))}
          </tbody>
        </table>
      ) : (
        <div className="myVoteGrid">
          {voteResults.map(result => (
            <div key={result.resultId} className="myVoteItem">
              <div className="voteInfo">
                <Link to={"/vote/" + result.postId}>투표 글</Link>
                <p>선택 항목 ID: {result.itemId}</p>
                <p>상태: {result.status === "ING" ? "진행중.." : "투표종료"}</p>
                <p>배팅 포인트: {result.bettingPoint || '없음'}</p>
              </div>
              <div className="voteDate">
                참여일: {new Date(result.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyVotePage;
