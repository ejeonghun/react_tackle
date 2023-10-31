import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Vote.css';
// const [votes, setVotes] = useState(Array(options.length).fill(0)); // 각 선택지의 투표 수를 담는 배열
  function VotePage() {
    const [post, setPost] = useState(null);
    const { id } = useParams();
    const [votes, setVotes] = useState(Array(2).fill(0)); // 옵션 수를 임시로 2개로 설정
    const [comment, setComment] = useState("");
    const [commentsList, setCommentsList] = useState([]);
    const colors = ['red', 'blue', 'green', 'purple'];
    const KakaoId = sessionStorage.getItem("KakaoId"); // 투표 기능을 위한 카카오 ID 가져오기
    const [selectedValue, setSelectedValue] = useState(''); // 포인트 배팅을 위한 select value 값 가져오기
    const [SelectedValueText, setSelectedValueText] = useState(''); // 포인트 배팅을 위한 select value 값 가져오기

      // 배팅 select 값이 변경될 때 호출되는 함수
      const handleSelectChange = (event) => {
        const selectedOption = event.target.value;
        if (selectedOption === '포인트 배팅') {
          setSelectedValue(selectedOption);
          setSelectedValueText('');
        } else {
        setSelectedValue(selectedOption);
        setSelectedValueText('Betting : '+ selectedOption + 'P');
      }
      };


    useEffect(() => {
      async function getData() {
        const response = await axios.get(`https://api1.lunaweb.dev/api/v1/board/info?postId=${id}`);
        setPost(response.data.data);
      }
  
      getData();
    }, [id]);
  
    const handleVote = async (index) => {
      const confirmVote = window.confirm("투표하시겠습니까?");
      if (!confirmVote) return; // 사용자가 투표를 취소하면 함수를 종료합니다.

      // 수정 해야할 부분 
      // 투표가 완료 되어야지만 투표 수가 업데이트 되어야 합니다.
      const newVotes = [...votes];
      newVotes[index]++;
      setVotes(newVotes); // 투표 성공시에만 투표 수 업데이트
    
      // API 호출
      const response = await axios.post('https://api1.lunaweb.dev/api/v1/board/voting', {
        "postId": post.postId,
        "idx": `${KakaoId}`, // 세션에서 사용자의 kakaoId를 가져와서 idx로 사용합니다.
        "itemId": index, // 선택한 항목의 인덱스를 itemId로 사용합니다.
        "status": "ING",
        "bettingPoint": parseInt(selectedValue), // <select className='bet_select'> 의 value값을 가져와서 bettingPoint로 사용합니다. api에 쿼리를 보낼때 int형으로 보내야 합니다.
        
        "getPoint": 0, // 실제 얻을 포인트로 변경해야 합니다.
        "createdAt": new Date().toISOString()
      });
      
      // API 호출 결과를 확인합니다.
      if (response.data.message) { // 메세지가 있는 경우
        if (response.success == "true") { // 투표 성공
          alert("투표가 완료 되었습니다.");
        } else { // 투표 실패
            alert(response.data.message); // 오류 코드를 alert로 띄웁니다.
        }
      }
    };
  
    const totalVotes = votes.reduce((a,b) => a + b);
  
    // 댓글 입력 핸들러
    const handleCommentChange = (event) => {
      setComment(event.target.value);
    };
  
    // 댓글 제출 핸들러
    const handleCommentSubmit = (event) => {
      event.preventDefault();
      if(comment.trim() !== "") {
        setCommentsList([...commentsList, comment]);
        setComment("");
      }
    };
  
    if (!post) return <div>Loading...</div>;
  
    const options = ['Option 1', 'Option 2']; // 옵션을 임시로 설정
  
    return (
      <div className="vote-container">
        <h1 className="title">{post.title}</h1>
        <p className="content">{post.content}</p>
        <h4 className='hr'>투표</h4>
        <div className='hr_bottom'></div>
      {options.map((option, index) => (
        <div key={index} className="option-container">
          {/* 버튼과 bar-fill의 배경색을 동적으로 설정 */}
          <button style={{ backgroundColor: colors[index % colors.length] }} onClick={() => handleVote(index)} className='vote_button'>{option}</button>
          <div className="bar">
            {/* votes[index] / totalVotes 비율에 따라 .bar-fill 의 넓이 조절 */}
            <div 
              className="bar-fill" 
              style={{ 
                width: `${totalVotes > 0 ? (votes[index] / totalVotes) * 100 : 0}%`,
                backgroundColor: colors[index % colors.length]
              }}
            />
          </div>
          {/* 각 선택지 별 투표 수 및 비율 출력 */}
          <span>{votes[index]} votes ({totalVotes > 0 ? Math.round((votes[index] / totalVotes) * 100) : 0}%)</span>
        </div>
      ))}
      <hr/>
      {/* 포인트 배팅 */}
      <div className='point_bet'>
      {/*포인트 배팅은 1000P, 5000P, 10000P 으로 제한한다.*/}
      <select className='bet_select' value={selectedValue} onChange={handleSelectChange}>
        <option>포인트 배팅</option>
        <option value={1000}>1000P</option>
        <option value={5000}>5000P</option>
        <option value={10000}>10000P</option>
      </select>
      <p className='select_betting'>{SelectedValueText}</p>
      </div>
      <hr/>
      {/* 댓글 작성 폼 */}
      <div className='commentwrite'>
        <form onSubmit={handleCommentSubmit} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <textarea 
            value={comment} 
            onChange={handleCommentChange} 
            placeholder="댓글을 입력하세요..." 
            style={{ width: '80%', minHeight: '6px', resize: 'none', borderRadius: '4px', padding: '10px' }}
          />
          <button type="submit" style={{ border:'none', color:'white', background:'#007BFF', padding:'10px', cursor:'pointer', width:'15%' }}>작성</button>
        </form>
      </div>


      {/* 댓글 목록 */}
      {commentsList.length > 0 && (
        <>
          <h4>댓글 목록</h4>
          {commentsList.map((commentText,index)=>(
            <p key={index} className='comment-item'>{commentText}</p>
          ))}
        </>
       )}
      
    </div>
);
  }

export default VotePage;
