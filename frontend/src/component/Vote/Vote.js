import React, { useState } from 'react';
import './Vote.css';

function VotePage({ title, content, options }) {
  const [votes, setVotes] = useState(Array(options.length).fill(0));
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const colors = ['red', 'blue', 'green', 'purple'];

  const handleVote = (index) => {
    const newVotes = [...votes];
    newVotes[index]++;
    setVotes(newVotes);
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

  return (
    <div className="vote-container">
      <h1 className="title">{title}</h1>
      <p className="content">{content}</p>
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
